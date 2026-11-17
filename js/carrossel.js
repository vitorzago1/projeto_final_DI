/* ==========================================================================
   carrossel.js — carrossel de imagens da página Início

   O Bootstrap cuida de mostrar uma imagem por vez e do deslizar entre elas.
   Este arquivo decide QUANDO o carrossel anda, e liga os botões.

   Regra única, para o comportamento ser previsível:
   o carrossel passa sozinho a cada 6 segundos, a não ser que esteja pausado.
   O botão sempre mostra o estado: "Pausar" quando está andando,
   "Reproduzir" quando está parado.

   - Botão de pausar e reproduzir (WCAG 2.2.2: Pausar, Parar, Ocultar).
   - Começa pausado se "Reduzir animações" estiver ligado no painel de
     acessibilidade ou no sistema operacional, e uma nota explica o motivo.
   - Setas, bolinhas e as teclas ← → trocam de imagem; depois de uma troca
     manual a contagem dos 6 segundos recomeça.
   ========================================================================== */
(function () {
  'use strict';

  const raiz = document.querySelector('.carrossel');
  if (!raiz || !window.bootstrap) return;   // página sem carrossel, ou Bootstrap não carregou

  const elemento = raiz.querySelector('.carousel');
  const slides = raiz.querySelector('.carousel-inner');
  const botaoPausa = raiz.querySelector('.carrossel-pausa');
  const textoPausa = raiz.querySelector('.carrossel-pausa-texto');
  const navegacao = raiz.querySelector('.carrossel-navegacao');
  const nota = raiz.querySelector('.carrossel-nota');
  const pontos = Array.from(raiz.querySelectorAll('.carrossel-ponto'));

  // Componente do Bootstrap. ride e pause ficam desligados porque quem decide
  // quando andar e quando parar é este arquivo (função atualizar, abaixo).
  const carrossel = new bootstrap.Carousel(elemento, {
    interval: 6000,    // 6 segundos por imagem
    ride: false,
    pause: false,      // não para sozinho com o mouse em cima: só para pelo botão
    keyboard: false,   // as setas do teclado são tratadas aqui, porque os botões ficam fora da área das imagens
    touch: true,       // no celular, arrastar com o dedo troca de imagem
    wrap: true         // depois da última imagem, volta para a primeira
  });

  // O painel de acessibilidade (ou o sistema) pede menos animações?
  function animacoesReduzidas() {
    return document.documentElement.getAttribute('data-animacoes') === 'reduzidas';
  }


  /* ---------- 1. Estado ---------- */
  let reduzidas = animacoesReduzidas();
  let andando = !reduzidas;   // true = passando sozinho
  let pausaManual = false;    // true = foi a pessoa que apertou "Pausar"

  // Aplica o estado: liga ou desliga o avanço automático e atualiza o botão.
  // Só é chamada quando o estado muda (botão ou preferência), nunca por
  // movimento do mouse; assim a contagem dos 6 segundos não é reiniciada à toa.
  function atualizar() {
    if (andando) {
      carrossel.cycle();   // começa a contar os 6 segundos
    } else {
      carrossel.pause();
    }

    // O botão mostra a ação que ele vai executar
    textoPausa.textContent = andando ? 'Pausar' : 'Reproduzir';
    botaoPausa.classList.toggle('esta-pausado', !andando);   // o CSS troca o ícone

    // Parado por causa de "Reduzir animações" (e não porque a pessoa pausou): explica o motivo
    nota.hidden = !(reduzidas && !andando && !pausaManual);

    // Parado: o leitor de tela anuncia a imagem nova quando a pessoa troca.
    // Andando sozinho: fica em silêncio, para não interromper a leitura.
    slides.setAttribute('aria-live', andando ? 'off' : 'polite');
  }


  /* ---------- 2. Botão de pausar e reproduzir ---------- */
  botaoPausa.addEventListener('click', function () {
    andando = !andando;
    pausaManual = !andando;
    atualizar();
  });


  /* ---------- 3. Trocar de imagem: setas, bolinhas e teclado ---------- */
  navegacao.addEventListener('click', function (evento) {
    const seta = evento.target.closest('.carrossel-seta');
    const ponto = evento.target.closest('.carrossel-ponto');
    const botao = seta || ponto;
    if (!botao) return;

    if (ponto) {
      carrossel.to(pontos.indexOf(ponto));
    } else if (seta.dataset.direcao === 'anterior') {
      carrossel.prev();
    } else {
      carrossel.next();
    }

    // Safari e Firefox no Mac não dão foco a um botão clicado com o mouse.
    // Dar o foco aqui faz as teclas ← → funcionarem logo depois do clique.
    botao.focus();
  });

  // Teclas ← → com o foco em qualquer botão do carrossel
  raiz.addEventListener('keydown', function (evento) {
    if (evento.key === 'ArrowLeft') {
      evento.preventDefault();
      carrossel.prev();
    } else if (evento.key === 'ArrowRight') {
      evento.preventDefault();
      carrossel.next();
    }
  });

  // O Bootstrap avisa (evento slide.bs.carousel) quando vai trocar de imagem;
  // evento.to é o número da imagem nova. Aqui a bolinha certa passa a ser a marcada.
  elemento.addEventListener('slide.bs.carousel', function (evento) {
    pontos.forEach(function (ponto, indice) {
      if (indice === evento.to) {
        ponto.setAttribute('aria-current', 'true');
      } else {
        ponto.removeAttribute('aria-current');
      }
    });
  });


  /* ---------- 4. Preferência "Reduzir animações" ----------
     js/acessibilidade.js dispara o evento "preferencias:mudou" a cada mudança
     no painel. Só interessa quando a opção de animações mudou de valor. */
  document.addEventListener('preferencias:mudou', function () {
    const agora = animacoesReduzidas();
    if (agora === reduzidas) return;   // mudou outra preferência (tema, tamanho do texto...)
    reduzidas = agora;

    if (reduzidas) {
      andando = false;
    } else if (!pausaManual) {
      andando = true;   // volta a andar, a não ser que a própria pessoa tenha pausado
    }
    atualizar();
  });


  /* ---------- 5. Início ---------- */
  botaoPausa.hidden = false;   // os botões só aparecem agora que funcionam
  navegacao.hidden = false;
  atualizar();
})();

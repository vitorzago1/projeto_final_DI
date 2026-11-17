/* ==========================================================================
   carrossel.js — carrossel de imagens da página Início

   O Bootstrap cuida de mostrar uma imagem por vez e do deslizar entre elas.
   Este arquivo decide QUANDO o carrossel anda, e liga os botões:

   - passa sozinho a cada 6 segundos;
   - espera enquanto o mouse está em cima ou o foco do teclado está dentro dele;
   - tem botão de pausar e reproduzir (WCAG 2.2.2: Pausar, Parar, Ocultar);
   - começa pausado se "Reduzir animações" estiver ligado no painel de
     acessibilidade ou no sistema operacional;
   - setas, bolinhas e as teclas ← → trocam de imagem.
   ========================================================================== */
(function () {
  'use strict';

  const raiz = document.querySelector('.carrossel');
  if (!raiz || !window.bootstrap) return;   // página sem carrossel, ou Bootstrap não carregou

  const slides = raiz.querySelector('.carousel-inner');
  const botaoPausa = raiz.querySelector('.carrossel-pausa');
  const textoPausa = raiz.querySelector('.carrossel-pausa-texto');
  const navegacao = raiz.querySelector('.carrossel-navegacao');
  const pontos = Array.from(raiz.querySelectorAll('.carrossel-ponto'));

  // Componente do Bootstrap. ride e pause ficam desligados porque quem decide
  // quando andar e quando parar é este arquivo (função atualizar, abaixo).
  const carrossel = new bootstrap.Carousel(raiz.querySelector('.carousel'), {
    interval: 6000,    // 6 segundos por imagem
    ride: false,
    pause: false,
    keyboard: false,   // as setas do teclado são tratadas aqui, porque os botões ficam fora da área das imagens
    touch: true,       // no celular, arrastar com o dedo troca de imagem
    wrap: true         // depois da última imagem, volta para a primeira
  });


  /* ---------- 1. Estado ----------
     'automatico' = passa sozinho, mas espera se o mouse ou o foco estiverem no carrossel
     'tocando'    = a pessoa apertou "Reproduzir": passa sozinho sem esperar
     'pausado'    = parado até a pessoa apertar "Reproduzir" */
  let estado = 'automatico';
  let pausaManual = false;   // true quando foi a pessoa que apertou "Pausar"
  let mouseEmCima = false;
  let focoDentro = false;

  // O painel de acessibilidade (ou o sistema) pede menos animações?
  function animacoesReduzidas() {
    return document.documentElement.getAttribute('data-animacoes') === 'reduzidas';
  }

  // Aplica o estado atual: liga ou desliga o avanço automático e atualiza o botão.
  function atualizar() {
    const andando = estado === 'tocando' ||
      (estado === 'automatico' && !mouseEmCima && !focoDentro);

    if (andando) {
      carrossel.cycle();   // começa a contar os 6 segundos
    } else {
      carrossel.pause();
    }

    // O botão sempre mostra a ação que ele vai executar
    const pausado = estado === 'pausado';
    textoPausa.textContent = pausado ? 'Reproduzir' : 'Pausar';
    botaoPausa.classList.toggle('esta-pausado', pausado);   // o CSS troca o ícone

    // Pausado: o leitor de tela anuncia a imagem nova quando a pessoa troca.
    // Andando sozinho: fica em silêncio, para não interromper a leitura.
    slides.setAttribute('aria-live', pausado ? 'polite' : 'off');
  }


  /* ---------- 2. Botão de pausar e reproduzir ---------- */
  botaoPausa.addEventListener('click', function () {
    if (estado === 'pausado') {
      estado = 'tocando';
      pausaManual = false;
    } else {
      estado = 'pausado';
      pausaManual = true;
    }
    atualizar();
  });


  /* ---------- 3. Espera com o mouse em cima ou com o foco dentro ---------- */
  raiz.addEventListener('mouseenter', function () { mouseEmCima = true; atualizar(); });
  raiz.addEventListener('mouseleave', function () { mouseEmCima = false; atualizar(); });
  raiz.addEventListener('focusin', function () { focoDentro = true; atualizar(); });
  raiz.addEventListener('focusout', function (evento) {
    // relatedTarget é o elemento que vai receber o foco; só conta se ele estiver fora do carrossel
    if (!raiz.contains(evento.relatedTarget)) {
      focoDentro = false;
      atualizar();
    }
  });


  /* ---------- 4. Trocar de imagem: setas, bolinhas e teclado ---------- */
  navegacao.addEventListener('click', function (evento) {
    const seta = evento.target.closest('.carrossel-seta');
    const ponto = evento.target.closest('.carrossel-ponto');

    if (seta) {
      if (seta.dataset.direcao === 'anterior') {
        carrossel.prev();
      } else {
        carrossel.next();
      }
    } else if (ponto) {
      carrossel.to(pontos.indexOf(ponto));
    }
  });

  raiz.addEventListener('keydown', function (evento) {
    if (evento.key === 'ArrowLeft') {
      carrossel.prev();
    } else if (evento.key === 'ArrowRight') {
      carrossel.next();
    }
  });

  // O Bootstrap avisa (evento slide.bs.carousel) quando vai trocar de imagem;
  // evento.to é o número da imagem nova. Aqui a bolinha certa passa a ser a marcada.
  raiz.querySelector('.carousel').addEventListener('slide.bs.carousel', function (evento) {
    pontos.forEach(function (ponto, indice) {
      if (indice === evento.to) {
        ponto.setAttribute('aria-current', 'true');
      } else {
        ponto.removeAttribute('aria-current');
      }
    });
  });


  /* ---------- 5. Preferência "Reduzir animações" ----------
     js/acessibilidade.js dispara o evento "preferencias:mudou" a cada mudança no painel. */
  document.addEventListener('preferencias:mudou', function () {
    if (animacoesReduzidas()) {
      estado = 'pausado';
    } else if (estado === 'pausado' && !pausaManual) {
      estado = 'automatico';   // só volta a andar se não foi a pessoa que pausou
    }
    atualizar();
  });


  /* ---------- 6. Início ---------- */
  if (animacoesReduzidas()) estado = 'pausado';
  botaoPausa.hidden = false;   // os botões só aparecem agora que funcionam
  navegacao.hidden = false;
  atualizar();
})();

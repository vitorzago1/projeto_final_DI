/* ==========================================================================
   acessibilidade.js — painel de acessibilidade (botão fixo em todas as páginas)

   O que faz:
   1. cria o botão e o painel (o HTML está logo abaixo, em um só lugar,
      em vez de repetido nas quatro páginas);
   2. abre e fecha o painel, cuidando do foco do teclado;
   3. a cada mudança: guarda a escolha, aplica na página e avisa o que mudou.

   Guardar e aplicar ficam em js/preferencias.js (window.Preferencias).

   Ícones: Bootstrap Icons 1.13.2 (licença MIT), colados como SVG.
   ========================================================================== */
(function () {
  'use strict';

  const Preferencias = window.Preferencias;
  if (!Preferencias) return;   // sem preferencias.js não há o que fazer

  let prefs = Preferencias.ler();   // escolhas atuais


  /* ---------- 1. HTML do painel ----------
     - <fieldset> + <legend>: agrupa as opções e dá nome ao grupo.
     - Tema e tamanho são botões de rádio (só uma opção por grupo). A classe
       btn-check do Bootstrap esconde a bolinha e mostra o <label> como botão;
       pelo teclado continuam sendo rádios: as setas trocam de opção.
     - role="switch": caixa de seleção anunciada como interruptor (ligado/desligado).
     - role="status": o leitor de tela lê em voz alta o texto que aparecer ali.
     - aria-hidden="true" nos ícones: são decorativos, o texto ao lado já diz tudo. */
  const widget = document.createElement('div');
  widget.className = 'acess';
  widget.innerHTML = `
    <button class="acess-botao" type="button" aria-expanded="false" aria-controls="acess-painel">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path d="M8 4.143A1.071 1.071 0 1 0 8 2a1.071 1.071 0 0 0 0 2.143m-4.668 1.47 3.24.316v2.5l-.323 4.585A.383.383 0 0 0 7 13.14l.826-4.017c.045-.18.301-.18.346 0L9 13.139a.383.383 0 0 0 .752-.125L9.43 8.43v-2.5l3.239-.316a.38.38 0 0 0-.047-.756H3.379a.38.38 0 0 0-.047.756Z"/>
        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8"/>
      </svg>
      Acessibilidade
    </button>

    <section class="acess-painel" id="acess-painel" aria-labelledby="acess-titulo" hidden>
      <div class="acess-topo">
        <h2 class="acess-titulo" id="acess-titulo" tabindex="-1">Acessibilidade</h2>
        <button class="acess-fechar" type="button" aria-label="Fechar painel de acessibilidade">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
          </svg>
        </button>
      </div>

      <fieldset class="acess-grupo">
        <legend>Tema</legend>
        <div class="acess-opcoes">
          <input class="btn-check" type="radio" name="acess-tema" id="acess-tema-claro" value="claro">
          <label class="btn btn-contorno" for="acess-tema-claro">Claro</label>
          <input class="btn-check" type="radio" name="acess-tema" id="acess-tema-escuro" value="escuro">
          <label class="btn btn-contorno" for="acess-tema-escuro">Escuro</label>
          <input class="btn-check" type="radio" name="acess-tema" id="acess-tema-sistema" value="sistema">
          <label class="btn btn-contorno" for="acess-tema-sistema">Sistema</label>
        </div>
      </fieldset>

      <fieldset class="acess-grupo">
        <legend>Tamanho do texto</legend>
        <div class="acess-opcoes">
          <input class="btn-check" type="radio" name="acess-fonte" id="acess-fonte-100" value="100">
          <label class="btn btn-contorno" for="acess-fonte-100">100%</label>
          <input class="btn-check" type="radio" name="acess-fonte" id="acess-fonte-115" value="115">
          <label class="btn btn-contorno" for="acess-fonte-115">115%</label>
          <input class="btn-check" type="radio" name="acess-fonte" id="acess-fonte-130" value="130">
          <label class="btn btn-contorno" for="acess-fonte-130">130%</label>
        </div>
      </fieldset>

      <div class="acess-linha">
        <label for="acess-contraste">Alto contraste</label>
        <input class="interruptor" type="checkbox" role="switch" id="acess-contraste">
      </div>

      <div class="acess-linha">
        <label for="acess-animacoes">Reduzir animações</label>
        <input class="interruptor" type="checkbox" role="switch" id="acess-animacoes" aria-describedby="acess-animacoes-nota">
      </div>
      <p class="acess-nota" id="acess-animacoes-nota" hidden>Já ligado nas configurações do seu sistema.</p>

      <div class="acess-linha">
        <label for="acess-links">Sublinhar links</label>
        <input class="interruptor" type="checkbox" role="switch" id="acess-links">
      </div>

      <button class="btn btn-contorno w-100 mt-3" type="button" id="acess-restaurar">Restaurar padrão</button>

      <p class="acess-aviso" role="status"></p>
      <p class="acess-nota mb-0">Suas escolhas ficam guardadas só neste navegador.</p>
    </section>
  `;

  // O painel entra logo depois do link "pular para o conteúdo": é o segundo
  // item ao apertar Tab, mesmo aparecendo no canto de baixo da tela.
  const linkPular = document.querySelector('.link-pular');
  if (linkPular) {
    linkPular.after(widget);
  } else {
    document.body.prepend(widget);
  }

  // Atalhos para os elementos usados abaixo
  const botao = widget.querySelector('.acess-botao');
  const painel = widget.querySelector('.acess-painel');
  const titulo = widget.querySelector('.acess-titulo');
  const aviso = widget.querySelector('.acess-aviso');
  const campoContraste = widget.querySelector('#acess-contraste');
  const campoAnimacoes = widget.querySelector('#acess-animacoes');
  const notaAnimacoes = widget.querySelector('#acess-animacoes-nota');
  const campoLinks = widget.querySelector('#acess-links');


  /* ---------- 2. Abrir e fechar ---------- */

  function abrir() {
    painel.hidden = false;
    botao.setAttribute('aria-expanded', 'true');   // avisa o leitor de tela que o painel abriu
    titulo.focus();                                // leva o foco para dentro do painel
  }

  // devolverFoco = true quando a pessoa fechou pelo teclado ou pelo botão:
  // o foco volta para o botão que abriu, para ela não se perder na página.
  function fechar(devolverFoco) {
    painel.hidden = true;
    botao.setAttribute('aria-expanded', 'false');
    aviso.textContent = '';
    if (devolverFoco) botao.focus();
  }

  botao.addEventListener('click', function () {
    if (painel.hidden) {
      abrir();
    } else {
      fechar(true);
    }
  });

  widget.querySelector('.acess-fechar').addEventListener('click', function () {
    fechar(true);
  });

  // Tecla Esc fecha o painel
  widget.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && !painel.hidden) fechar(true);
  });

  // Clique fora do painel fecha
  document.addEventListener('click', function (evento) {
    if (!painel.hidden && !widget.contains(evento.target)) fechar(false);
  });

  // Se o foco do teclado sair do painel (Tab depois do último item), ele fecha,
  // para não ficar aberto cobrindo a página.
  widget.addEventListener('focusout', function (evento) {
    const destino = evento.relatedTarget;   // elemento que vai receber o foco
    if (!painel.hidden && destino && !widget.contains(destino)) fechar(false);
  });


  /* ---------- 3. Mostrar no painel as escolhas atuais ---------- */

  function atualizarPainel() {
    widget.querySelector('input[name="acess-tema"][value="' + prefs.tema + '"]').checked = true;
    widget.querySelector('input[name="acess-fonte"][value="' + prefs.fonte + '"]').checked = true;
    campoContraste.checked = prefs.contraste;
    campoLinks.checked = prefs.links;

    // Se o sistema operacional já pede menos animações, o interruptor aparece
    // ligado e travado, com uma nota explicando o motivo.
    const sistemaReduz = Preferencias.sistemaPede('(prefers-reduced-motion: reduce)');
    campoAnimacoes.checked = prefs.animacoes || sistemaReduz;
    campoAnimacoes.disabled = sistemaReduz;
    notaAnimacoes.hidden = !sistemaReduz;
  }


  /* ---------- 4. Mudar uma preferência ---------- */

  // Avisa outros scripts (por exemplo, o carrossel) de que as preferências mudaram.
  function avisarOutrosScripts() {
    document.dispatchEvent(new CustomEvent('preferencias:mudou', { detail: prefs }));
  }

  function mudar(nome, valor, mensagem) {
    prefs[nome] = valor;
    Preferencias.salvar(prefs);     // guarda no navegador
    Preferencias.aplicar(prefs);    // aplica na página
    atualizarPainel();
    aviso.textContent = mensagem;   // confirma na tela e para o leitor de tela
    avisarOutrosScripts();
  }

  const NOME_DO_TEMA = { claro: 'claro', escuro: 'escuro', sistema: 'igual ao do sistema' };

  // Um único "ouvinte" no painel recebe a mudança de qualquer campo dentro dele
  painel.addEventListener('change', function (evento) {
    const campo = evento.target;

    if (campo.name === 'acess-tema') {
      mudar('tema', campo.value, 'Tema: ' + NOME_DO_TEMA[campo.value] + '.');
    } else if (campo.name === 'acess-fonte') {
      mudar('fonte', campo.value, 'Tamanho do texto: ' + campo.value + '%.');
    } else if (campo === campoContraste) {
      mudar('contraste', campo.checked, campo.checked ? 'Alto contraste ligado.' : 'Alto contraste desligado.');
    } else if (campo === campoAnimacoes) {
      mudar('animacoes', campo.checked, campo.checked ? 'Animações reduzidas.' : 'Animações normais.');
    } else if (campo === campoLinks) {
      mudar('links', campo.checked, campo.checked ? 'Links sublinhados.' : 'Links sem sublinhado extra.');
    }
  });

  widget.querySelector('#acess-restaurar').addEventListener('click', function () {
    Preferencias.limpar();
    prefs = Preferencias.padrao();
    Preferencias.aplicar(prefs);
    atualizarPainel();
    aviso.textContent = 'Preferências restauradas para o padrão.';
    avisarOutrosScripts();
  });


  /* ---------- 5. Acompanhar o sistema operacional ----------
     Se a pessoa trocar o tema do sistema (ou a opção de reduzir movimento)
     com o site aberto, a página acompanha na hora. */
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
    Preferencias.aplicar(prefs);
  });

  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function () {
    Preferencias.aplicar(prefs);
    atualizarPainel();
    avisarOutrosScripts();
  });

  atualizarPainel();
})();

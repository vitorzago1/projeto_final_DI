/* ==========================================================================
   contato.js — formulário da página Contato

   Informa as regras de cada campo a js/formulario.js e, quando tudo está
   certo, simula o envio: mostra "Enviando…" por um instante e troca o
   formulário por uma confirmação.

   O site não tem servidor: nada é enviado nem guardado. A página avisa isso.
   ========================================================================== */
(function () {
  'use strict';

  const formulario = document.getElementById('form-contato');
  if (!formulario || !window.Formulario) return;

  const botaoEnviar = formulario.querySelector('button[type="submit"]');
  const anuncio = document.getElementById('contato-anuncio');
  const confirmacao = document.getElementById('contato-confirmacao');
  const confirmacaoTexto = document.getElementById('confirmacao-texto');

  const MINIMO_MENSAGEM = 10;


  /* ---------- 1. Regras ----------
     Cada função devolve a mensagem de erro, ou '' quando o campo está certo.
     As mensagens dizem o que fazer, sem culpar a pessoa. */
  const regras = {
    nome: function (campo) {
      const valor = campo.value.trim();
      if (valor === '') return 'Informe seu nome.';
      if (valor.length < 2) return 'O nome precisa ter pelo menos 2 letras.';
      return '';
    },

    email: function (campo) {
      const valor = campo.value.trim();
      if (valor === '') return 'Informe seu e-mail.';
      if (!Formulario.emailValido(valor)) return 'Digite um e-mail completo, como nome@exemplo.com.';
      return '';
    },

    assunto: function (campo) {
      return campo.value === '' ? 'Escolha um assunto.' : '';
    },

    mensagem: function (campo) {
      const tamanho = campo.value.trim().length;
      if (tamanho === 0) return 'Escreva sua mensagem.';
      if (tamanho < MINIMO_MENSAGEM) {
        const faltam = MINIMO_MENSAGEM - tamanho;
        return 'A mensagem precisa de pelo menos ' + MINIMO_MENSAGEM + ' caracteres. ' +
          (faltam === 1 ? 'Falta 1.' : 'Faltam ' + faltam + '.');
      }
      return '';
    },

    consentimento: function (campo) {
      return campo.checked ? '' : 'Marque a caixa para autorizar o uso dos seus dados na resposta.';
    }
  };


  /* ---------- 2. Envio simulado ---------- */
  function enviar() {
    // Guarda o que será mostrado na confirmação antes de limpar o formulário
    const assunto = formulario.elements.assunto.value;
    const email = formulario.elements.email.value.trim();

    // Estado "enviando": o botão trava (evita dois envios) e mostra o que está acontecendo
    botaoEnviar.disabled = true;
    botaoEnviar.textContent = 'Enviando…';
    formulario.setAttribute('aria-busy', 'true');
    anuncio.textContent = 'Enviando a mensagem.';

    // Em um site com servidor, aqui os dados seriam enviados (fetch) e a resposta, aguardada.
    // A espera de menos de um segundo só imita esse tempo.
    window.setTimeout(function () {
      // textContent: o que a pessoa digitou entra como texto puro, nunca como código HTML
      confirmacaoTexto.textContent = 'Em um site com servidor, sua mensagem sobre “' + assunto +
        '” seguiria agora para o Vitor, e a resposta iria para ' + email +
        '. Aqui nada foi enviado nem guardado.';

      formulario.reset();
      botaoEnviar.disabled = false;
      botaoEnviar.textContent = 'Enviar mensagem';
      formulario.removeAttribute('aria-busy');
      anuncio.textContent = '';

      formulario.hidden = true;
      confirmacao.hidden = false;
      confirmacao.focus();   // o leitor de tela lê a confirmação; o teclado continua dali
    }, 800);
  }

  Formulario.preparar(formulario, {
    regras: regras,
    resumo: document.getElementById('contato-resumo'),
    aoEnviar: enviar
  });


  /* ---------- 3. Escrever outra mensagem ---------- */
  document.getElementById('nova-mensagem').addEventListener('click', function () {
    confirmacao.hidden = true;
    formulario.hidden = false;
    document.getElementById('nome').focus();
  });
})();

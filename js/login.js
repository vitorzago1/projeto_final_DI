/* ==========================================================================
   login.js — formulário da página Entrar (login de demonstração)

   - confere e-mail e senha (regras passadas a js/formulario.js);
   - botão que mostra e oculta a senha;
   - "Lembrar de mim": guarda SÓ o e-mail no navegador;
   - simula o resultado: entra com os dados de demonstração, ou mostra
     "E-mail ou senha incorretos".

   SEGURANÇA
   - A senha NUNCA é guardada (nem em localStorage, nem em lugar nenhum).
   - Isto não é um login de verdade. Os dados de demonstração abaixo estão à
     vista de qualquer pessoa que abrir este arquivo. Em um site real, a
     senha é conferida no servidor, nunca no navegador.
   ========================================================================== */
(function () {
  'use strict';

  const formulario = document.getElementById('form-login');
  if (!formulario || !window.Formulario) return;

  const campoEmail = document.getElementById('email');
  const campoSenha = document.getElementById('senha');
  const caixaLembrar = document.getElementById('lembrar');
  const botaoMostrar = document.getElementById('mostrar-senha');
  const textoMostrar = document.getElementById('mostrar-senha-texto');
  const anuncio = document.getElementById('login-anuncio');
  const confirmacao = document.getElementById('login-confirmacao');
  const confirmacaoTexto = document.getElementById('login-confirmacao-texto');

  // Dados de demonstração, os mesmos mostrados na página
  const DEMO = { email: 'visitante@example.com', senha: 'demonstracao' };

  const CHAVE_EMAIL = 'vz-login-email';   // nome usado no localStorage para o e-mail lembrado
  const MINIMO_SENHA = 8;


  /* ---------- 1. Regras ---------- */
  const regras = {
    email: function (campo) {
      const valor = campo.value.trim();
      if (valor === '') return 'Informe seu e-mail.';
      if (!Formulario.emailValido(valor)) return 'Digite um e-mail completo, como nome@exemplo.com.';
      return '';
    },

    senha: function (campo) {
      // A senha não passa por trim(): espaços podem fazer parte dela
      if (campo.value === '') return 'Informe sua senha.';
      if (campo.value.length < MINIMO_SENHA) return 'A senha tem pelo menos ' + MINIMO_SENHA + ' caracteres.';
      return '';
    }
  };


  /* ---------- 2. Mostrar e ocultar a senha ---------- */
  function definirSenhaVisivel(visivel) {
    // type="text" mostra as letras; type="password" mostra bolinhas
    campoSenha.type = visivel ? 'text' : 'password';
    textoMostrar.textContent = visivel ? 'Ocultar' : 'Mostrar';   // o botão diz o que vai fazer
  }

  botaoMostrar.addEventListener('click', function () {
    const visivel = campoSenha.type === 'password';
    definirSenhaVisivel(visivel);
    anuncio.textContent = visivel ? 'A senha está visível.' : 'A senha está oculta.';
  });


  /* ---------- 3. Lembrar de mim: só o e-mail ---------- */
  function lerEmailLembrado() {
    try {
      return localStorage.getItem(CHAVE_EMAIL) || '';
    } catch (erro) {
      return '';   // localStorage bloqueado
    }
  }

  function guardarOuEsquecerEmail(email) {
    try {
      if (caixaLembrar.checked) {
        localStorage.setItem(CHAVE_EMAIL, email);   // guarda o e-mail; a senha, nunca
      } else {
        localStorage.removeItem(CHAVE_EMAIL);
      }
    } catch (erro) {
      // sem localStorage o e-mail simplesmente não é lembrado
    }
  }

  // Ao abrir a página: se há um e-mail lembrado, ele já vem preenchido
  const emailLembrado = lerEmailLembrado();
  if (emailLembrado) {
    campoEmail.value = emailLembrado;
    caixaLembrar.checked = true;
  }


  /* ---------- 4. Entrar (simulado) ---------- */
  const validacao = Formulario.preparar(formulario, {
    regras: regras,
    resumo: document.getElementById('login-resumo'),
    aoEnviar: entrar
  });

  function entrar() {
    const email = campoEmail.value.trim().toLowerCase();
    const senha = campoSenha.value;

    definirSenhaVisivel(false);   // a senha volta a ficar oculta antes de qualquer resultado
    campoSenha.value = '';        // e sai do campo: não fica na tela nem na memória da página

    if (email === DEMO.email && senha === DEMO.senha) {
      guardarOuEsquecerEmail(email);

      // textContent: o e-mail digitado entra como texto puro, nunca como código HTML
      confirmacaoTexto.textContent = 'Você entrou como ' + email +
        '. Em um site com servidor, aqui abriria a sua área. Este login é só uma demonstração.';
      formulario.hidden = true;
      confirmacao.hidden = false;
      confirmacao.focus();
    } else {
      // A mensagem não diz qual dos dois está errado: é o costume em logins,
      // para não ajudar quem tenta adivinhar a senha de outra pessoa.
      validacao.mostrarResumo('E-mail ou senha incorretos. Use os dados de demonstração do quadro acima.', []);
      campoSenha.focus();
    }
  }


  /* ---------- 5. Sair ---------- */
  document.getElementById('sair').addEventListener('click', function () {
    confirmacao.hidden = true;
    formulario.hidden = false;
    if (!caixaLembrar.checked) campoEmail.value = '';
    campoEmail.focus();
  });
})();

/* ==========================================================================
   formulario.js — validação usada pelos formulários do site (Contato e Login)

   Como cada erro chega à pessoa:
   - o campo errado recebe aria-invalid="true" e a mensagem aparece logo abaixo
     dele, em um parágrafo já ligado ao campo por aria-describedby (no HTML);
     o leitor de tela lê a mensagem junto com o campo;
   - um resumo no topo do formulário (role="alert", aria-live="assertive")
     lista os campos a corrigir, e o leitor de tela lê na hora;
   - o foco vai para o primeiro campo com erro.

   Quando a conferência acontece:
   - ao enviar: todos os campos;
   - depois disso, enquanto a pessoa corrige um campo com erro: a cada tecla,
     para o erro sumir assim que o valor ficar certo.

   Por que não conferir ao sair de cada campo: a mensagem de erro que aparece
   empurra o resto do formulário para baixo. Se isso acontece no instante em
   que a pessoa clica em "Enviar", o botão sai de baixo do mouse e o clique
   se perde. Conferir só no envio evita esse problema e é o padrão
   recomendado em guias de formulários acessíveis.

   Cada página informa as suas regras; veja js/contato.js e js/login.js.
   ========================================================================== */
window.Formulario = (function () {
  'use strict';

  // Formato básico de e-mail: algo@algo.algo, sem espaços.
  // Só dá para ter certeza de que um e-mail existe enviando uma mensagem para ele.
  function emailValido(texto) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto);
  }

  // Nome do campo usado no resumo de erros: o texto do <label> (ex.: "E-mail").
  // Quando o label é uma frase longa, o HTML traz um nome curto em data-nome.
  function rotulo(campo) {
    return campo.dataset.nome || campo.labels[0].textContent.trim();
  }

  // Parágrafo de erro do campo: tem o id do campo seguido de "-erro"
  function paragrafoDeErro(campo) {
    return document.getElementById(campo.id + '-erro');
  }

  function mostrarErro(campo, mensagem) {
    campo.setAttribute('aria-invalid', 'true');
    paragrafoDeErro(campo).textContent = mensagem;
  }

  function limparErro(campo) {
    campo.removeAttribute('aria-invalid');
    paragrafoDeErro(campo).textContent = '';
  }

  /* Liga a validação a um formulário.

     opcoes.regras    objeto { idDoCampo: função }. A função recebe o campo e
                      devolve a mensagem de erro, ou '' se o valor está certo.
     opcoes.resumo    elemento do resumo de erros (role="alert")
     opcoes.aoEnviar  função chamada quando todos os campos estão certos

     Devolve um objeto com funções para a página mostrar ou esconder o resumo. */
  function preparar(formulario, opcoes) {
    const campos = Object.keys(opcoes.regras).map(function (id) {
      return document.getElementById(id);
    });
    const resumoTitulo = opcoes.resumo.querySelector('.aviso-titulo');
    const resumoLista = opcoes.resumo.querySelector('.aviso-lista');

    // Desliga os balões de erro do próprio navegador: as mensagens passam a ser as do site.
    // Isso é feito aqui, e não no HTML, para o navegador continuar validando se o JavaScript falhar.
    formulario.noValidate = true;

    // Confere um campo e mostra ou limpa o erro. Devolve a mensagem ('' se está certo).
    function validar(campo) {
      const mensagem = opcoes.regras[campo.id](campo);
      if (mensagem) {
        mostrarErro(campo, mensagem);
      } else {
        limparErro(campo);
      }
      return mensagem;
    }

    // titulo: frase principal; erros: lista de { campo, mensagem } (pode ser vazia)
    function mostrarResumo(titulo, erros) {
      opcoes.resumo.hidden = false;
      resumoTitulo.textContent = titulo;
      resumoLista.textContent = '';   // apaga os itens anteriores

      erros.forEach(function (erro) {
        // Cada item é um link que leva o foco ao campo com erro.
        // textContent: tudo entra como texto puro, nunca como código HTML.
        const link = document.createElement('a');
        link.href = '#' + erro.campo.id;
        link.textContent = rotulo(erro.campo) + ': ' + erro.mensagem;
        link.addEventListener('click', function (evento) {
          evento.preventDefault();
          erro.campo.focus();
        });

        const item = document.createElement('li');
        item.appendChild(link);
        resumoLista.appendChild(item);
      });
    }

    function esconderResumo() {
      opcoes.resumo.hidden = true;
    }

    campos.forEach(function (campo) {
      // Enquanto a pessoa corrige um campo que está com erro.
      // Caixas de seleção e listas avisam com "change"; campos de texto, com "input" (a cada tecla).
      const evento = (campo.type === 'checkbox' || campo.tagName === 'SELECT') ? 'change' : 'input';
      campo.addEventListener(evento, function () {
        if (!campo.hasAttribute('aria-invalid')) return;
        validar(campo);
        // Quando o último erro é corrigido, o resumo deixa de fazer sentido
        if (!formulario.querySelector('[aria-invalid="true"]')) esconderResumo();
      });
    });

    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault();   // não deixa o navegador recarregar a página

      const erros = [];
      campos.forEach(function (campo) {
        const mensagem = validar(campo);
        if (mensagem) erros.push({ campo: campo, mensagem: mensagem });
      });

      if (erros.length > 0) {
        const titulo = erros.length === 1
          ? 'Falta corrigir 1 campo:'
          : 'Falta corrigir ' + erros.length + ' campos:';
        mostrarResumo(titulo, erros);
        erros[0].campo.focus();   // leva a pessoa direto ao primeiro problema
        return;
      }

      esconderResumo();
      opcoes.aoEnviar();
    });

    return { mostrarResumo: mostrarResumo, esconderResumo: esconderResumo };
  }

  return { emailValido: emailValido, preparar: preparar };
})();

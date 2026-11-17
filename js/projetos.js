/* ==========================================================================
   projetos.js — filtros da página Projetos

   Dois filtros funcionam juntos:
   1. pesquisa: filtra enquanto a pessoa digita, olhando o título, as
      tecnologias e as tags de cada cartão;
   2. abas de categoria: Todos, Sites, Repositórios.

   Um cartão aparece só se passar nos dois. Quando nada passa, entra o aviso
   "Nenhum projeto encontrado", com um botão para limpar os filtros.

   Os projetos ficam escritos no HTML (projetos.html). Este arquivo não cria
   cartões: só esconde e mostra os que já existem.
   ========================================================================== */
(function () {
  'use strict';

  const filtros = document.querySelector('.filtros');
  if (!filtros) return;   // página sem filtros

  const campo = document.getElementById('pesquisa');
  const abas = Array.from(document.querySelectorAll('.aba'));
  const painel = document.getElementById('painel-projetos');
  const lista = document.querySelector('.lista-projetos');
  const itens = Array.from(lista.children);   // cada <li> é um projeto
  const situacao = document.getElementById('filtro-situacao');
  const semResultado = document.getElementById('sem-resultado');
  const semResultadoTexto = document.getElementById('sem-resultado-texto');

  let categoria = 'todos';   // aba escolhida


  /* ---------- 1. Preparar o texto pesquisável ---------- */

  // Deixa o texto em minúsculas e sem acentos, para "educacao" encontrar "Educação".
  // normalize('NFD') separa a letra do acento ("ã" vira "a" + "~") e o replace apaga os acentos.
  function simplificar(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  // Para cada cartão, junta título + tecnologias + tags em um texto só.
  // Feito uma vez, ao abrir a página; a cada tecla só é preciso comparar.
  const textos = itens.map(function (item) {
    const partes = ['.projeto-titulo', '.projeto-tecnologias', '.projeto-tags'].map(function (seletor) {
      const elemento = item.querySelector(seletor);
      return elemento ? elemento.textContent : '';
    });
    return simplificar(partes.join(' '));
  });


  /* ---------- 2. Filtrar ---------- */

  function filtrar() {
    // "python jogo" vira ['python', 'jogo']: o cartão precisa ter as duas palavras
    const palavras = simplificar(campo.value).split(/\s+/).filter(Boolean);
    let visiveis = 0;

    itens.forEach(function (item, indice) {
      const naCategoria = categoria === 'todos' || item.dataset.categoria === categoria;
      const temAsPalavras = palavras.every(function (palavra) {
        return textos[indice].includes(palavra);
      });

      item.hidden = !(naCategoria && temAsPalavras);
      if (!item.hidden) visiveis++;
    });

    mostrarSituacao(visiveis);
  }

  // Atualiza a frase de situação e o aviso de "nenhum resultado".
  function mostrarSituacao(visiveis) {
    const total = itens.length;
    const termo = campo.value.trim();

    const nenhum = visiveis === 0;
    semResultado.hidden = !nenhum;
    lista.hidden = nenhum;   // lista vazia sai da tela, para não deixar um espaço em branco
    // Sem resultados, o aviso grande já diz tudo na tela; a frase curta fica só para o leitor de tela
    situacao.classList.toggle('visually-hidden', nenhum);

    if (nenhum) {
      situacao.textContent = 'Nenhum projeto encontrado.';

      const abaAtual = abas.find(function (aba) { return aba.dataset.categoria === categoria; });
      const ondeProcurou = categoria === 'todos' ? '' : ' na categoria ' + abaAtual.textContent;
      // textContent (e não innerHTML): o que a pessoa digitou entra como texto puro,
      // nunca como código HTML. Isso evita injeção de código na página.
      semResultadoTexto.textContent = 'Nenhum projeto combina com “' + termo + '”' + ondeProcurou +
        '. Confira a grafia ou tente outra palavra, como o nome de uma tecnologia.';
    } else if (visiveis === total) {
      situacao.textContent = 'Mostrando todos os ' + total + ' projetos.';
    } else {
      situacao.textContent = 'Mostrando ' + visiveis + ' de ' + total + ' projetos.';
    }
  }

  // "input" acontece a cada tecla (e também ao colar ou apagar): é o filtro em tempo real
  campo.addEventListener('input', filtrar);

  // Enter no campo não deve recarregar a página
  filtros.querySelector('form').addEventListener('submit', function (evento) {
    evento.preventDefault();
  });


  /* ---------- 3. Abas ---------- */

  function escolherAba(aba) {
    abas.forEach(function (outra) {
      const escolhida = outra === aba;
      outra.setAttribute('aria-selected', escolhida ? 'true' : 'false');
      // Só a aba escolhida entra na ordem do Tab; as outras são alcançadas pelas setas
      outra.tabIndex = escolhida ? 0 : -1;
    });

    categoria = aba.dataset.categoria;
    painel.setAttribute('aria-labelledby', aba.id);   // o painel passa a ter o nome da aba escolhida
    filtrar();
  }

  abas.forEach(function (aba, indice) {
    aba.addEventListener('click', function () {
      escolherAba(aba);
      // Safari e Firefox no Mac não dão foco a um botão clicado com o mouse.
      // Dar o foco aqui faz as setas do teclado funcionarem logo depois do clique.
      aba.focus();
    });

    // Teclado, com o foco em uma aba: ← → andam entre as abas, Home vai à primeira e End à última
    aba.addEventListener('keydown', function (evento) {
      let destino = null;
      if (evento.key === 'ArrowRight') destino = abas[(indice + 1) % abas.length];
      if (evento.key === 'ArrowLeft') destino = abas[(indice - 1 + abas.length) % abas.length];
      if (evento.key === 'Home') destino = abas[0];
      if (evento.key === 'End') destino = abas[abas.length - 1];

      if (destino) {
        evento.preventDefault();
        escolherAba(destino);
        destino.focus();
      }
    });
  });


  /* ---------- 4. Limpar os filtros ---------- */
  document.getElementById('limpar-filtros').addEventListener('click', function () {
    campo.value = '';
    escolherAba(abas[0]);   // volta para "Todos" e refaz o filtro
    campo.focus();          // o botão some junto com o aviso; o foco vai para o campo
  });


  /* ---------- 5. Início ---------- */
  filtros.hidden = false;   // os filtros só aparecem agora que funcionam
  filtrar();
})();

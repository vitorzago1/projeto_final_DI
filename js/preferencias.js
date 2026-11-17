/* ==========================================================================
   preferencias.js — guarda e aplica as escolhas do painel de acessibilidade

   Este arquivo é carregado no <head>, SEM "defer". O navegador para e roda
   este script antes de desenhar a página; assim o tema escolhido já está
   aplicado no primeiro instante e o tema errado nunca pisca na tela.

   As escolhas ficam no localStorage — um "bloco de notas" que o navegador
   guarda para cada site e que continua lá depois de fechar a aba.
   Só preferências de exibição são guardadas; nenhum dado pessoal.

   Como as escolhas chegam ao CSS: este script escreve atributos no <html>
   (por exemplo data-bs-theme="dark") e o css/estilo.css reage a eles.
   ========================================================================== */
(function () {
  'use strict';

  const CHAVE = 'vz-preferencias';          // nome da "página" do bloco de notas
  const TEMAS = ['claro', 'escuro', 'sistema'];
  const FONTES = ['100', '115', '130'];     // tamanho do texto, em %

  // Pergunta ao navegador o que o sistema operacional pede.
  // Exemplo: sistemaPede('(prefers-color-scheme: dark)') → true se o sistema está no modo escuro.
  function sistemaPede(consulta) {
    return window.matchMedia(consulta).matches;
  }

  // Valores usados quando a pessoa ainda não escolheu nada (e em "Restaurar padrão").
  function padrao() {
    return {
      tema: 'sistema',                                      // segue o sistema
      fonte: '100',
      contraste: sistemaPede('(prefers-contrast: more)'),   // liga sozinho se o sistema pede mais contraste
      animacoes: false,                                     // true = reduzir animações
      links: false                                          // true = sublinhar links
    };
  }

  // Lê as escolhas guardadas. Qualquer valor ausente ou inválido cai no padrão.
  function ler() {
    const prefs = padrao();
    let salvas = null;

    try {
      salvas = JSON.parse(localStorage.getItem(CHAVE));
    } catch (erro) {
      // localStorage bloqueado (ex.: navegação privada) ou texto inválido: segue com o padrão
    }

    if (salvas && typeof salvas === 'object') {
      if (TEMAS.includes(salvas.tema)) prefs.tema = salvas.tema;
      if (FONTES.includes(salvas.fonte)) prefs.fonte = salvas.fonte;
      if (typeof salvas.contraste === 'boolean') prefs.contraste = salvas.contraste;
      if (typeof salvas.animacoes === 'boolean') prefs.animacoes = salvas.animacoes;
      if (typeof salvas.links === 'boolean') prefs.links = salvas.links;
    }
    return prefs;
  }

  function salvar(prefs) {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(prefs));
    } catch (erro) {
      // sem localStorage as escolhas valem só até fechar a página
    }
  }

  function limpar() {
    try {
      localStorage.removeItem(CHAVE);
    } catch (erro) {
      // nada a limpar
    }
  }

  // Liga ou desliga um atributo no elemento.
  function marcar(elemento, atributo, valor, ligado) {
    if (ligado) {
      elemento.setAttribute(atributo, valor);
    } else {
      elemento.removeAttribute(atributo);
    }
  }

  // Escreve as escolhas no <html>, de onde o CSS as lê.
  function aplicar(prefs) {
    const raiz = document.documentElement;   // o elemento <html>

    // "sistema" é resolvido aqui: vira claro ou escuro conforme o sistema operacional
    const escuro = prefs.tema === 'escuro' ||
      (prefs.tema === 'sistema' && sistemaPede('(prefers-color-scheme: dark)'));

    // data-bs-theme é o atributo que o Bootstrap usa para o modo escuro
    raiz.setAttribute('data-bs-theme', escuro ? 'dark' : 'light');
    raiz.setAttribute('data-fonte', prefs.fonte);
    marcar(raiz, 'data-contraste', 'alto', prefs.contraste);
    marcar(raiz, 'data-links', 'sublinhados', prefs.links);

    // Animações reduzidas se a pessoa pediu no painel OU se o sistema pede
    const reduzir = prefs.animacoes || sistemaPede('(prefers-reduced-motion: reduce)');
    marcar(raiz, 'data-animacoes', 'reduzidas', reduzir);
  }

  // Disponibiliza as funções para js/acessibilidade.js (o painel)
  window.Preferencias = { padrao, ler, salvar, limpar, aplicar, sistemaPede };

  // Marca no <html> que o JavaScript está funcionando. O CSS usa essa classe para
  // mostrar, já no primeiro instante, o que só funciona com JavaScript (filtros de Projetos).
  document.documentElement.classList.add('com-js');

  // Aplica imediatamente, antes de a página ser desenhada
  aplicar(ler());
})();

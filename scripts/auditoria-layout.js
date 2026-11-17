/* ==========================================================================
   auditoria-layout.js — confere se o site se adapta a telas estreitas e a
   texto ampliado

   1. Sem rolagem lateral (WCAG 1.4.10, "Refluxo"): em 320px e 390px de
      largura, com o texto em 100%, 115% e 130%, a página não pode ficar mais
      larga que a tela. 320px de largura equivale a uma janela de 1280px com
      zoom de 400%. Os formulários são conferidos também com os erros à mostra.
   2. Tamanho dos alvos (WCAG 2.2, critério 2.5.8): botões e controles com
      pelo menos 24 × 24 pixels. Links no meio de um texto ficam de fora,
      como o próprio critério prevê.

   Resultado: docs/auditoria/layout.md
   Como rodar: node scripts/auditoria-layout.js   (precisa do Playwright)
   ========================================================================== */
const { chromium } = require('playwright');
const { PAGINAS, TEMAS, preferencias, iniciarServidor, gravarDoc } = require('./apoio.js');

const LARGURAS_ESTREITAS = [320, 390];
const TAMANHOS_DE_TEXTO = ['100', '115', '130'];
const ALVO_MINIMO = 24;   // pixels

// Roda dentro da página: lista o que passa da largura da tela.
function elementosVazando() {
  const larguraDaTela = document.documentElement.clientWidth;
  const vazando = [];
  document.querySelectorAll('body *').forEach(function (el) {
    const caixa = el.getBoundingClientRect();
    const fixo = getComputedStyle(el).position === 'fixed';
    if (caixa.width > 0 && caixa.right > larguraDaTela + 0.5 && !fixo) {
      vazando.push(el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ')[0] : ''));
    }
  });
  return {
    rolagemLateral: document.documentElement.scrollWidth > larguraDaTela,
    vazando: vazando.slice(0, 5)
  };
}

// Roda dentro da página: lista botões e controles menores que o mínimo.
function alvosPequenos(minimo) {
  const pequenos = [];
  document.querySelectorAll('button, input, select, textarea, a.btn, .nav-link, .navbar-brand').forEach(function (el) {
    let caixa = el.getBoundingClientRect();
    // Rádio em forma de botão: o alvo de toque é o <label> ao lado
    if (el.classList.contains('btn-check') && el.nextElementSibling) caixa = el.nextElementSibling.getBoundingClientRect();
    if (caixa.width === 0 || el.closest('[hidden]')) return;   // escondido
    if (caixa.width < minimo || caixa.height < minimo) {
      pequenos.push((el.getAttribute('aria-label') || el.textContent.trim() || el.id) +
        ' (' + Math.round(caixa.width) + '×' + Math.round(caixa.height) + ')');
    }
  });
  return pequenos;
}

(async function () {
  const servidor = await iniciarServidor();
  const navegador = await chromium.launch();
  const problemas = [];
  const linhasRefluxo = [];
  let combinacoes = 0;

  /* ---------- 1. Refluxo ---------- */
  for (const pagina of PAGINAS) {
    const resultados = [];
    for (const largura of LARGURAS_ESTREITAS) {
      for (const texto of TAMANHOS_DE_TEXTO) {
        const contexto = await navegador.newContext({ viewport: { width: largura, height: 800 } });
        await contexto.addInitScript(function (prefs) {
          localStorage.setItem('vz-preferencias', JSON.stringify(prefs));
        }, preferencias(TEMAS[0], { fonte: texto }));
        const page = await contexto.newPage();
        await page.goto(servidor.url + pagina.arquivo, { waitUntil: 'load' });

        // Formulários: mostra os erros (o estado mais "cheio" da página)
        const enviar = page.locator('main form button[type="submit"]');
        if (await enviar.count() > 0) await enviar.click();
        // Painel de acessibilidade aberto também não pode vazar
        await page.locator('.acess-botao').click();

        const r = await page.evaluate(elementosVazando);
        combinacoes++;
        resultados.push(r.rolagemLateral ? '**NÃO**' : 'sim');
        if (r.rolagemLateral) {
          problemas.push(pagina.nome + ', ' + largura + 'px, texto ' + texto + '%: rolagem lateral (' + r.vazando.join(', ') + ')');
        }
        await contexto.close();
      }
    }
    linhasRefluxo.push('| ' + pagina.nome + ' | ' + resultados.join(' | ') + ' |');
  }

  /* ---------- 2. Tamanho dos alvos ---------- */
  const linhasAlvos = [];
  for (const pagina of PAGINAS) {
    const contexto = await navegador.newContext({ viewport: { width: 390, height: 800 } });
    await contexto.addInitScript(function (prefs) {
      localStorage.setItem('vz-preferencias', JSON.stringify(prefs));
    }, preferencias(TEMAS[0]));
    const page = await contexto.newPage();
    await page.goto(servidor.url + pagina.arquivo, { waitUntil: 'load' });
    await page.locator('.navbar-toggler').click();   // abre o menu do celular
    await page.locator('.acess-botao').click();      // e o painel de acessibilidade
    await page.waitForTimeout(500);

    const pequenos = await page.evaluate(alvosPequenos, ALVO_MINIMO);
    linhasAlvos.push('| ' + pagina.nome + ' | ' + (pequenos.length === 0 ? 'nenhum' : pequenos.join('; ')) + ' |');
    pequenos.forEach(function (alvo) { problemas.push(pagina.nome + ': alvo menor que ' + ALVO_MINIMO + 'px — ' + alvo); });
    await contexto.close();
  }

  const cabecalho = [];
  LARGURAS_ESTREITAS.forEach(function (largura) {
    TAMANHOS_DE_TEXTO.forEach(function (texto) { cabecalho.push(largura + 'px, ' + texto + '%'); });
  });

  gravarDoc('auditoria/layout.md', [
    '# Auditoria de layout: telas estreitas, texto ampliado e tamanho dos alvos',
    '',
    '> Arquivo gerado por `scripts/auditoria-layout.js`. Não edite à mão.',
    '',
    '## Sem rolagem lateral (WCAG 1.4.10)',
    '',
    'Cada célula responde: a página cabe na largura da tela, sem rolagem lateral? O teste é feito com o',
    'painel de acessibilidade aberto e, nas páginas com formulário, com os erros à mostra.',
    '320px de largura equivale a uma janela de 1280px com zoom de 400%.',
    '',
    '| Página | ' + cabecalho.join(' | ') + ' |',
    '|--------|' + cabecalho.map(function () { return ':-:'; }).join('|') + '|',
    ...linhasRefluxo,
    '',
    '## Tamanho dos alvos de toque (WCAG 2.2, critério 2.5.8)',
    '',
    'Botões e controles com menos de ' + ALVO_MINIMO + ' × ' + ALVO_MINIMO + ' pixels, em 390px de largura, com o menu e o painel abertos.',
    '',
    '| Página | Alvos menores que ' + ALVO_MINIMO + 'px |',
    '|--------|------|',
    ...linhasAlvos,
    '',
    '**Total de problemas: ' + problemas.length + '** (' + combinacoes + ' combinações de página, largura e tamanho de texto).',
    ...(problemas.length > 0 ? ['', '## Problemas', ''].concat(problemas.map(function (p) { return '- ' + p; })) : [])
  ]);

  console.log(problemas.length + ' problema(s) em ' + combinacoes + ' combinações.');
  problemas.forEach(function (p) { console.log('   - ' + p); });

  await navegador.close();
  servidor.fechar();
  if (problemas.length > 0) process.exit(1);
})();

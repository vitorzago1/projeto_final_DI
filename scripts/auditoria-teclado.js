/* ==========================================================================
   auditoria-teclado.js — confere o uso do site só com o teclado

   Para cada página, em duas larguras de tela, o script aperta Tab até passar
   por tudo e confere:

   1. Alcance: todo elemento clicável visível recebe foco (nada fica de fora).
   2. Ordem: a ordem do foco é a ordem em que os elementos aparecem no HTML.
   3. Foco visível: cada elemento focado mostra um contorno de pelo menos 2px.
   4. Foco não encoberto: o elemento focado não fica escondido atrás do botão
      fixo "Acessibilidade".
   5. Sem armadilha: depois do último elemento, o foco sai da página.
   6. Link "Pular para o conteúdo": leva o foco ao <main>.
   7. Painel de acessibilidade: abre com Enter, fecha com Esc e devolve o foco.
   8. Menu do celular: abre com Enter e os links passam a receber foco.

   Resultado: docs/auditoria/teclado.md
   Como rodar: node scripts/auditoria-teclado.js   (precisa do Playwright)
   ========================================================================== */
const { chromium } = require('playwright');
const { PAGINAS, TEMAS, LARGURAS, preferencias, iniciarServidor, gravarDoc } = require('./apoio.js');

const LIMITE_DE_TABS = 120;   // segurança contra laço infinito


/* ---------- Funções que rodam DENTRO da página ---------- */

// Lista os elementos que devem receber foco pelo Tab: clicáveis, visíveis e habilitados.
function listarFocaveis() {
  const candidatos = document.querySelectorAll('a[href], button, input, select, textarea, [tabindex]');
  const lista = [];
  candidatos.forEach(function (el) {
    const caixa = el.getBoundingClientRect();
    const estilo = getComputedStyle(el);
    const visivel = caixa.width > 0 && caixa.height > 0 && estilo.visibility !== 'hidden';
    // tabindex="-1" fica fora da ordem do Tab de propósito (abas não escolhidas, <main>)
    if (visivel && !el.disabled && el.tabIndex >= 0 && !el.closest('[hidden]')) {
      lista.push(el.getAttribute('aria-label') || el.textContent.trim().replace(/\s+/g, ' ') || el.id || el.tagName);
    }
  });
  return lista;
}

// Espera a página parar de se mexer depois de um Tab. Ao receber foco, um elemento
// fora da tela é trazido para dentro com rolagem, e isso pode levar alguns instantes.
// A função só termina quando a posição fica igual por 3 quadros seguidos (ou após 1,5 s).
function esperarParar() {
  return new Promise(function (resolver) {
    const inicio = performance.now();
    let anterior = null;
    let iguais = 0;

    function conferir() {
      const el = document.activeElement;
      const posicao = window.scrollY + '/' + (el ? el.getBoundingClientRect().top : 0);
      iguais = posicao === anterior ? iguais + 1 : 0;
      anterior = posicao;
      if (iguais >= 3 || performance.now() - inicio > 1500) {
        resolver();
      } else {
        requestAnimationFrame(conferir);
      }
    }
    requestAnimationFrame(conferir);
  });
}

// Descreve o elemento que está com o foco agora.
function descreverFoco() {
  const el = document.activeElement;
  if (!el || el === document.body) return null;

  const estilo = getComputedStyle(el);
  const caixa = el.getBoundingClientRect();
  const nome = el.getAttribute('aria-label') || el.textContent.trim().replace(/\s+/g, ' ') || el.id || el.tagName;

  // Contorno de foco: o do próprio elemento ou, nos rádios em forma de botão, o do <label> vizinho
  let contorno = parseFloat(estilo.outlineWidth);
  if (estilo.outlineStyle === 'none') contorno = 0;
  if (contorno === 0 && el.classList.contains('btn-check') && el.nextElementSibling) {
    const vizinho = getComputedStyle(el.nextElementSibling);
    contorno = vizinho.outlineStyle === 'none' ? 0 : parseFloat(vizinho.outlineWidth);
  }

  // Quanto do elemento está atrás do botão fixo "Acessibilidade" (0 = nada, 1 = tudo)
  let encoberto = 0;
  const fixo = document.querySelector('.acess-botao');
  if (fixo && !el.closest('.acess')) {
    const f = fixo.getBoundingClientRect();
    const largura = Math.max(0, Math.min(caixa.right, f.right) - Math.max(caixa.left, f.left));
    const altura = Math.max(0, Math.min(caixa.bottom, f.bottom) - Math.max(caixa.top, f.top));
    encoberto = (largura * altura) / (caixa.width * caixa.height);
  }

  const naTela = caixa.top >= 0 && caixa.left >= 0 &&
    caixa.bottom <= window.innerHeight + 1 && caixa.right <= window.innerWidth + 1;

  return { nome: nome, contorno: contorno, encoberto: encoberto, naTela: naTela };
}


/* ---------- Auditoria de uma página em uma largura ---------- */

async function auditar(navegador, base, pagina, largura) {
  const contexto = await navegador.newContext({ viewport: { width: largura.largura, height: largura.altura } });
  await contexto.addInitScript(function (prefs) {
    localStorage.setItem('vz-preferencias', JSON.stringify(prefs));
  }, preferencias(TEMAS[0]));
  const page = await contexto.newPage();
  await page.goto(base + pagina.arquivo, { waitUntil: 'load' });

  const problemas = [];
  const esperados = await page.evaluate(listarFocaveis);

  // Percorre a página com Tab
  const percorridos = [];
  for (let i = 0; i < LIMITE_DE_TABS; i++) {
    await page.keyboard.press('Tab');
    await page.evaluate(esperarParar);
    const foco = await page.evaluate(descreverFoco);
    if (!foco) break;   // o foco saiu da página: fim
    percorridos.push(foco);

    if (foco.contorno < 2) problemas.push('Foco sem contorno visível: “' + foco.nome + '”');
    if (!foco.naTela) problemas.push('Elemento focado fora da tela: “' + foco.nome + '”');
    if (foco.encoberto > 0.05) {
      problemas.push('Foco encoberto pelo botão “Acessibilidade” (' + Math.round(foco.encoberto * 100) + '%): “' + foco.nome + '”');
    }
  }

  const semArmadilha = percorridos.length < LIMITE_DE_TABS;
  if (!semArmadilha) problemas.push('O foco não saiu da página depois de ' + LIMITE_DE_TABS + ' Tabs (possível armadilha de teclado)');

  // Alcance e ordem: a sequência percorrida precisa ser igual à lista do HTML
  const nomes = percorridos.map(function (foco) { return foco.nome; });
  esperados.forEach(function (nome) {
    if (!nomes.includes(nome)) problemas.push('Não recebeu foco pelo Tab: “' + nome + '”');
  });
  const mesmaOrdem = JSON.stringify(nomes) === JSON.stringify(esperados);
  if (!mesmaOrdem && esperados.every(function (nome) { return nomes.includes(nome); })) {
    problemas.push('A ordem do foco é diferente da ordem do HTML');
  }

  // Link "Pular para o conteúdo"
  await page.goto(base + pagina.arquivo, { waitUntil: 'load' });
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  const pulou = await page.evaluate(function () { return document.activeElement.id === 'conteudo'; });
  if (!pulou) problemas.push('O link “Pular para o conteúdo” não levou o foco ao <main>');

  // Painel de acessibilidade: Enter abre, Esc fecha e devolve o foco
  await page.goto(base + pagina.arquivo, { waitUntil: 'load' });
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  const abriu = await page.locator('#acess-painel').isVisible();
  await page.keyboard.press('Escape');
  const fechou = await page.evaluate(function () {
    return document.getElementById('acess-painel').hidden &&
      document.activeElement.classList.contains('acess-botao');
  });
  if (!abriu || !fechou) problemas.push('Painel de acessibilidade: Enter/Esc não funcionaram como esperado');

  // Menu do celular: Enter no botão abre o menu e os links passam a receber foco
  let menu = 'não se aplica';
  if (await page.locator('.navbar-toggler').isVisible()) {
    await page.locator('.navbar-toggler').focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    await page.keyboard.press('Tab');
    const primeiroLink = await page.evaluate(function () { return document.activeElement.textContent.trim(); });
    menu = primeiroLink === 'Início' ? 'sim' : 'não';
    if (menu === 'não') problemas.push('Menu do celular: o primeiro Tab depois de abrir não caiu em “Início”');
  }

  await contexto.close();
  return {
    paradas: percorridos.length, esperadas: esperados.length, nomes: nomes,
    mesmaOrdem: mesmaOrdem, semArmadilha: semArmadilha, pulou: pulou,
    painel: abriu && fechou, menu: menu, problemas: problemas
  };
}


/* ---------- Roda tudo e monta o relatório ---------- */

(async function () {
  const servidor = await iniciarServidor();
  const navegador = await chromium.launch();
  const simNao = function (valor) { return valor ? 'sim' : '**NÃO**'; };

  const linhas = [
    '# Auditoria de teclado',
    '',
    '> Arquivo gerado por `scripts/auditoria-teclado.js`. Não edite à mão.',
    '',
    'O script percorre cada página apertando Tab, no tema claro, em duas larguras de tela.',
    '"Paradas" é o número de vezes que o Tab para em um elemento até o foco sair da página.',
    '',
    '| Página | Largura | Paradas do Tab | Todos alcançados, na ordem do HTML | Foco sempre visível e nunca encoberto | Sem armadilha | Pular para o conteúdo | Painel: Enter abre, Esc fecha | Menu do celular |',
    '|--------|---------|---------------:|:----------------------------------:|:-------------------------------------:|:-------------:|:---------------------:|:-----------------------------:|:---------------:|'
  ];
  const detalhes = [];
  let total = 0;

  for (const pagina of PAGINAS) {
    for (const largura of LARGURAS) {
      const r = await auditar(navegador, servidor.url, pagina, largura);
      total += r.problemas.length;

      const problemasDeFoco = r.problemas.filter(function (p) { return p.startsWith('Foco') || p.startsWith('Elemento focado'); });
      linhas.push('| ' + [
        pagina.nome, largura.nome, r.paradas + ' de ' + r.esperadas,
        simNao(r.mesmaOrdem), simNao(problemasDeFoco.length === 0), simNao(r.semArmadilha),
        simNao(r.pulou), simNao(r.painel), r.menu
      ].join(' | ') + ' |');

      detalhes.push('### ' + pagina.nome + ' — ' + largura.nome, '');
      if (r.problemas.length > 0) {
        detalhes.push('Problemas:', '');
        r.problemas.forEach(function (p) { detalhes.push('- ' + p); });
        detalhes.push('');
      }
      detalhes.push('Ordem do foco:', '');
      r.nomes.forEach(function (nome, i) { detalhes.push((i + 1) + '. ' + nome); });
      detalhes.push('');

      console.log(pagina.nome + ' / ' + largura.id + ': ' + r.paradas + ' paradas, ' + r.problemas.length + ' problema(s)');
      r.problemas.forEach(function (p) { console.log('   - ' + p); });
    }
  }

  linhas.push('', '**Total de problemas: ' + total + '.**', '', '## Detalhes por página', '', ...detalhes);
  gravarDoc('auditoria/teclado.md', linhas);

  await navegador.close();
  servidor.fechar();
  if (total > 0) process.exit(1);
})();

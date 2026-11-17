/* ==========================================================================
   auditoria-axe.js — verificação automática de acessibilidade com o axe-core

   O axe-core é o motor de regras de acessibilidade usado pelo Lighthouse.
   Aqui ele roda em mais situações do que o Lighthouse alcança: nos 4 temas
   (claro, escuro e os dois de alto contraste), em 2 larguras de tela e
   também nos ESTADOS de cada página — formulário com erros, confirmação de
   envio, pesquisa sem resultado, painel de acessibilidade aberto.

   Resultado: docs/auditoria/axe.md
   Como rodar: node scripts/auditoria-axe.js   (precisa do Playwright e do axe-core)
   ========================================================================== */
const fs = require('fs');
const { chromium } = require('playwright');
const { PAGINAS, TEMAS, LARGURAS, preferencias, iniciarServidor, gravarDoc } = require('./apoio.js');

// Código do axe-core, para ser colocado dentro de cada página testada
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const VERSAO_AXE = require('axe-core/package.json').version;

// Conjuntos de regras: WCAG 2.0 e 2.1, níveis A e AA, mais as boas práticas do axe
const REGRAS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'];

/* Estados de cada página. Cada função deixa a página no estado indicado.
   Os estados de uma página são aplicados em sequência, na ordem em que aparecem. */
const ESTADOS = {
  'index.html': {
    'Página aberta': async function () {},
    'Painel de acessibilidade aberto': async function (p) {
      await p.locator('.acess-botao').click();
    }
  },
  'projetos.html': {
    'Página aberta': async function () {},
    'Pesquisa sem resultado': async function (p) {
      await p.locator('#pesquisa').fill('zzz');
    }
  },
  'contato.html': {
    'Página aberta': async function () {},
    'Formulário com erros': async function (p) {
      await p.locator('#email').fill('a@');
      await p.locator('form button[type="submit"]').click();
    },
    'Confirmação de envio': async function (p) {
      await p.locator('#nome').fill('Maria');
      await p.locator('#email').fill('maria@exemplo.com');
      await p.locator('#assunto').selectOption('Dúvida');
      await p.locator('#mensagem').fill('Mensagem de teste para a demonstração.');
      await p.locator('#consentimento').check();
      await p.locator('form button[type="submit"]').click();
      await p.waitForTimeout(1100);   // tempo do envio simulado
    }
  },
  'login.html': {
    'Página aberta': async function () {},
    'Formulário com erros': async function (p) {
      await p.locator('form button[type="submit"]').click();
    },
    'E-mail ou senha incorretos': async function (p) {
      await p.locator('#email').fill('visitante@example.com');
      await p.locator('#senha').fill('senhaerrada');
      await p.locator('form button[type="submit"]').click();
    },
    'Login concluído': async function (p) {
      await p.locator('#senha').fill('demonstracao');
      await p.locator('form button[type="submit"]').click();
    }
  }
};

(async function () {
  const servidor = await iniciarServidor();
  const navegador = await chromium.launch();

  const contagem = {};    // contagem['Início | Página aberta'][idDoTema] = número de violações
  const violacoes = [];   // descrição de cada violação encontrada
  let verificacoes = 0;
  let regrasAplicadas = 0;

  for (const largura of LARGURAS) {
    for (const tema of TEMAS) {
      const contexto = await navegador.newContext({ viewport: { width: largura.largura, height: largura.altura } });
      // Grava as preferências antes de a página carregar, como se a pessoa já tivesse escolhido o tema
      await contexto.addInitScript(function (prefs) {
        if (!localStorage.getItem('vz-preferencias')) localStorage.setItem('vz-preferencias', JSON.stringify(prefs));
      }, preferencias(tema));

      for (const pagina of PAGINAS) {
        const page = await contexto.newPage();
        await page.goto(servidor.url + pagina.arquivo, { waitUntil: 'networkidle' });
        await page.evaluate(function () { return document.fonts.ready; });
        await page.addScriptTag({ content: AXE });

        for (const [estado, preparar] of Object.entries(ESTADOS[pagina.arquivo])) {
          await preparar(page);
          await page.waitForTimeout(300);   // espera as transições terminarem

          const resultado = await page.evaluate(function (regras) {
            return axe.run(document, { runOnly: regras });
          }, REGRAS);

          verificacoes++;
          regrasAplicadas = Math.max(regrasAplicadas, resultado.passes.length + resultado.violations.length);

          const chave = pagina.nome + ' | ' + estado;
          contagem[chave] = contagem[chave] || {};
          contagem[chave][tema.id] = (contagem[chave][tema.id] || 0) + resultado.violations.length;

          resultado.violations.forEach(function (v) {
            violacoes.push('- **' + pagina.nome + '**, ' + estado + ', tema ' + tema.nome + ', ' + largura.nome +
              ': `' + v.id + '` (' + v.impact + ') — ' + v.help + '. Elementos: ' +
              v.nodes.map(function (n) { return '`' + n.target.join(' ') + '`'; }).slice(0, 4).join(', '));
          });
        }
        await page.close();
      }
      await contexto.close();
    }
  }

  const linhas = [
    '# Auditoria automática de acessibilidade (axe-core)',
    '',
    '> Arquivo gerado por `scripts/auditoria-axe.js`. Não edite à mão.',
    '',
    'Ferramenta: axe-core ' + VERSAO_AXE + ', o motor de regras de acessibilidade usado pelo Lighthouse.',
    'Regras: WCAG 2.0 e 2.1, níveis A e AA, mais as boas práticas do axe (até ' + regrasAplicadas + ' regras aplicáveis por tela).',
    '',
    'Cada célula é o número de violações somando as duas larguras de tela (1366px e 390px).',
    '',
    '| Página | Estado | ' + TEMAS.map(function (t) { return t.nome; }).join(' | ') + ' |',
    '|--------|--------|' + TEMAS.map(function () { return ':-:'; }).join('|') + '|'
  ];
  for (const [chave, porTema] of Object.entries(contagem)) {
    linhas.push('| ' + chave + ' | ' + TEMAS.map(function (t) { return porTema[t.id]; }).join(' | ') + ' |');
  }
  linhas.push('', '**Total: ' + violacoes.length + ' violação(ões) em ' + verificacoes + ' verificações.**');
  if (violacoes.length > 0) linhas.push('', '## Violações encontradas', '', ...violacoes);
  linhas.push('',
    'Limite da ferramenta: testes automáticos encontram só uma parte dos problemas de acessibilidade.',
    'O uso pelo teclado é conferido em `teclado.md`; os critérios que dependem de julgamento humano estão em `docs/auditoria.md`.');

  gravarDoc('auditoria/axe.md', linhas);
  console.log(violacoes.length + ' violação(ões) em ' + verificacoes + ' verificações.');

  await navegador.close();
  servidor.fechar();
  if (violacoes.length > 0) process.exit(1);
})();

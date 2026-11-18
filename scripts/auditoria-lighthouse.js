/* ==========================================================================
   auditoria-lighthouse.js — roda o Lighthouse em todas as páginas

   Para cada página, mede as quatro categorias do Lighthouse (Acessibilidade,
   Boas práticas, SEO e Desempenho) nos temas claro e escuro, simulando um
   celular e um computador: 4 páginas × 2 temas × 2 aparelhos = 16 medições.

   O tema é escolhido do mesmo jeito que no site: gravando a preferência em
   localStorage antes de a página abrir.

   Resultado: docs/auditoria/lighthouse.md
   Como rodar: node scripts/auditoria-lighthouse.js   (precisa do Playwright e do Lighthouse)
   O script termina com erro se alguma nota de Acessibilidade ficar abaixo de 95.

   Para medir o site já publicado, passe o endereço:
     node scripts/auditoria-lighthouse.js https://vitorzago1.github.io/projeto_final_DI/
   Nesse caso o resultado vai para docs/auditoria/lighthouse-publicado.md.
   ========================================================================== */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { chromium } = require('playwright');
const lighthouse = require('lighthouse/core/index.cjs');   // entrada do Lighthouse para scripts com require()
const { PAGINAS, TEMAS, preferencias, iniciarServidor, gravarDoc } = require('./apoio.js');

// Endereço passado na linha de comando (opcional). Sem ele, o script mede os arquivos
// desta pasta, servidos por um servidor local.
const ENDERECO = process.argv[2] ? process.argv[2].replace(/\/?$/, '/') : '';

const PORTA = 9333;            // porta pela qual o Lighthouse controla o navegador
const META_ACESSIBILIDADE = 95;

const CATEGORIAS = [
  ['accessibility', 'Acessibilidade'],
  ['best-practices', 'Boas práticas'],
  ['seo', 'SEO'],
  ['performance', 'Desempenho']
];

// Só os temas claro e escuro (o alto contraste é coberto por auditoria-axe.js)
const TEMAS_LIGHTHOUSE = TEMAS.filter(function (tema) { return !tema.contraste; });

// Aparelhos simulados. O "celular" é o padrão do Lighthouse (tela pequena, rede 4G lenta,
// processador 4 vezes mais lento). O "computador" usa os valores do modo desktop do Lighthouse.
const APARELHOS = [
  { id: 'celular', nome: 'Celular', opcoes: {} },
  {
    id: 'computador', nome: 'Computador',
    opcoes: {
      formFactor: 'desktop',
      screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false },
      throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1, requestLatencyMs: 0, downloadThroughputKbps: 0, uploadThroughputKbps: 0 }
    }
  }
];

(async function () {
  const servidor = ENDERECO ? null : await iniciarServidor();
  const base = ENDERECO || servidor.url;

  // Navegador com perfil próprio e porta de controle aberta para o Lighthouse.
  // "launchPersistentContext" faz o Lighthouse e este script enxergarem o mesmo localStorage.
  const perfil = fs.mkdtempSync(path.join(os.tmpdir(), 'lighthouse-'));
  const contexto = await chromium.launchPersistentContext(perfil, {
    channel: 'chromium',
    headless: true,
    args: ['--remote-debugging-port=' + PORTA]
  });
  const page = contexto.pages()[0] || await contexto.newPage();

  const linhasTabela = [];
  const reprovadas = {};   // auditorias com nota abaixo da máxima, e em quais páginas
  let versao = '';
  let piorAcessibilidade = 100;

  for (const pagina of PAGINAS) {
    for (const tema of TEMAS_LIGHTHOUSE) {
      // Grava o tema, como se a pessoa já tivesse escolhido no painel.
      // animacoes: false = site no estado normal, com o carrossel andando.
      await page.goto(base + pagina.arquivo);
      await page.evaluate(function (prefs) {
        localStorage.setItem('vz-preferencias', JSON.stringify(prefs));
      }, preferencias(tema, { animacoes: false }));

      for (const aparelho of APARELHOS) {
        const resultado = await lighthouse(base + pagina.arquivo, Object.assign({
          port: PORTA,
          output: 'json',
          logLevel: 'error',
          disableStorageReset: true,   // não apaga o localStorage: o tema gravado continua valendo
          onlyCategories: CATEGORIAS.map(function (c) { return c[0]; })
        }, aparelho.opcoes));

        const lhr = resultado.lhr;
        versao = lhr.lighthouseVersion;
        const notas = CATEGORIAS.map(function (c) { return Math.round(lhr.categories[c[0]].score * 100); });
        piorAcessibilidade = Math.min(piorAcessibilidade, notas[0]);
        linhasTabela.push('| ' + [pagina.nome, tema.nome, aparelho.nome].concat(notas).join(' | ') + ' |');
        console.log([pagina.nome, tema.nome, aparelho.nome].join(' / ') + ': ' + notas.join(', '));

        // Guarda as auditorias que não tiraram nota máxima (fora as só informativas e as manuais)
        CATEGORIAS.forEach(function (categoria) {
          lhr.categories[categoria[0]].auditRefs.forEach(function (ref) {
            const auditoria = lhr.audits[ref.id];
            const pontuada = auditoria.scoreDisplayMode === 'binary' || auditoria.scoreDisplayMode === 'numeric' || auditoria.scoreDisplayMode === 'metricSavings';
            // "bf-cache" reprova só porque o navegador de teste roda com esse recurso desligado;
            // o próprio Lighthouse marca o motivo como "Not actionable" (nada a fazer no site).
            const foraDoSite = ref.id === 'bf-cache' && auditoria.details &&
              auditoria.details.items.every(function (item) { return item.failureType === 'Not actionable'; });
            if (pontuada && !foraDoSite && auditoria.score !== null && auditoria.score < 0.9) {
              const chave = categoria[1] + ' — ' + auditoria.title;
              reprovadas[chave] = reprovadas[chave] || new Set();
              reprovadas[chave].add(pagina.nome);
            }
          });
        });
      }
    }
  }

  const linhas = [
    '# Auditoria com o Lighthouse',
    '',
    '> Arquivo gerado por `scripts/auditoria-lighthouse.js`. Não edite à mão.',
    '',
    'Ferramenta: Lighthouse ' + versao + ', no Chromium. Notas de 0 a 100.',
    ...(ENDERECO ? ['Site medido: <' + ENDERECO + '>, em ' + new Date().toLocaleDateString('pt-BR') + '.'] : []),
    'Meta do projeto: Acessibilidade igual ou maior que ' + META_ACESSIBILIDADE + ' em todas as páginas, nos temas claro e escuro.',
    '',
    '| Página | Tema | Aparelho simulado | ' + CATEGORIAS.map(function (c) { return c[1]; }).join(' | ') + ' |',
    '|--------|------|-------------------|' + CATEGORIAS.map(function () { return ':-:'; }).join('|') + '|',
    ...linhasTabela,
    '',
    '**Menor nota de Acessibilidade: ' + piorAcessibilidade + '.** Meta ' +
      (piorAcessibilidade >= META_ACESSIBILIDADE ? 'atingida' : 'NÃO atingida') + '.',
    ''
  ];

  const chaves = Object.keys(reprovadas).sort();
  if (chaves.length > 0) {
    linhas.push('## Pontos que não tiraram nota máxima', '',
      'Auditorias com nota abaixo de 90 em pelo menos uma medição (títulos como o Lighthouse mostra, em inglês):', '');
    chaves.forEach(function (chave) {
      linhas.push('- ' + chave + ' (' + Array.from(reprovadas[chave]).join(', ') + ')');
    });
    linhas.push('');
  }

  if (ENDERECO) {
    linhas.push(
      'Sobre a nota de Desempenho: ela depende da máquina e da rede no momento do teste e varia',
      'alguns pontos de uma medição para outra. Aqui as páginas vieram do site publicado, pela',
      'internet. As outras três categorias não variam.'
    );
  } else {
    linhas.push(
      'Sobre a nota de Desempenho: ela depende da máquina e da rede no momento do teste e varia',
      'alguns pontos de uma medição para outra. Aqui as páginas foram servidas por um servidor local;',
      'no site publicado os números podem ser diferentes. As outras três categorias não variam.'
    );
  }

  gravarDoc(ENDERECO ? 'auditoria/lighthouse-publicado.md' : 'auditoria/lighthouse.md', linhas);

  await contexto.close();
  if (servidor) servidor.fechar();
  fs.rmSync(perfil, { recursive: true, force: true });
  if (piorAcessibilidade < META_ACESSIBILIDADE) process.exit(1);
})();

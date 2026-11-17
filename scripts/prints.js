/* ==========================================================================
   prints.js — capturas de tela ("prints") do site para o relatório

   Gera dois conjuntos de imagens:

   1. docs/prints/            cada página inteira, em 1366px e 390px de largura,
                              nos temas claro e escuro (4 × 2 × 2 = 16 imagens);
   2. docs/prints/estados/    telas que só aparecem depois de uma ação: painel de
                              acessibilidade aberto, erros do formulário, pesquisa
                              sem resultado, alto contraste etc.

   Também gera docs/prints/README.md, com a lista das imagens e o que cada uma mostra.

   Nome dos arquivos: pagina-tema-largura.png (ex.: inicio-escuro-390px.png).

   Como rodar: node scripts/prints.js   (precisa do Playwright)
   Rode de novo sempre que o conteúdo ou o visual do site mudar.
   ========================================================================== */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { RAIZ, PAGINAS, TEMAS, LARGURAS, preferencias, iniciarServidor, gravarDoc } = require('./apoio.js');

const PASTA = path.join(RAIZ, 'docs', 'prints');

// 1 = a imagem tem exatamente a largura da tela simulada (1366 ou 390 pixels).
// 2 = o dobro de pixels (imagem mais nítida para impressão, arquivo bem maior).
const NITIDEZ = 1;

// Dados fictícios usados para preencher os formulários nas capturas
const VISITANTE = { nome: 'Visitante de Teste', email: 'visitante@example.com' };

const CLARO = TEMAS[0];
const ESCURO = TEMAS[1];
const ALTO_CLARO = TEMAS[2];
const ALTO_ESCURO = TEMAS[3];
const COMPUTADOR = LARGURAS[0];
const CELULAR = LARGURAS[1];


/* ---------- Telas que dependem de uma ação ----------
   pagina    arquivo HTML
   nome      nome do arquivo de imagem (sem a largura e sem ".png"); traz o tema quando não é o claro
   descricao o que a imagem mostra (vai para docs/prints/README.md)
   tema      um dos temas de apoio.js
   largura   COMPUTADOR ou CELULAR
   extras    preferências além do tema (tamanho do texto, animações)
   inteira   true = página inteira; false = só o que cabe na tela
   preparar  o que fazer na página antes de fotografar */
const ESTADOS = [
  {
    pagina: 'index.html', nome: 'inicio-link-pular-em-foco', tema: CLARO, largura: COMPUTADOR, inteira: false,
    descricao: 'Início depois do primeiro Tab: o link “Pular para o conteúdo” aparece, com o contorno de foco.',
    preparar: async function (page) { await page.keyboard.press('Tab'); }
  },
  {
    pagina: 'index.html', nome: 'inicio-painel-de-acessibilidade-claro', tema: CLARO, largura: COMPUTADOR, inteira: false,
    descricao: 'Painel de acessibilidade aberto, tema claro.',
    preparar: async function (page) { await page.click('.acess-botao'); }
  },
  {
    pagina: 'index.html', nome: 'inicio-painel-de-acessibilidade-escuro', tema: ESCURO, largura: CELULAR, inteira: false,
    descricao: 'Painel de acessibilidade aberto no celular, tema escuro.',
    preparar: async function (page) { await page.click('.acess-botao'); }
  },
  {
    pagina: 'index.html', nome: 'inicio-painel-aviso-de-mudanca', tema: CLARO, largura: COMPUTADOR, inteira: false,
    descricao: 'Painel logo depois de ligar “Sublinhar links”: a frase “Links sublinhados.” confirma a mudança.',
    preparar: async function (page) {
      await page.click('.acess-botao');
      await page.click('label[for="acess-links"]');
    }
  },
  {
    pagina: 'index.html', nome: 'inicio-alto-contraste-claro', tema: ALTO_CLARO, largura: COMPUTADOR, inteira: true,
    descricao: 'Início com “Alto contraste” ligado, tema claro.'
  },
  {
    pagina: 'index.html', nome: 'inicio-alto-contraste-escuro', tema: ALTO_ESCURO, largura: COMPUTADOR, inteira: true,
    descricao: 'Início com “Alto contraste” ligado, tema escuro.'
  },
  {
    pagina: 'index.html', nome: 'inicio-texto-130', tema: CLARO, largura: CELULAR, inteira: true, extras: { fonte: '130' },
    descricao: 'Início no celular com o tamanho do texto em 130%: o conteúdo se reorganiza, sem rolagem lateral.'
  },
  {
    pagina: 'index.html', nome: 'inicio-carrossel-parado-por-reduzir-animacoes', tema: CLARO, largura: COMPUTADOR, inteira: false,
    extras: { animacoes: true },
    descricao: 'Carrossel com “Reduzir animações” ligado: começa parado, o botão mostra “Reproduzir” e uma nota explica o motivo.'
  },
  {
    pagina: 'index.html', nome: 'inicio-menu-do-celular-aberto', tema: CLARO, largura: CELULAR, inteira: false,
    descricao: 'Menu do celular aberto, com a página atual marcada.',
    preparar: async function (page) {
      await page.click('.navbar-toggler');
      await page.waitForTimeout(600);   // espera o menu terminar de abrir
    }
  },
  {
    pagina: 'projetos.html', nome: 'projetos-pesquisa-python', tema: CLARO, largura: COMPUTADOR, inteira: true,
    descricao: 'Projetos com “python” no campo de pesquisa: a lista mostra 3 de 7 projetos.',
    preparar: async function (page) { await page.fill('#pesquisa', 'python'); }
  },
  {
    pagina: 'projetos.html', nome: 'projetos-aba-sites-pelo-teclado', tema: CLARO, largura: COMPUTADOR, inteira: true,
    descricao: 'Aba “Sites” escolhida com a seta → do teclado: a aba fica marcada e com o contorno de foco.',
    preparar: async function (page) {
      await page.focus('#aba-todos');
      await page.keyboard.press('ArrowRight');
    }
  },
  {
    pagina: 'projetos.html', nome: 'projetos-nenhum-resultado', tema: CLARO, largura: COMPUTADOR, inteira: true,
    descricao: 'Pesquisa sem resultado: o aviso diz o que foi procurado, sugere o que fazer e oferece o botão de limpar.',
    preparar: async function (page) { await page.fill('#pesquisa', 'php'); }
  },
  {
    pagina: 'projetos.html', nome: 'projetos-nenhum-resultado-escuro', tema: ESCURO, largura: CELULAR, inteira: true,
    descricao: 'O mesmo aviso de nenhum resultado, no celular e no tema escuro.',
    preparar: async function (page) { await page.fill('#pesquisa', 'php'); }
  },
  {
    pagina: 'contato.html', nome: 'contato-erros-de-validacao', tema: CLARO, largura: COMPUTADOR, inteira: true,
    descricao: 'Contato depois de tentar enviar em branco: resumo dos erros no topo e a mensagem de cada campo logo abaixo dele.',
    preparar: async function (page) { await page.click('#form-contato button[type="submit"]'); }
  },
  {
    pagina: 'contato.html', nome: 'contato-erros-de-validacao-escuro', tema: ESCURO, largura: CELULAR, inteira: true,
    descricao: 'Os mesmos erros de validação, no celular e no tema escuro.',
    preparar: async function (page) { await page.click('#form-contato button[type="submit"]'); }
  },
  {
    pagina: 'contato.html', nome: 'contato-mensagem-curta', tema: CLARO, largura: COMPUTADOR, inteira: true,
    descricao: 'Contato com uma mensagem de 3 letras: o erro diz o mínimo exigido e quantos caracteres faltam.',
    preparar: async function (page) {
      await page.fill('#nome', VISITANTE.nome);
      await page.fill('#email', VISITANTE.email);
      await page.selectOption('#assunto', 'Dúvida');
      await page.fill('#mensagem', 'Olá');
      await page.check('#consentimento');
      await page.click('#form-contato button[type="submit"]');
    }
  },
  {
    pagina: 'contato.html', nome: 'contato-confirmacao', tema: CLARO, largura: COMPUTADOR, inteira: true,
    descricao: 'Confirmação do envio simulado: repete o assunto e o e-mail informados e avisa que nada foi enviado.',
    preparar: async function (page) {
      await page.fill('#nome', VISITANTE.nome);
      await page.fill('#email', VISITANTE.email);
      await page.selectOption('#assunto', 'Dúvida');
      await page.fill('#mensagem', 'Mensagem de teste para a captura de tela.');
      await page.check('#consentimento');
      await page.click('#form-contato button[type="submit"]');
      await page.waitForSelector('#contato-confirmacao:not([hidden])');
    }
  },
  {
    pagina: 'login.html', nome: 'entrar-erros-de-validacao', tema: CLARO, largura: COMPUTADOR, inteira: true,
    descricao: 'Entrar depois de tentar enviar em branco: resumo dos erros e mensagem em cada campo.',
    preparar: async function (page) { await page.click('#form-login button[type="submit"]'); }
  },
  {
    pagina: 'login.html', nome: 'entrar-senha-visivel', tema: CLARO, largura: COMPUTADOR, inteira: true,
    descricao: 'Senha visível depois de usar o botão “Mostrar”, que passa a dizer “Ocultar”.',
    preparar: async function (page) {
      await page.fill('#email', VISITANTE.email);
      await page.fill('#senha', 'demonstracao');
      await page.click('#mostrar-senha');
    }
  },
  {
    pagina: 'login.html', nome: 'entrar-dados-incorretos', tema: CLARO, largura: COMPUTADOR, inteira: true,
    descricao: 'Entrar com a senha errada: “E-mail ou senha incorretos”, sem dizer qual dos dois, e o foco volta para a senha.',
    preparar: async function (page) {
      await page.fill('#email', VISITANTE.email);
      await page.fill('#senha', 'senha-errada');
      await page.click('#form-login button[type="submit"]');
    }
  },
  {
    pagina: 'login.html', nome: 'entrar-dados-incorretos-escuro', tema: ESCURO, largura: CELULAR, inteira: true,
    descricao: 'A mesma mensagem de dados incorretos, no celular e no tema escuro.',
    preparar: async function (page) {
      await page.fill('#email', VISITANTE.email);
      await page.fill('#senha', 'senha-errada');
      await page.click('#form-login button[type="submit"]');
    }
  },
  {
    pagina: 'login.html', nome: 'entrar-confirmacao', tema: CLARO, largura: COMPUTADOR, inteira: true,
    descricao: 'Entrada com os dados de demonstração: a confirmação avisa que o login é só uma demonstração e oferece “Sair”.',
    preparar: async function (page) {
      await page.fill('#email', VISITANTE.email);
      await page.fill('#senha', 'demonstracao');
      await page.click('#form-login button[type="submit"]');
      await page.waitForSelector('#login-confirmacao:not([hidden])');
    }
  }
];


/* ---------- Funções de apoio ---------- */

// Roda DENTRO da página: desce até o fim e volta ao topo, para o navegador baixar as
// imagens marcadas com loading="lazy" (que só são baixadas quando chegam perto da tela),
// e espera a fonte e as imagens terminarem de carregar.
async function carregarTudo() {
  for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
    window.scrollTo({ top: y, behavior: 'instant' });
    await new Promise(function (resolver) { setTimeout(resolver, 40); });
  }
  window.scrollTo({ top: 0, behavior: 'instant' });

  await document.fonts.ready;

  // Só espera as imagens que estão aparecendo. As imagens dos slides escondidos do
  // carrossel só são baixadas quando o slide entra na tela; esperar por elas travaria o script.
  const visiveis = Array.from(document.images).filter(function (imagem) {
    return imagem.getClientRects().length > 0;
  });
  await Promise.all(visiveis.map(function (imagem) {
    if (imagem.complete) return null;
    return new Promise(function (resolver) { imagem.onload = imagem.onerror = resolver; });
  }));
}

// Abre uma página já com o tema escolhido, prepara a tela e grava a imagem.
async function fotografar(navegador, base, opcoes) {
  const contexto = await navegador.newContext({
    viewport: { width: opcoes.largura.largura, height: opcoes.largura.altura },
    deviceScaleFactor: NITIDEZ
  });

  // animacoes: false = site como a maioria das pessoas vê (carrossel andando, botão "Pausar").
  // Só grava a preferência se ainda não houver uma, para não desfazer o que a própria
  // captura mudar no painel de acessibilidade.
  const prefs = preferencias(opcoes.tema, Object.assign({ animacoes: false }, opcoes.extras));
  await contexto.addInitScript(function (valor) {
    if (!localStorage.getItem('vz-preferencias')) {
      localStorage.setItem('vz-preferencias', JSON.stringify(valor));
    }
  }, prefs);

  const page = await contexto.newPage();
  await page.goto(base + opcoes.pagina, { waitUntil: 'load' });
  await page.evaluate(carregarTudo);
  if (opcoes.preparar) await opcoes.preparar(page);

  if (opcoes.inteira) {
    // Estica a janela até o fim da página. Assim o botão fixo "Acessibilidade" aparece no
    // canto de baixo da imagem, como no fim da rolagem, e não no meio, por cima do conteúdo.
    const altura = await page.evaluate(function () { return document.documentElement.scrollHeight; });
    await page.setViewportSize({ width: opcoes.largura.largura, height: altura });
  }
  await page.waitForTimeout(300);   // tempo para as transições (cores, foco) terminarem

  fs.mkdirSync(path.dirname(opcoes.destino), { recursive: true });
  await page.screenshot({ path: opcoes.destino, fullPage: opcoes.inteira });
  await contexto.close();

  console.log(path.relative(RAIZ, opcoes.destino));
}

// Apaga as imagens antigas, para não sobrar arquivo de uma captura que deixou de existir.
function limparPasta(pasta) {
  if (!fs.existsSync(pasta)) return;
  fs.readdirSync(pasta).forEach(function (arquivo) {
    if (arquivo.endsWith('.png')) fs.unlinkSync(path.join(pasta, arquivo));
  });
}


/* ---------- Roda tudo ---------- */

(async function () {
  const servidor = await iniciarServidor();
  const navegador = await chromium.launch();

  limparPasta(PASTA);
  limparPasta(path.join(PASTA, 'estados'));

  const indice = [
    '# Capturas de tela',
    '',
    '> Arquivo gerado por `scripts/prints.js`. Não edite à mão.',
    '> Para refazer as imagens depois de mudar o site: `npm run prints`.',
    '',
    'As imagens foram feitas com o Playwright (navegador Chromium). A largura de cada imagem é a',
    'largura da tela simulada: 1366 pixels (computador) ou 390 pixels (celular).',
    '',
    'O botão “Acessibilidade” é fixo na janela. Nas imagens de página inteira ele aparece no',
    'canto de baixo, onde fica quando a pessoa rola a página até o fim.',
    '',
    '## Páginas inteiras',
    '',
    'Cada página, do topo ao rodapé, nos temas claro e escuro.',
    '',
    '| Página | Tema | Largura | Arquivo |',
    '|--------|------|---------|---------|'
  ];

  // 1. Cada página inteira, em cada largura, nos temas claro e escuro
  for (const pagina of PAGINAS) {
    for (const tema of [CLARO, ESCURO]) {
      for (const largura of LARGURAS) {
        const arquivo = pagina.id + '-' + tema.id + '-' + largura.largura + 'px.png';
        await fotografar(navegador, servidor.url, {
          pagina: pagina.arquivo, tema: tema, largura: largura, inteira: true,
          destino: path.join(PASTA, arquivo)
        });
        indice.push('| ' + [pagina.nome, tema.nome, largura.largura + 'px', '[`' + arquivo + '`](' + arquivo + ')'].join(' | ') + ' |');
      }
    }
  }

  // 2. Telas que dependem de uma ação
  indice.push(
    '',
    '## Estados',
    '',
    'Telas que só aparecem depois de uma ação. Ficam na pasta `estados/`.',
    '',
    '| O que mostra | Arquivo |',
    '|--------------|---------|'
  );

  for (const estado of ESTADOS) {
    const arquivo = estado.nome + '-' + estado.largura.largura + 'px.png';
    await fotografar(navegador, servidor.url, Object.assign({}, estado, {
      destino: path.join(PASTA, 'estados', arquivo)
    }));
    indice.push('| ' + estado.descricao + ' | [`' + arquivo + '`](estados/' + arquivo + ') |');
  }

  gravarDoc('prints/README.md', indice);

  await navegador.close();
  servidor.fechar();
})();

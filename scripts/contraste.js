/* ==========================================================================
   contraste.js — confere o contraste das cores do site (WCAG 2.1)

   O que faz:
   1. lê as variáveis de cor de css/estilo.css (não há lista de cores aqui:
      o script sempre confere as cores que o site realmente usa);
   2. calcula a razão de contraste de cada par texto/fundo usado no site,
      nos temas claro, escuro e nos dois de alto contraste;
   3. gera docs/contraste.md com o resultado.

   Como rodar (na pasta do projeto):   node scripts/contraste.js
   Se algum par reprovar no nível AA, o script avisa e termina com erro.
   ========================================================================== */
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const css = fs.readFileSync(path.join(RAIZ, 'css', 'estilo.css'), 'utf8');


/* ---------- 1. Ler as variáveis de cor do CSS ---------- */

// Devolve as variáveis --cor-* declaradas no bloco que começa com o seletor dado.
// Exemplo: variaveisDoBloco('[data-bs-theme="dark"]') → { '--cor-fundo': '#0E1A20', ... }
function variaveisDoBloco(seletor) {
  const seletorEscapado = seletor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // ^ = começo de linha; depois o seletor, a chave "{" e tudo até a chave "}"
  const achado = css.match(new RegExp('^' + seletorEscapado + ' \\{([^}]*)\\}', 'm'));
  if (!achado) throw new Error('Bloco não encontrado em css/estilo.css: ' + seletor);

  const variaveis = {};
  for (const [, nome, cor] of achado[1].matchAll(/(--cor-[\w-]+):\s*(#[0-9a-fA-F]{6})\b/g)) {
    variaveis[nome] = cor.toUpperCase();
  }
  return variaveis;
}

// Cada tema é montado na mesma ordem em que o navegador aplica o CSS:
// o bloco de baixo substitui só as variáveis que ele redefine.
const claro = variaveisDoBloco('[data-bs-theme="light"]');
const escuro = { ...claro, ...variaveisDoBloco('[data-bs-theme="dark"]') };
const altoClaro = { ...claro, ...variaveisDoBloco('[data-contraste="alto"]') };
const altoEscuro = {
  ...escuro,
  ...variaveisDoBloco('[data-contraste="alto"]'),
  ...variaveisDoBloco('[data-bs-theme="dark"][data-contraste="alto"]')
};

const TEMAS = [
  ['Tema claro', claro],
  ['Tema escuro', escuro],
  ['Alto contraste — claro', altoClaro],
  ['Alto contraste — escuro', altoEscuro]
];


/* ---------- 2. Pares usados no site ----------
   frente = cor do texto, do ícone ou da borda;  fundo = cor que fica atrás.
   tipo 'texto'   → texto de tamanho normal: mínimo AA 4,5:1 (AAA 7:1)
   tipo 'grafico' → bordas de campos, ícones e contorno de foco: mínimo AA 3:1
   Ao criar um componente com uma combinação nova, acrescente o par aqui. */
const PARES = [
  // Texto
  { uso: 'Texto corrido na página', frente: '--cor-texto', fundo: '--cor-fundo', tipo: 'texto' },
  { uso: 'Texto no cabeçalho, em cartões e no painel', frente: '--cor-texto', fundo: '--cor-superficie', tipo: 'texto' },
  { uso: 'Texto no rodapé, nas etiquetas de tecnologia e na faixa "Como eu trabalho"', frente: '--cor-texto', fundo: '--cor-superficie-2', tipo: 'texto' },
  { uso: 'Texto secundário na página (abas não escolhidas, frase "Mostrando X de Y")', frente: '--cor-texto-2', fundo: '--cor-fundo', tipo: 'texto' },
  { uso: 'Texto secundário no cabeçalho, no painel e nos cartões (itens do menu, notas, categoria e tags)', frente: '--cor-texto-2', fundo: '--cor-superficie', tipo: 'texto' },
  { uso: 'Texto secundário no rodapé (direitos autorais)', frente: '--cor-texto-2', fundo: '--cor-superficie-2', tipo: 'texto' },

  // Marca
  { uso: 'Link na página', frente: '--cor-marca', fundo: '--cor-fundo', tipo: 'texto' },
  { uso: 'Link e botão de contorno no cabeçalho, no painel e nos cartões; número dos passos', frente: '--cor-marca', fundo: '--cor-superficie', tipo: 'texto' },
  { uso: 'Link no rodapé e capa dos repositórios', frente: '--cor-marca', fundo: '--cor-superficie-2', tipo: 'texto' },
  { uso: 'Link com o mouse em cima, na página', frente: '--cor-marca-hover', fundo: '--cor-fundo', tipo: 'texto' },
  { uso: 'Link com o mouse em cima, no cabeçalho e no painel', frente: '--cor-marca-hover', fundo: '--cor-superficie', tipo: 'texto' },
  { uso: 'Link com o mouse em cima, no rodapé', frente: '--cor-marca-hover', fundo: '--cor-superficie-2', tipo: 'texto' },
  { uso: 'Texto do botão principal, do botão de acessibilidade e da opção escolhida', frente: '--cor-sobre-marca', fundo: '--cor-marca', tipo: 'texto' },
  { uso: 'Texto do botão principal com o mouse em cima', frente: '--cor-sobre-marca', fundo: '--cor-marca-hover', tipo: 'texto' },

  // Destaque
  { uso: 'Texto do botão de destaque e dos marcadores', frente: '--cor-sobre-destaque', fundo: '--cor-destaque', tipo: 'texto' },
  { uso: 'Texto do botão de destaque com o mouse em cima', frente: '--cor-sobre-destaque', fundo: '--cor-destaque-hover', tipo: 'texto' },
  { uso: 'Âmbar usado como texto, na página', frente: '--cor-destaque-texto', fundo: '--cor-fundo', tipo: 'texto' },
  { uso: 'Âmbar usado como texto, em cartões', frente: '--cor-destaque-texto', fundo: '--cor-superficie', tipo: 'texto' },

  // Sucesso e erro
  { uso: 'Mensagem de sucesso na página', frente: '--cor-sucesso', fundo: '--cor-fundo', tipo: 'texto' },
  { uso: 'Mensagem de sucesso em cartões', frente: '--cor-sucesso', fundo: '--cor-superficie', tipo: 'texto' },
  { uso: 'Mensagem de sucesso na caixa de aviso', frente: '--cor-sucesso', fundo: '--cor-sucesso-fundo', tipo: 'texto' },
  { uso: 'Mensagem de erro na página (erro embaixo de um campo)', frente: '--cor-erro', fundo: '--cor-fundo', tipo: 'texto' },
  { uso: 'Mensagem de erro em cartões e borda de campo com erro', frente: '--cor-erro', fundo: '--cor-superficie', tipo: 'texto' },
  { uso: 'Mensagem de erro na caixa de aviso', frente: '--cor-erro', fundo: '--cor-erro-fundo', tipo: 'texto' },
  { uso: 'Texto e links dentro da caixa de erro (resumo do formulário)', frente: '--cor-texto', fundo: '--cor-erro-fundo', tipo: 'texto' },
  { uso: 'Texto dentro da caixa de sucesso (confirmação)', frente: '--cor-texto', fundo: '--cor-sucesso-fundo', tipo: 'texto' },

  // Bordas, ícones e foco (mínimo 3:1)
  { uso: 'Borda de campos e controles na página (campo de pesquisa, abas, setas e bolinhas do carrossel)', frente: '--cor-borda', fundo: '--cor-fundo', tipo: 'grafico' },
  { uso: 'Borda de campos, do interruptor e do botão do menu', frente: '--cor-borda', fundo: '--cor-superficie', tipo: 'grafico' },
  { uso: 'Borda de controles no rodapé', frente: '--cor-borda', fundo: '--cor-superficie-2', tipo: 'grafico' },
  { uso: 'Interruptor ligado e opção escolhida (preenchimento)', frente: '--cor-marca', fundo: '--cor-superficie', tipo: 'grafico' },
  { uso: 'Bolinha da imagem atual no carrossel e faixa da aba escolhida', frente: '--cor-marca', fundo: '--cor-fundo', tipo: 'grafico' },
  { uso: 'Contorno de foco na página', frente: '--cor-foco', fundo: '--cor-fundo', tipo: 'grafico' },
  { uso: 'Contorno de foco no cabeçalho e no painel', frente: '--cor-foco', fundo: '--cor-superficie', tipo: 'grafico' },
  { uso: 'Contorno de foco no rodapé', frente: '--cor-foco', fundo: '--cor-superficie-2', tipo: 'grafico' }
];


/* ---------- 3. Fórmula de contraste da WCAG 2.1 ---------- */

// Luminância relativa: o quanto a cor parece clara, de 0 (preto) a 1 (branco).
function luminancia(hex) {
  const canais = [1, 3, 5].map(function (inicio) {
    const valor = parseInt(hex.slice(inicio, inicio + 2), 16) / 255;   // de 0 a 1
    // correção de gama: o brilho que o olho percebe não cresce em linha reta
    return valor <= 0.04045 ? valor / 12.92 : Math.pow((valor + 0.055) / 1.055, 2.4);
  });
  // o olho é mais sensível ao verde, depois ao vermelho e por último ao azul
  return 0.2126 * canais[0] + 0.7152 * canais[1] + 0.0722 * canais[2];
}

// Razão de contraste: de 1 (cores iguais) a 21 (preto sobre branco).
function contraste(corA, corB) {
  const maisClara = Math.max(luminancia(corA), luminancia(corB));
  const maisEscura = Math.min(luminancia(corA), luminancia(corB));
  return (maisClara + 0.05) / (maisEscura + 0.05);
}


/* ---------- 4. Montar o relatório ---------- */

const numero = (n) => n.toFixed(2).replace('.', ',') + ':1';
let reprovados = 0;
let total = 0;

const linhas = [
  '# Contraste das cores (WCAG 2.1)',
  '',
  '> Arquivo gerado por `scripts/contraste.js`. Não edite à mão: rode `node scripts/contraste.js`.',
  '',
  'As cores são lidas de `css/estilo.css`. Para cada par (cor da frente sobre cor de fundo)',
  'usado no site, o script calcula a razão de contraste pela fórmula da WCAG 2.1.',
  '',
  '- **Texto normal:** AA exige 4,5:1; AAA exige 7:1.',
  '- **Bordas de campos, ícones e contorno de foco:** AA exige 3:1; não existe nível AAA para esses itens.',
  ''
];

const resumo = [];

for (const [nomeDoTema, cores] of TEMAS) {
  const tabela = [
    '## ' + nomeDoTema,
    '',
    '| Uso | Par (frente / fundo) | Cores | Razão | Mínimo AA | Passa AA | Passa AAA |',
    '|-----|----------------------|-------|------:|----------:|:--------:|:---------:|'
  ];
  let reprovadosNoTema = 0;
  let menor = Infinity;

  for (const par of PARES) {
    const frente = cores[par.frente];
    const fundo = cores[par.fundo];
    if (!frente || !fundo) throw new Error('Variável não definida: ' + par.frente + ' ou ' + par.fundo);

    const razao = contraste(frente, fundo);
    const minimoAA = par.tipo === 'texto' ? 4.5 : 3;
    const passaAA = razao >= minimoAA;
    const passaAAA = par.tipo === 'texto' ? (razao >= 7 ? 'sim' : 'não') : '—';

    total++;
    menor = Math.min(menor, razao);
    if (!passaAA) {
      reprovados++;
      reprovadosNoTema++;
    }

    tabela.push('| ' + [
      par.uso,
      '`' + par.frente + '` / `' + par.fundo + '`',
      '`' + frente + '` / `' + fundo + '`',
      numero(razao),
      par.tipo === 'texto' ? '4,5:1' : '3:1',
      passaAA ? 'sim' : '**NÃO**',
      passaAAA
    ].join(' | ') + ' |');
  }

  resumo.push('| ' + nomeDoTema + ' | ' + PARES.length + ' | ' + reprovadosNoTema + ' | ' + numero(menor) + ' |');
  linhas.push(...tabela, '');
}

// O resumo vai logo depois da introdução, antes das tabelas de cada tema
const posicaoDoResumo = linhas.indexOf('## ' + TEMAS[0][0]);
linhas.splice(posicaoDoResumo, 0,
  '## Resumo',
  '',
  '| Tema | Pares conferidos | Reprovados no AA | Menor razão |',
  '|------|-----------------:|-----------------:|------------:|',
  ...resumo,
  ''
);

fs.writeFileSync(path.join(RAIZ, 'docs', 'contraste.md'), linhas.join('\n'), 'utf8');

console.log('docs/contraste.md gerado: ' + total + ' pares conferidos, ' + reprovados + ' reprovado(s) no AA.');
if (reprovados > 0) {
  console.error('Há pares abaixo do mínimo AA. Veja as linhas marcadas com "NÃO" em docs/contraste.md.');
  process.exit(1);   // código de erro: útil para barrar um commit com cor reprovada
}

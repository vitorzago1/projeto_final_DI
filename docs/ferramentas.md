# Ferramentas, bibliotecas e créditos

## Linguagens

HTML5, CSS3 e JavaScript puro, sem framework de JavaScript e sem etapa de build.

## Bibliotecas e recursos usados no site

| Item | Versão | Licença | Como entra no site |
|------|--------|---------|--------------------|
| [Bootstrap](https://getbootstrap.com/) | 5.3.9 | MIT | CSS e JavaScript via CDN jsDelivr, com versão fixa e `integrity` |
| [Atkinson Hyperlegible Next](https://www.brailleinstitute.org/freefont/) (Braille Institute) | arquivo do pacote Fontsource 5.3.0 | SIL Open Font License 1.1 | Arquivo `fontes/atkinson-hyperlegible-next.woff2`; a licença está em `fontes/LICENCA-OFL.txt` |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | 1.13.2 | MIT | Dez ícones colados como SVG no HTML, no CSS e no JavaScript: `list`, `universal-access-circle`, `x-lg`, `pause-fill`, `play-fill`, `chevron-left`, `chevron-right`, `info-circle-fill`, `exclamation-circle-fill`, `check-circle-fill` |

## Ferramentas de desenvolvimento e teste

| Ferramenta | Versão | Para quê |
|------------|--------|----------|
| Git | — | Histórico de versões: um commit e uma tag por etapa |
| GitHub | — | Repositório do projeto |
| Node.js | 22 | Rodar os scripts da pasta `scripts/` |
| [Playwright](https://playwright.dev/) | 1.63.0 | Abrir o site em um navegador (Chromium) controlado por script: testes, auditorias e capturas de tela |
| [axe-core](https://github.com/dequelabs/axe-core) | 4.14.1 | Verificação automática de acessibilidade |
| [Lighthouse](https://developer.chrome.com/docs/lighthouse) | 13.6.0 | Notas de acessibilidade, boas práticas, SEO e desempenho |
| [html-validate](https://html-validate.org/) | 11.21.1 | Conferir se o HTML é válido |
| [Pillow](https://python-pillow.org/) (Python) | 12.3.0 | Reduzir os prints para a versão de 960 pixels |

Playwright, axe-core e Lighthouse estão listados em `package.json` com a versão exata;
`npm install` baixa as mesmas versões. O site em si não depende de nenhuma delas.

## Créditos das imagens

Nenhuma imagem de banco de imagens (Unsplash, Pexels) foi usada. Todas as imagens são
capturas de tela feitas com o Playwright, mais o ícone da aba, desenhado para o projeto.

| Arquivo | O que é | Origem | Data |
|---------|---------|--------|------|
| `img/projetos/escola-nacional-de-ballet-1280.jpg`, `-960.jpg` e `-640.jpg` | Primeira tela do site da Escola Nacional de Ballet | Captura de <https://escolanacionaldeballet.com.br> | 17/11/2026 |
| `img/projetos/ana-zago-advocacia-1280.jpg`, `-960.jpg` e `-640.jpg` | Primeira tela do site Ana Zago Advocacia. A foto que aparece na captura faz parte do site. | Captura de <https://anazagoadvocacia.com> | 17/11/2026 |
| `img/projetos/portfolio-1280.jpg`, `-960.jpg` e `-640.jpg` | Página inicial deste portfólio, tema escuro, painel de acessibilidade aberto | Captura do próprio site | 17/11/2026 |
| `img/favicon.svg` | Ícone da aba do navegador, com as iniciais "VZ" | Desenhado para o projeto | 17/11/2026 |
| `docs/paleta.png` | Imagem da paleta de cores | Captura de `docs/paleta.html` | 17/11/2026 |
| `docs/prints/*.png` (16 imagens) | Cada página do site inteira, em 1366px e 390px de largura, nos temas claro e escuro | Capturas do próprio site, por `scripts/prints.js` | 17/11/2026 |
| `docs/prints/estados/*.png` (22 imagens) | Telas de erro, confirmação, painel de acessibilidade, alto contraste e outras | Capturas do próprio site, por `scripts/prints.js` | 17/11/2026 |

As capturas dos sites têm 1280×800 pixels (janela de computador) e duas versões reduzidas,
de 960×600 e 640×400 pixels. O navegador escolhe a menor que serve para o tamanho da tela.

As capturas dos dois sites publicados mostram o conteúdo desses sites (textos, logotipo e
foto), que pertence aos respectivos donos. Elas aparecem aqui para apresentar trabalhos do
Vitor. **A confirmar pelo Vitor:** que os dois clientes estão de acordo com esse uso.

A lista de todas as capturas da pasta `docs/prints/`, com o que cada uma mostra, está em
`docs/prints/README.md`.

## Dados dos projetos

- Título e descrição dos dois sites: tirados do que os próprios sites publicam.
- Tecnologias dos dois sites: identificadas pelo código público das páginas (Next.js e
  React na Escola Nacional de Ballet; HTML, CSS e JavaScript na Ana Zago Advocacia).
  **A confirmar pelo Vitor.**
- Repositórios: nome e linguagem principal informados pelo GitHub para os repositórios
  públicos de `vitorzago1`. Entraram quatro; a escolha de quais mostrar é
  **a confirmar pelo Vitor**.
- Tags dos cartões (`#ballet`, `#tarefas` etc.): tiradas do nome e do assunto de cada
  projeto. **A confirmar pelo Vitor.**
- Textos sobre o Vitor que ainda não existem aparecem no site como `[PREENCHER: ...]`.
  Nenhum dado pessoal foi inventado.

## Inteligência artificial

| Ferramenta | Para quê |
|------------|----------|
| Claude Code (Anthropic) | Escrita do código do site, dos scripts de teste e do material de apoio em `docs/`, a partir dos requisitos definidos pelo Vitor |
| `[PREENCHER: outras ferramentas de IA que você usou, se houver, e para quê]` | |

O Vitor definiu os requisitos e as etapas, aprovou a paleta de cores, testou o site ao fim
de cada etapa e apontou os problemas corrigidos nas Etapas 2.1 e 3.1. Os commits foram
feitos pelo Claude Code durante as sessões de trabalho; por isso o autor que aparece no
histórico do Git é "Claude".

O Claude Code não escreveu o relatório do projeto. A pasta `docs/` é só a matéria-prima
para ele.

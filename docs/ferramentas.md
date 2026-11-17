# Ferramentas, bibliotecas e créditos

> Em construção: este arquivo é atualizado a cada etapa e fechado na Etapa 5.

## Linguagens

HTML5, CSS3 e JavaScript puro, sem framework de JavaScript e sem etapa de build.

## Bibliotecas e recursos usados no site

| Item | Versão | Licença | Como entra no site |
|------|--------|---------|--------------------|
| [Bootstrap](https://getbootstrap.com/) | 5.3.9 | MIT | CSS e JavaScript via CDN jsDelivr, com versão fixa e `integrity` |
| [Atkinson Hyperlegible Next](https://www.brailleinstitute.org/freefont/) (Braille Institute) | arquivo do pacote Fontsource 5.3.0 | SIL Open Font License 1.1 | Arquivo `fontes/atkinson-hyperlegible-next.woff2`; a licença está em `fontes/LICENCA-OFL.txt` |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | 1.13.2 | MIT | Sete ícones colados como SVG no HTML e no JavaScript: `list`, `universal-access-circle`, `x-lg`, `pause-fill`, `play-fill`, `chevron-left`, `chevron-right` |

## Ferramentas de desenvolvimento e teste

| Ferramenta | Versão | Para quê |
|------------|--------|----------|
| Git | — | Histórico de versões: um commit e uma tag por etapa |
| GitHub | — | Repositório do projeto |
| Node.js | 22 | Rodar `scripts/contraste.js` |
| [Playwright](https://playwright.dev/) | — | Testes no navegador (Chromium) e capturas de tela |
| [axe-core](https://github.com/dequelabs/axe-core) | 4.14.1 | Verificação automática de acessibilidade |

## Créditos das imagens

Nenhuma imagem de banco de imagens (Unsplash, Pexels) foi usada até aqui. Todas as imagens
são capturas de tela feitas com o Playwright.

| Arquivo | O que é | Origem | Data |
|---------|---------|--------|------|
| `img/projetos/escola-nacional-de-ballet-1280.jpg` e `-640.jpg` | Primeira tela do site da Escola Nacional de Ballet | Captura de <https://escolanacionaldeballet.com.br> | 17/11/2026 |
| `img/projetos/ana-zago-advocacia-1280.jpg` e `-640.jpg` | Primeira tela do site Ana Zago Advocacia. A foto que aparece na captura faz parte do site. | Captura de <https://anazagoadvocacia.com> | 17/11/2026 |
| `img/projetos/portfolio-1280.jpg` e `-640.jpg` | Página inicial deste portfólio, tema escuro, painel de acessibilidade aberto | Captura do próprio site | 17/11/2026 |
| `img/favicon.svg` | Ícone da aba do navegador, com as iniciais "VZ" | Desenhado para o projeto | 17/11/2026 |
| `docs/paleta.png` | Imagem da paleta de cores | Captura de `docs/paleta.html` | 17/11/2026 |

As capturas dos sites têm 1280×800 pixels (janela de computador) e uma versão reduzida de
640×400 pixels, usada nos cartões e em telas pequenas.

## Dados dos projetos

- Título e descrição dos dois sites: tirados do que os próprios sites publicam.
- Tecnologias dos dois sites: identificadas pelo código público das páginas (Next.js e
  React na Escola Nacional de Ballet; HTML, CSS e JavaScript na Ana Zago Advocacia).
  **A confirmar pelo Vitor.**
- Repositórios: nome e linguagem principal informados pelo GitHub para os repositórios
  públicos de `vitorzago1`.

## Inteligência artificial

| Ferramenta | Para quê |
|------------|----------|
| Claude Code (Anthropic) | Escrita do código do site, dos scripts de teste e do material de apoio em `docs/`, a partir dos requisitos definidos pelo Vitor |

O Vitor definiu os requisitos e as etapas, aprovou a paleta de cores e testou o site ao
fim de cada etapa.

# Vitor Zago — desenvolvimento web e IA

Site de portfólio pessoal. Projeto final da disciplina **Desenvolvimento de Interfaces**
(CEUB, 2º semestre de 2026).

O site tem quatro páginas — Início, Projetos, Contato e Entrar (login) — e um painel de
acessibilidade presente em todas elas. A meta de acessibilidade é a **WCAG 2.1 nível AA**.

> **Sem backend.** O site não tem servidor nem banco de dados. O login e o formulário de
> contato são demonstrações que rodam só no navegador, e as páginas avisam isso.

## Andamento

| Etapa | O que entrega | Tag | Commit | Situação |
|------:|---------------|-----|--------|----------|
| 0 | Pastas, Git, README, cabeçalho e rodapé, proposta de paleta | `v0.0` | `af6ec56` | pronta |
| 1 | Variáveis de cor e tipografia, tema claro/escuro, painel de acessibilidade | `v0.1` | `7ea5a56` | pronta |
| 2 | Início (carrossel + cartões) e Projetos (cartões + pesquisa + abas) | `v0.2` | ver histórico | pronta — textos marcados com `[PREENCHER]` |
| 3 | Contato e Login com validação | `v0.3` | — | a fazer |
| 4 | Auditoria: contraste, teclado e Lighthouse | `v0.4` | — | a fazer |
| 5 | Documentação, prints, GitHub Pages | `v0.5` | — | a fazer |

## Como rodar

O site é feito de arquivos estáticos (HTML, CSS e JavaScript puros). Não há nada para
instalar nem compilar. É preciso estar conectado à internet, porque o Bootstrap vem de um CDN.

**Opção 1 — abrir direto:** dê dois cliques em `index.html`.

**Opção 2 — servidor local** (mais parecido com o site publicado). Na pasta do projeto:

```bash
python3 -m http.server 8000
```

(No Windows o comando é `python -m http.server 8000`.) Depois abra
<http://localhost:8000> no navegador. Para parar o servidor, `Ctrl + C`.

No VS Code, a extensão *Live Server* faz o mesmo com um clique em "Go Live".

**Conferir o contraste das cores** (precisa do Node.js instalado):

```bash
node scripts/contraste.js
```

O script lê as cores de `css/estilo.css` e gera `docs/contraste.md`.

## Estrutura de pastas

```
.
├── index.html        Início
├── projetos.html     Projetos
├── contato.html      Contato
├── login.html        Entrar (login de demonstração)
├── css/
│   └── estilo.css    Estilos do site: variáveis de cor, tipografia, componentes
├── js/
│   ├── preferencias.js     Guarda e aplica tema, tamanho do texto etc. (roda antes de a página aparecer)
│   ├── acessibilidade.js   Painel de acessibilidade (botão fixo em todas as páginas)
│   ├── carrossel.js        Carrossel da página Início (pausar, setas, bolinhas)
│   └── projetos.js         Pesquisa e abas da página Projetos
├── fontes/
│   ├── atkinson-hyperlegible-next.woff2   Fonte do site
│   └── LICENCA-OFL.txt                    Licença da fonte
├── img/
│   ├── favicon.svg   Ícone da aba do navegador
│   └── projetos/     Prints dos sites, em duas larguras (640 e 1280 pixels)
├── scripts/
│   └── contraste.js  Calcula o contraste das cores e gera docs/contraste.md
└── docs/             Material para o relatório
    ├── cores.md        Paleta e justificativa de cada cor
    ├── contraste.md    Contraste de cada par texto/fundo (gerado pelo script)
    ├── ferramentas.md  Ferramentas, bibliotecas, créditos de imagens e IAs usadas
    ├── paleta.html     Página que mostra a paleta aplicada, lendo o CSS do site
    ├── paleta.png      Imagem da paleta
    └── prints/         Capturas de tela das páginas (Etapa 5)
```

## Tecnologias e ferramentas

| Item | Versão | Para quê |
|------|--------|----------|
| HTML5, CSS3, JavaScript | — | Base do site, sem framework e sem etapa de build |
| [Bootstrap](https://getbootstrap.com/) | 5.3.9 (CDN jsDelivr, versão fixa, com `integrity`) | Grade responsiva, menu, base dos botões |
| [Atkinson Hyperlegible Next](https://www.brailleinstitute.org/freefont/) | arquivo do pacote Fontsource 5.3.0, licença OFL 1.1 | Fonte do site, servida da pasta `fontes/` |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | 1.13.2, licença MIT | Sete ícones colados como SVG (menu, acessibilidade, fechar, pausar, reproduzir, setas) |
| Git | — | Histórico de versões: um commit e uma tag por etapa |
| Node.js | 22 | Rodar `scripts/contraste.js` |
| [Playwright](https://playwright.dev/) | — | Testes no navegador e capturas de tela |
| [axe-core](https://github.com/dequelabs/axe-core) | 4.14.1 | Verificação automática de acessibilidade (o mesmo motor do Lighthouse) |

A lista completa, com créditos de imagens e IAs usadas, está em `docs/ferramentas.md`.

## Construção passo a passo

Cada etapa tem um commit e uma tag. A coluna "Commit" da tabela de andamento traz o código
do commit de cada etapa. Para ver o site como estava em uma etapa: `git checkout af6ec56`
(troque pelo código do commit ou pelo nome da tag). Para voltar à versão mais recente:
`git checkout -` .

### Etapa 0 — Estrutura, cabeçalho e rodapé (tag `v0.0`, commit `af6ec56`)

O que foi feito:

1. **Pastas e Git.** Criada a estrutura de pastas e iniciado o histórico de versões.
2. **Quatro páginas com a mesma moldura.** `index.html`, `projetos.html`, `contato.html` e
   `login.html` têm o mesmo cabeçalho e o mesmo rodapé. Como o projeto não usa etapa de
   build, o cabeçalho e o rodapé são repetidos em cada arquivo HTML: assim o código que vai
   anexado ao relatório é exatamente o que o navegador lê, e o site funciona mesmo se o
   JavaScript falhar.
3. **HTML semântico.** `header`, `nav`, `main` e `footer`, com `lang="pt-BR"`. Cada `nav`
   tem um nome (`aria-label`) para o leitor de tela diferenciar o menu principal dos menus
   do rodapé.
4. **Menu responsivo.** Em telas pequenas o menu vira um botão que abre e fecha
   (componente *navbar* do Bootstrap). A página atual é marcada com `aria-current="page"`
   e aparece em negrito e sublinhada — não só por cor.
5. **Link "Pular para o conteúdo".** É o primeiro item ao apertar Tab e leva o foco direto
   ao `main`.
6. **Foco visível.** Links e botões ganham um contorno de 3px ao receber foco pelo teclado.
7. **Rodapé.** Links das páginas, GitHub, LinkedIn, contato e direitos autorais.
8. **Bootstrap 5.3.9 via CDN**, com versão fixa e atributo `integrity` (uma "impressão
   digital" do arquivo: se ele for alterado no CDN, o navegador não carrega).
9. **Proposta de paleta**, com o contraste calculado para cada cor. Nesta etapa as cores
   ainda não estavam aplicadas: o visual era o padrão do Bootstrap.

Como foi testado: as quatro páginas foram abertas com o Playwright em 1366px e 390px de
largura. Conferido: nenhum erro no console, sem rolagem horizontal, o primeiro Tab cai no
link de pular, o Enter leva o foco ao `main`, e o menu do celular abre e fecha atualizando
`aria-expanded`.

### Etapa 1 — Cores, tipografia, temas e painel de acessibilidade (tag `v0.1`, commit `7ea5a56`)

A paleta foi aprovada com um ajuste: no alto contraste, o texto mantém as mesmas cores dos
temas claro e escuro (só fundos, bordas e cores de marca ficam mais fortes).

O que foi feito:

1. **Cores como variáveis CSS** (`css/estilo.css`, seções 2 a 4). Cada cor tem um nome,
   como `--cor-fundo` ou `--cor-marca`, e o resto do CSS usa só os nomes. Há quatro
   conjuntos de valores: tema claro, tema escuro, alto contraste claro e alto contraste
   escuro. Trocar de tema é trocar os valores; nenhuma outra regra muda.
2. **Ligação com o Bootstrap** (seção 5). As variáveis do Bootstrap (`--bs-body-bg`,
   `--bs-body-color` etc.) passam a apontar para as cores do site. Os botões usam a classe
   `.btn` do Bootstrap com três variações próprias: `.btn-marca`, `.btn-destaque` e
   `.btn-contorno`.
3. **Tipografia.** Fonte Atkinson Hyperlegible Next, criada pelo Braille Institute para
   facilitar a leitura de pessoas com baixa visão. O arquivo fica na pasta `fontes/`
   (o site não depende de outro servidor para mostrar texto). Escala de tamanhos em `rem`
   com proporção 1,25 entre os degraus; os títulos encolhem em telas pequenas com `clamp()`.
4. **Tema claro, escuro ou igual ao do sistema.** `js/preferencias.js` escreve
   `data-bs-theme="light"` ou `"dark"` no `<html>` — o mesmo atributo que o Bootstrap usa.
5. **Sem piscar o tema errado.** `js/preferencias.js` é carregado no `<head>` sem `defer`:
   o navegador roda o script antes de desenhar a página, então o tema guardado já está
   aplicado no primeiro instante.
6. **Painel de acessibilidade** (`js/acessibilidade.js`), com botão fixo no canto inferior
   direito de todas as páginas:
   - Tema: claro / escuro / sistema
   - Tamanho do texto: 100%, 115%, 130% (muda o tamanho da fonte do `<html>`; como as
     medidas estão em `rem`, tudo cresce junto)
   - Alto contraste (liga sozinho se o sistema operacional pede mais contraste)
   - Reduzir animações (também vale se o sistema pede menos movimento; nesse caso o
     interruptor aparece ligado e travado, com uma nota explicando)
   - Sublinhar links
   - Restaurar padrão
7. **Escolhas guardadas em `localStorage`**, em uma única chave (`vz-preferencias`), só com
   preferências de exibição. Valores inválidos são ignorados e caem no padrão.
8. **Acessibilidade do próprio painel.** É o segundo item ao apertar Tab (logo depois do
   link de pular). O botão informa `aria-expanded`; ao abrir, o foco vai para o título do
   painel; Esc fecha e devolve o foco ao botão; clicar fora ou sair com Tab também fecha.
   Tema e tamanho são botões de rádio dentro de `fieldset` com `legend` (as setas trocam de
   opção); os outros três são caixas de seleção com `role="switch"`. Cada mudança é
   confirmada em um texto com `role="status"`, lido pelo leitor de tela.
9. **`scripts/contraste.js`.** Lê as variáveis de cor direto de `css/estilo.css`, calcula
   o contraste de cada par texto/fundo usado e gera `docs/contraste.md`. Termina com erro
   se algum par reprovar no AA.
10. **Ícone do menu em SVG** com `currentColor`, para acompanhar qualquer tema, e ícone da
    aba do navegador (`img/favicon.svg`).

Decisão de projeto: o HTML do painel é criado pelo JavaScript, e não repetido nas quatro
páginas como o cabeçalho e o rodapé. Motivo: sem JavaScript o painel não teria função,
então ele nem deve aparecer; e assim existe um só lugar para alterar.

Resultados:

- **Contraste:** 124 pares conferidos (31 por tema), nenhum reprovado no AA. Menor razão em
  texto: 5,59:1. Menor razão em bordas: 3,54:1 (mínimo 3:1). Nos dois temas de alto
  contraste, todo texto passa também no AAA (7:1). Detalhes em `docs/contraste.md`.
- **axe-core:** nenhuma violação nas 4 páginas × 4 temas × 2 larguras (1366px e 390px),
  com o painel fechado e aberto (64 verificações).
- **Teste pelo teclado (Playwright), 40 verificações:** ordem do Tab, abertura com Enter,
  setas nos rádios, Espaço nos interruptores, Esc, clique fora, persistência ao trocar de
  página, restaurar padrão, `prefers-reduced-motion` e ausência de rolagem horizontal com
  o texto em 130% no celular. O atributo do tema foi observado desde o início do
  carregamento: com o tema escuro guardado e o sistema em claro, ele nunca passou por
  "light".

Limitação conhecida: sem JavaScript o site aparece no tema claro e sem o painel. A redução
de animações pedida pelo sistema operacional funciona mesmo assim, porque também está no CSS.

### Etapa 2 — Início e Projetos (tag `v0.2`)

Conteúdo: os textos sobre o Vitor que ainda não foram escritos aparecem como
`[PREENCHER: ...]`, destacados em âmbar. O que está preenchido vem de fontes verificáveis:
os dois sites publicados, os repositórios públicos do GitHub e este próprio projeto.

O que foi feito na página **Início** (`index.html`):

1. **Apresentação.** Nome em destaque, a frase "Desenvolvimento web e IA" e dois botões:
   "Ver projetos" (âmbar, a ação principal da tela) e "Fale comigo" (contorno).
2. **Carrossel de imagens** (`js/carrossel.js`), com prints dos dois sites e deste portfólio.
   - Usa o componente *carousel* do Bootstrap para deslizar; quando andar e quando parar é
     decidido pelo script do site.
   - Passa sozinho a cada 6 segundos e espera enquanto o mouse está em cima ou o foco do
     teclado está dentro dele.
   - **Botão Pausar/Reproduzir** (WCAG 2.2.2). É o primeiro item do carrossel no HTML,
     para ser o primeiro a receber foco.
   - Setas, bolinhas e as teclas ← → trocam de imagem. A bolinha da imagem atual tem
     `aria-current="true"` e fica mais larga e preenchida.
   - Os botões ficam abaixo das imagens, não por cima: o contraste deles não depende da
     imagem que está passando.
   - `aria-live` fica em `off` enquanto o carrossel anda sozinho e passa a `polite` quando
     está pausado, para o leitor de tela anunciar a imagem ao trocar manualmente.
   - Começa pausado se "Reduzir animações" estiver ligado no painel ou no sistema; ligar a
     opção no painel pausa na hora.
   - Imagens com `alt` descritivo, `width` e `height` (a página não "pula" ao carregar),
     `srcset` (o celular baixa a versão menor) e `loading="lazy"` nas que não aparecem de início.
3. **"Como eu trabalho".** Quatro cartões em lista ordenada (`<ol>`), porque são passos em
   sequência. O número de cada cartão é desenhado pelo CSS (contador).
4. **Projetos em destaque.** Três cartões e o link "Ver todos os projetos".

O que foi feito na página **Projetos** (`projetos.html` e `js/projetos.js`):

1. **Sete cartões** escritos direto no HTML: três sites e quatro repositórios públicos. Cada
   cartão tem categoria, título, descrição, tecnologias, tags e link.
2. **Pesquisa em tempo real.** Filtra a cada tecla, olhando título, tecnologias e tags.
   Ignora maiúsculas e acentos ("educacao" encontra "#educação") e aceita mais de uma
   palavra ("python calc").
3. **Abas de categoria** (Todos, Sites, Repositórios), no padrão de abas da WAI-ARIA:
   `role="tablist"`, `role="tab"` com `aria-selected` e `role="tabpanel"`. No teclado, as
   setas ← → trocam de aba, Home e End vão à primeira e à última.
4. **Pesquisa e aba funcionam juntas**: o cartão aparece só se passar nos dois filtros.
5. **Frase de situação** ("Mostrando 3 de 7 projetos") com `role="status"`, lida pelo
   leitor de tela a cada mudança.
6. **Aviso "Nenhum projeto encontrado"**, que diz o que foi procurado, sugere o que fazer e
   traz o botão "Limpar a pesquisa e ver todos". Ao limpar, o foco vai para o campo.
7. **Segurança.** O texto digitado entra no aviso por `textContent`, nunca por `innerHTML`:
   é tratado como texto puro, não como código.
8. **Sem JavaScript** os filtros não aparecem e a lista completa continua visível.

Também nesta etapa: estilos de campos de formulário com as cores do site (borda com
contraste de 3:1), que serão reaproveitados na Etapa 3.

Resultados:

- **Bootstrap direto do CDN:** conferido nesta etapa. O arquivo carregou com o atributo
  `integrity` e o navegador aceitou (versão 5.3.9).
- **Teste funcional (Playwright), 47 verificações**, todas aprovadas: avanço automático,
  pausar e reproduzir, setas, bolinhas, teclado, espera com o mouse em cima, redução de
  animações pelo painel e pelo sistema; pesquisa por título, tecnologia e tag, abas pelo
  mouse e pelo teclado, combinação dos dois filtros, aviso de nenhum resultado e botão de limpar.
- **Problema encontrado e corrigido:** no celular, com o texto em 115% ou 130%, os botões
  do carrossel não cabiam em uma linha e a página ganhava rolagem lateral. Agora a
  navegação desce para a linha de baixo quando falta espaço. Conferido em 320px e 390px de
  largura, com o texto em 100%, 115% e 130%.
- **Contraste:** 128 pares conferidos (32 por tema), nenhum reprovado no AA.
- **axe-core:** nenhuma violação em 72 verificações (4 páginas × 4 temas × 2 larguras,
  incluindo o aviso de nenhum resultado e o painel de acessibilidade aberto).

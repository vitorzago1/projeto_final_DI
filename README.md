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
| 2 | Início (carrossel + cartões) e Projetos (cartões + pesquisa + abas) | `v0.2` | `e31ea2a` | pronta — textos marcados com `[PREENCHER]` |
| 2.1 | Correções depois do teste da Etapa 2 (carrossel e setas nas abas) | `v0.2.1` | `0ac5b10` | pronta |
| 3 | Contato e Login com validação | `v0.3` | ver histórico | pronta |
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
│   ├── projetos.js         Pesquisa e abas da página Projetos
│   ├── formulario.js       Validação usada pelos dois formulários
│   ├── contato.js          Regras do formulário de contato e envio simulado
│   └── login.js            Regras do login, mostrar/ocultar senha, "lembrar de mim"
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
| [Bootstrap Icons](https://icons.getbootstrap.com/) | 1.13.2, licença MIT | Dez ícones colados como SVG (menu, acessibilidade, fechar, pausar, reproduzir, setas, informação, erro, sucesso) |
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

### Etapa 2 — Início e Projetos (tag `v0.2`, commit `e31ea2a`)

Conteúdo: os textos sobre o Vitor que ainda não foram escritos aparecem como
`[PREENCHER: ...]`, destacados em âmbar. O que está preenchido vem de fontes verificáveis:
os dois sites publicados, os repositórios públicos do GitHub e este próprio projeto.

O que foi feito na página **Início** (`index.html`):

1. **Apresentação.** Nome em destaque, a frase "Desenvolvimento web e IA" e dois botões:
   "Ver projetos" (âmbar, a ação principal da tela) e "Fale comigo" (contorno).
2. **Carrossel de imagens** (`js/carrossel.js`), com prints dos dois sites e deste portfólio.
   - Usa o componente *carousel* do Bootstrap para deslizar; quando andar e quando parar é
     decidido pelo script do site.
   - Passa sozinho a cada 6 segundos. Nesta versão ele também esperava enquanto o mouse
     estava em cima ou o foco do teclado estava dentro dele; isso foi retirado na correção
     descrita logo abaixo.
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

### Etapa 2.1 — Correções depois do teste (tag `v0.2.1`, commit `0ac5b10`)

O Vitor testou a Etapa 2 e relatou dois problemas.

**1. "O carrossel às vezes passa sozinho, outras não."**

- Causa: o carrossel tinha esperas escondidas. Ele parava enquanto o mouse estivesse em cima
  das imagens e enquanto o foco estivesse em um dos seus botões — e, depois de um clique em
  uma seta ou bolinha, o foco ficava no botão, então ele não voltava a andar. Em todos esses
  casos o botão continuava mostrando "Pausar", como se estivesse andando. Além disso, cada
  entrada e saída do mouse reiniciava a contagem dos 6 segundos.
- Correção: passou a valer uma regra só. O carrossel anda a cada 6 segundos, a não ser que
  esteja pausado, e o botão sempre mostra o estado real ("Pausar" quando anda, "Reproduzir"
  quando está parado). Depois de uma troca manual a contagem recomeça.
- Quando o carrossel está parado por causa de "Reduzir animações" (no painel ou no sistema),
  aparece uma nota dizendo isso. Antes, quem tinha deixado a opção ligada via o carrossel
  parado sem explicação.
- A exigência da WCAG (2.2.2: conteúdo que se move sozinho precisa de um jeito de pausar)
  continua atendida pelo botão.

**2. "Só consigo trocar de aba com o mouse; com as setas, não."**

- Causa: as setas ← → funcionam quando o foco está em uma aba. O Safari e o Firefox no Mac
  não dão foco a um botão clicado com o mouse; depois do clique, as teclas não tinham onde agir.
- Correção: ao clicar em uma aba, o script dá o foco a ela. O mesmo foi feito nas setas e
  bolinhas do carrossel, para as teclas ← → funcionarem logo depois de um clique.
- Observação sobre o Safari: por padrão, a tecla Tab não passa por botões e links nesse
  navegador. Para navegar só pelo teclado, use Option + Tab ou ligue "Pressionar Tab para
  destacar cada item da página web" nos ajustes do Safari (aba Avançado).

Como foi testado (Playwright, 27 verificações, todas aprovadas): o carrossel avança com o
mouse parado em cima das imagens, com o mouse entrando e saindo várias vezes e com o foco
em um botão depois do clique; pausar e reproduzir; a nota de "Reduzir animações"; trocar o
tema não interfere no carrossel. Para reproduzir o comportamento do Safari, o teste dispara
o clique sem dar foco ao botão e em seguida usa as setas do teclado, nas abas e no carrossel.

### Etapa 3 — Contato e Login com validação (tag `v0.3`)

As duas páginas são demonstrações: o site não tem servidor, e cada página avisa isso em
um quadro logo acima do formulário.

**Validação, igual nos dois formulários** (`js/formulario.js`):

1. **Cada campo tem um `<label>`** ligado pelo par `for`/`id`.
2. **Erro ligado ao campo.** Embaixo de cada campo há um parágrafo de erro, ligado ao campo
   por `aria-describedby`. Quando o valor está errado, o script escreve a mensagem nesse
   parágrafo e coloca `aria-invalid="true"` no campo. O leitor de tela lê a mensagem junto
   com o campo.
3. **Resumo dos erros** no topo do formulário, com `role="alert"` e
   `aria-live="assertive"`: o leitor de tela lê na hora. Cada item é um link que leva o foco
   ao campo.
4. **Foco no primeiro campo com erro** depois de uma tentativa de envio.
5. **Erro não depende só da cor:** além da borda vermelha, há um ícone e a mensagem escrita.
6. **Mensagens específicas**, que dizem o que fazer: "Digite um e-mail completo, como
   nome@exemplo.com", "A mensagem precisa de pelo menos 10 caracteres. Faltam 8."
7. **Quando confere:** ao enviar. Depois disso, o erro de um campo some assim que o valor
   fica certo, enquanto a pessoa digita; quando o último erro é corrigido, o resumo some.
8. **Sem JavaScript** valem as regras do próprio HTML (`required`, `type="email"`,
   `minlength`). O script desliga os balões do navegador (`noValidate`) só quando assume a
   validação.
9. **`autocomplete`** em todos os campos de dados pessoais (WCAG 1.3.5), para o navegador
   sugerir o preenchimento.

**Contato** (`contato.html`, `js/contato.js`):

- Campos: nome, e-mail, assunto (lista de opções), mensagem e a caixa de autorização.
- Envio simulado: o botão trava e mostra "Enviando…" (evita dois envios), uma região
  `aria-live="polite"` anuncia o envio, e em menos de um segundo o formulário dá lugar à
  confirmação, que recebe o foco. A confirmação repete o assunto e o e-mail informados e
  diz que nada foi enviado nem guardado.
- "Escrever outra mensagem" devolve o formulário limpo, com o foco no primeiro campo.

**Entrar** (`login.html`, `js/login.js`):

- Campos: e-mail e senha. A página mostra os dados de demonstração para testar.
- **Mostrar e ocultar a senha:** o botão troca o campo entre `password` e `text`, muda o
  próprio texto ("Mostrar" / "Ocultar") e avisa o leitor de tela por `aria-live`.
- **Lembrar de mim:** guarda só o e-mail em `localStorage`. **A senha nunca é guardada**,
  em lugar nenhum; ela é apagada do campo logo depois de cada tentativa.
- Dados errados: "E-mail ou senha incorretos", sem dizer qual dos dois (o costume em
  logins, para não ajudar quem tenta adivinhar).
- O formulário usa `method="post"`: mesmo sem JavaScript, a senha não vai parar no
  endereço da página.
- O arquivo avisa que isso não é segurança de verdade: em um site real a senha é
  conferida no servidor.

**Componentes novos no CSS** (seção 12): caixa de seleção desenhada com as cores do site,
campo com erro, mensagem de erro com ícone e as caixas de aviso (informação, erro, sucesso).

Resultados:

- **Teste funcional (Playwright), 54 verificações**, todas aprovadas: ligação de cada campo
  com seu label e seu erro, envio vazio, mensagens, correção em tempo real, resumo, foco,
  envio simulado, mostrar/ocultar senha, dados certos e errados, "lembrar de mim" e a
  ausência da senha em `localStorage`, `sessionStorage`, cookies e no endereço da página.
- **Problemas encontrados e corrigidos durante o teste:**
  1. A primeira versão conferia cada campo ao sair dele. A mensagem de erro que aparecia
     empurrava o botão "Enviar" para baixo no meio do clique, e o clique se perdia. A
     conferência passou a acontecer só no envio.
  2. Na página Entrar, no celular com o texto em 130%, o e-mail de demonstração não quebrava
     linha e a página ganhava rolagem lateral. Agora o texto dos avisos quebra.
- **Contraste:** 136 pares conferidos (34 por tema), nenhum reprovado no AA.
- **axe-core:** nenhuma violação em 88 verificações (4 temas × 2 larguras), incluindo os
  estados com erros, dados incorretos e confirmação.
- **Sem regressão:** os testes do painel de acessibilidade (40) e do carrossel e das abas
  (27) foram rodados de novo e passaram.

# Vitor Zago — desenvolvimento web e IA

Site de portfólio pessoal. Projeto final da disciplina **Desenvolvimento de Interfaces**
(CEUB, 2º semestre de 2026).

O site tem quatro páginas — Início, Projetos, Contato e Entrar (login) — e um painel de
acessibilidade presente em todas elas. A meta de acessibilidade é a **WCAG 2.1 nível AA**.

> **Sem backend.** O site não tem servidor nem banco de dados. O login e o formulário de
> contato são demonstrações que rodam só no navegador, e as páginas avisam isso.

## Andamento

| Etapa | O que entrega | Tag | Situação |
|------:|---------------|-----|----------|
| 0 | Pastas, Git, README, cabeçalho e rodapé, proposta de paleta | `v0.0` | pronta — paleta aguardando aprovação |
| 1 | Variáveis de cor e tipografia, tema claro/escuro, painel de acessibilidade | `v0.1` | a fazer |
| 2 | Início (carrossel + cartões) e Projetos (cartões + pesquisa + abas) | `v0.2` | a fazer |
| 3 | Contato e Login com validação | `v0.3` | a fazer |
| 4 | Auditoria: contraste, teclado e Lighthouse | `v0.4` | a fazer |
| 5 | Documentação, prints, GitHub Pages | `v0.5` | a fazer |

## Como rodar

O site é feito de arquivos estáticos (HTML, CSS e JavaScript puros). Não há nada para
instalar nem compilar. É preciso estar conectado à internet, porque o Bootstrap vem de um CDN.

**Opção 1 — abrir direto:** dê dois cliques em `index.html`.

**Opção 2 — servidor local** (mais parecido com o site publicado). Na pasta do projeto:

```bash
python -m http.server 8000
```

Depois abra <http://localhost:8000> no navegador. Para parar o servidor, `Ctrl + C`.

No VS Code, a extensão *Live Server* faz o mesmo com um clique em "Go Live".

## Estrutura de pastas

```
.
├── index.html        Início
├── projetos.html     Projetos
├── contato.html      Contato
├── login.html        Entrar (login de demonstração)
├── css/
│   └── estilo.css    Estilos do site (carregado depois do Bootstrap)
├── js/               JavaScript do site (a partir da Etapa 1)
├── img/              Imagens do site
├── scripts/          Scripts de apoio (ex.: cálculo de contraste)
└── docs/             Material para o relatório
    ├── cores.md              Paleta e justificativa de cada cor
    ├── paleta.html           Página que mostra a paleta e calcula os contrastes
    ├── paleta-proposta.png   Imagem da paleta proposta
    └── prints/               Capturas de tela das páginas
```

Os arquivos `.gitkeep` são arquivos vazios: o Git não guarda pastas vazias, então eles
servem só para a pasta existir no repositório até receber conteúdo.

## Tecnologias e ferramentas

| Item | Versão | Para quê |
|------|--------|----------|
| HTML5, CSS3, JavaScript | — | Base do site, sem framework e sem etapa de build |
| [Bootstrap](https://getbootstrap.com/) | 5.3.9 (CDN jsDelivr, versão fixa, com `integrity`) | Grade responsiva, menu, componentes |
| Git | — | Histórico de versões: um commit e uma tag por etapa |
| [Playwright](https://playwright.dev/) | — | Testes no navegador e capturas de tela |
| Node.js | 22 | Rodar os scripts de apoio |

A lista completa, com créditos de imagens e IAs usadas, ficará em `docs/ferramentas.md` (Etapa 5).

## Construção passo a passo

Cada etapa tem um commit e uma tag. Para ver o site como estava em uma etapa:
`git checkout v0.0` (troque pelo número da tag). Para voltar à versão mais recente:
`git checkout -` .

### Etapa 0 — Estrutura, cabeçalho e rodapé (tag `v0.0`)

O que foi feito:

1. **Pastas e Git.** Criada a estrutura acima e iniciado o histórico de versões.
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
9. **Proposta de paleta.** Documentada em `docs/cores.md`, com contraste calculado para
   cada cor. As cores ainda **não** foram aplicadas ao site: isso é a Etapa 1, depois da
   aprovação.

Nesta etapa o visual é o padrão do Bootstrap (preto, branco e azul). As páginas mostram um
marcador `[EM CONSTRUÇÃO — ...]` onde o conteúdo de cada etapa vai entrar.

Como foi testado: as quatro páginas foram abertas com o Playwright em 1366px e 390px de
largura. Conferido: nenhum erro no console, sem rolagem horizontal, o primeiro Tab cai no
link de pular, o Enter leva o foco ao `main`, e o menu do celular abre e fecha atualizando
`aria-expanded`.

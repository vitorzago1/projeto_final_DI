# Recursos e componentes de cada página

Este arquivo lista o que cada página do site tem, como cada recurso foi feito e o que
garante a acessibilidade dele. "Componente" é uma peça da interface que se repete com a
mesma aparência e o mesmo comportamento: um botão, um cartão, uma caixa de aviso.

- Coluna **Como é feito**: as tags HTML e as classes principais. Classes em inglês
  (`navbar`, `row`, `btn`) são do Bootstrap; classes em português (`projeto`, `aviso`,
  `carrossel`) foram escritas para este site.
- Coluna **Arquivos**: onde está o estilo (seção de `css/estilo.css`) e o script, se houver.
- Os prints de cada página estão em [`prints/`](prints/README.md).

## Resumo: o que foi pedido e onde está

| Requisito | Onde está |
|-----------|-----------|
| Cabeçalho, menu, rodapé e painel de acessibilidade em todas as páginas | Seção "Em todas as páginas", abaixo |
| Início: apresentação | `index.html`, bloco `.apresentacao` |
| Início: carrossel de imagens | `index.html`, `section.carrossel`; `js/carrossel.js` |
| Início: 3 a 4 cartões "Como eu trabalho" | `index.html`, `ol.passos` (4 cartões) |
| Início: destaque de projetos | `index.html`, seção "Projetos em destaque" (3 cartões) |
| Projetos: cartões | `projetos.html`, `ul.lista-projetos` (7 cartões) |
| Projetos: pesquisa em tempo real por título, tecnologia ou tag | `#pesquisa`; `js/projetos.js`, função `filtrar` |
| Projetos: abas de categoria | `.abas` (Todos, Sites, Repositórios); `js/projetos.js`, seção 3 |
| Projetos: aviso de "nenhum resultado" | `#sem-resultado`; `js/projetos.js`, função `mostrarSituacao` |
| Contato: nome, e-mail, assunto, mensagem e consentimento | `contato.html`, `#form-contato` |
| Contato: validação em JavaScript, com o erro ligado a cada campo | `js/formulario.js` e `js/contato.js`; `aria-describedby` e `aria-invalid` |
| Contato: confirmação simulada | `#contato-confirmacao`; `js/contato.js`, função `enviar` |
| Entrar: e-mail e senha, com validação e erro acessível | `login.html`, `#form-login`; `js/formulario.js` e `js/login.js` |
| Entrar: mostrar e ocultar a senha | `#mostrar-senha`; `js/login.js`, seção 2 |
| Entrar: "lembrar de mim" | `#lembrar`; `js/login.js`, seção 3 (guarda só o e-mail) |
| Rodapé: links das páginas, GitHub, LinkedIn, contato e direitos | bloco "RODAPÉ" de cada página |
| Aviso de que login e formulário são demonstrações | `.aviso-info` em `contato.html` e `login.html` |

## Em todas as páginas

| Recurso | Como é feito | Arquivos | Acessibilidade |
|---------|--------------|----------|----------------|
| Idioma e estrutura | `<html lang="pt-BR">`; `<header>`, `<nav>`, `<main>`, `<footer>` | os quatro `.html` | O leitor de tela usa a pronúncia certa e permite saltar entre as regiões da página |
| Link "Pular para o conteúdo" | `<a class="link-pular" href="#conteudo">`, primeiro item da página; escondido até receber foco | CSS seção 8 | Primeiro Tab da página; leva o foco ao `<main>` (WCAG 2.4.1) |
| Cabeçalho com menu | `navbar navbar-expand-md` do Bootstrap; nome do site (`navbar-brand`), três links e o botão "Entrar" | CSS seção 10 | `aria-label="Menu principal"`; página atual com `aria-current="page"`, em negrito e sublinhada |
| Menu do celular | Abaixo de 768px o menu vira um botão de três linhas (`navbar-toggler` + `collapse` do Bootstrap) | JavaScript do Bootstrap | O botão tem nome (`aria-label`) e informa `aria-expanded` |
| Rodapé | Duas `<nav>` com listas de links (páginas; GitHub, LinkedIn e contato) e a linha de direitos | CSS seção 11 | Cada `<nav>` tem um nome diferente (`aria-label`) |
| Painel de acessibilidade | Botão fixo no canto inferior direito que abre um painel com: tema (claro, escuro, sistema), tamanho do texto (100%, 115%, 130%), alto contraste, reduzir animações, sublinhar links e "Restaurar padrão" | `js/acessibilidade.js`, `js/preferencias.js`; CSS seções 18 e 19 | Botão com `aria-expanded`; rádios em `<fieldset>` com `<legend>`; interruptores com `role="switch"`; mudanças anunciadas por `role="status"`; Esc fecha e devolve o foco |
| Preferências guardadas | `localStorage`, chave `vz-preferencias`; aplicadas por um script no `<head>`, antes de a página ser desenhada | `js/preferencias.js` | O tema errado não pisca na tela; respeita `prefers-color-scheme`, `prefers-reduced-motion` e `prefers-contrast` |
| Foco visível | Contorno de 3px em tudo que recebe foco pelo teclado | CSS seção 7 | WCAG 2.4.7; contraste do contorno de 6,2:1 ou mais |
| Cores e temas | Variáveis CSS com quatro conjuntos de valores (claro, escuro e os dois de alto contraste) | CSS seções 2 a 5; `docs/cores.md` | Contraste conferido por `scripts/contraste.js` (`docs/contraste.md`) |
| Tipografia | Fonte Atkinson Hyperlegible Next, servida da pasta `fontes/`; tamanhos em `rem` | CSS seções 1 e 6 | Fonte desenhada para leitura fácil; o texto cresce com o ajuste do painel e com o zoom do navegador |
| Grade responsiva | `container`, `row` e `col-*` do Bootstrap | — | Sem rolagem lateral de 320px para cima, com o texto em até 130% (`docs/auditoria/layout.md`) |

## Início (`index.html`)

| Recurso | Como é feito | Arquivos | Acessibilidade |
|---------|--------------|----------|----------------|
| Apresentação | `<h1>` com o nome, frase de apoio (`lead`) e dois botões: "Ver projetos" (`btn-destaque`) e "Fale comigo" (`btn-contorno`) | CSS seções 9 e 13 | Um único `<h1>`; os botões são links de verdade (`<a>`), porque levam a outra página |
| Carrossel de imagens | `<section class="carrossel">` com três imagens; o deslizar usa o componente `carousel` do Bootstrap; botão "Pausar/Reproduzir", setas e bolinhas próprios, abaixo das imagens | `js/carrossel.js`; CSS seção 14 | `aria-roledescription="carrossel"`; botão de pausa como primeiro item (WCAG 2.2.2); `aria-live` só quando pausado; teclas ← →; começa parado com "Reduzir animações" |
| Imagens do carrossel | `<img>` com `alt` descritivo, `width` e `height`, `srcset` com três larguras (640, 960 e 1280 pixels) | `img/projetos/` | Texto alternativo em todas; a página não "pula" enquanto as imagens carregam |
| Cartões "Como eu trabalho" | Lista ordenada `<ol class="passos">` com quatro cartões; o número é desenhado pelo CSS | CSS seção 15 | Lista ordenada porque são passos em sequência; `role="list"` mantém o anúncio de lista |
| Projetos em destaque | Três cartões `.projeto` (os mesmos da página Projetos) em grade de três colunas, e o link "Ver todos os projetos" | CSS seção 16 | Cada cartão é um `<article>` com título `<h3>`; o link traz o nome do projeto em texto só para leitor de tela |

## Projetos (`projetos.html`)

| Recurso | Como é feito | Arquivos | Acessibilidade |
|---------|--------------|----------|----------------|
| Campo de pesquisa | `<input type="search" id="pesquisa">` dentro de `<div role="search">`; filtra a cada tecla | `js/projetos.js`; CSS seções 12 e 17 | `<label>` visível; texto de ajuda ligado por `aria-describedby` |
| Abas de categoria | Três botões (Todos, Sites, Repositórios) | `js/projetos.js`; CSS seção 17 | Padrão de abas da WAI-ARIA: `role="tablist"`, `role="tab"`, `aria-selected`, `role="tabpanel"`; setas ← →, Home e End |
| Frase de situação | `<p id="filtro-situacao">`: "Mostrando 3 de 7 projetos." | `js/projetos.js` | `role="status"`: o leitor de tela lê a cada mudança |
| Cartão de projeto | `<article class="projeto">` com imagem (ou capa com a linguagem), categoria, título, descrição, tecnologias, tags e link | CSS seção 16 | Imagem com `alt`; listas de tecnologias e de tags com nome (`aria-label`); link com o nome do projeto para leitor de tela |
| Etiquetas de tecnologia e tags | `<ul class="etiquetas">` e `<ul class="projeto-tags">` | CSS seção 16 | São texto, não imagem; entram na pesquisa |
| Aviso de nenhum resultado | `<div id="sem-resultado">` com título, a palavra procurada, uma sugestão e o botão "Limpar a pesquisa e ver todos" | `js/projetos.js`; CSS seção 17 | O texto digitado entra por `textContent` (nunca como código); ao limpar, o foco vai para o campo |
| Sem JavaScript | Os filtros só aparecem quando o script está funcionando (classe `com-js` no `<html>`) | `js/preferencias.js`; CSS seção 17 | A lista completa continua visível |

## Contato (`contato.html`)

| Recurso | Como é feito | Arquivos | Acessibilidade |
|---------|--------------|----------|----------------|
| Links de contato | Lista com LinkedIn e GitHub | CSS seção 12 | Links com texto que diz o destino |
| Aviso de demonstração | `<div class="aviso aviso-info">` com ícone e texto | CSS seção 12 | O ícone é decorativo (`aria-hidden`); a informação está no texto |
| Campos de texto | Nome (`type="text"`), e-mail (`type="email"`) e mensagem (`<textarea>`, de 10 a 1000 caracteres), com `form-control` do Bootstrap | CSS seção 12 | `<label>` ligado por `for`/`id`; `autocomplete` em nome e e-mail (WCAG 1.3.5); borda com contraste de 3:1 ou mais |
| Lista de assuntos | `<select class="form-select">` com quatro opções | CSS seção 12 | Controle nativo: funciona com teclado e leitor de tela sem script |
| Caixa de autorização | `<input type="checkbox" class="caixa">` com o texto de consentimento | CSS seção 12 | Caixa nativa redesenhada só no visual; o texto é o `<label>` |
| Mensagem de erro do campo | `<p class="campo-erro">` logo abaixo de cada campo | `js/formulario.js`; CSS seção 12 | Ligada ao campo por `aria-describedby`; o campo recebe `aria-invalid="true"`; ícone e texto, não só cor |
| Resumo dos erros | `<div class="aviso aviso-erro">` no topo do formulário, com um link para cada campo | `js/formulario.js` | `role="alert"` e `aria-live="assertive"`; o foco vai para o primeiro campo com erro |
| Botão "Enviar mensagem" | `<button type="submit" class="btn btn-destaque">`; durante o envio trava e mostra "Enviando…" | `js/contato.js` | `aria-busy` no formulário e anúncio em região `aria-live="polite"` |
| Confirmação simulada | `<section class="aviso aviso-sucesso">` que substitui o formulário; botão "Escrever outra mensagem" | `js/contato.js` | Recebe o foco ao aparecer; título `<h2>` |
| Sem JavaScript | Valem as regras do HTML: `required`, `type="email"`, `minlength` | — | O navegador mostra as próprias mensagens |

## Entrar (`login.html`)

| Recurso | Como é feito | Arquivos | Acessibilidade |
|---------|--------------|----------|----------------|
| Aviso com os dados de demonstração | `.aviso.aviso-info` com uma lista de definição (`<dl>`): e-mail e senha de teste | CSS seção 12 | O texto do aviso quebra linha em telas estreitas |
| Campo de e-mail | `<input type="email">` | CSS seção 12 | `<label>`; `autocomplete="username"` |
| Campo de senha com botão "Mostrar" | `input-group` do Bootstrap: `<input type="password">` e um `<button>` ao lado | `js/login.js`, seção 2 | O botão muda de texto ("Mostrar"/"Ocultar") e avisa o leitor de tela por `aria-live`; `autocomplete="current-password"` |
| "Lembrar de mim" | `<input type="checkbox" class="caixa">` com texto de ajuda | `js/login.js`, seção 3 | Guarda só o e-mail em `localStorage`; a senha nunca é guardada |
| Erros de validação | Os mesmos componentes da página Contato (erro do campo e resumo) | `js/formulario.js` | Iguais aos de Contato |
| Dados incorretos | Resumo com "E-mail ou senha incorretos. Use os dados de demonstração do quadro acima." | `js/login.js`, função `entrar` | `role="alert"`; o foco volta para a senha; a senha é apagada do campo |
| Resultado simulado | `<section class="aviso aviso-sucesso">` "Você entrou (demonstração)" e botão "Sair" | `js/login.js` | Recebe o foco ao aparecer |

## O que vem do Bootstrap e o que foi feito para o site

**Do Bootstrap 5.3.9** (CSS e JavaScript via CDN):

- grade responsiva: `container`, `row`, `col-*`, `g-*`;
- menu: `navbar`, `navbar-toggler`, `collapse` (abrir e fechar no celular);
- carrossel: `carousel`, `carousel-inner`, `carousel-item` (mostrar uma imagem por vez e deslizar);
- base dos botões e dos campos: `btn`, `btn-lg`, `btn-check`, `form-control`, `form-select`,
  `form-label`, `form-text`, `input-group`;
- utilitários de espaçamento e alinhamento (`mt-4`, `py-5`, `d-flex`, `gap-2`) e
  `visually-hidden` (texto só para leitor de tela);
- o atributo `data-bs-theme`, usado para o tema escuro.

**Feito para o site** (`css/estilo.css` e pasta `js/`):

- todas as cores, por variáveis CSS, e os quatro temas;
- as três variações de botão: `btn-marca`, `btn-destaque`, `btn-contorno`;
- cartão de projeto, etiquetas, cartões de passos;
- abas de categoria, pesquisa e aviso de nenhum resultado;
- controles do carrossel (pausar, setas, bolinhas) e a regra de quando ele anda ou para;
- caixas de aviso, mensagem de erro do campo, caixa de seleção e interruptor;
- painel de acessibilidade e o sistema de preferências;
- validação dos formulários.

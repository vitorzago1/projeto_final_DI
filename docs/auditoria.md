# Auditoria de acessibilidade (Etapa 4)

Este arquivo reúne o que foi conferido, o que falhou, o que foi corrigido e os números de
antes e depois. Os resultados completos, gerados pelos scripts, estão na pasta `docs/auditoria/`.

- "Antes": o site como estava no commit `734ace6` (fim da Etapa 3.1).
- "Depois": o site no commit da Etapa 4.

## O que foi conferido e com qual ferramenta

| Conferência | Ferramenta | Script | Resultado completo |
|-------------|------------|--------|--------------------|
| Contraste de cada par texto/fundo, nos 4 temas | Fórmula da WCAG 2.1 | `scripts/contraste.js` | `docs/contraste.md` |
| Regras automáticas de acessibilidade, nos 4 temas e nos estados de cada página | axe-core 4.14.1 | `scripts/auditoria-axe.js` | `docs/auditoria/axe.md` |
| Uso só pelo teclado | Playwright 1.63.0 (Chromium) | `scripts/auditoria-teclado.js` | `docs/auditoria/teclado.md` |
| Telas estreitas, texto ampliado e tamanho dos alvos | Playwright | `scripts/auditoria-layout.js` | `docs/auditoria/layout.md` |
| Lighthouse nas 4 páginas, temas claro e escuro, celular e computador | Lighthouse 13.6.0 | `scripts/auditoria-lighthouse.js` | `docs/auditoria/lighthouse.md` |
| Validade do HTML | html-validate 11.21.1 | (linha de comando) | abaixo |

## Resumo: antes e depois

| Conferência | Antes | Depois |
|-------------|-------|--------|
| Lighthouse — Acessibilidade (16 medições) | 100 em todas | 100 em todas |
| Lighthouse — Boas práticas e SEO (16 medições) | 100 em todas | 100 em todas |
| Lighthouse — Desempenho, Projetos no celular | 83 | 96 |
| Lighthouse — Desempenho, Início no celular | 97 | 99 |
| Lighthouse — Desempenho, Projetos no computador | 98 | 100 |
| Contraste (136 pares, 34 por tema) | 0 reprovados no AA | 0 reprovados no AA |
| axe-core (88 verificações) | 0 violações | 0 violações |
| Teclado: foco encoberto pelo botão fixo | 5 elementos (Início, celular) | 0 |
| "Reduzir animações" desliga a rolagem suave da página | não | sim |
| Página Projetos: a lista "pula" ao carregar (deslocamento de layout, CLS) | 0,189 | 0 |
| Sem rolagem lateral (4 páginas × 2 larguras × 3 tamanhos de texto) | — (conferência criada nesta etapa) | 24 de 24 |
| HTML válido (regras do padrão HTML) | 0 erros | 0 erros |

**Meta do projeto: Lighthouse Acessibilidade ≥ 95 em todas as páginas, nos dois temas.**
Atingida, com 100 nas 16 medições, antes e depois. A auditoria serviu para achar o que o
Lighthouse não vê.

## Lighthouse: notas por página

Ordem das notas: Acessibilidade / Boas práticas / SEO / Desempenho. As notas dos temas claro
e escuro foram iguais em todas as páginas.

| Página | Aparelho simulado | Antes | Depois |
|--------|-------------------|-------|--------|
| Início | Celular | 100 / 100 / 100 / 97 | 100 / 100 / 100 / 99 |
| Início | Computador | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Projetos | Celular | 100 / 100 / 100 / 83 | 100 / 100 / 100 / 96 |
| Projetos | Computador | 100 / 100 / 100 / 98 | 100 / 100 / 100 / 100 |
| Contato | Celular | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Contato | Computador | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Entrar | Celular | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Entrar | Computador | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |

A nota de Desempenho varia alguns pontos de uma medição para outra (a mesma página deu 94
e 96 em duas medições seguidas). As outras três categorias não variam.

## Problemas encontrados e correções

### 1. Foco encoberto pelo botão fixo "Acessibilidade"

- **O que era:** no celular, na página Início, as setas e as bolinhas do carrossel ficavam
  de 22% a 53% escondidas atrás do botão fixo quando recebiam foco pelo teclado.
- **Como foi achado:** `scripts/auditoria-teclado.js` mede, a cada Tab, quanto do elemento
  focado está atrás do botão fixo. Nem o Lighthouse nem o axe-core conferem isso.
- **Correção:** `scroll-padding-bottom` no `<html>` (`css/estilo.css`, seção 18). A faixa do
  pé da tela onde fica o botão deixa de contar como "visível"; se o elemento focado estiver
  nela, a página rola mais um pouco.
- **Critério:** WCAG 2.2, 2.4.11 (Foco não encoberto). É um critério da versão 2.2, além
  da meta do projeto (2.1), corrigido por afetar o uso real.
- **Antes → depois:** 5 elementos encobertos → 0.

### 2. "Reduzir animações" não desligava a rolagem suave

- **O que era:** o Bootstrap liga a rolagem suave da página (`scroll-behavior: smooth` no
  `<html>`). A regra de "Reduzir animações" valia para tudo que está dentro do `<html>`,
  mas não para o próprio `<html>`. Com a opção ligada no painel, a página continuava
  deslizando ao levar o foco a um elemento fora da tela. (Pela configuração do sistema
  operacional já funcionava.)
- **Como foi achado:** na primeira rodada, a auditoria de teclado media a posição dos
  elementos com a página ainda em movimento, mesmo com as animações reduzidas.
- **Correção:** o seletor passou a incluir o próprio `<html>` (`css/estilo.css`, seção 19).
- **Critério:** WCAG 2.3.3 (Animação de interações, nível AAA) e o requisito do projeto de
  que a opção pause as transições.
- **Antes → depois:** `scroll-behavior` do `<html>` com a opção ligada: `smooth` → `auto`.

### 3. Na página Projetos, a lista "pulava" ao carregar

- **O que era:** os filtros (pesquisa e abas) começavam escondidos e eram mostrados pelo
  JavaScript depois de a página aparecer. Ao surgirem, empurravam a lista de projetos para
  baixo. Quem já estivesse lendo ou prestes a tocar em um cartão via o conteúdo mudar de lugar.
- **Como foi achado:** Lighthouse, métrica CLS (*Cumulative Layout Shift*, o quanto o
  conteúdo se desloca sozinho): 0,189, acima do limite de 0,1 considerado bom.
- **Correção:** `js/preferencias.js`, que roda antes de a página ser desenhada, põe a classe
  `com-js` no `<html>`. O CSS mostra os filtros quando essa classe existe. Com JavaScript,
  os filtros já estão no lugar no primeiro instante; sem JavaScript, continuam escondidos.
- **Antes → depois:** CLS 0,189 → 0.

### 4. Imagens maiores que o necessário no celular

- **O que era:** cada print tinha duas versões, de 640 e 1280 pixels de largura. O celular
  simulado pelo Lighthouse precisa de cerca de 660 pixels, então baixava a de 1280. Além
  disso, a primeira imagem da página Projetos não estava marcada como prioritária.
- **Como foi achado:** Lighthouse ("Improve image delivery", "LCP request discovery").
- **Correção:** versão intermediária de 960 pixels para cada print (cerca de 40% menor que a
  de 1280), `fetchpriority="high"` na primeira imagem de Projetos e `preconnect` com o
  servidor do Bootstrap nas quatro páginas.
- **Antes → depois:** tempo até o maior elemento da tela aparecer (LCP) em Projetos no
  celular: 3,6 s → 2,9 s. Desempenho de Projetos no celular: 83 → 92 com as correções 3 e 4
  ainda sem as imagens novas, e 92 → 96 com as imagens de 960 pixels. Início no celular: 97 → 99.

### 5. Campo de pesquisa dentro de um formulário sem botão de envio

- **O que era:** a pesquisa de Projetos estava em um `<form>` sem botão de envio. O
  validador (modo recomendado) aponta isso pela técnica H32 da WCAG.
- **Correção:** a pesquisa filtra a cada tecla e não envia nada, então o `<form>` virou uma
  `<div role="search">`. O script deixou de precisar bloquear o envio com Enter.
- **Antes → depois:** avisos do validador no modo recomendado: 22 → 21 (os 21 restantes são
  intencionais; ver abaixo).

## O que ficou como está, e por quê

| Apontamento | Por que não foi alterado |
|-------------|--------------------------|
| Lighthouse: "Minify CSS" e "Minify JavaScript" | O código vai anexado ao relatório e precisa ser legível e comentado; o projeto não tem etapa de build. |
| Lighthouse: "Reduce unused CSS" | O Bootstrap completo vem do CDN, como pede o projeto. O site usa só parte dele. |
| Lighthouse: "Render-blocking requests" | O CSS precisa chegar antes de a página aparecer, e `js/preferencias.js` bloqueia de propósito: é o que impede o tema errado de piscar. |
| Lighthouse: "Use efficient cache lifetimes" e "Document request latency" | Dependem do servidor que entrega os arquivos, não do site. O teste usou um servidor local simples. |
| Lighthouse: "Improve image delivery" (parte que resta) | Sugere formatos mais novos (WebP, AVIF). Os prints ficaram em JPEG, que abre em qualquer programa. |
| Validador, modo recomendado: 21 avisos de `role="list"` redundante | Intencional. Quando o CSS tira os marcadores de uma lista, o Safari com o VoiceOver deixa de anunciá-la como lista; o `role="list"` garante o anúncio. |

## Uso pelo teclado: o que foi conferido

Automático, em `scripts/auditoria-teclado.js` (4 páginas × 2 larguras, sem problemas depois
das correções):

- todo elemento clicável visível recebe foco pelo Tab, na ordem do HTML;
- todo elemento focado mostra contorno de pelo menos 2px;
- nenhum elemento focado fica fora da tela ou atrás do botão fixo;
- o foco sai da página depois do último elemento (sem armadilha de teclado);
- "Pular para o conteúdo" leva o foco ao `<main>`;
- o painel de acessibilidade abre com Enter, fecha com Esc e devolve o foco;
- no celular, o menu abre com Enter e os links passam a receber foco.

Nos testes de cada etapa (descritos no README):

| Componente | Teclas | Conferido |
|------------|--------|-----------|
| Painel de acessibilidade | Tab, Enter, setas nos grupos de opções, Espaço nos interruptores, Esc | Etapa 1 |
| Carrossel | Tab até os botões, Enter ou Espaço, ← → | Etapas 2 e 2.1 |
| Abas de Projetos | ← →, Home, End | Etapas 2, 2.1 e 3.1 |
| Pesquisa de Projetos | digitação; setas movem o cursor no campo | Etapas 2 e 3.1 |
| Formulários | Tab entre os campos, Enter envia, links do resumo de erros | Etapa 3 |
| Mostrar e ocultar senha | Tab até o botão, Enter ou Espaço | Etapa 3 |

## Critérios da WCAG 2.1 (níveis A e AA) mais ligados ao projeto

| Critério | Como o site atende | Como foi conferido |
|----------|--------------------|--------------------|
| 1.1.1 Conteúdo não textual | `alt` descritivo em todas as imagens; ícones decorativos com `aria-hidden` | axe-core |
| 1.3.1 Informações e relações | `header`, `nav`, `main`, `footer`; títulos em ordem; `label` em todos os campos; `fieldset` e `legend`; listas | axe-core, validador de HTML |
| 1.3.5 Identificar o propósito da entrada | `autocomplete` nos campos de nome, e-mail e senha | axe-core |
| 1.4.1 Uso da cor | Erro com ícone e texto; página atual sublinhada; opção escolhida preenchida; interruptor pela posição | revisão do código |
| 1.4.3 Contraste (mínimo) | Menor razão em texto: 5,59:1 (mínimo 4,5:1) | `scripts/contraste.js`, axe-core |
| 1.4.4 Redimensionar texto | Medidas em `rem`; opção de texto em 115% e 130%; o layout se adapta ao zoom do navegador | `scripts/auditoria-layout.js` |
| 1.4.10 Refluxo | Sem rolagem lateral em 320px de largura | `scripts/auditoria-layout.js` |
| 1.4.11 Contraste não textual | Bordas de campos e controles: menor razão 3,54:1 (mínimo 3:1); contorno de foco: 6,2:1 ou mais | `scripts/contraste.js` |
| 2.1.1 Teclado e 2.1.2 Sem armadilha | Tudo funciona pelo teclado; o foco sempre consegue sair | `scripts/auditoria-teclado.js`, testes das etapas |
| 2.2.2 Pausar, parar, ocultar | Botão Pausar/Reproduzir no carrossel | teste da Etapa 2.1 |
| 2.4.1 Ignorar blocos | Link "Pular para o conteúdo" | `scripts/auditoria-teclado.js` |
| 2.4.2 Página com título | `<title>` em todas as páginas, cada uma com o seu | axe-core; revisão do código |
| 2.4.3 Ordem do foco | Ordem do foco igual à ordem do HTML | `scripts/auditoria-teclado.js` |
| 2.4.4 Finalidade do link | Texto do link descreve o destino; complemento só para leitor de tela em "Visitar o site" | axe-core |
| 2.4.7 Foco visível | Contorno de 3px em todo elemento focado | `scripts/auditoria-teclado.js` |
| 3.1.1 Idioma da página | `lang="pt-BR"` | axe-core |
| 3.2.2 Em entrada | Pesquisa e abas não mudam de página; o texto de ajuda avisa que a lista muda ao digitar | revisão do código |
| 3.3.1 Identificação do erro | Mensagem escrita em cada campo com erro, mais o resumo | teste da Etapa 3 |
| 3.3.2 Rótulos ou instruções | `label` visível em todos os campos; textos de ajuda | axe-core |
| 3.3.3 Sugestão de erro | As mensagens dizem como corrigir | teste da Etapa 3 |
| 4.1.2 Nome, função, valor | `aria-expanded`, `aria-selected`, `aria-current`, `aria-invalid`, `role="switch"` | axe-core, testes das etapas |
| 4.1.3 Mensagens de status | `role="status"`, `role="alert"` e `aria-live` nas confirmações e nos erros | testes das etapas |

## Limites desta auditoria

- **Não houve teste com leitor de tela de verdade** (VoiceOver, NVDA). Os atributos que o
  leitor de tela usa foram conferidos, mas não o que ele de fato fala. Vale uma passada com
  o VoiceOver no Mac (Command + F5) antes da entrega.
- **Só o Chromium foi testado.** Safari e Firefox não estavam disponíveis no ambiente de
  teste. A correção das setas nas abas (Etapa 3.1) foi feita simulando o comportamento
  desses navegadores.
- **Ferramentas automáticas acham só parte dos problemas.** Clareza dos textos, sentido das
  descrições das imagens e facilidade de uso dependem de avaliação humana.
- **Nota de Desempenho:** na Etapa 4 foi medida em um servidor local. Depois da publicação,
  o Lighthouse foi rodado também no endereço real do site; o resultado está em
  `auditoria/lighthouse-publicado.md`.

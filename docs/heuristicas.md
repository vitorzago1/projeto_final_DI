# As 10 heurísticas de Nielsen no site

As heurísticas de usabilidade de Jakob Nielsen são dez princípios gerais para avaliar se
uma interface é fácil de usar. Fonte: Nielsen, J. *10 Usability Heuristics for User
Interface Design*. Nielsen Norman Group, 1994 (atualizado em 2020).
<https://www.nngroup.com/articles/ten-usability-heuristics/>

Para cada heurística este arquivo traz: o que ela pede, onde ela aparece no site (página,
elemento e arquivo) e um print que mostra o exemplo. Os textos entre aspas são os que
aparecem na tela. Os prints estão em `docs/prints/` (lista completa em
[`prints/README.md`](prints/README.md)).

Onde o site ainda deixa a desejar, há uma linha "Limite conhecido".

---

## 1. Visibilidade do status do sistema

**O que pede:** o sistema mostra o que está acontecendo, com resposta rápida a cada ação.

| Página | Elemento | O que a pessoa vê | Onde está no código |
|--------|----------|-------------------|---------------------|
| Todas | Menu do cabeçalho | A página em que a pessoa está fica em negrito e sublinhada | `aria-current="page"` no link do menu; `css/estilo.css`, seção 10 |
| Projetos | Frase acima da lista | "Mostrando 3 de 7 projetos." muda a cada tecla digitada na pesquisa e a cada troca de aba | `#filtro-situacao` (`role="status"`); `js/projetos.js`, função `mostrarSituacao` |
| Início | Botão do carrossel | Mostra "Pausar" enquanto as imagens passam e "Reproduzir" quando estão paradas; a bolinha da imagem atual fica mais larga e preenchida | `.carrossel-pausa` e `.carrossel-ponto[aria-current]`; `js/carrossel.js` |
| Contato | Botão de envio | Vira "Enviando…" e trava durante o envio; depois o formulário dá lugar a "Mensagem enviada (demonstração)" | `js/contato.js`, função `enviar` |
| Todas | Painel de acessibilidade | Cada mudança é confirmada por escrito: "Tema: escuro.", "Links sublinhados."; a opção escolhida fica preenchida | `.acess-aviso` (`role="status"`); `js/acessibilidade.js`, função `mudar` |

Prints: [`projetos-pesquisa-python-1366px.png`](prints/estados/projetos-pesquisa-python-1366px.png),
[`inicio-painel-aviso-de-mudanca-1366px.png`](prints/estados/inicio-painel-aviso-de-mudanca-1366px.png).

## 2. Correspondência entre o sistema e o mundo real

**O que pede:** falar a língua de quem usa, com palavras e convenções conhecidas, em vez de
termos internos do sistema.

| Página | Elemento | O que a pessoa vê | Onde está no código |
|--------|----------|-------------------|---------------------|
| Todas | Textos de botões e links | Palavras do dia a dia: "Entrar" (e não "Login"), "Fale comigo", "Pular para o conteúdo", "Lembrar de mim" | os quatro arquivos `.html` |
| Contato e Entrar | Mensagens de erro | Frases simples, sem código de erro: "Informe seu e-mail.", "Escolha um assunto." | `js/contato.js` e `js/login.js`, objeto `regras` |
| Todas | Painel de acessibilidade | Interruptores de liga e desliga, como os de luz; tamanhos em porcentagem (100%, 115%, 130%) | `.interruptor`; `css/estilo.css`, seção 18 |
| Início | Carrossel | Ícones conhecidos de aparelhos de som e vídeo: duas barras para pausar, triângulo para reproduzir, setas para voltar e avançar | SVG em `index.html` |
| Início | "Como eu trabalho" | Passos numerados de 1 a 4, na ordem em que acontecem | `<ol class="passos">` em `index.html` |
| Contato e Entrar | Cores e ícones dos avisos | Verde com "✓" para o que deu certo, vermelho com "!" para erro, "i" para informação | `.aviso-sucesso`, `.aviso-erro`, `.aviso-info`; `docs/cores.md` |

Print: [`contato-confirmacao-1366px.png`](prints/estados/contato-confirmacao-1366px.png).

## 3. Controle e liberdade do usuário

**O que pede:** sempre haver uma "saída de emergência" clara para desfazer ou sair de uma
situação, sem precisar de um caminho longo.

| Página | Elemento | O que a pessoa pode fazer | Onde está no código |
|--------|----------|---------------------------|---------------------|
| Início | Carrossel | Pausar e reproduzir quando quiser; escolher a imagem pelas setas ou pelas bolinhas | `js/carrossel.js` |
| Todas | Painel de acessibilidade | Fechar pelo "×", pela tecla Esc ou clicando fora; "Restaurar padrão" desfaz todas as escolhas de uma vez | `js/acessibilidade.js`, seções 2 e 4 |
| Projetos | Aviso de nenhum resultado | "Limpar a pesquisa e ver todos" volta à lista completa em um clique | `#limpar-filtros`; `js/projetos.js` |
| Contato | Confirmação | "Escrever outra mensagem" devolve o formulário limpo | `#nova-mensagem`; `js/contato.js` |
| Entrar | Confirmação | "Sair" volta ao formulário | `#sair`; `js/login.js` |
| Todas | Tema | A pessoa pode escolher claro ou escuro mesmo que o sistema operacional esteja no outro | rádios `acess-tema`; `js/preferencias.js` |

Prints: [`projetos-nenhum-resultado-1366px.png`](prints/estados/projetos-nenhum-resultado-1366px.png),
[`inicio-painel-de-acessibilidade-claro-1366px.png`](prints/estados/inicio-painel-de-acessibilidade-claro-1366px.png).

## 4. Consistência e padrões

**O que pede:** a mesma coisa tem sempre a mesma aparência e o mesmo comportamento, e o
site segue as convenções que as pessoas já conhecem de outros sites.

| Página | Elemento | Como é consistente | Onde está no código |
|--------|----------|--------------------|---------------------|
| Todas | Cabeçalho, menu, rodapé e painel | Idênticos nas quatro páginas, no mesmo lugar | bloco "CABEÇALHO" e "RODAPÉ" de cada `.html`; `js/acessibilidade.js` |
| Todas | Botões | Três estilos com papel fixo: âmbar para a ação principal da tela ("Ver projetos", "Enviar mensagem", "Entrar"), azul-petróleo para a ação que resolve um aviso ("Limpar a pesquisa e ver todos"), contorno para ações secundárias ("Fale comigo", "Pausar", "Sair") | `.btn-destaque`, `.btn-marca`, `.btn-contorno`; `css/estilo.css`, seção 9 |
| Início e Projetos | Cartões de projeto | O mesmo cartão nas duas páginas: imagem, categoria, título, descrição, tecnologias, link | `.projeto`; `css/estilo.css`, seção 16 |
| Contato e Entrar | Validação e avisos | As duas páginas usam o mesmo script de validação e as mesmas caixas de aviso | `js/formulario.js`; `.aviso`, seção 12 do CSS |
| Projetos | Abas | Seguem o padrão de abas da WAI-ARIA: Tab entra nas abas, setas ← → trocam, Home e End vão à primeira e à última | `role="tablist"` em `projetos.html`; `js/projetos.js`, seção 3 |
| Todas | Convenções da web | O nome no cabeçalho leva ao Início; links de texto são sublinhados; Esc fecha o painel | `.navbar-brand`; `css/estilo.css`, seção 6 |

Prints: [`contato-claro-1366px.png`](prints/contato-claro-1366px.png) e
[`entrar-claro-1366px.png`](prints/entrar-claro-1366px.png) (mesma moldura e mesmos componentes).

## 5. Prevenção de erros

**O que pede:** melhor que uma boa mensagem de erro é um desenho que evita o erro.

| Página | Elemento | Como evita o erro | Onde está no código |
|--------|----------|-------------------|---------------------|
| Contato | Campo "Assunto" | É uma lista de opções: não há como escrever um assunto inválido | `<select id="assunto">` em `contato.html` |
| Contato | Ajuda antes do erro | "Todos os campos são obrigatórios.", "Exemplo: nome@exemplo.com", "De 10 a 1000 caracteres." aparecem antes de a pessoa errar | parágrafos `.form-text` em `contato.html` |
| Contato | Campo "Mensagem" | Não aceita mais de 1000 caracteres | `maxlength="1000"` |
| Contato | Botão de envio | Trava enquanto envia, para a mensagem não ir duas vezes | `botaoEnviar.disabled = true` em `js/contato.js` |
| Entrar | Botão "Mostrar" | A pessoa confere a senha antes de enviar | `#mostrar-senha`; `js/login.js`, seção 2 |
| Projetos | Pesquisa | Ignora maiúsculas e acentos: "educacao" encontra "#educação" | função `simplificar` em `js/projetos.js` |
| Contato e Entrar | Momento da validação | Os erros só aparecem ao enviar. Na primeira versão apareciam ao sair de cada campo, empurravam o botão "Enviar" e o clique se perdia | comentário no início de `js/formulario.js`; README, Etapa 3 |

Print: [`entrar-senha-visivel-1366px.png`](prints/estados/entrar-senha-visivel-1366px.png).

## 6. Reconhecimento em vez de memorização

**O que pede:** deixar opções e informações à vista, para a pessoa não precisar lembrar de
uma tela na outra.

| Página | Elemento | O que fica à vista | Onde está no código |
|--------|----------|--------------------|---------------------|
| Contato e Entrar | Nome dos campos | O nome fica sempre acima do campo; não some quando a pessoa começa a digitar | `<label class="form-label">` |
| Entrar | Quadro de demonstração | O e-mail e a senha de teste ficam escritos na própria página | `.login-dados` em `login.html` |
| Entrar | "Lembrar de mim" | Na visita seguinte o e-mail já vem preenchido | `js/login.js`, seção 3 |
| Projetos | Abas e etiquetas | As categorias estão nas abas; tecnologias e tags aparecem em cada cartão e mostram o que dá para pesquisar | `.abas`, `.projeto-tecnologias`, `.projeto-tags` |
| Projetos | Aviso de nenhum resultado | Repete a palavra procurada: "Nenhum projeto combina com “php”" | `#sem-resultado-texto`; `js/projetos.js` |
| Contato | Confirmação | Repete o assunto e o e-mail que a pessoa informou | `#confirmacao-texto`; `js/contato.js` |
| Todas | Painel de acessibilidade | Abre mostrando as escolhas atuais, que ficam guardadas entre uma visita e outra | função `atualizarPainel`; `js/preferencias.js` |

Prints: [`entrar-claro-1366px.png`](prints/entrar-claro-1366px.png),
[`projetos-claro-1366px.png`](prints/projetos-claro-1366px.png).

## 7. Flexibilidade e eficiência de uso

**O que pede:** atender tanto quem está começando quanto quem tem prática, com atalhos e
formas de ajustar a interface ao próprio jeito de usar.

| Página | Elemento | O que oferece | Onde está no código |
|--------|----------|---------------|---------------------|
| Todas | Painel de acessibilidade | Tema, tamanho do texto, alto contraste, menos animações e links sublinhados | `js/acessibilidade.js` |
| Todas | Preferências do sistema | O site já abre no tema do sistema operacional e respeita os pedidos de menos movimento e de mais contraste | `sistemaPede` em `js/preferencias.js` |
| Todas | Teclado | "Pular para o conteúdo" leva direto ao conteúdo, sem passar pelo menu | `.link-pular`; `css/estilo.css`, seção 8 |
| Projetos e Início | Setas do teclado | ← → trocam de aba e de imagem do carrossel | `js/projetos.js`, `js/carrossel.js` |
| Projetos | Pesquisa e abas juntas | Dá para combinar aba e pesquisa, e pesquisar mais de uma palavra ("python calc") | função `filtrar` em `js/projetos.js` |
| Contato e Entrar | Preenchimento automático | O navegador sugere nome e e-mail; o gerenciador de senhas reconhece o login | atributos `autocomplete` |
| Todas | Tamanho da tela | O mesmo site se ajusta do celular (320px) ao computador | grade do Bootstrap; `docs/auditoria/layout.md` |

Prints: [`inicio-texto-130-390px.png`](prints/estados/inicio-texto-130-390px.png),
[`projetos-aba-sites-pelo-teclado-1366px.png`](prints/estados/projetos-aba-sites-pelo-teclado-1366px.png),
[`inicio-link-pular-em-foco-1366px.png`](prints/estados/inicio-link-pular-em-foco-1366px.png).

Limite conhecido: o site não tem atalhos de teclado próprios (como uma tecla para ir direto
à pesquisa). Em um site de quatro páginas, a navegação por Tab e o link de pular bastam.

## 8. Estética e design minimalista

**O que pede:** mostrar só o que é necessário; cada elemento a mais disputa a atenção com
o que importa.

| Página | Elemento | Como aplica | Onde está no código |
|--------|----------|-------------|---------------------|
| Todas | Cores | Base neutra, uma cor de marca e uma cor de destaque (regra 60-30-10); o âmbar aparece em uma ação por tela | `docs/cores.md`; `css/estilo.css`, seções 2 a 4 |
| Início | Apresentação | Nome, uma frase e dois botões | `.apresentacao` em `index.html` |
| Início | Carrossel | Os controles ficam abaixo das imagens, não por cima delas | `.carrossel-navegacao`; `css/estilo.css`, seção 14 |
| Entrar | Formulário | Coluna estreita, só com o que é preciso para entrar | `.login` (largura máxima de 28rem) |
| Todas | Informação sob demanda | O painel de acessibilidade fica fechado até ser pedido; no celular o menu fica recolhido; erros só aparecem quando existem | `hidden` no painel; `navbar-collapse` |
| Todas | Tipografia | Uma única fonte, com uma escala fixa de tamanhos | `css/estilo.css`, seções 1 e 2 |

Prints: [`inicio-claro-1366px.png`](prints/inicio-claro-1366px.png),
[`entrar-claro-390px.png`](prints/entrar-claro-390px.png).

Limite conhecido: enquanto os textos marcados com `[PREENCHER]` não forem escritos, os
marcadores em âmbar chamam mais atenção do que o conteúdo.

## 9. Ajudar a reconhecer, diagnosticar e corrigir erros

**O que pede:** mensagens de erro em linguagem simples, que digam qual é o problema e
como resolver.

| Página | Elemento | O que a pessoa vê | Onde está no código |
|--------|----------|-------------------|---------------------|
| Contato | Resumo dos erros | "Falta corrigir 5 campos:" e a lista deles; cada item é um link que leva ao campo | `#contato-resumo` (`role="alert"`); `mostrarResumo` em `js/formulario.js` |
| Contato | Erro de cada campo | Fica logo abaixo do campo, com ícone, borda vermelha e texto: "Digite um e-mail completo, como nome@exemplo.com." | `.campo-erro` ligado por `aria-describedby`; `aria-invalid` |
| Contato | Campo "Mensagem" | Diz o mínimo e quanto falta: "A mensagem precisa de pelo menos 10 caracteres. Faltam 7." | regra `mensagem` em `js/contato.js` |
| Contato e Entrar | Depois do erro | O foco vai para o primeiro campo com erro; o erro some assim que o valor fica certo | `js/formulario.js` |
| Entrar | Dados incorretos | "E-mail ou senha incorretos. Use os dados de demonstração do quadro acima." O foco volta para a senha | função `entrar` em `js/login.js` |
| Projetos | Nenhum resultado | Diz o que foi procurado e o que tentar: "Confira a grafia ou tente outra palavra, como o nome de uma tecnologia." | `#sem-resultado`; `js/projetos.js` |
| Início | Carrossel parado | Explica o motivo: "Parado porque “Reduzir animações” está ligado. Use “Reproduzir” para passar as imagens." | `.carrossel-nota`; `js/carrossel.js` |

Prints: [`contato-erros-de-validacao-1366px.png`](prints/estados/contato-erros-de-validacao-1366px.png),
[`contato-mensagem-curta-1366px.png`](prints/estados/contato-mensagem-curta-1366px.png),
[`entrar-dados-incorretos-1366px.png`](prints/estados/entrar-dados-incorretos-1366px.png).

Limite conhecido: depois de corrigir um campo, o resumo no topo continua listando esse
campo até a pessoa enviar de novo ou corrigir todos os erros.

## 10. Ajuda e documentação

**O que pede:** o ideal é a interface não precisar de explicação; quando precisar, a ajuda
deve estar perto de onde a dúvida aparece.

| Página | Elemento | Qual é a ajuda | Onde está no código |
|--------|----------|----------------|---------------------|
| Projetos | Campo de pesquisa | "Procure por nome, tecnologia ou tag. A lista muda enquanto você digita." | `#pesquisa-ajuda` em `projetos.html` |
| Contato | Aviso no topo | "Demonstração. Este site não tem servidor. O formulário confere os dados no seu navegador, mas a mensagem não é enviada nem guardada." | `.aviso-info` em `contato.html` |
| Entrar | Aviso no topo | Explica que não há contas de verdade e mostra os dados para testar | `.aviso-info` em `login.html` |
| Entrar | "Lembrar de mim" | "Guarda só o seu e-mail neste navegador. A senha nunca é guardada." | `#lembrar-ajuda` |
| Todas | Painel de acessibilidade | "Suas escolhas ficam guardadas só neste navegador."; quando o sistema já pede menos movimento: "Já ligado nas configurações do seu sistema." | `.acess-nota` em `js/acessibilidade.js` |
| — | Documentação do projeto | Como rodar, estrutura e construção passo a passo | `README.md` e pasta `docs/` |

Prints: [`entrar-claro-1366px.png`](prints/entrar-claro-1366px.png),
[`inicio-carrossel-parado-por-reduzir-animacoes-1366px.png`](prints/estados/inicio-carrossel-parado-por-reduzir-animacoes-1366px.png).

Limite conhecido: não há uma página de ajuda separada. Toda a ajuda está no lugar em que a
dúvida pode aparecer, o que é suficiente para um site deste tamanho.

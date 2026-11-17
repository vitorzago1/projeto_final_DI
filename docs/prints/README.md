# Capturas de tela

> Arquivo gerado por `scripts/prints.js`. Não edite à mão.
> Para refazer as imagens depois de mudar o site: `npm run prints`.

As imagens foram feitas com o Playwright (navegador Chromium). A largura de cada imagem é a
largura da tela simulada: 1366 pixels (computador) ou 390 pixels (celular).

O botão “Acessibilidade” é fixo na janela. Nas imagens de página inteira ele aparece no
canto de baixo, onde fica quando a pessoa rola a página até o fim.

## Páginas inteiras

Cada página, do topo ao rodapé, nos temas claro e escuro.

| Página | Tema | Largura | Arquivo |
|--------|------|---------|---------|
| Início | Claro | 1366px | [`inicio-claro-1366px.png`](inicio-claro-1366px.png) |
| Início | Claro | 390px | [`inicio-claro-390px.png`](inicio-claro-390px.png) |
| Início | Escuro | 1366px | [`inicio-escuro-1366px.png`](inicio-escuro-1366px.png) |
| Início | Escuro | 390px | [`inicio-escuro-390px.png`](inicio-escuro-390px.png) |
| Projetos | Claro | 1366px | [`projetos-claro-1366px.png`](projetos-claro-1366px.png) |
| Projetos | Claro | 390px | [`projetos-claro-390px.png`](projetos-claro-390px.png) |
| Projetos | Escuro | 1366px | [`projetos-escuro-1366px.png`](projetos-escuro-1366px.png) |
| Projetos | Escuro | 390px | [`projetos-escuro-390px.png`](projetos-escuro-390px.png) |
| Contato | Claro | 1366px | [`contato-claro-1366px.png`](contato-claro-1366px.png) |
| Contato | Claro | 390px | [`contato-claro-390px.png`](contato-claro-390px.png) |
| Contato | Escuro | 1366px | [`contato-escuro-1366px.png`](contato-escuro-1366px.png) |
| Contato | Escuro | 390px | [`contato-escuro-390px.png`](contato-escuro-390px.png) |
| Entrar | Claro | 1366px | [`entrar-claro-1366px.png`](entrar-claro-1366px.png) |
| Entrar | Claro | 390px | [`entrar-claro-390px.png`](entrar-claro-390px.png) |
| Entrar | Escuro | 1366px | [`entrar-escuro-1366px.png`](entrar-escuro-1366px.png) |
| Entrar | Escuro | 390px | [`entrar-escuro-390px.png`](entrar-escuro-390px.png) |

## Estados

Telas que só aparecem depois de uma ação. Ficam na pasta `estados/`.

| O que mostra | Arquivo |
|--------------|---------|
| Início depois do primeiro Tab: o link “Pular para o conteúdo” aparece, com o contorno de foco. | [`inicio-link-pular-em-foco-1366px.png`](estados/inicio-link-pular-em-foco-1366px.png) |
| Painel de acessibilidade aberto, tema claro. | [`inicio-painel-de-acessibilidade-claro-1366px.png`](estados/inicio-painel-de-acessibilidade-claro-1366px.png) |
| Painel de acessibilidade aberto no celular, tema escuro. | [`inicio-painel-de-acessibilidade-escuro-390px.png`](estados/inicio-painel-de-acessibilidade-escuro-390px.png) |
| Painel logo depois de ligar “Sublinhar links”: a frase “Links sublinhados.” confirma a mudança. | [`inicio-painel-aviso-de-mudanca-1366px.png`](estados/inicio-painel-aviso-de-mudanca-1366px.png) |
| Início com “Alto contraste” ligado, tema claro. | [`inicio-alto-contraste-claro-1366px.png`](estados/inicio-alto-contraste-claro-1366px.png) |
| Início com “Alto contraste” ligado, tema escuro. | [`inicio-alto-contraste-escuro-1366px.png`](estados/inicio-alto-contraste-escuro-1366px.png) |
| Início no celular com o tamanho do texto em 130%: o conteúdo se reorganiza, sem rolagem lateral. | [`inicio-texto-130-390px.png`](estados/inicio-texto-130-390px.png) |
| Carrossel com “Reduzir animações” ligado: começa parado, o botão mostra “Reproduzir” e uma nota explica o motivo. | [`inicio-carrossel-parado-por-reduzir-animacoes-1366px.png`](estados/inicio-carrossel-parado-por-reduzir-animacoes-1366px.png) |
| Menu do celular aberto, com a página atual marcada. | [`inicio-menu-do-celular-aberto-390px.png`](estados/inicio-menu-do-celular-aberto-390px.png) |
| Projetos com “python” no campo de pesquisa: a lista mostra 3 de 7 projetos. | [`projetos-pesquisa-python-1366px.png`](estados/projetos-pesquisa-python-1366px.png) |
| Aba “Sites” escolhida com a seta → do teclado: a aba fica marcada e com o contorno de foco. | [`projetos-aba-sites-pelo-teclado-1366px.png`](estados/projetos-aba-sites-pelo-teclado-1366px.png) |
| Pesquisa sem resultado: o aviso diz o que foi procurado, sugere o que fazer e oferece o botão de limpar. | [`projetos-nenhum-resultado-1366px.png`](estados/projetos-nenhum-resultado-1366px.png) |
| O mesmo aviso de nenhum resultado, no celular e no tema escuro. | [`projetos-nenhum-resultado-escuro-390px.png`](estados/projetos-nenhum-resultado-escuro-390px.png) |
| Contato depois de tentar enviar em branco: resumo dos erros no topo e a mensagem de cada campo logo abaixo dele. | [`contato-erros-de-validacao-1366px.png`](estados/contato-erros-de-validacao-1366px.png) |
| Os mesmos erros de validação, no celular e no tema escuro. | [`contato-erros-de-validacao-escuro-390px.png`](estados/contato-erros-de-validacao-escuro-390px.png) |
| Contato com uma mensagem de 3 letras: o erro diz o mínimo exigido e quantos caracteres faltam. | [`contato-mensagem-curta-1366px.png`](estados/contato-mensagem-curta-1366px.png) |
| Confirmação do envio simulado: repete o assunto e o e-mail informados e avisa que nada foi enviado. | [`contato-confirmacao-1366px.png`](estados/contato-confirmacao-1366px.png) |
| Entrar depois de tentar enviar em branco: resumo dos erros e mensagem em cada campo. | [`entrar-erros-de-validacao-1366px.png`](estados/entrar-erros-de-validacao-1366px.png) |
| Senha visível depois de usar o botão “Mostrar”, que passa a dizer “Ocultar”. | [`entrar-senha-visivel-1366px.png`](estados/entrar-senha-visivel-1366px.png) |
| Entrar com a senha errada: “E-mail ou senha incorretos”, sem dizer qual dos dois, e o foco volta para a senha. | [`entrar-dados-incorretos-1366px.png`](estados/entrar-dados-incorretos-1366px.png) |
| A mesma mensagem de dados incorretos, no celular e no tema escuro. | [`entrar-dados-incorretos-escuro-390px.png`](estados/entrar-dados-incorretos-escuro-390px.png) |
| Entrada com os dados de demonstração: a confirmação avisa que o login é só uma demonstração e oferece “Sair”. | [`entrar-confirmacao-1366px.png`](estados/entrar-confirmacao-1366px.png) |

# Material para o relatório

Esta pasta reúne a matéria-prima do relatório do projeto. Nada aqui faz parte do site:
são documentos de apoio, resultados de testes e capturas de tela.

## Onde está cada assunto

| Assunto do relatório | Arquivo | O que tem |
|----------------------|---------|-----------|
| O que é o projeto, como rodar, estrutura de pastas | [`../README.md`](../README.md) | Visão geral, comandos e a lista de pastas e arquivos |
| Construção passo a passo | [`../README.md`](../README.md), seção "Construção passo a passo" | O que foi feito em cada etapa, com o código do commit, os testes e os problemas encontrados |
| Paleta de cores e justificativa | [`cores.md`](cores.md) | Cada cor, com nome, código, uso, contraste e o motivo da escolha; imagem em [`paleta.png`](paleta.png) |
| Contraste (WCAG) | [`contraste.md`](contraste.md) | Os 136 pares de cor de texto e fundo usados no site, com a razão de contraste de cada um |
| Heurísticas de Nielsen | [`heuristicas.md`](heuristicas.md) | As 10 heurísticas, com exemplos do site (página, elemento e arquivo) e os prints de cada uma |
| Recursos e componentes por página | [`componentes.md`](componentes.md) | O que cada página tem, como foi feito e o que garante a acessibilidade |
| Acessibilidade: auditoria | [`auditoria.md`](auditoria.md) | O que foi testado, o que falhou, as correções, o antes e o depois, critérios da WCAG e limites |
| Acessibilidade: resultados completos | pasta [`auditoria/`](auditoria/) | Relatórios gerados pelos scripts: axe-core, teclado, layout e Lighthouse (no servidor local e no site publicado) |
| Capturas de tela | pasta [`prints/`](prints/README.md) | Cada página em 1366px e 390px, nos temas claro e escuro, e as telas de erro, confirmação e painel |
| Ferramentas, bibliotecas, créditos e IA | [`ferramentas.md`](ferramentas.md) | Versões e licenças, origem de cada imagem e as ferramentas de IA usadas |

## Arquivos gerados por script

Estes arquivos são escritos pelos scripts da pasta `scripts/`. Para atualizá-los, rode o
script de novo em vez de editar à mão.

| Arquivo | Script | Comando |
|---------|--------|---------|
| `contraste.md` | `scripts/contraste.js` | `npm run contraste` |
| `auditoria/axe.md` | `scripts/auditoria-axe.js` | `npm run auditoria:axe` |
| `auditoria/teclado.md` | `scripts/auditoria-teclado.js` | `npm run auditoria:teclado` |
| `auditoria/layout.md` | `scripts/auditoria-layout.js` | `npm run auditoria:layout` |
| `auditoria/lighthouse.md` | `scripts/auditoria-lighthouse.js` | `npm run auditoria:lighthouse` |
| `auditoria/lighthouse-publicado.md` | `scripts/auditoria-lighthouse.js`, com o endereço do site | `npm run auditoria:publicado` |
| `prints/` (imagens e `README.md`) | `scripts/prints.js` | `npm run prints` |

## O que ainda depende do Vitor

- **Textos marcados com `[PREENCHER]`** no site: a apresentação, os quatro passos de "Como
  eu trabalho", o que foi feito em cada um dos dois sites, a descrição dos quatro
  repositórios e o contato direto. Depois de preencher, rode `npm run prints` para refazer
  as capturas de tela.
- **Dados a confirmar**, listados em [`ferramentas.md`](ferramentas.md): as tecnologias dos
  dois sites e a escolha dos repositórios.
- **Teste com leitor de tela** (VoiceOver no Mac: Command + F5), que não foi possível no
  ambiente de desenvolvimento. Ver "Limites" em [`auditoria.md`](auditoria.md).

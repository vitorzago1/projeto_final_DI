# Auditoria de layout: telas estreitas, texto ampliado e tamanho dos alvos

> Arquivo gerado por `scripts/auditoria-layout.js`. Não edite à mão.

## Sem rolagem lateral (WCAG 1.4.10)

Cada célula responde: a página cabe na largura da tela, sem rolagem lateral? O teste é feito com o
painel de acessibilidade aberto e, nas páginas com formulário, com os erros à mostra.
320px de largura equivale a uma janela de 1280px com zoom de 400%.

| Página | 320px, 100% | 320px, 115% | 320px, 130% | 390px, 100% | 390px, 115% | 390px, 130% |
|--------|:-:|:-:|:-:|:-:|:-:|:-:|
| Início | sim | sim | sim | sim | sim | sim |
| Projetos | sim | sim | sim | sim | sim | sim |
| Contato | sim | sim | sim | sim | sim | sim |
| Entrar | sim | sim | sim | sim | sim | sim |

## Tamanho dos alvos de toque (WCAG 2.2, critério 2.5.8)

Botões e controles com menos de 24 × 24 pixels, em 390px de largura, com o menu e o painel abertos.

| Página | Alvos menores que 24px |
|--------|------|
| Início | nenhum |
| Projetos | nenhum |
| Contato | nenhum |
| Entrar | nenhum |

**Total de problemas: 0** (24 combinações de página, largura e tamanho de texto).

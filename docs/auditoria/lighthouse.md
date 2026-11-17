# Auditoria com o Lighthouse

> Arquivo gerado por `scripts/auditoria-lighthouse.js`. Não edite à mão.

Ferramenta: Lighthouse 13.6.0, no Chromium. Notas de 0 a 100.
Meta do projeto: Acessibilidade igual ou maior que 95 em todas as páginas, nos temas claro e escuro.

| Página | Tema | Aparelho simulado | Acessibilidade | Boas práticas | SEO | Desempenho |
|--------|------|-------------------|:-:|:-:|:-:|:-:|
| Início | Claro | Celular | 100 | 100 | 100 | 99 |
| Início | Claro | Computador | 100 | 100 | 100 | 100 |
| Início | Escuro | Celular | 100 | 100 | 100 | 99 |
| Início | Escuro | Computador | 100 | 100 | 100 | 100 |
| Projetos | Claro | Celular | 100 | 100 | 100 | 96 |
| Projetos | Claro | Computador | 100 | 100 | 100 | 100 |
| Projetos | Escuro | Celular | 100 | 100 | 100 | 96 |
| Projetos | Escuro | Computador | 100 | 100 | 100 | 100 |
| Contato | Claro | Celular | 100 | 100 | 100 | 100 |
| Contato | Claro | Computador | 100 | 100 | 100 | 100 |
| Contato | Escuro | Celular | 100 | 100 | 100 | 100 |
| Contato | Escuro | Computador | 100 | 100 | 100 | 100 |
| Entrar | Claro | Celular | 100 | 100 | 100 | 100 |
| Entrar | Claro | Computador | 100 | 100 | 100 | 100 |
| Entrar | Escuro | Celular | 100 | 100 | 100 | 100 |
| Entrar | Escuro | Computador | 100 | 100 | 100 | 100 |

**Menor nota de Acessibilidade: 100.** Meta atingida.

## Pontos que não tiraram nota máxima

Auditorias com nota abaixo de 90 em pelo menos uma medição (títulos como o Lighthouse mostra, em inglês):

- Desempenho — Document request latency (Início, Projetos, Contato, Entrar)
- Desempenho — Improve image delivery (Início, Projetos)
- Desempenho — Largest Contentful Paint (Projetos)
- Desempenho — Minify CSS (Início, Projetos, Contato, Entrar)
- Desempenho — Minify JavaScript (Início, Projetos, Contato, Entrar)
- Desempenho — Network dependency tree (Início, Projetos, Contato, Entrar)
- Desempenho — Reduce unused CSS (Início, Projetos, Contato, Entrar)
- Desempenho — Render-blocking requests (Início, Projetos, Contato, Entrar)
- Desempenho — Use efficient cache lifetimes (Início, Projetos, Contato, Entrar)

Sobre a nota de Desempenho: ela depende da máquina e da rede no momento do teste e varia
alguns pontos de uma medição para outra. Aqui as páginas foram servidas por um servidor local;
no site publicado os números podem ser diferentes. As outras três categorias não variam.

# Cores

> **Situação: PROPOSTA — aguardando aprovação do Vitor.**
> As cores ainda não foram aplicadas ao site. Depois de aprovadas, viram variáveis CSS na Etapa 1.

Para ver a paleta aplicada em exemplos de interface, abra `docs/paleta.html` no navegador
ou veja a imagem `docs/paleta-proposta.png`.

![Paleta proposta nos temas claro, escuro e alto contraste](paleta-proposta.png)

## Ideia geral

O site apresenta um desenvolvedor web que também trabalha com IA e que já fez sites para
uma escola de ballet e um escritório de advocacia. A paleta precisa passar duas coisas ao
mesmo tempo: **confiança** (quem contrata quer alguém que entregue) e **iniciativa**
(tecnologia e IA são áreas de novidade).

Por isso a combinação é uma cor fria e séria como base (azul-petróleo) e uma cor quente
usada em pequenas doses para chamar a atenção (âmbar). A proporção segue a regra
60-30-10: cerca de 60% de neutros, 30% de cor de marca e 10% de destaque.

## Paleta

"Contraste" é a razão entre a cor e o fundo da página do mesmo tema, pela fórmula da
WCAG 2.1. Vai de 1:1 (cores iguais) a 21:1 (preto no branco). O mínimo do nível AA é
4,5:1 para texto normal e 3:1 para texto grande, ícones e bordas de campos.

### Tema claro

| Papel | Hex | Uso | Contraste |
|-------|-----|-----|-----------|
| Fundo | `#F6F8F9` | Fundo da página | — |
| Superfície | `#FFFFFF` | Cartões, campos, cabeçalho | — |
| Superfície 2 | `#E8EDF0` | Faixas alternadas, etiquetas (tags) | — |
| Texto | `#14232B` | Títulos e texto corrido | 15,1:1 |
| Texto secundário | `#465862` | Legendas, descrições, datas | 7,0:1 |
| Borda de campos | `#6B7F8A` | Contorno de campos de formulário | 3,9:1 |
| **Marca** (azul-petróleo) | `#0F5E73` | Links, botão principal, item ativo | 6,9:1 (texto branco por cima: 7,3:1) |
| **Destaque** (âmbar) | `#F2A20C` | Fundo do botão de destaque e de selos | texto escuro por cima: 7,6:1 |
| Âmbar para texto | `#8F5400` | Quando o âmbar precisa ser texto ou ícone | 5,7:1 |
| Sucesso | `#17693A` | Mensagens de confirmação | 6,3:1 |
| Erro | `#B3261E` | Mensagens de erro, borda de campo inválido | 6,1:1 |

### Tema escuro

| Papel | Hex | Uso | Contraste |
|-------|-----|-----|-----------|
| Fundo | `#0E1A20` | Fundo da página | — |
| Superfície | `#16262E` | Cartões, campos, cabeçalho | — |
| Superfície 2 | `#1E323C` | Faixas alternadas, etiquetas (tags) | — |
| Texto | `#E8EEF1` | Títulos e texto corrido | 15,1:1 |
| Texto secundário | `#A9B8C0` | Legendas, descrições, datas | 8,7:1 |
| Borda de campos | `#7C929D` | Contorno de campos de formulário | 5,4:1 |
| **Marca** (azul-petróleo claro) | `#6CC5DD` | Links, botão principal, item ativo | 9,0:1 (texto escuro por cima: 9,0:1) |
| **Destaque** (âmbar) | `#F5B03E` | Botão de destaque, selos, texto e ícones | 9,4:1 (texto escuro por cima: 8,6:1) |
| Sucesso | `#6FD08C` | Mensagens de confirmação | 9,3:1 |
| Erro | `#FF8A80` | Mensagens de erro, borda de campo inválido | 7,7:1 |

### Alto contraste

Quando a opção "alto contraste" do painel de acessibilidade está ligada, as cores mudam
para versões mais extremas, mirando o nível AAA (7:1 ou mais em todo texto).

| Papel | Claro | Escuro |
|-------|-------|--------|
| Fundo e superfícies | `#FFFFFF` | `#000000` |
| Texto | `#000000` (21:1) | `#FFFFFF` (21:1) |
| Texto secundário | `#1F2A30` (14,7:1) | `#E3EAEE` (17,3:1) |
| Bordas | `#000000` (21:1) | `#FFFFFF` (21:1) |
| Marca | `#073B49` (12,1:1) | `#8FE3F7` (14,5:1) |
| Destaque (fundo, com texto preto) | `#F2A20C` (9,9:1) | `#FFD166` (14,6:1) |
| Âmbar para texto | `#5E3600` (10,5:1) | `#FFD166` (14,6:1) |
| Sucesso | `#0B4A22` (10,4:1) | `#9BE8B0` (14,6:1) |
| Erro | `#8C0F0A` (9,6:1) | `#FFB4AB` (12,4:1) |

## Justificativa de cada cor

**Marca — azul-petróleo (`#0F5E73` no claro, `#6CC5DD` no escuro).**
O azul é a cor mais associada a confiança, competência e tecnologia; puxado para o verde,
ganha um tom de equilíbrio e crescimento. É um azul mais fechado e calmo que o
roxo ou o azul-elétrico comuns em sites de IA, o que diferencia o portfólio e combina com
quem atende clientes como um escritório de advocacia.

**Destaque — âmbar (`#F2A20C` no claro, `#F5B03E` no escuro).**
Cores quentes transmitem energia, otimismo e criatividade — a "faísca" da ideia nova, que
é o lado de IA do portfólio. Por ser a única cor quente sobre uma base fria, o olho vai
direto a ela; por isso fica reservada à ação mais importante de cada tela.

**Neutros — cinzas levemente azulados (`#F6F8F9`, `#E8EDF0`, `#465862`, `#14232B`).**
Os cinzas têm um pouco do azul da marca, o que deixa o conjunto harmônico em vez de
"cinza de impressora". O fundo é quase branco e o texto é quase preto: mantêm contraste
de 15:1 e cansam menos a vista do que preto puro sobre branco puro.

**Fundo escuro — azul-carvão (`#0E1A20`), não preto puro.**
No tema escuro, texto claro sobre preto absoluto cria um efeito de "halo" que atrapalha a
leitura. Um fundo escuro com um pouco de azul mantém a identidade da marca e é mais
confortável em leituras longas.

**Sucesso — verde (`#17693A` no claro, `#6FD08C` no escuro).**
Verde é a convenção universal de "deu certo, pode seguir" (semáforo). O tom é mais
amarelado que o azul-petróleo da marca, para os dois não serem confundidos.

**Erro — vermelho (`#B3261E` no claro, `#FF8A80` no escuro).**
Vermelho é a convenção de alerta e de "pare": chama atenção imediata para o que precisa
ser corrigido. É um vermelho fechado, legível como texto, sem a agressividade do vermelho puro.

## Regras de uso

1. **O âmbar nunca é texto sobre fundo claro.** `#F2A20C` sobre o fundo claro tem contraste
   de 2,0:1 (reprova). No tema claro ele só aparece como fundo, com texto escuro por cima;
   quando precisa ser texto ou ícone, usa-se o âmbar escuro `#8F5400`.
2. **Cor nunca é o único sinal** (WCAG 1.4.1). Erro e sucesso sempre vêm com ícone e
   texto; link dentro de parágrafo é sublinhado; a página atual no menu fica em negrito e
   sublinhada.
3. **Um destaque por tela.** O botão âmbar é reservado à ação principal; as outras ações
   usam a cor de marca ou o botão de contorno.
4. **Os números desta página serão conferidos pelo script** `scripts/contraste.js`
   (Etapa 1), que gera `docs/contraste.md` com todos os pares texto/fundo usados no site.

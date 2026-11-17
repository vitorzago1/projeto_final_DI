# Contraste das cores (WCAG 2.1)

> Arquivo gerado por `scripts/contraste.js`. Não edite à mão: rode `node scripts/contraste.js`.

As cores são lidas de `css/estilo.css`. Para cada par (cor da frente sobre cor de fundo)
usado no site, o script calcula a razão de contraste pela fórmula da WCAG 2.1.

- **Texto normal:** AA exige 4,5:1; AAA exige 7:1.
- **Bordas de campos, ícones e contorno de foco:** AA exige 3:1; não existe nível AAA para esses itens.

## Resumo

| Tema | Pares conferidos | Reprovados no AA | Menor razão |
|------|-----------------:|-----------------:|------------:|
| Tema claro | 31 | 0 | 3,54:1 |
| Tema escuro | 31 | 0 | 4,09:1 |
| Alto contraste — claro | 31 | 0 | 7,41:1 |
| Alto contraste — escuro | 31 | 0 | 10,30:1 |

## Tema claro

| Uso | Par (frente / fundo) | Cores | Razão | Mínimo AA | Passa AA | Passa AAA |
|-----|----------------------|-------|------:|----------:|:--------:|:---------:|
| Texto corrido na página | `--cor-texto` / `--cor-fundo` | `#14232B` / `#F6F8F9` | 15,11:1 | 4,5:1 | sim | sim |
| Texto no cabeçalho, em cartões e no painel | `--cor-texto` / `--cor-superficie` | `#14232B` / `#FFFFFF` | 16,09:1 | 4,5:1 | sim | sim |
| Texto no rodapé | `--cor-texto` / `--cor-superficie-2` | `#14232B` / `#E8EDF0` | 13,64:1 | 4,5:1 | sim | sim |
| Texto secundário na página | `--cor-texto-2` / `--cor-fundo` | `#465862` / `#F6F8F9` | 6,96:1 | 4,5:1 | sim | não |
| Texto secundário no cabeçalho e no painel (itens do menu, notas) | `--cor-texto-2` / `--cor-superficie` | `#465862` / `#FFFFFF` | 7,41:1 | 4,5:1 | sim | sim |
| Texto secundário no rodapé (direitos autorais) | `--cor-texto-2` / `--cor-superficie-2` | `#465862` / `#E8EDF0` | 6,28:1 | 4,5:1 | sim | não |
| Link na página | `--cor-marca` / `--cor-fundo` | `#0F5E73` / `#F6F8F9` | 6,87:1 | 4,5:1 | sim | não |
| Link e botão de contorno no cabeçalho e no painel | `--cor-marca` / `--cor-superficie` | `#0F5E73` / `#FFFFFF` | 7,32:1 | 4,5:1 | sim | sim |
| Link no rodapé | `--cor-marca` / `--cor-superficie-2` | `#0F5E73` / `#E8EDF0` | 6,21:1 | 4,5:1 | sim | não |
| Link com o mouse em cima, na página | `--cor-marca-hover` / `--cor-fundo` | `#0A4758` / `#F6F8F9` | 9,59:1 | 4,5:1 | sim | sim |
| Link com o mouse em cima, no cabeçalho e no painel | `--cor-marca-hover` / `--cor-superficie` | `#0A4758` / `#FFFFFF` | 10,22:1 | 4,5:1 | sim | sim |
| Link com o mouse em cima, no rodapé | `--cor-marca-hover` / `--cor-superficie-2` | `#0A4758` / `#E8EDF0` | 8,66:1 | 4,5:1 | sim | sim |
| Texto do botão principal, do botão de acessibilidade e da opção escolhida | `--cor-sobre-marca` / `--cor-marca` | `#FFFFFF` / `#0F5E73` | 7,32:1 | 4,5:1 | sim | sim |
| Texto do botão principal com o mouse em cima | `--cor-sobre-marca` / `--cor-marca-hover` | `#FFFFFF` / `#0A4758` | 10,22:1 | 4,5:1 | sim | sim |
| Texto do botão de destaque e dos marcadores | `--cor-sobre-destaque` / `--cor-destaque` | `#14232B` / `#F2A20C` | 7,62:1 | 4,5:1 | sim | sim |
| Texto do botão de destaque com o mouse em cima | `--cor-sobre-destaque` / `--cor-destaque-hover` | `#14232B` / `#DE9300` | 6,34:1 | 4,5:1 | sim | não |
| Âmbar usado como texto, na página | `--cor-destaque-texto` / `--cor-fundo` | `#8F5400` / `#F6F8F9` | 5,74:1 | 4,5:1 | sim | não |
| Âmbar usado como texto, em cartões | `--cor-destaque-texto` / `--cor-superficie` | `#8F5400` / `#FFFFFF` | 6,11:1 | 4,5:1 | sim | não |
| Mensagem de sucesso na página | `--cor-sucesso` / `--cor-fundo` | `#17693A` / `#F6F8F9` | 6,32:1 | 4,5:1 | sim | não |
| Mensagem de sucesso em cartões | `--cor-sucesso` / `--cor-superficie` | `#17693A` / `#FFFFFF` | 6,73:1 | 4,5:1 | sim | não |
| Mensagem de sucesso na caixa de aviso | `--cor-sucesso` / `--cor-sucesso-fundo` | `#17693A` / `#E2F3E8` | 5,84:1 | 4,5:1 | sim | não |
| Mensagem de erro na página | `--cor-erro` / `--cor-fundo` | `#B3261E` / `#F6F8F9` | 6,14:1 | 4,5:1 | sim | não |
| Mensagem de erro em cartões | `--cor-erro` / `--cor-superficie` | `#B3261E` / `#FFFFFF` | 6,54:1 | 4,5:1 | sim | não |
| Mensagem de erro na caixa de aviso | `--cor-erro` / `--cor-erro-fundo` | `#B3261E` / `#FCE9E7` | 5,59:1 | 4,5:1 | sim | não |
| Borda de campos e controles na página | `--cor-borda` / `--cor-fundo` | `#6B7F8A` / `#F6F8F9` | 3,92:1 | 3:1 | sim | — |
| Borda de campos, do interruptor e do botão do menu | `--cor-borda` / `--cor-superficie` | `#6B7F8A` / `#FFFFFF` | 4,18:1 | 3:1 | sim | — |
| Borda de controles no rodapé | `--cor-borda` / `--cor-superficie-2` | `#6B7F8A` / `#E8EDF0` | 3,54:1 | 3:1 | sim | — |
| Interruptor ligado e opção escolhida (preenchimento) | `--cor-marca` / `--cor-superficie` | `#0F5E73` / `#FFFFFF` | 7,32:1 | 3:1 | sim | — |
| Contorno de foco na página | `--cor-foco` / `--cor-fundo` | `#0F5E73` / `#F6F8F9` | 6,87:1 | 3:1 | sim | — |
| Contorno de foco no cabeçalho e no painel | `--cor-foco` / `--cor-superficie` | `#0F5E73` / `#FFFFFF` | 7,32:1 | 3:1 | sim | — |
| Contorno de foco no rodapé | `--cor-foco` / `--cor-superficie-2` | `#0F5E73` / `#E8EDF0` | 6,21:1 | 3:1 | sim | — |

## Tema escuro

| Uso | Par (frente / fundo) | Cores | Razão | Mínimo AA | Passa AA | Passa AAA |
|-----|----------------------|-------|------:|----------:|:--------:|:---------:|
| Texto corrido na página | `--cor-texto` / `--cor-fundo` | `#E8EEF1` / `#0E1A20` | 15,10:1 | 4,5:1 | sim | sim |
| Texto no cabeçalho, em cartões e no painel | `--cor-texto` / `--cor-superficie` | `#E8EEF1` / `#16262E` | 13,27:1 | 4,5:1 | sim | sim |
| Texto no rodapé | `--cor-texto` / `--cor-superficie-2` | `#E8EEF1` / `#1E323C` | 11,37:1 | 4,5:1 | sim | sim |
| Texto secundário na página | `--cor-texto-2` / `--cor-fundo` | `#A9B8C0` / `#0E1A20` | 8,68:1 | 4,5:1 | sim | sim |
| Texto secundário no cabeçalho e no painel (itens do menu, notas) | `--cor-texto-2` / `--cor-superficie` | `#A9B8C0` / `#16262E` | 7,63:1 | 4,5:1 | sim | sim |
| Texto secundário no rodapé (direitos autorais) | `--cor-texto-2` / `--cor-superficie-2` | `#A9B8C0` / `#1E323C` | 6,54:1 | 4,5:1 | sim | não |
| Link na página | `--cor-marca` / `--cor-fundo` | `#6CC5DD` / `#0E1A20` | 8,99:1 | 4,5:1 | sim | sim |
| Link e botão de contorno no cabeçalho e no painel | `--cor-marca` / `--cor-superficie` | `#6CC5DD` / `#16262E` | 7,90:1 | 4,5:1 | sim | sim |
| Link no rodapé | `--cor-marca` / `--cor-superficie-2` | `#6CC5DD` / `#1E323C` | 6,77:1 | 4,5:1 | sim | não |
| Link com o mouse em cima, na página | `--cor-marca-hover` / `--cor-fundo` | `#93D8EA` / `#0E1A20` | 11,16:1 | 4,5:1 | sim | sim |
| Link com o mouse em cima, no cabeçalho e no painel | `--cor-marca-hover` / `--cor-superficie` | `#93D8EA` / `#16262E` | 9,81:1 | 4,5:1 | sim | sim |
| Link com o mouse em cima, no rodapé | `--cor-marca-hover` / `--cor-superficie-2` | `#93D8EA` / `#1E323C` | 8,40:1 | 4,5:1 | sim | sim |
| Texto do botão principal, do botão de acessibilidade e da opção escolhida | `--cor-sobre-marca` / `--cor-marca` | `#0E1A20` / `#6CC5DD` | 8,99:1 | 4,5:1 | sim | sim |
| Texto do botão principal com o mouse em cima | `--cor-sobre-marca` / `--cor-marca-hover` | `#0E1A20` / `#93D8EA` | 11,16:1 | 4,5:1 | sim | sim |
| Texto do botão de destaque e dos marcadores | `--cor-sobre-destaque` / `--cor-destaque` | `#14232B` / `#F5B03E` | 8,55:1 | 4,5:1 | sim | sim |
| Texto do botão de destaque com o mouse em cima | `--cor-sobre-destaque` / `--cor-destaque-hover` | `#14232B` / `#FFC766` | 10,43:1 | 4,5:1 | sim | sim |
| Âmbar usado como texto, na página | `--cor-destaque-texto` / `--cor-fundo` | `#F5B03E` / `#0E1A20` | 9,40:1 | 4,5:1 | sim | sim |
| Âmbar usado como texto, em cartões | `--cor-destaque-texto` / `--cor-superficie` | `#F5B03E` / `#16262E` | 8,26:1 | 4,5:1 | sim | sim |
| Mensagem de sucesso na página | `--cor-sucesso` / `--cor-fundo` | `#6FD08C` / `#0E1A20` | 9,33:1 | 4,5:1 | sim | sim |
| Mensagem de sucesso em cartões | `--cor-sucesso` / `--cor-superficie` | `#6FD08C` / `#16262E` | 8,20:1 | 4,5:1 | sim | sim |
| Mensagem de sucesso na caixa de aviso | `--cor-sucesso` / `--cor-sucesso-fundo` | `#6FD08C` / `#12301E` | 7,55:1 | 4,5:1 | sim | sim |
| Mensagem de erro na página | `--cor-erro` / `--cor-fundo` | `#FF8A80` / `#0E1A20` | 7,75:1 | 4,5:1 | sim | sim |
| Mensagem de erro em cartões | `--cor-erro` / `--cor-superficie` | `#FF8A80` / `#16262E` | 6,81:1 | 4,5:1 | sim | não |
| Mensagem de erro na caixa de aviso | `--cor-erro` / `--cor-erro-fundo` | `#FF8A80` / `#3A1614` | 7,05:1 | 4,5:1 | sim | sim |
| Borda de campos e controles na página | `--cor-borda` / `--cor-fundo` | `#7C929D` / `#0E1A20` | 5,44:1 | 3:1 | sim | — |
| Borda de campos, do interruptor e do botão do menu | `--cor-borda` / `--cor-superficie` | `#7C929D` / `#16262E` | 4,78:1 | 3:1 | sim | — |
| Borda de controles no rodapé | `--cor-borda` / `--cor-superficie-2` | `#7C929D` / `#1E323C` | 4,09:1 | 3:1 | sim | — |
| Interruptor ligado e opção escolhida (preenchimento) | `--cor-marca` / `--cor-superficie` | `#6CC5DD` / `#16262E` | 7,90:1 | 3:1 | sim | — |
| Contorno de foco na página | `--cor-foco` / `--cor-fundo` | `#F5B03E` / `#0E1A20` | 9,40:1 | 3:1 | sim | — |
| Contorno de foco no cabeçalho e no painel | `--cor-foco` / `--cor-superficie` | `#F5B03E` / `#16262E` | 8,26:1 | 3:1 | sim | — |
| Contorno de foco no rodapé | `--cor-foco` / `--cor-superficie-2` | `#F5B03E` / `#1E323C` | 7,08:1 | 3:1 | sim | — |

## Alto contraste — claro

| Uso | Par (frente / fundo) | Cores | Razão | Mínimo AA | Passa AA | Passa AAA |
|-----|----------------------|-------|------:|----------:|:--------:|:---------:|
| Texto corrido na página | `--cor-texto` / `--cor-fundo` | `#14232B` / `#FFFFFF` | 16,09:1 | 4,5:1 | sim | sim |
| Texto no cabeçalho, em cartões e no painel | `--cor-texto` / `--cor-superficie` | `#14232B` / `#FFFFFF` | 16,09:1 | 4,5:1 | sim | sim |
| Texto no rodapé | `--cor-texto` / `--cor-superficie-2` | `#14232B` / `#FFFFFF` | 16,09:1 | 4,5:1 | sim | sim |
| Texto secundário na página | `--cor-texto-2` / `--cor-fundo` | `#465862` / `#FFFFFF` | 7,41:1 | 4,5:1 | sim | sim |
| Texto secundário no cabeçalho e no painel (itens do menu, notas) | `--cor-texto-2` / `--cor-superficie` | `#465862` / `#FFFFFF` | 7,41:1 | 4,5:1 | sim | sim |
| Texto secundário no rodapé (direitos autorais) | `--cor-texto-2` / `--cor-superficie-2` | `#465862` / `#FFFFFF` | 7,41:1 | 4,5:1 | sim | sim |
| Link na página | `--cor-marca` / `--cor-fundo` | `#073B49` / `#FFFFFF` | 12,13:1 | 4,5:1 | sim | sim |
| Link e botão de contorno no cabeçalho e no painel | `--cor-marca` / `--cor-superficie` | `#073B49` / `#FFFFFF` | 12,13:1 | 4,5:1 | sim | sim |
| Link no rodapé | `--cor-marca` / `--cor-superficie-2` | `#073B49` / `#FFFFFF` | 12,13:1 | 4,5:1 | sim | sim |
| Link com o mouse em cima, na página | `--cor-marca-hover` / `--cor-fundo` | `#000000` / `#FFFFFF` | 21,00:1 | 4,5:1 | sim | sim |
| Link com o mouse em cima, no cabeçalho e no painel | `--cor-marca-hover` / `--cor-superficie` | `#000000` / `#FFFFFF` | 21,00:1 | 4,5:1 | sim | sim |
| Link com o mouse em cima, no rodapé | `--cor-marca-hover` / `--cor-superficie-2` | `#000000` / `#FFFFFF` | 21,00:1 | 4,5:1 | sim | sim |
| Texto do botão principal, do botão de acessibilidade e da opção escolhida | `--cor-sobre-marca` / `--cor-marca` | `#FFFFFF` / `#073B49` | 12,13:1 | 4,5:1 | sim | sim |
| Texto do botão principal com o mouse em cima | `--cor-sobre-marca` / `--cor-marca-hover` | `#FFFFFF` / `#000000` | 21,00:1 | 4,5:1 | sim | sim |
| Texto do botão de destaque e dos marcadores | `--cor-sobre-destaque` / `--cor-destaque` | `#14232B` / `#F2A20C` | 7,62:1 | 4,5:1 | sim | sim |
| Texto do botão de destaque com o mouse em cima | `--cor-sobre-destaque` / `--cor-destaque-hover` | `#14232B` / `#FFC14D` | 9,95:1 | 4,5:1 | sim | sim |
| Âmbar usado como texto, na página | `--cor-destaque-texto` / `--cor-fundo` | `#5E3600` / `#FFFFFF` | 10,48:1 | 4,5:1 | sim | sim |
| Âmbar usado como texto, em cartões | `--cor-destaque-texto` / `--cor-superficie` | `#5E3600` / `#FFFFFF` | 10,48:1 | 4,5:1 | sim | sim |
| Mensagem de sucesso na página | `--cor-sucesso` / `--cor-fundo` | `#0B4A22` / `#FFFFFF` | 10,41:1 | 4,5:1 | sim | sim |
| Mensagem de sucesso em cartões | `--cor-sucesso` / `--cor-superficie` | `#0B4A22` / `#FFFFFF` | 10,41:1 | 4,5:1 | sim | sim |
| Mensagem de sucesso na caixa de aviso | `--cor-sucesso` / `--cor-sucesso-fundo` | `#0B4A22` / `#FFFFFF` | 10,41:1 | 4,5:1 | sim | sim |
| Mensagem de erro na página | `--cor-erro` / `--cor-fundo` | `#8C0F0A` / `#FFFFFF` | 9,60:1 | 4,5:1 | sim | sim |
| Mensagem de erro em cartões | `--cor-erro` / `--cor-superficie` | `#8C0F0A` / `#FFFFFF` | 9,60:1 | 4,5:1 | sim | sim |
| Mensagem de erro na caixa de aviso | `--cor-erro` / `--cor-erro-fundo` | `#8C0F0A` / `#FFFFFF` | 9,60:1 | 4,5:1 | sim | sim |
| Borda de campos e controles na página | `--cor-borda` / `--cor-fundo` | `#000000` / `#FFFFFF` | 21,00:1 | 3:1 | sim | — |
| Borda de campos, do interruptor e do botão do menu | `--cor-borda` / `--cor-superficie` | `#000000` / `#FFFFFF` | 21,00:1 | 3:1 | sim | — |
| Borda de controles no rodapé | `--cor-borda` / `--cor-superficie-2` | `#000000` / `#FFFFFF` | 21,00:1 | 3:1 | sim | — |
| Interruptor ligado e opção escolhida (preenchimento) | `--cor-marca` / `--cor-superficie` | `#073B49` / `#FFFFFF` | 12,13:1 | 3:1 | sim | — |
| Contorno de foco na página | `--cor-foco` / `--cor-fundo` | `#000000` / `#FFFFFF` | 21,00:1 | 3:1 | sim | — |
| Contorno de foco no cabeçalho e no painel | `--cor-foco` / `--cor-superficie` | `#000000` / `#FFFFFF` | 21,00:1 | 3:1 | sim | — |
| Contorno de foco no rodapé | `--cor-foco` / `--cor-superficie-2` | `#000000` / `#FFFFFF` | 21,00:1 | 3:1 | sim | — |

## Alto contraste — escuro

| Uso | Par (frente / fundo) | Cores | Razão | Mínimo AA | Passa AA | Passa AAA |
|-----|----------------------|-------|------:|----------:|:--------:|:---------:|
| Texto corrido na página | `--cor-texto` / `--cor-fundo` | `#E8EEF1` / `#000000` | 17,93:1 | 4,5:1 | sim | sim |
| Texto no cabeçalho, em cartões e no painel | `--cor-texto` / `--cor-superficie` | `#E8EEF1` / `#000000` | 17,93:1 | 4,5:1 | sim | sim |
| Texto no rodapé | `--cor-texto` / `--cor-superficie-2` | `#E8EEF1` / `#000000` | 17,93:1 | 4,5:1 | sim | sim |
| Texto secundário na página | `--cor-texto-2` / `--cor-fundo` | `#A9B8C0` / `#000000` | 10,30:1 | 4,5:1 | sim | sim |
| Texto secundário no cabeçalho e no painel (itens do menu, notas) | `--cor-texto-2` / `--cor-superficie` | `#A9B8C0` / `#000000` | 10,30:1 | 4,5:1 | sim | sim |
| Texto secundário no rodapé (direitos autorais) | `--cor-texto-2` / `--cor-superficie-2` | `#A9B8C0` / `#000000` | 10,30:1 | 4,5:1 | sim | sim |
| Link na página | `--cor-marca` / `--cor-fundo` | `#8FE3F7` / `#000000` | 14,50:1 | 4,5:1 | sim | sim |
| Link e botão de contorno no cabeçalho e no painel | `--cor-marca` / `--cor-superficie` | `#8FE3F7` / `#000000` | 14,50:1 | 4,5:1 | sim | sim |
| Link no rodapé | `--cor-marca` / `--cor-superficie-2` | `#8FE3F7` / `#000000` | 14,50:1 | 4,5:1 | sim | sim |
| Link com o mouse em cima, na página | `--cor-marca-hover` / `--cor-fundo` | `#FFFFFF` / `#000000` | 21,00:1 | 4,5:1 | sim | sim |
| Link com o mouse em cima, no cabeçalho e no painel | `--cor-marca-hover` / `--cor-superficie` | `#FFFFFF` / `#000000` | 21,00:1 | 4,5:1 | sim | sim |
| Link com o mouse em cima, no rodapé | `--cor-marca-hover` / `--cor-superficie-2` | `#FFFFFF` / `#000000` | 21,00:1 | 4,5:1 | sim | sim |
| Texto do botão principal, do botão de acessibilidade e da opção escolhida | `--cor-sobre-marca` / `--cor-marca` | `#0E1A20` / `#8FE3F7` | 12,21:1 | 4,5:1 | sim | sim |
| Texto do botão principal com o mouse em cima | `--cor-sobre-marca` / `--cor-marca-hover` | `#0E1A20` / `#FFFFFF` | 17,69:1 | 4,5:1 | sim | sim |
| Texto do botão de destaque e dos marcadores | `--cor-sobre-destaque` / `--cor-destaque` | `#14232B` / `#FFD166` | 11,16:1 | 4,5:1 | sim | sim |
| Texto do botão de destaque com o mouse em cima | `--cor-sobre-destaque` / `--cor-destaque-hover` | `#14232B` / `#FFE19A` | 12,63:1 | 4,5:1 | sim | sim |
| Âmbar usado como texto, na página | `--cor-destaque-texto` / `--cor-fundo` | `#FFD166` / `#000000` | 14,56:1 | 4,5:1 | sim | sim |
| Âmbar usado como texto, em cartões | `--cor-destaque-texto` / `--cor-superficie` | `#FFD166` / `#000000` | 14,56:1 | 4,5:1 | sim | sim |
| Mensagem de sucesso na página | `--cor-sucesso` / `--cor-fundo` | `#9BE8B0` / `#000000` | 14,56:1 | 4,5:1 | sim | sim |
| Mensagem de sucesso em cartões | `--cor-sucesso` / `--cor-superficie` | `#9BE8B0` / `#000000` | 14,56:1 | 4,5:1 | sim | sim |
| Mensagem de sucesso na caixa de aviso | `--cor-sucesso` / `--cor-sucesso-fundo` | `#9BE8B0` / `#000000` | 14,56:1 | 4,5:1 | sim | sim |
| Mensagem de erro na página | `--cor-erro` / `--cor-fundo` | `#FFB4AB` / `#000000` | 12,37:1 | 4,5:1 | sim | sim |
| Mensagem de erro em cartões | `--cor-erro` / `--cor-superficie` | `#FFB4AB` / `#000000` | 12,37:1 | 4,5:1 | sim | sim |
| Mensagem de erro na caixa de aviso | `--cor-erro` / `--cor-erro-fundo` | `#FFB4AB` / `#000000` | 12,37:1 | 4,5:1 | sim | sim |
| Borda de campos e controles na página | `--cor-borda` / `--cor-fundo` | `#FFFFFF` / `#000000` | 21,00:1 | 3:1 | sim | — |
| Borda de campos, do interruptor e do botão do menu | `--cor-borda` / `--cor-superficie` | `#FFFFFF` / `#000000` | 21,00:1 | 3:1 | sim | — |
| Borda de controles no rodapé | `--cor-borda` / `--cor-superficie-2` | `#FFFFFF` / `#000000` | 21,00:1 | 3:1 | sim | — |
| Interruptor ligado e opção escolhida (preenchimento) | `--cor-marca` / `--cor-superficie` | `#8FE3F7` / `#000000` | 14,50:1 | 3:1 | sim | — |
| Contorno de foco na página | `--cor-foco` / `--cor-fundo` | `#FFD166` / `#000000` | 14,56:1 | 3:1 | sim | — |
| Contorno de foco no cabeçalho e no painel | `--cor-foco` / `--cor-superficie` | `#FFD166` / `#000000` | 14,56:1 | 3:1 | sim | — |
| Contorno de foco no rodapé | `--cor-foco` / `--cor-superficie-2` | `#FFD166` / `#000000` | 14,56:1 | 3:1 | sim | — |

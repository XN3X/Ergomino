# Ergomino — sistema de design (MVP v1.0)

Direção: um site que pratica o que ensina. A página é a "prova de prelo" de um livro bem diagramado: medida curta,
entrelinha generosa, bandeira à esquerda, nada competindo com o texto. A única ousadia é a **régua**: o Ergomino mede
letras, então a identidade visual nasce das linhas-guia tipográficas (ascendente, altura-x, linha de base) e da cota em
milímetros. Tudo o mais fica quieto.

## Princípios

1. Nenhum clique interno abre outra tela. Seções na mesma página; detalhes abrem numa **gaveta** lateral (desktop) ou
   numa folha inferior (celular), com alça central arrastável.
2. Toda recomendação carrega selo de evidência (A, B, C, D, Mito, Norma, Dado) e link para a fonte.
3. Zero requisições externas, zero rastreamento. Preferências ficam no `localStorage` do próprio aparelho.
4. Celular primeiro: barra de abas inferior, alvos de toque ≥ 44 px, ferramenta operável com uma mão.
5. WCAG 2.2 AA: contraste ≥ 4,5:1 no texto, foco visível, `prefers-reduced-motion` respeitado.

## Cor

Azul da marca: `#2196f3`. Em fundo claro ele rende 3,1:1 contra branco, então **texto sobre o azul é tinta escura**
(`#0b1c2a`, 5,3:1) e **links usam azul mais fundo** (`#1769c2`, ≥ 4,6:1). No Night, links sobem para `#7cc0ff`.

| Token | Morning (claro) | Afternoon (confortável) | Night (escuro) |
| --- | --- | --- | --- |
| `--bg` | `#f4f7fb` | `#efe8da` | `#0e1620` |
| `--surface` | `#ffffff` | `#f7f1e6` | `#162130` |
| `--surface-2` | `#e9eff6` | `#e6dcc8` | `#1d2a3b` |
| `--ink` | `#14202b` | `#2a241c` | `#e7eef6` |
| `--ink-2` | `#45566a` | `#5f564a` | `#a8b6c6` |
| `--line` | `#d5dee9` | `#d4c8b2` | `#2b3a4d` |
| `--brand` | `#2196f3` | `#2196f3` | `#2196f3` |
| `--link` | `#1769c2` | `#1565c0` | `#7cc0ff` |
| `--on-brand` | `#0b1c2a` | `#0b1c2a` | `#06131f` |

Selos: A `#1b7f4b` (verde), B `#1769c2` (azul), C `#8a6d1f` (ocre), D `#8e5aa6` (roxo), Mito `#b3261e` (vermelho),
Norma `#3a4a5c` (ardósia), Dado `#0f7a86` (petróleo). No Night as cores clareiam para manter 4,5:1 sobre o fundo.
Nenhuma informação é codificada só por cor: o selo sempre mostra a letra.

## Tipografia

- **Leitura (serifada do sistema):** `Charter, "Bitstream Charter", "Iowan Old Style", "Palatino Linotype", Georgia, serif`.
  Corpo 18 px, entrelinha 1,55, medida máxima 68 caracteres.
- **Interface e dados (sem serifa do sistema):** `"Segoe UI", system-ui, -apple-system, Roboto, "Helvetica Neue", Arial, sans-serif`.
  Corpo 16 px, entrelinha 1,45; números em `tabular-nums`.
- Escala: 14 · 16 · 18 · 20 · 24 · 30 · 38 · clamp(34–56) px. Títulos com `letter-spacing: -0.01em`.
- Sem caixa-alta espaçada em rótulos, sem setas nos botões, sem eyebrow numerado fora de sequências reais.

## Espaço e forma

- Base de 4 px. Padding de cartão 20–24 px; distância entre seções 144 px (96 px no celular).
- Raio: 10 px em cartões e campos, 999 px em chips e alças. Sombra apenas na gaveta (elevação real).
- Separação por espaço, não por borda; bordas só quando a borda informa (tabela, campo, selo).

## Componentes

- **Gaveta:** largura 480 px (360–60 vw), borda esquerda fina com um pino em contorno no centro, redimensionável por arraste e
  por setas do teclado; Esc fecha. No celular vira folha inferior com alça superior; arrastar para baixo fecha.
- **Selo:** pílula com letra e nome ("B moderada"); clique abre a legenda na gaveta.
- **Linha da ficha:** parâmetro · valor · selo · por quê · "ver diretriz".
- **Barra de abas (celular):** Início · Ferramenta · Guia · Mitos · Mais.

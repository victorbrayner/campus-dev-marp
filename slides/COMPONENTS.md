# Catálogo de Componentes

Referência rápida para agentes. O exemplo completo de cada componente está em
`slides/template.md`.

Este catálogo é um **menu, não um checklist**. Use o componente que expressa a
relação do conteúdo. As seções abaixo indicam o que é **núcleo**, o que é
**opcional** e o que deve ficar em **arquivo**.

## Primitivas

| Componente | Classes principais | Uso |
|---|---|---|
| Accent de slide | `accent-blue`, `accent-purple`, `accent-orange`, `accent-teal`, `accent-navy` | Define a cor principal do slide |
| Accent local | `c-blue`, `c-purple`, `c-orange`, `c-teal`, `c-navy` | Define cor em um componente isolado |
| Eyebrow | `.eyebrow` | Categoria do slide |
| Label | `.label` | Categoria dentro do conteúdo |
| Subtítulo | `.subtitle` | Contexto secundário |
| Texto auxiliar | `.lead`, `.small`, `.tiny`, `.muted`, `.mono`, `.center` | Ajustes tipográficos |
| Fecho na base | `.closer` | Ancora `notice`, `panel` ou `quote` no rodapé, como o callout |

## Núcleo, opcional e arquivo

**Núcleo — usar por padrão**
`eyebrow`, `label`, `subtitle`, `two-col`, `cards`, `flow`, `steps`,
tabela, código, listas, `callout`, `panel`, `notice`, `stack`,
`section-divider`, `topic-list`, `title`.

**Dados — quando houver números, critérios ou comparação**
`stats`, `equation`, `compare-table`, `matrix`, `decision-grid`.
Gráficos (`bar-chart`, `v-bars`, `donut`, `progress`) só com dados reais;
nunca como decoração.

**Narrativa — quando houver história, validação ou síntese**
`quote`, `checklist`, `timeline`, `cascade`.
`takeaway` é uma faixa escura como o callout; use apenas quando o callout já
não fechar o slide.

**Mídia e identidade — somente com asset real**
`media`, `image-card`, `media-slot`, `qr-card`, `brand-logo`, `references`.

**Arquivo — não usar por padrão**
`pill`, `spectrum-labels`, `cards-auto`, `icon-lg`.
Mantenha no catálogo para casos específicos, mas não os use só para "variar"
um deck.

## Conteúdo e layout

| Componente | Classes | Quando usar |
|---|---|---|
| Cards | `.cards cols-2/3/4` + `.card` | Ideias, sintomas, pilares ou opções |
| Cards automáticos | `.cards-auto` | Número variável de cards |
| Card compacto | `.card.compact` | Maior densidade |
| Card outline | `.card.outline` | Card branco com borda |
| Card tintado | `.card.tint c-*` | Categorias com fundo colorido |
| Card com ícone | `.card .icon-lg` | Conceitos reconhecíveis rapidamente |
| Duas colunas | `.two-col` | Problema/conceito ou texto/evidência. Corpo de 15px para `p` e `li` |
| Divisão assimétrica | `.split-60-40`, `.split-40-60`, `.two-col.wide-left` | Priorizar uma das colunas |
| Pilha | `.stack`, `.stack-tight` | Conteúdo vertical controlado |
| Preenchimento | `.fill` | Ocupa espaço vertical restante |

## Destaques

| Componente | Classes | Quando usar |
|---|---|---|
| Callout | `.callout` | Conclusão ou aplicação prática. Corpo 14.5px |
| Callout com autoria | `.callout` + `.attrib` | Citação em caixa escura |
| Takeaway | `.takeaway` | Regra final de um slide |
| Quote | `.quote` | Citação clara com borda accent |
| Painel | `.panel c-orange/c-teal/c-purple` | Risco, posição, contexto ou trade-off. Corpo 14px |
| Notice | `.notice`, `.notice.warning`, `.notice.success` | Aviso compacto. Corpo 14px, título 12px |
| Pill | `.pill`, `.pill.rounded` | Status, categoria ou resultado |
| Tags | `.tag-list` + `.tag-chip` | Taxonomia compacta |

## Fechos de slide

O callout não é obrigatório. Escolha o fecho pela função:

| Fecho | Quando usar | Classe |
|---|---|---|
| Callout | Conclusão ou regra principal | `.callout` |
| Notice | Ressalva, escopo ou aviso | `.notice closer` |
| Panel | Contexto, trade-off, risco ou posição | `.panel c-* closer` |
| Quote | Tese, citação ou frase de impacto | `.quote closer` |
| Nenhum | Diagrama ou tabela que já conclui | — |

Um deck não precisa fechar todos os slides com faixa. O fecho é uma escolha,
não um rodapé fixo.

## Divisores e tópicos

| Componente | Classes | Uso |
|---|---|---|
| Divisor de seção | `.section-divider` | Abre uma parte da aula; centraliza o conjunto |
| Parte | `.part` | Rótulo "PARTE 01 / 03" |
| Lista de tópicos | `.topic-list` (4 por padrão), `.cols-2`, `.cols-3` | Enumera os tópicos da parte |
| Tópico | `.topic` + `.n` | Número e texto de cada tópico |

O bloco da lista é centralizado no slide: as colunas usam `max-content` e
`justify-content: center`. No padrão de 4 colunas, o tema reduz a contagem
quando há menos itens, para não deixar uma faixa vazia. Em listas com última
linha incompleta, a última linha alinha à esquerda do bloco; para centralizar
cada linha, use `flex-wrap`. Não reposicione o bloco com `_style`.

Tamanhos: `.section-divider h1` 78px, `.part` 14px, `.topic` 15px.

## Processos e relações

| Componente | Classes | Quando usar |
|---|---|---|
| Pipeline preenchido | `.flow` + `.node` | Fluxo simples |
| Pipeline outline | `.flow.outline` | Etapas nomeadas com setas |
| Etapas numeradas | `.steps cols-3/4/5` + `.step` | Método ou procedimento |
| Cascata | `.cascade` + `.cascade-step` + `.cascade-result` | Gates, validações e critérios |
| Timeline | `.timeline` + `.event` | História ou roadmap |

## Dados e comparação

| Componente | Classes | Quando usar |
|---|---|---|
| KPI | `.stats` + `.stat` | Números principais |
| Barra horizontal | `.bar-chart`, `.bar-row`, `.bar-fill` | Comparação quantitativa |
| Progresso | `.progress` | Percentual de conclusão |
| Barras verticais | `.v-bars`, `.v-bar` | Comparação visual curta |
| Donut | `.donut-row`, `.donut` | Participação ou proporção |
| Equação | `.equation` | Fórmula ou regra compacta |
| Tabela | Markdown padrão | Comparação textual |
| Matriz | `.matrix` ou `.decision-grid` | Critérios e decisões |
| Compare table | `.compare-table` + `:---:` + `.ct-yes/.ct-partial/.ct-no` | ✓ / ~ / ✗ entre alternativas |
| Célula destacada | `.hl`, `.hl-purple`, `.hl-teal` etc. | Chamar atenção a uma célula |
| Espectro | `.cards no-stretch` + `.spectrum-labels` | Escala de maturidade |

## Diagramas técnicos

Diagramas técnicos não são assets de mídia: são **SVG inline** no slide. Não
use raster, foto ou banco de imagens.

| Uso | Estrutura |
|---|---|
| Figura larga com legenda | `.media` + `<svg>` + `.caption` |
| Texto + diagrama | `.split-60-40` ou `.split-40-60` com `<svg>` em uma coluna |
| Galeria | `.cards` + `.image-card` + `<svg>` |

Regras:

- o texto do diagrama é SVG, com as fontes do tema; não rasterize;
- use `scripts/diagram-kit.mjs` para caixas, setas, barramentos e rótulos;
- toda figura precisa de `alt` (a relação, não "diagrama") e legenda;
- o modelo vem do brief; se não houver, marque `[DIAGRAMA NECESSÁRIO]`.

## Mídia e identidade

Use apenas com asset real. Diagramas técnicos ficam na seção anterior, em SVG
inline.

| Componente | Classes | Quando usar |
|---|---|---|
| Imagem contextual | `.media` + `img` + `figcaption` | Imagem com explicação |
| Slot de mídia | `.media-slot` | Vídeo ou mídia que será inserida depois |
| Card de imagem | `.image-card` | Galeria de exemplos |
| QR card | `.qr-card` | Perfil, material ou chamada para ação |
| Logo | `.brand-logo` | Marca fixa no canto superior direito |
| Referências | `.references`, `.sources` | Fontes e leituras |

## Listas e código

| Componente | Classes | Quando usar |
|---|---|---|
| Lista padrão | `.list` | Itens comuns |
| Lista ordenada | `.list.ordered` | Sequência ou ranking |
| Checklist | `.checklist` | Critérios de conclusão |
| Lista dash | `.list.dash` | Mecanismos e sintomas |
| Lista arrow | `.list.arrow` | Relações e transformações |
| Lista compacta | `.list.tight` | Mais densidade |
| Código customizado | `.code` | Bloco HTML controlado |
| Código Markdown | fenced code block | Código com syntax highlighting |

## Receitas de slide

1. **Conceito** — `eyebrow` + `h1` + `two-col` (definição / consequência) +
   fecho curto ou nenhum.
2. **Mecanismo** — `h1` + `flow outline` + uma linha de leitura; sem callout.
3. **Comparação** — `h1` + tabela ou `compare-table` + `notice closer` com a
   leitura.
4. **Dados** — `h1` + `stats` + uma frase; sem tabela.
5. **Exercício** — `h1` + `cards cols-2` com as perguntas + `notice closer`
   com o método.
6. **Síntese** — `title` escuro ou `quote` full-width com a tese; sem callout.
7. **Diagrama técnico** — `h1` + SVG inline em `.media` (ou em um `split`) +
   legenda; sem callout quando o diagrama já conclui.

## Regras de composição

- Combine no máximo dois padrões principais por slide.
- Limite `.callout` a cerca de 40% dos slides de conteúdo e nunca use três
  seguidos.
- Limite `two-col` a cerca de metade dos slides; alterne com `cards`, tabela,
  `flow`/`steps`, código ou `quote`.
- Não repita a mesma estrutura principal por mais de dois slides seguidos.
- Varie o fecho: callout, `notice closer`, `panel closer`, `quote closer` ou
  nenhum.
- Use `.stack` ao combinar um grid de texto com diagrama, tabela ou fecho.
- Use `.callout` para concluir, não para repetir o corpo.
- Use `.panel` quando cada lado tiver uma função semântica própria.
- Use `.compare-table` somente quando os símbolos forem realmente comparáveis.
- Use `.media-slot` quando a mídia ainda não existir; não simule uma evidência.
- Use `.c-*` no elemento que deve mudar de cor, não no slide inteiro, quando
  houver mais de uma categoria visual.
- `checklist` indica critérios já cumpridos; perguntas em aberto pedem
  `cards` ou lista.
- Toda tabela precisa de cabeçalho em todas as colunas; tabelas de 2 colunas
  não devem ocupar a largura inteira.
- Diagramas técnicos usam SVG inline, nunca raster; siga a skill
  `slide-visuals` e o `scripts/diagram-kit.mjs`.

## Armadilhas de layout

Comportamentos do tema que costumam causar retrabalho:

- `.two-col` e `.cards` crescem (`flex: 1`) e empurram o que vem depois para o
  rodapé; quando o conteúdo do grid é curto, o vazio sobra dentro dele. Uma
  terceira zona (tabela, lista, `flow` ou fecho) fecha o slide.
- Blocos encadeados sem `.stack` colam uns nos outros (fluxo, legenda, cards e
  fecho com quase zero de respiro). Envolva o grupo em `.stack` para o
  espaçamento de 12 px.
- `.callout`, `.takeaway` e `.closer` ancoram no pé do slide; com conteúdo curto
  acima, abre um buraco no meio.
- O `audit:visual` mede o vazio entre o último bloco de conteúdo e o fecho e
  avisa acima de 250 px, e também quando o fecho cola no conteúdo (menos de
  8 px). Texto, tabela, código, SVG e imagem contam como conteúdo; a caixa
  esticada do grid, não.

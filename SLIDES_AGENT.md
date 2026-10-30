# Campus Dev — Especificação Para Agentes de Slides

Este documento é a instrução principal para agentes que criam apresentações
com este projeto. O objetivo é produzir slides densos, concisos, escaneáveis e
exportáveis, preservando a linguagem visual do modelo original.

## Ordem de leitura

1. Leia este arquivo.
2. Se existir `briefs/[aula]-original.md`, leia o roteiro original; ele é a
   fonte. O arquivo é salvo pelo professor; não copie template nem cole o
   texto.
3. Se existir `briefs/[aula].md`, leia o brief modelado; se não existir,
   gere-o a partir do original antes do deck.
4. Leia `slides/COMPONENTS.md` e a classificação núcleo/opcional antes de escolher o componente.
5. Consulte o exemplo correspondente em `slides/template.md`.
6. Crie o deck em `slides/decks/`, nunca dentro do catálogo.
7. Execute `npm run validate -- --input slides/decks/seu-deck.md`,
   `npm run audit:assets -- slides/decks/seu-deck.md` e
   `npm run audit:visual -- slides/decks/seu-deck.md`.
8. Renderize em PDF e revise visualmente antes de entregar.

## Fluxo completo, do roteiro original ao PDF

O fluxo começa com o arquivo `.md` que o professor já tem. Ele é salvo em
`briefs/` e lido diretamente; não há cópia de template nem colagem.

1. **Salvar o roteiro original.** Coloque o arquivo em
   `briefs/<aula>-original.md` (por exemplo,
   `briefs/aula-05-original.md`). Se houver versões, use
   `-original-v2.md`, `-original-v3.md`. Não formate e não preencha
   metadados: o texto original é a fonte.
2. **Gerar o brief.** Peça ao agente para ler o original, este arquivo,
   `slides/COMPONENTS.md`, `briefs/_template.md` e a skill `humanizer`; se
   houver diagrama, também a skill `slide-visuals`. O agente cria
   `briefs/<aula>.md` com a estrutura de `_template.md`, incluindo
   `Condução do Professor (não exibir)` e `## Diagramas Técnicos`. Se faltar
   público, duração ou fontes, ele pergunta; não inventa.
3. **Revisar o brief.** Aprove tese, escopo, conteúdos obrigatórios,
   opcionais e proibidos, dados e fontes, condução do professor e modelos de
   diagrama. O deck não começa antes desta revisão. Respostas esperadas,
   notas de quadro e critérios de avaliação ficam no brief; não vão para o
   slide.
4. **Gerar o deck.** Peça o arquivo em `slides/decks/AAAA-MM-DD--titulo.md`,
   conforme `AGENTS.md`. O agente aplica `humanizer`, usa os componentes de
   `COMPONENTS.md` e, quando houver diagrama, SVG inline com `alt` e legenda.
   O roteiro original não é copiado para os slides.
5. **Validar.** Rode as três auditorias no arquivo:

   ```bash
   npm run validate -- --input slides/decks/AAAA-MM-DD--titulo.md
   npm run audit:assets -- slides/decks/AAAA-MM-DD--titulo.md
   npm run audit:visual -- slides/decks/AAAA-MM-DD--titulo.md
   ```

   O alvo é zero erro. Avisos de título em duas linhas ou de variedade devem
   ser corrigidos ou justificados. Para rodar em todos os decks, omita o
   caminho em `audit:assets` e `audit:visual`. O `audit:visual` usa Chrome ou
   Edge; se não encontrar o navegador, defina `CHROME_PATH`.
6. **Exportar e revisar.** Gere o PDF e, se precisar conferir a exportação,
   o HTML:

   ```bash
   npm run export:pdf -- --input slides/decks/AAAA-MM-DD--titulo.md
   npm run export:html -- --input slides/decks/AAAA-MM-DD--titulo.md
   ```

   Revise o PDF, não só o preview: fontes, diagramas, tabelas, rodapé,
   paginação e área útil.
7. **Publicar.** O deck fica em `slides/decks/`; o brief em
   `briefs/<aula>.md`; o original em `briefs/<aula>-original.md`. Assets
   externos ficam em `slides/assets/`, com `alt`, fonte e licença.

O roteiro original é material de condução do professor e fica em `briefs/`,
pasta local que não é versionada (exceto `_template.md`). Para acrescentar um
slide a um deck existente, atualize o brief e
o deck, rode as três auditorias no arquivo e reexporte o PDF; não é necessário
refazer o brief inteiro.

## Entradas necessárias

Antes de escrever slides, identifique:

- roteiro original (fonte) ou brief modelado;
- modelo dos diagramas técnicos, quando houver;
- tema e título;
- público e nível de conhecimento;
- objetivo da apresentação;
- duração ou número aproximado de slides;
- tese central;
- fontes disponíveis;
- exemplos, dados, imagens ou código autorizados.

Se uma entrada estiver ausente, use `[DADO NECESSÁRIO]` em vez de inventar
informação.

## Processo de geração

### 0. Do roteiro original ao brief

Se o brief ainda não existir, leia `briefs/[aula]-original.md` e crie
`briefs/[aula].md` usando a estrutura de `briefs/_template.md` como contrato.
Preserve a tese, o escopo, as fontes e o nível do público. Se faltar informação
essencial, pergunte; não invente. Inclua o plano de diagramas técnicos antes de
escrever o deck.

### 0.1 Roteiro do professor, slide do aluno

O roteiro original é escrito para quem conduz a aula. O slide é escrito para
quem assiste. Ao modelar o brief:

- separe fala de abertura, respostas esperadas, tempo, desenhos de quadro,
  cuidados e critérios de avaliação em `Condução do Professor (não exibir)`;
- leve para o slide apenas conceito, exemplo, diagrama, pergunta sem resposta,
  instrução de atividade e síntese;
- se o roteiro traz “pergunta + resposta”, a pergunta pode ir ao slide; a
  resposta fica no brief;
- aplique a skill `humanizer` ao brief e ao texto dos slides; não copie o
  roteiro original para o slide.

### 1. Construir o argumento

Escreva primeiro uma frase de tese e um outline textual. Cada slide deve
responder a uma pergunta ou sustentar uma conclusão.

Estrutura recomendada:

1. Contexto ou problema.
2. Conceito ou modelo mental.
3. Evidência, mecanismo ou comparação.
4. Aplicação, decisão ou consequência.
5. Síntese e próximo passo.

Não transforme o outline em uma sequência de títulos genéricos. Prefira títulos
conclusivos, por exemplo `Testes verdes não provam que a tarefa terminou` em
vez de `Testes`.

### 2. Escolher o arquétipo

Use um componente existente sempre que possível:

| Necessidade | Componente preferido |
|---|---|
| Abrir a apresentação | `title` ou `title light` |
| Dividir uma parte | `section-divider` |
| Enumerar ideias | `.cards cols-3` ou `.cards cols-4` |
| Explicar causa e consequência | `.two-col` + `.callout` |
| Mostrar sequência | `.flow.outline`, `.steps` ou `.timeline` |
| Mostrar validações | `.cascade` |
| Comparar alternativas | tabela ou `.compare-table` |
| Mostrar maturidade | espectro com cards + `.spectrum-labels` |
| Destacar risco e posição | `.panel c-orange` e `.panel c-teal` |
| Mostrar números | `.stats` ou gráfico CSS |
| Explicar código | duas colunas: código + leitura |
| Inserir evidência visual | `.media` ou `.media-slot` |
| Encerrar | `title` escuro |

### 3. Escrever o conteúdo

Use a seguinte hierarquia:

- título: uma conclusão curta;
- subtítulo: contexto ou recorte, somente se necessário;
- label/eyebrow: categoria do slide;
- corpo: evidência, explicação ou exemplo;
- callout: implicação prática ou regra de decisão.

 
## Regras de densidade

Densidade não significa preencher todo o canvas. Significa maximizar informação
útil sem perder a leitura.

- Uma tese principal por slide.
- Duas ou três zonas visuais principais.
- Listas com 3 a 5 itens.
- Cards com título curto e 1 a 3 frases.
- Tabelas com no máximo 6 linhas e 5 colunas, salvo necessidade explícita.
- No máximo um gráfico ou uma tabela principal por slide.
- KPIs: 2 a 4 números relacionados.
- Código: somente o trecho necessário para sustentar a explicação.
- Um callout por slide, salvo quando o arquétipo exigir dois painéis.
- O tema já aplica 40/46 px entre o título e o primeiro conteúdo. Não
  adicione margens manuais para "empurrar" o corpo.
- Mire em conteúdo + fecho ocupando cerca de 80% da altura útil. Se o último
  bloco terminar antes de y≈430 ou o vazio até o fecho passar de ~250 px,
  acrescente uma terceira zona (fluxo, tabela, cards) ou divida o slide.
  O `audit:visual` mede esse vazio e avisa acima de 250 px.
- Se o conteúdo ultrapassar esses limites, divida em slides consecutivos.

Evite repetir a mesma informação no título, subtítulo, corpo e callout.

## Regras visuais

- Use no máximo duas cores de accent por slide, exceto em espectros e tabelas
  comparativas.
- Para variar a cor dentro do slide, use `.c-blue`, `.c-purple`, `.c-orange`,
  `.c-teal` ou `.c-navy`.
- Não crie cores novas em `style` inline.
- Preserve os papéis tipográficos: Oswald para títulos, Roboto Mono para
  labels/dados e Carlito para o corpo.
- Não use sombras, gradientes ou bordas decorativas fora dos componentes.
- Use títulos em caixa alta somente quando o tema já fizer isso por padrão.
- Use ícones apenas quando acrescentarem reconhecimento rápido. Prefira SVG
  local ou emoji simples a bibliotecas externas.
- Use logo e QR code somente quando houver identidade ou ação de contato clara.
- Títulos de conteúdo devem caber em uma linha; acima de ~55 caracteres,
  encurte ou transforme o restante em subtítulo.
- Não use `_style` para espaçamento, fonte ou paginação. Use as classes e
  utilitários do tema.
- Tabelas de 2 colunas não devem ocupar a largura inteira; use 4 colunas
  (dois pares) ou combine a tabela com um texto explicativo.

## Escala tipográfica e área útil

Use a escala do tema. Não invente tamanhos em `_style` nem reduza só um dos
elementos de uma coluna.

| Papel | Tamanho |
|---|---:|
| Corpo da `section` | 20px |
| `h1` de conteúdo | 40px |
| `h1` de abertura/fechamento | 52px |
| `h1` de divisor | 78px |
| `h2` | 26px |
| `subtitle` | 17px |
| Corpo do `two-col` (`p` e `li`) | 15px |
| `panel` / `notice` | 14px |
| `notice-title` | 12px |
| `callout` | 14.5px |
| `callout .tag` / `label` | 12px |
| `card` | título 16px, texto 13.5px |
| `steps` / `flow` | texto 12.5px |
| Tabela | 14.5px |
| Código | 13px |
| `topic` | 15px |
| `part` | 14px |

Área útil:

- padding do slide: 56px no topo, 68px nas laterais, 50px na base;
- conteúdo de x=68 a 1212 e de y=56 a 670;
- rodapé começa em y=681 e a paginação fica na mesma linha, à direita;
- não coloque conteúdo entre y=670 e y=720;
- o número da página é posicionado pelo tema; não reposicione com `_style`.

## Variedade e composição

O catálogo é um menu, não um checklist. Use o componente que expressa a
relação do conteúdo, não o que falta para "usar tudo".

- Alterne a estrutura principal: `two-col`, `cards`, `flow`/`steps`, tabela,
  código ou `quote`. Não repita a mesma estrutura por mais de dois slides
  seguidos.
- Limite `two-col` a cerca de metade dos slides de conteúdo.
- Limite `.callout` a cerca de 40% dos slides e nunca use três seguidos.
  O callout é a conclusão do slide, não um rodapé fixo.
- Varie o fecho: `.callout`, `.notice.closer`, `.panel.closer`,
  `.quote.closer` ou nenhum fecho. Um diagrama ou tabela pode terminar o
  slide sozinho.
- Use `.stack` ao combinar um grid de texto (`two-col`, `cards`) com um
  diagrama, tabela ou fecho. Sem isso, o diagrama é empurrado para o rodapé.
- A cada quatro ou cinco slides, abra um `section-divider` ou um slide
  full-bleed (`title` escuro ou `quote`).
- Use componentes de dados quando o conteúdo tiver números, critérios ou
  comparação: `.stats`, tabela, `.compare-table`, `.matrix`, `.equation`.
- `checklist` é para critérios já cumpridos, não para perguntas em aberto.
  Exercícios usam `cards` ou lista.
- `notice` é ressalva ou escopo; `panel` é contexto ou trade-off; `quote`
  é tese ou citação. Não troque um pelo outro só para variar a cor.

## Diagramas técnicos

Use somente diagramas técnicos. Não use raster, fotos ou banco de imagens.

- Use CSS (`flow`, `cards`, `steps`) para relações simples de 3–5 elementos.
- Use SVG inline quando a posição ou a estrutura importar: CPU, memória,
  barramento, paginação, estados, hierarquia.
- SVG externo via `<img>` não carrega as fontes self-hosted; para diagramas
  com texto, embuta o SVG no slide.
- O modelo vem do brief (`## Diagramas Técnicos`). Se não houver modelo,
  marque `[DIAGRAMA NECESSÁRIO]` e pergunte; não invente a topologia.
- Siga a skill `slide-visuals` e use `scripts/diagram-kit.mjs` para manter
  paleta, traço e tipografia.
- Todo diagrama precisa de `alt` (a relação, não "diagrama") e legenda.
- Revise o PDF: rótulos legíveis, sem sobreposição, figura dentro da área útil.
- No preview do VS Code, use `markdown.marp.html: "all"`; o padrão não inclui
  SVG inline. O export já passa `--html`.

## Regras factuais e editoriais

- Nunca invente estatísticas, citações, nomes, resultados ou referências.
- Dados relevantes devem ter fonte no próprio slide ou na seção de referências.
- Marque informação ausente como `[DADO NECESSÁRIO]`.
- Diferencie fato, hipótese, exemplo e recomendação.
- Explique siglas na primeira ocorrência.
- Use negrito para termos-chave, não para parágrafos inteiros.
- Não coloque o roteiro completo da fala no slide.
- Toda imagem deve ter `alt`, fonte e licença quando aplicável.

## Regras técnicas do Marp

Use este front matter em cada deck:

```yaml
---
marp: true
theme: campus-dev
size: 16:9
paginate: true
html: true
footer: 'DISCIPLINA · SEMESTRE'
---
```

- Use Markdown para texto, listas e tabelas.
- Use HTML para grids, cards, painéis e layouts visuais.
- Use caminhos relativos para assets, por exemplo
  `../assets/diagrama.svg` a partir de `slides/decks/`.
- Não use imagens remotas.
- Não dependa de JavaScript, bibliotecas externas ou fontes instaladas no
  sistema.
- Não altere o CSS do tema para resolver um caso isolado de um deck.
- Não use classes que não estejam documentadas em `slides/COMPONENTS.md` ou
  definidas em `themes/campus-dev.css`.
- Prefira uma classe existente a um bloco `_style`.
- Quando `_style` for inevitável, limite-o ao slide atual.
- Para fechar um slide com algo que não seja callout, use `.closer` no
  elemento: `class="notice closer"`, `class="panel c-teal closer"` ou
  `class="quote closer"`.
- Ao agrupar texto e diagrama, use `.stack`; dentro dele, `two-col` e
  `cards` não esticam e o diagrama acompanha o texto.
- Para diagramas técnicos, use SVG inline; não use raster, foto ou banco de
  imagens. O tema escala `.media svg`, `.image-card svg` e `.media-slot svg`.

## Assets

Coloque assets em `slides/assets/` e siga estas convenções:

- nomes minúsculos com hífen: `arquitetura-agente.svg`;
- SVG para diagramas, logos e ícones;
- PNG/JPG apenas para imagens rasterizadas;
- nenhum asset temporário ou arquivo gerado;
- sempre inclua `alt` no HTML.

## Checklist de entrega

Antes de considerar o deck pronto:

- [ ] O arquivo está em `slides/decks/`.
- [ ] O front matter está correto.
- [ ] Cada slide tem uma tese clara.
- [ ] Os títulos são conclusivos ou orientam a leitura.
- [ ] Nenhuma imagem usa URL remota.
- [ ] Todos os assets locais existem.
- [ ] Não há classes desconhecidas.
- [ ] Não há placeholders esquecidos, exceto `[DADO NECESSÁRIO]` intencional.
- [ ] Tabelas, código e textos cabem na área útil.
- [ ] O título de conteúdo cabe em uma linha.
- [ ] O callout aparece em no máximo ~40% dos slides e nunca três seguidos.
- [ ] O deck usa pelo menos três estruturas principais diferentes.
- [ ] Os fechos variam entre callout, notice, panel, quote ou nenhum.
- [ ] Nenhum `_style` foi usado para espaçamento, fonte ou paginação.
- [ ] Toda tabela tem cabeçalho em todas as colunas.
- [ ] Nenhuma resposta esperada, nota de condução ou critério de avaliação aparece no slide.
- [ ] Os diagramas previstos no brief foram produzidos e estão no slide certo.
- [ ] Diagramas técnicos usam SVG inline, sem raster.
- [ ] Todo diagrama tem `alt`, legenda e rótulos legíveis no PDF.
- [ ] `npm run validate -- --input <arquivo>` passa.
- [ ] `npm run audit:assets` passa.
- [ ] `npm run audit:visual` passa (ou só os avisos esperados).
- [ ] O PDF foi exportado e revisado visualmente (fontes, paginação,
      tabelas e vazios).

## Quando criar componente novo

Crie um componente novo somente se:

1. o padrão aparece em pelo menos dois slides do mesmo deck ou em dois decks;
2. nenhum componente existente expressa a intenção sem hacks;
3. o componente recebe nome semântico e exemplo no catálogo;
4. o CSS inclui uma regra de uso e o validador continua passando.

Caso contrário, componha os elementos existentes no próprio slide.

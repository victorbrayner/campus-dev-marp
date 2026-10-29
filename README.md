# Campus Dev — Marp Boilerplate

Boilerplate para criação de apresentações em Markdown com **Marp**, dirigido a
geração de slides por agentes de IA. Preserve o tema visual `campus-dev`
(origem: padrão "Harness Engineering na Prática"), com um catálogo de
componentes reutilizáveis, validação e exportação por scripts.

O fluxo de trabalho é pensado para um agente gerar decks de aula a partir de um
roteiro original, passando por um brief estruturado (veja
[`AGENTS.md`](AGENTS.md) e [`SLIDES_AGENT.md`](SLIDES_AGENT.md)).

## Estrutura

```text
campus-dev-marp/
├── AGENTS.md                  # regras operacionais para agentes (índice)
├── SLIDES_AGENT.md            # especificação completa do fluxo editorial/visual
├── package.json
├── marp.config.mjs
├── scripts/
│   ├── export-slides.mjs      # HTML/PDF/PPTX via Marp CLI
│   ├── validate-slides.mjs    # front matter, classes, assets, alt, imagens remotas
│   ├── audit-assets.mjs       # referências de assets
│   ├── audit-visual.mjs       # overflow/densidade/títulos via Chrome ou Edge
│   └── diagram-kit.mjs        # paleta/traço para SVG inline
├── briefs/
│   └── _template.md           # contrato de brief (arquivos reais ficam local)
├── slides/
│   ├── template.md            # catálogo com exemplos — não usar como deck
│   ├── COMPONENTS.md          # catálogo compacto de componentes
│   ├── decks/                 # apresentações reais
│   └── assets/                # SVGs e imagens locais
├── themes/
│   ├── campus-dev.css         # tema com fontes embutidas (data URI base64)
│   └── fonts/                 # fontes em woff2 (referência)
└── .vscode/
    └── settings.json          # registra o tema no Marp for VS Code
```

## Uso no VS Code

1. Abra **a pasta raiz do projeto** no VS Code.
2. Instale a extensão **Marp for VS Code** (o `.vscode/extensions.json` sugere).
3. Abra `slides/template.md` para consultar o catálogo e o preview do Marp.
4. O workspace registra `themes/campus-dev.css` via
   `markdown.marp.themes`.
5. Decks reais vão em `slides/decks/` com o nome
   `AAAA-MM-DD--titulo-da-aula.md` (minúsculas, sem acentos, palavras separadas
   por hífen).

Front matter padrão:

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

## Fontes

As fontes (Oswald, Roboto Mono e Carlito — substituta métrica do Calibri) estão
**embutidas no tema em data URI base64** dentro de `campus-dev.css`. PDF, PNG e
HTML exportados não dependem de caminhos relativos nem de fontes instaladas no
sistema. As cópias em `themes/fonts/` servem de referência e não são
referenciadas diretamente.

## Fluxo de produção (resumo)

Para gerar uma apresentação nova com um agente de IA, veja
[`SLIDES_AGENT.md`](SLIDES_AGENT.md) para a versão completa:

1. O roteiro original (material do professor) é salvo em `briefs/` — **essa
   pasta é local e não é versionada**, exceto `_template.md`.
2. O agente modela o brief a partir de `briefs/_template.md`, separando a
   condução do professor do conteúdo do aluno.
3. O deck é criado em `slides/decks/` com os componentes de
   [`slides/COMPONENTS.md`](slides/COMPONENTS.md).
4. Validação e exportação (abaixo). O PDF é revisado visualmente antes de
   entregar.

## Validação e exportação

```bash
npm install
```

Valide o catálogo ou um deck específico:

```bash
npm run validate
npm run validate -- --input slides/decks/seu-deck.md
```

Auditorias complementares (assets e renderização):

```bash
npm run audit:assets -- slides/decks/seu-deck.md
npm run audit:visual -- slides/decks/seu-deck.md   # usa Chrome ou Edge; defina CHROME_PATH se preciso
```

Exportação para HTML, PDF ou PPTX (saída em `dist/`, não versionada):

```bash
npm run export:html -- --input slides/decks/seu-deck.md
npm run export:pdf  -- --input slides/decks/seu-deck.md
npm run export:pptx -- --input slides/decks/seu-deck.md
```

Notas técnicas:

- `--allow-local-files` é usado apenas nas exportações PDF/PPTX para carregar os
  assets locais confiáveis deste repositório.
- `--html` é passado no export porque o front matter `html: true` sozinho não
  habilita HTML/SVG inline no renderer.
- `marp.config.mjs` registra `themes/` como `themeSet`; não é necessário
  repetir `--theme-set`.

## Regras de ouro

- Não edite `slides/template.md` para uma apresentação real — ele é catálogo.
- Não mova `campus-dev.css` sem mover a pasta `themes/fonts/` (ou re-embede as
  fontes em base64), caso um dia as fontes voltem a ser referenciadas por
  caminho relativo.
- Mantenha a pasta raiz aberta no VS Code para que o caminho
  `./themes/campus-dev.css` do `.vscode/settings.json` resolva.
- Não versione roteiros reais em `briefs/` nem nada gerado em `dist/`.

## Licença

Distribuído sob a [licença MIT](LICENSE).

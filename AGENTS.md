# Instruções do Projeto

Este repositório é uma base para criação de apresentações Marp por agentes de
IA. Antes de criar ou editar um deck, leia `SLIDES_AGENT.md`.

Regras operacionais:

- Ao modelar um brief a partir do roteiro original ou ao criar/editar um deck, carregue a skill `humanizer` (`.opencode/skills/humanizer/SKILL.md`) e aplique seus padrões ao texto do brief e dos slides, dentro das restrições de densidade e estilo de `SLIDES_AGENT.md`.
- As pastas `briefs/` (exceto `_template.md`) e `model/` contêm material do professor e não são versionadas no repositório público.
- Ao criar ou editar um deck com diagramas, carregue a skill `slide-visuals` (`.opencode/skills/slide-visuals/SKILL.md`) e use SVG inline; não use raster.
- O roteiro original é material do professor. O brief separa a condução (não exibida) do conteúdo do aluno; os slides não levam respostas esperadas, notas de quadro ou critérios de avaliação.

- `slides/template.md` é um catálogo de componentes e não deve ser usado como
  arquivo de uma apresentação real.
- Decks gerados devem ficar em `slides/decks/`.
- Nomeie cada deck final no formato `AAAA-MM-DD--titulo-da-aula.md`, usando a
  data e o título do roteiro e convertendo o título para minúsculas, sem acentos
  e com palavras separadas por hífen.
- Assets locais devem ficar em `slides/assets/`.
- Consulte `slides/COMPONENTS.md` antes de inventar um layout novo.
- Execute `npm run validate` depois de editar um deck.
- Execute `npm run export:html -- --input slides/decks/seu-deck.md` quando precisar
  conferir a exportação.
- Execute `npm run preview -- --input slides/decks/seu-deck.md` para renderizar
  cada slide em PNG (`dist/previews/`) e revisar visualmente antes do PDF.
- O `npm run audit:visual` também mede a densidade dos decks (o catálogo
  `slides/template.md` fica fora): avisa quando o vazio entre o conteúdo e o
  fecho passa de 250 px ou quando o fecho cola no conteúdo.
- Não remova alterações existentes para resolver problemas não relacionados.

## Metadados recorrentes

Use estes valores nos decks, salvo indicação diferente no roteiro:

- autor e byline: **Prof. Victor Brayner**, com a linha secundária
  `ads · <semestre>`;
- rodapé do front matter: `'DISCIPLINA · UNIDADE X'`, em caixa alta;
- semestre corrente: 2026.2.

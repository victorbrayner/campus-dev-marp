# Briefing de Aula Para Geração de Slides

Salve o roteiro original em `briefs/<aula>-original.md` e peça ao agente para
gerar o brief. Este arquivo é o contrato que o agente preenche; você não precisa
copiar um template nem colar o roteiro. Deixe `[PREENCHER]` quando ainda não
souber uma informação. O agente deve perguntar apenas quando a ausência impedir uma
decisão importante; não deve inventar dados.

> **Roteiro original x brief modelado.** O roteiro original fica em
> `briefs/<aula>-original.md`. O agente lê o original, cria o brief a partir
> deste template e só então gera o deck. O brief é o contrato revisável; o
> roteiro original é a fonte.
>
> **O roteiro é do professor; o slide é do aluno.** Fala de abertura,
> respostas esperadas, tempo, desenhos de quadro, cuidados e critérios de
> avaliação ficam em `Condução do Professor (não exibir)`. O slide recebe
> conceito, exemplo, diagrama, pergunta sem resposta, instrução de atividade
> e síntese.

## Metadados

```yaml
title: "[PREENCHER]"
subtitle: "[PREENCHER ou deixe vazio]"
language: pt-BR
audience: "[PREENCHER: público e nível de conhecimento]"
discipline: "[PREENCHER]"
author: "[PREENCHER]"
duration_minutes: 45
target_slides: 12
output: slides/decks/AAAA-MM-DD--titulo.md
tone: "técnico, direto e claro"
visual_style: "claro, denso e institucional"
date: "[PREENCHER]"
status: draft
```

Valores recomendados para `status`: `draft`, `ready`, `review` ou `approved`.

## Instrução Para o Agente

Gere uma apresentação Marp a partir deste briefing.

Leia antes de executar:

- `SLIDES_AGENT.md`;
- `slides/COMPONENTS.md`;
- os arquivos listados em `Fontes` e `Assets`.

Crie o resultado em `output`. Não edite `slides/template.md`, pois ele é
apenas o catálogo de componentes.

Se houver informação essencial ausente, faça perguntas objetivas antes de
gerar. Se a informação for secundária, use `[DADO NECESSÁRIO]` e continue.

Não transporte `Condução do Professor (não exibir)` para os slides. Quando o
roteiro trouxer “pergunta + resposta”, a pergunta pode ir ao slide; a resposta
fica no brief. Aplique a skill `humanizer` ao brief e ao texto dos slides.

## Objetivo da Aula

### Contexto

[Explique por que esta aula existe, qual problema motivou o conteúdo e em que
parte do curso ela se encaixa.]

### Tese Central

[Escreva em uma frase a ideia que deve permanecer depois da apresentação.]

### Resultado Esperado

Ao final, o público deve conseguir:

- [verbo observável + resultado];
- [verbo observável + resultado];
- [verbo observável + resultado].

### Pré-requisitos

- [conhecimento ou aula anterior];
- [ferramenta, conceito ou contexto necessário].

## Estrutura Narrativa

Use esta seção para definir o argumento. O agente pode reorganizar a ordem se
isso melhorar a clareza, mas deve preservar a tese e os conteúdos obrigatórios.

1. [Contexto ou problema]
2. [Conceito ou modelo mental]
3. [Mecanismo, evidência ou comparação]
4. [Aplicação, decisão ou consequência]
5. [Síntese e próximo passo]

## Condução do Professor (não exibir)

> Esta seção orienta a fala, o quadro e a correção. O agente não a transporta
> para os slides.

### Cronograma

| Tempo | Etapa | Intenção |
|---|---|---|
| [PREENCHER] | [PREENCHER] | [PREENCHER] |

### Fala de abertura

[PREENCHER]

### Perguntas e respostas esperadas

- **Pergunta:** [PREENCHER]  
  **Resposta:** [PREENCHER]

### Desenhos de quadro

- [PREENCHER: o que desenhar, em que momento e com quais rótulos]

### Cuidados didáticos

- [PREENCHER: erros comuns, simplificações, o que não afirmar]

### Critérios de avaliação

- [ ] [PREENCHER]

## Conteúdo Obrigatório

Inclua os seguintes pontos, mesmo que seja necessário dividir em vários slides:

- **[Conceito 1]**: [definição ou mensagem esperada];
- **[Conceito 2]**: [definição ou mensagem esperada];
- **[Exemplo]**: [o que deve ser demonstrado];
- **[Aplicação]**: [como o público usa esse conhecimento].

## Conteúdo Opcional

Pode ser incluído se houver espaço e se não prejudicar a tese:

- [ponto opcional];
- [exemplo adicional];
- [comparação ou aprofundamento].

## Conteúdo Proibido ou Fora de Escopo

Não inclua:

- [tema que não pertence a esta aula];
- [produto, abordagem ou opinião que não deve ser promovido];
- estatísticas, citações ou resultados não fornecidos por uma fonte;
- conteúdo avançado demais para o público definido.

## Dados e Evidências

Use esta tabela para separar afirmações verificáveis de exemplos didáticos.

| Afirmação ou número | Tipo | Fonte | Pode resumir? |
|---|---|---|---|
| [PREENCHER] | fato / exemplo / hipótese | [PREENCHER] | sim / não |
| [PREENCHER] | fato / exemplo / hipótese | [PREENCHER] | sim / não |

Regras adicionais para dados:

- não arredondar ou alterar números sem indicar a aproximação;
- não apresentar hipótese como fato;
- incluir fonte no slide ou no slide de referências quando a afirmação for
  relevante para a conclusão.

## Exemplos, Código e Demonstrações

### Exemplo Principal

[Descreva o caso que melhor explica a ideia.]

### Código

Linguagem: `[PREENCHER]`

Objetivo do trecho:

[O que o código deve provar ou tornar visível?]

Restrições:

- mostrar somente o trecho essencial;
- não usar código fictício como se fosse produção;
- explicar a leitura ao lado do código quando necessário.

### Exercício ou Pergunta

[Opcional: pergunta para discussão, exercício ou decisão do público.]

## Preferências de Composição

Estas preferências orientam o agente, mas não substituem a escolha baseada no
conteúdo.

- Slide de abertura: `title` escuro / `title light` / indiferente.
- Divisor de seção: sim / não.
- Cards: usar para [conceitos, sintomas, etapas, alternativas].
- Processo: usar `flow`, `flow.outline`, `steps` ou indiferente.
- Comparação: tabela / matriz / cards / indiferente.
- Evidência visual: diagrama técnico (SVG inline) / código / indiferente.
- Encerramento: `title` escuro / síntese clara.
- Cores preferidas: [PREENCHER ou deixe o agente escolher].

Limites visuais específicos:

- [exemplo: não usar mais de duas cores de accent por slide];
- [exemplo: priorizar diagramas em vez de listas];
- [exemplo: reservar um slide para a conclusão];
- [exemplo: não usar raster; diagramas técnicos em SVG inline].

## Diagramas Técnicos

Use apenas diagramas técnicos em **SVG inline**. Não use raster, foto ou banco
de imagens. Para relações simples de 3–5 elementos, prefira os componentes CSS
(`flow`, `cards`); use SVG quando a posição ou a estrutura importar (CPU,
memória, barramento, estados, hierarquia).

Preencha uma seção por diagrama:

### Diagrama: [nome]
- **Slide:** [número ou seção]
- **Prioridade:** obrigatório / opcional
- **Mostra:** [relação que o diagrama deve tornar visível]
- **Modelo:** [ASCII ou lista de nós e relações]
- **Rótulos:** [termos que devem aparecer]
- **Alt:** [descrição da relação, não "diagrama"]
- **Legenda:** [o que o aluno deve observar]
- **Fonte:** [brief/autoral]

Regras:

- o modelo define a topologia; o agente cuida do layout e do estilo;
- se o conceito precisa de diagrama e não houver modelo, escreva
  `[DIAGRAMA NECESSÁRIO]`; não invente a topologia;
- todo diagrama precisa de `alt` e legenda;
- o texto do diagrama é SVG (não rasterizado).

Exemplo mínimo de modelo:

```text
[CPU 1] ─┐
         ├── barramento ── [memória principal]
[CPU 2] ─┘
```

## Fontes

Liste aqui livros, artigos, documentação, URLs, PDFs ou arquivos locais. O
agente deve preferir fontes fornecidas neste briefing às próprias suposições.

- `[caminho relativo ou URL da fonte]` — [o que consultar];
- `[caminho relativo ou URL da fonte]` — [o que consultar].

Se a fonte estiver em um arquivo separado, prefira colocá-la junto deste brief
em uma pasta temática, por exemplo `briefs/minha-aula/fontes.md`.

## Assets Disponíveis

Esta seção é para assets **existentes** (logos, ícones, imagens). Diagramas
técnicos são SVG inline e ficam em `## Diagramas Técnicos`.

Todos os assets usados no deck devem estar em `slides/assets/` ou em uma pasta
de assets autorizada pelo projeto.

| Arquivo | Tipo | Uso | Créditos/licença |
|---|---|---|---|
| `slides/assets/[arquivo.svg]` | logo / ícone | [PREENCHER] | [PREENCHER] |
| `slides/assets/[arquivo.png]` | imagem | [PREENCHER] | [PREENCHER] |

Regras:

- não usar imagens remotas;
- não usar raster para diagramas técnicos;
- não criar um placeholder que pareça evidência real;
- incluir texto alternativo para toda imagem;
- informar fonte e licença quando aplicável.

## Referências e Créditos

Texto que deve aparecer no deck:

- [PREENCHER]

Texto que pode permanecer apenas nas notas ou no arquivo de fontes:

- [PREENCHER]

## Critérios de Aceitação

Considere o deck pronto somente quando:

- [ ] a tese central aparece com clareza;
- [ ] todos os conteúdos obrigatórios foram cobertos;
- [ ] o nível de linguagem corresponde ao público;
- [ ] os títulos orientam a conclusão de cada slide;
- [ ] o deck não contém dados inventados;
- [ ] cada imagem tem `alt` e asset local existente;
- [ ] todos os diagramas obrigatórios foram produzidos e estão no slide certo;
- [ ] diagramas técnicos usam SVG inline, sem raster;
- [ ] os diagramas têm rótulos legíveis, `alt` e legenda;
- [ ] o deck usa componentes documentados;
- [ ] o número de slides é compatível com a duração;
- [ ] a apresentação passa em `npm run validate -- --input [arquivo]`;
- [ ] o HTML, PDF ou PPTX foi exportado e revisado visualmente.

## Perguntas Que o Agente Pode Fazer

Se ainda houver ambiguidade, priorize perguntas nesta ordem:

1. Qual é o público e o nível de conhecimento?
2. Qual é a tese central?
3. Qual é o resultado esperado da aula?
4. Quais dados e fontes são autorizados?
5. Qual é a duração ou quantidade desejada de slides?
6. Existe algum conteúdo obrigatório ou proibido?

Não interrompa a geração por preferências cosméticas que o catálogo já resolve.

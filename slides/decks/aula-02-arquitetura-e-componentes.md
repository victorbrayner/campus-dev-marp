---
marp: true
theme: campus-dev
size: 16:9
paginate: true
html: true
footer: 'ARQUITETURA COMPUTACIONAL · UNIDADE I'
---

<!-- _class: title -->

<div class="eyebrow">ARQUITETURA COMPUTACIONAL · AULA 02</div>

# Arquitetura de computadores
# e seus componentes

<p class="subtitle">Como os principais componentes se organizam e trabalham juntos.</p>

<div class="byline">
  <strong>Prof. Victor Brayner</strong>
  <span>ads · 1º período</span>
</div>


---

<!-- _class: accent-purple -->

<div class="eyebrow">O PONTO DE PARTIDA</div>

# O computador do dia a dia esconde um sistema

<p class="subtitle">Notebook, desktop e smartphone são formatos diferentes de uma mesma organização.</p>

<div class="two-col">
  <div class="col">
    <span class="label">O que você usa todos os dias</span>
    <p>Celular, notebook e desktop parecem máquinas bem diferentes. As tarefas básicas, no entanto, se repetem nos três.</p>
    <ul class="list tight">
      <li>Você toca, digita ou fala: a informação entra.</li>
      <li>O aparelho calcula e decide: algo processa.</li>
      <li>As fotos continuam lá amanhã: algo guarda.</li>
      <li>A resposta aparece na tela ou no som: algo devolve.</li>
    </ul>
  </div>
  <div class="col">
    <span class="label">O modelo simplificado</span>
    <p>O senso comum resume o computador a "processador + tela". O modelo ajuda a usar a máquina, mas deixa de fora o resto.</p>
    <ul class="list tight">
      <li>De onde vêm as informações antes do processamento.</li>
      <li>Onde os dados ficam enquanto o programa roda.</li>
      <li>O que continua guardado depois de desligar.</li>
    </ul>
  </div>
</div>

<div class="callout">
  <span class="tag">HOJE</span>
  Construímos um modelo completo: cinco funções que qualquer sistema computacional cumpre e os componentes que as realizam.
</div>


---

<div class="eyebrow">CONCEITO</div>

# Arquitetura é a organização do sistema

<div class="two-col">
  <div class="col">
    <span class="label">A área</span>
    <p>Arquitetura computacional é a área que estuda a <strong>organização dos componentes</strong> de um sistema computacional e a <strong>maneira como eles trabalham em conjunto</strong>.</p>
    <ul class="list tight">
      <li>Organização: como as partes se encaixam no conjunto.</li>
      <li>Funções: o que cada parte é responsável por fazer.</li>
      <li>Relações: como as partes trocam informação.</li>
    </ul>
  </div>
  <div class="col">
    <span class="label">Fora do foco desta aula</span>
    <p>Alguns assuntos parecem arquitetura, mas não são o que a disciplina procura aqui.</p>
    <ul class="list tight">
      <li>Catálogo de peças e comparação de marcas.</li>
      <li>Montagem de computador.</li>
      <li>Números de desempenho comercial.</li>
    </ul>
  </div>
</div>

<div class="callout">
  <span class="tag">DEFINIÇÃO</span>
  A pergunta que guia a disciplina: quem faz o quê, e como os componentes trabalham juntos?
</div>


---

<!-- _class: section-divider -->

<div class="part">PARTE 01 / 03</div>

# A visão funcional

<div class="topic-list cols-3">
  <div class="topic"><span class="n">01</span><span>O modelo de cinco funções</span></div>
  <div class="topic"><span class="n">02</span><span>Exemplos do cotidiano</span></div>
  <div class="topic"><span class="n">03</span><span>O que o modelo simplifica</span></div>
</div>

---

<div class="eyebrow">VISÃO GERAL</div>

# Cinco funções organizam o sistema

<div class="flow">
  <div class="node">
    <h3>Entrada</h3>
    <p>teclado · mouse · microfone</p>
  </div>
  <div class="node">
    <h3>Processamento</h3>
    <p>CPU, a unidade central de processamento</p>
  </div>
  <div class="node">
    <h3>Saída</h3>
    <p>monitor · alto-falantes</p>
  </div>
</div>

<span class="label">Sustentam o processamento</span>

<div class="flow">
  <div class="node">
    <h3>Memória</h3>
    <p>o que a CPU usa durante a execução</p>
  </div>
  <div class="node">
    <h3>Armazenamento</h3>
    <p>arquivos e programas que sobrevivem ao desligamento</p>
  </div>
</div>

<div class="callout">
  <span class="tag">MODELO</span>
  O esquema é uma simplificação didática: serve para organizar o raciocínio antes de olhar cada componente em detalhe.
</div>


---

<!-- _class: section-divider -->

<div class="part">PARTE 02 / 03</div>

# Os componentes

<div class="topic-list cols-3">
  <div class="topic"><span class="n">01</span><span>Entrada</span></div>
  <div class="topic"><span class="n">02</span><span>Processamento</span></div>
  <div class="topic"><span class="n">03</span><span>Memória principal</span></div>
  <div class="topic"><span class="n">04</span><span>Armazenamento</span></div>
  <div class="topic"><span class="n">05</span><span>Saída</span></div>
</div>

---

<div class="eyebrow">COMPONENTE · ENTRADA</div>

# Entrada: a informação que chega ao sistema

<div class="stack">
  <div class="two-col">
    <div class="col">
      <span class="label">A função</span>
      <p>Dispositivos de entrada permitem que o usuário e o ambiente forneçam informações ao sistema. Sem entrada, o sistema não tem sobre o que trabalhar.</p>
      <p class="muted">O teclado, por exemplo, não calcula nada: ele entrega caracteres para o resto do sistema usar.</p>
    </div>
    <div class="col">
      <span class="label">Exemplos</span>
      <div class="tag-list">
        <span class="tag-chip">TECLADO</span>
        <span class="tag-chip">MOUSE</span>
        <span class="tag-chip">MICROFONE</span>
        <span class="tag-chip">CÂMERA</span>
        <span class="tag-chip">SENSORES</span>
      </div>
      <p class="muted small">No smartphone, a tela de toque e o microfone também são entrada. Sensores mostram que a informação pode vir do ambiente, sem uma pessoa digitando.</p>
    </div>
  </div>

  <div class="flow outline">
    <div class="node">
      <h3>Mundo</h3>
      <p>Pessoa, ambiente ou outro sistema.</p>
    </div>
    <div class="node c-blue">
      <h3>Entrada</h3>
      <p>Converte a informação em dados.</p>
    </div>
    <div class="node">
      <h3>Sistema</h3>
      <p>Recebe os dados para processar.</p>
    </div>
  </div>
</div>

<div class="callout">
  <span class="tag">REGRA</span>
  Informação chegando ao sistema passa pela entrada. Processar essa informação é trabalho de outro componente.
</div>


---

<!-- _class: accent-purple -->

<div class="eyebrow">COMPONENTE · PROCESSAMENTO</div>

# A CPU executa e coordena as instruções

<div class="two-col">
  <div class="col">
    <span class="label">O papel do processamento</span>
    <p>Processar é executar operações sobre dados e instruções: somar, comparar, transferir informação, decidir o próximo passo.</p>
    <p>A <strong>unidade central de processamento (CPU)</strong> é o componente responsável por esse trabalho.</p>
  </div>
  <div class="col">
    <span class="label">Dentro da CPU</span>
    <ul class="list dash">
      <li><strong>Unidade de controle</strong>: coordena o que deve ser feito e em que ordem.</li>
      <li><strong>Unidade de processamento (ALU, a unidade lógica e aritmética)</strong>: realiza cálculos e comparações.</li>
    </ul>
  </div>
</div>

<div class="callout">
  <span class="tag">PRÓXIMA AULA</span>
  Como a CPU busca, interpreta e executa cada instrução, passo a passo, é o tema da Aula 03: o ciclo de instrução.
</div>


---

<!-- _class: accent-teal -->

<div class="eyebrow">COMPONENTE · MEMÓRIA PRINCIPAL</div>

# Os dados da execução ficam na memória

<div class="two-col">
  <div class="col">
    <span class="label">A função</span>
    <p>A memória principal mantém, temporariamente, os dados e as instruções necessários enquanto o sistema executa um programa.</p>
    <p>Na prática, essa função cabe à <strong>RAM, a memória de acesso aleatório</strong>.</p>
    <p class="muted">Ao desligar o sistema, o que estava na RAM se perde.</p>
  </div>
  <div class="col">
    <span class="label">Exemplo</span>
    <div class="quote">
      <span class="text">Ao abrir um programa, seus dados e instruções precisam estar disponíveis para serem utilizados durante a execução.</span>
    </div>
    <p class="muted small">Por isso a RAM costuma ser descrita como a memória de trabalho do sistema.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">GUARDE</span>
  Memória principal é para o trabalho corrente. Guardar de forma permanente é papel do armazenamento, comparado no próximo slide.
</div>


---

<div class="eyebrow">COMPONENTE · ARMAZENAMENTO</div>

# Dois papéis: memória e armazenamento

<p>SSD (unidade de estado sólido) e HDD (disco rígido) guardam arquivos e programas de forma persistente, inclusive com o computador desligado.</p>

| Aspecto | Memória principal | Armazenamento |
|---|---|---|
| Papel | sustenta a execução | guarda de forma persistente |
| O que mantém | dados e instruções em uso | arquivos e programas |
| Exemplos | RAM | SSD · HDD |
| Ao desligar | o conteúdo se perde | o conteúdo permanece |

<div class="callout">
  <span class="tag">MENSAGEM</span>
  O armazenamento mantém informações mesmo quando o sistema é desligado; a memória principal serve ao trabalho corrente do sistema.
</div>


---

<!-- _class: accent-orange -->

<div class="eyebrow">COMPONENTE · SAÍDA</div>

# Saída devolve o resultado ao usuário

<div class="stack">
  <div class="two-col">
    <div class="col">
      <span class="label">A função</span>
      <p>Dispositivos de saída apresentam ao usuário ou ao ambiente os resultados produzidos pelo sistema. É o caminho de volta.</p>
      <p class="muted">A saída completa o ciclo: o que entrou, foi processado e precisa se tornar algo útil para quem está do outro lado.</p>
    </div>
    <div class="col">
      <span class="label">Exemplos</span>
      <div class="tag-list">
        <span class="tag-chip">MONITOR</span>
        <span class="tag-chip">IMPRESSORA</span>
        <span class="tag-chip">ALTO-FALANTES</span>
        <span class="tag-chip">ATUADORES</span>
      </div>
      <p class="muted small">Atuadores transformam resultado em ação sobre o ambiente, como uma fechadura eletrônica que libera a porta.</p>
    </div>
  </div>

  <div class="flow outline">
    <div class="node">
      <h3>Sistema</h3>
      <p>Produz o resultado do processamento.</p>
    </div>
    <div class="node c-orange">
      <h3>Saída</h3>
      <p>Apresenta o resultado ou age no ambiente.</p>
    </div>
    <div class="node">
      <h3>Mundo</h3>
      <p>Usuário ou ambiente recebe o resultado.</p>
    </div>
  </div>
</div>

<div class="callout">
  <span class="tag">FUNÇÃO</span>
  Saída representa as informações que deixam o sistema: texto na tela, som no alto-falante, papel na impressora.
</div>


---

<!-- _class: section-divider -->

<div class="part">PARTE 03 / 03</div>

# Integração

<div class="topic-list">
  <div class="topic"><span class="n">01</span><span>O caminho da informação</span></div>
  <div class="topic"><span class="n">02</span><span>O barramento</span></div>
  <div class="topic"><span class="n">03</span><span>Hardware × software</span></div>
  <div class="topic"><span class="n">04</span><span>Um exemplo completo</span></div>
</div>

---

<!-- _class: accent-teal -->

<div class="eyebrow">INTEGRAÇÃO</div>

# O caminho da informação une os blocos

<div class="flow outline">
  <div class="node"><h3>Usuário e ambiente</h3></div>
  <div class="node"><h3>Entrada</h3></div>
  <div class="node"><h3>Processamento</h3></div>
  <div class="node"><h3>Saída</h3></div>
  <div class="node"><h3>Usuário e ambiente</h3></div>
</div>

<span class="label">Sustentam o processamento</span>

<div class="flow outline">
  <div class="node"><h3>Memória</h3></div>
  <div class="node"><h3>Armazenamento</h3></div>
</div>

<div class="callout">
  <span class="tag">LEITURA</span>
  Nem toda operação percorre os cinco blocos nessa ordem. O caminho é um modelo para compreender responsabilidades e relações, não uma rota fixa.
</div>


---

<div class="eyebrow">INTEGRAÇÃO</div>

# Os componentes conversam por uma via comum

<div class="two-col">
  <div class="col">
    <span class="label">O que circula</span>
    <ul class="list dash">
      <li><strong>Dados</strong>: o conteúdo que está sendo transferido.</li>
      <li><strong>Controle</strong>: o que cada componente deve fazer e quando.</li>
      <li><strong>Endereços</strong>: onde está a informação buscada.</li>
    </ul>
  </div>
  <div class="col">
    <span class="label">Por onde circula</span>
    <p>Os componentes compartilham uma via de comunicação comum: o <strong>barramento</strong>. Por ela, a CPU pede dados da memória, o teclado entrega caracteres e o monitor recebe o resultado.</p>
    <p class="muted small">Pedidos típicos: "traga o número 25 da memória", "mostre o resultado na tela".</p>
  </div>
</div>

<div class="callout">
  <span class="tag">INTRODUÇÃO</span>
  Nesta aula, o barramento entra como ideia de comunicação entre os componentes. Tipos e detalhes de barramento ficam para outra hora.
</div>


---

<!-- _class: accent-purple -->

<div class="eyebrow">INTEGRAÇÃO</div>

# Software orienta, hardware executa

<div class="cards cols-2 no-stretch">
  <div class="card">
    <h3>Hardware</h3>
    <p>Os componentes físicos do sistema, aquilo que dá para tocar: CPU, memória, teclado, tela.</p>
  </div>
  <div class="card">
    <h3>Software</h3>
    <p>Os programas e as instruções que orientam o funcionamento do sistema, do sistema operacional à calculadora.</p>
  </div>
</div>

<div class="flow outline">
  <div class="node"><h3>Software</h3></div>
  <div class="node"><h3>Instruções</h3></div>
  <div class="node"><h3>Hardware</h3></div>
  <div class="node"><h3>Processamento</h3></div>
  <div class="node"><h3>Resultado</h3></div>
</div>

<div class="callout">
  <span class="tag">PARA LEVAR</span>
  O hardware fornece os recursos físicos; o software fornece as instruções que utilizam esses recursos.
</div>


---

<!-- _class: accent-orange -->

<div class="eyebrow">EXEMPLO INTEGRADOR</div>

# Digitar 25 + 17 aciona o sistema inteiro

<div class="steps">
  <div class="step">
    <span class="n">01</span>
    <h3>Entrada</h3>
    <p>O teclado envia os números e a operação ao sistema.</p>
  </div>
  <div class="step">
    <span class="n">02</span>
    <h3>Memória</h3>
    <p>Instruções e dados da calculadora ficam disponíveis durante a execução.</p>
  </div>
  <div class="step">
    <span class="n">03</span>
    <h3>Processamento</h3>
    <p>A CPU calcula a soma: 42.</p>
  </div>
  <div class="step">
    <span class="n">04</span>
    <h3>Saída</h3>
    <p>O monitor apresenta o resultado ao usuário.</p>
  </div>
</div>

<div class="notice">
  <span class="notice-title">E O ARMAZENAMENTO?</span>
  Se o resultado precisa ser guardado, o armazenamento entra em cena. Fora disso, a conta vive só na memória.
</div>

<p class="muted small" style="margin-top: auto;">O objetivo do exemplo é enxergar as funções em ação. Como a CPU executa cada instrução, passo a passo, é o assunto da próxima aula.</p>


---

<div class="eyebrow">DISCUSSÃO</div>

# Cinco perguntas para testar o modelo

<div class="two-col">
  <div class="col">
    <ol class="list ordered">
      <li>Se retirarmos a CPU, quais funções do modelo deixam de ser realizadas?</li>
      <li>Qual é a diferença entre guardar um arquivo no SSD e manter dados na RAM?</li>
      <li>Um monitor é entrada ou saída? Por quê?</li>
    </ol>
  </div>
  <div class="col">
    <ol class="list ordered" start="4">
      <li>O teclado processa o dado ou fornece uma entrada para o sistema?</li>
      <li>Por que precisamos de memória durante a execução de um programa?</li>
    </ol>
  </div>
</div>

<div class="callout">
  <span class="tag">COMO RESPONDER</span>
  Volte ao modelo dos cinco blocos e pergunte, para cada situação, quem faz o quê.
</div>


---

<!-- _class: title -->

<div class="eyebrow">SÍNTESE</div>

# Quem faz o quê,
# e como os componentes
# trabalham juntos

<p class="subtitle">Essa é a arquitetura computacional em uma frase. Próxima aula: a CPU e o ciclo de instrução, passo a passo.</p>

<div class="byline">
  <strong>Prof. Victor Brayner</strong>
  <span>arquitetura computacional · unidade I</span>
</div>


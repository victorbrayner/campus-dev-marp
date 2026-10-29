---
marp: true
theme: campus-dev
size: 16:9
paginate: true
html: true
footer: 'ARQUITETURA COMPUTACIONAL · UNIDADE I'
---

<!-- _class: title -->

<div class="eyebrow">ARQUITETURA COMPUTACIONAL · AULA 03</div>

# CPU e ciclo de instrução

<p class="subtitle">Como o processador executa instruções passo a passo.</p>

<div class="byline">
  <strong>Prof. Victor Brayner</strong>
  <span>ads · 1º período</span>
</div>

---

<!-- _class: accent-purple -->

<div class="eyebrow">O PONTO DE PARTIDA</div>

# A aula passada parou na porta da CPU

<p class="subtitle">Hoje a CPU ganha mecanismo: o ciclo que executa cada instrução.</p>

<div class="two-col">
  <div class="col">
    <span class="label">Onde paramos</span>
    <p>A Aula 02 organizou o computador em cinco funções e apresentou a <strong>unidade central de processamento (CPU)</strong> como responsável pelo processamento.</p>
    <ul class="list tight">
      <li>No exemplo da calculadora, a CPU apareceu em uma única etapa.</li>
      <li>Recebeu a conta 25 + 17 e devolveu 42.</li>
      <li>Como isso aconteceu por dentro, ficou sem resposta.</li>
    </ul>
  </div>
  <div class="col">
    <span class="label">As perguntas de hoje</span>
    <ul class="list tight">
      <li>O que exatamente significa processar?</li>
      <li>Como a CPU lê uma ordem que não está escrita em português?</li>
      <li>O que se repete do começo ao fim da execução?</li>
    </ul>
    <p class="muted small">A aula acompanha o mecanismo, sem entrar em fabricantes, modelos ou detalhes elétricos.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">HOJE</span>
  Abre-se a caixa: como a CPU busca, interpreta e executa cada instrução, em ciclo.
</div>

---

<!-- _class: section-divider -->

<div class="part">PARTE 01 / 03</div>

# A CPU

<div class="topic-list cols-3">
  <div class="topic"><span class="n">01</span><span>O papel da CPU</span></div>
  <div class="topic"><span class="n">02</span><span>Controle × processamento</span></div>
  <div class="topic"><span class="n">03</span><span>O esquema didático</span></div>
</div>

---

<div class="eyebrow">CONCEITO</div>

# Executar instruções é o trabalho da CPU

<div class="two-col">
  <div class="col">
    <span class="label">A função</span>
    <p>A CPU é o componente responsável pela execução das instruções dos programas. Cada instrução chega, é interpretada e produz um resultado.</p>
    <p class="muted">É aqui que o programa deixa de ser texto e passa a ser ação.</p>
  </div>
  <div class="col">
    <span class="label">O que chega à CPU</span>
    <ul class="list tight">
      <li>Um programa é uma sequência de instruções.</li>
      <li>As instruções ficam na memória enquanto o programa roda.</li>
      <li>Cabe à CPU executá-las, uma a uma.</li>
    </ul>
  </div>
</div>

<div class="flow outline">
  <div class="node"><h3>Programa</h3><p>o que será executado</p></div>
  <div class="node"><h3>Instruções</h3><p>operações codificadas</p></div>
  <div class="node"><h3>CPU</h3><p>busca · decodifica · executa</p></div>
  <div class="node"><h3>Resultado</h3><p>o efeito produzido</p></div>
</div>

<div class="callout">
  <span class="tag">DEFINIÇÃO</span>
  A CPU executa as instruções. O modo como cada uma é executada, passo a passo, é o tema do resto da aula.
</div>

---

<div class="eyebrow">DENTRO DA CPU</div>

# Controle comanda, processamento calcula

<div class="cards cols-2">
  <div class="card">
    <span class="n">01</span>
    <h3>Unidade de Controle</h3>
    <p>Coordena a sequência de operações necessárias à execução. Decide o que fazer, em que ordem, e aciona as demais partes. Nas três etapas do ciclo, é ela que mantém a ordem.</p>
  </div>
  <div class="card c-purple">
    <span class="n">02</span>
    <h3>Unidade de Processamento · ULA</h3>
    <p>A <strong>unidade lógica e aritmética (ULA)</strong> realiza as operações aritméticas e lógicas: somar, subtrair, comparar valores. Quando a instrução pede um cálculo, a resposta sai daqui.</p>
  </div>
</div>

<div class="notice">
  <span class="notice-title">REGISTRADORES</span>
  Pequenas áreas de armazenamento interno da CPU, muito rápidas. Guardam os valores que a ULA usa no momento de cada operação.
</div>

<div class="callout">
  <span class="tag">CONVENÇÃO</span>
  Daqui em diante: coordenação é trabalho da unidade de controle; cálculo e comparação, trabalho da ULA.
</div>

---

<!-- _class: accent-teal -->

<div class="eyebrow">O ESQUEMA</div>

# Memória entrega, controle coordena, ULA calcula

<div class="flow outline">
  <div class="node">
    <h3>Memória</h3>
    <p>instruções e dados</p>
  </div>
  <div class="node">
    <h3>Unidade de Controle</h3>
    <p>interpreta e aciona</p>
  </div>
  <div class="node">
    <h3>Unidade de Processamento · ULA</h3>
    <p>cálculo e comparação</p>
  </div>
</div>

<span class="label">O que circula entre os blocos</span>

<ul class="list arrow">
  <li>Memória → unidade de controle: a instrução buscada.</li>
  <li>Unidade de controle → ULA: a definição da operação e dos dados.</li>
</ul>

<div class="callout">
  <span class="tag">ESQUEMA DIDÁTICO</span>
  Os dois blocos organizam o raciocínio desta aula. Uma CPU real contém mais componentes internos do que esse recorte mostra.
</div>

---

<!-- _class: section-divider -->

<div class="part">PARTE 02 / 03</div>

# Instruções e o ciclo

<div class="topic-list cols-3">
  <div class="topic"><span class="n">01</span><span>O que é uma instrução</span></div>
  <div class="topic"><span class="n">02</span><span>O ciclo em três etapas</span></div>
  <div class="topic"><span class="n">03</span><span>Busca</span></div>
  <div class="topic"><span class="n">04</span><span>Decodificação</span></div>
  <div class="topic"><span class="n">05</span><span>Execução</span></div>
  <div class="topic"><span class="n">06</span><span>A repetição</span></div>
</div>

---

<div class="eyebrow">CONCEITO</div>

# Instrução é um comando codificado que a CPU interpreta

<div class="two-col">
  <div class="col">
    <span class="label">A definição</span>
    <p>Uma <strong>instrução</strong> é um comando codificado que especifica uma operação a ser realizada.</p>
    <p class="muted">Codificado significa escrito na forma que a CPU reconhece, não na nossa.</p>
  </div>
  <div class="col">
    <span class="label">O repertório da CPU</span>
    <p>O repertório é um conjunto fixo de operações: somar, carregar, armazenar, comparar. Frase humana não faz parte dele.</p>
    <p class="muted small">É assim que o software, visto na Aula 02, chega ao hardware: em forma de instruções.</p>
  </div>
</div>

<div class="equation">instrução = código da operação + dados da operação</div>

<div class="callout">
  <span class="tag">PARA FIXAR</span>
  "Some 5 e 3" é a frase de quem programa. Para a CPU existe uma instrução codificada que significa essa soma.
</div>

---

<!-- _class: accent-teal -->

<div class="eyebrow">O CICLO</div>

# Toda instrução passa por três etapas

<div class="flow">
  <div class="node">
    <h3>Memória</h3>
    <p>onde o programa está guardado</p>
  </div>
  <div class="node">
    <h3>Busca</h3>
    <p>obter a próxima instrução</p>
  </div>
  <div class="node">
    <h3>Decodificação</h3>
    <p>interpretar o que deve ser feito</p>
  </div>
  <div class="node">
    <h3>Execução</h3>
    <p>realizar a operação</p>
  </div>
</div>

<span class="label">DE VOLTA AO COMEÇO</span>

<ul class="list arrow">
  <li>Execução encerrada → nova busca na memória.</li>
  <li>Enquanto houver instrução → o ciclo continua.</li>
  <li>Fim do programa → o ciclo para.</li>
</ul>

<div class="callout">
  <span class="tag">CICLO DE INSTRUÇÃO</span>
  Busca, decodificação e execução, repetidas enquanto o programa roda. Esse é o mecanismo por trás da execução.
</div>

---

<div class="eyebrow">ETAPA 01 · BUSCA (FETCH)</div>

# Busca: obter a próxima instrução na memória

<div class="stack">
  <div class="two-col">
    <div class="col">
      <span class="label">O que acontece</span>
      <p>A CPU obtém, na memória, a próxima instrução a executar. O programa continua inteiro na memória; a CPU puxa uma instrução de cada vez.</p>
      <p class="muted">A instrução buscada entra na CPU para ser interpretada na etapa seguinte.</p>
    </div>
    <div class="col">
      <span class="label">A marca do começo</span>
      <ul class="list tight">
        <li>A busca abre cada ciclo de instrução.</li>
        <li>Depois dela vêm a decodificação e a execução.</li>
        <li>Encerrada uma execução, a próxima busca já começa.</li>
      </ul>
    </div>
  </div>

  <div class="flow outline">
    <div class="node">
      <h3>Programa na memória</h3>
      <p>As instruções ficam armazenadas.</p>
    </div>
    <div class="node c-blue">
      <h3>Busca</h3>
      <p>A CPU puxa uma instrução por vez.</p>
    </div>
    <div class="node">
      <h3>CPU</h3>
      <p>A instrução entra para ser interpretada.</p>
    </div>
  </div>
</div>

<div class="callout">
  <span class="tag">TERMOS</span>
  Fetch, decode e execute são os nomes em inglês das três etapas. É assim que aparecem em livros e ferramentas.
</div>

---

<div class="eyebrow">ETAPA 02 · DECODIFICAÇÃO (DECODE)</div>

# Decodificação: descobrir o que a instrução manda fazer

<div class="two-col">
  <div class="col">
    <span class="label">O que acontece</span>
    <p>A CPU interpreta o código da instrução para determinar o que deve ser feito: qual a operação e quais os dados envolvidos.</p>
    <p class="muted">O código que chega é compacto. Sem essa leitura, a CPU não saberia qual operação realizar, nem sobre quais valores.</p>
  </div>
  <div class="col">
    <span class="label">Lendo a instrução da soma</span>
    <div class="tag-list">
      <span class="tag-chip">OPERAÇÃO: SOMA</span>
      <span class="tag-chip">DADOS: 5 · 3</span>
    </div>
    <p class="muted small">A decodificação separa a ação pedida das informações sobre as quais ela age.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">QUEM FAZ</span>
  A interpretação cabe à unidade de controle, que em seguida aciona a execução.
</div>

---

<div class="eyebrow">ETAPA 03 · EXECUÇÃO (EXECUTE)</div>

# Execução: realizar a operação indicada

<div class="two-col">
  <div class="col">
    <span class="label">O que acontece</span>
    <p>A CPU realiza a operação indicada pela instrução. Quando a operação é aritmética ou lógica, quem executa é a ULA.</p>
    <p class="muted">A unidade de controle continua coordenando; a operação, porém, é da unidade de processamento.</p>
  </div>
  <div class="col">
    <span class="label">O destino do resultado</span>
    <ul class="list tight">
      <li>O resultado fica disponível para a instrução seguinte.</li>
      <li>Quando o programa termina de usá-lo, pode ser guardado na memória.</li>
    </ul>
    <p class="muted small">Com isso, a terceira etapa fecha o ciclo: sobra iniciar a busca da próxima instrução.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">VARIAÇÃO</span>
  Nem toda instrução é cálculo: carregar um valor da memória e armazenar um resultado também são operações executadas.
</div>

---

<div class="eyebrow">REPETIÇÃO</div>

# O ciclo roda de novo a cada instrução

<div class="two-col">
  <div class="col">
    <span class="label">O programa visto de dentro</span>
    <p>Executar um programa é disparar o ciclo, instrução após instrução, na ordem em que estão guardadas na memória.</p>
    <ul class="list arrow">
      <li>Instrução 1 encerrada → busca da instrução 2.</li>
      <li>Instrução 2 encerrada → busca da instrução 3.</li>
      <li>Última instrução encerrada → programa concluído.</li>
    </ul>
  </div>
  <div class="col">
    <span class="label">Analogia · a receita</span>
    <p>Uma receita funciona de modo parecido: ordens em sequência, seguidas uma a uma, até o resultado ficar pronto.</p>
    <p class="muted">A comparação ajuda a fixar a repetição. Ela tem limites: a CPU não improvisa e não interpreta ordens em português.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">PARA LEVAR</span>
  Executar um programa é repetir o ciclo de instrução, do primeiro comando ao último.
</div>

---

<!-- _class: section-divider -->

<div class="part">PARTE 03 / 03</div>

# Integração

<div class="topic-list">
  <div class="topic"><span class="n">01</span><span>CPU e memória em cena</span></div>
  <div class="topic"><span class="n">02</span><span>O exemplo completo</span></div>
  <div class="topic"><span class="n">03</span><span>Perguntas para fixar</span></div>
</div>

---

<!-- _class: accent-teal -->

<div class="eyebrow">INTEGRAÇÃO</div>

# Sem memória, o ciclo fica sem o que buscar

<div class="two-col">
  <div class="col">
    <span class="label">O que a memória entrega</span>
    <p>Instruções e dados precisam estar disponíveis para a CPU durante toda a execução. Por isso a memória principal, a RAM da Aula 02, entra em cena a cada ciclo.</p>
    <p class="muted">Sem a instrução na memória, não há busca; sem o dado, não há o que calcular.</p>
  </div>
  <div class="col">
    <span class="label">O que circula</span>
    <ul class="list arrow">
      <li>CPU → memória: pedido da próxima instrução e dos dados.</li>
      <li>Memória → CPU: instrução buscada e valores usados.</li>
      <li>CPU → memória: resultado que as próximas instruções podem aproveitar.</li>
    </ul>
  </div>
</div>

<div class="callout">
  <span class="tag">CONSEQUÊNCIA</span>
  A relação entre CPU e memória é de ida e volta: a CPU busca e devolve, a memória fornece e guarda.
</div>

---

<!-- _class: accent-orange -->

<div class="eyebrow">EXEMPLO COMPLETO</div>

# Somar 5 e 3, visto de dentro da CPU

<p class="subtitle">O fluxo completo de uma instrução: o que estava na memória, o que a CPU fez e o que sobrou.</p>

<div class="steps cols-5">
  <div class="step">
    <span class="n">01</span>
    <h3>Na memória</h3>
    <p>A instrução de soma e os dados 5 e 3, prontos para uso.</p>
  </div>
  <div class="step">
    <span class="n">02</span>
    <h3>Busca</h3>
    <p>A CPU obtém a instrução que manda somar.</p>
  </div>
  <div class="step">
    <span class="n">03</span>
    <h3>Decodificação</h3>
    <p>Operação: soma. Dados: 5 e 3.</p>
  </div>
  <div class="step">
    <span class="n">04</span>
    <h3>Execução</h3>
    <p>A ULA calcula: 5 + 3 = 8.</p>
  </div>
  <div class="step">
    <span class="n">05</span>
    <h3>Resultado</h3>
    <p>O valor 8 fica disponível para o próximo passo.</p>
  </div>
</div>

<div class="notice">
  <span class="notice-title">E A REPETIÇÃO?</span>
  A soma fecha um ciclo. Para o programa continuar, a próxima instrução da memória abre o ciclo seguinte.
</div>

---

<div class="eyebrow">DISCUSSÃO</div>

# Cinco perguntas para fechar a aula

<div class="two-col">
  <div class="col">
    <ol class="list ordered">
      <li>Se o programa está armazenado na memória, como a CPU sabe qual instrução deve executar primeiro?</li>
      <li>O que diferencia um dado de uma instrução para a CPU?</li>
      <li>Em qual etapa do ciclo a ULA é acionada? Por quê?</li>
    </ol>
  </div>
  <div class="col">
    <ol class="list ordered" start="4">
      <li>O que acontece com a execução se a memória não tiver mais o programa?</li>
      <li>Por que o ciclo se repete durante toda a execução, e não uma única vez?</li>
    </ol>
  </div>
</div>

<div class="callout">
  <span class="tag">COMO RESPONDER</span>
  Percorra o ciclo: em cada etapa, pergunte quem faz o quê e de onde vem a informação.
</div>

---

<!-- _class: title -->

<div class="eyebrow">SÍNTESE</div>

# Buscar, decodificar e executar:
# o ciclo que roda
# até o programa acabar

<p class="subtitle">Próxima aula: multiprocessadores e multicomputadores.</p>

<div class="byline">
  <strong>Prof. Victor Brayner</strong>
  <span>arquitetura computacional · unidade I</span>
</div>

---
marp: true
theme: campus-dev
size: 16:9
paginate: true
html: true
footer: 'ARQUITETURA COMPUTACIONAL · UNIDADE I'
---

<!-- _class: title -->

<div class="eyebrow">ARQUITETURA COMPUTACIONAL · AULA 04</div>

# Multiprocessadores
# e multicomputadores

<p class="subtitle">Como sistemas computacionais distribuem o processamento entre diferentes unidades.</p>

<div class="byline">
  <strong>Prof. Victor Brayner</strong>
  <span>ads · 1º período</span>
</div>

---

<!-- _class: accent-purple -->

<div class="eyebrow">O PONTO DE PARTIDA</div>

# Uma CPU por máquina tem um limite

<p class="subtitle">A aula passada acompanhou o ciclo de uma CPU. Hoje a pergunta é outra: e quando o trabalho pede mais unidades?</p>

<div class="two-col">
  <div class="col">
    <span class="label">Onde paramos</span>
    <p>A Aula 03 mostrou a CPU repetindo o ciclo de instrução: busca, decodificação e execução, uma instrução de cada vez.</p>
    <ul class="list tight">
      <li>Cada máquina que estudamos até aqui tem uma CPU.</li>
      <li>A execução avança instrução por instrução.</li>
      <li>Quando o trabalho cresce, a mesma CPU vira o gargalo.</li>
    </ul>
  </div>
  <div class="col">
    <span class="label">A pergunta de hoje</span>
    <ul class="list tight">
      <li>E se houver várias unidades de processamento?</li>
      <li>Elas dividem tudo ou cada uma tem o seu?</li>
      <li>Como uma conversa com a outra?</li>
    </ul>
    <p class="muted small">Duas organizações clássicas respondem a essas perguntas. Nenhum detalhe de fabricante entra na aula.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">HOJE</span>
  Duas formas de reunir unidades de processamento: o multiprocessador e o multicomputador.
</div>

---

<!-- _class: section-divider -->

<div class="part">PARTE 01 / 03</div>

# Multiprocessadores

<div class="topic-list cols-3">
  <div class="topic"><span class="n">01</span><span>Por que mais de uma unidade</span></div>
  <div class="topic"><span class="n">02</span><span>A definição</span></div>
  <div class="topic"><span class="n">03</span><span>Memória compartilhada</span></div>
</div>

---

<div class="eyebrow">MOTIVAÇÃO</div>

# Quatro motivos para reunir unidades

<div class="cards cols-4">
  <div class="card">
    <span class="n">01</span>
    <h3>Mais capacidade</h3>
    <p>Com mais de uma unidade de processamento, o sistema tem mais capacidade de processamento à disposição.</p>
  </div>
  <div class="card c-purple">
    <span class="n">02</span>
    <h3>Trabalho ao mesmo tempo</h3>
    <p>Operações podem avançar de forma concorrente, cada uma em sua unidade.</p>
  </div>
  <div class="card c-teal">
    <span class="n">03</span>
    <h3>Recursos à disposição</h3>
    <p>Mais unidades significa mais recursos disponíveis para o sistema usar.</p>
  </div>
  <div class="card c-orange">
    <span class="n">04</span>
    <h3>Tarefas divididas</h3>
    <p>Uma tarefa grande pode ser repartida em partes menores e distribuídas.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">FOCO</span>
  A aula trata da organização das unidades. Quanto cada arranjo rende na prática depende do sistema e da tarefa, e não é medida aqui.
</div>

---

<div class="eyebrow">CONCEITO</div>

# Multiprocessador: vários processadores, um sistema

<div class="stack">
  <div class="two-col">
    <div class="col">
      <span class="label">A definição</span>
      <p>Um <strong>multiprocessador</strong> é um sistema com múltiplos processadores ou unidades de processamento dentro de uma mesma arquitetura computacional.</p>
      <p class="muted">Essas unidades normalmente compartilham recursos, como a memória principal.</p>
    </div>
    <div class="col">
      <span class="label">O que isso significa</span>
      <ul class="list tight">
        <li>As unidades pertencem ao mesmo sistema.</li>
        <li>Trabalham de forma concorrente, cada uma com seu trabalho.</li>
        <li>Dividem recursos comuns, em especial a memória.</li>
      </ul>
    </div>
  </div>

  <div class="cards cols-3 no-stretch">
    <div class="card compact">
      <h3>Processador 1</h3>
      <p>Trabalho A.</p>
    </div>
    <div class="card compact">
      <h3>Processador 2</h3>
      <p>Trabalho B.</p>
    </div>
    <div class="card compact">
      <h3>Processador 3</h3>
      <p>Trabalho C.</p>
    </div>
  </div>

  <div class="panel c-teal">
    <span class="label">Memória principal compartilhada</span>
    <p>As três unidades leem e gravam no mesmo espaço.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">EXEMPLO CORRIQUEIRO</span>
  Um servidor com vários núcleos segue a mesma ideia: unidades de processamento independentes dentro de um só sistema.
</div>

---

<!-- _class: accent-teal -->

<div class="eyebrow">O ESQUEMA</div>

# Várias CPUs, uma memória, recursos comuns

<div class="flow outline">
  <div class="node">
    <h3>Memória</h3>
    <p>uma só, para o sistema inteiro</p>
  </div>
  <div class="node">
    <h3>CPU 1 · CPU 2</h3>
    <p>executam em concorrência</p>
  </div>
  <div class="node">
    <h3>Recursos</h3>
    <p>compartilhados</p>
  </div>
</div>

<span class="label">O que circula</span>

<ul class="list arrow">
  <li>As duas CPUs buscam instrução e dados na mesma memória.</li>
  <li>O resultado de ambas volta para o mesmo sistema.</li>
</ul>

<div class="callout">
  <span class="tag">LEIA COMO MODELO</span>
  O desenho junta as CPUs em um só bloco para simplificar. A posição na página não indica hierarquia entre elas.
</div>

---

<div class="eyebrow">CONCEITO</div>

# A memória é uma só para todas as unidades

<div class="stack">
  <div class="two-col">
    <div class="col">
      <span class="label">O que significa compartilhar</span>
      <p>No multiprocessador, a memória principal tipicamente é compartilhada: as unidades leem e gravam no mesmo lugar.</p>
      <p class="muted">O que uma unidade grava na memória, a outra consegue ler em seguida.</p>
    </div>
    <div class="col">
      <span class="label">Por que isso importa</span>
      <p>A comunicação entre os processadores acontece por meio dessa memória: um deixa o resultado gravado, o outro busca.</p>
      <p class="muted small">Ninguém precisa enviar nada por uma rede externa.</p>
    </div>
  </div>

  <div class="flow outline">
    <div class="node">
      <h3>Processador 1</h3>
      <p>Grava o resultado na memória.</p>
    </div>
    <div class="node c-teal">
      <h3>Memória comum</h3>
      <p>O valor fica disponível para todos.</p>
    </div>
    <div class="node">
      <h3>Processador 2</h3>
      <p>Lê o resultado quando precisar.</p>
    </div>
  </div>
</div>

<div class="callout">
  <span class="tag">PARA FIXAR</span>
  No multiprocessador, a memória compartilhada é o que aproxima as unidades de processamento.
</div>

---

<!-- _class: section-divider -->

<div class="part">PARTE 02 / 03</div>

# Multicomputadores

<div class="topic-list cols-3">
  <div class="topic"><span class="n">01</span><span>A definição</span></div>
  <div class="topic"><span class="n">02</span><span>Memória local por máquina</span></div>
  <div class="topic"><span class="n">03</span><span>A conversa pela rede</span></div>
</div>

---

<div class="eyebrow">CONCEITO</div>

# Multicomputador: vários computadores, uma rede

<div class="stack">
  <div class="two-col">
    <div class="col">
      <span class="label">A definição</span>
      <p>Um <strong>multicomputador</strong> é um conjunto de computadores relativamente independentes, cada um com o próprio processador e a própria memória.</p>
      <p class="muted">A comunicação entre eles acontece por uma rede ou interconexão.</p>
    </div>
    <div class="col">
      <span class="label">O que muda em relação ao multiprocessador</span>
      <ul class="list tight">
        <li>Aqui não há um sistema único com várias CPUs.</li>
        <li>São máquinas completas trabalhando juntas.</li>
        <li>Não existe memória única: cada máquina cuida da sua.</li>
      </ul>
    </div>
  </div>

  <div class="flow outline">
    <div class="node">
      <h3>Computador A</h3>
      <p>CPU e memória próprias.</p>
    </div>
    <div class="node c-orange">
      <h3>Rede</h3>
      <p>A conversa passa pela interconexão.</p>
    </div>
    <div class="node">
      <h3>Computador B</h3>
      <p>CPU e memória próprias.</p>
    </div>
  </div>
</div>

<div class="callout">
  <span class="tag">PARA FIXAR</span>
  Cada computador mantém o próprio ciclo de instrução, da Aula 03, dentro dele.
</div>

---

<!-- _class: accent-teal -->

<div class="eyebrow">O ESQUEMA</div>

# Cada máquina com o seu par CPU e memória

<div class="flow outline">
  <div class="node">
    <h3>Computador 1</h3>
    <p>CPU + memória próprias</p>
  </div>
  <div class="node">
    <h3>Rede</h3>
    <p>a interconexão</p>
  </div>
  <div class="node">
    <h3>Computador 2</h3>
    <p>CPU + memória próprias</p>
  </div>
</div>

<span class="label">O que circula</span>

<ul class="list arrow">
  <li>Cada máquina guarda as próprias instruções e os próprios dados.</li>
  <li>Pela rede atravessa a troca de informações entre máquinas.</li>
</ul>

<div class="callout">
  <span class="tag">LEIA O DESENHO</span>
  A memória não fica no meio: ela acompanha cada computador. O que fica no meio é a interconexão.
</div>

---

<div class="eyebrow">INTEGRAÇÃO</div>

# Sem memória comum, a conversa vai pela rede

<div class="two-col">
  <div class="col">
    <span class="label">Como as máquinas se comunicam</span>
    <p>Sem memória compartilhada, a troca de informação precisa atravessar a interconexão: uma máquina envia, a outra recebe.</p>
    <p class="muted">A comunicação entre as unidades é um trabalho explícito da rede.</p>
  </div>
  <div class="col">
    <span class="label">O que circula pela rede</span>
    <ul class="list arrow">
      <li>Pedidos: uma máquina solicita algo que está na outra.</li>
      <li>Resultados: partes de uma tarefa que outra máquina precisa usar.</li>
    </ul>
    <p class="muted small">Cada máquina continua executando o próprio ciclo de instrução.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">REGRA</span>
  No multicomputador, nenhuma unidade enxerga a memória da outra diretamente: tudo que trocar passa pela rede.
</div>

---

<!-- _class: section-divider -->

<div class="part">PARTE 03 / 03</div>

# Comparação e exemplo

<div class="topic-list cols-3">
  <div class="topic"><span class="n">01</span><span>As duas organizações lado a lado</span></div>
  <div class="topic"><span class="n">02</span><span>Uma tarefa dividida</span></div>
  <div class="topic"><span class="n">03</span><span>Onde isso aparece</span></div>
</div>

---

<!-- _class: accent-teal -->

<div class="eyebrow">COMPARAÇÃO</div>

# As duas organizações, aspecto por aspecto

| Aspecto | Multiprocessador | Multicomputador |
|---|---|---|
| Unidades | vários processadores | vários computadores |
| Memória | tipicamente compartilhada | tipicamente distribuída |
| Organização | mais integrada | máquinas independentes |
| Comunicação | dentro do sistema | por interconexão ou rede |
| Exemplo corriqueiro | servidor com vários núcleos | cluster de máquinas |

<div class="callout">
  <span class="tag">MODELO INTRODUTÓRIO</span>
  A tabela organiza o recorte desta aula. Arquiteturas reais combinam variações dessas ideias, e o detalhe fica para o resto do curso.
</div>

---

<!-- _class: accent-orange -->

<div class="eyebrow">EXEMPLO APLICADO</div>

# Uma tarefa em quatro partes, duas organizações

<p class="subtitle">Considere uma tarefa que se divide em quatro partes iguais de trabalho.</p>

<div class="equation">tarefa = T1 + T2 + T3 + T4</div>

<div class="two-col">
  <div class="panel c-orange">
    <span class="label">No multiprocessador</span>
    <p>As quatro partes caem em quatro processadores do mesmo sistema. A memória compartilhada guarda os pedaços e reúne o resultado.</p>
    <p class="muted">A comunicação entre as partes acontece dentro do sistema. Quem termina antes já encontra o trabalho seguinte na mesma memória.</p>
  </div>
  <div class="panel c-teal">
    <span class="label">No multicomputador</span>
    <p>Cada parte roda em um computador diferente, cada um com a própria memória. As partes conversam pela rede.</p>
    <p class="muted">Cada máquina trabalha no próprio ritmo e envia o que produziu pela interconexão.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">MESMA DIVISÃO, CAMINHOS DIFERENTES</span>
  O que muda é onde os dados de cada parte ficam e como as partes se comunicam.
</div>

---

<div class="eyebrow">NO MUNDO REAL</div>

# De núcleos a clusters

<div class="stack">
  <div class="two-col">
    <div class="col">
      <span class="label">Dentro de uma máquina</span>
      <p>Servidores atuais trazem processadores com vários núcleos: unidades de processamento independentes dentro de um mesmo sistema, próximas à ideia de multiprocessador.</p>
      <p class="muted small">O detalhe de cada fabricante fica fora do escopo.</p>
    </div>
    <div class="col">
      <span class="label">Entre máquinas</span>
      <p>Computadores completos ligados por rede, cada um com a própria memória, aproximam a ideia de multicomputador. Esse arranjo costuma ser chamado de <strong>cluster</strong>.</p>
      <p class="muted small">A computação em nuvem combina essas ideias em escala maior; fica para outra aula.</p>
    </div>
  </div>

  <div class="steps cols-4">
    <div class="step">
      <span class="n">01</span>
      <h3>Núcleo</h3>
      <p>Unidade de processamento dentro do processador.</p>
    </div>
    <div class="step">
      <span class="n">02</span>
      <h3>Processador</h3>
      <p>Reúne vários núcleos no mesmo chip.</p>
    </div>
    <div class="step">
      <span class="n">03</span>
      <h3>Servidor</h3>
      <p>Máquina com processadores e memória própria.</p>
    </div>
    <div class="step">
      <span class="n">04</span>
      <h3>Cluster</h3>
      <p>Várias máquinas ligadas por rede.</p>
    </div>
  </div>
</div>

<div class="callout">
  <span class="tag">ESCOPO</span>
  Os nomes servem para reconhecer os padrões. Profundidade de paralelismo, sistemas distribuídos e nuvem não são assunto de hoje.
</div>

---

<div class="eyebrow">DISCUSSÃO</div>

# Quatro perguntas para fechar

<div class="two-col">
  <div class="col">
    <ol class="list ordered">
      <li>Em qual organização cada computador mantém a própria memória, sem depender de uma memória única compartilhada?</li>
      <li>No multiprocessador, como um processador fica sabendo do resultado produzido por outro?</li>
    </ol>
  </div>
  <div class="col">
    <ol class="list ordered" start="3">
      <li>O que precisa existir entre os computadores de um multicomputador para que troquem informações?</li>
      <li>Um servidor com vários núcleos lembra qual das duas organizações? Por quê?</li>
    </ol>
  </div>
</div>

<div class="callout">
  <span class="tag">COMO RESPONDER</span>
  Para cada situação, pergunte onde estão a memória e a comunicação: dentro de um sistema ou entre máquinas.
</div>

---

<!-- _class: title -->

<div class="eyebrow">SÍNTESE</div>

# Vários processadores, uma memória.
# Vários computadores, uma rede.

<p class="subtitle">Essa é a diferença em uma frase. Próxima aula: sistemas de numeração.</p>

<div class="byline">
  <strong>Prof. Victor Brayner</strong>
  <span>arquitetura computacional · unidade I</span>
</div>

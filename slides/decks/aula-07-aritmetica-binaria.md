---
marp: true
theme: campus-dev
size: 16:9
paginate: true
html: true
footer: 'ARQUITETURA COMPUTACIONAL · UNIDADE I'
---

<!-- _class: title -->

<div class="eyebrow">ARQUITETURA COMPUTACIONAL · AULA 07</div>

# Aritmética binária

<p class="subtitle">Adição e subtração em base 2, com transporte e empréstimo.</p>

<div class="byline">
  <strong>Prof. Victor Brayner</strong>
  <span>ads · 1º período</span>
</div>

---

<!-- _class: accent-purple -->

<div class="eyebrow">O PONTO DE PARTIDA</div>

# As regras da conta são as mesmas; os símbolos é que são dois

<p class="subtitle">Somar 101 + 10 em binário usa a mesma lógica de "conta de padaria" que você já conhece.</p>

<div class="two-col">
  <div class="col">
    <span class="label">O que muda</span>
    <p>Em decimal, cada casa vai de 0 a 9 e transporta quando passa de 9. Em binário, cada casa só vai de 0 a 1, então o transporte entra cedo: 1 + 1 já estoura a casa.</p>
  </div>
  <div class="col">
    <span class="label">O que não muda</span>
    <p>Alinhar as casas, somar da direita para a esquerda, transportar o que sobra e pedir emprestado quando falta. Tudo igual.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">HOJE</span>
  Adição com carry, subtração com empréstimo e o caso mais difícil: <code>1000<sub>2</sub> − 0001<sub>2</sub></code>.
</div>

---

<!-- _class: section-divider -->

<div class="part">PARTE 01 / 04</div>

# Adição em binário

<div class="topic-list cols-3">
  <div class="topic"><span class="n">01</span><span>As quatro regras</span></div>
  <div class="topic"><span class="n">02</span><span>Somando casa a casa</span></div>
  <div class="topic"><span class="n">03</span><span>Carry na prática</span></div>
</div>

---

<div class="eyebrow">REGRAS · ADIÇÃO</div>

# Quatro regras cobrem toda adição binária

| Operação | Resultado | O que acontece |
|---|:---:|---|
| 0 + 0 | 0 | nada a transportar |
| 0 + 1 | 1 | simples |
| 1 + 0 | 1 | simples |
| 1 + 1 | <strong>10</strong> | a casa enche: 0 fica, 1 vai transportado |

<div class="two-col">
  <div class="col">
    <p><code>10<sub>2</sub></code> é dois em decimal. Não é um número estranho: é o menor valor que não cabe numa casa.</p>
  </div>
  <div class="col">
    <p class="muted">No decimal, 8 + 5 escreve 3 e transporta 1. Em binário, 1 + 1 escreve 0 e transporta 1, pela mesma razão.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">ESCREVER</span>
  O 0 da direita de <code>10</code> fica na casa; o 1 da esquerda é o transporte (carry) para a casa seguinte.
</div>

---

<div class="eyebrow">EXEMPLO GUIADO</div>

# Somando 101 + 10, casa a casa

<div class="code">  101
+  10
-----
  111</div>

<div class="two-col">
  <div class="col">
    <span class="label">O passo a passo</span>
    <ol class="list ordered">
      <li>Casa do 1: 1 + 0 = 1.</li>
      <li>Casa do 2: 0 + 1 = 1.</li>
      <li>Casa do 4: 1 + 0 = 1.</li>
    </ol>
    <p class="muted small">Nenhuma casa encheu, então não houve transporte.</p>
  </div>
  <div class="col">
    <span class="label">A conferência</span>
    <p><code>101<sub>2</sub></code> = 5, <code>10<sub>2</sub></code> = 2, e <code>111<sub>2</sub></code> = 4 + 2 + 1 = 7.</p>
    <p class="muted">5 + 2 = 7. Fechado.</p>
  </div>
</div>

---

<!-- _class: accent-orange -->

<div class="eyebrow">EXEMPLO COM CARRY</div>

# Somando 1011 + 0110: agora com transporte

<div class="code">  carry → 111
   1011
 + 0110
 ------
  10001</div>

<div class="two-col">
  <div class="col">
    <span class="label">Casa por casa, da direita</span>
    <ul class="list tight">
      <li>Casa do 1: 1 + 0 = 1.</li>
      <li>Casa do 2: 1 + 1 = <strong>10</strong>: fica 0, transporta 1.</li>
      <li>Casa do 4: 0 + 1 + 1(transporte) = <strong>10</strong>: fica 0, transporta 1.</li>
      <li>Casa do 8: 1 + 0 + 1(transporte) = <strong>10</strong>: fica 0, transporta 1.</li>
      <li>Casa final: transporte sem parcela = 1.</li>
    </ul>
  </div>
  <div class="col">
    <span class="label">A conferência</span>
    <p><code>1011<sub>2</sub></code> = 11, <code>0110<sub>2</sub></code> = 6, e <code>10001<sub>2</sub></code> = 16 + 1 = 17.</p>
    <p class="muted">11 + 6 = 17. Fechado.</p>
    <p class="muted small">Um carry pode chegar cheio na casa seguinte. Soma-se a ele como uma parcela extra.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">ATENÇÃO</span>
  O transporte entra na soma da casa seguinte. Esquecer de somar o carry é o erro nº 1 da adição.
</div>

---

<!-- _class: section-divider -->

<div class="part">PARTE 02 / 04</div>

# Subtração e empréstimo

<div class="topic-list cols-3">
  <div class="topic"><span class="n">01</span><span>Regras e o caso 0 − 1</span></div>
  <div class="topic"><span class="n">02</span><span>Por que o empréstimo vale 2</span></div>
  <div class="topic"><span class="n">03</span><span>Subtração com empréstimo</span></div>
</div>

---

<div class="eyebrow">REGRAS · SUBTRAÇÃO</div>

# Três regras simples e um caso que pede emprestado

| Operação | Resultado | O que acontece |
|---|:---:|---|
| 0 − 0 | 0 | simples |
| 1 − 0 | 1 | simples |
| 1 − 1 | 0 | simples |
| 0 − 1 | ? | falta valor: pedir emprestado |

<div class="two-col">
  <div class="col">
    <span class="label">O caso 0 − 1</span>
    <p>Na casa atual não há o suficiente. A saída é pedir emprestado à casa vizinha da esquerda, que vale o dobro.</p>
  </div>
  <div class="col">
    <span class="label">Igual ao decimal</span>
    <p>É o mesmo movimento de <code>52 − 7</code>: a casa das unidades pega emprestado da casa das dezenas.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">REGRA</span>
  <code>0 − 1</code> não tem resultado dentro da casa. Empréstimo é a solução, não uma exceção rara.
</div>

---

<!-- _class: accent-purple -->

<div class="eyebrow">IDEIA CENTRAL</div>

# Um empréstimo vale 2 na casa que recebe, 1 na casa que cede

<div class="two-col">
  <div class="col">
    <span class="label">A relação</span>
    <div class="code">1 unidade da posição seguinte
= 2 unidades da posição atual</div>
    <p>Quando a casa do 4 pede emprestado à casa do 8, ela recebe 4 unidades... na forma de duas unidades dela mesma: 2.</p>
  </div>
  <div class="col">
    <span class="label">Dois avisos importantes</span>
    <ul class="list tight">
      <li>O <strong>2</strong> aqui é uma quantidade em decimal, não um dígito binário. Em base 2 não existe o dígito 2.</li>
      <li>A casa que cede tem o seu valor reduzido em 1, exatamente como no decimal.</li>
    </ul>
  </div>
</div>

<div class="callout">
  <span class="tag">NÃO CONFUNDA</span>
  Dígito binário só existe 0 e 1. O 2 do empréstimo é o valor da conversão, escrito aí como quantidade.
</div>

---

<div class="eyebrow">EXEMPLO GUIADO</div>

# Subtraindo 1010 − 0011

<div class="code">  1010
− 0011
------
  0111</div>

<div class="two-col">
  <div class="col">
    <span class="label">Casa por casa, da direita</span>
    <ol class="list ordered">
      <li>Casa do 1: 0 − 1: não dá. Empréstimo da casa do 2: vira 2 − 1 = 1.</li>
      <li>Casa do 2: era 1, cedeu 1. Agora 0 − 1: empréstimo da casa do 4, que era 0 e busca da casa do 8: vira 2 − 1 = 1.</li>
      <li>Casa do 4: era 0, recebeu 2 e cedeu 1. Fica 1 − 0 = 1.</li>
      <li>Casa do 8: era 1, cedeu 1. Agora 0 − 0 = 0.</li>
    </ol>
  </div>
  <div class="col">
    <span class="label">A conferência</span>
    <p><code>1010<sub>2</sub></code> = 10, <code>0011<sub>2</sub></code> = 3, e <code>0111<sub>2</sub></code> = 7.</p>
    <p class="muted">10 − 3 = 7. Fechado.</p>
  </div>
</div>

---

<!-- _class: section-divider -->

<div class="part">PARTE 03 / 04</div>

# O caso crítico

<div class="topic-list cols-3">
  <div class="topic"><span class="n">01</span><span><code>1000₂ − 0001₂</code> passo a passo</span></div>
  <div class="topic"><span class="n">02</span><span>Conservação de valor</span></div>
  <div class="topic"><span class="n">03</span><span>Empréstimo atravessando zeros</span></div>
</div>

---

<!-- _class: accent-orange -->

<div class="eyebrow">CASO CRÍTICO</div>

# 1000 − 0001: o empréstimo que atravessa zeros

<p class="subtitle">Oito menos um. A operação mais ensinada da aula, porque derruba quase todo mundo.</p>

<div class="two-col">
  <div class="col">
    <span class="label">O tamanho do problema</span>
    <p>A casa do 1 está vazia, e a casa do 2 também. O único valor disponível está na casa do 8, três casas de distância.</p>
    <div class="code">1000<sub>2</sub> = 8<sub>10</sub></div>
    <p class="muted small">O 1 está na casa dos 8. Não há 4 nem 2 para emprestar direto.</p>
  </div>
  <div class="col">
    <span class="label">A saída</span>
    <p>Em vez de pensar em dígitos, pense em quantidade: 8 pode ser decomposto em parcelas menores, até aparecer uma unidade para dar conta do −1.</p>
    <div class="code">8 = 4 + 4</div>
  </div>
</div>

<div class="callout">
  <span class="tag">O CAMINHO</span>
  Decompor 8 em parcelas cada vez menores, conservando o total, e então subtrair 1.
</div>

---

<div class="eyebrow">DECOMPOSIÇÃO</div>

# 8 vira 4 + 2 + 1 + 1, um pedaço de cada vez

<div class="code">8
→ 4 + 4
→ 4 + 2 + 2
→ 4 + 2 + 1 + 1</div>

<div class="two-col">
  <div class="col">
    <span class="label">O que aconteceu em cada linha</span>
    <ul class="list tight">
      <li><strong>4 + 4:</strong> a primeira decomposição, o 8 em duas metades.</li>
      <li><strong>4 + 2 + 2:</strong> só uma das parcelas de 4 foi decomposta; a outra seguiu inteira.</li>
      <li><strong>4 + 2 + 1 + 1:</strong> uma das parcelas de 2 foi dividida em 1 e 1.</li>
    </ul>
  </div>
  <div class="col">
    <span class="label">Só então a subtração</span>
    <div class="code">4 + 2 + 1 + 1 − 1 = 7</div>
    <p>Um dos 1 é consumido pelo −1, e sobra 7: <code>0111<sub>2</sub></code>.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">CHECK</span>
  Em todas as linhas, a soma das parcelas continua sendo 8. O total nunca mudou.
</div>

---

<!-- _class: accent-orange -->

<div class="eyebrow">PERGUNTA QUE SEMPRE APARECE</div>

# De onde vem o 2 na casa do 2, se só uma metade foi quebrada?

<div class="two-col">
  <div class="col">
    <span class="label">A pergunta do aluno</span>
    <p>Se 8 virou 4 + 4 e eu emprestei uma das parcelas, por que a posição do 2 mostra 2 e não 1?</p>
  </div>
  <div class="col">
    <span class="label">A resposta</span>
    <p>A parcela emprestada é <strong>uma</strong> das metades de 8, que foi decomposta em 2 + 2. A outra metade de 4 permanece intacta na casa do 4.</p>
    <div class="code">8 → 4 + 4
      ↑
      4 = 2 + 2</div>
  </div>
</div>

<div class="two-col">
  <div class="col">
    <div class="panel c-teal">
      <span class="label">Conservação de valor</span>
      <p>4 + 4 = 8 vira 4 + 2 + 2 = 8. Nada foi criado; uma parcela foi trocada por duas menores.</p>
    </div>
  </div>
  <div class="col">
    <div class="panel c-orange">
      <span class="label">Fim da linha</span>
      <p>4 + 2 + 1 + 1 = 8 ainda. E então −1 = 7: <code>1000<sub>2</sub> − 0001<sub>2</sub> = 0111<sub>2</sub></code>.</p>
    </div>
  </div>
</div>

---

<div class="eyebrow">REGRA GERAL</div>

# Empréstimo atravessa zeros até achar um 1

<div class="two-col">
  <div class="col">
    <span class="label">O mecanismo</span>
    <ol class="list ordered">
      <li>A casa com falta avança até a próxima casa que tenha 1.</li>
      <li>A casa cedente fica com 0 e as casas vazias do caminho se enchem de 1.</li>
      <li>A casa que pediu recebe o empréstimo e volta a 1.</li>
    </ol>
  </div>
  <div class="col">
    <span class="label">Por que as casas do caminho viram 1</span>
    <p>Cada casa intermediária recebe 2 como quantidade, cede 1 para a casa vizinha e mantém 1. Elas não têm valor próprio para ceder, por isso precisam buscar adiante.</p>
    <p class="muted small">Confira no resultado: <code>1000 − 0001</code> deixou a casa do 8 em 0 e encheu 4, 2 e 1.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">GUARDE</span>
  <code>1000<sub>2</sub> − 0001<sub>2</sub> = 0111<sub>2</sub></code>. Esse padrão (todos os zeros viram uns) vale para qualquer tamanho.
</div>

---

<!-- _class: section-divider -->

<div class="part">PARTE 04 / 04</div>

# Prática e conferência

<div class="topic-list cols-3">
  <div class="topic"><span class="n">01</span><span>Exercícios progressivos</span></div>
  <div class="topic"><span class="n">02</span><span>Múltiplos empréstimos</span></div>
  <div class="topic"><span class="n">03</span><span>Checagem e próximos passos</span></div>
</div>

---

<div class="eyebrow">EXERCÍCIO</div>

# Seis operações, em ordem crescente de dificuldade

<div class="two-col">
  <div class="col">
    <ol class="list ordered">
      <li><code>101 + 10</code></li>
      <li><code>1011 + 0110</code></li>
      <li><code>111 + 001</code></li>
      <li><code>1010 − 0011</code></li>
      <li><code>1000 − 0001</code></li>
      <li><code>1100 − 0101</code> (múltiplos empréstimos)</li>
    </ol>
  </div>
  <div class="col">
    <span class="label">Respostas</span>
    <ul class="list tight">
      <li><code>111</code></li>
      <li><code>10001</code></li>
      <li><code>1000</code></li>
      <li><code>0111</code></li>
      <li><code>0111</code></li>
      <li><code>0111</code></li>
    </ul>
  </div>
</div>

<div class="callout">
  <span class="tag">MÉTODO</span>
  Cada operação conferida em decimal. <code>1100<sub>2</sub></code> = 12 e <code>0101<sub>2</sub></code> = 5, então o item 6 deve dar 7: <code>0111<sub>2</sub></code>.
</div>

---

<!-- _class: accent-teal -->

<div class="eyebrow">EXEMPLO RESOLVIDO</div>

# 1100 − 0101: dois empréstimos seguidos

<div class="code">  1100
− 0101
------
  0111</div>

<div class="two-col">
  <div class="col">
    <span class="label">Casa por casa, da direita</span>
    <ol class="list ordered">
      <li>Casa do 1: 0 − 1, empréstimo da casa do 2: 2 − 1 = 1.</li>
      <li>Casa do 2: era 0, buscou 2 da casa do 4 e cedeu 1. Fica 1 − 0 = 1.</li>
      <li>Casa do 4: era 1, cedeu 1. Agora 0 − 1: empréstimo da casa do 8: 2 − 1 = 1.</li>
      <li>Casa do 8: era 1, cedeu 1. Agora 0 − 0 = 0.</li>
    </ol>
  </div>
  <div class="col">
    <span class="label">A conferência</span>
    <p>12 − 5 = 7, e <code>0111<sub>2</sub></code> = 7. Fechado.</p>
    <p class="muted small">Dois empréstimos seguidos: a falta de 1 na casa do 1 derrubou o valor da casa do 4, que também teve que buscar na casa do 8.</p>
  </div>
</div>

---

<div class="eyebrow">CHECAGEM</div>

# Quatro perguntas que fecham a unidade

<div class="two-col">
  <div class="col">
    <ol class="list ordered">
      <li>Por que <code>1 + 1 = 10</code> em binário?</li>
      <li>O que significa o 1 transportado?</li>
    </ol>
  </div>
  <div class="col">
    <ol class="list ordered" start="3">
      <li>Por que <code>0 − 1</code> exige empréstimo?</li>
      <li>No caso <code>1000<sub>2</sub> − 0001<sub>2</sub></code>, de onde vem o valor 2 usado durante o empréstimo?</li>
    </ol>
  </div>
</div>

<div class="callout">
  <span class="tag">COMO RESPONDER</span>
  Pense na casa que enche (transporte) e na casa que falta valor (empréstimo). As duas situações já existiam no decimal; a base 2 só as provoca mais cedo.
</div>

---

<!-- _class: title -->

<div class="eyebrow">SÍNTESE</div>

# Duas regras novas, e o resto da conta você já sabia:
# transporta quando a casa enche, empresta quando falta

<p class="subtitle">Próxima aula: revisão da Unidade I.</p>

<div class="byline">
  <strong>Prof. Victor Brayner</strong>
  <span>arquitetura computacional · unidade I</span>
</div>

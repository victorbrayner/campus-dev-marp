---
marp: true
theme: campus-dev
size: 16:9
paginate: true
html: true
footer: 'ARQUITETURA COMPUTACIONAL · UNIDADE I'
---

<!-- _class: title -->

<div class="eyebrow">ARQUITETURA COMPUTACIONAL · AULA 05</div>

# Sistemas de numeração

<p class="subtitle">Decimal, binário e hexadecimal como formas de representar valores.</p>

<div class="byline">
  <strong>Prof. Victor Brayner</strong>
  <span>ads · 1º período</span>
</div>

---

<!-- _class: accent-purple -->

<div class="eyebrow">O PONTO DE PARTIDA</div>

# O número 10 nem sempre significa dez

<p class="subtitle">A mesma sequência de algarismos pode valer coisas diferentes, dependendo do acordo por trás dela.</p>

<div class="two-col">
  <div class="col">
    <span class="label">A escrita que você conhece</span>
    <p>No dia a dia, <code>10</code> significa dez: dez dedos, dez reais, dez minutos. A leitura parece única.</p>
    <ul class="list tight">
      <li>Dez símbolos à disposição: 0 a 9.</li>
      <li>Cada casa à esquerda vale dez vezes mais.</li>
    </ul>
  </div>
  <div class="col">
    <span class="label">A mesma escrita, outro valor</span>
    <p>Em base 2, <code>10</code> significa dois. Em base 16, significa dezesseis.</p>
    <ul class="list tight">
      <li>O valor depende da base combinada.</li>
      <li>E o computador, internamente, trabalha na base 2.</li>
    </ul>
    <p class="muted small">Por isso a disciplina precisa que você leia valores em mais de uma base.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">HOJE</span>
  Como a base e a posição de cada algarismo definem o valor, em decimal, binário e hexadecimal.
</div>

---

<!-- _class: section-divider -->

<div class="part">PARTE 01 / 03</div>

# Base e valor posicional

<div class="topic-list cols-3">
  <div class="topic"><span class="n">01</span><span>O que é uma base</span></div>
  <div class="topic"><span class="n">02</span><span>O peso de cada posição</span></div>
  <div class="topic"><span class="n">03</span><span>O decimal em detalhe</span></div>
</div>

---

<div class="eyebrow">CONCEITO</div>

# Uma base define símbolos e pesos

<div class="two-col">
  <div class="col">
    <span class="label">A definição</span>
    <p>Uma <strong>base numérica</strong> determina quantos símbolos diferentes são utilizados e como o valor de cada posição é calculado.</p>
    <p class="muted">Base 10 tem dez símbolos; base 2 tem dois; base 16 tem dezesseis.</p>
  </div>
  <div class="col">
    <span class="label">Os dois papéis</span>
    <ul class="list tight">
      <li><strong>Símbolos</strong>: o alfabeto disponível para escrever valores.</li>
      <li><strong>Posições</strong>: o multiplicador que cada casa aplica ao seu algarismo.</li>
    </ul>
    <p class="muted small">Mudar de base troca o tamanho do alfabeto e o valor das casas.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">REGRA</span>
  A base é um acordo; a posição é o peso. Os dois juntos definem o valor de cada algarismo.
</div>

---

<div class="eyebrow">CONCEITO</div>

# A posição dá o peso ao algarismo

<div class="two-col">
  <div class="col">
    <span class="label">A regra do peso</span>
    <p>O peso de uma casa é a base elevada à posição dela. A contagem começa em zero, na casa da direita.</p>
    <p class="muted">Cada passo à esquerda multiplica o peso pela base.</p>
  </div>
  <div class="col">
    <span class="label">No decimal</span>
    <ul class="list tight">
      <li>1ª casa (da direita): 10<sup>0</sup> = 1.</li>
      <li>2ª casa: 10<sup>1</sup> = 10.</li>
      <li>3ª casa: 10<sup>2</sup> = 100.</li>
      <li>O algarismo ocupa a casa e recebe o peso dela.</li>
    </ul>
  </div>
</div>

<div class="callout">
  <span class="tag">PARA FIXAR</span>
  Mudar o algarismo de casa muda o peso dele. Esse é o valor posicional que sustenta todas as bases.
</div>

---

<!-- _class: accent-teal -->

<div class="eyebrow">SISTEMA · DECIMAL</div>

# Decimal: dez símbolos, casas que valem 1, 10, 100

<div class="two-col">
  <div class="col">
    <span class="label">Os símbolos</span>
    <div class="tag-list">
      <span class="tag-chip">0</span>
      <span class="tag-chip">1</span>
      <span class="tag-chip">2</span>
      <span class="tag-chip">3</span>
      <span class="tag-chip">4</span>
      <span class="tag-chip">5</span>
      <span class="tag-chip">6</span>
      <span class="tag-chip">7</span>
      <span class="tag-chip">8</span>
      <span class="tag-chip">9</span>
    </div>
    <p class="muted small">Depois do 9, a escrita volta ao 0 e aumenta a casa à esquerda: 9, 10, 11...</p>
  </div>
  <div class="col">
    <span class="label">Um número em decomposição</span>
    <div class="code">583<sub>10</sub>
= 5×10<sup>2</sup> + 8×10<sup>1</sup> + 3×10<sup>0</sup>
= 500 + 80 + 3</div>
    <p class="muted small">O 5 vale 5 centenas, o 8 vale 8 dezenas, o 3 vale 3 unidades.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">REGISTRO</span>
  Essa decomposição é o modelo posicional em ação. O binário, a seguir, usa a mesma lógica com outro alfabeto.
</div>

---

<!-- _class: section-divider -->

<div class="part">PARTE 02 / 03</div>

# Binário e hexadecimal

<div class="topic-list">
  <div class="topic"><span class="n">01</span><span>Binário: base 2</span></div>
  <div class="topic"><span class="n">02</span><span>As posições do binário</span></div>
  <div class="topic"><span class="n">03</span><span>Um número binário decomposto</span></div>
  <div class="topic"><span class="n">04</span><span>Hexadecimal: base 16</span></div>
  <div class="topic"><span class="n">05</span><span>A tabela do hexadecimal</span></div>
  <div class="topic"><span class="n">06</span><span>Um número hexadecimal decomposto</span></div>
</div>

---

<div class="eyebrow">SISTEMA · BINÁRIO</div>

# Binário: base 2, com 0 e 1

<div class="stack">
  <div class="two-col">
    <div class="col">
      <span class="label">Os símbolos</span>
      <p>A base 2 usa dois algarismos: 0 e 1. Cada dígito binário é chamado de <strong>bit</strong>.</p>
      <p class="muted">Contando: 0, 1, 10, 11, 100, 101... a casa à esquerda aumenta a cada volta do 1 para o 0.</p>
    </div>
    <div class="col">
      <span class="label">Por que a computação usa</span>
      <p>Internamente, o computador representa valores em binário: cada posição admite apenas dois valores possíveis.</p>
      <p class="muted small">Representação de estados, lógica digital e circuitos ficam para disciplinas futuras.</p>
    </div>
  </div>

  <table>
    <thead>
      <tr><th>Decimal</th><th>Binário</th><th>Decimal</th><th>Binário</th></tr>
    </thead>
    <tbody>
      <tr><td>0</td><td>0</td><td>4</td><td>100</td></tr>
      <tr><td>1</td><td>1</td><td>5</td><td>101</td></tr>
      <tr><td>2</td><td>10</td><td>6</td><td>110</td></tr>
      <tr><td>3</td><td>11</td><td>7</td><td>111</td></tr>
    </tbody>
  </table>
</div>

<div class="callout">
  <span class="tag">GUARDE</span>
  Internamente, os valores que a máquina processa vivem na base 2. É por ela que a disciplina precisa passar.
</div>

---

<div class="eyebrow">CONCEITO</div>

# Cada posição do binário vale o dobro da anterior

| Posição (contando da direita) | 1ª | 2ª | 3ª | 4ª |
|---|:---:|:---:|:---:|:---:|
| Potência de 2 | 2<sup>0</sup> | 2<sup>1</sup> | 2<sup>2</sup> | 2<sup>3</sup> |
| Valor | 1 | 2 | 4 | 8 |

<div class="two-col">
  <div class="col">
    <p>A leitura das casas cresce da direita para a esquerda: 1, 2, 4, 8.</p>
    <p class="muted">Nas próximas posições, os valores continuam dobrando: 16, 32, 64, 128...</p>
  </div>
  <div class="col">
    <p class="muted small">Os valores 8 | 4 | 2 | 1 são o kit mínimo para ler quatro bits, a escrita binária mais comum nos exemplos da disciplina.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">ORDEM DE LEITURA</span>
  Potências da base crescem da direita para a esquerda. Essa ordem vale para qualquer base.
</div>

---

<!-- _class: accent-teal -->

<div class="eyebrow">EXEMPLO COMPLETO</div>

# Decompondo 1011 em base 2

| Algarismo | 1 | 0 | 1 | 1 |
|---|:---:|:---:|:---:|:---:|
| Potência | 2<sup>3</sup> | 2<sup>2</sup> | 2<sup>1</sup> | 2<sup>0</sup> |
| Valor | 8 | 4 | 2 | 1 |
| Contribuição | 8 | 0 | 2 | 1 |

<div class="equation">8 + 0 + 2 + 1 = 11</div>

<div class="callout">
  <span class="tag">RESULTADO</span>
  Quatro algarismos, um só valor: <code>1011<sub>2</sub></code> vale onze, ou <code>11<sub>10</sub></code>.
</div>

---

<div class="eyebrow">SISTEMA · HEXADECIMAL</div>

# Hexadecimal: base 16, com letras na fila

<div class="stack">
  <div class="two-col">
    <div class="col">
      <span class="label">Os símbolos</span>
      <p>A base 16 usa dezesseis símbolos: os algarismos 0 a 9 e as letras A a F.</p>
      <div class="tag-list">
        <span class="tag-chip">A</span>
        <span class="tag-chip">B</span>
        <span class="tag-chip">C</span>
        <span class="tag-chip">D</span>
        <span class="tag-chip">E</span>
        <span class="tag-chip">F</span>
      </div>
      <p class="muted small">As letras representam os valores de 10 a 15.</p>
    </div>
    <div class="col">
      <span class="label">O nome e o uso</span>
      <p>O nome junta duas partes: hexa (seis) e decimal (dez), dezesseis no total.</p>
      <p class="muted">Em computação, ela escreve grupos de bits de forma compacta. A ponte exata com o binário fica para a próxima aula.</p>
    </div>
  </div>

  <table>
    <thead>
      <tr><th>Decimal</th><th>Hexadecimal</th><th>Decimal</th><th>Hexadecimal</th></tr>
    </thead>
    <tbody>
      <tr><td>10</td><td>A</td><td>13</td><td>D</td></tr>
      <tr><td>11</td><td>B</td><td>14</td><td>E</td></tr>
      <tr><td>12</td><td>C</td><td>15</td><td>F</td></tr>
    </tbody>
  </table>
</div>

<div class="callout">
  <span class="tag">GUARDE</span>
  A, B, C, D, E e F são símbolos com valores fixos: 10, 11, 12, 13, 14 e 15, nessa ordem.
</div>

---

<div class="eyebrow">TABELA DE REFERÊNCIA</div>

# Os dezesseis símbolos do hexadecimal

| Decimal | Hexadecimal |
|---:|:---:|
| 0 a 9 | 0 a 9 |
| 10 | A |
| 11 | B |
| 12 | C |
| 13 | D |
| 14 | E |
| 15 | F |

<div class="callout">
  <span class="tag">MEMORIZE A FAIXA</span>
  A vale 10 e F vale 15. Essa faixa aparece em toda conversão que envolve hexadecimal.
</div>

---

<!-- _class: accent-teal -->

<div class="eyebrow">EXEMPLO COMPLETO</div>

# Decompondo 2F em base 16

<div class="two-col">
  <div class="col">
    <div class="code">2F<sub>16</sub>
= 2×16<sup>1</sup> + 15×16<sup>0</sup>
= 32 + 15
= 47<sub>10</sub></div>
  </div>
  <div class="col">
    <span class="label">Como ler</span>
    <ul class="list tight">
      <li>O 2 ocupa a casa das "dezesseis": 2×16.</li>
      <li>O F ocupa a casa das unidades: F vale 15.</li>
      <li>A soma dos dois dá o valor em decimal.</li>
    </ul>
    <p class="muted small">As casas multiplicam por potências de 16: 1, 16, 256...</p>
  </div>
</div>

<div class="callout">
  <span class="tag">RESULTADO</span>
  <code>2F<sub>16</sub></code> e <code>47<sub>10</sub></code> são duas escritas para o mesmo valor: quarenta e sete.
</div>

---

<!-- _class: section-divider -->

<div class="part">PARTE 03 / 03</div>

# Comparação e notação

<div class="topic-list">
  <div class="topic"><span class="n">01</span><span>Mesmo valor, três escritas</span></div>
  <div class="topic"><span class="n">02</span><span>Os três sistemas lado a lado</span></div>
  <div class="topic"><span class="n">03</span><span>A notação com subscrito</span></div>
  <div class="topic"><span class="n">04</span><span>Exercícios</span></div>
</div>

---

<!-- _class: accent-purple -->

<div class="eyebrow">SÍNTESE PARCIAL</div>

# O mesmo valor escrito de três formas

<p class="subtitle">O onze, por exemplo, existe nas três bases, com escritas diferentes.</p>

<div class="cards cols-3">
  <div class="card">
    <span class="n">01</span>
    <h3>11</h3>
    <p>Na base 10, são duas casas: uma dezena e uma unidade.</p>
  </div>
  <div class="card c-teal">
    <span class="n">02</span>
    <h3>1011</h3>
    <p>Na base 2, os bits 8, 2 e 1 estão ativos e somam onze.</p>
  </div>
  <div class="card c-orange">
    <span class="n">03</span>
    <h3>B</h3>
    <p>Na base 16, uma única casa segura o valor inteiro.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">MESMO VALOR</span>
  <code>11<sub>10</sub></code>, <code>1011<sub>2</sub></code> e <code>B<sub>16</sub></code> apontam para o mesmo número: onze.
</div>

---

<div class="eyebrow">COMPARAÇÃO</div>

# Os três sistemas, aspecto por aspecto

| Sistema | Base | Símbolos | Papel nesta disciplina |
|---|:---:|---|---|
| Decimal | 10 | 0 a 9 | o sistema do dia a dia |
| Binário | 2 | 0 e 1 | o interno do computador |
| Hexadecimal | 16 | 0 a 9 e A a F | atalho para escrever binário |

<div class="callout">
  <span class="tag">LEITURA</span>
  Os três seguem a mesma lógica posicional: o que muda é o tamanho do alfabeto e o peso das casas.
</div>

---

<!-- _class: accent-orange -->

<div class="eyebrow">CONVENÇÃO</div>

# O subscrito deixa a base explícita

<div class="two-col">
  <div class="col">
    <span class="label">O problema</span>
    <p>Sem indicação de base, a escrita <code>10</code> é ambígua: pode valer dois, dez ou dezesseis.</p>
    <p class="muted">A sequência de algarismos sozinha não fecha a leitura.</p>
  </div>
  <div class="col">
    <span class="label">A convenção</span>
    <p>O subscrito no fim do número nomeia a base: <code>10<sub>2</sub></code>, <code>10<sub>10</sub></code>, <code>10<sub>16</sub></code>.</p>
    <p class="muted">Com a base explícita, o valor fica determinado.</p>
  </div>
</div>

<div class="equation">10<sub>2</sub> = 2   ·   10<sub>10</sub> = 10   ·   10<sub>16</sub> = 16</div>

<div class="callout">
  <span class="tag">REGRA DA DISCIPLINA</span>
  Sempre que a base importar para a leitura, escreva o subscrito.
</div>

---

<div class="eyebrow">EXERCÍCIO</div>

# Quatro números para interpretar

<div class="cards cols-2">
  <div class="card">
    <span class="n">01</span>
    <h3>Interpretar 1101<sub>2</sub></h3>
    <p>Quais posições estão ativas e qual o valor?</p>
  </div>
  <div class="card">
    <span class="n">02</span>
    <h3>Decompor 25<sub>10</sub></h3>
    <p>Escreva o número em casas e pesos decimais.</p>
  </div>
  <div class="card">
    <span class="n">03</span>
    <h3>Interpretar 3A<sub>16</sub></h3>
    <p>Quanto vale cada símbolo e qual o total?</p>
  </div>
  <div class="card">
    <span class="n">04</span>
    <h3>Escrever onze</h3>
    <p>Represente o valor nas três bases vistas hoje.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">COMO RESPONDER</span>
  Decomponha em potências da base e some as contribuições. A conversão algorítmica fica para a próxima aula.
</div>

---

<!-- _class: title -->

<div class="eyebrow">SÍNTESE</div>

# A base diz quantos símbolos,
# a posição diz quanto pesa:
# juntos, definem o valor

<p class="subtitle">Próxima aula: como converter entre bases, passo a passo.</p>

<div class="byline">
  <strong>Prof. Victor Brayner</strong>
  <span>arquitetura computacional · unidade I</span>
</div>

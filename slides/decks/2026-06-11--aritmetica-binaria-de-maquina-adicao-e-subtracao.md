---
marp: true
theme: campus-dev
size: 16:9
paginate: true
html: true
footer: 'FUNDAMENTOS DE ARQUITETURA DE COMPUTADORES · AULA 03'
---

<!-- _class: title -->

<div class="eyebrow">ARQUITETURA DE COMPUTADORES · AULA 03</div>

# Aritmética binária de máquina

<p class="subtitle">Adição, carry e empréstimos em cascata na ULA.</p>

---

<div class="eyebrow">ADIÇÃO</div>

# Cada coluna soma bits e o carry recebido

| A | B | Carry de entrada | Resultado | Carry de saída |
|---:|---:|---:|---:|---:|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 | 1 |

<div class="callout"><span class="tag">CARRY</span>Quando a soma vale 2 em decimal, a coluna escreve 0 e transporta 1 para a coluna à esquerda.</div>

---

<div class="eyebrow">EXEMPLO DIRETO</div>

# Sem carry, as colunas podem ser somadas diretamente

```text
  1010₂
+ 0101₂
-------
  1111₂
```

<p>Verificação decimal: 10 + 5 = 15.</p>

---

<div class="eyebrow">COM TRANSPORTE</div>

# Carry pode criar um novo bit à esquerda

```text
   1110₂
+  1011₂
--------
  11001₂
```

<div class="two-col"><div class="col"><span class="label">Percurso</span><p>Some da direita para a esquerda e transporte 1 sempre que a coluna totalizar 2 ou 3.</p></div><div class="col"><span class="label">Validação</span><p>14 + 11 = 25, e 25 em binário é 11001₂.</p></div></div>

---

<div class="eyebrow">SUBTRAÇÃO</div>

# Ao subtrair 1 de 0, empreste uma unidade da coluna à esquerda

<div class="equation">10₂ − 1₂ = 1₂</div>

<p>O 10₂ emprestado vale 2 na coluna atual. Depois de subtrair 1, sobra 1 e a coluna vizinha reduz seu valor.</p>

---

<div class="eyebrow">EXEMPLO COM EMPRÉSTIMO</div>

# O empréstimo resolve a coluna em que 0 − 1 não cabe

```text
  1010₂
- 0101₂
-------
  0101₂
```

<p>Verificação decimal: 10 − 5 = 5.</p>

---

<div class="eyebrow">CASCATA</div>

# Zeros consecutivos propagam o empréstimo

```text
  10000₂
- 00111₂
--------
  01001₂
```

<div class="steps cols-3"><div class="step"><span class="n">01</span><h3>Localizar</h3><p>O bit 1 disponível está à esquerda dos zeros.</p></div><div class="step"><span class="n">02</span><h3>Propagar</h3><p>O empréstimo atravessa as colunas zeradas.</p></div><div class="step"><span class="n">03</span><h3>Subtrair</h3><p>16 − 7 = 9, que é 01001₂.</p></div></div>

---

<div class="eyebrow">SEGUNDO EXEMPLO</div>

# Alinhar os bits evita perder a posição das colunas

```text
  100000₂
- 000011₂
---------
  011101₂
```

<p>O empréstimo parte do bit 1 mais à esquerda e atravessa os zeros. Verificação: 32 − 3 = 29; 29 em binário é 11101₂.</p>

---

<div class="eyebrow">PROCEDIMENTO</div>

# Resolva da direita para a esquerda e valide em decimal

<div class="steps cols-4">
  <div class="step"><span class="n">01</span><h3>Alinhar</h3><p>Escreva os bits pela mesma posição.</p></div>
  <div class="step"><span class="n">02</span><h3>Operar</h3><p>Some ou subtraia cada coluna.</p></div>
  <div class="step"><span class="n">03</span><h3>Registrar</h3><p>Propague carry ou borrow.</p></div>
  <div class="step"><span class="n">04</span><h3>Conferir</h3><p>Compare com a operação decimal.</p></div>
</div>

---

<div class="eyebrow">EXERCÍCIO</div>

# Resolva 100000₂ − 11₂ mostrando cada empréstimo

<p>Alinhe os operandos como <code>100000₂ − 000011₂</code>. Registre como o empréstimo atravessa os zeros antes de subtrair as colunas.</p>

<div class="callout"><span class="tag">CONFERÊNCIA</span>O resultado é 29 em decimal, isto é, 11101₂.</div>

---

<div class="eyebrow">SÍNTESE</div>

# Carry e borrow descrevem o transporte entre colunas

<ul class="list tight">
  <li>Carry leva o excedente de uma soma para a coluna seguinte.</li>
  <li>Borrow empresta valor da coluna à esquerda.</li>
  <li>Em sequências de zeros, empréstimos se propagam em cascata.</li>
  <li>A conversão para decimal ajuda a validar o resultado.</li>
</ul>

---

<div class="eyebrow">REFERÊNCIA</div>

# Material da aula

Listas de Exercícios 1 e 2 da disciplina. Regras de aritmética binária.

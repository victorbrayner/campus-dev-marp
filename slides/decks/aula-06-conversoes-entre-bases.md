---
marp: true
theme: campus-dev
size: 16:9
paginate: true
html: true
footer: 'ARQUITETURA COMPUTACIONAL · UNIDADE I'
---

<!-- _class: title -->

<div class="eyebrow">ARQUITETURA COMPUTACIONAL · AULA 06</div>

# Conversões entre bases

<p class="subtitle">Como transformar representações decimal, binária e hexadecimal sem mudar o valor.</p>

<div class="byline">
  <strong>Prof. Victor Brayner</strong>
  <span>ads · 1º período</span>
</div>

---

<!-- _class: accent-purple -->

<div class="eyebrow">O PONTO DE PARTIDA</div>

# Converter não muda o valor, muda a escrita

<p class="subtitle">Trinta e cinco pode ser escrito 35, 100011 ou 23. O número é um; as representações são várias.</p>

<div class="two-col">
  <div class="col">
    <span class="label">O que uma conversão faz</span>
    <p>Uma conversão troca a forma de escrever o mesmo valor. <code>47<sub>10</sub></code>, <code>101111<sub>2</sub></code> e <code>2F<sub>16</sub></code> são três escritas de um único número.</p>
  </div>
  <div class="col">
    <span class="label">O que ela não faz</span>
    <p>Nenhuma conversão altera a quantidade representada. Se o resultado mudou de valor, o erro está no processo, não na base.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">HOJE</span>
  Seis sentidos de conversão entre decimal, binário e hexadecimal, cada um com um procedimento passo a passo.
</div>

---

<!-- _class: section-divider -->

<div class="part">PARTE 01 / 04</div>

# Binário e decimal

<div class="topic-list cols-3">
  <div class="topic"><span class="n">01</span><span>Binário para decimal</span></div>
  <div class="topic"><span class="n">02</span><span>Decimal para binário</span></div>
  <div class="topic"><span class="n">03</span><span>O erro clássico dos restos</span></div>
</div>

---

<div class="eyebrow">MÉTODO 01</div>

# Binário para decimal: somar os pesos das posições ativas

<div class="two-col">
  <div class="col">
    <span class="label">O procedimento</span>
    <ol class="list ordered">
      <li>Escreva o peso de cada casa: 1, 2, 4, 8...</li>
      <li>Multiplique cada bit pelo peso da casa dele.</li>
      <li>Some as contribuições.</li>
    </ol>
    <p class="muted small">Os bits em 0 contribuem com zero e podem ser ignorados na soma.</p>
  </div>
  <div class="col">
    <span class="label">Por que funciona</span>
    <p>É a mesma decomposição posicional da aula passada, agora usada como método de cálculo.</p>
    <p class="muted">Aula 05 mostrou a decomposição; aqui ela vira ferramenta de conversão.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">REGRA</span>
  Valor posicional: cada bit vale o peso da casa em que está. A soma dos pesos ativos é o valor decimal.
</div>

---

<!-- _class: accent-teal -->

<div class="eyebrow">EXEMPLO COMPLETO</div>

# Decompondo 1101 em base 2

| Algarismo | 1 | 1 | 0 | 1 |
|---|:---:|:---:|:---:|:---:|
| Potência | 2<sup>3</sup> | 2<sup>2</sup> | 2<sup>1</sup> | 2<sup>0</sup> |
| Valor | 8 | 4 | 2 | 1 |
| Contribuição | 8 | 4 | 0 | 1 |

<div class="equation">8 + 4 + 0 + 1 = 13</div>

<div class="callout">
  <span class="tag">RESULTADO</span>
  <code>1101<sub>2</sub></code> = <code>13<sub>10</sub></code>. Esse par volta a aparecer no método inverso, a seguir.
</div>

---

<div class="eyebrow">MÉTODO 02</div>

# Decimal para binário: dividir por 2 até chegar em 0

<div class="two-col">
  <div class="col">
    <span class="label">O procedimento</span>
    <ol class="list ordered">
      <li>Divida o número por 2 e anote o resto.</li>
      <li>Divida o quociente por 2, anote o resto, e repita.</li>
      <li>Continue até o quociente chegar em 0.</li>
      <li>Leia os restos de baixo para cima.</li>
    </ol>
  </div>
  <div class="col">
    <span class="label">Por que funciona</span>
    <p>Cada divisão separa o número em uma parte par (quociente × 2) e uma parte ímpar (o resto).</p>
    <p class="muted">O resto é o bit da casa atual; o quociente segue para a casa seguinte.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">REGRA</span>
  Resto vira bit da casa atual. O quociente alimenta a próxima divisão.
</div>

---

<!-- _class: accent-teal -->

<div class="eyebrow">EXEMPLO COMPLETO</div>

# Convertendo 13 para binário

| Divisão | Quociente | Resto |
|---|:---:|:---:|
| 13 ÷ 2 | 6 | <strong>1</strong> |
| 6 ÷ 2 | 3 | <strong>0</strong> |
| 3 ÷ 2 | 1 | <strong>1</strong> |
| 1 ÷ 2 | 0 | <strong>1</strong> |

<div class="two-col">
  <div class="col">
    <span class="label">A leitura dos restos</span>
    <p>De baixo para cima: 1, 1, 0, 1.</p>
    <p class="muted">O último quociente é 0, então a sequência termina.</p>
  </div>
  <div class="col">
    <span class="label">A conferência</span>
    <div class="code">1101<sub>2</sub> = 8 + 4 + 1 = 13<sub>10</sub></div>
  </div>
</div>

<div class="callout">
  <span class="tag">FECHADO</span>
  <code>13<sub>10</sub></code> = <code>1101<sub>2</sub></code>. O caminho inverso confirma o resultado do método anterior.
</div>

---

<!-- _class: accent-orange -->

<div class="eyebrow">ERRO COMUM</div>

# O erro clássico: ler os restos na ordem em que saíram

<div class="two-col">
  <div class="col">
    <span class="label">O que o aluno faz</span>
    <p>Os restos saem 1, 0, 1, 1, e a pessoa escreve <code>1011<sub>2</sub></code>. Essa leitura está invertida.</p>
  </div>
  <div class="col">
    <span class="label">O que deveria fazer</span>
    <p>Os últimos restos correspondem às casas mais à esquerda, que valem mais. A leitura correta é de baixo para cima: <code>1101<sub>2</sub></code>.</p>
  </div>
</div>

<div class="two-col">
  <div class="col">
    <div class="panel c-orange">
      <span class="label">1011<sub>2</sub> (errado)</span>
      <p>Vale 8 + 2 + 1 = 11. Não é treze.</p>
    </div>
  </div>
  <div class="col">
    <div class="panel c-teal">
      <span class="label">1101<sub>2</sub> (certo)</span>
      <p>Vale 8 + 4 + 1 = 13. Conferido.</p>
    </div>
  </div>
</div>

<div class="callout">
  <span class="tag">COMO EVITAR</span>
  Sempre confira convertendo o binário de volta para decimal. A conferência demora segundos e derruba esse erro na hora.
</div>

---

<!-- _class: section-divider -->

<div class="part">PARTE 02 / 04</div>

# Hexadecimal e decimal

<div class="topic-list cols-3">
  <div class="topic"><span class="n">01</span><span>Hexadecimal para decimal</span></div>
  <div class="topic"><span class="n">02</span><span>Decimal para hexadecimal</span></div>
  <div class="topic"><span class="n">03</span><span>Restos que viram letras</span></div>
</div>

---

<div class="eyebrow">MÉTODO 03</div>

# Hexadecimal para decimal: a mesma soma de pesos, com potências de 16

<div class="two-col">
  <div class="col">
    <span class="label">O procedimento</span>
    <ol class="list ordered">
      <li>Converta cada letra para o valor dela: A=10 ... F=15.</li>
      <li>Multiplique cada algarismo pelo peso da casa: 1, 16, 256...</li>
      <li>Some as contribuições.</li>
    </ol>
  </div>
  <div class="col">
    <span class="label">A estrutura é a mesma</span>
    <p>Valor posicional não muda com a base: o que muda é o peso das casas, agora potências de 16.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">REGRA</span>
  Antes de multiplicar, troque cada letra pelo valor numérico dela. F não é um algarismo, vale 15.
</div>

---

<!-- _class: accent-teal -->

<div class="eyebrow">EXEMPLO COMPLETO</div>

# Decompondo 2F em base 16

| Algarismo | 2 | F |
|---|:---:|:---:|
| Potência | 16<sup>1</sup> | 16<sup>0</sup> |
| Valor | 16 | 1 |
| Contribuição | 32 | 15 |

<div class="equation">32 + 15 = 47</div>

<div class="callout">
  <span class="tag">RESULTADO</span>
  <code>2F<sub>16</sub></code> = <code>47<sub>10</sub></code>. Mesmo 47 da primeira conversão da aula: <code>101111<sub>2</sub></code> = <code>47<sub>10</sub></code>.
</div>

---

<div class="eyebrow">MÉTODO 04</div>

# Decimal para hexadecimal: dividir por 16 e converter os restos

<div class="two-col">
  <div class="col">
    <span class="label">O procedimento</span>
    <ol class="list ordered">
      <li>Divida por 16 e anote o resto.</li>
      <li>Repita com o quociente até chegar em 0.</li>
      <li>Leia os restos de baixo para cima.</li>
      <li>Resto de 10 a 15 vira A a F.</li>
    </ol>
  </div>
  <div class="col">
    <span class="label">A única diferença</span>
    <p>É o método das divisões sucessivas, agora por 16. A única etapa nova é traduzir os restos maiores que 9.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">REGRA</span>
  Mesmo algoritmo das divisões sucessivas; a base mudou de 2 para 16, e os restos 10 a 15 viram letras.
</div>

---

<!-- _class: accent-teal -->

<div class="eyebrow">EXEMPLO COMPLETO</div>

# Convertendo 47 para hexadecimal

| Divisão | Quociente | Resto | Dígito |
|---|:---:|:---:|:---:|
| 47 ÷ 16 | 2 | 15 | <strong>F</strong> |
| 2 ÷ 16 | 0 | 2 | <strong>2</strong> |

<div class="two-col">
  <div class="col">
    <span class="label">A leitura dos restos</span>
    <p>De baixo para cima: 2, F.</p>
    <p class="muted">O resto 15 recebe a letra F, porque a base 16 não tem símbolo para ele.</p>
  </div>
  <div class="col">
    <span class="label">A conferência</span>
    <div class="code">2F<sub>16</sub> = 2×16 + 15 = 47<sub>10</sub></div>
  </div>
</div>

<div class="callout">
  <span class="tag">FECHADO</span>
  <code>47<sub>10</sub></code> = <code>2F<sub>16</sub></code>. A conferência usa o método 03, que já era conhecido.
</div>

---

<!-- _class: section-divider -->

<div class="part">PARTE 03 / 04</div>

# A ponte direta entre binário e hexadecimal

<div class="topic-list cols-3">
  <div class="topic"><span class="n">01</span><span>Por que 4 bits = 1 dígito</span></div>
  <div class="topic"><span class="n">02</span><span>A tabela de 16 linhas</span></div>
  <div class="topic"><span class="n">03</span><span>Agrupar, traduzir, juntar</span></div>
</div>

---

<!-- _class: accent-purple -->

<div class="eyebrow">CONCEITO</div>

# Quatro bits formam exatamente um dígito hexadecimal

<div class="two-col">
  <div class="col">
    <span class="label">A conta</span>
    <p>Quatro bits formam <code>2<sup>4</sup> = 16</code> combinações, de <code>0000</code> até <code>1111</code>.</p>
    <p class="muted">A base 16 tem exatamente dezesseis símbolos. A conta fecha de lado a lado.</p>
  </div>
  <div class="col">
    <span class="label">A consequência</span>
    <p>Cada grupo de 4 bits corresponde a um único dígito hexadecimal, sem sobrar nem faltar.</p>
    <p class="muted">Por isso o hexadecimal existe: é uma escrita compacta para o binário.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">POR ISSO</span>
  A correspondência 4 bits = 1 dígito é exata. Não é aproximação, é aritmética.
</div>

---

<div class="eyebrow">TABELA DE REFERÊNCIA</div>

# A tabela dos 16 pares, memorize esta

| Binário | Hex | Binário | Hex | Binário | Hex | Binário | Hex |
|---|:---:|---|:---:|---|:---:|---|:---:|
| 0000 | 0 | 0100 | 4 | 1000 | 8 | 1100 | C |
| 0001 | 1 | 0101 | 5 | 1001 | 9 | 1101 | D |
| 0010 | 2 | 0110 | 6 | 1010 | A | 1110 | E |
| 0011 | 3 | 0111 | 7 | 1011 | B | 1111 | F |

<div class="callout">
  <span class="tag">COMO USAR</span>
  Ela substitui qualquer cálculo nas conversões binário ↔ hexadecimal. Os dois métodos seguintes são só consulta.
</div>

---

<!-- _class: accent-teal -->

<div class="eyebrow">MÉTODO 05</div>

# Binário para hexadecimal: agrupar de 4 em 4 e traduzir

<div class="two-col">
  <div class="col">
    <span class="label">O procedimento</span>
    <ol class="list ordered">
      <li>Separe os bits em grupos de 4, da direita para a esquerda.</li>
      <li>Se o grupo da esquerda ficar menor, complete com zeros.</li>
      <li>Traduza cada grupo pela tabela.</li>
    </ol>
  </div>
  <div class="col">
    <span class="label">Exemplo</span>
    <div class="code">1010 1111<sub>2</sub>
  A    F
→ AF<sub>16</sub></div>
  </div>
</div>

<div class="callout">
  <span class="tag">REGRA</span>
  Agrupar sempre da direita para a esquerda. É a direção das casas de menor para maior peso.
</div>

---

<!-- _class: accent-teal -->

<div class="eyebrow">MÉTODO 06</div>

# Hexadecimal para binário: um dígito vira 4 bits

<div class="two-col">
  <div class="col">
    <span class="label">O procedimento</span>
    <ol class="list ordered">
      <li>Traduza cada dígito para o grupo de 4 bits da tabela.</li>
      <li>Junte os grupos na mesma ordem.</li>
    </ol>
    <p class="muted small">Sem divisão, sem soma. É consulta direta à tabela.</p>
  </div>
  <div class="col">
    <span class="label">Exemplo</span>
    <div class="code">3C<sub>16</sub>
3 = 0011
C = 1100
→ 00111100<sub>2</sub></div>
  </div>
</div>

<div class="callout">
  <span class="tag">REGRA</span>
  Cada dígito hexadecimal gera exatamente 4 bits, mesmo que comece em 0. <code>3</code> vira <code>0011</code>, não <code>11</code>.
</div>

---

<!-- _class: section-divider -->

<div class="part">PARTE 04 / 04</div>

# Prática e conferência

<div class="topic-list cols-3">
  <div class="topic"><span class="n">01</span><span>O exemplo que fecha o ciclo</span></div>
  <div class="topic"><span class="n">02</span><span>Exercícios</span></div>
  <div class="topic"><span class="n">03</span><span>Zeros à esquerda</span></div>
  <div class="topic"><span class="n">04</span><span>Fontes</span></div>
</div>

---

<!-- _class: accent-purple -->

<div class="eyebrow">SÍNTESE</div>

# 47 fecha o ciclo: um valor, três escritas

<p class="subtitle">O exemplo que atravessou a aula inteira, agora de lado a lado.</p>

<div class="cards cols-3">
  <div class="card">
    <span class="n">01</span>
    <h3>47</h3>
    <p>Decimal, o sistema do dia a dia.</p>
  </div>
  <div class="card c-teal">
    <span class="n">02</span>
    <h3>101111</h3>
    <p>Binário, obtido por divisões sucessivas por 2.</p>
  </div>
  <div class="card c-orange">
    <span class="n">03</span>
    <h3>2F</h3>
    <p>Hexadecimal, obtido por divisões sucessivas por 16.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">ATALHO</span>
  Também dá para ir de <code>101111<sub>2</sub></code> a <code>2F<sub>16</sub></code> sem passar pelo decimal: agrupe de 4 em 4 e consulte a tabela. <code>0010 1111</code> → <code>2F</code>.
</div>

---

<div class="eyebrow">CONFERÊNCIA</div>

# Conferindo AF pelo caminho decimal

<div class="two-col">
  <div class="col">
    <span class="label">A pergunta</span>
    <p>Todo resultado merece conferência. A conferência de <code>AF<sub>16</sub></code> usa a decomposição que você já domina.</p>
  </div>
  <div class="col">
    <span class="label">A conta</span>
    <div class="code">AF<sub>16</sub> = 10×16 + 15
       = 160 + 15
       = 175<sub>10</sub></div>
  </div>
</div>

<div class="callout">
  <span class="tag">HÁBITO</span>
  Converta o resultado de volta para decimal sempre que houver tempo. É a única checagem que não depende de repetir o mesmo raciocínio duas vezes.
</div>

---

<div class="eyebrow">DETALHE PRÁTICO</div>

# Zeros à esquerda não mudam o valor, e ajudam

<div class="two-col">
  <div class="col">
    <span class="label">No binário</span>
    <p><code>101111<sub>2</sub></code> e <code>00101111<sub>2</sub></code> valem o mesmo 47.</p>
    <p class="muted small">Complete com zeros para fechar grupos de 4 bits na conversão para hexadecimal.</p>
  </div>
  <div class="col">
    <span class="label">No hexadecimal</span>
    <p><code>2F<sub>16</sub></code> e <code>02F<sub>16</sub></code> valem o mesmo 47.</p>
    <p class="muted small">Zeros à esquerda são comuns quando um valor ocupa um número fixo de bits na máquina.</p>
  </div>
</div>

<div class="callout">
  <span class="tag">PARA FIXAR</span>
  Zeros à esquerda acrescentam casas de peso zero, então o valor fica intacto.
</div>

---

<div class="eyebrow">EXERCÍCIO</div>

# Quatro conversões para resolver

<div class="two-col">
  <div class="col">
    <ol class="list ordered">
      <li>Converter <code>10110<sub>2</sub></code> para decimal.</li>
      <li>Converter <code>29<sub>10</sub></code> para binário.</li>
      <li>Converter <code>3A<sub>16</sub></code> para decimal.</li>
      <li>Converter <code>11101111<sub>2</sub></code> para hexadecimal.</li>
    </ol>
  </div>
  <div class="col">
    <span class="label">Respostas para conferir</span>
    <ul class="list tight">
      <li><code>10110<sub>2</sub></code> = 16 + 4 + 2 = <strong>22</strong>.</li>
      <li><code>29<sub>10</sub></code>: 29÷2=14 r1, 14÷2=7 r0, 7÷2=3 r1, 3÷2=1 r1, 1÷2=0 r1 → <strong>11101<sub>2</sub></strong>.</li>
      <li><code>3A<sub>16</sub></code> = 3×16 + 10 = <strong>58</strong>.</li>
      <li><code>1110 1111</code> → <strong>EF<sub>16</sub></strong>.</li>
    </ul>
    <p class="muted small">Resolva antes de olhar a coluna da direita.</p>
  </div>
</div>

---

<!-- _class: title -->

<div class="eyebrow">SÍNTESE</div>

# Converter não cria nem destrói valor:
# só muda a forma de escrever

<p class="subtitle">Próxima aula: somar e subtrair diretamente em binário.</p>

<div class="byline">
  <strong>Prof. Victor Brayner</strong>
  <span>arquitetura computacional · unidade I</span>
</div>

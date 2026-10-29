---
marp: true
theme: campus-dev
size: 16:9
paginate: true
html: true
footer: 'FUNDAMENTOS DE ARQUITETURA DE COMPUTADORES · AULA 02'
---

<!-- _class: title -->

<div class="eyebrow">ARQUITETURA DE COMPUTADORES · AULA 02</div>

# Calculadora de um dígito em NASM

<p class="subtitle">A ULA calcula em binário; a saída precisa de um caractere ASCII.</p>

---

<div class="eyebrow">PROBLEMA</div>

# Um valor numérico não é automaticamente um caractere

<div class="two-col">
  <div class="col"><span class="label">Resultado da ULA</span><p>A operação <code>5 + 3</code> produz o valor numérico 8 em um registrador.</p><p>Esse valor é armazenado como bits, não como o caractere visível “8”.</p></div>
  <div class="col"><span class="label">Saída de texto</span><p>A tela recebe códigos de caracteres.</p><p>Na tabela ASCII, o caractere <code>'0'</code> corresponde a 48; somar 48 ao dígito produz seu código ASCII.</p></div>
</div>

---

<div class="eyebrow">CONVERSÃO</div>

# Para dígitos de 0 a 9, some 48 ao valor

<div class="equation">código ASCII = valor do dígito + 48</div>

<div class="steps cols-3">
  <div class="step"><span class="n">01</span><h3>Calcular</h3><p>5 + 3 = 8</p></div>
  <div class="step"><span class="n">02</span><h3>Converter</h3><p>8 + 48 = 56</p></div>
  <div class="step"><span class="n">03</span><h3>Exibir</h3><p>O código 56 representa o caractere “8”.</p></div>
</div>

---

<div class="eyebrow">REGISTRADORES</div>

# AL é o byte inferior de RAX

<div class="cards cols-4">
  <div class="card"><h3>RAX</h3><p>Registrador de 64 bits.</p></div>
  <div class="card"><h3>EAX</h3><p>Parte inferior de 32 bits.</p></div>
  <div class="card"><h3>AX</h3><p>Parte inferior de 16 bits.</p></div>
  <div class="card c-blue"><h3>AL</h3><p>Parte inferior de 8 bits.</p></div>
</div>

<div class="callout"><span class="tag">TAMANHO</span>O resultado convertido cabe em AL e pode ser gravado em uma posição de memória de 1 byte.</div>

---

<div class="eyebrow">MEMÓRIA</div>

# .bss reserva espaço sem inicializar os bytes

<div class="two-col">
  <div class="col"><span class="label">Reserva</span><p><code>section .bss</code> organiza dados não inicializados.</p><p><code>res resb 1</code> reserva um byte para o resultado.</p></div>
  <div class="col"><span class="label">Endereço e conteúdo</span><p><code>res</code> nomeia o endereço da posição reservada.</p><p><code>[res]</code> acessa o conteúdo armazenado nesse endereço.</p></div>
</div>

---

<div class="eyebrow">SOMA</div>

# A soma fica em RAX antes da conversão

```nasm
section .bss
    res resb 1

section .text
    mov rax, 5
    mov rbx, 3
    add rax, rbx       ; RAX = 8
    add rax, 48        ; código ASCII de '8'
    mov [res], al      ; grava um byte
```

<p class="muted">A ULA opera sobre os valores numéricos; a conversão prepara o resultado para impressão.</p>

---

<div class="eyebrow">IMPRIMIR</div>

# sys_write recebe o endereço do caractere e seu tamanho

```nasm
    mov rax, 1         ; sys_write
    mov rdi, 1         ; stdout
    mov rsi, res       ; endereço do byte
    mov rdx, 1         ; comprimento
    syscall
```

<div class="callout"><span class="tag">ORDEM</span>Gravar o byte em memória permite passar seu endereço à chamada de sistema.</div>

---

<div class="eyebrow">OUTRAS OPERAÇÕES</div>

# Mudar a instrução aritmética muda o cálculo

| Instrução | Operação | Observação |
|---|---|---|
| `add` | Soma | Acumula o segundo operando no destino |
| `sub` | Subtração | Subtrai a fonte do destino |
| `imul` | Multiplicação com sinal | Forma de dois operandos para o resultado no destino |
| `div` | Divisão sem sinal | Usa registradores de tamanho compatível com o divisor |

<p class="muted">Ao multiplicar 4 por 2 com <code>imul</code>, o resultado numérico é 8; em seguida, converta para ASCII.</p>

---

<div class="eyebrow">LIMITES DO EXEMPLO</div>

# Um byte ASCII resolve apenas um dígito decimal

<div class="two-col">
  <div class="col"><span class="label">Funciona para</span><p>Resultados entre 0 e 9, que correspondem a um caractere numérico.</p></div>
  <div class="col"><span class="label">Exige outro algoritmo</span><p>Números com mais de um dígito precisam ser separados em caracteres antes da impressão.</p></div>
</div>

---

<div class="eyebrow">SÍNTESE</div>

# O programa converte o resultado numérico antes de exibi-lo

<div class="flow outline"><div class="node"><h3>Operar</h3><p>ADD / SUB / IMUL / DIV</p></div><div class="node"><h3>Converter</h3><p>somar 48 ao dígito</p></div><div class="node"><h3>Armazenar</h3><p>AL → [res]</p></div><div class="node"><h3>Exibir</h3><p>sys_write</p></div></div>

---

<div class="eyebrow">REFERÊNCIA</div>

# Leitura da aula

Manual NASM; tabela ASCII padrão; Tanenbaum, A. S. *Organização Estruturada de Computadores*.

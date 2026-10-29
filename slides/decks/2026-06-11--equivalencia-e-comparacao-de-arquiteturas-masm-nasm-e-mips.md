---
marp: true
theme: campus-dev
size: 16:9
paginate: true
html: true
footer: 'FUNDAMENTOS DE ARQUITETURA DE COMPUTADORES · AULA 04'
---

<!-- _class: title -->

<div class="eyebrow">ARQUITETURA DE COMPUTADORES · AULA 04</div>

# MASM, NASM e MIPS

<p class="subtitle">Sintaxes diferentes representam operações sobre registradores e memória.</p>

---

<div class="eyebrow">MODELOS</div>

# Montadores e conjuntos de instruções têm convenções próprias

<div class="cards cols-2">
  <div class="card"><h3>x86 · CISC</h3><p>MASM e NASM usam instruções com dois operandos na aritmética apresentada; o destino também é uma fonte.</p></div>
  <div class="card c-blue"><h3>MIPS · RISC</h3><p>Instruções aritméticas como <code>add</code> usam destino e duas fontes explícitas.</p></div>
</div>

---

<div class="eyebrow">SINTAXE</div>

# Uma mesma intenção pode usar nomes e formatos diferentes

| Operação | MASM · x86 32 bits | NASM · x86-64 | MIPS · 32 bits |
|---|---|---|---|
| Carregar constante | `MOV EAX, 10` | `mov rax, 10` | `li $t0, 10` |
| Somar registradores | `ADD EAX, EBX` | `add rax, rbx` | `add $t0, $t1, $t2` |
| Subtrair registradores | `SUB EAX, EBX` | `sub rax, rbx` | `sub $t0, $t1, $t2` |
| Seção de dados | `SEGMENT` | `section .data` | `.data` |

---

<div class="eyebrow">OPERANDOS</div>

# x86 usa destino e fonte; MIPS nomeia duas fontes

<div class="two-col">
  <div class="col"><span class="label">x86 · dois operandos</span><p><code>add eax, ebx</code> atualiza EAX com EAX + EBX.</p><p>O primeiro operando é destino e também participa do cálculo.</p></div>
  <div class="col"><span class="label">MIPS · três operandos</span><p><code>add $t0, $t1, $t2</code> atualiza $t0 com $t1 + $t2.</p><p>Destino e fontes aparecem separadamente.</p></div>
</div>

---

<div class="eyebrow">IMEDIATO E REGISTRADOR</div>

# O operando pode vir da instrução ou de um registrador

<div class="cards cols-2">
  <div class="card"><h3>Imediato</h3><p>Uma constante escrita na própria instrução, como <code>mov rax, 10</code>.</p></div>
  <div class="card"><h3>Registrador</h3><p>Um valor já armazenado em registrador, como a fonte de <code>add rax, rbx</code>.</p></div>
</div>

<div class="callout"><span class="tag">MIPS</span>MIPS usa <code>addi</code> para somar uma constante com sinal. Não existe uma instrução básica <code>subi</code>; subtrair 5 pode ser escrito como <code>addi $t0, $t1, -5</code>.</div>

---

<div class="eyebrow">RASTREAMENTO</div>

# A instrução sub altera o destino e preserva a fonte

```asm
mov rax, 80
mov rcx, 30
sub rax, rcx
```

| Etapa | RAX | RCX |
|---|---:|---:|
| Inicial | — | — |
| Após primeiro `mov` | 80 | — |
| Após segundo `mov` | 80 | 30 |
| Após `sub rax, rcx` | 50 | 30 |

---

<div class="eyebrow">REUTILIZAÇÃO</div>

# Expressões maiores viram uma sequência de operações simples

<div class="flow outline"><div class="node"><h3>Carregar</h3><p>colocar operandos em registradores</p></div><div class="node"><h3>Operar</h3><p>somar ou subtrair</p></div><div class="node"><h3>Acumular</h3><p>reutilizar resultados intermediários</p></div><div class="node"><h3>Guardar</h3><p>manter o resultado final</p></div></div>

<p class="muted">Acompanhar o estado após cada instrução revela onde o resultado parcial fica.</p>

---

<div class="eyebrow">DESTINO E FONTES</div>

# Leia a ordem dos operandos antes de comparar instruções

| Forma | Leitura |
|---|---|
| x86: `sub eax, ebx` | EAX recebe EAX − EBX |
| MIPS: `sub $t0, $t1, $t2` | $t0 recebe $t1 − $t2 |
| MIPS: `addi $t0, $t1, -5` | $t0 recebe $t1 − 5 |

<div class="callout"><span class="tag">CUIDADO</span>Copiar apenas o nome da operação sem ajustar a ordem dos operandos pode mudar o resultado.</div>

---

<div class="eyebrow">SÍNTESE</div>

# A lógica é comum; a sintaxe e o formato dos operandos variam

<ul class="list tight">
  <li>MASM e NASM usam convenções x86 de dois operandos na aritmética mostrada.</li>
  <li>MIPS separa destino e duas fontes em operações como <code>add</code>.</li>
  <li>Imediatos são constantes; operandos em registradores vêm de valores armazenados.</li>
  <li>Rastrear registradores após cada instrução permite conferir o cálculo.</li>
</ul>

---

<div class="eyebrow">REFERÊNCIAS</div>

# Leituras da aula

Tanenbaum, A. S. *Organização Estruturada de Computadores*. Patterson, D. A.; Hennessy, J. L. *Organização e Projeto de Computadores*.

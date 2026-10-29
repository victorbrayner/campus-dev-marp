---
marp: true
theme: campus-dev
size: 16:9
paginate: true
html: true
footer: 'FUNDAMENTOS DE ARQUITETURA DE COMPUTADORES · AULA 01'
---

<!-- _class: title -->

<div class="eyebrow">ARQUITETURA DE COMPUTADORES · AULA 01</div>

# Introdução ao Assembly NASM

<p class="subtitle">Da sintaxe MASM de 32 bits ao NASM de 64 bits em Linux.</p>

---

<div class="eyebrow">TRANSIÇÃO</div>

# MASM e NASM expressam operações de máquina com sintaxes diferentes

<div class="two-col">
  <div class="col"><span class="label">Conceitos que permanecem</span><p>Instruções, registradores, operandos, rótulos, comentários e organização de dados e código.</p></div>
  <div class="col"><span class="label">O que muda</span><p>Palavras-chave, diretivas e convenções do montador e do ambiente de execução.</p></div>
</div>

<div class="callout"><span class="tag">IDEIA</span>Aprender outro montador é reconhecer a mesma lógica em um dialeto sintático diferente.</div>

---

<div class="eyebrow">LINHA DE CÓDIGO</div>

# Uma instrução pode ter rótulo, opcode, operandos e comentário

```asm
inicio: mov rax, 1 ; código de syscall write
```

<div class="cards cols-3">
  <div class="card"><h3>Rótulo</h3><p><code>inicio</code> nomeia uma posição do programa.</p></div>
  <div class="card"><h3>Opcode e operandos</h3><p><code>mov rax, 1</code> indica a operação e seus dados.</p></div>
  <div class="card"><h3>Comentário</h3><p><code>; ...</code> explica o trecho para quem lê o código.</p></div>
</div>

---

<div class="eyebrow">MAPEAMENTO</div>

# Diretivas e registradores mudam entre os ambientes

| Conceito | MASM · x86 32 bits | NASM · x86-64 |
|---|---|---|
| Seção de dados | `SEGMENT` | `section .data` |
| Seção de código | `SEGMENT` | `section .text` |
| Registrador acumulador | `EAX` | `RAX` |
| Instrução de cópia | `MOV EAX, 1` | `mov rax, 1` |

<p class="muted">RAX tem 64 bits; EAX nomeia a parte baixa de 32 bits desse registrador.</p>

---

<div class="eyebrow">DIRETIVAS</div>

# O montador interpreta diretivas que a CPU não executa

<div class="cards cols-2">
  <div class="card"><h3>Instruções</h3><p><code>mov</code> e <code>syscall</code> viram operações executadas pela CPU.</p></div>
  <div class="card"><h3>Diretivas</h3><p><code>section</code>, <code>db</code>, <code>resb</code> e <code>global</code> orientam a montagem e a organização do programa.</p></div>
</div>

<div class="callout"><span class="tag">PERGUNTA</span>Quais linhas deixam de existir como texto após a montagem?</div>

---

<div class="eyebrow">SEÇÕES</div>

# Dados e instruções ficam em seções lógicas diferentes

<div class="two-col">
  <div class="col"><span class="label">section .data</span><p>Declara dados inicializados, como uma string terminada por quebra de linha.</p><p><code>msg db "Hello world!", 10</code></p></div>
  <div class="col"><span class="label">section .text</span><p>Contém instruções e o ponto de entrada declarado com <code>global _start</code>.</p><p>O rótulo <code>_start</code> identifica onde a execução começa.</p></div>
</div>

---

<div class="eyebrow">SYSCALL</div>

# Linux x86-64 recebe a chamada e os argumentos em registradores

| Registrador | Valor no exemplo | Papel |
|---|---:|---|
| RAX | 1 | Número da chamada `write` |
| RDI | 1 | Descritor de saída padrão |
| RSI | endereço de `msg` | Endereço dos bytes a escrever |
| RDX | 13 | Quantidade de bytes |

<p>O número 60 em RAX solicita `exit`; RDI contém o código de saída.</p>

---

<div class="eyebrow">HELLO WORLD</div>

# Este programa escreve a mensagem e encerra

```nasm
section .data
    msg db "Hello world!", 10

section .text
    global _start
_start:
    mov rax, 1
    mov rdi, 1
    mov rsi, msg
    mov rdx, 13
    syscall
    mov rax, 60
    mov rdi, 0
    syscall
```

<p class="muted">O roteiro indica execução em ambiente Linux de 64 bits, como mycompiler.io.</p>

---

<div class="eyebrow">FLUXO DO PROGRAMA</div>

# Dados são declarados, referenciados e enviados à saída

<div class="steps cols-3">
  <div class="step"><span class="n">01</span><h3>Declarar</h3><p><code>db</code> reserva e inicializa os bytes da mensagem.</p></div>
  <div class="step"><span class="n">02</span><h3>Preparar</h3><p>Registradores recebem chamada, descritor, endereço e tamanho.</p></div>
  <div class="step"><span class="n">03</span><h3>Executar</h3><p><code>syscall</code> pede ao Linux que escreva; outra chamada encerra o processo.</p></div>
</div>

---

<div class="eyebrow">SÍNTESE</div>

# A lógica Assembly permanece; a sintaxe depende do montador

<ul class="list tight">
  <li>NASM usa diretivas como <code>section .data</code> e <code>section .text</code>.</li>
  <li>RAX estende EAX para 64 bits.</li>
  <li>Diretivas organizam a montagem; instruções são executadas pela CPU.</li>
  <li>Linux x86-64 usa <code>syscall</code> para solicitar serviços do sistema.</li>
</ul>

---

<div class="eyebrow">REFERÊNCIA</div>

# Leitura da aula

Tanenbaum, A. S. *Organização Estruturada de Computadores*. 6ª ed. Registros de aula e guia de transição MASM/NASM.

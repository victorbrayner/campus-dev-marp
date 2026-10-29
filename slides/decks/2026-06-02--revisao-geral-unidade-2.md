---
marp: true
theme: campus-dev
size: 16:9
paginate: true
html: true
footer: 'SISTEMAS OPERACIONAIS · UNIDADE II'
---

<!-- _class: title -->

<div class="eyebrow">SISTEMAS OPERACIONAIS · AULA 05</div>

# Revisão geral
# da Unidade II

<p class="subtitle">Memória, sistemas de arquivos e entrada e saída.</p>

---

<div class="eyebrow">MAPA DA UNIDADE</div>

# O SO cria abstrações para recursos físicos diferentes

<div class="cards cols-3">
  <div class="card c-blue"><h3>Memória</h3><p>Paginação, tabela de páginas e TLB.</p></div>
  <div class="card c-purple"><h3>Armazenamento</h3><p>Arquivos, diretórios, i-nodes e journaling.</p></div>
  <div class="card c-teal"><h3>Entrada e saída</h3><p>Drivers, DMA e escalonamento.</p></div>
</div>

---

<div class="eyebrow">MEMÓRIA VIRTUAL</div>

# A tabela mapeia páginas; a TLB acelera a tradução

<div class="flow outline"><div class="node"><h3>Endereço virtual</h3><p>página + deslocamento</p></div><div class="node"><h3>TLB / tabela</h3><p>localizar o quadro</p></div><div class="node"><h3>RAM</h3><p>quadro + deslocamento</p></div></div>

<p>Se a página não estiver presente, a falta de página transfere o controle ao SO, que a carrega do disco e retoma a instrução.</p>

---

<div class="eyebrow">SUBSTITUIÇÃO</div>

# Clock usa o bit R para escolher uma página vítima

<div class="steps cols-3">
  <div class="step"><span class="n">01</span><h3>Verificar R</h3><p>O bit indica referência recente.</p></div>
  <div class="step"><span class="n">02</span><h3>Dar chance</h3><p>Se R = 1, zerar e avançar o ponteiro.</p></div>
  <div class="step"><span class="n">03</span><h3>Substituir</h3><p>Se R = 0, o quadro pode ser escolhido.</p></div>
</div>

---

<div class="eyebrow">COLAPSO DE MEMÓRIA</div>

# Thrashing indica disputa excessiva por quadros

<div class="two-col">
  <div class="col"><span class="label">Sinal</span><p>Faltas de página frequentes, disco ocupado e pouco progresso da CPU.</p></div>
  <div class="col"><span class="label">Resposta</span><p>Reduzir a multiprogramação para que os conjuntos de trabalho ativos caibam na RAM.</p></div>
</div>

---

<div class="eyebrow">SISTEMAS DE ARQUIVOS</div>

# FAT e i-nodes organizam a localização dos blocos

| Conceito | Como funciona | Atenção |
|---|---|---|
| FAT | Cadeia de blocos registrada em tabela | Tabela pode consumir muita RAM |
| I-node | Ponteiros diretos e indiretos para dados | Hard links compartilham o mesmo i-node |
| Journaling | Registra mudanças planejadas antes de aplicá-las | Ajuda a recuperar consistência após falha |

---

<div class="eyebrow">ENTRADA E SAÍDA</div>

# DMA transfere blocos e deixa a CPU livre para outras tarefas

<div class="flow outline"><div class="node"><h3>CPU configura</h3><p>endereço e tamanho</p></div><div class="node"><h3>DMA transfere</h3><p>dispositivo ↔ RAM</p></div><div class="node"><h3>Interrupção</h3><p>aviso ao terminar</p></div></div>

<p class="muted">O controlador DMA concorre pelo barramento com a CPU, mas evita uma interrupção para cada unidade transferida.</p>

---

<div class="eyebrow">DISCO</div>

# SCAN evita a espera indefinida possível no SSF

<div class="two-col">
  <div class="col"><span class="label">SSF</span><p>Atende o pedido mais próximo da posição atual do braço.</p><p>Pedidos distantes podem esperar repetidamente.</p></div>
  <div class="col"><span class="label">SCAN</span><p>Move o braço numa direção, atende os pedidos pelo caminho e retorna ao chegar ao fim.</p><p>A varredura dá uma ordem previsível de atendimento.</p></div>
</div>

---

<div class="eyebrow">RAID</div>

# Striping, espelhamento e paridade têm custos distintos

| Nível | Resumo | Trade-off |
|---|---|---|
| RAID 0 | Dados distribuídos | Desempenho, sem redundância |
| RAID 1 | Dados espelhados | Redundância com metade da capacidade total |
| RAID 5 | Paridade distribuída | Redundância com custo de paridade |

<div class="callout"><span class="tag">LEMBRETE</span>RAID não substitui backup: uma exclusão pode ser replicada no espelho.</div>

---

<div class="eyebrow">CONEXÃO ENTRE PILARES</div>

# Uma leitura pode envolver RAM, arquivo e dispositivo

<div class="flow outline"><div class="node"><h3>Processo</h3><p>solicita dados</p></div><div class="node"><h3>Memória virtual</h3><p>localiza página</p></div><div class="node"><h3>Sistema de arquivos</h3><p>localiza blocos</p></div><div class="node"><h3>E/S e DMA</h3><p>transfere dados</p></div></div>

---

<div class="eyebrow">QUESTÃO DE REVISÃO</div>

# CPU quase parada e disco ocupado sugerem thrashing

<div class="panel c-orange"><span class="label">DIAGNÓSTICO</span><p>Os processos disputam quadros e passam tempo excessivo buscando páginas no disco.</p></div>
<div class="panel c-teal"><span class="label">AÇÃO</span><p>Reduzir a multiprogramação para acomodar os conjuntos de trabalho, ou ampliar a RAM.</p></div>

---

<div class="eyebrow">PARA A PROVA</div>

# Explique o mecanismo e o custo de cada escolha

<ul class="list tight">
  <li>Falta de página: indique o que dispara o evento e como a instrução retoma.</li>
  <li>Clock: acompanhe ponteiro e bit R quadro a quadro.</li>
  <li>FAT e i-node: compare onde ficam as referências aos blocos.</li>
  <li>DMA e RAID: separe transferência eficiente de tolerância a falhas.</li>
</ul>

---

<div class="eyebrow">REFERÊNCIA</div>

# Fonte da unidade

Tanenbaum, A. S.; Bos, H. *Sistemas Operacionais Modernos*. 4ª ed. São Paulo: Pearson, 2016. Capítulos 3, 4 e 5.

---

<!-- _class: title -->

<div class="eyebrow">DÚVIDAS</div>

# Perguntas

<p class="subtitle">Qual mecanismo da unidade você quer revisar?</p>

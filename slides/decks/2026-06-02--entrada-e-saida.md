---
marp: true
theme: campus-dev
size: 16:9
paginate: true
html: true
footer: 'SISTEMAS OPERACIONAIS · UNIDADE II'
---

<!-- _class: title -->

<div class="eyebrow">SISTEMAS OPERACIONAIS · AULA 04</div>

# Entrada e saída

<p class="subtitle">Como o sistema operacional coordena dispositivos, transferências e armazenamento.</p>

---

<div class="eyebrow">DISPOSITIVOS</div>

# O SO apresenta interfaces comuns para hardware diverso

<div class="cards cols-2">
  <div class="card"><h3>Dispositivo de bloco</h3><p>Transfere dados em unidades endereçáveis, como discos.</p></div>
  <div class="card"><h3>Dispositivo de caractere</h3><p>Entrega ou recebe sequências de caracteres, como um terminal.</p></div>
</div>

<p>Controladores fazem a interface entre o dispositivo e o computador. Drivers e camadas do SO escondem diferenças de implementação.</p>

---

<div class="eyebrow">COMUNICAÇÃO</div>

# E/S mapeada na memória põe registradores no espaço de endereços

<div class="two-col">
  <div class="col"><span class="label">Portas de E/S</span><p>Instruções específicas acessam registradores do controlador em um espaço separado.</p></div>
  <div class="col"><span class="label">E/S mapeada na memória</span><p>Endereços reservados acessam registradores do dispositivo. A região deve evitar efeitos indesejados de cache.</p></div>
</div>

---

<div class="eyebrow">TRANSFERÊNCIA</div>

# Três métodos deixam a CPU cada vez menos ocupada

<div class="cards cols-3">
  <div class="card c-orange"><h3>E/S programada</h3><p>CPU consulta continuamente o estado e transfere os dados.</p></div>
  <div class="card c-blue"><h3>Interrupção</h3><p>Dispositivo avisa quando precisa de atenção; CPU atende cada evento.</p></div>
  <div class="card c-teal"><h3>DMA</h3><p>Controlador transfere blocos entre dispositivo e RAM; interrompe ao terminar.</p></div>
</div>

---

<div class="eyebrow">POLLING</div>

# Espera ocupada consome ciclos sem avançar o trabalho

```c
while ((*REGISTRADOR_STATUS & PRONTO) == 0) {
    /* aguarda */
}
*REGISTRADOR_DADOS = dado;
```

<div class="callout"><span class="tag">CUSTO</span>Enquanto espera o dispositivo ficar pronto, a CPU repete a consulta em vez de executar outra tarefa.</div>

---

<div class="eyebrow">DMA</div>

# O controlador DMA transfere o bloco em nome da CPU

<div class="steps cols-4">
  <div class="step"><span class="n">01</span><h3>Configurar</h3><p>CPU informa endereço, direção e tamanho.</p></div>
  <div class="step"><span class="n">02</span><h3>Transferir</h3><p>DMA move dados entre dispositivo e RAM.</p></div>
  <div class="step"><span class="n">03</span><h3>Compartilhar</h3><p>DMA e CPU concorrem pelo barramento; pode ocorrer roubo de ciclo.</p></div>
  <div class="step"><span class="n">04</span><h3>Interromper</h3><p>CPU recebe aviso ao concluir o bloco.</p></div>
</div>

---

<div class="eyebrow">ANALOGIA</div>

# A pizza compara espera, interrupção e DMA

<div class="cards cols-3">
  <div class="card"><h3>Programada</h3><p>Abrir a porta a cada cinco segundos para perguntar se chegou.</p></div>
  <div class="card"><h3>Interrupção</h3><p>Receber um toque para cada fatia entregue.</p></div>
  <div class="card"><h3>DMA</h3><p>Um ajudante organiza a entrega e avisa quando tudo está pronto.</p></div>
</div>

---

<div class="eyebrow">CAMADAS DE SOFTWARE</div>

# Drivers e buffers isolam detalhes dos dispositivos

<div class="flow outline"><div class="node"><h3>Aplicação</h3><p>solicitação de E/S</p></div><div class="node"><h3>SO</h3><p>interface independente</p></div><div class="node"><h3>Driver</h3><p>detalhes do controlador</p></div><div class="node"><h3>Dispositivo</h3><p>operação física</p></div></div>

<p>Buffers conciliam diferenças de velocidade. Spooling organiza solicitações para dispositivos que não podem atender vários usuários ao mesmo tempo, como impressoras.</p>

---

<div class="eyebrow">DISCOS</div>

# Escalonar requisições reduz deslocamentos do braço

<div class="cards cols-3">
  <div class="card"><h3>FCFS</h3><p>Atende requisições na ordem de chegada.</p></div>
  <div class="card c-orange"><h3>SSF</h3><p>Escolhe a requisição mais próxima; pedidos distantes podem esperar por muito tempo.</p></div>
  <div class="card c-teal"><h3>SCAN</h3><p>Move-se numa direção atendendo pedidos até o fim, depois retorna.</p></div>
</div>

<div class="callout"><span class="tag">ELEVADOR</span>O SCAN limita a espera indefinida que pode ocorrer com a escolha contínua do pedido mais próximo.</div>

---

<div class="eyebrow">RAID</div>

# RAID distribui dados e redundância entre discos

| Nível | Organização | Desempenho e tolerância |
|---|---|---|
| RAID 0 | Distribuição (striping) | Desempenho; sem redundância |
| RAID 1 | Espelhamento (mirroring) | Redundância; metade da capacidade total fica disponível |
| RAID 5 | Dados e paridade distribuídos | Tolerância à falha de um disco, com custo de paridade |

---

<div class="eyebrow">DECISÃO</div>

# RAID protege contra falha de disco, não contra exclusão

<div class="panel c-orange"><span class="label">PERGUNTA</span><p>Um arquivo apagado por engano em RAID 1 pode ser recuperado do disco espelhado?</p></div>

<div class="panel c-teal"><span class="label">RESPOSTA</span><p>A exclusão é refletida nos discos espelhados. RAID oferece disponibilidade diante de falhas de hardware; cópias de segurança atendem outros riscos.</p></div>

---

<div class="eyebrow">SÍNTESE</div>

# O SO coordena a E/S por camadas e políticas

<ul class="list tight">
  <li>Drivers adaptam interfaces comuns às particularidades do hardware.</li>
  <li>DMA transfere blocos sem manter a CPU ocupada em cada unidade.</li>
  <li>SCAN organiza o movimento do disco para atender requisições pendentes.</li>
  <li>RAID equilibra capacidade, desempenho e redundância conforme o nível.</li>
</ul>

---

<div class="eyebrow">REFERÊNCIA</div>

# Leitura da aula

Tanenbaum, A. S.; Bos, H. *Sistemas Operacionais Modernos*. 4ª ed. São Paulo: Pearson, 2016. Capítulo 5.

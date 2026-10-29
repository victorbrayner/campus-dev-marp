---
marp: true
theme: campus-dev
size: 16:9
paginate: true
html: true
footer: 'REDES DE COMPUTADORES · AULA 04'
---

<!-- _class: title -->

<div class="eyebrow">REDES DE COMPUTADORES · AULA 04</div>

# Camada de transporte,
# soquetes e UDP

<p class="subtitle">Portas conectam aplicações ao serviço de entrega da rede.</p>

---

<div class="eyebrow">ABSTRAÇÃO</div>

# IP entrega entre hosts; transporte identifica processos

<div class="cards cols-2">
  <div class="card"><h3>Camada de rede</h3><p>Usa endereços IP, ou pontos de acesso de rede (NSAP), para levar pacotes entre hosts.</p></div>
  <div class="card c-blue"><h3>Camada de transporte</h3><p>Usa portas, ou pontos de acesso de transporte (TSAP), para entregar dados ao processo correto.</p></div>
</div>

<div class="callout"><span class="tag">PAPEL</span>A camada de transporte oferece comunicação processo a processo sobre a entrega host a host do IP.</div>

---

<div class="eyebrow">SOQUETES</div>

# Soquetes de Berkeley expõem a rede como chamadas do sistema

<div class="flow outline"><div class="node"><h3>Aplicação</h3><p>cliente ou servidor</p></div><div class="node"><h3>API de soquetes</h3><p>criar e usar endpoints</p></div><div class="node"><h3>Transporte</h3><p>UDP ou TCP</p></div><div class="node"><h3>IP</h3><p>entrega entre hosts</p></div></div>

<p class="muted">A interface surgiu no BSD 4.2 em 1983.</p>

---

<div class="eyebrow">SERVIDOR</div>

# O servidor cria um soquete e o associa a uma porta

<div class="steps cols-4">
  <div class="step"><span class="n">01</span><h3>SOCKET</h3><p>Cria um endpoint com a família e o tipo desejados.</p></div>
  <div class="step"><span class="n">02</span><h3>BIND</h3><p>Associa o endpoint a um endereço local e uma porta.</p></div>
  <div class="step"><span class="n">03</span><h3>LISTEN</h3><p>Marca um soquete de fluxo como apto a receber conexões.</p></div>
  <div class="step"><span class="n">04</span><h3>ACCEPT</h3><p>Aguarda conexão e retorna novo soquete para aquele cliente.</p></div>
</div>

---

<div class="eyebrow">CLIENTE</div>

# CONNECT inicia a conexão no modelo orientado a fluxo

<div class="flow outline"><div class="node"><h3>Cliente</h3><p>SOCKET</p></div><div class="node"><h3>CONNECT</h3><p>solicita conexão</p></div><div class="node"><h3>Servidor</h3><p>ACCEPT retorna soquete dedicado</p></div><div class="node"><h3>Troca de dados</h3><p>endpoints conectados</p></div></div>

<p>Enquanto <code>ACCEPT</code> aguarda, a chegada de uma conexão faz a chamada retornar com um descritor dedicado àquele cliente.</p>

---

<div class="eyebrow">UDP</div>

# UDP envia datagramas sem estabelecer conexão

<div class="two-col">
  <div class="col"><span class="label">O serviço</span><p>User Datagram Protocol (UDP) oferece transporte sem estado e sem conexão.</p><p>Não estabelece handshake antes de cada troca.</p></div>
  <div class="col"><span class="label">O que a aplicação assume</span><p>O protocolo não garante entrega, ordem ou retransmissão.</p><p>A aplicação escolhe como lidar com perdas e respostas.</p></div>
</div>

---

<div class="eyebrow">CABEÇALHO UDP</div>

# Quatro campos formam os 8 bytes do cabeçalho

| Campo | Função |
|---|---|
| Porta de origem | Identifica a porta de envio |
| Porta de destino | Identifica a aplicação destinatária |
| Comprimento | Tamanho do datagrama UDP e cabeçalho |
| Checksum | Detecta corrupção; cálculo inclui pseudocabeçalho com dados do IP |

<div class="callout"><span class="tag">TAMANHO</span>Cada campo ocupa 16 bits; o cabeçalho fixo totaliza 8 bytes.</div>

---

<div class="eyebrow">PSEUDOCABEÇALHO</div>

# O checksum também relaciona o datagrama aos endereços IP

<p>Para calcular a verificação, o UDP inclui temporariamente informações da camada IP, como endereços de origem e destino, junto aos campos do datagrama.</p>

<div class="callout"><span class="tag">PROPÓSITO</span>Essa verificação ajuda a detectar entrega associada a endereços incorretos ou corrupção dos dados.</div>

---

<div class="eyebrow">USOS</div>

# Aplicações escolhem UDP quando latência pesa mais que retransmissão

<div class="cards cols-3">
  <div class="card"><h3>DNS</h3><p>Consultas curtas podem ser enviadas sem handshake de conexão.</p></div>
  <div class="card"><h3>RTP</h3><p>Áudio e vídeo em tempo real podem preferir dados recentes a esperar retransmissões.</p></div>
  <div class="card"><h3>RPC</h3><p>Chamadas remotas curtas podem usar datagramas, com tratamento de resposta pela aplicação.</p></div>
</div>

---

<div class="eyebrow">DEMONSTRAÇÃO</div>

# Um servidor UDP associa a porta e recebe datagramas

```c
int sockfd = socket(AF_INET, SOCK_DGRAM, 0);
bind(sockfd, (struct sockaddr *)&addr, sizeof(addr));
recvfrom(sockfd, buffer, sizeof(buffer), 0,
         (struct sockaddr *)&origem, &tamanho);
```

<p><code>socket</code> cria o endpoint de datagramas, <code>bind</code> associa endereço e porta, e <code>recvfrom</code> recebe dados junto da origem.</p>

---

<div class="eyebrow">SÍNTESE</div>

# Portas e soquetes levam os dados até a aplicação

<ul class="list tight">
  <li>IP entrega pacotes entre hosts; portas identificam processos.</li>
  <li>Soquetes dão à aplicação uma interface para usar os serviços de transporte.</li>
  <li>UDP usa um cabeçalho de 8 bytes e dispensa conexão e handshake.</li>
  <li>DNS, RTP e RPC podem preferir menor latência e deixar recuperação à aplicação.</li>
</ul>

---

<div class="eyebrow">REFERÊNCIA</div>

# Leitura da aula

Tanenbaum, A. S. *Redes de Computadores*. 6ª ed. Capítulo 6.

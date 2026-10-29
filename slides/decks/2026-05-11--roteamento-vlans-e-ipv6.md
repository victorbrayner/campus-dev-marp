---
marp: true
theme: campus-dev
size: 16:9
paginate: true
html: true
footer: 'REDES DE COMPUTADORES · AULA 03'
---

<!-- _class: title -->

<div class="eyebrow">REDES DE COMPUTADORES · AULA 03</div>

# Roteamento, VLANs e IPv6

<p class="subtitle">Isolamento lógico, convergência de rotas e um espaço de endereçamento maior.</p>

---

<div class="eyebrow">VLAN</div>

# VLANs separam domínios de broadcast no mesmo switch

<div class="two-col">
  <div class="col"><span class="label">Sem separação lógica</span><p>Hosts conectados ao mesmo domínio de camada 2 recebem broadcasts desse domínio.</p></div>
  <div class="col"><span class="label">Com VLANs</span><p>Portas pertencentes a VLANs distintas ficam em domínios de broadcast separados, embora usem o mesmo switch físico.</p></div>
</div>

<div class="callout"><span class="tag">EXEMPLO</span>Host A na VLAN 10 envia broadcast; o switch não o entrega à porta do Host B na VLAN 20.</div>

---

<div class="eyebrow">IEEE 802.1Q</div>

# A tag 802.1Q identifica a VLAN no quadro Ethernet

<div class="cards cols-2">
  <div class="card"><h3>TPID</h3><p>Campo de identificação do protocolo, com valor 0x8100.</p></div>
  <div class="card"><h3>VID</h3><p>Identificador de VLAN com 12 bits.</p></div>
</div>

<p>A tag acrescenta 4 bytes ao quadro Ethernet. Switches adicionam ou removem a marcação conforme o enlace e a porta.</p>

---

<div class="eyebrow">ROTEAMENTO</div>

# RIP e OSPF aprendem rotas de formas diferentes

<div class="cards cols-2">
  <div class="card c-orange"><h3>RIP · vetor de distância</h3><p>Compartilha distâncias entre vizinhos com base em Bellman-Ford. Más notícias podem se propagar lentamente.</p></div>
  <div class="card c-teal"><h3>OSPF · estado de enlace</h3><p>Constrói um mapa topológico e calcula caminhos com Dijkstra.</p></div>
</div>

---

<div class="eyebrow">RIP</div>

# RIP pode contar ao infinito após a queda de um enlace

<div class="flow outline"><div class="node"><h3>Enlace cai</h3><p>rota deixa de funcionar</p></div><div class="node"><h3>Vizinhos anunciam</h3><p>informação antiga circula</p></div><div class="node"><h3>Métrica cresce</h3><p>rede parece alcançável</p></div><div class="node"><h3>Convergência lenta</h3><p>contagem ao infinito</p></div></div>

<p>O problema aparece quando roteadores usam anúncios desatualizados para concluir que ainda existe um caminho.</p>

---

<div class="eyebrow">OSPF</div>

# OSPF constrói a topologia antes de calcular caminhos

<div class="steps cols-5">
  <div class="step"><span class="n">01</span><h3>HELLO</h3><p>Descobrir vizinhos.</p></div>
  <div class="step"><span class="n">02</span><h3>ECHO</h3><p>Medir enlaces.</p></div>
  <div class="step"><span class="n">03</span><h3>LSA</h3><p>Descrever estado de enlace.</p></div>
  <div class="step"><span class="n">04</span><h3>Flooding</h3><p>Distribuir anúncios.</p></div>
  <div class="step"><span class="n">05</span><h3>Dijkstra</h3><p>Calcular caminhos.</p></div>
</div>

---

<div class="eyebrow">ESCOPO</div>

# Sistemas autônomos organizam o roteamento em escala

<div class="two-col">
  <div class="col"><span class="label">Dentro do domínio</span><p>Protocolos intradomínio, como OSPF, calculam rotas dentro de um sistema autônomo.</p></div>
  <div class="col"><span class="label">Entre domínios</span><p>O roteamento interdomínio conecta sistemas autônomos. O detalhamento de BGP fica fora do recorte desta aula.</p></div>
</div>

---

<div class="eyebrow">IPv6</div>

# IPv6 amplia o espaço de endereços para 128 bits

<div class="two-col">
  <div class="col"><span class="label">Endereços</span><p>O espaço de 128 bits comporta cerca de 3,4 × 10³⁸ endereços.</p><p>Esse formato amplia muito o espaço disponível em relação ao IPv4.</p></div>
  <div class="col"><span class="label">Cabeçalho básico</span><p>Tem tamanho fixo de 40 bytes.</p><p>A estrutura simplificada remove o checksum do cabeçalho IP.</p></div>
</div>

---

<div class="eyebrow">ENCAMINHAMENTO</div>

# Roteadores IPv6 não fragmentam pacotes em trânsito

<div class="cards cols-2">
  <div class="card"><h3>IPv4</h3><p>Roteadores podem fragmentar pacotes quando necessário.</p></div>
  <div class="card c-blue"><h3>IPv6</h3><p>Fragmentação é tratada na origem; roteadores intermediários encaminham sem fragmentar.</p></div>
</div>

<p class="muted">Cabeçalhos de extensão permitem transportar informações opcionais sem tornar variável o cabeçalho básico.</p>

---

<div class="eyebrow">COMPARAÇÃO</div>

# OSPF, VLAN e IPv6 tratam problemas em camadas distintas

| Mecanismo | Camada ou escopo | Função |
|---|---|---|
| VLAN / 802.1Q | Enlace | Separa domínios de broadcast |
| OSPF | Roteamento intradomínio | Calcula caminhos a partir do estado de enlace |
| IPv6 | Rede | Amplia endereçamento e simplifica o cabeçalho básico |

---

<div class="eyebrow">SÍNTESE</div>

# Isolamento, cálculo de caminhos e endereçamento resolvem desafios diferentes

<ul class="list tight">
  <li>802.1Q marca quadros para distinguir VLANs.</li>
  <li>RIP pode convergir lentamente após más notícias; OSPF calcula caminhos sobre um mapa de enlaces.</li>
  <li>IPv6 usa endereços de 128 bits e cabeçalho básico fixo de 40 bytes.</li>
</ul>

---

<div class="eyebrow">REFERÊNCIA</div>

# Leitura da aula

Tanenbaum, A. S. *Redes de Computadores*. 6ª ed. Capítulos 4 e 5.

---
marp: true
theme: campus-dev
size: 16:9
paginate: true
html: true
footer: 'REDES DE COMPUTADORES · AULA 05'
---

<!-- _class: title -->

<div class="eyebrow">REDES DE COMPUTADORES · AULA 05</div>

# TCP: conexões, confiabilidade
# e congestionamento

<p class="subtitle">O TCP transforma a entrega sujeita a perdas em um fluxo ordenado e ajusta sua taxa à rede.</p>

---

<div class="eyebrow">SERVIÇO</div>

# TCP oferece um fluxo de bytes confiável entre processos

<div class="cards cols-3">
  <div class="card"><h3>Conexão</h3><p>Os endpoints mantêm estado durante a comunicação.</p></div>
  <div class="card"><h3>Ordenação</h3><p>Números de sequência organizam os bytes recebidos.</p></div>
  <div class="card"><h3>Controle</h3><p>Janelas e temporizadores regulam envio e recuperação.</p></div>
</div>

---

<div class="eyebrow">CABEÇALHO</div>

# O cabeçalho TCP básico tem 20 bytes

<div class="two-col">
  <div class="col"><span class="label">Sequência e confirmação</span><p>Números de sequência e ACK têm 32 bits e acompanham bytes enviados e confirmados.</p></div>
  <div class="col"><span class="label">Controle e fluxo</span><p>Flags incluem SYN, ACK, FIN, RST, PSH e URG. O campo janela informa capacidade anunciada pelo receptor.</p></div>
</div>

---

<div class="eyebrow">ABERTURA</div>

# O handshake sincroniza os dois lados da conexão

<div class="steps cols-3">
  <div class="step"><span class="n">01</span><h3>SYN(x)</h3><p>Cliente propõe seu número inicial de sequência.</p></div>
  <div class="step"><span class="n">02</span><h3>SYN(y) + ACK(x+1)</h3><p>Servidor confirma x e propõe y.</p></div>
  <div class="step"><span class="n">03</span><h3>ACK(y+1)</h3><p>Cliente confirma o número do servidor.</p></div>
</div>

<div class="callout"><span class="tag">TRÊS VIAS</span>A troca confirma que os dois lados estão ativos e evita aceitar conexões com segmentos antigos duplicados.</div>

---

<div class="eyebrow">NÚMEROS INICIAIS</div>

# ISNs distintos ajudam a separar conexões atuais de segmentos antigos

<p>Cada lado escolhe um número inicial de sequência (ISN, Initial Sequence Number). O handshake confirma os valores antes da troca de dados.</p>

<div class="callout"><span class="tag">ESTADO</span>O TCP precisa distinguir segmentos pertencentes à conexão atual de cópias atrasadas na rede.</div>

---

<div class="eyebrow">ENCERRAMENTO</div>

# Cada direção da conexão termina de forma independente

<div class="flow outline"><div class="node"><h3>Cliente → FIN</h3><p>encerra envio</p></div><div class="node"><h3>Servidor → ACK</h3><p>confirma</p></div><div class="node"><h3>Servidor → FIN</h3><p>encerra envio</p></div><div class="node"><h3>Cliente → ACK</h3><p>confirma e aguarda</p></div></div>

<p>O fechamento usa FIN e ACK em cada direção; as duas partes podem encerrar em momentos diferentes.</p>

---

<div class="eyebrow">TIME_WAIT</div>

# TIME_WAIT dá tempo para repetir o ACK final

<div class="two-col">
  <div class="col"><span class="label">Se o ACK se perder</span><p>O outro lado pode retransmitir o FIN. O endpoint em TIME_WAIT ainda consegue responder.</p></div>
  <div class="col"><span class="label">Se houver segmentos antigos</span><p>O intervalo também ajuda a impedir que segmentos atrasados contaminem uma conexão posterior com os mesmos endpoints.</p></div>
</div>

<p class="muted">O roteiro relaciona a espera ao Problema dos Dois Exércitos: não há confirmação finita de que uma mensagem final foi recebida.</p>

---

<div class="eyebrow">FLUXO</div>

# Controle de fluxo protege o buffer do receptor

<div class="flow outline"><div class="node"><h3>Receptor</h3><p>anuncia janela disponível</p></div><div class="node"><h3>Transmissor</h3><p>limita bytes em voo</p></div><div class="node"><h3>Buffer</h3><p>evita receber além da capacidade</p></div></div>

<div class="callout"><span class="tag">DISTINÇÃO</span>Controle de fluxo acompanha o receptor. Controle de congestionamento acompanha a capacidade da rede.</div>

---

<div class="eyebrow">JANELAMENTO</div>

# Nagle e Clark reduzem transmissões pequenas e frequentes

<div class="cards cols-2">
  <div class="card"><h3>Nagle · transmissor</h3><p>Acumula dados pequenos enquanto há dados não confirmados, enviando segmentos maiores quando possível.</p></div>
  <div class="card"><h3>Clark · receptor</h3><p>Evita anunciar janelas muito pequenas que causam a síndrome do janelamento inútil.</p></div>
</div>

---

<div class="eyebrow">CONGESTIONAMENTO</div>

# A rede precisa de uma janela própria além da janela do receptor

<div class="two-col">
  <div class="col"><span class="label">Janela anunciada</span><p>Reflete quanto espaço o receptor tem em seu buffer.</p><p>Protege o host destinatário contra excesso de dados.</p></div>
  <div class="col"><span class="label">Janela cwnd</span><p>Limita quanto o transmissor coloca na rede.</p><p>Adapta a taxa ao congestionamento observado.</p></div>
</div>

---

<div class="eyebrow">SLOW START</div>

# Slow Start aumenta cwnd rapidamente no início

<div class="flow outline"><div class="node"><h3>Começar pequeno</h3><p>janela de congestionamento inicial</p></div><div class="node"><h3>ACKs chegam</h3><p>indicam entrega de dados</p></div><div class="node"><h3>Expandir</h3><p>crescimento exponencial por RTT</p></div><div class="node"><h3>Atingir ssthresh</h3><p>passar ao crescimento linear</p></div></div>

<p class="muted">ssthresh é o limiar entre Slow Start e Congestion Avoidance.</p>

---

<div class="eyebrow">AIMD</div>

# AIMD cresce aos poucos e recua após congestionamento

<div class="cards cols-2">
  <div class="card c-teal"><h3>Aumento aditivo</h3><p>Sem sinal de congestionamento, cwnd cresce linearmente.</p></div>
  <div class="card c-orange"><h3>Diminuição multiplicativa</h3><p>Ao detectar perda, cwnd é reduzida multiplicativamente, em geral à metade no cenário descrito.</p></div>
</div>

---

<div class="eyebrow">RECUPERAÇÃO</div>

# Três ACKs duplicadas permitem retransmitir sem esperar timeout

<div class="steps cols-3">
  <div class="step"><span class="n">01</span><h3>Lacuna</h3><p>Receptor confirma repetidamente o último byte em ordem.</p></div>
  <div class="step"><span class="n">02</span><h3>Três ACKs</h3><p>Transmissor infere que um segmento pode ter sido perdido.</p></div>
  <div class="step"><span class="n">03</span><h3>Fast Retransmit</h3><p>Retransmite o segmento sem aguardar o temporizador expirar.</p></div>
</div>

---

<div class="eyebrow">REVISÃO</div>

# Perda e timeout provocam respostas diferentes

| Sinal observado | Resposta destacada no roteiro |
|---|---|
| Três ACKs duplicadas | Fast Retransmit; em Reno, redução da janela e recuperação rápida |
| Timeout | Perda mais severa; Tahoe reinicia a janela de congestionamento |

<p class="muted">O comportamento exato depende da variante TCP; aqui, Reno e Tahoe são comparados conforme o roteiro.</p>

---

<div class="eyebrow">SÍNTESE</div>

# TCP combina estado, confirmação e ajuste de taxa

<ul class="list tight">
  <li>Handshake de três vias sincroniza números de sequência e confirma os endpoints.</li>
  <li>TIME_WAIT preserva a chance de responder a FIN retransmitido e filtra segmentos antigos.</li>
  <li>Controle de fluxo protege o buffer; controle de congestionamento protege a rede.</li>
  <li>Slow Start, AIMD e Fast Retransmit ajustam a transmissão diante do tráfego e das perdas.</li>
</ul>

---

<div class="eyebrow">REFERÊNCIA</div>

# Leitura da aula

Tanenbaum, A. S. *Redes de Computadores*. 6ª ed. Capítulo 6. Questões sobre encerramento TCP e congestionamento: material de avaliação da disciplina.

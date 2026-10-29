---
marp: true
theme: campus-dev
size: 16:9
paginate: true
html: true
footer: 'REDES DE COMPUTADORES · AULA 02'
---

<!-- _class: title -->

<div class="eyebrow">REDES DE COMPUTADORES · AULA 02</div>

# Sub-redes, VLSM e CIDR

<p class="subtitle">Máscaras organizam redes; prefixos flexíveis reduzem desperdício e rotas globais.</p>

---

<div class="eyebrow">ENDEREÇAMENTO</div>

# Classes fixas ajustavam mal o tamanho das redes

<div class="two-col">
  <div class="col"><span class="label">O modelo por classes</span><p>As classes A, B e C ofereciam blocos com tamanhos rígidos.</p><p>Uma organização podia receber muito mais endereços do que precisava ou um bloco pequeno demais.</p></div>
  <div class="col"><span class="label">O problema de escala</span><p>Alocações pouco flexíveis desperdiçam endereços IPv4.</p><p>Sem agregação, muitos prefixos também aumentam as tabelas dos roteadores de núcleo.</p></div>
</div>

---

<div class="eyebrow">SUBNETTING</div>

# Máscara e operação AND identificam a rede

<div class="steps cols-3">
  <div class="step"><span class="n">01</span><h3>Endereço</h3><p>128.208.2.151</p></div>
  <div class="step"><span class="n">02</span><h3>Máscara</h3><p>255.255.128.0</p></div>
  <div class="step"><span class="n">03</span><h3>AND</h3><p>128.208.0.0</p></div>
</div>

<p>No terceiro octeto, <code>00000010 AND 10000000 = 00000000</code>. Os bits da máscara mantidos em 1 identificam o prefixo de rede.</p>

---

<div class="eyebrow">MÁSCARA</div>

# A máscara separa os bits de rede dos bits de host

<div class="two-col">
  <div class="col"><span class="label">Bits 1</span><p>Indicam a parte do endereço usada para identificar a rede.</p><p>O roteador aplica AND entre o destino e a máscara da rota.</p></div>
  <div class="col"><span class="label">Bits 0</span><p>Correspondem à parte restante do endereço, disponível para identificar interfaces dentro do prefixo.</p><p>A notação CIDR expressa quantos bits iniciais pertencem ao prefixo.</p></div>
</div>

---

<div class="eyebrow">VLSM</div>

# VLSM ajusta o tamanho de cada sub-rede à demanda

<div class="flow outline"><div class="node"><h3>Listar redes</h3><p>estimar hosts necessários</p></div><div class="node"><h3>Ordenar</h3><p>começar pela maior demanda</p></div><div class="node"><h3>Dimensionar</h3><p>escolher prefixo suficiente</p></div><div class="node"><h3>Alocar</h3><p>reservar blocos sem sobreposição</p></div></div>

<div class="callout"><span class="tag">RESULTADO</span>Sub-redes de tamanhos diferentes usam o espaço disponível mais perto da necessidade real.</div>

---

<div class="eyebrow">CIDR</div>

# CIDR permite blocos contíguos de tamanho flexível

<div class="two-col">
  <div class="col"><span class="label">Prefixos</span><p>Classless Inter-Domain Routing (CIDR) representa redes pelo endereço e pelo comprimento do prefixo, como <code>/20</code>.</p><p>O tamanho do bloco deixa de depender das antigas classes A, B e C.</p></div>
  <div class="col"><span class="label">Agregação</span><p>Prefixos contíguos e alinhados podem ser anunciados como uma super-rede.</p><p>Exemplo do roteiro: 194.24.0.0/21, 194.24.8.0/22 e 194.24.12.0/22 agregam em 194.24.0.0/20.</p></div>
</div>

---

<div class="eyebrow">ENCAMINHAMENTO</div>

# A rota mais específica vence no Longest Prefix Match

<p>Destino: <code>194.24.14.5</code></p>

| Rota | Próximo destino | Comparação |
|---|---|---|
| 194.24.0.0/19 | Londres | Prefixo menos específico |
| 194.24.12.0/22 | São Francisco | Prefixo mais longo que também corresponde |

<div class="callout"><span class="tag">DECISÃO</span>O roteador encaminha o pacote para São Francisco porque /22 é mais específico que /19.</div>

---

<div class="eyebrow">CLASSES E CIDR</div>

# CIDR substitui tamanhos rígidos por prefixos escolhidos

| Modelo por classes | CIDR e VLSM |
|---|---|
| Blocos ligados às classes A, B e C | Prefixos de comprimentos variados |
| Ajuste limitado à demanda | Alocação ajustada ao número de hosts |
| Agregação menos flexível | Prefixos contíguos podem formar super-redes |
| Rotas específicas em excesso | Agregação pode reduzir anúncios no backbone |

---

<div class="eyebrow">EXERCÍCIO</div>

# A rota /18 é escolhida para 200.20.130.50

<p>Tabela: super-rede <code>200.20.0.0/16</code> e sub-rede <code>200.20.128.0/18</code>.</p>

<div class="two-col">
  <div class="col"><span class="label">Checagem</span><p>O destino 200.20.130.50 pertence ao bloco 200.20.128.0/18.</p><p>Também pertence à super-rede /16.</p></div>
  <div class="col"><span class="label">Resultado</span><p>O prefixo /18 tem mais bits de rede que /16.</p><p>Longest Prefix Match seleciona a rota /18.</p></div>
</div>

---

<div class="eyebrow">SÍNTESE</div>

# Máscaras organizam sub-redes e prefixos sustentam o roteamento

<ul class="list tight">
  <li>AND entre endereço e máscara revela o prefixo de rede.</li>
  <li>VLSM dimensiona sub-redes conforme a demanda.</li>
  <li>CIDR permite agregar prefixos contíguos em super-redes.</li>
  <li>Longest Prefix Match escolhe a rota correspondente mais específica.</li>
</ul>

<div class="callout"><span class="tag">PRÓXIMO TEMA</span>Protocolos como OSPF e BGP distribuem informações de roteamento em diferentes escopos.</div>

---

<div class="eyebrow">REFERÊNCIA</div>

# Leitura da aula

Tanenbaum, A. S. *Redes de Computadores*. 6ª ed. Capítulo 5. Exemplos de operação AND e sumarização CIDR: materiais de avaliação da disciplina.

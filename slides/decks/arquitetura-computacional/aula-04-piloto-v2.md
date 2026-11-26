---
marp: true
theme: campus-dev
size: 16:9
paginate: true
html: true
footer: 'ARQUITETURA COMPUTACIONAL · UNIDADE I'
---

<!-- _class: title -->

<div class="eyebrow">ARQUITETURA COMPUTACIONAL · AULA 04</div>

# Multiprocessadores
# e multicomputadores

<p class="subtitle">Como o trabalho se divide entre processadores, memória e comunicação.</p>

<div class="byline">
  <strong>Prof. Victor Brayner</strong>
  <span>ads · 1º período</span>
</div>

---

<div class="eyebrow">RETOMADA</div>

# Quem executa o trabalho?

<div class="two-col">
  <div class="col">
    <span class="label">O que já sabemos</span>
    <p>A CPU executa instruções. A memória mantém instruções e dados disponíveis. Entrada, saída e armazenamento completam o sistema.</p>
    <p class="muted">Um programa organiza operações que precisam ser executadas.</p>
  </div>
  <div class="col">
    <span class="label">A pergunta de hoje</span>
    <p>Se o trabalho cresce, como aumentar a capacidade de processamento?</p>
    <ul class="list tight">
      <li>Executar tudo em sequência?</li>
      <li>Dividir o trabalho entre unidades?</li>
      <li>Usar vários computadores?</li>
    </ul>
  </div>
</div>

<div class="notice closer">
  <span class="notice-title">Fio da aula</span>
  A resposta depende de como processadores, memória e comunicação são organizados.
</div>

---

<!-- _class: section-divider -->

<div class="part">PARTE 01 / 03</div>

# Do sequencial ao paralelo

<div class="topic-list cols-3">
  <div class="topic"><span class="n">01</span><span>Dependências</span></div>
  <div class="topic"><span class="n">02</span><span>Divisão do trabalho</span></div>
  <div class="topic"><span class="n">03</span><span>Coordenação</span></div>
</div>

---

<div class="eyebrow">SEQUENCIAL</div>

# A ordem é necessária quando há dependência

<div class="two-col">
  <div class="col">
    <span class="label">Quando a sequência ajuda</span>
    <p>Coletar dados, validar, calcular e gerar o relatório: cada etapa usa o resultado da anterior.</p>
    <p class="muted">A ordem protege o resultado e evita trabalho sobre dados incompletos.</p>
  </div>
  <div class="col">
    <span class="label">Onde a sequência limita</span>
    <ul class="list tight">
      <li>Uma única fila atende uma etapa por vez.</li>
      <li>Partes independentes esperam sem necessidade.</li>
      <li>O tempo total cresce com o número de etapas.</li>
    </ul>
  </div>
</div>

<div class="panel c-orange closer">
  <span class="label">Cuidado</span>
  <p>Ter mais trabalho não acelera uma etapa que depende da anterior.</p>
</div>

---

<div class="eyebrow">DIVISÃO</div>

# Dividir exige partes independentes

<div class="media">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 300" role="img" aria-label="Trabalho total dividido em três partes independentes e reunido em uma etapa final."><title>Divisão do trabalho</title><desc>Trabalho total dividido em três partes independentes e reunido em uma etapa final.</desc><rect x="380" y="20" width="200" height="56" rx="6" fill="#f4f5f7" stroke="#101f38" stroke-width="2" /><text x="480" y="48" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">Trabalho total</text><rect x="150" y="120" width="160" height="56" rx="6" fill="#f4f5f7" stroke="#1e88e5" stroke-width="2" /><text x="230" y="148" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">Parte A</text><rect x="400" y="120" width="160" height="56" rx="6" fill="#f4f5f7" stroke="#1e88e5" stroke-width="2" /><text x="480" y="148" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">Parte B</text><rect x="650" y="120" width="160" height="56" rx="6" fill="#f4f5f7" stroke="#1e88e5" stroke-width="2" /><text x="730" y="148" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">Parte C</text><line x1="480" y1="76" x2="238.86376496648526" y2="118.4399773658986" stroke="#1e88e5" stroke-width="2"  /><polygon points="230,120 238.0057525177295,113.5649066343317 239.72177741524104,123.31504809746549" fill="#1e88e5" /><line x1="480" y1="76" x2="480" y2="111" stroke="#1e88e5" stroke-width="2"  /><polygon points="480,120 475.05,111 484.95,111" fill="#1e88e5" /><line x1="480" y1="76" x2="721.1362350335147" y2="118.4399773658986" stroke="#1e88e5" stroke-width="2"  /><polygon points="730,120 720.278222584759,123.31504809746549 721.9942474822705,113.5649066343317" fill="#1e88e5" /><line x1="230" y1="176" x2="431.1912757800869" y2="218.15436254439916" stroke="#1e88e5" stroke-width="2"  /><polygon points="440,220 430.17617517950646,222.99916086535137 432.2063763806674,213.30956422344698" fill="#1e88e5" /><line x1="480" y1="176" x2="480" y2="211" stroke="#1e88e5" stroke-width="2"  /><polygon points="480,220 475.05,211 484.95,211" fill="#1e88e5" /><line x1="730" y1="176" x2="528.8087242199131" y2="218.15436254439916" stroke="#1e88e5" stroke-width="2"  /><polygon points="520,220 527.7936236193326,213.30956422344696 529.8238248204935,222.99916086535137" fill="#1e88e5" /><rect x="380" y="220" width="200" height="56" rx="6" fill="#f4f5f7" stroke="#101f38" stroke-width="2" /><text x="480" y="248" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">Reunir resultados</text></svg>
  <div class="caption">O trabalho total se divide em partes que podem avançar sem depender umas das outras. No fim, os resultados são reunidos.</div>
</div>

---

<div class="eyebrow">CONCORRÊNCIA</div>

# Concorrência e paralelismo são diferentes

<div class="media">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 340" role="img" aria-label="Na concorrência, um núcleo alterna entre tarefas; no paralelismo, dois núcleos executam A e B ao mesmo tempo."><title>Concorrência × paralelismo</title><desc>Na concorrência, um núcleo alterna entre tarefas; no paralelismo, dois núcleos executam A e B ao mesmo tempo.</desc><text x="28" y="32" font-family="'Roboto Mono', Consolas, monospace" font-size="13" font-weight="700" fill="#5b6472" text-anchor="start" dominant-baseline="middle" letter-spacing="0.6">CONCORRÊNCIA (1 NÚCLEO)</text><rect x="220" y="48" width="90" height="38" rx="6" fill="#f4f5f7" stroke="#1e88e5" stroke-width="2" /><text x="265" y="67" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">A</text><rect x="318" y="48" width="90" height="38" rx="6" fill="#f4f5f7" stroke="#0e9f6e" stroke-width="2" /><text x="363" y="67" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">B</text><rect x="416" y="48" width="90" height="38" rx="6" fill="#f4f5f7" stroke="#1e88e5" stroke-width="2" /><text x="461" y="67" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">A</text><rect x="514" y="48" width="90" height="38" rx="6" fill="#f4f5f7" stroke="#5b6472" stroke-width="2" /><text x="559" y="67" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">C</text><rect x="612" y="48" width="90" height="38" rx="6" fill="#f4f5f7" stroke="#0e9f6e" stroke-width="2" /><text x="657" y="67" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">B</text><rect x="710" y="48" width="90" height="38" rx="6" fill="#f4f5f7" stroke="#1e88e5" stroke-width="2" /><text x="755" y="67" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">A</text><line x1="220" y1="108" x2="891" y2="108" stroke="#5b6472" stroke-width="2"  /><polygon points="900,108 891,112.95 891,103.05" fill="#5b6472" /><text x="860" y="94" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="12" font-weight="400" fill="#5b6472" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">tempo</text><text x="28" y="160" font-family="'Roboto Mono', Consolas, monospace" font-size="13" font-weight="700" fill="#5b6472" text-anchor="start" dominant-baseline="middle" letter-spacing="0.6">PARALELISMO (2 NÚCLEOS)</text><text x="28" y="196" font-family="'Roboto Mono', Consolas, monospace" font-size="13" font-weight="700" fill="#5b6472" text-anchor="start" dominant-baseline="middle" letter-spacing="0.6">NÚCLEO 1</text><rect x="220" y="178" width="130" height="38" rx="6" fill="#f4f5f7" stroke="#1e88e5" stroke-width="2" /><text x="285" y="197" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">A</text><rect x="360" y="178" width="130" height="38" rx="6" fill="#f4f5f7" stroke="#1e88e5" stroke-width="2" /><text x="425" y="197" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">A</text><rect x="500" y="178" width="130" height="38" rx="6" fill="#f4f5f7" stroke="#1e88e5" stroke-width="2" /><text x="565" y="197" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">A</text><rect x="640" y="178" width="130" height="38" rx="6" fill="#f4f5f7" stroke="#1e88e5" stroke-width="2" /><text x="705" y="197" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">A</text><text x="28" y="256" font-family="'Roboto Mono', Consolas, monospace" font-size="13" font-weight="700" fill="#5b6472" text-anchor="start" dominant-baseline="middle" letter-spacing="0.6">NÚCLEO 2</text><rect x="220" y="238" width="130" height="38" rx="6" fill="#f4f5f7" stroke="#0e9f6e" stroke-width="2" /><text x="285" y="257" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">B</text><rect x="360" y="238" width="130" height="38" rx="6" fill="#f4f5f7" stroke="#0e9f6e" stroke-width="2" /><text x="425" y="257" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">B</text><rect x="500" y="238" width="130" height="38" rx="6" fill="#f4f5f7" stroke="#0e9f6e" stroke-width="2" /><text x="565" y="257" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">B</text><rect x="640" y="238" width="130" height="38" rx="6" fill="#f4f5f7" stroke="#0e9f6e" stroke-width="2" /><text x="705" y="257" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">B</text><line x1="220" y1="312" x2="891" y2="312" stroke="#5b6472" stroke-width="2"  /><polygon points="900,312 891,316.95 891,307.05" fill="#5b6472" /><text x="860" y="298" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="12" font-weight="400" fill="#5b6472" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">tempo</text></svg>
  <div class="caption">Na concorrência, um núcleo alterna entre tarefas. No paralelismo, unidades distintas executam tarefas ao mesmo tempo.</div>
</div>

---

<div class="eyebrow">ANALOGIA</div>

# A cozinha mostra divisão e coordenação

<div class="cards cols-3">
  <div class="card">
    <span class="n">01</span>
    <h3>Dividir</h3>
    <p>Uma equipe prepara partes diferentes dos pratos.</p>
  </div>
  <div class="card c-purple">
    <span class="n">02</span>
    <h3>Coordenar</h3>
    <p>Ingredientes e resultados precisam chegar na hora certa.</p>
  </div>
  <div class="card c-teal">
    <span class="n">03</span>
    <h3>Respeitar dependências</h3>
    <p>Etapas que dependem de outras mantêm a ordem.</p>
  </div>
</div>

<div class="panel c-orange closer">
  <span class="label">Limite da analogia</span>
  <p>Computadores exigem coordenação explícita de dados e execução. Dividir pessoas não resolve isso.</p>
</div>

---

<!-- _class: section-divider -->

<div class="part">PARTE 02 / 03</div>

# Multiprocessadores

<div class="topic-list cols-3">
  <div class="topic"><span class="n">01</span><span>Mesmo sistema</span></div>
  <div class="topic"><span class="n">02</span><span>Memória compartilhada</span></div>
  <div class="topic"><span class="n">03</span><span>Coordenação</span></div>
</div>

---

<div class="eyebrow">CONCEITO</div>

# Várias unidades no mesmo sistema

<div class="two-col">
  <div class="col">
    <span class="label">A definição</span>
    <p>Um <strong>multiprocessador</strong> reúne múltiplas unidades de processamento em uma mesma máquina ou sistema.</p>
    <p class="muted">Em organizações comuns, as unidades compartilham a memória principal e outros recursos.</p>
  </div>
  <div class="col">
    <span class="label">Termos próximos</span>
    <ul class="list tight">
      <li><strong>Processador:</strong> unidade de hardware que executa instruções.</li>
      <li><strong>Núcleo:</strong> unidade de processamento dentro do processador.</li>
      <li><strong>Sistema:</strong> conjunto que reúne processadores, memória e recursos.</li>
    </ul>
  </div>
</div>

<div class="notice closer">
  <span class="notice-title">Nuance</span>
  Um chip com vários núcleos pode oferecer múltiplas unidades. A organização de memória e comunicação varia.
</div>

---

<div class="eyebrow">O ESQUEMA</div>

# O recurso compartilhado aproxima as unidades

<div class="media">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 310" role="img" aria-label="Três processadores conectados por uma interconexão à mesma memória principal."><title>Multiprocessador com memória compartilhada</title><desc>Três processadores conectados por uma interconexão à mesma memória principal.</desc><rect x="70" y="26" width="180" height="64" rx="6" fill="#f4f5f7" stroke="#1e88e5" stroke-width="2" /><text x="160" y="50" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">Processador 1</text><text x="160" y="74" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="12.5" font-weight="400" fill="#5b6472" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">unidade de processamento</text><rect x="390" y="26" width="180" height="64" rx="6" fill="#f4f5f7" stroke="#1e88e5" stroke-width="2" /><text x="480" y="50" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">Processador 2</text><text x="480" y="74" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="12.5" font-weight="400" fill="#5b6472" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">unidade de processamento</text><rect x="710" y="26" width="180" height="64" rx="6" fill="#f4f5f7" stroke="#1e88e5" stroke-width="2" /><text x="800" y="50" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">Processador 3</text><text x="800" y="74" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="12.5" font-weight="400" fill="#5b6472" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">unidade de processamento</text><rect x="70" y="160" width="820" height="26" rx="4" fill="#101f38" stroke="none" stroke-width="2" /><text x="480" y="173" font-family="'Roboto Mono', Consolas, monospace" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" letter-spacing="0.5">INTERCONEXÃO</text><line x1="160" y1="90" x2="160" y2="151" stroke="#1e88e5" stroke-width="2"  /><polygon points="160,160 155.05,151 164.95,151" fill="#1e88e5" /><line x1="480" y1="90" x2="480" y2="151" stroke="#1e88e5" stroke-width="2"  /><polygon points="480,160 475.05,151 484.95,151" fill="#1e88e5" /><line x1="800" y1="90" x2="800" y2="151" stroke="#1e88e5" stroke-width="2"  /><polygon points="800,160 795.05,151 804.95,151" fill="#1e88e5" /><line x1="480" y1="186" x2="480" y2="215" stroke="#1e88e5" stroke-width="2"  /><polygon points="480,224 475.05,215 484.95,215" fill="#1e88e5" /><rect x="300" y="224" width="360" height="64" rx="6" fill="#f4f5f7" stroke="#0e9f6e" stroke-width="2" /><text x="480" y="248" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">Memória principal</text><text x="480" y="272" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="12.5" font-weight="400" fill="#5b6472" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">compartilhada</text></svg>
  <div class="caption">Modelo didático: processadores ligados por uma interconexão à mesma memória principal. A implementação real tem caches, controladores e outros detalhes.</div>
</div>

<div class="callout">
  <span class="tag">PARA FIXAR</span>
  A memória compartilhada facilita a comunicação e exige coordenação dos acessos.
</div>

---

<!-- _class: accent-teal -->

<div class="eyebrow">BALANÇO</div>

# Compartilhar facilita e cobra coordenação

<div class="two-col">
  <div class="panel c-teal">
    <span class="label">Vantagens</span>
    <ul class="list tight">
      <li>Compartilhar recursos do mesmo sistema.</li>
      <li>Comunicar por memória.</li>
      <li>Executar tarefas simultâneas.</li>
      <li>Ampliar a capacidade para cargas paralelizáveis.</li>
    </ul>
  </div>
  <div class="panel c-orange">
    <span class="label">Desafios</span>
    <ul class="list tight">
      <li>Coordenar o acesso a dados compartilhados.</li>
      <li>Lidar com disputa por recursos.</li>
      <li>Pagar o custo da comunicação interna.</li>
      <li>Depender do programa e da carga.</li>
    </ul>
  </div>
</div>

<div class="notice closer">
  <span class="notice-title">Exemplo</span>
  Um servidor com vários núcleos atende solicitações em unidades diferentes e coordena o acesso a dados comuns.
</div>

---

<!-- _class: section-divider -->

<div class="part">PARTE 03 / 03</div>

# Multicomputadores

<div class="topic-list cols-3">
  <div class="topic"><span class="n">01</span><span>Nós independentes</span></div>
  <div class="topic"><span class="n">02</span><span>Memória local</span></div>
  <div class="topic"><span class="n">03</span><span>Rede</span></div>
</div>

---

<div class="eyebrow">CONCEITO</div>

# Computadores independentes, memória local

<div class="two-col">
  <div class="col">
    <span class="label">A definição</span>
    <p>Um <strong>multicomputador</strong> reúne computadores autônomos, chamados de nós, cada um com seu processador e memória local.</p>
    <p class="muted">A comunicação acontece por rede ou interconexão, com troca de mensagens.</p>
  </div>
  <div class="col">
    <span class="label">O que muda</span>
    <ul class="list tight">
      <li>Não há uma memória única compartilhada.</li>
      <li>Cada nó usa a própria memória.</li>
      <li>A rede transporta dados e resultados.</li>
    </ul>
  </div>
</div>

<div class="notice closer">
  <span class="notice-title">Cuidado</span>
  A rede não transforma as memórias locais em uma única memória principal.
</div>

---

<div class="eyebrow">O ESQUEMA</div>

# A memória acompanha cada nó

<div class="media">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 330" role="img" aria-label="Três nós independentes, cada um com CPU e memória local, conectados por uma rede."><title>Multicomputador com memória local e rede</title><desc>Três nós independentes, cada um com CPU e memória local, conectados por uma rede.</desc><rect x="50" y="30" width="230" height="100" rx="6" fill="#f4f5f7" stroke="#1e88e5" stroke-width="2" /><text x="165" y="72" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">Nó 1</text><text x="165" y="96" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="12.5" font-weight="400" fill="#5b6472" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">CPU + memória local</text><rect x="365" y="30" width="230" height="100" rx="6" fill="#f4f5f7" stroke="#1e88e5" stroke-width="2" /><text x="480" y="72" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">Nó 2</text><text x="480" y="96" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="12.5" font-weight="400" fill="#5b6472" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">CPU + memória local</text><rect x="680" y="30" width="230" height="100" rx="6" fill="#f4f5f7" stroke="#1e88e5" stroke-width="2" /><text x="795" y="72" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="17" font-weight="700" fill="#101f38" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">Nó 3</text><text x="795" y="96" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="12.5" font-weight="400" fill="#5b6472" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">CPU + memória local</text><rect x="100" y="230" width="760" height="28" rx="4" fill="#101f38" stroke="none" stroke-width="2" /><text x="480" y="244" font-family="'Roboto Mono', Consolas, monospace" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" letter-spacing="0.5">REDE / INTERCONEXÃO</text><line x1="165" y1="130" x2="165" y2="221" stroke="#1e88e5" stroke-width="2"  /><polygon points="165,230 160.05,221 169.95,221" fill="#1e88e5" /><line x1="480" y1="130" x2="480" y2="221" stroke="#1e88e5" stroke-width="2"  /><polygon points="480,230 475.05,221 484.95,221" fill="#1e88e5" /><line x1="795" y1="130" x2="795" y2="221" stroke="#1e88e5" stroke-width="2"  /><polygon points="795,230 790.05,221 799.95,221" fill="#1e88e5" /><text x="480" y="292" font-family="'Carlito', 'Calibri', Arial, sans-serif" font-size="12" font-weight="400" fill="#5b6472" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">troca de mensagens</text></svg>
  <div class="caption">Cada nó tem CPU e memória local. A rede permite a comunicação; o que fica no meio é a interconexão.</div>
</div>

---

<!-- _class: accent-teal -->

<div class="eyebrow">BALANÇO</div>

# Escala distribuída, coordenação maior

<div class="two-col">
  <div class="panel c-teal">
    <span class="label">Vantagens</span>
    <ul class="list tight">
      <li>Adicionar nós para ampliar a capacidade.</li>
      <li>Distribuir cargas grandes.</li>
      <li>Manter recursos locais por nó.</li>
      <li>Crescer conforme a aplicação e a infraestrutura permitem.</li>
    </ul>
  </div>
  <div class="panel c-orange">
    <span class="label">Desafios</span>
    <ul class="list tight">
      <li>A rede adiciona latência e custo.</li>
      <li>Dados precisam chegar aos nós.</li>
      <li>Resultados precisam ser reunidos.</li>
      <li>Falhas de nó ou de rede afetam o processamento.</li>
      <li>Balancear o trabalho pode ser difícil.</li>
    </ul>
  </div>
</div>

<div class="notice closer">
  <span class="notice-title">Exemplo</span>
  Um cluster reúne computadores conectados para dividir um processamento ou oferecer um serviço.
</div>

---

<div class="eyebrow">COMPARAÇÃO</div>

# As duas organizações, lado a lado

| Critério | Multiprocessador | Multicomputador |
|---|---|---|
| Organização | Várias unidades no mesmo sistema | Computadores autônomos conectados |
| Memória | Pode ser compartilhada | Memória local por nó |
| Comunicação | Recursos internos ao sistema | Rede ou interconexão |
| Coordenação | Entre unidades do mesmo sistema | Entre nós independentes |
| Desafio típico | Acesso a dados compartilhados | Comunicação e distribuição de dados |
| Exemplo | Máquina com vários núcleos | Cluster de computadores |

<div class="callout">
  <span class="tag">MODELO INTRODUTÓRIO</span>
  A escolha depende da carga, dos dados e do custo de comunicação. Arquiteturas reais combinam variações.
</div>

---

<div class="eyebrow">CUSTOS</div>

# O ganho depende dos custos

<div class="media">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 230" role="img" aria-label="O trabalho paralelo reduz o cálculo, mas acrescenta dividir, comunicar, coordenar e reunir."><title>Custos do paralelismo</title><desc>O trabalho paralelo reduz o cálculo, mas acrescenta dividir, comunicar, coordenar e reunir.</desc><text x="28" y="43" font-family="'Roboto Mono', Consolas, monospace" font-size="13" font-weight="700" fill="#5b6472" text-anchor="start" dominant-baseline="middle" letter-spacing="0.6">SEQUENCIAL</text><rect x="200" y="28" width="700" height="30" rx="4" fill="#101f38" stroke="none" stroke-width="2" /><text x="550" y="43" font-family="'Roboto Mono', Consolas, monospace" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">trabalho total</text><text x="28" y="105" font-family="'Roboto Mono', Consolas, monospace" font-size="13" font-weight="700" fill="#5b6472" text-anchor="start" dominant-baseline="middle" letter-spacing="0.6">PARALELO</text><rect x="200" y="90" width="200" height="30" rx="4" fill="#1e88e5" stroke="none" stroke-width="2" /><rect x="430" y="90" width="200" height="30" rx="4" fill="#1e88e5" stroke="none" stroke-width="2" /><rect x="660" y="90" width="200" height="30" rx="4" fill="#1e88e5" stroke="none" stroke-width="2" /><text x="300" y="105" font-family="'Roboto Mono', Consolas, monospace" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">cálculo</text><text x="530" y="105" font-family="'Roboto Mono', Consolas, monospace" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">cálculo</text><text x="760" y="105" font-family="'Roboto Mono', Consolas, monospace" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">cálculo</text><rect x="200" y="145" width="160" height="28" rx="4" fill="#d9481f" stroke="none" stroke-width="2" /><rect x="390" y="145" width="160" height="28" rx="4" fill="#d9481f" stroke="none" stroke-width="2" /><rect x="580" y="145" width="160" height="28" rx="4" fill="#d9481f" stroke="none" stroke-width="2" /><rect x="770" y="145" width="150" height="28" rx="4" fill="#d9481f" stroke="none" stroke-width="2" /><text x="280" y="159" font-family="'Roboto Mono', Consolas, monospace" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">dividir</text><text x="470" y="159" font-family="'Roboto Mono', Consolas, monospace" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">comunicar</text><text x="660" y="159" font-family="'Roboto Mono', Consolas, monospace" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">coordenar</text><text x="845" y="159" font-family="'Roboto Mono', Consolas, monospace" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" letter-spacing="0">reunir</text></svg>
  <div class="caption">O cálculo paralelo termina antes, mas dividir, comunicar, coordenar e reunir também consomem tempo.</div>
</div>

<div class="panel c-orange closer">
  <span class="label">Consequência</span>
  <p>O tempo total inclui os custos de organizar e reunir o trabalho. O nó mais lento pode definir a espera.</p>
</div>

---

<div class="eyebrow">LIMITES</div>

# Balanceamento e dependências limitam o ganho

<div class="two-col">
  <div class="panel c-teal">
    <span class="label">Balanceamento</span>
    <p>Distribuir o trabalho de modo que as unidades tenham quantidades compatíveis.</p>
    <p class="muted">Uma unidade com muito mais trabalho define o tempo final.</p>
  </div>
  <div class="panel c-orange">
    <span class="label">Dependências</span>
    <p>Se B depende de A, as duas não avançam livremente ao mesmo tempo.</p>
    <p class="muted">Outras partes independentes ainda podem ser paralelizadas.</p>
  </div>
</div>

<div class="notice closer">
  <span class="notice-title">Exemplo</span>
  Em um multicomputador, a etapa que espera todos os nós termina no ritmo do nó mais lento.
</div>

---

<div class="eyebrow">SITUAÇÕES</div>

# Onde o paralelismo perde força

<div class="cards cols-3">
  <div class="card">
    <span class="n">01</span>
    <h3>Imagens independentes</h3>
    <p>Dividir em lotes e distribuir. Pode ser uma máquina ou vários computadores.</p>
  </div>
  <div class="card c-purple">
    <span class="n">02</span>
    <h3>Etapas dependentes</h3>
    <p>B usa o resultado de A. As duas não podem rodar ao mesmo tempo.</p>
  </div>
  <div class="card c-teal">
    <span class="n">03</span>
    <h3>Muitas solicitações</h3>
    <p>Um portal pode usar uma máquina maior, processos ou nós. O enunciado não decide sozinho.</p>
  </div>
</div>

<div class="notice closer">
  <span class="notice-title">Critério</span>
  Pergunte onde ficam os dados e como as partes se comunicam antes de escolher a arquitetura.
</div>

---

<div class="eyebrow">ATIVIDADE</div>

# Classifique cada cenário

<div class="cards cols-2">
  <div class="card">
    <span class="n">01</span>
    <h3>Uma máquina</h3>
    <p>Vários núcleos executam partes de uma aplicação e acessam dados compartilhados.</p>
  </div>
  <div class="card">
    <span class="n">02</span>
    <h3>Quatro computadores</h3>
    <p>Cada um com sua memória recebe partes de uma análise e envia resultados para um nó que consolida.</p>
  </div>
  <div class="card">
    <span class="n">03</span>
    <h3>Oito partes</h3>
    <p>O programa processa oito partes ao mesmo tempo, mas não informa a organização do hardware.</p>
  </div>
  <div class="card">
    <span class="n">04</span>
    <h3>Etapas em cadeia</h3>
    <p>Cada etapa precisa do resultado da anterior.</p>
  </div>
</div>

<div class="notice closer">
  <span class="notice-title">Como responder</span>
  Classifique como multiprocessador, multicomputador ou informação insuficiente. Justifique com memória, comunicação e organização.
</div>

---

<div class="eyebrow">BILHETE DE SAÍDA</div>

# Três perguntas para fechar

<div class="cards cols-3">
  <div class="card">
    <span class="n">01</span>
    <h3>Diferença</h3>
    <p>Em uma frase, qual é a diferença entre multiprocessadores e multicomputadores?</p>
  </div>
  <div class="card">
    <span class="n">02</span>
    <h3>Concorrência</h3>
    <p>Qual é a diferença entre concorrência e paralelismo?</p>
  </div>
  <div class="card">
    <span class="n">03</span>
    <h3>Custo</h3>
    <p>Cite um custo que pode reduzir o ganho do processamento paralelo.</p>
  </div>
</div>

<div class="notice closer">
  <span class="notice-title">Formato</span>
  Responda em uma frase por pergunta, sem consultar as anotações.
</div>

---

<!-- _class: title -->

<div class="eyebrow">SÍNTESE</div>

# Várias unidades, uma memória.
# Várias máquinas, uma rede.

<p class="subtitle">A organização dos recursos e da comunicação define o que o paralelismo entrega.</p>

<div class="byline">
  <strong>Prof. Victor Brayner</strong>
  <span>arquitetura computacional · unidade I</span>
</div>

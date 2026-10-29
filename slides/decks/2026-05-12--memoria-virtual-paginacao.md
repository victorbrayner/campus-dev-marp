---
marp: true
theme: campus-dev
size: 16:9
paginate: true
html: true
footer: 'SISTEMAS OPERACIONAIS · UNIDADE II'
---

<!-- _class: title -->

<div class="eyebrow">SISTEMAS OPERACIONAIS · AULA 02</div>

# Memória virtual,
# paginação e segmentação

<p class="subtitle">A MMU conecta endereços virtuais à RAM e ao disco conforme os processos avançam.</p>

---

<div class="eyebrow">MOTIVAÇÃO</div>

# Um programa não precisa manter todas as páginas na RAM

<div class="two-col">
  <div class="col"><span class="label">O limite físico</span><p>A RAM instalada pode ser menor que a soma dos espaços de endereçamento dos processos.</p><p>Overlays manuais exigiam que o programa controlasse quais partes carregar.</p></div>
  <div class="col"><span class="label">A abstração</span><p>Memória virtual dá a cada processo um espaço de endereçamento independente.</p><p>A MMU traduz endereços e o sistema operacional carrega páginas quando necessário.</p></div>
</div>

---

<div class="eyebrow">PAGINAÇÃO</div>

# Páginas virtuais ocupam quadros físicos de tamanho fixo

<div class="flow outline">
  <div class="node"><h3>Endereço virtual</h3><p>número da página + deslocamento</p></div>
  <div class="node"><h3>Tabela de páginas</h3><p>mapeia página para quadro</p></div>
  <div class="node"><h3>Endereço físico</h3><p>quadro + mesmo deslocamento</p></div>
</div>

<div class="callout"><span class="tag">PONTO-CHAVE</span>Páginas e quadros têm tamanho fixo; o processo não precisa ocupar quadros contíguos.</div>

---

<div class="eyebrow">TRADUÇÃO</div>

# A MMU consulta presença e permissões antes do acesso

<div class="cards cols-3">
  <div class="card"><h3>Presente/ausente</h3><p>Indica se a página está na RAM.</p></div>
  <div class="card"><h3>Proteção</h3><p>Define acessos permitidos, como leitura ou escrita.</p></div>
  <div class="card"><h3>R e M</h3><p>Referenciada e modificada: ajudam a acompanhar uso e alterações.</p></div>
</div>

---

<div class="eyebrow">FALTA DE PÁGINA</div>

# Ausência da página transfere o controle ao sistema operacional

<div class="steps cols-4">
  <div class="step"><span class="n">01</span><h3>Falta</h3><p>Bit presente/ausente indica página fora da RAM.</p></div>
  <div class="step"><span class="n">02</span><h3>Interrupção</h3><p>Hardware informa a falta ao SO.</p></div>
  <div class="step"><span class="n">03</span><h3>Carregar</h3><p>SO busca a página no disco e atualiza o mapeamento.</p></div>
  <div class="step"><span class="n">04</span><h3>Retomar</h3><p>A instrução interrompida é reiniciada.</p></div>
</div>

---

<div class="eyebrow">TLB</div>

# A TLB evita consultar a tabela na RAM a cada acesso

<div class="two-col">
  <div class="col"><span class="label">Sem acerto na TLB</span><p>O processador consulta a tabela de páginas na RAM e depois acessa o dado na RAM.</p><p>São duas consultas de memória para obter o conteúdo.</p></div>
  <div class="col"><span class="label">Com acerto na TLB</span><p>A memória associativa da MMU encontra uma tradução recente.</p><p>O acesso ao dado pode seguir sem buscar a entrada da tabela na RAM.</p></div>
</div>

---

<div class="eyebrow">ESCALA</div>

# Tabelas multinível e invertidas reduzem o custo do mapeamento

| Estrutura | Organização | O que resolve |
|---|---|---|
| Multinível | Divide a tabela em níveis | Evita reservar todas as entradas de uma tabela plana |
| Invertida | Uma entrada por quadro físico | Reduz entradas em relação a uma entrada por página virtual |

<p class="muted">Exemplo do roteiro: em arquitetura de 32 bits com páginas de 4 KB, uma tabela simples pode exigir cerca de um milhão de entradas por processo.</p>

---

<div class="eyebrow">SUBSTITUIÇÃO</div>

# Quando não há quadro livre, o SO escolhe uma vítima

<div class="cards cols-3">
  <div class="card"><h3>NRU</h3><p>Classifica páginas por bits de referência e modificação.</p></div>
  <div class="card"><h3>FIFO</h3><p>Substitui a página que está há mais tempo na memória.</p></div>
  <div class="card"><h3>Segunda chance</h3><p>Adia a remoção se a página foi referenciada.</p></div>
  <div class="card"><h3>Clock</h3><p>Varre circularmente os quadros e zera o bit R ao conceder uma chance.</p></div>
  <div class="card"><h3>LRU / Aging</h3><p>Estimam uso recente; Aging registra referências em contadores.</p></div>
  <div class="card"><h3>Working Set / WSClock</h3><p>Consideram páginas ativas e combinam essa ideia com uma varredura eficiente.</p></div>
</div>

---

<div class="eyebrow">CLOCK</div>

# O ponteiro dá tempo às páginas referenciadas

<div class="flow outline">
  <div class="node"><h3>Bit R = 1</h3><p>Zera R e mantém a página.</p></div>
  <div class="node"><h3>Avançar</h3><p>Ponteiro segue ao próximo quadro.</p></div>
  <div class="node"><h3>Bit R = 0</h3><p>Quadro pode ser escolhido como vítima.</p></div>
</div>

<div class="callout"><span class="tag">SEGUNDA CHANCE</span>A lista circular aproxima o uso recente sem exigir uma ordenação completa a cada acesso.</div>

---

<div class="eyebrow">WORKING SET</div>

# O conjunto de trabalho reúne páginas usadas recentemente

<p>O sistema acompanha as páginas ativas de cada processo. Se a RAM não comporta esses conjuntos, processos passam mais tempo esperando transferências de páginas.</p>

<div class="panel c-orange"><span class="label">THRASHING</span><p>Movimentação excessiva entre disco e RAM reduz o progresso dos processos e pode derrubar o uso da CPU.</p></div>
<p class="muted">Reduzir a multiprogramação pode permitir que os conjuntos de trabalho caibam na memória.</p>

---

<div class="eyebrow">SEGMENTAÇÃO</div>

# Segmentos seguem a organização lógica do programa

| Paginação | Segmentação |
|---|---|
| Espaço unidimensional, dividido em blocos fixos | Espaço organizado em segmentos de tamanho variável |
| Endereço: página e deslocamento | Endereço: segmento e deslocamento |
| Pode deixar fragmentação interna | Pode deixar fragmentação externa |
| Tamanho uniforme dos blocos | Código, dados e pilha podem ser segmentos distintos |

---

<div class="eyebrow">EXERCÍCIO</div>

# Aging combina histórico e referência recente

<p>Contador atual: <code>10000000</code>. No próximo tique, o bit R é 1.</p>

<div class="steps cols-3">
  <div class="step"><span class="n">01</span><h3>Deslocar</h3><p>10000000 >> 1 = 01000000</p></div>
  <div class="step"><span class="n">02</span><h3>Inserir R</h3><p>Adicionar 1 no bit mais significativo.</p></div>
  <div class="step"><span class="n">03</span><h3>Resultado</h3><p>11000000</p></div>
</div>

<div class="callout"><span class="tag">VÍTIMA</span>Na aproximação descrita, o menor valor do contador indica a página menos recentemente usada.</div>

---

<div class="eyebrow">SÍNTESE</div>

# A memória virtual depende de cooperação entre hardware e SO

<div class="cards cols-2">
  <div class="card c-blue"><h3>Hardware</h3><p>MMU traduz endereços, verifica bits e dispara falta de página.</p></div>
  <div class="card c-teal"><h3>Sistema operacional</h3><p>Carrega páginas, escolhe substituições e mantém o mapeamento.</p></div>
</div>

<div class="callout"><span class="tag">LEITURA</span>Paginação organiza o espaço físico; segmentação representa divisões lógicas do programa.</div>

---

<div class="eyebrow">REFERÊNCIA</div>

# Leitura da aula

Tanenbaum, A. S.; Bos, H. *Sistemas Operacionais Modernos*. 4ª ed. São Paulo: Pearson, 2016. Capítulo 3.

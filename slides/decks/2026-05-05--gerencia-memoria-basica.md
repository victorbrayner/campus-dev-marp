---
marp: true
theme: campus-dev
size: 16:9
paginate: true
html: true
footer: 'SISTEMAS OPERACIONAIS · UNIDADE II'
---

<!-- _class: title -->

<div class="eyebrow">SISTEMAS OPERACIONAIS · AULA 01</div>

# Gerência de memória
# sem memória virtual

<p class="subtitle">Como o sistema operacional organiza a RAM, protege processos e encontra espaço para cada um.</p>

---

<div class="eyebrow">PROBLEMA</div>

# A memória ideal não existe

<div class="cards cols-4">
  <div class="card"><h3>Registradores</h3><p>Acesso imediato e capacidade muito pequena.</p></div>
  <div class="card"><h3>Cache</h3><p>Rápida, próxima da CPU e limitada.</p></div>
  <div class="card"><h3>RAM</h3><p>Espaço de trabalho dos processos em execução.</p></div>
  <div class="card"><h3>Disco</h3><p>Grande capacidade, com acesso mais lento.</p></div>
</div>

<div class="callout"><span class="tag">CONSEQUÊNCIA</span>A diferença de velocidade, capacidade e custo exige uma hierarquia de memória.</div>

---

<div class="eyebrow">ANALOGIA</div>

# A mesa de estudos ajuda a visualizar a hierarquia

<div class="flow outline">
  <div class="node"><h3>Mão e papéis</h3><p>Registradores e cache</p></div>
  <div class="node"><h3>Estante do quarto</h3><p>RAM</p></div>
  <div class="node"><h3>Biblioteca pública</h3><p>Disco</p></div>
</div>

<p>A mão alcança rápido poucos papéis. A estante guarda mais livros, mas exige deslocamento. A biblioteca comporta ainda mais, com maior custo de acesso.</p>

---

<div class="eyebrow">SEM ISOLAMENTO</div>

# Endereços físicos fixos podem quebrar a execução

<div class="two-col">
  <div class="col"><span class="label">O caso do JMP 28</span><p>Um programa compilado para iniciar no endereço zero contém um salto para o endereço 28.</p><p>Se for carregado a partir do endereço físico 16.384, esse salto continua apontando para 28.</p></div>
  <div class="col"><span class="label">O risco na multiprogramação</span><p>Sem tradução, o processo pode acessar a região errada da RAM, inclusive dados de outro processo ou do sistema operacional.</p><p class="muted">O endereço usado pelo programa precisa ser ajustado durante a execução.</p></div>
</div>

<div class="callout"><span class="tag">IDEIA CENTRAL</span>O sistema operacional precisa criar um espaço de endereçamento próprio para cada processo.</div>

---

<div class="eyebrow">PROTEÇÃO DE HARDWARE</div>

# Base e limite traduzem e validam cada acesso

<div class="steps cols-3">
  <div class="step"><span class="n">01</span><h3>Verificar</h3><p>Comparar o endereço lógico com o limite do processo.</p></div>
  <div class="step"><span class="n">02</span><h3>Traduzir</h3><p>Somar o endereço lógico ao registrador base.</p></div>
  <div class="step"><span class="n">03</span><h3>Proteger</h3><p>Se exceder o limite, gerar uma interrupção de proteção.</p></div>
</div>

<div class="equation">endereço físico = base + endereço lógico</div>
<p class="muted">O limite representa o tamanho do espaço do processo; os registradores são configurados pelo sistema operacional.</p>

---

<div class="eyebrow">EXECUÇÃO</div>

# A realocação dinâmica corrige o salto

<div class="two-col">
  <div class="col"><span class="label">Antes da tradução</span><p>O programa pede o endereço lógico 28, relativo ao seu próprio início.</p><p>O teste confirma que 28 está dentro do limite permitido.</p></div>
  <div class="col"><span class="label">Com base = 16.384</span><p>A MMU calcula 16.384 + 28 = 16.412 e acessa esse endereço físico.</p><p>O programa pode ser carregado em outra região sem reescrever suas instruções.</p></div>
</div>

<div class="callout"><span class="tag">REGRA</span>Tradução e proteção acontecem a cada acesso à memória.</div>

---

<div class="eyebrow">SWAPPING</div>

# O sistema pode mover processos inteiros entre RAM e disco

<div class="flow outline">
  <div class="node"><h3>RAM cheia</h3><p>Falta espaço para outro processo.</p></div>
  <div class="node"><h3>Retirar processo</h3><p>Transferi-lo para o disco.</p></div>
  <div class="node"><h3>Liberar região</h3><p>Usar o espaço para outro processo.</p></div>
  <div class="node"><h3>Trazer de volta</h3><p>Restaurar o processo quando necessário.</p></div>
</div>

<p class="muted">Swapping transfere processos inteiros entre RAM e disco. O tempo de transferência limita sua utilidade.</p>

---

<div class="eyebrow">ALOCAR ESPAÇO</div>

# O algoritmo escolhe uma lacuna livre

| Algoritmo | Escolha | Característica |
|---|---|---|
| First Fit | Primeira lacuna suficiente | Busca rápida; deixa sobras que podem continuar úteis |
| Next Fit | Próxima lacuna suficiente após a busca anterior | Retoma a busca de onde parou |
| Best Fit | Menor lacuna que comporta o processo | Busca extensa; pode deixar fragmentos pequenos |
| Worst Fit | Maior lacuna disponível | Tenta manter sobras maiores |
| Quick Fit | Lista separada por tamanhos frequentes | Acelera busca; exige manter listas e combinar espaços livres |

---

<div class="eyebrow">EXERCÍCIO</div>

# Uma requisição de 12 MB cabe em mais de uma lacuna

<p>Memória livre, na ordem: <strong>10, 20, 18, 7 e 15 MB</strong>. O processo solicita 12 MB.</p>

<div class="cards cols-2">
  <div class="card c-blue"><h3>First Fit → 20 MB</h3><p>10 MB não comporta o processo. A primeira lacuna suficiente tem 20 MB.</p></div>
  <div class="card c-teal"><h3>Best Fit → 15 MB</h3><p>Entre as lacunas suficientes, 15 MB é a menor que comporta 12 MB.</p></div>
</div>

---

<div class="eyebrow">CONTROLAR ESPAÇO LIVRE</div>

# Bitmap e lista encadeada representam lacunas de formas diferentes

| Estrutura | Representação | Custo ou vantagem |
|---|---|---|
| Mapa de bits | Um bit por unidade de alocação | Compacto quando as unidades são grandes; busca sequências livres pode custar tempo |
| Lista encadeada | Nós descrevem regiões ocupadas e livres | Registra intervalos diretamente; percorre a lista para localizar espaço |

<div class="callout"><span class="tag">FRAGMENTAÇÃO</span>Ao liberar uma região, lacunas vizinhas na lista podem ser fundidas. Compactar a RAM continuamente custa tempo e movimenta dados.</div>

---

<div class="eyebrow">SÍNTESE</div>

# Base e limite isolam processos na RAM física

<ul class="list tight">
  <li>Base desloca endereços lógicos para a região física do processo.</li>
  <li>Limite impede acessos fora do espaço autorizado.</li>
  <li>Swapping libera RAM transferindo processos inteiros para o disco.</li>
  <li>Algoritmos de alocação trocam velocidade de busca por padrões diferentes de sobras.</li>
</ul>

<div class="callout"><span class="tag">PRÓXIMA AULA</span>Memória virtual amplia essa abstração com paginação e mapeamento entre espaços virtuais e físicos.</div>

---

<div class="eyebrow">REFERÊNCIA</div>

# Leitura da aula

Tanenbaum, A. S.; Bos, H. *Sistemas Operacionais Modernos*. 4ª ed. São Paulo: Pearson, 2016. Capítulo 3.

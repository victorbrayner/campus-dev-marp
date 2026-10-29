---
marp: true
theme: campus-dev
size: 16:9
paginate: true
html: true
footer: 'SISTEMAS OPERACIONAIS · UNIDADE II'
---

<!-- _class: title -->

<div class="eyebrow">SISTEMAS OPERACIONAIS · AULA 03</div>

# Sistemas de arquivos

<p class="subtitle">Como o sistema operacional organiza, localiza e protege dados persistentes.</p>

---

<div class="eyebrow">ABSTRAÇÃO</div>

# Arquivos escondem a organização física do disco

<div class="two-col">
  <div class="col"><span class="label">O programa usa</span><p>Arquivos identificados por nomes, com atributos e operações como abrir, ler, escrever e fechar.</p><p>Diretórios organizam os arquivos em uma hierarquia.</p></div>
  <div class="col"><span class="label">O dispositivo contém</span><p>Blocos de dados e estruturas de controle, que não devem ser manipulados como se fossem arquivos diretamente.</p><p>O sistema operacional oferece a abstração e administra os detalhes.</p></div>
</div>

---

<div class="eyebrow">CAMINHOS</div>

# Um caminho começa na raiz ou no diretório atual

<div class="cards cols-2">
  <div class="card"><h3>Caminho absoluto</h3><p>Parte do diretório raiz, indicado por <code>/</code>, e descreve a localização na hierarquia.</p></div>
  <div class="card"><h3>Caminho relativo</h3><p>É interpretado a partir do diretório de trabalho atual.</p></div>
</div>

<div class="flow outline"><div class="node"><h3>/</h3><p>raiz</p></div><div class="node"><h3>home</h3><p>diretório</p></div><div class="node"><h3>aluno</h3><p>subdiretório</p></div><div class="node"><h3>arquivo</h3><p>entrada final</p></div></div>

---

<div class="eyebrow">ALOCAR BLOCOS</div>

# Os métodos de alocação fazem escolhas diferentes

| Estratégia | Organização | Consequência |
|---|---|---|
| Contígua | Blocos consecutivos | Leitura eficiente; difícil crescer e pode fragmentar o espaço livre |
| Lista encadeada | Cada bloco indica o próximo | Acesso sequencial simples; acesso aleatório exige percorrer a cadeia |
| FAT | Cadeia centralizada em tabela na RAM | Facilita percorrer blocos; tabela grande consome memória |
| I-nodes | Índices com ponteiros diretos e indiretos | Suporta acesso direto e níveis de tamanho de arquivo |

---

<div class="eyebrow">FAT</div>

# A FAT mantém a cadeia de blocos numa tabela

<div class="two-col">
  <div class="col"><span class="label">Como funciona</span><p>A tabela de alocação de arquivos (FAT) registra qual bloco sucede cada bloco do arquivo.</p><p>Mantê-la na RAM acelera a navegação pela cadeia.</p></div>
  <div class="col"><span class="label">Custo de escala</span><p>Uma FAT grande ocupa memória mesmo quando a aplicação acessa poucos arquivos.</p><p>O roteiro estima cerca de 3 GB de RAM para um disco de 1 TB com blocos de 1 KB.</p></div>
</div>

---

<div class="eyebrow">I-NODES</div>

# I-nodes apontam para blocos em níveis diferentes

<div class="flow outline">
  <div class="node"><h3>I-node</h3><p>metadados e ponteiros</p></div>
  <div class="node"><h3>Diretos</h3><p>apontam para blocos de dados</p></div>
  <div class="node"><h3>Indiretos</h3><p>apontam para blocos de ponteiros</p></div>
  <div class="node"><h3>Dados</h3><p>conteúdo do arquivo</p></div>
</div>

<p>Os níveis simples, duplos e triplos ampliam o alcance do índice. O i-node é carregado na RAM quando o arquivo é aberto.</p>

---

<div class="eyebrow">BLOCOS</div>

# O tamanho do bloco equilibra espaço e transferências

<div class="two-col">
  <div class="col"><span class="label">Blocos menores</span><p>Reduzem o espaço desperdiçado no fim de arquivos, mas aumentam a quantidade de blocos e operações de busca.</p></div>
  <div class="col"><span class="label">Blocos maiores</span><p>Podem melhorar a transferência sequencial, mas ampliam a fragmentação interna em arquivos pequenos.</p></div>
</div>

<div class="callout"><span class="tag">REFERÊNCIA DO ROTEIRO</span>Blocos de 4 KB são apresentados como equilíbrio entre fragmentação interna e taxa de transferência.</div>

---

<div class="eyebrow">JOURNALING</div>

# O diário registra intenções antes da atualização final

<div class="steps cols-3">
  <div class="step"><span class="n">01</span><h3>Registrar</h3><p>Gravar no diário as mudanças planejadas.</p></div>
  <div class="step"><span class="n">02</span><h3>Aplicar</h3><p>Atualizar as estruturas e blocos do sistema de arquivos.</p></div>
  <div class="step"><span class="n">03</span><h3>Recuperar</h3><p>Após falha, usar o diário para concluir ou reverter a operação conforme o mecanismo.</p></div>
</div>

<p class="muted">O journaling reduz o trabalho de recuperação de metadados após uma interrupção inesperada.</p>

---

<div class="eyebrow">LINKS</div>

# Hard links compartilham i-node; symlinks guardam um caminho

| Aspecto | Hard link | Link simbólico |
|---|---|---|
| O que a entrada referencia | O mesmo i-node do arquivo | Um i-node próprio com uma string de caminho |
| Remover o nome original | Outro nome ainda acessa os dados | O caminho pode deixar de existir |
| Vida dos dados | Depende da contagem de referências | Depende do destino do caminho |

---

<div class="eyebrow">DEMONSTRAÇÃO</div>

# Os números de i-node distinguem os dois tipos de link

```bash
echo "Dados do arquivo" > arquivo.txt
ln arquivo.txt hardlink.txt
ln -s arquivo.txt softlink.txt
ls -i arquivo.txt hardlink.txt softlink.txt
```

<p>O arquivo e o hard link exibem o mesmo i-node. O link simbólico tem outro i-node e armazena o caminho do destino.</p>

---

<div class="eyebrow">CAMADAS</div>

# O VFS oferece uma interface comum a vários sistemas

<div class="flow outline"><div class="node"><h3>Aplicação</h3><p>operações de arquivo</p></div><div class="node"><h3>VFS</h3><p>interface comum</p></div><div class="node"><h3>ext4</h3><p>sistema de arquivos</p></div><div class="node"><h3>NTFS</h3><p>sistema de arquivos</p></div></div>

<p class="muted">O Virtual File System (VFS) permite que aplicações usem operações padronizadas enquanto implementações diferentes cuidam de seus formatos e estruturas.</p>

---

<div class="eyebrow">SÍNTESE</div>

# A organização lógica depende de estruturas de alocação

<ul class="list tight">
  <li>Diretórios e caminhos ajudam a localizar arquivos.</li>
  <li>FAT mantém cadeias numa tabela; i-nodes combinam ponteiros diretos e indiretos.</li>
  <li>Journaling auxilia a recuperação após falhas.</li>
  <li>Hard links compartilham i-node; links simbólicos apontam por caminho.</li>
</ul>

---

<div class="eyebrow">REFERÊNCIA</div>

# Leitura da aula

Tanenbaum, A. S.; Bos, H. *Sistemas Operacionais Modernos*. 4ª ed. São Paulo: Pearson, 2016. Capítulo 4.

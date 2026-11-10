# Ergomino — Blueprint do site (v1.0)

Nov 9, 2026 · @Vinícius Vencato

## 1. Resumo: decisões-chave

O Ergomino deve ser uma ferramenta de consulta para quem faz o livro, não um blog sobre telas: cada página termina numa decisão de editoração, e cada recomendação mostra a fonte e a força da evidência.

- **Público:** quem faz o livro — editores, designers editoriais, diagramadores, ilustradores, produtores gráficos. O leitor de 0 a 17 anos é o beneficiário; professores e mediadores de leitura são público secundário.
- **Estrutura:** dez áreas — Início, Por que importa, Ciência da leitura, Guia de editoração, Fases do leitor, Monte seu leitor, Mitos e evidências, Recursos, Referências, Sobre e método (seção 4).
- **Feature central:** "Monte seu leitor" transforma 8 perguntas sobre o leitor e o projeto numa ficha de editoração com faixas de valores, justificativas e nível de evidência (seção 6).
- **Tese editorial:** tornar a leitura atraente não é estimular mais. A evidência aponta para páginas mais limpas, ritmo em blocos curtos e tipografia generosa — não para mais cor, efeitos e informação por página.
- **Linguagem:** "viciados em dopamina" sai do texto público. Entra "leitores formados num ambiente de recompensas rápidas": mais preciso e sem estigmatizar crianças.
- **Rigor visível:** toda recomendação recebe um selo de evidência — A forte, B moderada, C prática consolidada, D hipótese — e link para a fonte (seção 9).
- **Do PDF:** ficam a definição de ergonomia visual, as faixas etárias, a classificação tipográfica e os estudos de Hughes & Wilkins e Walker & Reynolds. São corrigidos o uso de "homeostase", o modelo de 4 etapas e a linguagem de vício (seção 2).

Premissas assumidas: "Ergomino" é o nome de trabalho (vem do nome do projeto); o blueprint é textual, sem wireframes desenhados; o contexto é o mercado editorial brasileiro.

## 2. Diagnóstico do documento-base

O PDF é um bom ponto de partida, mas está incompleto e mistura ciência sólida com simplificações: só o manual de boas práticas está perto de virar página do site, e ele para no meio da tipografia.

| Bloco do PDF | Autor | Estado | Destino no site |
| --- | --- | --- | --- |
| Lista de tarefas (atenção e redes; estudos sobre assistência visual da leitura; site) | Equipe | Tarefa 2 sem responsável e sem conteúdo; "saúde mental" não desenvolvida | Tarefa 2 respondida na seção 7 |
| 1. Sistema de recompensa do cérebro | Bono | Boa base didática; termos a corrigir; uma única fonte | Página "Atenção e recompensa" (Ciência da leitura) |
| Dificuldade de ver valor nas coisas | Bono | Hipótese apresentada como fato | Reescrever como "o que se sabe × o que se supõe" |
| Manual: introdução e fatores da ergonomia visual | João V | Sólido; aparece duplicado (p. 2 e 3) | Página-conceito "O que é ergonomia visual" |
| Manual §1: legibilidade e leiturabilidade | João V | Sólido | Página-conceito + glossário |
| Manual §2: faixas etárias (0–3 a 13–17) | João V | Bom como referência; idade ainda não está ligada a estágio de leitura | Base de "Fases do leitor" e da ferramenta |
| Manual §3: tipografia | João V | Incompleto: classificação feita; corpo e espaçamento ausentes | Completado na seção 8 |

**Resposta curta à tarefa 2.** Há pouca pesquisa que ligue diretamente design editorial e perda de atenção de jovens. O que existe é evidência indireta e convergente: excesso visual na página, leitura em tela e tipografia apertada pioram a leitura de crianças. A seção 7 mapeia esses estudos.

### O que manter

- Dopamina como molécula da antecipação e da busca, não do prazer. Está alinhado à distinção "querer × gostar" da neurociência (Berridge & Robinson).
- "Não existe uma configuração visual ideal única" e "faixas são referências, não regras". Isso deve virar princípio declarado do site.
- O alerta de que crescer não significa reduzir automaticamente o corpo do texto (Hughes & Wilkins).
- Walker & Reynolds contra o mito de que criança só lê fonte sem serifa.

### O que corrigir

1. **"Homeostase".** O texto descreve neuroadaptação (tolerância): o cérebro reduz a resposta a um estímulo repetido. Homeostase é o princípio geral de equilíbrio, não esse mecanismo.
2. **Receptores de dopamina e redes sociais.** A redução de receptores está bem documentada na dependência de substâncias. Para redes sociais e vídeo curto, os estudos são pequenos ou correlacionais; no site, isso entra como hipótese (selo D).
3. **O ciclo de 4 etapas.** Gatilho → desejo → ação → recompensa é o "loop do hábito" de livros de divulgação (Duhigg, Clear), não um circuito neural. Pode ficar, rotulado como modelo didático.
4. **"Vício".** É termo clínico. A CID-11 reconhece o transtorno de jogo (games), não um "vício em redes sociais"; a pesquisa usa "uso problemático". Aplicado a crianças, o rótulo também estigmatiza.
5. **Fontes.** A parte de neurociência se apóia num único artigo de revista multidisciplinar. Para um público profissional, ancorar em revisões sistemáticas e meta-análises (seção 10).
6. **Classificação tipográfica.** Garamond, Bembo e Minion são garaldas (old style) na classificação Vox-ATypI; "humanista serifada" pode ficar como guarda-chuva, se explicado. Faltam duas famílias críticas para a infância: didonas (Bodoni, Didot), cujos traços finos somem em corpo pequeno, e neogrotescas (Helvetica, Arial), com aberturas fechadas e I/l/1 parecidos.
7. **Geométricas.** O risco para iniciantes não é a forma "pouco familiar": o "a" de um andar da Futura é justamente o da escrita escolar. O risco é a simetria — b/d/p/q espelhados e o/a/e quase circulares.

### O que falta

Corpo, entrelinha e comprimento de linha; alinhamento e hifenização; cor e contraste; relação texto-imagem; papel, formato e encadernação; leitura em tela; acessibilidade (dislexia, baixa visão, daltonismo, TDAH); como testar com leitores reais; e o contexto brasileiro (dados de leitura e alfabetização, PNLD). As seções 7 e 8 cobrem essas lacunas.

## 3. Premissa, posicionamento e públicos

O Ergomino ajuda quem faz livros e revistas a projetar páginas que crianças e adolescentes conseguem — e querem — ler até o fim. O foco é a página, não o diagnóstico do leitor.

### Premissa reformulada

| Elemento | Versão original | Versão proposta |
| --- | --- | --- |
| Para quem | Público infantojuvenil afetado pelo uso demasiado de telas e "viciado em dopamina" | Profissionais que fazem livros e revistas para leitores de 0 a 17 anos que cresceram entre telas |
| Promessa | Leitura mais atrativa e fluida | Decisões de editoração baseadas em evidência, com a força de cada evidência à vista |
| Papel das telas | Identidade do site | Contexto (por que importa) e variável de projeto (perfil do leitor na ferramenta) |

**Frase de posicionamento:** "Ergonomia visual baseada em evidências para livros e revistas infantojuvenis — para leitores que cresceram entre telas." Opções de assinatura: "Páginas que se deixam ler", "Ciência da leitura para quem faz a página", "Menos ruído, mais leitura".

Por que reformular:

1. **Precisão.** "Vício em dopamina" não é um conceito científico. O que a pesquisa mede é uma associação moderada, sobretudo correlacional, entre uso de vídeo curto e atenção (seção 7).
2. **Credibilidade.** O público é técnico. Linguagem alarmista afasta editores, educadores e pediatras — justamente quem cita e indica o site.
3. **Ética.** O leitor final é uma criança. Rotulá-la de "viciada" estigmatiza e dificulta a adoção do site por escolas e editoras.

**O Ergomino é:** referência de consulta, ferramenta de especificação, curadoria com selo de evidência, contexto brasileiro. **Não é:** orientação médica, manifesto contra telas, substituto de teste com leitores reais, vitrine de fontes.

### Públicos

| Público | Quem | O que precisa | Onde encontra |
| --- | --- | --- | --- |
| Primário | Designers editoriais e diagramadores | Valores de partida e argumentos para defender escolhas | Monte seu leitor, Guia, Recursos |
| Primário | Editores de livro e revista | Critérios de briefing e aprovação; dados para convencer autor, comercial e escola | Ficha da ferramenta, Por que importa, Fases do leitor |
| Primário | Ilustradores e diretores de arte | Relação texto-imagem, densidade visual, cor | Guia › Imagem e cor; Mitos |
| Secundário | Produtores gráficos | Papel, acabamento, encadernação | Guia › Materialidade |
| Secundário | Professores, bibliotecários, mediadores, autores | Critérios para escolher e mediar livros | Fases do leitor, Por que importa |
| Beneficiário | Leitores de 0 a 17 anos | Não navegam o site: aparecem como perfis | Monte seu leitor, Fases do leitor |

### Proto-personas (hipóteses a validar em entrevistas)

1. **Carla, diagramadora freelancer.** Recebe projetos de editoras pequenas com prazo curto. Precisa de valores de partida em minutos e de um argumento quando o cliente pede "fonte infantil" ou "mais cor". Sucesso: sai da ferramenta com corpo, entrelinha e medida definidos.
2. **Rafael, editor de literatura juvenil.** Publica para 11 a 15 anos e vê leitores abandonarem livros longos. Quer saber se capítulos curtos, ilustração e respiro ajudam, com evidência para convencer o comercial. Sucesso: leva a ficha e dois estudos para a reunião.
3. **Juliana, editora de didáticos e paradidáticos.** Responde a editais públicos (PNLD) e precisa de acessibilidade e de justificativa técnica para avaliadores. Sucesso: checklist de acessibilidade aprovado sem retrabalho.

### Tarefas que o site precisa resolver

- Quando começo um projeto para uma faixa etária, quero parâmetros de partida confiáveis, para não decidir no achismo.
- Quando o cliente pede algo que prejudica a leitura, quero um argumento com fonte, para defender a decisão.
- Quando reviso a prova, quero um checklist, para pegar problemas de legibilidade antes da gráfica.
- Quando o livro vai para leitores com dislexia ou baixa visão, quero saber o que muda, sem cair em mitos.
- Quando preciso justificar o investimento em projeto gráfico, quero dados em linguagem simples.

## 4. Arquitetura da informação

O site se organiza em três camadas — entender, decidir e consultar —, e a ferramenta Monte seu leitor costura as três: toda recomendação da ficha leva à diretriz e à fonte que a sustentam.

### Mapa do site

1. **Início**
2. **Por que importa** — o leitor de hoje (telas e atenção); leitura e alfabetização no Brasil; o que o projeto gráfico pode e não pode fazer; argumentos prontos
3. **Ciência da leitura** (entender)
   1. Como o olho lê
   2. Como o leitor se desenvolve
   3. Atenção e recompensa
   4. Papel × tela
   5. Saúde visual
4. **Guia de editoração** (decidir)
   1. Tipografia
   2. Espaçamento e medida
   3. Página e grid
   4. Imagem e cor
   5. Ritmo e estrutura
   6. Materialidade (papel, formato, encadernação)
   7. Digital (PDF, e-book, apps)
   8. Acessibilidade
5. **Fases do leitor** (decidir) — pré-leitor, iniciante, em processo, fluente, crítico
6. **Monte seu leitor** (ferramenta) — perguntas, ficha, comparar perfis, exportar
7. **Mitos e evidências** (consultar)
8. **Recursos** (consultar) — checklists, calculadoras, modelos, protocolo de teste com leitores, glossário
9. **Referências** (consultar) — biblioteca filtrável
10. **Sobre e método** — equipe, selo de evidência, política de atualização, histórico de mudanças, sugerir correção

### Navegação

- **Menu principal:** Por que importa · Ciência · Guia · Fases do leitor · Mitos · botão "Monte seu leitor", sempre visível, inclusive no celular.
- **Menu utilitário:** Recursos · Referências · Sobre e método · busca.
- **Navegação cruzada:** toda diretriz mostra "vale para" (fases e suportes) e "por quê" (página de ciência). Toda página de ciência termina em "o que isso muda na página".
- **Busca com sinônimos:** "entrelinha" = "leading"; "corpo" = "tamanho da fonte"; "medida" = "largura da linha".

### Taxonomia

Todo conteúdo recebe as etiquetas abaixo; são elas que alimentam filtros, busca e a ficha da ferramenta.

| Eixo | Valores | Observação |
| --- | --- | --- |
| Idade | 0–3 · 4–5 · 6–7 · 8–10 · 11–14 · 15–17 | Alinhada às etapas escolares (creche, pré-escola, alfabetização, anos iniciais, anos finais, ensino médio) |
| Estágio de leitura | Pré-leitor · Iniciante · Em processo · Fluente · Crítico | Independe da idade; é a base das recomendações |
| Tema | Tipografia · Espaçamento · Página · Imagem e cor · Ritmo · Materialidade · Digital · Acessibilidade · Saúde visual · Atenção | — |
| Suporte | Impresso · PDF/layout fixo · E-book refluível · Híbrido | — |
| Publicação | Cartonado · Livro-imagem · Ilustrado · Primeira leitura · Capítulos · Romance · HQ · Informativo · Didático · Revista | — |
| Acesso | Dislexia · Baixa visão · Daltonismo · TDAH · TEA · Português como 2ª língua | Inclui leitores surdos que têm Libras como 1ª língua |
| Evidência | A · B · C · D · Mito | Ver seção 9 |
| Tipo de conteúdo | Conceito · Diretriz · Fase · Dado · Mito · Estudo · Checklist · Ferramenta | Define o modelo da página |

As faixas etárias do PDF (0–3, 4–6, 7–9, 10–12, 13–17) viram faixas escolares porque é assim que editoras vendem, que o PNLD organiza os editais e que a alfabetização é medida (fim do 2º ano, 7 anos).

### Modelo de conteúdo: a diretriz

Cada diretriz é um registro estruturado. O mesmo registro alimenta a página do Guia, a página da fase e a ficha da ferramenta — escreve-se uma vez, aparece em três lugares.

| Campo | Conteúdo |
| --- | --- |
| Título | Imperativo e curto ("Não reduza o corpo rápido demais entre as fases") |
| Recomendação | Uma frase acionável |
| Valores | Faixa por estágio de leitura, quando houver número |
| Vale para | Estágios, suportes, publicações, necessidades de acesso |
| Por quê | Uma ou duas frases, com link para a página de ciência |
| Evidência | Selo (A–D) + referências |
| Exceções | Quando não aplicar |
| Exemplo | Par antes/depois |
| Relacionadas | Outras diretrizes e mitos |
| Revisado em | Data da última revisão |

### Fluxos principais

1. **Projeto novo (designer, editor):** Início → Monte seu leitor → ficha → "por quê?" numa recomendação → diretriz → fonte → exportar PDF.
2. **Preciso de um argumento (editor):** busca ou Mitos → cartão do mito → evidência → "copiar argumento" (texto curto com referência).
3. **Estou aprendendo (estudante, designer júnior):** Ciência da leitura → Fases do leitor → Guia.
4. **Revisão antes da gráfica (diagramador, produtor):** Recursos → checklist de prova → item → diretriz.

## 5. Blueprints das páginas

Dez páginas-modelo cobrem o site inteiro, porque Ciência, Guia e Fases do leitor se repetem por template. Cada blueprint traz objetivo, blocos em ordem de leitura e componentes.

### Regras transversais

- **O site pratica o que ensina:** WCAG 2.2 AA, corpo base de 18 a 20 px, entrelinha perto de 1,5, medida até 70 caracteres, texto em bandeira à esquerda, contraste alto. Sem carrossel automático, pop-up ou rolagem infinita.
- **Controles de leitura** no topo das páginas longas: tamanho do texto, tema claro/escuro e "modo leitura", que esconde a navegação.
- **Rigor visível:** todo número tem fonte e ano; toda diretriz tem selo de evidência.
- **Celular primeiro:** a ferramenta precisa funcionar com uma mão.
- **Direitos:** páginas de livros reais só com autorização da editora e crédito.

### 5.1 Início

Objetivo: em 10 segundos, dizer o que é o Ergomino e levar à ferramenta ou ao Guia.

| Ordem | Bloco | Conteúdo | Componente |
| --- | --- | --- | --- |
| 1 | Hero | "Páginas que crianças conseguem — e querem — ler até o fim" + subtítulo com a frase de posicionamento | Botão "Monte seu leitor"; link "Ver o guia" |
| 2 | O problema em 3 dados | 53% dos brasileiros não leram livro nos últimos 3 meses (2024); 59,2% das crianças alfabetizadas ao fim do 2º ano (2024); "falta de paciência" como dificuldade de leitura subiu de 11% para 25% (2007–2024) | Cartão de dado: número, frase, fonte, ano |
| 3 | Como funciona | Descreva o leitor → receba a ficha de editoração → veja o porquê de cada recomendação | Três passos numerados |
| 4 | Por fase do leitor | Cinco cartões, do pré-leitor ao crítico, com idade típica | Cartão de fase |
| 5 | Por tema | Os oito temas do Guia | Grade de atalhos |
| 6 | Mito em destaque | Ex.: "Fonte especial resolve a dislexia?" | Cartão de mito |
| 7 | Como avaliamos | Legenda dos selos A–D + link para o método | Faixa de selos |
| 8 | Rodapé | Sobre, método, referências, sugerir correção, data da última revisão | — |

Métrica: parcela das visitas que inicia a ferramenta; cliques por fase e por tema.

### 5.2 Por que importa

Objetivo: dar contexto e argumentos a quem precisa convencer autor, comercial, escola ou cliente.

| Ordem | Bloco | Conteúdo | Componente |
| --- | --- | --- | --- |
| 1 | Abertura | "A página impressa disputa atenção com o feed" — um parágrafo | Texto |
| 2 | Leitura no Brasil | Retratos da Leitura 2024 e Indicador Criança Alfabetizada (seção 7.6) | Cartões de dado |
| 3 | Telas na infância | TIC Kids Online 2025, recomendações da SBP e do guia federal, Lei 15.100/2025 | Cartões de dado + quadro de recomendações por idade |
| 4 | O que a ciência diz sobre atenção | Resumo de três linhas | Link para Ciência › Atenção e recompensa |
| 5 | O que o projeto gráfico pode — e não pode | Pode reduzir esforço e competição visual; não substitui mediação adulta nem hábito | Dois blocos lado a lado |
| 6 | Argumentos prontos | Quatro frases citáveis, cada uma com fonte | Botão "copiar argumento" |

### 5.3 Ciência da leitura (hub + 5 páginas)

O hub mostra cinco cartões, cada um com a resposta em uma frase. As cinco páginas — Como o olho lê, Como o leitor se desenvolve, Atenção e recompensa, Papel × tela, Saúde visual — usam o mesmo template (conteúdo na seção 7).

| Ordem | Bloco | Conteúdo |
| --- | --- | --- |
| 1 | Resposta curta | O ponto em uma ou duas frases, com selo |
| 2 | Como funciona | Texto curto + um esquema (ex.: fixações e sacadas) |
| 3 | O que muda na página | Três a cinco implicações, cada uma ligada a uma diretriz |
| 4 | O que ainda não se sabe | Limites e debates em aberto |
| 5 | Fontes | Referências com selo e resumo de uma linha |

### 5.4 Guia de editoração (hub + página de tema)

O hub apresenta os oito temas e um filtro global por fase e suporte, que passa a valer em todas as páginas do Guia. A página de tema segue este template (conteúdo na seção 8):

| Ordem | Bloco | Conteúdo | Componente |
| --- | --- | --- | --- |
| 1 | Regras de ouro | As três regras do tema | Lista curta |
| 2 | Valores por fase | Faixas por estágio de leitura | Tabela com a fase do filtro destacada |
| 3 | Diretrizes | Cartões no modelo da seção 4 | Cartão expansível |
| 4 | Antes e depois | Pares de página, reais (com permissão) ou simulados | Comparador deslizante |
| 5 | Erros comuns | Cinco a sete erros e a correção | Lista |
| 6 | Checklist do tema | Itens marcáveis | Checklist exportável |
| 7 | Fontes | Referências | Lista com selo |

### 5.5 Fases do leitor (hub + página por fase)

1. **Quem é esse leitor:** idade típica, o que já faz, o que ainda não faz — com o lembrete de que estágio não é idade.
2. **Como lê:** visão, decodificação, atenção.
3. **Parâmetros de partida:** resumo da ficha padrão da fase, com o atalho "ajustar na ferramenta".
4. **Publicações típicas** da fase.
5. **Erros comuns** nessa fase.
6. **Exemplos comentados:** livros brasileiros, com autorização.
7. **Para mediadores:** como ler junto — bloco curto para professores e famílias.

### 5.6 Monte seu leitor

Blueprint completo na seção 6.

### 5.7 Mitos e evidências

Objetivo: desfazer crenças que levam a más decisões de projeto e entregar o argumento pronto. A listagem mostra cartões com veredito (Falso, Depende, Verdadeiro, Não comprovado) e filtros por tema. O detalhe segue a ordem afirmação → veredito → o que a pesquisa mostra → o que fazer → fontes → "copiar argumento".

| Mito | Veredito | Base |
| --- | --- | --- |
| Fontes especiais para dislexia melhoram a leitura | Falso | Kuster et al. 2018; Wery & Diliberto 2017 |
| Criança só lê bem fonte sem serifa | Falso | Walker & Reynolds 2003 |
| Iniciante precisa de "a" e "g" infantis | Falso | Walker & Reynolds 2003; Walker 2005 |
| Quanto mais velho o leitor, menor pode ser a letra | Depende | Hughes & Wilkins 2000; Wilkins et al. 2009 |
| Mais cor e mais imagem prendem a criança | Depende | Eng, Godwin & Fisher 2020; Sundararajan & Adesope 2020 |
| Luz azul das telas danifica os olhos | Falso | AAO; revisão Cochrane 2023 |
| Ler na tela ou no papel dá no mesmo | Depende | Delgado et al. 2018; Furenes et al. 2021 |
| Vídeo curto "frita" os receptores de dopamina | Não comprovado | Nguyen et al. 2025 (associação, não causa) |
| Nossa atenção é menor que a de um peixinho-dourado | Falso | Maybin, BBC 2017 |
| Lâminas coloridas resolvem o estresse visual | Não comprovado | Griffiths et al. 2016 |

### 5.8 Recursos

- **Checklists:** briefing editorial, prova de legibilidade, pré-impressão, acessibilidade (impresso e EPUB).
- **Calculadoras:** caracteres por linha (fonte + corpo + largura da coluna), entrelinha sugerida, conversor corpo ↔ altura-x em mm.
- **Modelos:** ficha técnica editorial; grids de partida para formatos comuns (14 × 21 cm, 20 × 20 cm, 20,5 × 27,5 cm).
- **Protocolo de teste com leitores** (seção 8.9).
- **Glossário:** legibilidade, leiturabilidade, altura-x, entrelinha, medida, fixação, sacada, aglomeração visual (crowding), viúva, órfã, rio, bandeira.

### 5.9 Referências

Biblioteca filtrável por tema, selo, tipo de estudo e ano. Cada item traz a referência completa, "o que mostrou" em uma frase, "como usamos" (links para as diretrizes) e o tipo de acesso (aberto ou fechado).

### 5.10 Sobre e método

Quem faz; como a curadoria funciona; o que significa cada selo; política de atualização com data em cada página; histórico público de mudanças (versão + nota de alteração); formulário para sugerir correção; política de conflito de interesse (sem patrocínio de fundições, fabricantes de lentes ou editoras citadas); licença do conteúdo.

## 6. Feature: Monte seu leitor

A ferramenta transforma 8 perguntas sobre o leitor e o projeto numa ficha de editoração. Cada linha da ficha traz um valor ou faixa, o porquê em uma frase, o selo de evidência e o link para a diretriz; o percurso deve levar menos de 3 minutos.

### Princípios

- **Ponto de partida defensável**, não resposta única: a ficha entrega faixas.
- **Estágio de leitura pesa mais que idade.** Em 2024, 4 em cada 10 crianças não estavam alfabetizadas ao fim do 2º ano (seção 7.6).
- **Acessibilidade vence estética:** quando duas regras disputam o mesmo parâmetro, vale a mais protetora (corpo maior, entrelinha maior).
- **Tudo explicável:** nenhum valor sem "por quê" e sem fonte.
- **Sem dados pessoais:** o perfil descreve um público, nunca uma criança identificável.

### Fluxo

1. **Entrada:** botão fixo "Monte seu leitor" ou atalho "ajustar na ferramenta" numa página de fase.
2. **Perguntas:** uma por tela no celular. No computador, perguntas à esquerda e prévia da ficha à direita, atualizada a cada resposta. Indicador "pergunta 3 de 8" e, em cada pergunta, "por que perguntamos isso?".
3. **Ficha:** resultado com alertas no topo.
4. **Ações:** ajustar respostas, comparar dois perfis lado a lado, salvar no navegador, exportar PDF, copiar link (o perfil fica gravado na URL).

### As perguntas

| # | Pergunta | Opções | Efeito na ficha |
| --- | --- | --- | --- |
| 1 | Qual a idade principal do leitor? | 0–3 · 4–5 · 6–7 · 8–10 · 11–14 · 15–17 | Sugere o estágio (editável) e os tipos de publicação comuns |
| 2 | Em que estágio de leitura ele está? | Pré-leitor · Iniciante · Em processo · Fluente · Crítico · Não sei | Define a linha-base (tabela 8.1). "Não sei" usa o estágio típico da idade e gera alerta |
| 3 | Que tipo de publicação é? | Cartonado · Livro-imagem · Ilustrado · Primeira leitura · Capítulos · Romance · HQ · Informativo · Didático · Revista | Ajusta densidade, relação texto-imagem e materialidade |
| 4 | Em que suporte será lido? | Impresso · PDF em tela · E-book refluível · Impresso + digital | Ativa o bloco Digital |
| 5 | Como será lido? | Por um adulto, em voz alta · Compartilhado · Sozinho · Em sala, para estudo | Muda a regra de imagem: rica na leitura mediada, limpa na autônoma |
| 6 | Como o leitor se relaciona com a leitura? | Engajado · Ocasional · Relutante (prefere vídeo, abandona livros) | "Relutante" ativa as estratégias de engajamento (8.5) |
| 7 | Há necessidades de acesso? (múltipla escolha) | Nenhuma · Dislexia · Baixa visão · Daltonismo · TDAH · TEA · Português como 2ª língua | Aplica os modificadores de acesso (8.8) |
| 8 | Qual o objetivo do texto? | Fruir uma narrativa · Informar e ensinar · Propor atividades | Ajusta hierarquia, sinalização e materialidade |
| + | Restrições de produção (opcional) | Formato, nº de páginas, cores, papel disponível | Gera alertas de conflito |

A pergunta 6 é onde a premissa das telas entra na ferramenta: ela descreve um comportamento observável, não um diagnóstico.

### Lógica de regras

1. **Linha-base:** o estágio de leitura busca a tabela 8.1 (altura-x, entrelinha, medida, alinhamento, hifenização, densidade).
2. **Publicação e objetivo:** informativo ativa hierarquia e sinalização; atividade ativa espaço de escrita e encadernação que abre plana; HQ ativa regras de balão e letreiramento.
3. **Modo de leitura:** leitura autônoma de iniciante ou em processo pede página de texto limpa. Leitura mediada admite ilustração rica, com o texto legível para o adulto.
4. **Engajamento:** "relutante" leva o corpo à faixa superior e ativa menos texto por página, capítulos curtos, ganchos e progresso visível.
5. **Acesso:** os modificadores entram por último, sempre na direção mais protetora.
6. **Suporte:** no e-book refluível, valores fixos viram padrões que o leitor pode ajustar. No PDF em tela, entra alerta sobre página dupla e corpo no celular.
7. **Conflitos:** restrições de produção nunca sobrescrevem em silêncio. Geram alerta com alternativas — ex.: "este corpo não cabe em 48 páginas; reduza o texto por página ou aumente a extensão, mas mantenha a altura-x mínima da faixa".

### Saída: a ficha de editoração

1. **Cabeçalho:** nome do perfil, data e versão das regras (ex.: regras v1.0), para rastrear a origem de cada ficha exportada.
2. **Resumo do perfil e alertas** ("você marcou 'Não sei' no estágio; usamos o típico da idade").
3. **Blocos:** Tipografia · Espaçamento e medida · Página e ritmo · Imagem e cor · Materialidade · Digital (se houver) · Acessibilidade (se houver).
4. **Checklist de prova** gerado a partir do perfil.
5. **Fontes e aviso de limites.**

Cada linha segue o formato parâmetro · valor · selo · por quê · link. Exemplo: *Altura-x · 3,0–3,5 mm (≈ 19–22 pt numa serifada de livro; ≈ 16,5–19 pt numa sem serifa de olho grande) · B · crianças de 7 a 9 anos leem mais rápido quando o corpo não encolhe cedo demais · ver diretriz.*

### Três perfis de exemplo

| Perfil | Respostas | Destaques da ficha |
| --- | --- | --- |
| A. Primeira leitura autônoma | 6–7 anos · iniciante · primeira leitura · impresso · sozinho · relutante · sem necessidade específica · narrativa | Altura-x na faixa superior (4,0–4,5 mm); entrelinha 1,5–1,6; uma unidade de sentido por linha; bandeira, sem hifenização; frase não atravessa página; ilustração relevante, separada do bloco de texto; capítulos curtos com marcador de progresso |
| B. Romance juvenil, leitor com dislexia | 11–14 anos · fluente · romance · impresso + e-book · sozinho · relutante · dislexia · narrativa | Altura-x 2,8 mm (topo da faixa fluente); entrelinha ≥ 1,5; espaço entre letras levemente aberto; bandeira, sem hifenização; ênfase em negrito, sem itálico nem caixa-alta contínua; papel creme fosco; qualquer fonte de texto clara, sem "fonte para dislexia"; no EPUB, ajustes liberados ao leitor |
| C. Paradidático de ciências em sala | 8–10 anos · em processo · informativo · PDF em tela + impresso · em sala · ocasional · daltonismo · informar | Altura-x 3,0–3,5 mm; medida 35–50 caracteres; títulos frequentes e termos-chave em negrito; imagem colada ao texto que explica; sem curiosidades decorativas fora do objetivo; gráficos com rótulo direto e padrão, não só cor; versão impressa para estudo |

### Componentes de interface

- **Prévia tipográfica:** amostra de página renderizada com fontes abertas (ex.: Andika, Atkinson Hyperlegible, Literata) nos parâmetros da ficha. Opção "calibrar tela" — encostar um cartão no retângulo da tela — para ver o tamanho real em milímetros.
- **Comparador:** duas fichas lado a lado, diferenças destacadas (ex.: o mesmo leitor com e sem dislexia).
- **Gaveta "por quê":** abre a diretriz sem sair da ficha.
- **Selo com legenda** ao tocar ou passar o mouse.
- **"Não sei" sempre aceito**, com alerta em vez de bloqueio.

### Regras como dados

Cada regra é um registro: identificador, condições (ex.: estágio = em processo E acesso inclui dislexia), parâmetro, valor, selo, fontes, texto do "por quê" e versão. A equipe edita as regras numa planilha ou CMS, sem código. Cada versão publicada ganha número e nota de alteração.

### Métricas

- Conclusão: parcela de quem começa e chega à ficha (meta sugerida: 70%).
- Tempo até a ficha (meta sugerida: menos de 3 minutos).
- Exportações e links copiados.
- Botão "útil?" em cada linha da ficha.
- Perfis mais comuns, em dados anônimos, para orientar o que aprofundar no Guia.

### Avisos que acompanham toda ficha

- A ficha é ponto de partida; o leitor real varia mais que qualquer faixa.
- Não é orientação clínica e não diagnostica dislexia, TDAH ou baixa visão.
- O corpo em pontos varia com a fonte: confira a altura-x medida na prova.
- Teste com leitores antes de fechar o projeto (protocolo na seção 8.9).

## 7. Conteúdo organizado — base científica

Este é o conteúdo das páginas de Ciência da leitura e de Por que importa, reorganizado a partir do PDF e completado com estudos verificados. Cada bloco segue o template da seção 5.3: resposta curta, achados, o que muda na página, o que não se sabe.

### Resposta à tarefa 2: estudos que ligam a forma da página à leitura de crianças

| Pergunta de projeto | Estudo | Achado | Selo |
| --- | --- | --- | --- |
| A ilustração compete com o texto? | Eng, Godwin & Fisher 2020 | Ilustrações extrínsecas desviaram o olhar do texto e reduziram a compreensão no 1º e 2º ano | B |
| Detalhes "interessantes" ajudam a aprender? | Sundararajan & Adesope 2020 | Detalhes sedutores — interessantes, mas irrelevantes — prejudicam a aprendizagem | A |
| O corpo pode diminuir com a idade? | Hughes & Wilkins 2000; Wilkins et al. 2009 | Corpo menor deixou crianças de 5–7 anos mais lentas e aumentou erros; aos 7–9, corpo maior ainda acelera | B |
| Espaçamento muda a leitura? | Zorzi et al. 2012 | Letras mais espaçadas aceleram a leitura de crianças com dislexia | B |
| Serifa ou "a" infantil importam? | Walker & Reynolds 2003 | Sem diferença para crianças de 6 anos | B |
| Papel ou tela? | Delgado et al. 2018; Furenes et al. 2021 | Papel rende mais compreensão, sobretudo em textos informativos | A |

Na busca feita para este blueprint, nenhum estudo testou diretamente se o projeto gráfico aumenta a persistência de leitura de crianças com alto uso de vídeo curto. É a lacuna que o Ergomino pode ocupar com testes próprios (seção 8.9).

### 7.1 Como o olho lê

**Resposta curta:** lemos em saltos, não em linha contínua — e a criança aproveita menos letras por parada que o adulto. (B)

- A leitura alterna fixações (pausas) e sacadas (saltos). Em cada fixação, o leitor iniciante aproveita cerca de 11 caracteres à direita; o adulto hábil, 14 a 15 (Rayner 1986).
- Esse campo varia com a dificuldade do texto e, segundo o mesmo estudo, não explica sozinho a lentidão do iniciante.
- Letras próximas demais se atrapalham (aglomeração visual, ou crowding). Em 94 crianças italianas e francesas com dislexia, de 8 a 14 anos, somar 2,5 pt ao espaço entre letras (Times 14 pt) acelerou a leitura em cerca de 20% e reduziu os erros à metade; leitores típicos não ganharam velocidade (Zorzi et al. 2012).

**O que muda na página:** linhas curtas e corpo generoso para iniciantes; nunca apertar o espaçamento em texto corrido; espaçamento extra como ajuste para dislexia.

**Não se sabe:** o espaçamento ideal para cada fonte e idade — os estudos testam poucas fontes.

### 7.2 Como o leitor se desenvolve

**Resposta curta:** quem define os parâmetros é o estágio, não a idade — e o tamanho da letra continua importando até pelo menos os 9 anos. (B)

- Os nomes dos estágios seguem Nelly Novaes Coelho (*Literatura infantil: teoria, análise, didática*, 2000). As idades típicas usadas no site são proposta do Ergomino, alinhada às etapas escolares.
- Idade não garante estágio: em 2024, 59,2% das crianças estavam alfabetizadas ao fim do 2º ano (7.6).
- Em 120 crianças, a velocidade das de 5 a 7 anos caiu à medida que o texto diminuía; as de 8 a 11 não ganharam nem perderam velocidade. Em todas as idades, texto menor gerou mais erros, sobretudo em quem é suscetível a estresse visual (Hughes & Wilkins 2000).
- Aos 7–9 anos, frases com altura-x de 5,0 mm foram verificadas 9% mais rápido que com 4,2 mm. Manter a altura-x em 3,3 mm, em vez de reduzi-la ao longo do teste, elevou em 4 meses a idade de leitura medida. Verdana foi lida mais rápido que Sassoon Primary, fonte desenhada para crianças (Wilkins et al. 2009).
- Crianças de 6 anos leram Gill Sans (sem serifa) e Century (serifada) igualmente bem; "a" e "g" infantis não fizeram diferença (Walker & Reynolds 2003). Num teste de espaçamento, 17 de 24 crianças apontaram as letras muito apertadas como o mais difícil (Walker 2005).

**O que muda na página:** escolher parâmetros pelo estágio; reduzir o corpo devagar entre fases; escolher a fonte por clareza — ascendentes e descendentes generosas, caracteres bem distintos —, não por serifa ou "cara de infantil".

**Não se sabe:** valores ideais por idade em português. Nesta busca não apareceu estudo brasileiro equivalente — uma frente para parcerias com universidades.

### 7.3 Atenção e recompensa

**Resposta curta:** a dopamina move o "querer", não o "gostar"; o uso intenso de vídeo curto anda junto com pior atenção, mas a causa ainda não foi demonstrada. (A para a associação; D para a causa)

- **Querer × gostar.** O "querer" (saliência de incentivo) é gerado por sistemas amplos que incluem a dopamina mesolímbica; o "gostar" — o prazer em si — depende de sistemas menores e não depende de dopamina (Berridge & Robinson 2016). É o que o PDF intuía ao chamar a dopamina de "molécula da antecipação".
- **O ciclo de 4 etapas** (gatilho → desejo → ação → recompensa) entra como modelo didático de hábito, não como descrição de circuito.
- **Vídeo curto.** Meta-análise de 71 estudos (98.299 participantes) associou uso mais intenso a pior atenção (r = −0,38) e pior controle inibitório (r = −0,41). Com saúde mental, a associação foi mais fraca (r = −0,21), maior para estresse (−0,34) e ansiedade (−0,33). O padrão se repetiu em jovens e adultos e entre plataformas; como a maioria dos estudos é transversal, mostra associação, não causa (Nguyen et al. 2025).
- **Receptores de dopamina.** A redução por excesso de estímulo é documentada na dependência de substâncias; para vídeo curto na infância, segue como hipótese (D).
- **"Vício".** A CID-11 reconhece o transtorno de jogo (games): perda de controle, prioridade crescente e continuidade apesar de prejuízos, em geral por 12 meses. Redes sociais não aparecem como diagnóstico (OMS).
- **Peixinho-dourado.** O "8 segundos de atenção" veio de um relatório da Microsoft Canadá (2015) que citava uma fonte sem registros verificáveis. Pesquisadores lembram que a atenção depende da tarefa e que suas medidas são estáveis há décadas (BBC, 2017).
- **Brasil.** Entre as dificuldades de leitura, "falta de paciência" subiu de 11% para 25% entre 2007 e 2024, e "falta de concentração" de 7% para 14% (Retratos da Leitura 2024).

**O que muda na página:** não competir com o feed no terreno do feed, com mais estímulo; reduzir a competição visual na página; oferecer recompensas próprias da leitura — unidades curtas, ganchos, progresso visível (C/D, a testar).

**Não se sabe:** se o design editorial muda a persistência de leitura de crianças com alto uso de vídeo curto.

### 7.4 Papel × tela

**Resposta curta:** para compreender, sobretudo textos informativos, o papel ainda rende mais; no digital infantil, recursos só ajudam quando servem à história. (A)

- 54 estudos e 171.055 participantes (2000–2017): compreensão melhor no papel (g = −0,21). A vantagem cresce com tempo limitado e em textos informativos, some em textos só narrativos e aumentou ao longo dos anos (Delgado et al. 2018).
- 39 estudos e 1.812 crianças de 1 a 8 anos: o livro digital que só digitaliza o impresso teve compreensão menor; com recursos congruentes com a história, superou o papel. A mediação do adulto no impresso rendeu mais que os recursos digitais na leitura autônoma. Dicionário embutido não ajudou a compreensão, mas ajudou o vocabulário (Furenes et al. 2021).
- 469.564 participantes (2000–2022): a leitura digital por lazer tem relação pequena com compreensão (r = 0,055) — negativa no ensino fundamental, positiva no médio e no superior; a leitura impressa por lazer mostra efeitos médios (Altamura et al. 2023).

**O que muda na página:** em informativos e didáticos, oferecer versão impressa para estudo; no digital, cortar animações e extras que não servem ao conteúdo; nos primeiros anos, projetar para a leitura mediada.

**Não se sabe:** como esses efeitos se comportam em leitores brasileiros e em leitores de tinta eletrônica.

### 7.5 Saúde visual

**Resposta curta:** o risco visual mais bem documentado do excesso de telas é a miopia; a "luz azul" não tem evidência de dano. (B)

- 45 estudos, 335.524 participantes, idade média de 9,3 anos: cada hora diária a mais de tela associou-se a chance 21% maior de miopia (OR 1,21), com subida mais forte entre 1 e 4 horas por dia. Os autores classificam a certeza da evidência como baixa (Ha et al. 2025).
- Livro também é trabalho visual de perto: pausas e boa iluminação valem para o papel. O site não deve vender o impresso como "inofensivo".
- Não há evidência científica de que a luz azul das telas danifique os olhos, e a Academia Americana de Oftalmologia não recomenda óculos especiais para computador (AAO). Na revisão Cochrane (17 ensaios, 619 participantes), lentes com filtro azul podem não reduzir a fadiga visual no curto prazo (certeza baixa); o efeito no sono é incerto e não há dados sobre a mácula (Singh et al. 2023).
- **SBP (Manual #MenosTelas #MaisSaúde):** evitar telas antes dos 2 anos; de 2 a 5, até 1 h/dia; de 6 a 10, 1 a 2 h/dia; de 11 a 18, 2 a 3 h/dia, sempre com supervisão. Para todas as idades, sem telas nas refeições e desconexão 1 a 2 h antes de dormir.
- **Guia federal *Crianças, Adolescentes e Telas* (março de 2025):** sem telas antes dos 2 anos, exceto videochamadas com a família; sem smartphone próprio antes dos 12; de 12 a 17, uso supervisionado; redes sociais conforme a classificação indicativa.

**O que muda na página:** saúde visual entra como contexto e orientação a mediadores (pausas, luz, distância), não como argumento de venda do impresso.

**Não se sabe:** a relação entre parâmetros tipográficos (corpo, contraste) e fadiga visual em crianças — há pouca pesquisa.

### 7.6 Contexto brasileiro (página Por que importa)

| Indicador | Dado | Fonte |
| --- | --- | --- |
| Não leitores (nenhum livro, inteiro ou em parte, nos últimos 3 meses) | 53% em 2024 — primeira vez maioria desde 2007 | Retratos da Leitura, 6ª ed. |
| Leitores no país | 100,1 milhões (2019) → 93,4 milhões (2024) | Retratos da Leitura |
| Livros lidos por pessoa | 4,95 (2019) → 3,96 (2024) | Retratos da Leitura |
| Leitores entre estudantes do 1º ao 5º ano | 49% (2019) → 40% (2024) | Retratos da Leitura |
| Leitores entre estudantes do 6º ao 9º ano | 54% (2019) → 49% (2024) | Retratos da Leitura |
| Crianças de 5 a 10 anos que leem todo dia por interesse próprio | 16% (2024) | Retratos da Leitura |
| Uso do tempo livre para navegar na internet | 78% (2024) | Retratos da Leitura |
| Crianças alfabetizadas ao fim do 2º ano | 56% (2023) → 59,2% (2024); meta de 80% em 2030 | Indicador Criança Alfabetizada (MEC/Inep) |
| Usuários de internet de 9 a 17 anos | 92% (2025) | TIC Kids Online Brasil 2025 |
| Primeiro acesso à internet até os 6 anos | 9% (2012) → 28% (2025) | TIC Kids Online, via Viva |
| Uso de IA generativa, 9 a 17 anos | 65% (2025) | TIC Kids Online Brasil 2025 |
| Acesso à internet na escola | 51% (2024) → 37% (2025) | TIC Kids Online Brasil 2025 |

- **Lei 15.100/2025** (13/01/2025): restringe aparelhos eletrônicos portáteis de estudantes em escolas públicas e privadas da educação básica durante todo o período escolar, recreio incluído. Exceções: uso pedagógico orientado pelo professor, acessibilidade e inclusão, saúde e garantia de direitos fundamentais.
- **PNLD:** só participam obras fornecidas também em formato acessível, e a versão digital acessível é entregue em HTML5. Os critérios visuais da obra impressa ficam no Anexo 02 do edital Anos Iniciais 2027–2030 (versão consolidada publicada em 04/09/2026).

Leitura nossa, para a página: com o celular fora da sala de aula, o material impresso ganha peso no tempo de leitura escolar — e o projeto gráfico, com ele.

## 8. Conteúdo organizado — diretrizes de editoração

As diretrizes abaixo completam o manual do PDF e alimentam o Guia, as Fases do leitor e a ficha da ferramenta. A tabela 8.1 é a linha-base; as seções seguintes trazem as regras por tema, cada uma com selo.

### 8.1 Tabela-base por estágio (impresso, texto corrido)

A altura-x em milímetros é a medida principal, porque o mesmo corpo em pontos rende letras de tamanhos diferentes em cada fonte. As equivalências usam uma serifada de livro com altura-x de 0,45 do corpo e uma sem serifa de olho grande com 0,52.

| Parâmetro | Pré-leitor (0–5) | Iniciante (6–7) | Em processo (8–10) | Fluente (11–14) | Crítico (15–17) |
| --- | --- | --- | --- | --- | --- |
| Altura-x | ≥ 3,5 mm | 3,5–4,5 mm | 3,0–3,5 mm | 2,2–2,8 mm | 1,8–2,2 mm |
| ≈ corpo, serifada (0,45) | ≥ 22 pt | 22–28 pt | 19–22 pt | 14–17,5 pt | 11,5–14 pt |
| ≈ corpo, sem serifa (0,52) | ≥ 19 pt | 19–24,5 pt | 16,5–19 pt | 12–15 pt | 10–12 pt |
| Entrelinha (× corpo) | 1,3–1,5 | 1,4–1,6 | 1,4–1,6 | 1,35–1,5 | 1,3–1,45 |
| Medida (caracteres por linha) | Curta e livre, integrada à imagem | Até \~35, ou uma unidade de sentido por linha | 35–50 | 45–60 | 50–70 |
| Alinhamento | Bandeira à esquerda | Bandeira à esquerda | Bandeira à esquerda | Bandeira; justificado só com boa composição | Justificado aceitável |
| Hifenização | Nenhuma | Nenhuma | Nenhuma | Mínima | Controlada (máx. 2 linhas seguidas) |
| Quebra de linha | Por sentido | Por unidade de sentido; frase não atravessa página | Sem partir sintagmas curtos | Sem viúvas e órfãs | Sem viúvas e órfãs |
| Texto por página | Poucas palavras | Poucas linhas, com imagem | Blocos curtos, com respiro | Página cheia, margens generosas | Página convencional |

Selo: B para a altura-x dos 5 aos 9 anos (Hughes & Wilkins 2000; Wilkins et al. 2009) e para a quebra por sentido (LeVasseur et al. 2006). C para os demais valores: são calibração editorial e devem ser conferidos medindo livros de referência (seção 11). Conversão usada na calculadora, com r = altura-x ÷ corpo da fonte escolhida:

```latex
\text{corpo (pt)} \approx \frac{\text{altura-x (mm)}}{0{,}3528 \times r}
```

### 8.2 Tipografia

Regras de ouro: escolha a fonte por clareza, não por "cara de infantil"; meça a altura-x, não o corpo; reduza o corpo devagar entre as fases.

- **Desenho da fonte de texto:** altura-x generosa, aberturas abertas (c, e, a, s), ascendentes e descendentes generosas, distinção clara entre I/l/1, O/0, rn/m e b/d/p/q, contraste moderado, nenhum caractere excêntrico (Walker 2005). C
- **Serifa ou sem serifa:** as duas servem; decida pelo desenho, não pela categoria (Walker & Reynolds 2003). B
- **"a" e "g" de um andar:** opcionais; use se combinarem com a escrita ensinada, sem tratá-los como requisito. B
- **Fontes desenhadas para crianças não são garantia:** Verdana foi lida mais rápido que Sassoon Primary (Wilkins et al. 2009). B
- **Nada de "fonte para dislexia":** OpenDyslexic e Dyslexie não melhoraram velocidade nem precisão (Wery & Diliberto 2017; Kuster et al. 2018). B
- **Fora do texto corrido:** didonas, condensadas, pesos light e thin, scripts e decorativas. Ficam para títulos. C
- **Ênfase:** negrito; evitar itálico longo, sublinhado e caixa-alta contínua (guia de estilo para dislexia da BDA). C
- **Letra bastão (caixa-alta) na alfabetização:** é prática comum nas escolas brasileiras e cabe nos livros dessa etapa. A transição para caixa-alta e baixa deve ser planejada — não há estudo verificado sobre o melhor momento. D
- **Famílias:** no máximo duas (texto e títulos); hierarquia por tamanho e peso, não por troca de fonte. C
- **Fontes abertas úteis para a prévia da ferramenta:** Andika (desenhada para alfabetização), Atkinson Hyperlegible (para baixa visão), Literata (para leitura em tela).

Classificação do PDF, revisada:

| Classe | Exemplos | Uso em livro infantojuvenil |
| --- | --- | --- |
| Humanista e garalda (old style) | Bembo, Garamond, Minion, Palatino | Texto corrido de fluentes e críticos; checar a altura-x, em geral pequena |
| Transicional | Baskerville, Times New Roman | Texto corrido de fluentes e críticos; testar em corpo pequeno |
| Didona | Bodoni, Didot | Apenas títulos: os traços finos somem em corpo de texto |
| Mecânica (slab) | Rockwell, Clarendon, Roboto Slab | Títulos e textos curtos; observar o peso em blocos longos |
| Sem serifa humanista | Gill Sans, Frutiger, Myriad, Verdana | Iniciantes, informativos, legendas; boa diferenciação de caracteres |
| Sem serifa geométrica | Futura, Century Gothic, Poppins | Títulos; em texto para iniciantes, cuidado com b/d/p/q espelhados |
| Sem serifa neogrotesca | Helvetica, Arial | Aceitáveis; aberturas fechadas e I/l/1 parecidos pedem atenção |

### 8.3 Espaçamento e medida

Regras de ouro: nunca aperte; entrelinha generosa; linhas curtas para quem começa, quebradas por sentido.

- **Espaço entre letras e palavras** no padrão da fonte ou levemente aberto; nunca tracking negativo em texto corrido (Walker 2005). C
- **Quebra por sentido** para iniciantes e em processo: com o fim da linha coincidindo com o fim da oração, crianças de 7 a 9 anos leram com fraseado melhor e menos recomeços no início da linha; a velocidade não mudou (LeVasseur et al. 2006). B
- **Medida:** a referência adulta é de 45 a 75 caracteres, com 66 como ideal (Bringhurst). Guias para dislexia pedem 60 a 70 e evitar colunas estreitas. C
- **Bandeira à esquerda** até o estágio em processo e sempre em edições para dislexia; justificado só com hifenização e espaçamento calibrados, sem rios. C
- **Parágrafos:** espaço entre parágrafos ou recuo, não os dois; para iniciantes, linha em branco entre blocos. C
- **Dislexia:** espaço extra entre letras, com aumento proporcional entre palavras e linhas (Zorzi et al. 2012), sem chegar a desmontar a palavra; testar com leitores. B para o efeito; C para os valores.
- **Digital:** o layout precisa aguentar os espaçamentos da WCAG 1.4.12 sem perder conteúdo — entrelinha 1,5×, parágrafo 2×, letras 0,12× e palavras 0,16× o corpo. Norma

### 8.4 Página e grid

Regras de ouro: margens generosas, sobretudo a interna; hierarquia previsível; uma coisa de cada vez na área de leitura.

- **Margem interna:** maior em livros grossos e de lombada colada; conferir na prova encadernada, aberta como a criança abre. C
- **Previsibilidade para iniciantes:** poucas linhas por página, texto sempre na mesma região. C
- **Virada de página:** no estágio iniciante, a frase não atravessa a página. C
- **Navegação:** sumário, títulos de capítulo e numeração grandes e visíveis — a criança se orienta por eles. C
- **Dobra:** nada de texto sobre a dobra em ilustrados de página dupla. C
- **Acabamento da mancha:** sem viúvas, órfãs e rios. C

### 8.5 Ritmo, estrutura e engajamento

Para leitores formados em recompensas rápidas, o caminho que a evidência sustenta é baratear cada página e tornar o avanço visível — não aumentar o estímulo. Esta é a resposta do site à premissa das telas.

- **Menos competição, não mais estímulo:** nada que dispute o olhar com o texto na área de leitura (Eng, Godwin & Fisher 2020; Sundararajan & Adesope 2020). A/B
- **Unidades curtas com fecho:** capítulos e cenas curtos, cada um com desfecho e gancho. A Barrington Stoke, editora especializada desde 1998, combina muitas quebras de capítulo, papel creme, fonte adaptada e edição de linguagem para legibilidade. C
- **Progresso visível:** números de capítulo destacados, sumário ilustrado, mapa da história. D, a testar
- **Títulos que prometem algo**, em vez de só "Capítulo 3". C
- **Respiro:** ilustração de página inteira entre blocos densos. C
- **Formatos híbridos para relutantes:** HQ, diário, listas, cartas, texto com quadrinho. C
- **Alto interesse, baixa dificuldade (hi-lo):** tema e maturidade da idade do leitor, texto no estágio anterior. C
- **Evitar:** cores saturadas atrás do texto, fontes decorativas no corpo, layout que muda a cada página sem motivo. C

As estratégias com selo D só viram regra depois de testadas (8.9).

### 8.6 Imagem e cor

Regras de ouro: imagem relevante, perto do texto que apoia; área de texto limpa na leitura autônoma; cor nunca como único código.

- **Leitura autônoma de iniciantes:** tirar da página de leitura os detalhes extrínsecos. Com ilustrações enxutas, a compreensão de crianças do 1º e 2º ano foi de cerca de 47% para 80%, e o olhar saiu menos do texto; os autores não defendem tirar todas as ilustrações (Eng, Godwin & Fisher 2020). B
- **Leitura mediada:** para o pré-leitor, a ilustração rica pode alimentar a conversa com o adulto; o texto continua legível para quem lê em voz alta. C
- **Informativos:** imagem explicativa ao lado do trecho que explica, rótulos diretos e nada de detalhes sedutores. Numa meta-análise de 58 estudos (mais de 7.500 estudantes), esses detalhes prejudicaram a aprendizagem, sobretudo junto de diagramas relevantes e no papel (Sundararajan & Adesope 2020). A
- **Texto sobre imagem:** evitar; se inevitável, sobre área lisa de alto contraste. C
- **Contraste:** texto escuro sobre fundo claro e sem textura. Em tela, a referência é a WCAG: 4,5:1 (nível AA) e 7:1 (AAA). Norma
- **Fundo:** off-white ou creme no texto longo, como recomendam guias para dislexia. C
- **Daltonismo:** cerca de 8% dos homens e 0,4% das mulheres de ascendência europeia têm deficiência vermelho-verde, e entre 4% e 6,5% dos homens de origem chinesa e japonesa (Birch 2012). Nunca usar só cor para codificar; somar rótulo, padrão ou forma; testar com simulador. A para a prevalência; C para a prática
- **Código de cor consistente:** a mesma cor para a mesma função no livro inteiro (ex.: boxes de atividade). C

### 8.7 Materialidade

- **Papel fosco** no texto corrido, para evitar reflexo. C
- **Papel creme ou off-white** no texto longo. C
- **Opacidade:** sem transparência do verso — escolher gramatura e opacidade com prova física. C
- **Encadernação:** livros de atividade e de mesa abrem planos (costura, wire-o); cartonados para 0–3 anos com páginas resistentes e cantos arredondados. C
- **Formato e peso:** na leitura autônoma de 6 a 10 anos, o livro precisa caber nas mãos e não pesar. C
- **Acabamentos:** verniz e laminação brilhante longe da área de texto. C

### 8.8 Modificadores de acesso e suporte

| Necessidade ou suporte | O que muda | Selo | Base |
| --- | --- | --- | --- |
| Dislexia | Entrelinha ≥ 1,5; espaço entre letras levemente aberto; bandeira; sem hifenização; negrito para ênfase; sem itálico, sublinhado ou caixa-alta contínua; medida ≤ 60–70; papel creme fosco; frases e parágrafos curtos; nenhuma "fonte para dislexia"; lâminas coloridas não recomendadas | A (lâminas) / B (espaçamento, fontes) / C | Zorzi et al. 2012; Kuster et al. 2018; Wery & Diliberto 2017; Griffiths et al. 2016; guia BDA |
| Baixa visão | Edição em letra grande (16 pt ou mais) ou gigante (18 pt ou mais); fonte clara; contraste máximo; sem texto sobre imagem; papel fosco | C | RNIB |
| Daltonismo | Cor nunca como único código; evitar pares vermelho/verde; rótulos e padrões | A / C | Birch 2012 |
| TDAH | Menos distratores por página; seções curtas com títulos; progresso visível | D | A testar |
| TEA | Layout previsível; evitar sobrecarga de cor e padrões; paratextos literais | D | A testar |
| Português como 2ª língua (inclui surdos usuários de Libras) | Frases curtas; glossário; imagens que ancoram o sentido; sem ambiguidades | C | Prática de linguagem simples |
| E-book refluível (EPUB) | Leitor ajusta fonte, corpo, entrelinha e fundo; layout aguenta a WCAG 1.4.12; títulos semânticos; descrição de imagens; sem animação automática | Norma / C | WCAG 2.2 |
| PDF em tela | Evitar página dupla; corpo pensado para celular; preferir EPUB para texto corrido | C | — |
| Didático no PNLD | Formato acessível obrigatório; versão digital acessível em HTML5; critérios visuais no Anexo 02 | Norma | Edital PNLD Anos Iniciais 2027–2030 |

### 8.9 Protocolo de teste com leitores

Proposta de protocolo, a validar com especialistas em leitura. Nenhuma faixa substitui ver crianças lendo a página.

1. **Leitores:** 5 a 8 por perfil (idade e estágio), com autorização dos responsáveis e assentimento da criança; nenhum dado identificável. Se o resultado for publicado como pesquisa, o projeto passa por comitê de ética (Plataforma Brasil).
2. **Material:** duas versões da mesma página (A e B), impressas no papel final ou em prova fiel.
3. **Leitura em voz alta** de um trecho por versão, em ordem alternada: tempo, palavras corretas por minuto, erros e recomeços no início da linha.
4. **Compreensão:** reconto livre e duas perguntas específicas por trecho.
5. **Conforto e preferência:** "qual foi mais fácil?", com escala de carinhas.
6. **Observação:** anotar quando o olhar sai do texto para a ilustração.
7. **Decisão:** vence a versão com menos erros e melhor compreensão; a preferência desempata.

### 8.10 Checklist de prova de legibilidade

- Altura-x medida na prova, dentro da faixa do estágio.
- Entrelinha e medida dentro da faixa.
- Sem hifenização nos estágios iniciante e em processo.
- Quebras de linha por unidade de sentido nesses estágios.
- Nenhum texto sobre imagem sem área lisa.
- Contraste alto, papel fosco.
- Nenhuma informação codificada só por cor.
- Margem interna conferida na prova encadernada.
- Sem viúvas, órfãs e rios.
- Ênfase em negrito, sem itálico longo.
- Teste com leitores feito (8.9).

## 9. Sistema de evidências, linguagem e governança

O selo de evidência é o que separa o Ergomino de um blog de dicas: toda recomendação diz quão firme é, e o site distingue o que se sabe do que se supõe.

### Selos

| Selo | Significa | Exemplo no site |
| --- | --- | --- |
| A — forte | Meta-análise, revisão sistemática ou vários estudos independentes convergentes | Papel rende mais compreensão que tela em textos informativos (Delgado et al. 2018) |
| B — moderada | Estudo experimental isolado, amostra pequena ou faixa etária restrita | Manter o corpo grande até os 9 anos (Hughes & Wilkins 2000; Wilkins et al. 2009) |
| C — prática consolidada | Guia institucional ou consenso profissional, sem teste experimental direto | Bandeira à esquerda em edições para dislexia (guia BDA) |
| D — hipótese | Plausível, mas não testada ou só com dados correlacionais | Marcadores de progresso aumentam a persistência de leitores relutantes |
| Mito | Contradito pela evidência disponível | "Fontes para dislexia melhoram a leitura" |
| Norma | Exigência técnica ou legal | Espaçamentos da WCAG 1.4.12; formato acessível no PNLD |
| Dado | Estatística de pesquisa ou registro oficial, com fonte e ano | 59,2% de crianças alfabetizadas ao fim do 2º ano (2024) |

Regras de uso:

- **O selo vale para a afirmação, não para o estudo.** Uma meta-análise de dados transversais sustenta "associação" com A e "causa" com D (vídeo curto e atenção).
- **Certeza baixa desce um nível:** meta-análise que os próprios autores classificam como de certeza baixa recebe B (miopia e telas).
- **Todo selo tem link** para as fontes e data de revisão.
- **Quando a evidência muda, o selo muda** — e o histórico registra.

### Tom de voz

Técnico e acessível, direto, sem alarmismo, sem culpar a criança ou a família, humilde sobre o que não se sabe.

| Evitar | Usar |
| --- | --- |
| "Crianças viciadas em dopamina" | "Leitores formados num ambiente de recompensas rápidas" |
| "O celular frita o cérebro" | "O uso intenso de vídeo curto está associado a pior atenção; a causa ainda não foi demonstrada" |
| "Dopamina barata" | "Recompensas imediatas e frequentes" |
| "Geração perdida" | "Leitores que precisam de outras portas de entrada" |
| "A fonte ideal para crianças" | "Uma fonte de desenho claro para este estágio" |
| "Comprovado cientificamente" | "Evidência forte (A)" ou "estudo único (B)" |

Na escrita: frases curtas; termo técnico explicado na primeira ocorrência e ligado ao glossário; número sempre com fonte e ano; toda página termina numa ação ("o que muda na página").

### Governança

- **Curadoria:** equipe editorial mais um conselho consultivo voluntário — oftalmologia ou optometria, psicologia cognitiva, fonoaudiologia ou psicopedagogia, tipografia e design editorial, alfabetização.
- **Revisão:** dados a cada nova edição das pesquisas (Retratos da Leitura, TIC Kids Online, Criança Alfabetizada); diretrizes a cada estudo relevante; data visível em todas as páginas.
- **Histórico público:** cada mudança de diretriz ou de regra da ferramenta ganha número de versão e nota explicando o que mudou e por quê.
- **Correções:** formulário "sugerir correção", com prazo de resposta definido e crédito a quem corrigiu, se quiser.
- **Conflito de interesse:** sem patrocínio de fundições, fabricantes de lentes ou editoras citadas; exemplos de livros escolhidos por critério editorial e com autorização.
- **Licença:** sugestão de Creative Commons (CC BY 4.0) para textos e checklists, para que escolas e editoras reutilizem com crédito.

## 10. Referências

Fontes consultadas para esta versão. Onde o artigo original não abriu, o link indica a página de resumo efetivamente lida.

### Documento-base

- *Informações — Assistência visual de ergonomia* (PDF da equipe: Bono, João V e Vini).
- [A liberação do neurotransmissor dopamina causada pelo uso de redes sociais](https://revistaft.com.br/a-liberacao-do-neurotransmissor-dopamina-causada-pelo-uso-de-redes-sociais/) — Revista FT, citado no PDF; não reavaliado nesta versão.

### Leitura, tipografia e página

- Hughes, L. & Wilkins, A. (2000). [Typography in children's reading schemes may be suboptimal](https://doi.org/10.1111/1467-9817.00126): evidence from measures of reading rate. *Journal of Research in Reading*, 23(3), 314–324.
- Wilkins, A., Cleave, R., Grayson, N. & Wilson, L. (2009). [Typography for children may be inappropriately designed](https://repository.essex.ac.uk/1476/). *Journal of Research in Reading*, 32(4), 402–412.
- Walker, S. & Reynolds, L. (2003). [Serifs, sans serifs and infant characters in children's reading books](https://doi.org/10.1075/idj.11.2.04wal). *Information Design Journal*, 11(2/3), 106–122.
- Walker, S. (2005). [Typography in children's books](https://booksforkeeps.co.uk/article/typography-in-childrens-books/). *Books for Keeps*, 154.
- Eng, C. M., Godwin, K. E. & Fisher, A. V. (2020). [Keep it simple: streamlining book illustrations improves attention and comprehension in beginning readers](https://pmc.ncbi.nlm.nih.gov/articles/PMC7522290/). *npj Science of Learning*, 5, 14.
- Zorzi, M. et al. (2012). [Extra-large letter spacing improves reading in dyslexia](https://doi.org/10.1073/pnas.1205566109). *PNAS* — resumo lido em [ScienceDaily](https://www.sciencedaily.com/releases/2012/06/120607105712.htm).
- LeVasseur, V. M., Macaruso, P., Palumbo, L. C. & Shankweiler, D. (2006). [Syntactically cued text facilitates oral reading fluency in developing readers](https://doi.org/10.1017/S0142716406060346). *Applied Psycholinguistics*, 27(3), 423–445.
- Rayner, K. (1986). [Eye movements and the perceptual span in beginning and skilled readers](<https://doi.org/10.1016/0022-0965(86)90037-8>). *Journal of Experimental Child Psychology*, 41(2), 211–236.
- Kuster, S. M. et al. (2018). [Dyslexie font does not benefit reading in children with or without dyslexia](https://pmc.ncbi.nlm.nih.gov/articles/PMC5934461/). *Annals of Dyslexia*, 68(1), 25–42.
- Wery, J. & Diliberto, J. A. (2017; online em 2016). [The effect of a specialized dyslexia font, OpenDyslexic, on reading rate and accuracy](https://doi.org/10.1007/s11881-016-0127-1). *Annals of Dyslexia*.
- Griffiths, P. G. et al. (2016). [The effect of coloured overlays and lenses on reading: a systematic review of the literature](https://doi.org/10.1111/opo.12316). *Ophthalmic and Physiological Optics*, 36(5), 519–544.
- Sundararajan, N. & Adesope, O. (2020). [Keep it coherent: a meta-analysis of the seductive details effect](https://doi.org/10.1007/s10648-020-09522-4). *Educational Psychology Review*, 32(3), 707–734.
- Birch, J. (2012). [Worldwide prevalence of red-green color deficiency](https://doi.org/10.1364/JOSAA.29.000313). *JOSA A*, 29(3), 313–320.
- Bringhurst, R. *The Elements of Typographic Style* (livro).
- Coelho, N. N. (2000). *Literatura infantil: teoria, análise, didática*. 7. ed. São Paulo: Moderna — categorias lidas em [artigo do ENLIJE 2016](https://editorarealize.com.br/editora/anais/enlije/2016/TRABALHO_EV063_MD1_SA8_ID288_20062016210928.pdf).

### Atenção, telas e saúde visual

- Berridge, K. C. & Robinson, T. E. (2016). [Liking, wanting, and the incentive-sensitization theory of addiction](https://doi.org/10.1037/amp0000059). *American Psychologist*, 71(8), 670–679.
- Nguyen, L. et al. (2025). [Feeds, feelings, and focus: a systematic review and meta-analysis examining the cognitive and mental health correlates of short-form video use](https://ifp.nyu.edu/2025/journal-article-abstracts/bul0000498/). *Psychological Bulletin*, 151(9), 1125–1146.
- Delgado, P., Vargas, C., Ackerman, R. & Salmerón, L. (2018). [Don't throw away your printed books](https://www.uv.es/lasalgon/papers/Delgado%202018%20dont%20throw%20away%20your%20printed%20books.pdf): a meta-analysis on the effects of reading media on reading comprehension. *Educational Research Review*.
- Furenes, M. I., Kucirkova, N. & Bus, A. G. (2021). [A comparison of children's reading on paper versus screen: a meta-analysis](https://oro.open.ac.uk/75652). *Review of Educational Research*, 91(4), 483–517.
- Altamura, L., Vargas, C. & Salmerón, L. (2023). [Do new forms of reading pay off?](https://www.aera.net/Newsroom/Do-New-Forms-of-Reading-Pay-Off-A-Meta-Analysis-on-the-Relationship-Between-Leisure-Digital-Reading-Habits-and-Text-Comprehension) A meta-analysis on the relationship between leisure digital reading habits and text comprehension *Review of Educational Research*.
- Ha, A. et al. (2025). [Meta-análise dose-resposta sobre tempo de tela e miopia](https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2830598). *JAMA Network Open* — resumo lido em [Ophthalmology Management](https://ophthalmologymanagement.com/news/2025/digital-screen-time-increases-risk-for-myopia/).
- Singh, S. et al. (2023). [Blue-light filtering spectacle lenses for visual performance, sleep, and macular health in adults](https://pmc.ncbi.nlm.nih.gov/articles/PMC10436683/). *Cochrane Database of Systematic Reviews*, CD013244.
- [American Academy of Ophthalmology — Should you be worried about blue light?](https://www.aao.org/eye-health/tips-prevention/should-you-be-worried-about-blue-light) (2021).
- [OMS — Gaming disorder (CID-11)](https://www.who.int/standards/classifications/frequently-asked-questions/gaming-disorder).
- Maybin, S. (2017). Busting the attention span myth. BBC — [reproduzido pela Universidade de Wisconsin](https://internet.psych.wisc.edu/wp-content/uploads/532-Master/532-UnitPages/Unit-09/Goldfish_MythBusting.pdf).

### Normas e guias

- [W3C — WCAG 2.2, Understanding SC 1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html).
- [Dyslexia Style Guide](https://www.wigan.gov.uk/Docs/PDF/Business/Professionals/SEN/HEFA/Dyslexia-Style-Guide.pdf) — versão derivada do guia da British Dyslexia Association.
- [RNIB — tamanhos de letra para impressos ampliados](https://help.rnib.org.uk/help/daily-living/large-print-size).
- [Barrington Stoke](https://en.wikipedia.org/wiki/Barrington_Stoke) (Wikipedia).

### Brasil

- Instituto Pró-Livro (2024). *Retratos da Leitura no Brasil*, 6ª ed. — dados lidos em [Companhia das Letras](https://blog.companhiadasletras.com.br/nao-leitores-sao-maioria-no-brasil-pela-primeira-vez/) e [Na Prática](https://napratica.org.br/noticias/por-que-os-brasileiros-pararam-de-ler-como-voltar).
- MEC/Inep — Indicador Criança Alfabetizada 2024, lido em [O POVO](https://mais.opovo.com.br/jornal/farol/2025/07/12/ceara-tem-a-maior-taxa-do-brasil-de-criancas-alfabetizadas-em-2024.html).
- Cetic.br (2025). [TIC Kids Online Brasil 2025 — principais resultados](https://www.cetic.br/media/analises/tic_kids_online_brasil_2025_principais_resultados.pdf); primeiro acesso até os 6 anos lido em [Viva](https://viva.com.br/tecnologia/primeiro-acesso-a-internet-por-criancas-de-ate-6-anos-triplicou-em-13-anos.html).
- [Sociedade Brasileira de Pediatria — Manual #MenosTelas #MaisSaúde](https://www.sbp.com.br/sbp-atualiza-recomendacoes-sobre-saude-de-criancas-e-adolescentes-na-era-digital/).
- Secom (2025). *Crianças, Adolescentes e Telas: guia sobre usos de dispositivos digitais* — lido em [CNN Brasil](https://www.cnnbrasil.com.br/educacao/governo-lanca-guia-sobre-uso-de-telas-por-criancas-e-adolescentes-confira/).
- [Lei 15.100/2025 — Agência Senado](https://www12.senado.leg.br/noticias/materias/2025/01/14/sancionada-lei-que-restringe-uso-de-celular-em-escolas-de-todo-o-pais).
- [FNDE — Edital PNLD Anos Iniciais 2027–2030, versão consolidada](https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/programas-do-livro/consultas-editais/editais/EditalConsolidado6RetificacaodoPNLDANOSINICIAIS2027.2030.pdf).

## 11. Próximos passos e decisões em aberto

Sugestão: lançar primeiro um MVP com a ferramenta, quatro temas do Guia e os Mitos. A ferramenta é o que diferencia o site e o que precisa ser validado antes de tudo.

| Fase | Escopo | Critério para avançar |
| --- | --- | --- |
| MVP | Início; Monte seu leitor (8 perguntas, ficha, PDF); Guia com Tipografia, Espaçamento e medida, Imagem e cor e Modificadores de acesso; Mitos (10 cartões); Referências | Cinco profissionais usam a ficha num projeto real e relatam ao menos uma decisão alterada |
| Fase 2 | Ciência da leitura; Fases do leitor; Por que importa; Recursos (checklists e calculadoras) | Visitas recorrentes e pedidos de conteúdo registrados |
| Fase 3 | Comparador de perfis; exemplos comentados com editoras parceiras; testes próprios com leitores | Parcerias firmadas com editoras ou universidade |

### Antes de desenhar as telas

- [ ] Calibrar a tabela 8.1 medindo altura-x, entrelinha e medida de 20 a 30 livros de referência por estágio (ex.: acervos do PNLD Literário e obras premiadas).
- [ ] Validar as proto-personas com 5 a 8 entrevistas (editores, diagramadores, ilustradores).
- [ ] Mapear os Anexos 02 e 03 do edital PNLD Anos Iniciais 2027–2030 e alinhar diretrizes e checklist.
- [ ] Submeter a seção Atenção e recompensa a um especialista em neurociência ou psicologia.
- [ ] Conferir nos relatórios originais os dados lidos em fontes secundárias: Retratos da Leitura, Indicador Criança Alfabetizada e primeiro acesso à internet.

### Decisões em aberto

- **Nome:** manter "Ergomino"? Checar domínio e registro de marca.
- **Faixas etárias:** adotar as escolares propostas ou manter as do PDF.
- **Números na ficha:** a proposta é mostrar faixas em mm e pt, sempre com selo e aviso.
- **Mediadores:** professores e famílias ganham menu próprio ou só blocos "para mediadores"?
- **Licença e base de regras:** confirmar a licença do conteúdo e onde as regras da ferramenta vão viver (planilha ou CMS).

Revisões deste blueprint sairão como v1.1, v1.2 e assim por diante, cada uma com nota de alteração.

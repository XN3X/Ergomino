/* Ergomino — motor de regras da ferramenta "Monte seu leitor" (regras v1.0)
 * Entrada: um perfil (respostas das 8 perguntas + restrições opcionais).
 * Saída: a ficha de editoração — alertas, blocos de linhas (parâmetro · valor · selo · por quê · link) e checklist.
 * Ordem de aplicação, como no blueprint (seção 6): linha-base do estágio → publicação e objetivo → modo de leitura →
 * engajamento → acesso (sempre na direção mais protetora) → suporte → restrições de produção (geram alertas, nunca sobrescrevem em silêncio).
 */
window.ERGO_REGRAS = (function () {
  'use strict';
  const D = window.ERGO;
  const PT_POR_MM = 1 / 0.3528; // 1 mm = 2,835 pt

  const nf1 = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 });
  const nf2 = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 });
  const fmt = (n, d) => (d === 2 ? nf2 : nf1).format(n);

  function mmParaPt(mm, razao) { return mm * PT_POR_MM / razao; }
  function arredondaMeio(pt) { return Math.round(pt * 2) / 2; }

  function faixa(f, unidade, decimais) {
    if (!f) return '';
    const u = unidade ? ' ' + unidade : '';
    if (f[0] != null && f[1] != null) return f[0] === f[1] ? fmt(f[0], decimais) + u : fmt(f[0], decimais) + '–' + fmt(f[1], decimais) + u;
    if (f[0] != null) return '≥ ' + fmt(f[0], decimais) + u;
    return '≤ ' + fmt(f[1], decimais) + u;
  }

  function faixaPt(xh, razao) {
    const conv = v => (v == null ? null : arredondaMeio(mmParaPt(v, razao)));
    return faixa([conv(xh[0]), conv(xh[1])], 'pt');
  }

  function dir(id) { return D.DIRETRIZES.find(d => d.id === id); }
  function estagioDe(id) { return D.ESTAGIOS.find(e => e.id === id); }
  function idadeDe(id) { return D.IDADES.find(i => i.id === id) || D.IDADES[2]; }

  // Fração da página reservada à imagem, por tipo de publicação. Usada só na estimativa de capacidade (restrições de produção).
  // TODO(human): defina as frações por tipo de publicação (0 = só texto, 1 = só imagem), por exemplo
  // { cartonado: 0.85, 'livro-imagem': 0.9, ilustrado: 0.6, primeira: 0.5, capitulos: 0.25, romance: 0.05, informativo: 0.45, didatico: 0.4, revista: 0.5 }.
  // Sem valor para um tipo, a estimativa usa PARTE_IMAGEM_PADRAO.
  const PARTE_IMAGEM = {
  };
  const PARTE_IMAGEM_PADRAO = 0.5;

  // Limite de linhas por página coerente com a densidade da tabela-base.
  const MAX_LINHAS = { pre: 3, ini: 6, proc: 14, flu: null, crit: null };

  function montarFicha(perfil) {
    const alertas = [];
    const idade = idadeDe(perfil.idade);
    let estagioId = perfil.estagio;
    if (!estagioId || estagioId === 'nao-sei') {
      estagioId = idade.estagio;
      alertas.push({ nivel: 'aviso', texto: `Você marcou "Não sei" no estágio. Usamos o típico da idade ${idade.rotulo}: ${estagioDe(estagioId).nome.toLowerCase()}. Se o leitor estiver em outro estágio, ajuste a pergunta 2 — o estágio pesa mais que a idade.` });
    } else if (estagioId !== idade.estagio) {
      alertas.push({ nivel: 'info', texto: `O estágio informado (${estagioDe(estagioId).nome.toLowerCase()}) é diferente do típico para ${idade.rotulo}. A ficha segue o estágio: é ele que define os parâmetros.` });
    }
    const estagio = estagioDe(estagioId);
    const base = D.BASE[estagioId];
    const acesso = (perfil.acesso || []).filter(a => a && a !== 'nenhuma');
    const tem = a => acesso.includes(a);
    const pub = perfil.publicacao || '';
    const sup = perfil.suporte || 'impresso';
    const modo = perfil.modo || 'sozinho';
    const eng = perfil.engajamento || 'ocasional';
    const obj = perfil.objetivo || 'narrativa';
    const rest = perfil.restricoes || {};

    const digital = sup === 'pdf' || sup === 'epub' || sup === 'hibrido';
    const impresso = sup === 'impresso' || sup === 'hibrido';
    const informativo = ['informativo', 'didatico', 'revista'].includes(pub) || obj === 'informar' || modo === 'sala';
    const atividade = obj === 'atividades' || pub === 'didatico';
    const textoLongo = ['capitulos', 'romance'].includes(pub) || estagioId === 'flu' || estagioId === 'crit';
    const inicial = estagioId === 'pre' || estagioId === 'ini';
    const relutante = eng === 'relutante';
    const nomeEst = estagio.nome.toLowerCase();

    // ---- estado numérico (começa na linha-base) ----
    const xh = base.xh.slice();
    const lead = base.lead.slice();
    const cpl = base.cpl ? base.cpl.slice() : null;
    let cplTexto = base.cplTexto;
    let alinh = base.alinh, hifen = base.hifen, quebra = base.quebra, densidade = base.densidade;
    let xhSelo = base.seloXh, leadSelo = 'C', alinhSelo = 'C', hifenSelo = 'C', quebraSelo = ['pre', 'ini', 'proc'].includes(estagioId) ? 'B' : 'C';
    const xhMotivos = [`Faixa do estágio ${nomeEst}.`];
    const leadMotivos = [`Faixa do estágio ${nomeEst}; nunca a entrelinha automática do programa.`];
    const cplMotivos = ['Linha curta reduz o esforço de retorno para quem decodifica; a referência adulta vai até 70.'];
    const alinhMotivos = ['A bandeira mantém o espaçamento entre palavras constante.'];
    const densMotivos = [`Densidade da faixa ${nomeEst}.`];
    let espacoLetras = 'Padrão da fonte ou levemente aberto; nunca tracking negativo.', espacoSelo = 'C', espacoLink = 'esp-nao-aperte', espacoMotivo = 'Letras próximas demais se atrapalham (aglomeração visual); 17 de 24 crianças apontaram letras apertadas como o mais difícil.';
    let enfase = 'Negrito. Itálico só em palavras isoladas; sem caixa-alta contínua.', enfaseMotivo = 'Itálico, sublinhado e caixa-alta contínua dificultam o reconhecimento das palavras.';
    let fundo = 'Texto escuro sobre fundo claro, sem textura.', fundoSelo = 'Norma', fundoLink = 'img-contraste', fundoMotivo = 'Em tela, contraste mínimo de 4,5:1 (AA); no papel, textura e cor de fundo reduzem o contraste real.';
    let papel = 'Fosco.', papelLink = 'mat-fosco', papelMotivo = 'O brilho reflete a luz e apaga parte das letras conforme o ângulo.';

    // ---- 2. publicação e objetivo ----
    if (pub === 'cartonado' || pub === 'livro-imagem') { densidade = 'Poucas palavras, integradas à imagem.'; densMotivos.push('A imagem carrega a narrativa.'); }
    // ---- 4. engajamento ----
    if (relutante) {
      if (xh[1] != null) { xh[0] = Math.round(((xh[0] + xh[1]) / 2) * 10) / 10; }
      xhMotivos.push('Leitor relutante: altura-x na metade superior da faixa, para baratear cada página.');
      densidade = densidade.replace(/\.$/, '') + '; para o leitor relutante, menos texto por página que o padrão da faixa.';
      densMotivos.push('Menos texto por página torna o avanço visível e cada página mais barata.');
    }
    // ---- 5. acesso (sempre na direção mais protetora) ----
    if (tem('dislexia')) {
      if (lead[0] < 1.5) { lead[0] = 1.5; if (lead[1] < 1.6) lead[1] = 1.6; }
      leadSelo = 'C'; leadMotivos.push('Dislexia: entrelinha mínima de 1,5 (guia BDA).');
      if (cpl && (cpl[1] == null || cpl[1] > 60)) cpl[1] = 60;
      if (cpl) { cplTexto = faixa(cpl, 'caracteres'); cplMotivos.push('Dislexia: medida até 60 caracteres, sem colunas estreitas.'); }
      alinh = 'Bandeira à esquerda'; alinhMotivos.push('Dislexia: sempre bandeira, sem rios.');
      hifen = 'Nenhuma';
      espacoLetras = 'Levemente aberto (ex.: +2,5 pt sobre o padrão em corpo 14), com espaço entre palavras e linhas aumentado na mesma proporção.'; espacoSelo = 'B'; espacoLink = 'esp-dislexia';
      espacoMotivo = 'Em 94 crianças com dislexia, o espaço extra acelerou a leitura em cerca de 20% e reduziu os erros à metade.';
      enfase = 'Negrito. Sem itálico, sublinhado ou caixa-alta contínua.';
      fundo = 'Off-white ou creme, fosco, sem textura.'; fundoSelo = 'C'; fundoLink = 'img-fundo'; fundoMotivo = 'Guias para dislexia recomendam fundo creme para reduzir o brilho.';
      papel = 'Creme ou off-white, fosco.'; papelLink = 'mat-creme'; papelMotivo = 'Reduz o brilho e o estresse visual em leituras longas.';
    }
    if (tem('baixa-visao')) {
      const minGrande = 2.6; // ≈ 16 pt numa serifada de livro (r = 0,45)
      if (xh[0] < minGrande) { xh[0] = minGrande; if (xh[1] != null && xh[1] < 3.0) xh[1] = 3.0; xhSelo = 'C'; }
      xhMotivos.push('Baixa visão: edição em letra grande (16 pt ou mais) ou gigante (18 pt ou mais), conforme o RNIB.');
      fundo = 'Contraste máximo: texto preto sobre fundo claro fosco, sem textura.'; fundoSelo = 'C'; fundoLink = 'ace-baixa-visao'; fundoMotivo = 'Baixa visão pede contraste máximo e nenhum texto sobre imagem.';
      papel = 'Fosco, de alta opacidade.'; papelLink = 'mat-fosco';
    }
    if (!tem('dislexia') && (textoLongo)) { fundo = 'Texto escuro sobre fundo off-white ou creme, sem textura.'; fundoSelo = 'C'; fundoLink = 'img-fundo'; fundoMotivo = 'No texto longo, o creme reduz o brilho; guias para dislexia recomendam o mesmo.'; papel = 'Creme ou off-white, fosco.'; papelLink = 'mat-creme'; papelMotivo = 'Reduz o brilho em leituras longas; escolha de editoras especializadas em leitores relutantes.'; }
    if (tem('baixa-visao')) { papel = 'Fosco, de alta opacidade.'; papelLink = 'mat-fosco'; }

    // ---- 6. suporte ----
    if (sup === 'pdf') alertas.push({ nivel: 'aviso', texto: 'PDF em tela: evite a página dupla e pense o corpo para o celular. Para texto corrido, prefira EPUB.' , link: 'dig-pdf' });
    if (sup === 'hibrido') alertas.push({ nivel: 'info', texto: 'Impresso + digital: os valores abaixo valem para o impresso; no EPUB eles viram padrões iniciais que o leitor ajusta.', link: 'dig-epub' });
    if (relutante) alertas.push({ nivel: 'info', texto: 'Leitor relutante: a ficha ativa as estratégias de engajamento — menos texto por página, unidades curtas, progresso visível. Nenhuma delas é "mais estímulo".', link: 'rit-menos-competicao' });

    // ---- blocos ----
    const blocos = [];
    const linha = (param, valor, selo, porque, link) => ({ param, valor, selo, porque, link });

    // Tipografia
    const tip = [];
    tip.push(linha('Altura-x', `${faixa(xh, 'mm')} (≈ ${faixaPt(xh, D.RAZOES.serif)} numa serifada de livro; ≈ ${faixaPt(xh, D.RAZOES.sans)} numa sem serifa de olho grande)`, xhSelo, xhMotivos.join(' '), relutante || inicial || estagioId === 'proc' ? 'tip-reduzir-devagar' : 'tip-altura-x'));
    tip.push(linha('Desenho da fonte', 'Altura-x generosa, aberturas abertas (c, e, a, s), I/l/1 e b/d/p/q bem distintos, contraste moderado. Serifa ou sem serifa: decida pelo desenho.', 'C', 'Crianças apontam letras apertadas e parecidas como o que mais dificulta; serifa e sem serifa foram lidas igualmente bem aos 6 anos.', 'tip-desenho'));
    if (tem('dislexia')) tip.push(linha('Fonte "para dislexia"', 'Não. Qualquer fonte de texto clara; o investimento é em espaçamento, entrelinha e papel.', 'B', 'OpenDyslexic e Dyslexie não melhoraram velocidade nem precisão de leitura.', 'tip-dislexia-fonte'));
    if (inicial || estagioId === 'proc') tip.push(linha('Fonte "infantil"', 'Não é garantia: teste a fonte com o texto real. "a" e "g" de um andar são opcionais.', 'B', 'Verdana foi lida mais rápido que Sassoon Primary; os caracteres infantis não fizeram diferença aos 6 anos.', 'tip-fontes-infantis'));
    tip.push(linha('Famílias', informativo ? 'No máximo duas (texto e títulos). Hierarquia por tamanho e peso: títulos frequentes, termos-chave em negrito.' : 'No máximo duas (texto e títulos); hierarquia por tamanho e peso, não por troca de fonte.', 'C', 'Cada fonte nova é um sistema de formas que o leitor iniciante precisa aprender.', 'tip-familias'));
    tip.push(linha('Ênfase', enfase, 'C', enfaseMotivo, 'tip-enfase'));
    tip.push(linha('Fora do texto corrido', 'Didonas, condensadas, pesos light e thin, scripts e decorativas ficam nos títulos.', 'C', 'Traços finos somem em corpo pequeno; formas estreitas reduzem a diferenciação entre letras.', 'tip-fora-texto-corrido'));
    if (inicial && (pub === 'didatico' || pub === 'primeira')) tip.push(linha('Letra bastão', 'Se a escola usa caixa-alta, cabe no livro; planeje quando e como a caixa-baixa entra.', 'D', 'Prática comum nas escolas brasileiras, sem estudo verificado sobre o melhor momento de transição.', 'tip-bastao'));
    blocos.push({ id: 'tipografia', titulo: 'Tipografia', linhas: tip });

    // Espaçamento e medida
    const esp = [];
    esp.push(linha('Entrelinha', `${faixa(lead, '× o corpo', 2)}`, leadSelo, leadMotivos.join(' '), tem('dislexia') ? 'esp-dislexia' : 'esp-entrelinha'));
    esp.push(linha('Medida', cplTexto, 'C', cplMotivos.join(' '), 'esp-medida'));
    esp.push(linha('Alinhamento', alinh, alinhSelo, alinhMotivos.join(' '), 'esp-bandeira'));
    esp.push(linha('Hifenização', hifen, hifenSelo, hifen === 'Nenhuma' ? 'Palavra partida é palavra duas vezes decodificada.' : 'Hifenização controlada evita rios no justificado.', 'esp-bandeira'));
    esp.push(linha('Quebra de linha', quebra, quebraSelo, ['pre', 'ini', 'proc'].includes(estagioId) ? 'Com o fim da linha no fim da oração, crianças de 7 a 9 anos leram com fraseado melhor e menos recomeços.' : 'Acerte a mancha na prova final, página a página.', ['pre', 'ini', 'proc'].includes(estagioId) ? 'esp-quebra-sentido' : 'pag-mancha'));
    esp.push(linha('Espaço entre letras e palavras', espacoLetras, espacoSelo, espacoMotivo, espacoLink));
    esp.push(linha('Parágrafos', inicial || estagioId === 'proc' ? 'Linha em branco entre blocos; sem recuo.' : 'Recuo ou espaço entre parágrafos, não os dois.', 'C', 'Um único sinal de parágrafo é mais fácil de aprender.', 'esp-paragrafos'));
    if (digital) esp.push(linha('Espaçamento ajustável (digital)', 'O layout aguenta entrelinha 1,5×, parágrafo 2×, letras 0,12× e palavras 0,16× o corpo sem perder conteúdo.', 'Norma', 'Exigência da WCAG 1.4.12 para que o leitor ajuste o espaçamento.', 'esp-wcag'));
    blocos.push({ id: 'espacamento', titulo: 'Espaçamento e medida', linhas: esp });

    // Página e ritmo
    const pag = [];
    pag.push(linha('Texto por página', densidade, 'C', densMotivos.join(' '), relutante ? 'rit-unidades-curtas' : 'pag-previsibilidade'));
    if (estagioId === 'ini' || estagioId === 'proc') pag.push(linha('Região do texto', 'Sempre na mesma região da página; poucas linhas por página.', 'C', 'Quem decodifica gasta atenção para achar onde o texto começa.', 'pag-previsibilidade'));
    if (inicial) pag.push(linha('Virada de página', 'A frase não atravessa a página.', 'C', 'A virada interrompe a construção do sentido para quem lê palavra a palavra.', 'pag-virada'));
    if (!inicial) pag.push(linha('Navegação', 'Sumário, títulos de capítulo e numeração grandes e visíveis.', 'C', 'Saber onde está e quanto falta sustenta a leitura de um livro longo.', 'pag-navegacao'));
    if (impresso && inicial && ['cartonado', 'livro-imagem', 'ilustrado'].includes(pub)) pag.push(linha('Dobra', 'Nada de texto sobre a dobra na página dupla.', 'C', 'A dobra deforma e engole o que está sobre ela.', 'pag-dobra'));
    if (impresso) pag.push(linha('Margem interna', 'Maior que as outras; conferida na prova encadernada, aberta como a criança abre.', 'C', 'A lombada engole parte da margem interna.', 'pag-margem-interna'));
    if (relutante && !inicial) {
      pag.push(linha('Unidades de leitura', 'Capítulos e cenas curtos, cada um com desfecho e gancho.', 'C', 'Estratégia de editoras especializadas em leitores relutantes (Barrington Stoke).', 'rit-unidades-curtas'));
      pag.push(linha('Títulos', 'Títulos que prometem algo, em vez de só "Capítulo 3".', 'C', 'O título cria expectativa e dá um motivo para virar a página.', 'rit-titulos'));
      pag.push(linha('Progresso visível', 'Números de capítulo destacados, sumário ilustrado ou mapa da história.', 'D', 'Hipótese: ver o progresso pode sustentar a persistência. A testar com leitores.', 'rit-progresso'));
      if (estagioId === 'flu' || estagioId === 'crit') pag.push(linha('Nível do texto', 'Alto interesse, baixa dificuldade: tema da idade do leitor, texto no estágio anterior. Considere formatos híbridos (HQ, diário, cartas).', 'C', 'O relutante não quer um livro "de criança menor".', 'rit-hilo'));
    }
    if (relutante && inicial) pag.push(linha('Progresso visível', 'Capítulos curtos com marcador de progresso.', 'D', 'Hipótese a testar: cada unidade concluída é uma recompensa própria da leitura.', 'rit-progresso'));
    if (informativo) pag.push(linha('Hierarquia e sinalização', 'Títulos frequentes, termos-chave em negrito, boxes com função fixa; nada fora do objetivo da página.', 'C', 'Em informativos, a sinalização guia o estudo; o que está fora do objetivo é detalhe sedutor.', 'pag-navegacao'));
    if (atividade) pag.push(linha('Espaço de escrita', 'Espaço de resposta generoso, no corpo da faixa; livro que abre plano.', 'C', 'Quem escreve no livro precisa de espaço e de uma mão livre.', 'pag-atividade'));
    if (pub === 'hq') pag.push(linha('Balões e letreiramento', 'Ordem de leitura inequívoca, margem interna no balão, letreiramento na altura-x da faixa.', 'C', 'O letreiramento é texto corrido: vale a mesma altura-x mínima.', 'hq-baloes'));
    if (tem('tdah')) pag.push(linha('TDAH', 'Menos distratores por página; seções curtas com títulos; progresso visível.', 'D', 'Hipótese coerente com a evidência sobre competição visual, não testada em leitores com TDAH.', 'ace-tdah'));
    if (tem('tea')) pag.push(linha('TEA', 'Layout previsível em todas as páginas; sem sobrecarga de cor e padrões; paratextos literais.', 'D', 'Hipótese baseada em prática; sem estudo verificado.', 'ace-tea'));
    if (!inicial && !relutante && textoLongo) pag.push(linha('Acabamento da mancha', 'Sem viúvas, órfãs e rios.', 'C', 'Linhas soltas e rios quebram o ritmo.', 'pag-mancha'));
    blocos.push({ id: 'pagina', titulo: 'Página e ritmo', linhas: pag });

    // Imagem e cor
    const img = [];
    if (informativo) img.push(linha('Imagem', 'Explicativa, colada ao trecho que explica, com rótulo direto. Sem curiosidades decorativas fora do objetivo.', 'A', 'Detalhes interessantes mas irrelevantes prejudicaram a aprendizagem em 58 estudos, sobretudo junto de diagramas relevantes.', 'img-informativos'));
    else if (estagioId === 'pre') img.push(linha('Imagem', 'Carrega a narrativa; rica, para alimentar a conversa com o adulto. O texto segue legível para quem lê em voz alta.', 'C', 'Na leitura compartilhada, a imagem é o que a criança "lê".', 'img-mediada'));
    else if ((estagioId === 'ini' || estagioId === 'proc') && modo === 'sozinho') img.push(linha('Imagem', 'Relevante e separada do bloco de texto; página de texto sem detalhes extrínsecos.', 'B', 'Com ilustrações enxutas, a compreensão de leitores do 1º e 2º ano foi de cerca de 47% para 80%.', 'img-autonoma'));
    else if (estagioId === 'ini' && (modo === 'adulto' || modo === 'compartilhado')) img.push(linha('Imagem', 'Pode ser rica na leitura mediada; na página de texto, nada compete com as linhas que a criança tenta ler.', 'C', 'A mediação do adulto rendeu mais que recursos digitais; a imagem rica alimenta a conversa.', 'img-mediada'));
    else img.push(linha('Imagem', 'Ilustração como respiro, de página inteira, fora da página de texto.', 'C', 'O respiro reduz a densidade sem competir com o texto.', 'rit-respiro'));
    img.push(linha('Texto sobre imagem', tem('baixa-visao') ? 'Nunca.' : 'Evitar; se inevitável, sobre área lisa de alto contraste.', 'C', 'Fundo irregular reduz o contraste de parte das letras.', tem('baixa-visao') ? 'ace-baixa-visao' : 'img-texto-sobre-imagem'));
    img.push(linha('Fundo e contraste', fundo, fundoSelo, fundoMotivo, fundoLink));
    if (tem('daltonismo')) img.push(linha('Cor como código', 'Nunca só a cor: some rótulo direto, padrão ou forma. Evite o par vermelho/verde. Teste com simulador.', 'A', 'Cerca de 8% dos homens têm deficiência vermelho-verde.', 'img-daltonismo'));
    else if (informativo) img.push(linha('Cor como código', 'Nunca só a cor: some rótulo ou forma em gráficos, boxes e legendas.', 'C', 'Parte dos leitores não distingue as cores; o rótulo direto serve a todos.', 'img-daltonismo'));
    if (informativo) img.push(linha('Código de cor', 'A mesma cor para a mesma função no livro inteiro.', 'C', 'Um código consistente vira atalho de navegação.', 'img-codigo-cor'));
    img.push(linha('Atrás do texto', 'Sem cor saturada nem textura atrás do texto; fonte decorativa só em títulos.', 'C', 'Cor saturada reduz o contraste; cada mudança gratuita custa reorientação.', 'rit-evitar'));
    blocos.push({ id: 'imagem', titulo: 'Imagem e cor', linhas: img });

    // Materialidade
    if (impresso) {
      const mat = [];
      mat.push(linha('Papel', papel, 'C', papelMotivo, papelLink));
      mat.push(linha('Opacidade', 'Sem transparência do verso; gramatura e opacidade escolhidas com prova física.', 'C', 'O texto do verso compete com o da frente.', 'mat-opacidade'));
      if (pub === 'cartonado') mat.push(linha('Encadernação', 'Cartonado com páginas resistentes e cantos arredondados.', 'C', 'O livro é manipulado, mordido e derrubado.', 'mat-encadernacao'));
      else if (atividade) mat.push(linha('Encadernação', 'Abre plano: costura ou wire-o.', 'C', 'Quem escreve no livro precisa das duas mãos livres.', 'mat-encadernacao'));
      else mat.push(linha('Encadernação', 'Qualquer; conferir a margem interna na prova encadernada.', 'C', 'Lombada colada engole margem.', 'pag-margem-interna'));
      if ((estagioId === 'ini' || estagioId === 'proc') && modo === 'sozinho') mat.push(linha('Formato e peso', 'Cabe nas mãos e não pesa; a criança lê sozinha, inclusive deitada.', 'C', 'Peso e formato excessivos empurram o livro para a mesa.', 'mat-formato'));
      mat.push(linha('Acabamentos', 'Verniz e laminação brilhante longe da área de texto.', 'C', 'Brilho sobre o texto produz reflexo.', 'mat-acabamento'));
      blocos.push({ id: 'materialidade', titulo: 'Materialidade', linhas: mat });
    }

    // Digital
    if (digital) {
      const dig = [];
      if (sup === 'epub' || sup === 'hibrido') {
        dig.push(linha('EPUB', 'Os valores da ficha são padrões iniciais: o leitor ajusta fonte, corpo, entrelinha e fundo.', 'Norma', 'No refluível, o leitor precisa poder mudar os valores sem quebrar a página.', 'dig-epub'));
        dig.push(linha('Estrutura', 'Títulos semânticos, descrição de todas as imagens, nenhuma animação automática.', 'Norma', 'Exigências de acessibilidade do EPUB (WCAG 2.2).', 'dig-epub'));
      }
      if (sup === 'pdf' || sup === 'hibrido') dig.push(linha('PDF em tela', 'Uma página por vez (sem página dupla); corpo pensado para o celular. Para texto corrido, prefira EPUB.', 'C', 'A página dupla reduzida ao celular leva o corpo a tamanhos ilegíveis.', 'dig-pdf'));
      if (inicial || estagioId === 'proc') dig.push(linha('Recursos digitais', 'Só os congruentes com a história; dicionário embutido ajuda o vocabulário, não a compreensão.', 'A', 'Livro digital que só digitaliza o impresso perde; com recursos congruentes, supera o papel.', 'dig-recursos'));
      if (informativo) dig.push(linha('Versão para estudo', 'Ofereça versão impressa para estudo; o digital complementa.', 'A', 'Compreensão melhor no papel em textos informativos (54 estudos, 171.055 participantes).', 'dig-impresso-estudo'));
      if (pub === 'didatico' && (estagioId === 'ini' || estagioId === 'proc')) dig.push(linha('PNLD', 'Formato acessível obrigatório; versão digital acessível em HTML5; critérios visuais no Anexo 02 do edital.', 'Norma', 'Exigência do edital PNLD Anos Iniciais 2027–2030.', 'dig-pnld'));
      blocos.push({ id: 'digital', titulo: 'Digital', linhas: dig });
    }

    // Acessibilidade
    if (acesso.length) {
      const ace = [];
      if (tem('dislexia')) { ace.push(linha('Dislexia', 'Entrelinha ≥ 1,5; espaço entre letras levemente aberto; bandeira; sem hifenização; negrito para ênfase; medida ≤ 60; papel creme fosco; frases e parágrafos curtos.', 'A/B/C', 'Espaçamento tem efeito demonstrado; fontes especiais não; lâminas coloridas não têm evidência.', 'ace-dislexia')); ace.push(linha('Lâminas coloridas', 'Não recomendadas.', 'A', 'Revisão sistemática não encontrou evidência de benefício para a leitura.', 'ace-dislexia')); }
      if (tem('baixa-visao')) ace.push(linha('Baixa visão', 'Edição em letra grande (16 pt+) ou gigante (18 pt+); contraste máximo; sem texto sobre imagem; papel fosco.', 'C', 'Faixas de impresso ampliado recomendadas pelo RNIB.', 'ace-baixa-visao'));
      if (tem('daltonismo')) ace.push(linha('Daltonismo', 'Cor nunca como único código; evitar vermelho/verde; rótulos e padrões.', 'A/C', 'Prevalência alta e estável da deficiência vermelho-verde.', 'ace-daltonismo'));
      if (tem('tdah')) ace.push(linha('TDAH', 'Menos distratores; seções curtas com títulos; progresso visível.', 'D', 'A testar com leitores.', 'ace-tdah'));
      if (tem('tea')) ace.push(linha('TEA', 'Layout previsível; sem sobrecarga de cor e padrões; paratextos literais.', 'D', 'A testar com leitores.', 'ace-tea'));
      if (tem('l2')) ace.push(linha('Português como 2ª língua', 'Frases curtas; glossário; imagens que ancoram o sentido; sem ambiguidades. Inclui leitores surdos com Libras como 1ª língua.', 'C', 'Prática de linguagem simples.', 'ace-l2'));
      blocos.push({ id: 'acesso', titulo: 'Acessibilidade', linhas: ace });
    }

    // ---- 7. restrições de produção → alertas ----
    const estimativa = estimarCapacidade({ estagioId, pub, relutante, xh, lead, cpl, rest });
    if (rest.papel === 'couche-brilho') alertas.push({ nivel: 'conflito', texto: 'Papel couché brilhante na área de texto produz reflexo. Alternativas: couché fosco para ilustrados, offset ou pólen para texto corrido.', link: 'mat-fosco' });
    if (rest.papel === 'offset-branco' && (textoLongo || tem('dislexia'))) alertas.push({ nivel: 'aviso', texto: 'Offset branco em texto longo: o creme reduz o brilho e é a recomendação para dislexia. Se o branco for obrigatório, prefira o de menor alvura e confira a opacidade.', link: 'mat-creme' });
    if (rest.papel === 'cartao' && pub !== 'cartonado') alertas.push({ nivel: 'aviso', texto: 'Cartão é papel de cartonado (0–3 anos). Para este tipo de publicação, confira se o formato ainda cabe nas mãos e no orçamento.', link: 'mat-encadernacao' });
    if ((rest.formato === '20.5x27.5' || rest.formato === '21x28') && (estagioId === 'ini' || estagioId === 'proc') && modo === 'sozinho') alertas.push({ nivel: 'aviso', texto: 'Formato grande para leitura autônoma de 6 a 10 anos: peso e tamanho empurram o livro para a mesa. Se o formato for fixo, reduza a gramatura e o número de páginas.', link: 'mat-formato' });
    if (rest.cores === '1' && informativo && tem('daltonismo')) alertas.push({ nivel: 'info', texto: 'Uma cor e daltonismo combinam bem: a informação já precisa viver em rótulos, padrões e formas.', link: 'img-daltonismo' });
    if (estimativa) alertas.push(estimativa);

    // ---- checklist ----
    const checklist = D.CHECKLIST_BASE.slice();
    if (inicial || estagioId === 'proc') { checklist.splice(2, 0, { id: 'ck-hifen', texto: 'Sem hifenização nos estágios iniciante e em processo.', link: 'esp-bandeira' }, { id: 'ck-quebra', texto: 'Quebras de linha por unidade de sentido.', link: 'esp-quebra-sentido' }); }
    if (tem('dislexia')) checklist.push({ id: 'ck-dislexia', texto: 'Entrelinha ≥ 1,5 e espaço entre letras levemente aberto conferidos na prova.', link: 'esp-dislexia' });
    if (tem('daltonismo') || informativo) checklist.push({ id: 'ck-daltonismo', texto: 'Gráficos, boxes e legendas com rótulo ou padrão além da cor; conferidos em simulador de daltonismo.', link: 'img-daltonismo' });
    if (digital) checklist.push({ id: 'ck-wcag', texto: 'Layout digital testado com os espaçamentos da WCAG 1.4.12.', link: 'esp-wcag' });
    if (informativo) checklist.push({ id: 'ck-sedutor', texto: 'Nenhum detalhe sedutor (curiosidade, mascote, decoração) na página de estudo.', link: 'img-informativos' });
    if (impresso && inicial && ['cartonado', 'livro-imagem', 'ilustrado'].includes(pub)) checklist.push({ id: 'ck-dobra', texto: 'Nenhum texto sobre a dobra.', link: 'pag-dobra' });

    // ---- fontes citadas ----
    const refIds = new Set();
    blocos.forEach(b => b.linhas.forEach(l => { const d = dir(l.link); if (d) d.refs.forEach(r => refIds.add(r)); }));
    const fontes = D.REFERENCIAS.filter(r => refIds.has(r.id));

    return {
      perfil: Object.assign({}, perfil, { estagioEfetivo: estagioId }),
      estagio, idade, alertas, blocos, checklist, fontes,
      numerico: { xh, lead, cpl },
      versao: D.META.versaoRegras,
      avisos: [
        'A ficha é ponto de partida; o leitor real varia mais que qualquer faixa.',
        'Não é orientação clínica e não diagnostica dislexia, TDAH ou baixa visão.',
        'O corpo em pontos varia com a fonte: confira a altura-x medida na prova.',
        'Teste com leitores antes de fechar o projeto (5 a 8 por perfil, duas versões da mesma página).'
      ]
    };
  }

  // Estimativa de capacidade: quantas palavras cabem numa página com os parâmetros da ficha.
  // Heurística declarada: mancha = 70% da altura × 68% da largura; largura média do caractere = 0,5 × corpo; palavra = 6,5 caracteres com espaço.
  function estimarCapacidade(ctx) {
    const { estagioId, pub, relutante, xh, lead, cpl, rest } = ctx;
    const formato = D.FORMATOS.find(f => f.id === rest.formato);
    const paginas = parseInt(rest.paginas, 10);
    const palavras = parseInt(rest.palavras, 10);
    if (!formato || !formato.larguraMm || pub === 'hq' || pub === 'cartonado' || pub === 'livro-imagem') return null;
    if (!(paginas > 0) && !(palavras > 0)) return null;

    const xhMin = xh[0];
    const corpoMm = xhMin / D.RAZOES.serif;
    const leadMm = corpoMm * lead[0];
    const manchaH = formato.alturaMm * 0.70;
    const manchaW = formato.larguraMm * 0.68;
    let linhas = Math.floor(manchaH / leadMm);
    if (MAX_LINHAS[estagioId]) linhas = Math.min(linhas, MAX_LINHAS[estagioId]);
    if (relutante) linhas = Math.max(1, Math.round(linhas * 0.75));
    let caracteres = Math.floor(manchaW / (corpoMm * 0.5));
    if (cpl && cpl[1] != null) caracteres = Math.min(caracteres, cpl[1]);
    const parteImagem = PARTE_IMAGEM[pub] != null ? PARTE_IMAGEM[pub] : PARTE_IMAGEM_PADRAO;
    const palavrasPorPagina = Math.max(1, Math.round(linhas * (caracteres / 6.5) * (1 - parteImagem)));

    const partes = [`Com altura-x mínima de ${fmt(xhMin)} mm, cerca de ${linhas} linhas e ${caracteres} caracteres por linha no formato ${formato.rotulo}, cabem ~${palavrasPorPagina} palavras por página de texto (estimativa; reserva de ${Math.round(parteImagem * 100)}% da página para imagem).`];
    if (paginas > 0) {
      const uteis = Math.max(1, paginas - 8);
      if (paginas % 8 !== 0) partes.push(`Páginas em múltiplos de 16 (ou 8) aproveitam melhor os cadernos; ${paginas} não é.`);
      if (palavras > 0) {
        const necessarias = Math.ceil(palavras / palavrasPorPagina) + 8;
        if (necessarias > paginas) {
          return { nivel: 'conflito', texto: `${partes[0]} Um texto de ${fmt(palavras)} palavras pede ~${necessarias} páginas (com 8 de abertura e fechamento); o projeto tem ${paginas}. Alternativas: reduza o texto por página e aumente a extensão, corte texto ou mude o formato — mas mantenha a altura-x mínima da faixa. ${partes[1] || ''}`.trim(), link: 'tip-reduzir-devagar' };
        }
        return { nivel: 'info', texto: `${partes[0]} ${fmt(palavras)} palavras cabem em ~${necessarias} páginas; o projeto tem ${paginas}. ${partes[1] || ''}`.trim(), link: 'tip-altura-x' };
      }
      return { nivel: 'info', texto: `${partes[0]} Em ${paginas} páginas (≈ ${uteis} de texto), cabem ~${fmt(uteis * palavrasPorPagina)} palavras. ${partes[1] || ''}`.trim(), link: 'tip-altura-x' };
    }
    const necessarias = Math.ceil(palavras / palavrasPorPagina) + 8;
    return { nivel: 'info', texto: `${partes[0]} ${fmt(palavras)} palavras pedem ~${necessarias} páginas.`, link: 'tip-altura-x' };
  }

  // Codificação do perfil na URL (sem dados pessoais: descreve um público, não uma criança).
  const CAMPOS = [['idade', 'i'], ['estagio', 'e'], ['publicacao', 'p'], ['suporte', 's'], ['modo', 'm'], ['engajamento', 'g'], ['objetivo', 'o']];
  const CAMPOS_REST = [['formato', 'f'], ['paginas', 'pg'], ['cores', 'c'], ['papel', 'pp'], ['palavras', 'w']];

  function codificar(perfil) {
    const q = new URLSearchParams();
    CAMPOS.forEach(([k, s]) => { if (perfil[k]) q.set(s, perfil[k]); });
    if (perfil.acesso && perfil.acesso.length) q.set('a', perfil.acesso.join(','));
    const r = perfil.restricoes || {};
    CAMPOS_REST.forEach(([k, s]) => { if (r[k]) q.set(s, r[k]); });
    return q.toString();
  }

  function decodificar(str) {
    const q = new URLSearchParams(str);
    const perfil = { acesso: [], restricoes: {} };
    let algum = false;
    CAMPOS.forEach(([k, s]) => { if (q.has(s)) { perfil[k] = q.get(s); algum = true; } });
    if (q.has('a')) { perfil.acesso = q.get('a').split(',').filter(Boolean); algum = true; }
    CAMPOS_REST.forEach(([k, s]) => { if (q.has(s)) perfil.restricoes[k] = q.get(s); });
    return algum ? perfil : null;
  }

  function perfilCompleto(perfil) {
    return D.PERGUNTAS.every(p => {
      const v = perfil[p.id];
      return p.tipo === 'multipla' ? Array.isArray(v) && v.length > 0 : !!v;
    });
  }

  return { montarFicha, estimarCapacidade, codificar, decodificar, perfilCompleto, faixa, faixaPt, mmParaPt, fmt };
})();

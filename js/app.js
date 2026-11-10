/* Ergomino — interface (MVP 1.0)
 * Uma página, sem telas novas: seções no mesmo documento e uma gaveta lateral (folha inferior no celular) para detalhes.
 * Nenhum dado sai do navegador: preferências e perfis salvos ficam no localStorage deste aparelho.
 */
(function () {
  'use strict';
  const D = window.ERGO;
  const R = window.ERGO_REGRAS;

  // ---------- utilidades ----------
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const movReduzido = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const celular = () => window.matchMedia('(max-width: 900px)').matches;

  function h(tag, attrs) {
    const el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(k => {
      const v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k === 'text') el.textContent = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), v);
      else if (k === 'dataset') Object.assign(el.dataset, v);
      else if (v === true) el.setAttribute(k, '');
      else el.setAttribute(k, v);
    });
    for (let i = 2; i < arguments.length; i++) acrescenta(el, arguments[i]);
    return el;
  }
  function acrescenta(el, filho) {
    if (filho == null || filho === false) return;
    if (Array.isArray(filho)) { filho.forEach(f => acrescenta(el, f)); return; }
    el.appendChild(typeof filho === 'string' || typeof filho === 'number' ? document.createTextNode(String(filho)) : filho);
  }
  const frag = (...n) => { const f = document.createDocumentFragment(); n.forEach(x => acrescenta(f, x)); return f; };

  const normaliza = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const dataBR = iso => { const [a, m, d] = iso.split('-'); return `${d}/${m}/${a}`; };
  const hoje = () => new Date().toISOString().slice(0, 10);

  const store = {
    get(k, padrao) { try { const v = localStorage.getItem(k); return v == null ? padrao : JSON.parse(v); } catch (e) { return padrao; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* armazenamento indisponível: segue sem persistir */ } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* ignora */ } }
  };
  const CHAVES = { tema: 'ergomino.tema', texto: 'ergomino.texto', gaveta: 'ergomino.gaveta', pxmm: 'ergomino.pxPorMm', perfis: 'ergomino.perfis', fonte: 'ergomino.previaFonte' };

  let toastTimer = null;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg; t.classList.add('visivel');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('visivel'), 2600);
  }

  function copiar(texto, msg) {
    const ok = () => toast(msg || 'Copiado.');
    const fallback = () => {
      const ta = h('textarea', { class: 'so-leitor', 'aria-hidden': 'true' }); ta.value = texto; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); ok(); } catch (e) { toast('Não foi possível copiar. Selecione o texto e copie manualmente.'); }
      ta.remove();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(texto).then(ok, fallback); else fallback();
  }

  const porId = (lista, id) => lista.find(x => x.id === id);
  const diretriz = id => porId(D.DIRETRIZES, id);
  const tema = id => porId(D.TEMAS, id);
  const ref = id => porId(D.REFERENCIAS, id);
  const estagio = id => porId(D.ESTAGIOS, id);
  const nomeEstagio = id => (estagio(id) || {}).nome || id;
  const ROTULOS = {
    suportes: { impresso: 'Impresso', pdf: 'PDF em tela', epub: 'E-book refluível', hibrido: 'Impresso + digital' },
    acesso: { dislexia: 'Dislexia', 'baixa-visao': 'Baixa visão', daltonismo: 'Daltonismo', tdah: 'TDAH', tea: 'TEA', l2: 'Português como 2ª língua', nenhuma: 'Nenhuma específica' },
    publicacoes: { cartonado: 'Cartonado', 'livro-imagem': 'Livro-imagem', ilustrado: 'Ilustrado', primeira: 'Primeira leitura', capitulos: 'Capítulos', romance: 'Romance', hq: 'HQ', informativo: 'Informativo', didatico: 'Didático', revista: 'Revista' }
  };
  const usosDaRef = id => D.DIRETRIZES.filter(d => d.refs.includes(id));

  // ---------- selo ----------
  function selo(codigo, opts) {
    opts = opts || {};
    const partes = String(codigo).split('/');
    const unico = partes.length === 1 ? partes[0] : null;
    const info = unico ? D.SELOS[unico] : null;
    const nome = info ? info.nome : partes.map(p => (D.SELOS[p] || {}).letra || p).join('/');
    const btn = h('button', { type: 'button', class: 'selo ' + (unico ? 'selo-' + unico : 'selo-multi'), 'aria-label': `Selo de evidência ${codigo}: ${nome}. Ver legenda`, onclick: e => { e.stopPropagation(); abrirSelo(codigo, e.currentTarget); } },
      h('span', { class: 'selo-letra', 'aria-hidden': 'true' }, h('span', {}, unico ? info.letra : partes.map(p => (D.SELOS[p] || {}).letra || p).join('/'))),
      opts.curto ? null : h('span', {}, nome));
    return btn;
  }

  // ---------- tema, texto, modo leitura ----------
  function aplicarTema(t, persistir) {
    document.documentElement.dataset.theme = t;
    $$('.tema [role="radio"]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.tema === t)));
    if (persistir) store.set(CHAVES.tema, t);
  }
  const TEXTOS = ['padrao', 'maior', 'maximo'];
  const TEXTO_NOME = { padrao: 'padrão', maior: 'maior', maximo: 'máximo' };
  function aplicarTexto(t, persistir) {
    if (t === 'padrao') delete document.documentElement.dataset.texto; else document.documentElement.dataset.texto = t;
    const prox = TEXTOS[(TEXTOS.indexOf(t) + 1) % TEXTOS.length];
    $$('#btn-texto, .btn-texto-mais').forEach(b => b.setAttribute('aria-label', `Tamanho do texto: ${TEXTO_NOME[t]}. Ativar para mudar para ${TEXTO_NOME[prox]}`));
    if (persistir) store.set(CHAVES.texto, t);
  }
  function alternarTexto() {
    const atual = document.documentElement.dataset.texto || 'padrao';
    const prox = TEXTOS[(TEXTOS.indexOf(atual) + 1) % TEXTOS.length];
    aplicarTexto(prox, true); toast(`Texto ${TEXTO_NOME[prox]}.`);
  }
  function modoLeitura(ligar) {
    document.body.classList.toggle('modo-leitura', ligar);
    $('#btn-leitura').setAttribute('aria-pressed', String(ligar));
    $('#btn-sair-leitura').hidden = !ligar;
    if (ligar) toast('Modo leitura: navegação oculta. Esc ou o botão no canto saem.');
  }

  // ---------- navegação ----------
  const SECOES = ['inicio', 'ferramenta', 'guia', 'mitos', 'referencias', 'sobre'];
  function irPara(id, opts) {
    opts = opts || {};
    const alvo = document.getElementById(id);
    if (!alvo) return;
    if (!opts.semHash && SECOES.includes(id)) history.pushState(null, '', '#' + id);
    alvo.scrollIntoView({ behavior: (opts.instantaneo || movReduzido()) ? 'auto' : 'smooth', block: 'start' });
    if (opts.foco) { alvo.setAttribute('tabindex', '-1'); alvo.focus({ preventScroll: true }); }
  }
  function marcarAtual(id) {
    $$('[data-nav]').forEach(a => { if (a.closest('.nav-principal') || a.closest('.abas')) a.setAttribute('aria-current', String(a.dataset.nav === id)); });
  }
  function observarSecoes() {
    const visiveis = new Map();
    const topoH = ($('#topo') || {}).offsetHeight || 64;
    const obs = new IntersectionObserver(entradas => {
      entradas.forEach(e => visiveis.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
      let melhor = null, maior = 0;
      visiveis.forEach((r, id) => { if (r > maior) { maior = r; melhor = id; } });
      if (melhor) marcarAtual(melhor);
    }, { rootMargin: '-' + topoH + 'px 0px -45% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] });
    SECOES.forEach(id => { const s = document.getElementById(id); if (s) obs.observe(s); });
  }

  // ---------- gaveta ----------
  const gaveta = {
    el: null, corpo: null, titulo: null, tipo: null, alca: null, fundo: null, abridor: null, aberta: false, timer: null,
    init() {
      this.el = $('#gaveta'); this.corpo = $('#gaveta-corpo'); this.titulo = $('#gaveta-titulo'); this.tipo = $('#gaveta-tipo'); this.alca = $('#gaveta-alca'); this.fundo = $('#gaveta-fundo');
      const salvo = store.get(CHAVES.gaveta, null);
      if (salvo && salvo.largura) this.el.style.setProperty('--gaveta-w', salvo.largura + 'px');
      $('#gaveta-fechar').addEventListener('click', () => this.fechar());
      this.fundo.addEventListener('click', () => this.fechar());
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          if (this.aberta) { e.preventDefault(); this.fechar(); }
          else if (document.body.classList.contains('modo-leitura')) modoLeitura(false);
        }
      });
      this.corpo.addEventListener('click', e => { const a = e.target.closest('[data-nav]'); if (a) this.fechar(); });
      this.initRedimensionar();
      window.matchMedia('(max-width: 900px)').addEventListener('change', () => this.ajustarOrientacao());
      this.ajustarOrientacao();
    },
    ajustarOrientacao() {
      const m = celular();
      this.alca.setAttribute('aria-orientation', m ? 'horizontal' : 'vertical');
      this.alca.setAttribute('aria-label', m ? 'Redimensionar painel. Arraste ou use as setas para cima e para baixo; para baixo até o fim fecha' : 'Redimensionar painel. Arraste ou use as setas para a esquerda e para a direita');
      if (m) { this.alca.setAttribute('aria-valuemin', '160'); this.alca.setAttribute('aria-valuemax', String(window.innerHeight - 24)); }
      else { this.alca.setAttribute('aria-valuemin', '360'); this.alca.setAttribute('aria-valuemax', String(Math.min(1200, Math.round(window.innerWidth * 0.9)))); }
    },
    abrir(tipo, titulo, conteudo, abridor) {
      this.abridor = abridor || document.activeElement;
      this.tipo.textContent = tipo || ''; this.titulo.textContent = titulo || '';
      this.corpo.replaceChildren(conteudo); this.corpo.scrollTop = 0;
      clearTimeout(this.timer);
      this.el.hidden = false; this.fundo.hidden = false;
      requestAnimationFrame(() => { this.el.classList.add('aberta'); this.fundo.classList.add('visivel'); });
      this.aberta = true;
      this.el.setAttribute('aria-modal', celular() ? 'true' : 'false');
      setTimeout(() => this.corpo.focus({ preventScroll: true }), movReduzido() ? 0 : 60);
    },
    fechar() {
      if (!this.aberta) return;
      this.aberta = false;
      this.el.classList.remove('aberta'); this.fundo.classList.remove('visivel');
      const fim = () => { this.el.hidden = true; this.fundo.hidden = true; };
      this.timer = setTimeout(fim, movReduzido() ? 0 : 260);
      if (this.abridor && this.abridor.isConnected && typeof this.abridor.focus === 'function') this.abridor.focus({ preventScroll: true });
    },
    initRedimensionar() {
      const alca = this.alca; const el = this.el; let arrastando = false;
      const aplicar = (valor) => {
        if (celular()) { const alt = Math.max(160, Math.min(window.innerHeight - 24, valor)); el.style.setProperty('--sheet-h', alt + 'px'); alca.setAttribute('aria-valuenow', String(Math.round(alt))); return alt; }
        const larg = Math.max(360, Math.min(Math.min(1200, window.innerWidth * 0.9), valor)); el.style.setProperty('--gaveta-w', larg + 'px'); alca.setAttribute('aria-valuenow', String(Math.round(larg))); return larg;
      };
      const atual = () => celular() ? el.getBoundingClientRect().height : el.getBoundingClientRect().width;
      alca.addEventListener('pointerdown', e => {
        arrastando = true; alca.setPointerCapture(e.pointerId); el.classList.add('arrastando'); e.preventDefault();
      });
      alca.addEventListener('pointermove', e => {
        if (!arrastando) return;
        if (celular()) aplicar(window.innerHeight - e.clientY); else aplicar(window.innerWidth - e.clientX);
      });
      const soltar = e => {
        if (!arrastando) return; arrastando = false; el.classList.remove('arrastando');
        try { alca.releasePointerCapture(e.pointerId); } catch (err) { /* já solto */ }
        if (celular()) { if (window.innerHeight - e.clientY < 150) { this.fechar(); el.style.removeProperty('--sheet-h'); } }
        else store.set(CHAVES.gaveta, { largura: Math.round(atual()) });
      };
      alca.addEventListener('pointerup', soltar); alca.addEventListener('pointercancel', soltar);
      alca.addEventListener('keydown', e => {
        const passo = e.shiftKey ? 120 : 40; let v = atual(); let tratou = true;
        if (celular()) {
          if (e.key === 'ArrowUp') v += passo; else if (e.key === 'ArrowDown') v -= passo; else if (e.key === 'Home') v = window.innerHeight - 24; else if (e.key === 'End') v = 160; else tratou = false;
        } else {
          if (e.key === 'ArrowLeft') v += passo; else if (e.key === 'ArrowRight') v -= passo; else if (e.key === 'Home') v = Math.min(1200, window.innerWidth * 0.9); else if (e.key === 'End') v = 360; else tratou = false;
        }
        if (tratou) { e.preventDefault(); aplicar(v); if (!celular()) store.set(CHAVES.gaveta, { largura: Math.round(atual()) }); }
      });
    }
  };

  // ---------- conteúdos da gaveta ----------
  function secaoGaveta(rotulo, conteudo) { return h('div', { class: 'gaveta-secao' }, h('span', { class: 'rotulo' }, rotulo), conteudo); }
  function listaRefs(ids) {
    const itens = ids.map(id => ref(id)).filter(Boolean);
    if (!itens.length) return h('p', { class: 'ficha-fontes' }, 'Sem estudo verificado: prática editorial ou hipótese declarada.');
    return h('ul', {}, itens.map(r => h('li', {}, h('button', { type: 'button', class: 'link-botao', onclick: e => abrirRef(r.id, e.currentTarget) }, r.cite.split('.')[0] + ' (' + r.ano + ')'), ' — ', r.mostrou, ' ', selo(r.selo, { curto: true }))));
  }
  function valePara(d) {
    const v = d.vale || {}; const itens = [];
    (v.estagios || []).forEach(e => itens.push(nomeEstagio(e)));
    (v.suportes || []).forEach(s => itens.push(ROTULOS.suportes[s] || s));
    (v.publicacoes || []).forEach(p => itens.push(ROTULOS.publicacoes[p] || p));
    (v.acesso || []).forEach(a => itens.push(ROTULOS.acesso[a] || a));
    if ((v.estagios || []).length === 5 && !v.suportes && !v.publicacoes && !v.acesso) return h('div', { class: 'vale-para' }, h('span', { class: 'etiqueta' }, 'Todos os estágios'));
    return h('div', { class: 'vale-para' }, itens.map(t => h('span', { class: 'etiqueta' }, t)));
  }
  function tabelaBase(parametros, estagioDestacado) {
    const linhas = {
      xh: ['Altura-x', e => R.faixa(D.BASE[e].xh, 'mm')],
      serif: ['≈ corpo, serifada de livro (r = 0,45)', e => R.faixaPt(D.BASE[e].xh, D.RAZOES.serif)],
      sans: ['≈ corpo, sem serifa de olho grande (r = 0,52)', e => R.faixaPt(D.BASE[e].xh, D.RAZOES.sans)],
      lead: ['Entrelinha (× corpo)', e => R.faixa(D.BASE[e].lead, '', 2)],
      cpl: ['Medida (caracteres por linha)', e => D.BASE[e].cplTexto],
      alinh: ['Alinhamento', e => D.BASE[e].alinh],
      hifen: ['Hifenização', e => D.BASE[e].hifen],
      quebra: ['Quebra de linha', e => D.BASE[e].quebra],
      densidade: ['Texto por página', e => D.BASE[e].densidade]
    };
    const ests = D.ESTAGIOS;
    const tabela = h('table', {},
      h('thead', {}, h('tr', {}, h('th', { scope: 'col' }, 'Parâmetro'), ests.map(e => h('th', { scope: 'col', class: e.id === estagioDestacado ? 'destacada' : '' }, e.nome, h('br'), h('small', {}, e.idade))))),
      h('tbody', {}, parametros.map(p => h('tr', {}, h('th', { scope: 'row' }, linhas[p][0]), ests.map(e => h('td', { class: e.id === estagioDestacado ? 'destacada' : '' }, linhas[p][1](e.id)))))));
    return h('div', { class: 'tabela-wrap' }, tabela);
  }

  function conteudoDiretriz(id) {
    const d = diretriz(id); if (!d) return h('p', {}, 'Diretriz não encontrada.');
    const t = tema(d.tema);
    const c = h('div', {});
    c.appendChild(h('div', { class: 'acoes-linha', style: 'margin-bottom:1rem' }, selo(d.selo), h('span', { class: 'etiqueta' }, t ? t.nome : d.tema), h('span', { class: 'etiqueta' }, 'Revisado em ' + dataBR(d.revisado))));
    c.appendChild(secaoGaveta('Recomendação', h('p', {}, d.rec)));
    if (d.valores === 'base') c.appendChild(secaoGaveta('Valores por estágio', tabelaBase(d.tema === 'tipografia' ? ['xh', 'serif', 'sans'] : ['lead', 'cpl', 'alinh', 'hifen'], null)));
    c.appendChild(secaoGaveta('Por quê', h('p', {}, d.porque)));
    c.appendChild(secaoGaveta('Vale para', valePara(d)));
    if (d.excecoes) c.appendChild(secaoGaveta('Exceções', h('p', {}, d.excecoes)));
    if (d.exemplo) c.appendChild(secaoGaveta('Exemplo', h('div', { class: 'antes-depois' }, h('div', {}, h('span', { class: 'rotulo' }, 'Antes'), d.exemplo.antes), h('div', {}, h('span', { class: 'rotulo' }, 'Depois'), d.exemplo.depois))));
    const rel = (d.relacionadas || []).map(rid => diretriz(rid) ? h('button', { type: 'button', class: 'chip', onclick: e => abrirDiretriz(rid, e.currentTarget) }, diretriz(rid).titulo) : (porId(D.MITOS, rid) ? h('button', { type: 'button', class: 'chip', onclick: e => abrirMito(rid, e.currentTarget) }, 'Mito: ' + porId(D.MITOS, rid).afirmacao) : null)).filter(Boolean);
    if (rel.length) c.appendChild(secaoGaveta('Relacionadas', h('div', { class: 'chips' }, rel)));
    c.appendChild(secaoGaveta('Fontes', listaRefs(d.refs)));
    c.appendChild(h('div', { class: 'gaveta-acoes' },
      h('button', { type: 'button', class: 'btn btn-secundario btn-p', onclick: () => { gaveta.fechar(); mostrarNoGuia(d.id); } }, 'Ver no guia'),
      h('button', { type: 'button', class: 'btn btn-secundario btn-p', onclick: () => copiar(linkPara('diretriz/' + d.id), 'Link da diretriz copiado.') }, 'Copiar link')));
    return c;
  }
  function conteudoMito(id) {
    const m = porId(D.MITOS, id); if (!m) return h('p', {}, 'Mito não encontrado.');
    const c = h('div', {});
    c.appendChild(h('div', { class: 'acoes-linha', style: 'margin-bottom:1rem' }, veredito(m.veredito), h('span', { class: 'etiqueta' }, (tema(m.tema) || {}).nome || m.tema)));
    c.appendChild(secaoGaveta('O que a pesquisa mostra', h('p', {}, m.pesquisa)));
    c.appendChild(secaoGaveta('O que fazer', h('p', {}, m.fazer)));
    const dirs = (m.diretrizes || []).map(did => diretriz(did)).filter(Boolean);
    if (dirs.length) c.appendChild(secaoGaveta('Diretrizes relacionadas', h('div', { class: 'chips' }, dirs.map(d => h('button', { type: 'button', class: 'chip', onclick: e => abrirDiretriz(d.id, e.currentTarget) }, d.titulo)))));
    c.appendChild(secaoGaveta('Fontes', listaRefs(m.refs)));
    c.appendChild(secaoGaveta('Argumento pronto', h('blockquote', { class: 'argumento' }, m.argumento)));
    c.appendChild(h('div', { class: 'gaveta-acoes' },
      h('button', { type: 'button', class: 'btn btn-primario btn-p', onclick: () => copiar(m.argumento, 'Argumento copiado, com a referência.') }, 'Copiar argumento'),
      h('button', { type: 'button', class: 'btn btn-secundario btn-p', onclick: () => copiar(linkPara('mito/' + m.id), 'Link do mito copiado.') }, 'Copiar link')));
    return c;
  }
  function conteudoRef(id) {
    const r = ref(id); if (!r) return h('p', {}, 'Referência não encontrada.');
    const c = h('div', {});
    c.appendChild(h('div', { class: 'acoes-linha', style: 'margin-bottom:1rem' }, selo(r.selo), h('span', { class: 'etiqueta' }, r.tipo), h('span', { class: 'etiqueta' }, String(r.ano)), h('span', { class: 'etiqueta' }, r.acesso === 'aberto' ? 'Acesso aberto' : 'Acesso fechado')));
    c.appendChild(secaoGaveta('Referência', h('p', { class: 'ref-cite' }, r.cite)));
    c.appendChild(secaoGaveta('O que mostrou', h('p', {}, r.mostrou)));
    const usos = usosDaRef(r.id);
    c.appendChild(secaoGaveta('Como usamos', usos.length ? h('div', { class: 'chips' }, usos.map(d => h('button', { type: 'button', class: 'chip', onclick: e => abrirDiretriz(d.id, e.currentTarget) }, d.titulo))) : h('p', {}, 'Contexto da seção Por que importa e dos mitos.')));
    const mitos = D.MITOS.filter(m => m.refs.includes(r.id));
    if (mitos.length) c.appendChild(secaoGaveta('Mitos que sustenta', h('div', { class: 'chips' }, mitos.map(m => h('button', { type: 'button', class: 'chip', onclick: e => abrirMito(m.id, e.currentTarget) }, m.afirmacao)))));
    c.appendChild(h('div', { class: 'gaveta-acoes' },
      r.url ? h('a', { class: 'btn btn-primario btn-p', href: r.url, target: '_blank', rel: 'noopener noreferrer' }, 'Abrir fonte (nova aba)') : null,
      h('button', { type: 'button', class: 'btn btn-secundario btn-p', onclick: () => copiar(r.cite + (r.url ? ' ' + r.url : ''), 'Referência copiada.') }, 'Copiar referência'),
      h('button', { type: 'button', class: 'btn btn-secundario btn-p', onclick: () => copiar(linkPara('ref/' + r.id), 'Link copiado.') }, 'Copiar link')));
    return c;
  }
  function conteudoSelo(destaque) {
    const partes = String(destaque || '').split('/');
    const c = h('div', {});
    c.appendChild(h('p', {}, 'O selo vale para a afirmação, não para o estudo. Toda recomendação diz quão firme é a evidência que a sustenta.'));
    c.appendChild(h('ul', { class: 'selos-lista' }, Object.keys(D.SELOS).map(k => {
      const s = D.SELOS[k];
      return h('li', { style: partes.includes(k) ? 'background:var(--realce);border-radius:8px;padding:.5rem .6rem;margin:0 -.6rem' : '' }, selo(k), h('div', {}, h('p', {}, h('strong', {}, k === s.letra ? k + ' — ' + s.nome : s.nome.charAt(0).toUpperCase() + s.nome.slice(1)), '. ', s.significa), h('p', { style: 'color:var(--ink-2);font-size:.95rem' }, 'Exemplo: ', s.exemplo)));
    })));
    c.appendChild(h('div', { class: 'gaveta-acoes' }, h('a', { class: 'btn btn-secundario btn-p', href: '#sobre', 'data-nav': 'sobre' }, 'Ler o método completo')));
    return c;
  }
  function conteudoMais() {
    const c = h('div', { class: 'menu-mais' });
    const ico = d => h('svg', { viewBox: '0 0 24 24', 'aria-hidden': 'true', html: d });
    c.appendChild(h('a', { href: '#referencias', 'data-nav': 'referencias' }, ico('<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3zM5 4v16" fill="none" stroke="currentColor" stroke-width="2"/>'), 'Referências'));
    c.appendChild(h('a', { href: '#sobre', 'data-nav': 'sobre' }, ico('<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 11v6M12 7.5v.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'), 'Sobre e método'));
    c.appendChild(h('button', { type: 'button', onclick: () => { gaveta.fechar(); setTimeout(abrirBusca, 280); } }, ico('<circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 16l5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'), 'Buscar'));
    c.appendChild(h('button', { type: 'button', class: 'btn-texto-mais', onclick: alternarTexto }, h('span', { class: 'ctrl-aa', 'aria-hidden': 'true' }, 'A', h('small', {}, 'A')), 'Tamanho do texto'));
    c.appendChild(h('button', { type: 'button', onclick: () => { gaveta.fechar(); modoLeitura(true); } }, ico('<path d="M3 5.5h7a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H3zM21 5.5h-7a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h7z" fill="none" stroke="currentColor" stroke-width="2"/>'), 'Modo leitura'));
    c.appendChild(h('button', { type: 'button', onclick: e => abrirCorrecao(e.currentTarget) }, ico('<path d="M4 20l4-1 11-11-3-3L5 16z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>'), 'Sugerir correção'));
    c.appendChild(h('p', { style: 'font-family:var(--fonte-ui);font-size:.875rem;color:var(--ink-3);margin:.5rem 0 0' }, `Ergomino ${D.META.versaoSite} · ${D.META.versaoRegras} · nenhum dado é coletado.`));
    return c;
  }
  function conteudoCorrecao(contexto) {
    const c = h('form', { class: 'form-correcao', onsubmit: e => e.preventDefault() });
    const onde = h('input', { type: 'text', class: '', placeholder: 'ex.: Guia › Tipografia › "Meça a altura-x"', value: contexto || '' });
    const trecho = h('textarea', { placeholder: 'Copie o trecho que precisa de correção' });
    const correcao = h('textarea', { placeholder: 'O que deveria dizer, e por quê' });
    const fonte = h('input', { type: 'text', placeholder: 'Fonte que sustenta a correção (link ou referência)' });
    const saida = h('pre', { hidden: true });
    const gerar = () => `Sugestão de correção — Ergomino ${D.META.versaoSite} (${D.META.versaoRegras})\nOnde: ${onde.value || '—'}\nTrecho: ${trecho.value || '—'}\nCorreção: ${correcao.value || '—'}\nFonte: ${fonte.value || '—'}\nData: ${dataBR(hoje())}`;
    c.appendChild(h('p', {}, 'Nada é enviado automaticamente. O texto gerado vai para a sua área de transferência (ou para o seu e-mail, se a equipe tiver configurado um endereço) e você decide o que fazer com ele.'));
    c.appendChild(h('label', { class: 'campo' }, h('span', {}, 'Onde está'), onde));
    c.appendChild(h('label', { class: 'campo' }, h('span', {}, 'Trecho'), trecho));
    c.appendChild(h('label', { class: 'campo' }, h('span', {}, 'Correção sugerida'), correcao));
    c.appendChild(h('label', { class: 'campo' }, h('span', {}, 'Fonte'), fonte));
    c.appendChild(h('div', { class: 'gaveta-acoes' },
      h('button', { type: 'button', class: 'btn btn-primario btn-p', onclick: () => {
        const txt = gerar(); saida.textContent = txt; saida.hidden = false;
        if (D.META.contatoEmail) { window.location.href = `mailto:${D.META.contatoEmail}?subject=${encodeURIComponent('Sugestão de correção — Ergomino')}&body=${encodeURIComponent(txt)}`; toast('Abrindo seu programa de e-mail.'); }
        else copiar(txt, 'Sugestão copiada. Envie para a equipe pelo canal que preferir.');
      } }, D.META.contatoEmail ? 'Enviar por e-mail' : 'Gerar e copiar'),
      h('button', { type: 'button', class: 'btn btn-secundario btn-p', onclick: () => { saida.textContent = gerar(); saida.hidden = false; } }, 'Só visualizar')));
    c.appendChild(saida);
    return c;
  }

  function abrirDiretriz(id, abridor) { const d = diretriz(id); if (d) gaveta.abrir('Diretriz', d.titulo, conteudoDiretriz(id), abridor); }
  function abrirMito(id, abridor) { const m = porId(D.MITOS, id); if (m) gaveta.abrir('Mito · ' + m.veredito, m.afirmacao, conteudoMito(id), abridor); }
  function abrirRef(id, abridor) { const r = ref(id); if (r) gaveta.abrir('Referência', r.cite.split('.')[0] + ' (' + r.ano + ')', conteudoRef(id), abridor); }
  function abrirSelo(codigo, abridor) { gaveta.abrir('Selo de evidência', 'Como avaliamos', conteudoSelo(codigo), abridor); }
  function abrirMais(abridor) { gaveta.abrir('Ergomino', 'Mais', conteudoMais(), abridor); }
  function abrirCorrecao(abridor, contexto) { gaveta.abrir('Sobre e método', 'Sugerir correção', conteudoCorrecao(contexto), abridor); }

  function linkPara(rota) { return location.origin.startsWith('http') ? location.origin + location.pathname + '#' + rota : location.href.split('#')[0] + '#' + rota; }

  // ---------- veredito ----------
  function veredito(v) {
    const cls = { 'Falso': 'falso', 'Depende': 'depende', 'Não comprovado': 'nao-comprovado', 'Verdadeiro': 'verdadeiro' }[v] || 'depende';
    return h('span', { class: 'veredito veredito-' + cls }, v);
  }

  // ---------- Início ----------
  function renderInicio() {
    $('#dados-inicio').replaceChildren(...D.DADOS_INICIO.map(d => h('article', { class: 'dado' },
      h('p', { class: 'dado-numero' }, d.numero),
      h('p', { class: 'dado-frase' }, d.frase),
      h('p', { class: 'dado-fonte' }, h('button', { type: 'button', class: 'link-botao', onclick: e => abrirRef(d.ref, e.currentTarget) }, d.fonte), ', ' + d.ano))));

    $('#fases-inicio').replaceChildren(...D.ESTAGIOS.map(e => h('article', { class: 'fase' },
      h('h3', {}, e.nome), h('span', { class: 'fase-idade' }, 'Idade típica: ' + e.idade),
      h('p', { class: 'fase-curto' }, e.curto),
      h('span', { class: 'fase-xh' }, 'Altura-x ' + R.faixa(D.BASE[e.id].xh, 'mm') + ' · entrelinha ' + R.faixa(D.BASE[e.id].lead, '', 2)),
      h('button', { type: 'button', class: 'btn btn-secundario btn-p', onclick: () => ferramenta.presetEstagio(e.id) }, 'Ajustar na ferramenta'))));

    $('#temas-inicio').replaceChildren(...D.TEMAS.map(t => h('a', { class: 'tema-atalho', href: '#guia/' + t.id, onclick: ev => { ev.preventDefault(); guia.mostrarTema(t.id, true); } }, h('strong', {}, t.nome), h('span', {}, t.resumo))));

    const m = porId(D.MITOS, 'mito-fonte-dislexia');
    $('#mito-destaque').replaceChildren(cartaoMito(m));

    $('#selos-inicio').replaceChildren(...['A', 'B', 'C', 'D', 'Mito', 'Norma', 'Dado'].map(k => selo(k)));
  }

  function cartaoMito(m) {
    return h('button', { type: 'button', class: 'cartao', onclick: e => abrirMito(m.id, e.currentTarget), 'aria-label': `${m.afirmacao}. Veredito: ${m.veredito}. Abrir evidência e argumento` },
      h('span', { class: 'cartao-topo' }, h('span', { class: 'cartao-tema' }, (tema(m.tema) || {}).nome || ''), veredito(m.veredito)),
      h('span', { class: 'cartao h3', role: 'presentation', style: 'display:contents' }, h('h3', {}, '“' + m.afirmacao + '”')),
      h('span', { class: 'cartao-base' }, 'Base: ' + m.refs.map(id => { const r = ref(id); return r ? r.cite.split('(')[0].trim().replace(/,\s*$/, '') + ' ' + r.ano : id; }).join('; ')),
      h('span', { class: 'cartao-acao' }, 'Ver evidência e argumento'));
  }

  // ---------- Guia ----------
  const guia = {
    tema: 'tipografia', estagio: 'todos', suporte: 'todos',
    init() {
      this.renderFiltros(); this.renderAbas(); this.renderPainel();
    },
    renderFiltros() {
      const f = $('#guia-filtros');
      const grupo = (rotulo, opcoes, atual, onsel) => h('div', { class: 'chip-grupo', role: 'group', 'aria-label': rotulo }, h('span', { class: 'chip-rotulo' }, rotulo), opcoes.map(o => h('button', { type: 'button', class: 'chip', 'aria-pressed': String(o.id === atual), onclick: () => onsel(o.id) }, o.nome)));
      f.replaceChildren(
        grupo('Fase do leitor', [{ id: 'todos', nome: 'Todas' }].concat(D.ESTAGIOS.map(e => ({ id: e.id, nome: e.nome }))), this.estagio, id => { this.estagio = id; this.renderFiltros(); this.renderPainel(); }),
        grupo('Suporte', [{ id: 'todos', nome: 'Todos' }, { id: 'impresso', nome: 'Impresso' }, { id: 'pdf', nome: 'PDF em tela' }, { id: 'epub', nome: 'E-book refluível' }, { id: 'hibrido', nome: 'Impresso + digital' }], this.suporte, id => { this.suporte = id; this.renderFiltros(); this.renderPainel(); }));
    },
    renderAbas() {
      const abas = $('#guia-abas');
      abas.replaceChildren(...D.TEMAS.map(t => h('button', { type: 'button', role: 'tab', id: 'aba-' + t.id, 'aria-selected': String(t.id === this.tema), 'aria-controls': 'guia-painel', tabindex: t.id === this.tema ? '0' : '-1', onclick: () => this.mostrarTema(t.id, false), onkeydown: e => this.tecladoAbas(e, t.id) }, t.nome)));
    },
    tecladoAbas(e, id) {
      const ids = D.TEMAS.map(t => t.id); let i = ids.indexOf(id);
      if (e.key === 'ArrowRight') i = (i + 1) % ids.length; else if (e.key === 'ArrowLeft') i = (i - 1 + ids.length) % ids.length; else if (e.key === 'Home') i = 0; else if (e.key === 'End') i = ids.length - 1; else return;
      e.preventDefault(); this.mostrarTema(ids[i], false); $('#aba-' + ids[i]).focus();
    },
    mostrarTema(id, rolar) {
      this.tema = id; this.renderAbas(); this.renderPainel();
      history.replaceState(null, '', '#guia/' + id);
      if (rolar) irPara('guia', { semHash: true });
    },
    filtra(d) {
      const v = d.vale || {};
      if (this.estagio !== 'todos' && v.estagios && !v.estagios.includes(this.estagio)) return false;
      if (this.suporte !== 'todos' && v.suportes && !v.suportes.includes(this.suporte)) return false;
      return true;
    },
    renderPainel() {
      const t = tema(this.tema); const painel = $('#guia-painel');
      painel.setAttribute('aria-labelledby', 'aba-' + t.id);
      const dirs = D.DIRETRIZES.filter(d => d.tema === t.id);
      const visiveis = dirs.filter(d => this.filtra(d));
      const partes = [];
      partes.push(h('h3', {}, 'Regras de ouro'));
      partes.push(h('ol', { class: 'regras-ouro' }, t.regras.map(r => h('li', {}, r))));
      if (t.id === 'tipografia' || t.id === 'espacamento') {
        partes.push(h('h3', {}, 'Valores por fase'));
        partes.push(tabelaBase(t.id === 'tipografia' ? ['xh', 'serif', 'sans'] : ['lead', 'cpl', 'alinh', 'hifen', 'quebra', 'densidade'], this.estagio === 'todos' ? null : this.estagio));
        partes.push(h('p', { class: 'nota-tabela' }, t.id === 'tipografia'
          ? frag('Selo ', selo('B', { curto: true }), ' para a altura-x dos 5 aos 9 anos (Hughes & Wilkins 2000; Wilkins et al. 2009); ', selo('C', { curto: true }), ' para os demais valores, que são calibração editorial e devem ser conferidos medindo livros de referência. Conversão: corpo (pt) ≈ altura-x (mm) ÷ (0,3528 × r), com r = altura-x ÷ corpo da fonte escolhida.')
          : frag('Selo ', selo('B', { curto: true }), ' para a quebra por sentido (LeVasseur et al. 2006); ', selo('C', { curto: true }), ' para os demais valores. Impresso, texto corrido.')));
      }
      partes.push(h('h3', {}, `Diretrizes (${visiveis.length}${visiveis.length !== dirs.length ? ' de ' + dirs.length : ''})`));
      if (!visiveis.length) partes.push(h('p', { class: 'bloco-nota' }, 'Nenhuma diretriz deste tema vale para a combinação de fase e suporte escolhida. ', h('button', { type: 'button', class: 'link-botao', onclick: () => { this.estagio = 'todos'; this.suporte = 'todos'; this.renderFiltros(); this.renderPainel(); } }, 'Limpar filtros')));
      else partes.push(h('div', { class: 'diretrizes' }, visiveis.map(d => this.cartaoDiretriz(d))));
      partes.push(h('h3', {}, 'Erros comuns'));
      partes.push(h('ul', { class: 'erros' }, t.erros.map(e => h('li', {}, e))));
      painel.replaceChildren(...partes);
    },
    cartaoDiretriz(d) {
      const det = h('details', { class: 'diretriz', id: 'dir-' + d.id },
        h('summary', {}, h('span', { class: 'diretriz-titulo' }, d.titulo), h('span', { class: 'diretriz-meta' }, selo(d.selo))),
        h('div', { class: 'diretriz-corpo' },
          h('div', {}, h('span', { class: 'rotulo' }, 'Recomendação'), h('p', {}, d.rec)),
          h('div', {}, h('span', { class: 'rotulo' }, 'Por quê'), h('p', {}, d.porque)),
          h('div', {}, h('span', { class: 'rotulo' }, 'Vale para'), valePara(d)),
          d.exemplo ? h('div', {}, h('span', { class: 'rotulo' }, 'Exemplo'), h('div', { class: 'antes-depois' }, h('div', {}, h('span', { class: 'rotulo' }, 'Antes'), d.exemplo.antes), h('div', {}, h('span', { class: 'rotulo' }, 'Depois'), d.exemplo.depois))) : null,
          h('div', { class: 'acoes-linha' },
            h('button', { type: 'button', class: 'btn btn-secundario btn-p', onclick: e => abrirDiretriz(d.id, e.currentTarget) }, `Fontes e relacionadas (${d.refs.length + (d.relacionadas || []).length})`),
            h('button', { type: 'button', class: 'btn btn-secundario btn-p', onclick: () => copiar(linkPara('diretriz/' + d.id), 'Link da diretriz copiado.') }, 'Copiar link'),
            h('span', { class: 'etiqueta' }, 'Revisado em ' + dataBR(d.revisado)))));
      return det;
    }
  };

  function mostrarNoGuia(idDiretriz) {
    const d = diretriz(idDiretriz); if (!d) return;
    guia.estagio = 'todos'; guia.suporte = 'todos'; guia.renderFiltros();
    guia.mostrarTema(d.tema, false);
    irPara('guia', { semHash: true });
    setTimeout(() => { const det = document.getElementById('dir-' + d.id); if (det) { det.open = true; det.scrollIntoView({ behavior: movReduzido() ? 'auto' : 'smooth', block: 'center' }); det.querySelector('summary').focus({ preventScroll: true }); } }, movReduzido() ? 0 : 450);
  }


  // ---------- Mitos ----------
  const mitos = {
    tema: 'todos', veredito: 'todos',
    init() { this.render(); },
    render() {
      const temasPresentes = Array.from(new Set(D.MITOS.map(m => m.tema))).map(id => tema(id)).filter(Boolean);
      const vereditos = ['Falso', 'Depende', 'Não comprovado'];
      const grupo = (rotulo, opcoes, atual, onsel) => h('div', { class: 'chip-grupo', role: 'group', 'aria-label': rotulo }, h('span', { class: 'chip-rotulo' }, rotulo), opcoes.map(o => h('button', { type: 'button', class: 'chip', 'aria-pressed': String(o.id === atual), onclick: () => onsel(o.id) }, o.nome)));
      $('#mitos-filtros').replaceChildren(
        grupo('Tema', [{ id: 'todos', nome: 'Todos' }].concat(temasPresentes.map(t => ({ id: t.id, nome: t.nome }))), this.tema, id => { this.tema = id; this.render(); }),
        grupo('Veredito', [{ id: 'todos', nome: 'Todos' }].concat(vereditos.map(v => ({ id: v, nome: v }))), this.veredito, id => { this.veredito = id; this.render(); }));
      const lista = D.MITOS.filter(m => (this.tema === 'todos' || m.tema === this.tema) && (this.veredito === 'todos' || m.veredito === this.veredito));
      $('#mitos-lista').replaceChildren(...(lista.length ? lista.map(cartaoMito) : [h('p', { class: 'bloco-nota' }, 'Nenhum mito com esse filtro.')]));
    }
  };

  // ---------- Referências ----------
  const LIMITE_REFS = 5; // referências visíveis antes de "Ver mais"
  const referencias = {
    tema: 'todos', selo: 'todos', tipo: 'todos', busca: '', expandido: false, assinatura: null,
    init() {
      $('#ref-busca').addEventListener('input', e => { this.busca = e.target.value; this.renderLista(); });
      this.renderFiltros(); this.renderLista();
    },
    renderFiltros() {
      const tipos = Array.from(new Set(D.REFERENCIAS.map(r => r.tipo)));
      const grupo = (rotulo, opcoes, atual, onsel) => h('div', { class: 'chip-grupo', role: 'group', 'aria-label': rotulo }, h('span', { class: 'chip-rotulo' }, rotulo), opcoes.map(o => h('button', { type: 'button', class: 'chip', 'aria-pressed': String(o.id === atual), onclick: () => onsel(o.id) }, o.nome)));
      $('#ref-filtros').replaceChildren(
        grupo('Tema', [{ id: 'todos', nome: 'Todos' }].concat(D.TEMAS.map(t => ({ id: t.id, nome: t.nome }))), this.tema, id => { this.tema = id; this.renderFiltros(); this.renderLista(); }),
        grupo('Selo', [{ id: 'todos', nome: 'Todos' }].concat(['A', 'B', 'C', 'D', 'Norma', 'Dado'].map(s => ({ id: s, nome: s }))), this.selo, id => { this.selo = id; this.renderFiltros(); this.renderLista(); }),
        grupo('Tipo', [{ id: 'todos', nome: 'Todos' }].concat(tipos.map(t => ({ id: t, nome: t.charAt(0).toUpperCase() + t.slice(1) }))), this.tipo, id => { this.tipo = id; this.renderFiltros(); this.renderLista(); }));
    },
    renderLista() {
      const q = normaliza(this.busca.trim());
      const lista = D.REFERENCIAS.filter(r => (this.tema === 'todos' || r.tema.includes(this.tema)) && (this.selo === 'todos' || r.selo === this.selo) && (this.tipo === 'todos' || r.tipo === this.tipo) && (!q || normaliza(r.cite + ' ' + r.mostrou + ' ' + r.tema.map(t => (tema(t) || {}).nome).join(' ') + ' ' + r.tipo).includes(q)))
        .sort((a, b) => b.ano - a.ano);
      // Mudou o filtro ou a busca: volta a mostrar só as primeiras.
      const assinatura = [this.tema, this.selo, this.tipo, q].join('|');
      if (assinatura !== this.assinatura) { this.assinatura = assinatura; this.expandido = false; }
      const visiveis = this.expandido ? lista : lista.slice(0, LIMITE_REFS);
      const restantes = lista.length - visiveis.length;
      $('#ref-contagem').textContent = `${lista.length} de ${D.REFERENCIAS.length} referências`;
      $('#ref-lista').replaceChildren(...(lista.length ? visiveis.map(r => this.item(r)) : [h('li', { class: 'bloco-nota' }, 'Nenhuma referência com esse filtro. ', h('button', { type: 'button', class: 'link-botao', onclick: () => { this.tema = 'todos'; this.selo = 'todos'; this.tipo = 'todos'; this.busca = ''; $('#ref-busca').value = ''; this.renderFiltros(); this.renderLista(); } }, 'Limpar filtros'))]));
      $('#ref-mais').replaceChildren(...(restantes > 0 ? [h('button', { type: 'button', class: 'btn btn-secundario', onclick: () => this.verMais() }, `Ver mais (${restantes} ${restantes === 1 ? 'restante' : 'restantes'})`)] : []));
    },
    verMais() {
      this.expandido = true; this.renderLista();
      // O botão some ao expandir: o foco vai para a primeira referência recém-revelada.
      const primeira = $('#ref-lista').children[LIMITE_REFS];
      if (primeira) { primeira.setAttribute('tabindex', '-1'); primeira.focus({ preventScroll: true }); }
    },
    item(r) {
      const usos = usosDaRef(r.id);
      return h('li', { class: 'ref', id: 'ref-' + r.id },
        h('div', { class: 'ref-topo' }, selo(r.selo), h('span', { class: 'etiqueta' }, r.tipo), h('span', { class: 'etiqueta' }, String(r.ano)), h('span', { class: 'etiqueta' }, r.acesso === 'aberto' ? 'Acesso aberto' : 'Acesso fechado')),
        h('p', { class: 'ref-cite' }, r.cite),
        h('p', { class: 'ref-mostrou' }, h('strong', {}, 'O que mostrou'), r.mostrou),
        h('div', { class: 'ref-usos' }, h('span', {}, 'Como usamos:'), usos.length ? usos.slice(0, 4).map(d => h('button', { type: 'button', class: 'link-botao', onclick: e => abrirDiretriz(d.id, e.currentTarget) }, d.titulo)) : h('span', {}, 'contexto e mitos'), usos.length > 4 ? h('button', { type: 'button', class: 'link-botao', onclick: e => abrirRef(r.id, e.currentTarget) }, `e mais ${usos.length - 4}`) : null),
        h('div', { class: 'ref-acoes' },
          r.url ? h('a', { class: 'btn btn-secundario btn-p', href: r.url, target: '_blank', rel: 'noopener noreferrer' }, 'Abrir fonte (nova aba)') : null,
          h('button', { type: 'button', class: 'btn btn-secundario btn-p', onclick: () => copiar(r.cite + (r.url ? ' ' + r.url : ''), 'Referência copiada.') }, 'Copiar referência'),
          h('button', { type: 'button', class: 'btn btn-secundario btn-p', onclick: e => abrirRef(r.id, e.currentTarget) }, 'Detalhes')));
    }
  };

  // ---------- Sobre ----------
  function renderSobre() {
    $('#selos-sobre').replaceChildren(...Object.keys(D.SELOS).map(k => { const s = D.SELOS[k]; return h('li', {}, selo(k), h('p', {}, s.significa), h('p', { class: 'selo-exemplo' }, 'Ex.: ' + s.exemplo)); }));
    $('#historico').replaceChildren(...D.HISTORICO.map(hi => h('li', {}, h('strong', {}, hi.versao), ' · ', dataBR(hi.data), ' — ', hi.nota)));
    $('#rodape-versao').textContent = `${D.META.versaoSite} · ${D.META.versaoRegras}`;
    const t = $('#rodape-data'); t.textContent = dataBR(D.META.revisadoEm); t.setAttribute('datetime', D.META.revisadoEm);
    $('#btn-apagar-dados').addEventListener('click', () => { Object.values(CHAVES).forEach(k => store.del(k)); ferramenta.renderSalvos(); toast('Tudo que estava salvo neste navegador foi apagado.'); });
    $('#btn-correcao').addEventListener('click', e => abrirCorrecao(e.currentTarget));
    $('#btn-correcao-rodape').addEventListener('click', e => abrirCorrecao(e.currentTarget));
  }

  // ---------- Ferramenta: Monte seu leitor ----------
  const novoPerfil = () => ({ idade: '', estagio: '', publicacao: '', suporte: '', modo: '', engajamento: '', acesso: [], objetivo: '', restricoes: {} });
  const ferramenta = {
    perfis: { A: novoPerfil(), B: null }, alvo: 'A', passo: 0, comparando: false, nomes: { A: 'Perfil A', B: 'Perfil B' },
    pxPorMm: store.get(CHAVES.pxmm, 96 / 25.4), fonte: store.get(CHAVES.fonte, 'serif'), checks: {}, salvandoAberto: false,
    get perfil() { return this.perfis[this.alvo]; },
    init() {
      $('#exemplos').replaceChildren(...D.EXEMPLOS.map(ex => h('button', { type: 'button', class: 'chip', title: ex.descricao, onclick: () => this.carregarExemplo(ex) }, ex.id + '. ' + ex.nome)));
      $('#btn-anterior').addEventListener('click', () => this.irPasso(this.passo - 1));
      $('#btn-proxima').addEventListener('click', () => { if (this.passo >= D.PERGUNTAS.length - 1) { this.irFicha(); } else this.irPasso(this.passo + 1); });
      $$('#alvo-perfil [role="radio"]').forEach(b => b.addEventListener('click', () => this.trocarAlvo(b.dataset.alvo)));
      const fmt = $('#r-formato'); fmt.replaceChildren(...D.FORMATOS.map(f => h('option', { value: f.id }, f.rotulo)));
      const pap = $('#r-papel'); pap.replaceChildren(...D.PAPEIS.map(p => h('option', { value: p.id }, p.rotulo)));
      [['r-formato', 'formato'], ['r-paginas', 'paginas'], ['r-cores', 'cores'], ['r-papel', 'papel'], ['r-palavras', 'palavras']].forEach(([id, campo]) => {
        $('#' + id).addEventListener('input', e => { this.perfil.restricoes[campo] = e.target.value; this.renderFicha(); });
      });
      this.renderTudo();
    },
    renderTudo() { this.renderPassos(); this.renderPergunta(); this.renderRestricoes(); this.renderAcoes(); this.renderFicha(); },
    irPasso(n) { this.passo = Math.max(0, Math.min(D.PERGUNTAS.length - 1, n)); this.renderPassos(); this.renderPergunta(); const foco = $('#pergunta-atual h3'); if (foco) foco.focus({ preventScroll: true }); },
    irFicha() { const f = $('#ficha'); if (celular()) f.scrollIntoView({ behavior: movReduzido() ? 'auto' : 'smooth', block: 'start' }); const t = f.querySelector('h3'); if (t) { t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: !celular() }); } },
    respondida(p, perfil) { const v = perfil[p.id]; return p.tipo === 'multipla' ? Array.isArray(v) && v.length > 0 : !!v; },
    faltam(perfil) { return D.PERGUNTAS.filter(p => !this.respondida(p, perfil)); },
    trocarAlvo(a) { this.alvo = a; $$('#alvo-perfil [role="radio"]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.alvo === a))); this.renderPassos(); this.renderPergunta(); this.renderRestricoes(); },
    renderPassos() {
      const ol = $('#passos');
      ol.replaceChildren(...D.PERGUNTAS.map((p, i) => h('li', {}, h('button', { type: 'button', class: this.respondida(p, this.perfil) ? 'respondida' : '', 'aria-current': i === this.passo ? 'step' : null, 'aria-label': `Pergunta ${p.n}: ${p.texto}${this.respondida(p, this.perfil) ? ' (respondida)' : ''}`, onclick: () => this.irPasso(i) }, String(p.n)))));
      $('#progresso').textContent = `Pergunta ${this.passo + 1} de ${D.PERGUNTAS.length}` + (this.comparando ? ` · ${this.nomes[this.alvo]}` : '');
      $('#btn-anterior').disabled = this.passo === 0;
      $('#btn-proxima').textContent = this.passo >= D.PERGUNTAS.length - 1 ? 'Ver a ficha' : 'Próxima';
    },
    renderPergunta() {
      const p = D.PERGUNTAS[this.passo]; const perfil = this.perfil; const cont = $('#pergunta-atual');
      const nomeGrupo = 'q-' + p.id + '-' + this.alvo;
      const opcoes = h('ul', { class: 'opcoes' + (p.opcoes.length > 6 ? ' duas' : ''), role: p.tipo === 'multipla' ? 'group' : 'radiogroup', 'aria-labelledby': 'pergunta-titulo' }, p.opcoes.map(o => {
        const marcado = p.tipo === 'multipla' ? (perfil.acesso || []).includes(o.id) : perfil[p.id] === o.id;
        const input = h('input', { type: p.tipo === 'multipla' ? 'checkbox' : 'radio', name: nomeGrupo, value: o.id, checked: marcado, onchange: e => this.responder(p, o.id, e.target.checked) });
        return h('li', {}, h('label', { class: 'opcao' }, input, h('span', {}, h('span', { class: 'opcao-rotulo' }, o.rotulo), o.nota ? h('span', { class: 'opcao-nota' }, o.nota) : null)));
      }));
      let nota = null;
      if (p.id === 'estagio' && perfil.idade && perfil.estagio && perfil.estagio !== 'nao-sei') {
        const tip = porId(D.IDADES, perfil.idade); if (tip && tip.estagio === perfil.estagio && this.sugerido) nota = h('p', { class: 'campo-ajuda' }, `Sugerido pela idade (${tip.rotulo}). Confirme ou troque: o estágio pesa mais que a idade.`);
      }
      cont.replaceChildren(frag(
        h('h3', { id: 'pergunta-titulo', tabindex: '-1' }, p.texto),
        h('details', { class: 'porque' }, h('summary', {}, 'Por que perguntamos isso?'), h('p', {}, p.porque)),
        nota, opcoes));
    },
    responder(p, valor, marcado) {
      const perfil = this.perfil;
      if (p.tipo === 'multipla') {
        let lista = (perfil.acesso || []).slice();
        if (valor === 'nenhuma') lista = marcado ? ['nenhuma'] : [];
        else { lista = lista.filter(x => x !== 'nenhuma'); if (marcado) { if (!lista.includes(valor)) lista.push(valor); } else lista = lista.filter(x => x !== valor); }
        perfil.acesso = lista;
        this.renderPergunta();
      } else {
        perfil[p.id] = valor;
        if (p.id === 'idade' && (!perfil.estagio || this.sugerido)) { const tip = porId(D.IDADES, valor); if (tip) { perfil.estagio = tip.estagio; this.sugerido = true; } }
        if (p.id === 'estagio') this.sugerido = false;
        this.renderPergunta();
        if (p.tipo === 'unica' && this.passo < D.PERGUNTAS.length - 1 && !celular()) { /* avanço manual: o botão Próxima fica em destaque */ }
      }
      this.renderPassos(); this.renderFicha(); this.renderAcoes();
    },
    renderRestricoes() {
      const r = this.perfil.restricoes || {};
      $('#r-formato').value = r.formato || ''; $('#r-paginas').value = r.paginas || ''; $('#r-cores').value = r.cores || ''; $('#r-papel').value = r.papel || ''; $('#r-palavras').value = r.palavras || '';
    },
    carregarExemplo(ex) {
      this.perfis[this.alvo] = JSON.parse(JSON.stringify(ex.perfil)); this.nomes[this.alvo] = ex.id + '. ' + ex.nome; this.sugerido = false; this.passo = D.PERGUNTAS.length - 1;
      this.renderTudo(); toast(`Exemplo ${ex.id} carregado em ${this.alvo === 'A' ? 'Perfil A' : 'Perfil B'}.`);
      if (celular()) this.irFicha();
    },
    carregarPerfil(perfil, nome) {
      this.perfis.A = Object.assign(novoPerfil(), perfil, { acesso: perfil.acesso || [], restricoes: perfil.restricoes || {} }); this.alvo = 'A'; this.nomes.A = nome || 'Perfil A'; this.sugerido = false;
      this.passo = this.faltam(this.perfis.A).length ? D.PERGUNTAS.indexOf(this.faltam(this.perfis.A)[0]) : D.PERGUNTAS.length - 1;
      this.renderTudo();
    },
    presetEstagio(estagioId) {
      const idadeTipica = D.IDADES.find(i => i.estagio === estagioId) || D.IDADES[0];
      this.perfis[this.alvo] = Object.assign(novoPerfil(), { idade: idadeTipica.id, estagio: estagioId }); this.sugerido = false; this.passo = 2;
      this.renderTudo(); irPara('ferramenta'); toast(`Estágio ${nomeEstagio(estagioId).toLowerCase()} pré-selecionado. Continue nas perguntas 3 a 8.`);
    },
    novo() { this.perfis.A = novoPerfil(); this.perfis.B = null; this.comparando = false; this.alvo = 'A'; this.nomes = { A: 'Perfil A', B: 'Perfil B' }; this.passo = 0; this.sugerido = false; $('#alvo-perfil').hidden = true; this.renderTudo(); toast('Novo perfil. Comece pela pergunta 1.'); },
    comparar() {
      if (this.comparando) { this.comparando = false; this.perfis.B = null; this.alvo = 'A'; $('#alvo-perfil').hidden = true; this.trocarAlvo('A'); this.renderAcoes(); this.renderFicha(); return; }
      this.comparando = true; this.perfis.B = JSON.parse(JSON.stringify(this.perfis.A)); this.nomes.B = 'Perfil B'; $('#alvo-perfil').hidden = false; this.trocarAlvo('B'); this.passo = 0; this.renderPassos(); this.renderPergunta(); this.renderAcoes(); this.renderFicha();
      toast('Perfil B criado como cópia do A. Mude as respostas do B; as diferenças ficam destacadas.');
    },
    renderAcoes() {
      const completoA = R.perfilCompleto(this.perfis.A);
      const acoes = $('#ficha-acoes');
      acoes.replaceChildren(
        h('button', { type: 'button', class: 'btn btn-secundario btn-p', onclick: () => this.comparar(), 'aria-pressed': String(this.comparando) }, this.comparando ? 'Encerrar comparação' : 'Comparar com outro perfil'),
        h('button', { type: 'button', class: 'btn btn-secundario btn-p', disabled: !completoA, onclick: () => { this.salvandoAberto = !this.salvandoAberto; this.renderFicha(); } }, 'Salvar no navegador'),
        h('button', { type: 'button', class: 'btn btn-secundario btn-p', disabled: !completoA, onclick: () => this.exportarPDF() }, 'Exportar PDF'),
        h('button', { type: 'button', class: 'btn btn-secundario btn-p', disabled: !completoA, onclick: () => copiar(linkPara('ferramenta?' + R.codificar(this.perfis.A)), 'Link do perfil copiado. Ele guarda só as respostas, nenhum dado pessoal.') }, 'Copiar link'),
        h('button', { type: 'button', class: 'btn btn-secundario btn-p', onclick: () => this.novo() }, 'Novo perfil'));
    },
    exportarPDF() {
      document.body.classList.add('print-ficha');
      const limpar = () => document.body.classList.remove('print-ficha');
      window.addEventListener('afterprint', limpar, { once: true });
      toast('Na janela de impressão, escolha "Salvar como PDF".');
      setTimeout(() => { window.print(); setTimeout(limpar, 1500); }, 60);
    },
    salvarComo(nome) {
      const lista = store.get(CHAVES.perfis, []);
      const item = { nome: nome.trim() || this.nomes.A, perfil: this.perfis.A, data: hoje(), versao: D.META.versaoRegras };
      const i = lista.findIndex(x => x.nome === item.nome); if (i >= 0) lista[i] = item; else lista.push(item);
      store.set(CHAVES.perfis, lista); this.nomes.A = item.nome; this.salvandoAberto = false; this.renderFicha(); toast(`"${item.nome}" salvo neste navegador.`);
    },
    renderSalvos() {
      const lista = store.get(CHAVES.perfis, []);
      const cont = $('#perfis-salvos'); if (!cont) return;
      cont.replaceChildren(...(lista.length ? lista.map(it => h('li', {}, h('strong', {}, it.nome), h('span', { class: 'etiqueta' }, dataBR(it.data)),
        h('button', { type: 'button', class: 'btn btn-secundario btn-p', onclick: () => { this.carregarPerfil(it.perfil, it.nome); toast(`"${it.nome}" carregado.`); } }, 'Carregar'),
        h('button', { type: 'button', class: 'btn btn-secundario btn-p', onclick: () => copiar(linkPara('ferramenta?' + R.codificar(it.perfil)), 'Link copiado.') }, 'Copiar link'),
        h('button', { type: 'button', class: 'btn btn-secundario btn-p', onclick: () => { store.set(CHAVES.perfis, lista.filter(x => x.nome !== it.nome)); this.renderSalvos(); toast(`"${it.nome}" excluído.`); } }, 'Excluir'))) : [h('li', { style: 'border:0;color:var(--ink-2)' }, 'Nenhum perfil salvo neste navegador.')]));
    },
    renderFicha() {
      const cont = $('#ficha');
      const partes = [];
      if (this.salvandoAberto) {
        const campo = h('input', { type: 'text', id: 'nome-perfil', value: this.nomes.A === 'Perfil A' ? '' : this.nomes.A, placeholder: 'ex.: Coleção Primeiros Passos, vol. 2', onkeydown: e => { if (e.key === 'Enter') { e.preventDefault(); this.salvarComo(campo.value); } } });
        partes.push(h('div', { class: 'salvar-inline' }, h('label', { class: 'campo' }, h('span', {}, 'Nome do perfil (fica só neste navegador)'), campo), h('button', { type: 'button', class: 'btn btn-primario', onclick: () => this.salvarComo(campo.value) }, 'Salvar'), h('button', { type: 'button', class: 'btn btn-secundario', onclick: () => { this.salvandoAberto = false; this.renderFicha(); } }, 'Cancelar')));
        setTimeout(() => campo.focus(), 0);
      }
      const salvos = store.get(CHAVES.perfis, []);
      if (salvos.length) { partes.push(h('details', { style: 'margin-bottom:1rem' }, h('summary', { style: 'cursor:pointer;font-weight:650;min-height:36px;display:flex;align-items:center' }, `Perfis salvos neste navegador (${salvos.length})`), h('ul', { class: 'perfis-salvos', id: 'perfis-salvos' }))); }
      if (this.comparando && this.perfis.B) {
        partes.push(h('div', { class: 'comparar-grid' }, this.fichaDe('A', this.perfis.B), this.fichaDe('B', this.perfis.A)));
      } else partes.push(this.fichaDe('A', null));
      cont.replaceChildren(...partes);
      this.renderSalvos();
    },
    fichaDe(alvo, outro) {
      const perfil = this.perfis[alvo];
      const faltam = this.faltam(perfil);
      if (!perfil.idade && !perfil.estagio) {
        return h('div', { class: this.comparando ? 'ficha' : 'ficha-vazia' }, h('h3', {}, this.comparando ? this.nomes[alvo] : 'Sua ficha aparece aqui'), h('p', {}, 'Responda às perguntas ao lado. A ficha se monta a cada resposta e, no fim, você pode exportar em PDF, copiar o link ou comparar com outro perfil.'), h('ul', {}, h('li', {}, 'Faixas de valores, não um número só.'), h('li', {}, 'Cada linha com selo de evidência e link para a diretriz.'), h('li', {}, 'Nenhum dado sai do seu navegador.')));
      }
      const ficha = R.montarFicha(perfil);
      const fichaOutro = outro && (outro.idade || outro.estagio) ? R.montarFicha(outro) : null;
      const valoresOutro = {};
      if (fichaOutro) fichaOutro.blocos.forEach(b => b.linhas.forEach(l => { valoresOutro[b.id + '|' + l.param] = l.valor; }));
      const el = h('div', { class: this.comparando ? 'ficha' : '' });
      el.appendChild(h('div', { class: 'ficha-cabecalho' }, h('h3', {}, this.nomes[alvo]), h('p', { class: 'ficha-meta' }, `Ficha de editoração · ${dataBR(hoje())} · ${ficha.versao}`)));
      el.appendChild(h('div', { class: 'ficha-resumo' }, D.PERGUNTAS.map((p, i) => {
        const v = perfil[p.id]; let texto;
        if (p.tipo === 'multipla') texto = (v || []).map(x => (p.opcoes.find(o => o.id === x) || {}).rotulo || x).join(', ');
        else texto = (p.opcoes.find(o => o.id === v) || {}).rotulo;
        return h('span', { class: 'etiqueta' }, h('button', { type: 'button', 'aria-label': `${p.texto} ${texto || 'sem resposta'}. Ir para a pergunta ${p.n}`, onclick: () => { if (this.comparando) this.trocarAlvo(alvo); this.irPasso(i); if (celular()) $('#perguntas').scrollIntoView({ behavior: movReduzido() ? 'auto' : 'smooth' }); } }, texto || ('Pergunta ' + p.n + ': sem resposta')));
      })));
      const alertas = ficha.alertas.slice();
      if (faltam.length) alertas.unshift({ nivel: 'aviso', texto: `Prévia parcial: faltam as perguntas ${faltam.map(p => p.n).join(', ')}. A ficha usa valores neutros para o que ainda não foi respondido.` });
      if (alertas.length) el.appendChild(h('div', { class: 'alertas' }, alertas.map(a => h('div', { class: 'alerta alerta-' + a.nivel, role: a.nivel === 'conflito' ? 'alert' : null }, h('span', { class: 'alerta-icone', 'aria-hidden': 'true' }, a.nivel === 'conflito' ? '!' : a.nivel === 'aviso' ? '!' : 'i'), h('p', {}, h('span', { class: 'so-leitor' }, a.nivel === 'conflito' ? 'Conflito: ' : a.nivel === 'aviso' ? 'Aviso: ' : 'Nota: '), a.texto, a.link && diretriz(a.link) ? frag(' ', h('button', { type: 'button', class: 'link-botao', onclick: e => abrirDiretriz(a.link, e.currentTarget) }, 'Ver diretriz')) : null)))));
      ficha.blocos.forEach(b => {
        const bloco = h('div', { class: 'bloco-ficha' }, h('h4', {}, b.titulo));
        b.linhas.forEach(l => {
          const difere = fichaOutro && valoresOutro[b.id + '|' + l.param] !== l.valor;
          bloco.appendChild(h('div', { class: 'linha-ficha' + (difere ? ' diferente' : '') },
            h('span', { class: 'linha-param' }, l.param, difere ? h('span', { class: 'so-leitor' }, ' (diferente do outro perfil)') : null),
            h('p', { class: 'linha-valor' }, l.valor),
            h('p', { class: 'linha-porque' }, l.porque),
            h('div', { class: 'linha-rodape' }, selo(l.selo), diretriz(l.link) ? h('button', { type: 'button', class: 'link-botao', onclick: e => abrirDiretriz(l.link, e.currentTarget) }, 'Ver diretriz') : null)));
        });
        if (b.id === 'tipografia' && !this.comparando) bloco.appendChild(this.previa(ficha));
        el.appendChild(bloco);
      });
      // checklist
      const ck = h('div', { class: 'bloco-ficha' }, h('h4', {}, 'Checklist de prova'), h('ul', { class: 'checklist' }, ficha.checklist.map(it => h('li', {}, h('label', {}, h('input', { type: 'checkbox', checked: !!this.checks[alvo + it.id], onchange: e => { this.checks[alvo + it.id] = e.target.checked; } }), h('span', {}, h('span', { class: 'ck-texto' }, it.texto), diretriz(it.link) ? h('button', { type: 'button', class: 'link-botao ck-link', onclick: e => abrirDiretriz(it.link, e.currentTarget) }, 'ver') : null))))),
        h('div', { class: 'acoes-linha', style: 'margin-top:.6rem' }, h('button', { type: 'button', class: 'btn btn-secundario btn-p', onclick: () => copiar(`Checklist de prova — ${this.nomes[alvo]} (Ergomino ${ficha.versao})\n` + ficha.checklist.map(it => `[${this.checks[alvo + it.id] ? 'x' : ' '}] ${it.texto}`).join('\n'), 'Checklist copiado.') }, 'Copiar checklist')));
      el.appendChild(ck);
      el.appendChild(h('div', { class: 'ficha-fontes' }, h('strong', {}, 'Fontes citadas nesta ficha'), h('ul', {}, ficha.fontes.map(r => h('li', {}, h('button', { type: 'button', class: 'link-botao', onclick: e => abrirRef(r.id, e.currentTarget) }, r.cite.split('.')[0] + ' (' + r.ano + ')'), ' — ', r.mostrou)))));
      el.appendChild(h('div', { class: 'ficha-avisos' }, h('strong', {}, 'Limites desta ficha'), h('ul', {}, ficha.avisos.map(a => h('li', {}, a)))));
      return el;
    },
    previa(ficha) {
      const xh = ficha.numerico.xh; const lead = ficha.numerico.lead;
      const razao = D.RAZOES[this.fonte];
      const corpoMm = (v) => v / razao;
      const px = mm => mm * this.pxPorMm;
      const familia = this.fonte === 'serif' ? 'var(--fonte-leitura)' : 'var(--fonte-ui)';
      const tamanhoMin = px(corpoMm(xh[0])); const tamanhoMax = xh[1] != null ? px(corpoMm(xh[1])) : null;
      const amostra = (tam, rotulo) => h('div', { style: 'margin-bottom:.75rem' }, h('span', { class: 'rotulo' }, rotulo), h('p', { class: 'previa-amostra', style: `font-family:${familia};font-size:${tam.toFixed(2)}px;line-height:${lead[0]}` }, 'O gato subiu no muro. Lá de cima, viu a cidade acordar devagar.'));
      const sel = h('select', { 'aria-label': 'Fonte da prévia', onchange: e => { this.fonte = e.target.value; store.set(CHAVES.fonte, this.fonte); this.renderFicha(); } }, h('option', { value: 'serif', selected: this.fonte === 'serif' }, 'Serifada do sistema (r ≈ 0,45)'), h('option', { value: 'sans', selected: this.fonte === 'sans' }, 'Sem serifa do sistema (r ≈ 0,52)'));
      const calibrado = Math.abs(this.pxPorMm - 96 / 25.4) > 0.01;
      const slider = h('input', { type: 'range', min: '2.5', max: '7', step: '0.01', value: String(this.pxPorMm), 'aria-label': 'Ajustar o retângulo até ficar do tamanho de um cartão de banco', oninput: e => { this.pxPorMm = parseFloat(e.target.value); cartao.style.setProperty('--escala', String(this.pxPorMm / (96 / 25.4))); } , onchange: () => { store.set(CHAVES.pxmm, this.pxPorMm); this.renderFicha(); toast('Tela calibrada: a prévia agora está em tamanho real.'); } });
      const cartao = h('div', { class: 'calibrar-cartao', style: `--escala:${this.pxPorMm / (96 / 25.4)}` }, 'Encoste um cartão de banco aqui (85,6 × 54 mm) e ajuste o controle até coincidir.');
      return h('div', { class: 'previa' },
        h('div', { class: 'previa-controles' }, h('span', {}, 'Prévia tipográfica'), sel, h('span', {}, calibrado ? 'Tamanho real (tela calibrada).' : 'Tamanho aproximado: calibre a tela para ver em milímetros reais.')),
        amostra(tamanhoMin, `Altura-x ${R.fmt(xh[0])} mm`), tamanhoMax ? amostra(tamanhoMax, `Altura-x ${R.fmt(xh[1])} mm`) : null,
        h('p', { class: 'previa-legenda' }, 'A razão altura-x ÷ corpo da fonte do seu sistema é estimada; na prova, meça a altura-x impressa.'),
        h('details', { class: 'calibrar' }, h('summary', {}, calibrado ? 'Recalibrar tela' : 'Calibrar tela'), cartao, slider, h('button', { type: 'button', class: 'btn btn-secundario btn-p', onclick: () => { this.pxPorMm = 96 / 25.4; store.del(CHAVES.pxmm); this.renderFicha(); } }, 'Voltar ao padrão')));
    }
  };

  // ---------- Busca ----------
  function indiceBusca() {
    const itens = [];
    D.DIRETRIZES.forEach(d => itens.push({ tipo: 'Diretrizes', titulo: d.titulo, resumo: d.rec, texto: normaliza([d.titulo, d.rec, d.porque, (tema(d.tema) || {}).nome].join(' ')), abrir: ab => abrirDiretriz(d.id, ab) }));
    D.MITOS.forEach(m => itens.push({ tipo: 'Mitos', titulo: m.afirmacao, resumo: m.veredito + ' — ' + m.fazer, texto: normaliza([m.afirmacao, m.pesquisa, m.fazer].join(' ')), abrir: ab => abrirMito(m.id, ab) }));
    D.REFERENCIAS.forEach(r => itens.push({ tipo: 'Referências', titulo: r.cite.split('.')[0] + ' (' + r.ano + ')', resumo: r.mostrou, texto: normaliza([r.cite, r.mostrou, r.tipo].join(' ')), abrir: ab => abrirRef(r.id, ab) }));
    return itens;
  }
  let INDICE = null;
  function expandir(q) {
    const termos = normaliza(q).split(/\s+/).filter(t => t.length > 1);
    const extra = [];
    Object.keys(D.SINONIMOS).forEach(chave => {
      const grupo = [chave].concat(D.SINONIMOS[chave]).map(normaliza);
      if (termos.some(t => grupo.some(g => g.includes(t) || t.includes(g)))) grupo.forEach(g => extra.push(g));
    });
    return { termos, extra: Array.from(new Set(extra)) };
  }
  function buscar(q) {
    INDICE = INDICE || indiceBusca();
    const { termos, extra } = expandir(q);
    if (!termos.length) return [];
    return INDICE.map(it => {
      let pontos = 0;
      termos.forEach(t => { if (it.texto.includes(t)) pontos += 2; if (normaliza(it.titulo).includes(t)) pontos += 3; });
      extra.forEach(t => { if (it.texto.includes(t)) pontos += 1; });
      return { it, pontos };
    }).filter(x => x.pontos > 0).sort((a, b) => b.pontos - a.pontos).map(x => x.it);
  }
  function abrirBusca(abridor) {
    const c = h('div', {});
    const campo = h('input', { type: 'search', placeholder: 'ex.: entrelinha, dislexia, papel ou tela', 'aria-label': 'Buscar', autocomplete: 'off' });
    const resultados = h('div', { class: 'busca-resultados' });
    const dica = h('p', { class: 'nota-tabela' }, 'Sinônimos entendidos: entrelinha = leading; corpo = tamanho da fonte; medida = largura da linha.');
    const render = () => {
      const lista = buscar(campo.value);
      resultados.replaceChildren();
      if (!campo.value.trim()) { resultados.appendChild(dica); return; }
      if (!lista.length) { resultados.appendChild(h('p', { class: 'bloco-nota' }, 'Nada encontrado. Tente outro termo ou um sinônimo.')); return; }
      ['Diretrizes', 'Mitos', 'Referências'].forEach(tipo => {
        const grupo = lista.filter(i => i.tipo === tipo).slice(0, 6); if (!grupo.length) return;
        resultados.appendChild(h('div', { class: 'busca-grupo' }, h('h3', {}, tipo), grupo.map(i => i.abrir
          ? h('button', { type: 'button', class: 'busca-item', onclick: e => i.abrir(e.currentTarget) }, h('strong', {}, i.titulo), h('span', {}, i.resumo))
          : h('div', { class: 'busca-item', style: 'cursor:default' }, h('strong', {}, i.titulo), h('span', {}, i.resumo)))));
      });
    };
    campo.addEventListener('input', render);
    c.appendChild(h('div', { class: 'campo busca-campo' }, campo));
    c.appendChild(resultados); render();
    gaveta.abrir('Busca', 'Buscar no Ergomino', c, abridor);
    setTimeout(() => campo.focus(), 100);
  }

  // ---------- rotas (#hash) ----------
  function tratarHash(inicial) {
    const hash = decodeURIComponent(location.hash.replace(/^#/, ''));
    if (!hash) return;
    const ir = (id) => irPara(id, { semHash: true, instantaneo: inicial });
    const [rota, resto] = hash.split('?');
    const [raiz, id] = rota.split('/');
    if (raiz === 'ferramenta' && resto) { const p = R.decodificar(resto); if (p) { ferramenta.carregarPerfil(p, 'Perfil compartilhado'); } ir('ferramenta'); return; }
    if (raiz === 'guia' && id && tema(id)) { guia.mostrarTema(id, false); ir('guia'); return; }
    if (raiz === 'diretriz' && id) { const d = diretriz(id); if (d) { guia.mostrarTema(d.tema, false); ir('guia'); setTimeout(() => abrirDiretriz(id), inicial ? 400 : 0); } return; }
    if (raiz === 'mito' && id) { ir('mitos'); setTimeout(() => abrirMito(id), inicial ? 400 : 0); return; }
    if (raiz === 'ref' && id) { ir('referencias'); setTimeout(() => abrirRef(id), inicial ? 400 : 0); return; }
    if (SECOES.includes(raiz)) { if (inicial) ir(raiz); return; }
  }

  // ---------- início ----------
  function init() {
    const temaUrl = new URLSearchParams(location.search).get('tema');
    aplicarTema(['morning', 'afternoon', 'night'].includes(temaUrl) ? temaUrl : store.get(CHAVES.tema, window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'morning'), false);
    aplicarTexto(store.get(CHAVES.texto, 'padrao'), false);
    $$('.tema [role="radio"]').forEach(b => b.addEventListener('click', () => { aplicarTema(b.dataset.tema, true); toast({ morning: 'Morning: modo claro.', afternoon: 'Afternoon: leitura confortável.', night: 'Night: modo escuro.' }[b.dataset.tema]); }));
    $('#btn-leitura').addEventListener('click', () => modoLeitura(!document.body.classList.contains('modo-leitura')));
    $('#btn-sair-leitura').addEventListener('click', () => modoLeitura(false));
    $('#btn-busca').addEventListener('click', e => abrirBusca(e.currentTarget));
    $('#btn-mais').addEventListener('click', e => abrirMais(e.currentTarget));
    document.addEventListener('keydown', e => { if (e.key === '/' && !e.ctrlKey && !e.metaKey && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) { e.preventDefault(); abrirBusca($('#btn-busca')); } });
    document.addEventListener('click', e => {
      const a = e.target.closest('a[data-nav]'); if (!a) return;
      const id = a.dataset.nav; if (!document.getElementById(id)) return;
      e.preventDefault(); irPara(id);
    });
    gaveta.init();
    renderInicio(); guia.init(); mitos.init(); referencias.init(); renderSobre(); ferramenta.init();
    observarSecoes();
    window.addEventListener('hashchange', () => tratarHash(false));
    tratarHash(true);
    requestAnimationFrame(() => document.documentElement.classList.add('pronto'));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

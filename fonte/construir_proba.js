// SPDX-License-Identifier: EUPL-1.2
// SPDX-FileCopyrightText: 2026 DeporteAberto contributors
// Une as pantallas .dc.html nun só HTML funcional (só front-end).
// Uso: node construir_proba.js <carpeta project> <saída completa .html> <saída fragmento .html>
const fs = require('fs');
const path = require('path');
const { NOME_PROXECTO } = require('./config_proxecto');
const [dir, saidaCompleta, saidaFragmento] = process.argv.slice(2);

const PANTALLAS = [
  ['inicio', 'Main', 'Cidadanía', 'Inicio e instalacións'],
  ['ficha', 'Ficha', 'Cidadanía', 'Ficha e reserva'],
  ['reservas', 'Reservas', 'Cidadanía', 'As miñas reservas e avisos'],
  ['acceso', 'Acceso', 'Cidadanía', 'Acceso'],
  ['panel', 'Panel', 'Concello', 'Panel de indicadores'],
  ['usuario', 'Usuario', 'Cidadanía', 'A miña conta'],
  ['accesibilidade', 'Accesibilidade', 'Cidadanía', 'Declaración de accesibilidade'],
  ['privacidade', 'Privacidade', 'Cidadanía', 'Política de privacidade'],
  ['uso', 'Uso', 'Concello', 'Resumo de uso'],
  ['avisos', 'Avisos', 'Concello', 'Avisos'],
  ['axenda', 'Axenda', 'Concello', 'Axenda de reservas'],
  ['instalacions', 'Instalacions', 'Concello', 'Instalacións'],
  ['horarios', 'Horarios', 'Concello', 'Horarios e peches'],
  ['normas', 'Normas', 'Concello', 'Normas de uso'],
  ['marca', 'Marca', 'Concello', 'Marca do concello'],
  ['superadmin', 'Superadmin', 'Superadministración', 'Concellos e persoas xestoras']
];
const OCULTAS = [['reserva-mobil', 'ReservaMobil', 'Cidadanía', 'Reserva con QR (móbil)'], ['validar-qr', 'ValidarQR', 'Concello', 'Validar QR (móbil)'], ['ficha-mobil', 'FichaMobil', 'Cidadanía', 'Ficha e reserva (móbil)'], ['restrinxido', 'Restrinxido', 'Cidadanía', 'Acceso restrinxido']];
const TODAS = PANTALLAS.concat(OCULTAS);

const parche = (txt, de, a, f) => {
  if (!txt.includes(de)) throw new Error('Parche non aplicable en ' + f + ': ' + de.slice(0, 60));
  return txt.split(de).join(a);
};

let tokens = '';
const plantillas = [];
const clases = [];
const titulos = {};

for (const [, f] of TODAS) {
  let t = fs.readFileSync(path.join(dir, f + '.dc.html'), 'utf8');
  if (!tokens) tokens = t.match(/<style>([\s\S]*?)<\/style>/)[1];
  titulos[f] = t.match(/<title>([\s\S]*?)<\/title>/)[1];
  let tpl = t.match(/<\/helmet>([\s\S]*?)<\/x-dc>/)[1];
  let js = t.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];

  // As pantallas móbiles dentro dunha app real non teñen tamaño fixo.
  tpl = tpl.replace(/width: 375px; height: \d+px;/, 'width: 100%; max-width: 480px; margin: 0 auto;');

  // Ligazóns legais no pé das pantallas de cidadanía.
  tpl = tpl.replace(/(<div style="[^"]*">)Concello de exemplo con datos ficticios<\/div>/, (m, a) => a.replace('<div style="', '<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 4px 24px; ') + '<span>Concello de exemplo con datos ficticios</span><a href="Accesibilidade.dc.html" style="min-height: 44px; display: inline-flex; align-items: center">Declaración de accesibilidade</a><a href="Privacidade.dc.html" style="min-height: 44px; display: inline-flex; align-items: center">Privacidade</a></div>');

  // Nome e inicial do concello activo (cambian desde Superadministración e Marca).
  tpl = tpl.split('Concello de Exemplo').join('{{nomeConcello}}');
  tpl = tpl.replace(/(background: \{\{marca\}\}[^>]*>)R(<\/span>)/g, '$1{{inicialConcello}}$2');

  // Selector de idioma.
  const lenguas = [['gl', 'GL', 'GL · Galego'], ['es', 'ES', 'ES · Castellano'], ['en', 'EN', 'EN · English']];
  const enlaceIdioma = (lang, aria, txt, cor) => '<a href="#idioma-' + lang + '" lang="' + lang + '" aria-label="' + aria + '" style="min-height: 44px; display: inline-flex; align-items: center' + cor + '">' + txt + '</a>';
  const selector = (corBase, corFort, corLink) => '<span style="display: inline-flex; align-items: center; gap: 8px; color: ' + corBase + '">'
    + lenguas.map(([c, U, aria]) => {
      const corpo = '<sc-if value="{{i' + U + '}}"><strong aria-current="true" style="color: ' + corFort + '">' + U + '</strong></sc-if><sc-if value="{{n' + U + '}}">' + enlaceIdioma(c, aria, U, corLink) + '</sc-if>';
      return U === 'GL' ? corpo : '<sc-if value="{{v' + U + '}}"><span aria-hidden="true">|</span> ' + corpo + '</sc-if>';
    }).join(' ') + '</span>';
  const selectorMovil = '<a href="#idioma" aria-label="{{ariaIdioma}}" style="width: 44px; height: 44px; box-sizing: border-box; flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; border: 1px solid currentColor; border-radius: 8px; color: inherit; font-weight: 700; text-decoration: none">{{codIdioma}}</a>';
  const glFixo = /<span style="display: inline-flex; align-items: center; gap: 8px; color: var\(--texto2\)"><strong style="color: var\(--texto\)">GL<\/strong> \| <a href="#idioma"[^>]*>ES<\/a><\/span>/;
  const verSitio = '<a href="Main.dc.html" style="min-height: 44px; display: inline-flex; align-items: center">Ver o sitio público</a>';
  if (glFixo.test(tpl)) {
    tpl = tpl.replace(glFixo, () => selector('var(--texto2)', 'var(--texto)', ''));
  } else if (tpl.includes(verSitio)) {
    tpl = parche(tpl, verSitio, verSitio + selector('var(--texto2)', 'var(--texto)', ''), f);
  } else if (f === 'Superadmin') {
    tpl = parche(tpl, '<span>Superadministración da plataforma</span>', '<span style="margin-right: auto">Superadministración da plataforma</span>', f);
    tpl = parche(tpl, '{{rotuloTema}}</button></div>', '{{rotuloTema}}</button><span style="font-weight: 400; font-size: 17px">' + selector('inherit', 'inherit', '; color: inherit') + '</span></div>', f);
  } else {
    tpl = parche(tpl, '<button type="button" aria-label="{{rotuloTema}}"', selectorMovil + '<button type="button" aria-label="{{rotuloTema}}"', f);
    if (f !== 'ValidarQR') tpl = parche(tpl, '>As miñas reservas</a>', '>Reservas</a>', f);
  }

  // Unións entre pantallas que só teñen sentido na versión de proba.
  if (f === 'Ficha') {
    js = parche(js, "this.setState({ paso: 'feito',", "window.__app.engadirReserva('Pista ' + sel.pista + ' · ' + (Number(this.state.persoas) === 1 ? '1 persoa' : Number(this.state.persoas) + ' persoas'), nomes[sel.d] + ' ' + this.dia(sel.semana, sel.d).getDate() + ' de novembro, ' + hh(sel.h) + ' a ' + hh(sel.h + dur), { inicio: this.dia(sel.semana, sel.d).getTime() + Math.round(sel.h * 60) * 60000, fin: this.dia(sel.semana, sel.d).getTime() + Math.round((sel.h + dur) * 60) * 60000, importe: this.importeEstimado(instInfo), desconto: this.descontoActual(instInfo) });\n        this.setState({ paso: 'feito',", f);
  }
  if (f === 'FichaMobil') {
    js = parche(js, "this.setState({ feito: true, erroPersoas: false, mensaxe: '' });", "window.__app.engadirReserva('Pista ' + sel.pista + ' · ' + (Number(this.state.persoas) === 1 ? '1 persoa' : Number(this.state.persoas) + ' persoas'), nomes[sel.d] + ' ' + (9 + sel.d) + ' de novembro, ' + hh(sel.h) + ' a ' + hh(sel.h + dur), { inicio: new Date(2026, 10, 9 + sel.d).getTime() + Math.round(sel.h * 60) * 60000, fin: new Date(2026, 10, 9 + sel.d).getTime() + Math.round((sel.h + dur) * 60) * 60000, importe: this.importeEstimado(instInfo), desconto: this.descontoActual(instInfo) }); this.setState({ feito: true, erroPersoas: false, mensaxe: '' });", f);
    tpl = parche(tpl, '<div style="border-top: 1px solid var(--texto); padding: 12px 16px; background: var(--fondo)">', '<div style="position: sticky; bottom: 0; border-top: 1px solid var(--texto); padding: 12px 16px; background: var(--fondo)">', f);
  }
  if (f === 'Reservas') {
    js = parche(js, 'const proximas = base.map(', 'const proximas = base.concat(window.__app.reservas).map(', f);
  }
  if (f === 'Main') {
    js = parche(js, 'const extra = [];', 'const extra = window.__app.avisos;', f);
    js = parche(js, 'const avisos = extra.concat([', 'const avisos = extra;\n    const _estaticos = ([', f);
    js = parche(js, 'const todas = [', 'const todas = window.__app.publicas();\n    const _estatico = [', f);
    js = parche(js, "const nomes = ['Todos', 'Pádel', 'Fútbol', 'Fútbol sala', 'Baloncesto', 'Natación', 'Tenis', 'Ioga'];", "const nomes = ['Todos'].concat(window.__app.deportes());", f);
    js = parche(js, "deporte === 'Todos' || i.lista.includes(deporte)", "deporte === 'Todos' || !window.__app.deportes().includes(deporte) || i.lista.includes(deporte)", f);
    js = parche(js, '      avisos,\n      data,', '      avisos: window.__app.filtrarAvisos(avisos),\n      data,', f);
  }
  if (f === 'Uso') {
    js = parche(js, 'const datos = periodos[periodo].slice().sort(', "const datos = periodos[periodo].filter((d) => window.__app.nomesActivos().indexOf(d[0]) !== -1).concat(window.__app.nomesActivos().filter((n) => !periodos[periodo].some((d) => d[0] === n)).map((n) => [n, 0, 0])).sort(", f);
  }
  if (f === 'XX') {
  }
  if (f === 'Horarios') {
    js = parche(js, "peches: [{ id: Date.now(), cando:", "peches: [{ id: window.__app.engadirAviso('Pechada: ' + ondeSel, candoTxt + '. ' + (novo.motivo || 'Sen motivo indicado') + '.'), cando:", f);
  }
  if (f === 'Marca') {
    js = parche(js, "gardar: () => this.setState({ mensaxe: ok ? 'Marca gardada.' : 'Non se pode gardar: a cor non cumpre o contraste mínimo.' })", "gardar: () => { if (ok) window.__app.gardarMarca({ nome: nome.trim() || this.state.nome, cor, es: castelan, en: ingles, correo }); this.setState({ mensaxe: ok ? 'Marca gardada. Xa se aplica a todas as pantallas.' : 'Non se pode gardar: a cor non cumpre o contraste mínimo.' }); }", f);
  }

  if (f === 'Usuario') tpl = tpl.replace(/(<a href="Usuario\.dc\.html" aria-current="page"[^>]*>A miña conta<\/a>)/, '<sc-if value="{{sesionOn}}">$1</sc-if><sc-if value="{{sesionOff}}"><a href="Acceso.dc.html" style="min-height: 44px; display: inline-flex; align-items: center; text-decoration: none">Entrar</a></sc-if>');
  tpl = tpl.replace(/<a href="Acceso\.dc\.html"([^>]*)>Entrar<\/a>/, (m, r) => '<sc-if value="{{sesionOff}}">' + m + '</sc-if><sc-if value="{{sesionOn}}"><a href="Usuario.dc.html"' + r + '>A miña conta</a></sc-if>');
  {
    const iconaMenu = '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path></svg>';
    const botonMenu = '<button type="button" class="menu-btn" aria-expanded="{{menuAberto}}" onClick="{{alternarMenu}}">' + iconaMenu + 'Menú</button>';
    if (f === 'FichaMobil' || f === 'ReservaMobil' || f === 'ValidarQR') {
      const i = tpl.indexOf('<header');
      const j = tpl.indexOf('</header>', i) + '</header>'.length;
      if (i < 0) throw new Error('header en ' + f);
      const admin = f === 'ValidarQR';
      const ligazons = admin
        ? '<a href="Panel.dc.html">Indicadores</a><a href="Axenda.dc.html">Axenda de reservas</a><a href="Main.dc.html">Ver o sitio público</a>'
        : '<a href="Main.dc.html">Instalacións</a><a href="Reservas.dc.html">Reservas</a><sc-if value="{{sesionOff}}"><a href="Acceso.dc.html">Entrar</a></sc-if><sc-if value="{{sesionOn}}"><a href="Usuario.dc.html">A miña conta</a></sc-if>';
      const cab = '<header class="cab-movil"><div class="cab-movil-fila"><a href="Main.dc.html" class="cab-marca"><span aria-hidden="true" class="cab-logo" style="background: {{marca}}; color: {{sobreMarca}}">{{inicialConcello}}</span>' + (admin ? 'Xestión' : '{{nomeCurto}}') + '</a>' + botonMenu + '</div>'
        + '<nav aria-label="Principal" class="cab-movil-nav" data-aberto="{{menuAberto}}">' + ligazons
        + '<span class="cab-ctrl">' + selector('var(--texto2)', 'var(--texto)', '') + '<button type="button" class="tema-btn" onClick="{{alternarTema}}">{{rotuloTema}}</button></span></nav></header>';
      tpl = tpl.slice(0, i) + cab + tpl.slice(j);
    } else {
      // Cidadanía: menú desplegable no móbil
      tpl = tpl.replace('<nav aria-label="Principal" style="', botonMenu + '\n      <nav aria-label="Principal" data-aberto="{{menuAberto}}" style="');
      // Xestión: cabeceira e menú lateral
      tpl = tpl.replace('<span style="display: flex; flex-wrap: wrap; align-items: center; gap: 4px 24px">', botonMenu + '\n      <span class="cab-adm-dir" data-aberto="{{menuAberto}}" style="display: flex; flex-wrap: wrap; align-items: center; gap: 4px 24px">');
      if (f === 'Superadmin') {
        tpl = tpl.replace('<span style="margin-right: auto">Superadministración da plataforma</span>', '<span style="margin-right: auto">Superadministración da plataforma</span>' + botonMenu + '<span class="cab-adm-dir" data-aberto="{{menuAberto}}" style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px 24px">');
        tpl = tpl.replace(/<\/div>(\s*)<\/header>/, '</span></div>$1</header>');
      }
      tpl = tpl.replace('<nav aria-label="Xestión" style="', '<nav aria-label="Xestión" data-aberto="{{menuAberto}}" style="');
    }
  }
  plantillas.push(`<template id="t-${f}">${tpl}</template>`);
  clases.push(`Clases[${JSON.stringify(f)}] = (function () {${js}\nreturn Component;\n})();`);
}

const claro = tokens.match(/\[data-tema="claro"\]\{([^}]*)\}/)[1];
const escuro = tokens.match(/\[data-tema="escuro"\]\{([^}]*)\}/)[1];

const css = `
/* Reservas deportivas: base neutra fría, marca azul do concello e dous modos. */
:root{${claro}}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){${escuro}}}
:root[data-theme="dark"]{${escuro}}
${tokens}
body{background:var(--fondo);color:var(--texto);font-family:'Atkinson Hyperlegible',system-ui,sans-serif;font-size:17px}
main:focus{outline:none}
.barra{position:sticky;top:env(safe-area-inset-top,0px);z-index:5;display:flex;flex-wrap:wrap;align-items:center;gap:6px 16px;padding:8px 16px;background:var(--superficie2);border-bottom:1px solid var(--linea);font-size:15px}
.barra strong{margin-right:auto}
.barra label{display:inline-flex;align-items:center;gap:8px}
.barra select,.barra button{min-height:36px;border:1px solid var(--texto);border-radius:6px;background:var(--fondo);color:var(--texto);font:inherit;padding:0 10px;max-width:100%}
.barra button{cursor:pointer}
.barra button[aria-pressed="true"]{background:var(--forte);color:var(--sobre-forte)}
.vista{display:inline-flex;gap:4px}
@media (max-width: 767px){.vista{display:none}}
.marco-movil{max-width:390px;margin-inline:auto;box-shadow:0 0 0 1px var(--linea-forte),0 8px 24px rgba(0,0,0,.18);border-radius:0}
.aviso{position:fixed;left:50%;bottom:calc(16px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:20;max-width:calc(100vw - 32px);box-sizing:border-box;padding:12px 16px;border-radius:8px;background:var(--forte);color:var(--sobre-forte);font-size:15px;display:flex;align-items:center;gap:12px}
.aviso button{min-height:44px;padding:0 12px;border:1px solid currentColor;border-radius:8px;background:transparent;color:inherit;font:inherit;cursor:pointer}
button:disabled,input:disabled{opacity:.55;cursor:not-allowed}
.convidado{display:flex;flex-wrap:wrap;align-items:center;gap:4px 12px;padding:8px 16px;background:var(--superficie);border-bottom:1px solid var(--linea-forte);font-size:15px}
.convidado button{min-height:36px;border:1px solid var(--texto);border-radius:6px;background:var(--fondo);color:var(--texto);font:inherit;padding:0 12px;cursor:pointer}
[hidden]{display:none!important}
.limpo .barra,.limpo .convidado{display:none!important}
.barra label{white-space:nowrap}
.barra label select{flex:1 1 auto;min-width:0}
.menu-btn{display:none;min-height:44px;padding:0 14px;border:1px solid currentColor;border-radius:8px;background:transparent;color:inherit;font:inherit;cursor:pointer;align-items:center;gap:8px}
.cab-movil{border-bottom:1px solid var(--linea)}
.cab-movil-fila{padding:8px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px}
.cab-marca{display:inline-flex;align-items:center;gap:10px;min-height:44px;text-decoration:none;font-weight:700;color:var(--texto);min-width:0}
.cab-logo{width:36px;height:36px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto}
.cab-movil-nav{display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;gap:0 20px;padding:0 16px 12px}
.cab-movil-nav a{min-height:44px;display:flex;align-items:center;text-decoration:none}
.cab-ctrl{display:flex;align-items:center;gap:16px;padding-top:8px}
.tema-btn{min-height:44px;padding:0 12px;border:1px solid var(--texto);border-radius:8px;background:transparent;color:var(--texto);font:inherit;cursor:pointer}
#marco{container-type:inline-size;container-name:marco}
@container marco (max-width:767px){
.menu-btn{display:inline-flex}
.cab-movil-nav{flex-direction:column;align-items:stretch;gap:0}
[data-aberto="false"]{display:none!important}
header nav[data-aberto]:not(.cab-movil-nav){flex:1 1 100%;flex-direction:column!important;align-items:flex-start!important;gap:0!important;padding-top:4px}
header nav[data-aberto]:not(.cab-movil-nav)>*{margin:0!important}
.cab-adm-dir{flex:1 1 100%;flex-direction:column!important;align-items:flex-start!important;gap:0!important}
header>div>span:first-child,header>div>a:first-child{flex:1 1 0;min-width:0}
.hor-tabla{min-width:0!important}
.hor-cab{display:none!important}
.hor-fila{grid-template-columns:1fr 1fr!important;gap:8px!important;padding:12px 0;border-bottom:1px solid var(--linea)}
.hor-dia{grid-column:1 / -1}
.hor-cel{display:grid!important;gap:2px}
.hor-et{display:block!important;font-size:14px;color:var(--texto2)}
.hor-cont{grid-column:1 / -1!important;display:flex!important;gap:8px 12px!important}
header>div{gap:4px 12px!important}
}
@media (max-width:767px){
.barra strong{display:none}
.barra label{flex:1 1 100%}
.barra select{width:100%}
}
.entrando{animation:entrar .18s ease-out}
@keyframes entrar{from{opacity:0}to{opacity:1}}
::view-transition-old(root),::view-transition-new(root){animation-duration:.18s}
@media (prefers-reduced-motion: reduce){.entrando{animation:none}::view-transition-old(root),::view-transition-new(root){animation:none}}
`;

const rutas = JSON.stringify(TODAS.map(([ruta, archivo, grupo, nome]) => ({ ruta, archivo, grupo, nome })));
const grupos = {};
PANTALLAS.forEach(([ruta, , grupo, nome]) => { (grupos[grupo] = grupos[grupo] || []).push([ruta, nome]); });
const opcions = Object.entries(grupos).map(([g, l]) => `<optgroup label="${g}">${l.map(([r, n]) => `<option value="${r}">${n}</option>`).join('')}</optgroup>`).join('');

const i18n = fs.readFileSync(path.join(__dirname, 'i18n_es.js'), 'utf8') + '\n' + fs.readFileSync(path.join(__dirname, 'i18n_en.js'), 'utf8');
const runtime = `
const RUTAS = ${rutas};
const TITULOS = ${JSON.stringify(titulos)};
const Clases = {};
class DCLogic {
  constructor(props) { this.props = props || {}; this.state = {}; }
  setState(p) {
    this.state = Object.assign({}, this.state, typeof p === 'function' ? p(this.state, this.props) : p);
    App.pedirRender();
  }
  forceUpdate() { App.pedirRender(); }
}
const lerAlmacen = (k) => { try { return window.localStorage.getItem(k); } catch (e) { return null; } };
const App = {
  props: {},
  reservas: [],
  usuario: null,
  menuAberto: false,
  convidado: false,
  destinoLogin: null,
  avisos: [
    { id: 1, peche: true, horario: false, info: false, titulo: 'Pechada: Pistas de pádel do Campo da Feira', detalle: 'Xoves 12 de novembro, desde as 16:00. Obras no pavimento.', instalacion: 'Pistas de pádel do Campo da Feira', canles: ['Web'] },
    { id: 2, peche: true, horario: false, info: false, titulo: 'Pechada: Piscina Municipal A Ribeira', detalle: 'Do 16 ao 18 de novembro. Mantemento do vaso.', instalacion: 'Piscina Municipal A Ribeira', canles: ['Web'] },
    { id: 3, peche: false, horario: true, info: false, titulo: 'Horario especial: Pavillón Municipal', detalle: 'Venres 13 de novembro, pecha ás 20:00 por un evento.', instalacion: 'Pavillón Municipal', canles: ['Web'] }
  ],
  instancias: {},
  actual: null,
  ancho: false,
  vistaMovil: false,
  pendente: false,
  tema: 'claro',
  idioma: 'gl',
  raiz: null,
  iniciarTema() {
    const gardado = lerAlmacen('${NOME_PROXECTO}-tema');
    const pai = document.documentElement.getAttribute('data-theme');
    if (gardado === 'claro' || gardado === 'escuro') this.tema = gardado;
    else if (pai === 'dark') this.tema = 'escuro';
    else if (pai === 'light') this.tema = 'claro';
    else this.tema = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro';
    document.documentElement.setAttribute('data-tema', this.tema);
  },
  setTema(t) {
    this.tema = t;
    document.documentElement.setAttribute('data-tema', t);
    this.pedirRender();
  },
  iniciarIdioma() {
    const g = lerAlmacen('${NOME_PROXECTO}-idioma');
    this.idioma = g === 'es' || g === 'en' ? g : 'gl';
    document.documentElement.lang = this.idioma;
    this.pintarBarra();
  },
  setIdioma(i) {
    this.idioma = i;
    document.documentElement.lang = i;
    try { window.localStorage.setItem('${NOME_PROXECTO}-idioma', i); } catch (e) { /* sen almacenamento */ }
    this.pintarBarra();
    this.pedirRender();
  },
  pintarBarra() {
    document.querySelectorAll('#ir optgroup').forEach((g) => {
      if (!g.dataset.gl) g.dataset.gl = g.label;
      g.label = tr(g.dataset.gl);
    });
    document.querySelectorAll('#ir option').forEach((o) => {
      if (!o.dataset.gl) o.dataset.gl = o.textContent;
      o.textContent = tr(o.dataset.gl);
    });
  },
  slug: 'concello-de-exemplo',
  marcas: {},
  listaConcellos() {
    try { return this.instancia('Superadmin').state.concellos; } catch (e) { return []; }
  },
  concelloActivo() {
    const c = this.listaConcellos().find((x) => x.slug === this.slug) || { slug: this.slug, nome: 'Concello de Exemplo', cor: '#0b5cad', xestores: [] };
    const m = this.marcas[this.slug] || {};
    return { slug: c.slug, nome: m.nome || c.nome, cor: m.cor || c.cor, es: m.es !== false, en: m.en !== false, correo: m.correo || (c.xestores && c.xestores[0] ? c.xestores[0].correo : '') };
  },
  idiomaOn(l) { return l === 'gl' || !!this.concelloActivo()[l]; },
  listaIdiomas() { return ['gl', 'es', 'en'].filter((l) => this.idiomaOn(l)); },
  cambiarConcello(slug) {
    this.slug = slug;
    const c = this.concelloActivo();
    this.props.brand = c.cor;
    delete this.instancias.Marca;
    if (!this.idiomaOn(this.idioma)) this.setIdioma('gl'); else this.pedirRender();
    this.avisar('Concello activo: ' + c.nome);
  },
  gardarMarca(d) {
    this.marcas[this.slug] = { nome: d.nome, cor: d.cor, es: d.es, en: d.en, correo: d.correo };
    try {
      const e = this.listaConcellos().find((x) => x.slug === this.slug);
      if (e) { e.nome = d.nome; e.cor = d.cor; }
    } catch (err) { /* sen lista */ }
    this.props.brand = d.cor;
    if (!this.idiomaOn(this.idioma)) this.setIdioma('gl'); else this.pedirRender();
  },
  setBrand(c) { this.props.brand = c; this.pedirRender(); },
  entrar(metodo, conta) {
    if (metodo === 'convidado') {
      this.usuario = null;
      this.convidado = true;
      this.destinoLogin = null;
      this.ir('inicio');
      this.avisar('Entraches como convidado: só podes consultar.');
      return;
    }
    this.convidado = false;
    if (metodo === 'xestor' || metodo === 'superadmin') {
      const c = this.concelloActivo();
      this.usuario = { nome: metodo === 'xestor' ? 'Xoán Varela (xestión)' : 'Persoa superadministradora', correo: c.correo || 'xestion@example.org', telefono: '', metodo: 'Conta de xestión', rol: metodo, correoAvisos: true, sms: false, whatsapp: false };
      delete this.instancias.Usuario;
      this.destinoLogin = null;
      this.ir(metodo === 'xestor' ? 'panel' : 'superadmin');
      this.avisar('Sesión de xestión iniciada.');
      return;
    }
    const rexistro = metodo === 'rexistro';
    const correo = rexistro && conta ? conta.correo : 'marta.pena@example.org';
    const nomeCorreo = correo.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (letra) => letra.toUpperCase());
    this.usuario = { nome: rexistro ? (nomeCorreo || 'Persoa rexistrada') : 'Marta Pena Varela', rol: 'cidadan', correo, telefono: rexistro && conta ? conta.telefono : '600 000 000', metodo: rexistro ? 'Correo e móbil (nivel 1)' : metodo === 'clave' ? 'Cl@ve (simulado · nivel 3)' : 'Chave365 (simulado · nivel 3)', correoAvisos: true, sms: true, whatsapp: false };
    delete this.instancias.Usuario;
    const destino = this.destinoLogin || (rexistro ? 'reservas' : 'inicio');
    this.destinoLogin = null;
    this.ir(destino);
    this.avisar(rexistro ? 'Conta creada e sesión iniciada.' : 'Sesión iniciada.');
  },
  permitido(p) {
    const rol = this.usuario ? this.usuario.rol : null;
    if (p.grupo === 'Concello') return rol === 'xestor' || rol === 'superadmin';
    if (p.grupo === 'Superadministración') return rol === 'superadmin';
    return true;
  },
  sair(motivo) {
    this.usuario = null;
    delete this.instancias.Usuario;
    this.ir('inicio');
    this.avisar(motivo === 'borrada' ? 'Conta borrada.' : 'Sesión pechada.');
  },
  verFicha(nome) {
    if (this.modificando && this.modificando.instalacion !== nome) this.modificando = null;
    this.fichaNome = nome;
    delete this.instancias.Ficha;
    delete this.instancias.FichaMobil;
  },
  fichaInst() {
    const l = this.publicas();
    return l.find((i) => i.nome === this.fichaNome) || l[0] || null;
  },
  horario(nome) { const H = this.instancia('Horarios'); return H.diasDe ? H.diasDe(nome) : H.state.dias; },
  instalacionsTodas() { return this.instancia('Instalacions').state.lista; },
  publicas() {
    return this.instalacionsTodas().filter((i) => i.activa).map((i) => {
      const prezo = Math.max(0, Number(i.prezoBase) || 0);
      const descontos = (i.descontos || []).filter((d) => d.nome && Number(d.porcentaxe) > 0).map((d) => ({ ...d, porcentaxe: Math.min(100, Math.max(0, Number(d.porcentaxe) || 0)) }));
      const reducionMaxima = descontos.reduce((max, d) => Math.max(max, d.porcentaxe), 0);
      const desde = Math.round(prezo * (1 - reducionMaxima / 100) * 100) / 100;
      return {
      nome: i.nome,
      pistas: Math.max(1, Number(i.pistas) || 1),
      aforo: Math.max(1, Number(i.aforo) || 1),
      prezoBase: prezo,
      unidadeCobro: i.unidadeCobro || 'por entrada',
      prezoDesde: 'Desde ' + desde.toLocaleString('gl-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €',
      descontos,
      lista: String(i.deportes || '').split(',').map((s) => s.trim()).filter(Boolean),
      detalle: Number(i.pistas) === 1 ? '1 pista' : Number(i.pistas) + ' pistas',
      enderezo: i.enderezo,
      accesible: !!i.accesible,
      aviso: i.aviso || ''
      };
    });
  },
  deportes() {
    const s = [];
    this.publicas().forEach((i) => i.lista.forEach((d) => { if (s.indexOf(d) === -1) s.push(d); }));
    return s;
  },
  nomesActivos() { return this.publicas().map((i) => i.nome); },
  filtrarAvisos(av) {
    const nomes = this.nomesActivos();
    return av.filter((a) => !a.instalacion || nomes.indexOf(a.instalacion) !== -1);
  },
  engadirAviso(titulo, detalle) {
    const id = Date.now();
    this.avisos.unshift({ id, peche: true, horario: false, info: false, titulo, detalle, instalacion: (titulo.replace(/^Pechada: /, '').split(' · ')[0] === 'Todas as instalacións' ? '' : titulo.replace(/^Pechada: /, '').split(' · ')[0]), canles: ['Web'] });
    return id;
  },
  hoxe: new Date(2026, 10, 5, 10, 0),
  dataElixida: '2026-11-10',
  disponibilidade(nome, iso) {
    const data = new Date(iso + 'T00:00');
    if (isNaN(data.getTime())) return { aberto: true, libres: 0, pasada: false };
    if (data < new Date(2026, 10, 5)) return { aberto: false, libres: 0, pasada: true };
    const wd = (data.getDay() + 6) % 7;
    const dias = this.horario(nome);
    const x = dias && dias[wd] ? dias[wd] : null;
    if (x && !x.aberto) return { aberto: false, libres: 0, pasada: false };
    const dur = this.duracion(nome);
    const info = this.publicas().find((i) => i.nome === nome);
    const npistas = info ? Math.max(1, Number(info.pistas) || 1) : 1;
    const semana = Math.floor(Math.round((data - new Date(2026, 10, 9)) / 864e5) / 7);
    const hora = (v) => (v ? Number(String(v).slice(0, 2)) + Number(String(v).slice(3, 5)) / 60 : null);
    const dentro = (a, b, h) => a !== null && b !== null && h >= a && h + dur / 60 <= b;
    let libres = 0;
    for (let pista = 1; pista <= npistas; pista++) {
      for (let m = 9 * 60; m + dur <= 22 * 60; m += dur) {
        const h = m / 60;
        const aberta = !x || (x.todoDia ? dentro(hora(x.a), hora(x.d), h) : (dentro(hora(x.a), hora(x.b), h) || dentro(hora(x.c), hora(x.d), h)));
        if (!aberta || this.pechado(nome, pista, data, h, dur)) continue;
        if ((pista * 7 + semana * 5 + wd * 11 + h * 13) % 5 >= 2) libres++;
      }
    }
    return { aberto: true, libres, pasada: false };
  },
  reservasParaAfluencia() {
    let inactivas = new Set();
    const axenda = [];
    try {
      const R = this.instancia('Reservas');
      inactivas = new Set([...(R.state.canceladas || []), ...(R.state.modificadas || [])]);
    } catch (e) { /* sen reservas cidadás */ }
    try { axenda.push(...this.instancia('Axenda').state.lista); } catch (e) { /* sen axenda */ }
    return this.reservas.filter((r) => !inactivas.has(r.id)).concat(axenda);
  },
  mapaAfluencia(nome, semana, minutos, pistas) {
    const abreviaturas = ['Lun', 'Mar', 'Mér', 'Xov', 'Ven', 'Sáb', 'Dom'];
    const nomes = ['luns', 'martes', 'mércores', 'xoves', 'venres', 'sábado', 'domingo'];
    const horas = [];
    const inicioSemana = new Date(2026, 10, 9 + semana * 7);
    const calendario = this.horario(nome) || [];
    const reservas = this.reservasParaAfluencia();
    const existentes = new Set();
    const ocupas = reservas.filter((r) => !r.estado || r.estado === 'Confirmada').map((r) => {
      const inicio = Number(r.inicio || r.ord || 0);
      const instalacion = r.instalacion || String(r.recurso || '').split(',')[0];
      const recurso = String(r.recurso || '').split(',').pop().trim();
      const clave = [inicio, instalacion, recurso].join('|');
      if (!inicio || instalacion !== nome || existentes.has(clave)) return null;
      existentes.add(clave);
      return { inicio, fin: Number(r.fin) || inicio + minutos * 60000, recurso };
    }).filter(Boolean);
    const horaTexto = (m) => (Math.floor(m / 60) < 10 ? '0' : '') + Math.floor(m / 60) + ':' + (m % 60 < 10 ? '0' : '') + m % 60;
    const porcentaxe = (p) => p <= 19 ? { rango: '0–19 %', fondo: '#DCEDE5', tinta: '#173B2A', nivel: 0 }
      : p <= 44 ? { rango: '20–44 %', fondo: '#D7E8D0', tinta: '#263F1C', nivel: 1 }
        : p <= 69 ? { rango: '45–69 %', fondo: '#F3E6AD', tinta: '#493B08', nivel: 2 }
          : p <= 89 ? { rango: '70–89 %', fondo: '#F3C99C', tinta: '#542D0D', nivel: 3 }
            : { rango: '90–100 %', fondo: '#E4B0AA', tinta: '#541B18', nivel: 4 };
    const filas = [];
    for (let m = 9 * 60; m + minutos <= 22 * 60; m += minutos) {
      const h = m / 60;
      const celas = nomes.map((dia, d) => {
        const data = new Date(inicioSemana.getFullYear(), inicioSemana.getMonth(), inicioSemana.getDate() + d);
        const horario = calendario[d];
        const valor = (v) => v ? Number(String(v).slice(0, 2)) + Number(String(v).slice(3, 5)) / 60 : null;
        const dentro = (a, b) => a !== null && b !== null && h >= a && h + minutos / 60 <= b;
        const aberto = !!horario && horario.aberto && (horario.todoDia ? dentro(valor(horario.a), valor(horario.d)) : dentro(valor(horario.a), valor(horario.b)) || dentro(valor(horario.c), valor(horario.d)));
        const pistasAbertas = Array.from({ length: pistas }, (_, k) => k + 1).filter((p) => !this.pechado(nome, p, data, h, minutos));
        if (!aberto || pistasAbertas.length === 0) return { pechado: true, rotulo: 'Pechado', aria: dia + ' ' + data.getDate() + ', ' + horaTexto(m) + ', pechado' };
        const celdaInicio = data.getTime() + m * 60000;
        const usadas = new Set();
        ocupas.forEach((r) => {
          if (r.inicio >= celdaInicio + minutos * 60000 || r.fin <= celdaInicio) return;
          const recurso = r.recurso;
          const pista = Number((recurso.match(/(?:Pista|Rúa)\s*(\d+)/i) || [])[1]) || 1;
          if (pistasAbertas.includes(pista)) usadas.add(pista);
        });
        const valorPorcentaxe = Math.min(100, Math.round(usadas.size / pistasAbertas.length * 100));
        const nivel = porcentaxe(valorPorcentaxe);
        return { pechado: false, rotulo: valorPorcentaxe + '%', porcentaxe: valorPorcentaxe, reservadas: Array.from(usadas), rango: nivel.rango, fondo: nivel.fondo, tinta: nivel.tinta, aria: dia + ' ' + data.getDate() + ', ' + horaTexto(m) + ', ' + valorPorcentaxe + ' %, ' + nivel.rango, semana, d, h };
      });
      filas.push({ hora: horaTexto(m), celas });
    }
    const recomendadas = filas.flatMap((f) => f.celas.map((c) => ({ ...c, horaTexto: f.hora })))
      .filter((c) => !c.pechado && c.porcentaxe < 100)
      .sort((a, b) => a.porcentaxe - b.porcentaxe || a.d - b.d || a.h - b.h)
      .slice(0, 3)
      .map((c) => ({ ...c, nome: abreviaturas[c.d] + ' ' + (inicioSemana.getDate() + c.d) + ' · ' + c.horaTexto, texto: c.porcentaxe + '% ocupado' }));
    return { dias: abreviaturas.map((curto, d) => ({ curto, numero: inicioSemana.getDate() + d })), filas, recomendadas };
  },
  reservasEn(nome, data, h, minutos) {
    const inicioFranxa = new Date(data.getFullYear(), data.getMonth(), data.getDate(), Math.floor(h), Math.round((h % 1) * 60)).getTime();
    const finFranxa = inicioFranxa + minutos * 60000;
    const reservas = this.reservasParaAfluencia();
    const pistas = new Set();
    reservas.forEach((r) => {
      if (r.estado && r.estado !== 'Confirmada') return;
      const inicio = Number(r.inicio || r.ord || 0);
      const instalacion = r.instalacion || String(r.recurso || '').split(',')[0];
      if (!inicio || instalacion !== nome) return;
      const fin = Number(r.fin) || inicio + minutos * 60000;
      if (inicio >= finFranxa || fin <= inicioFranxa) return;
      const recurso = String(r.recurso || '').split(',').pop();
      const pista = Number((recurso.match(/(?:Pista|Rúa)\s*(\d+)/i) || [])[1]) || 1;
      pistas.add(pista);
    });
    return Array.from(pistas);
  },
  normasDe(nome) {
    const N = this.instancia('Normas');
    const g = (N.state && N.state.gardados) || {};
    return g[nome] || g['Todo o concello'] || { maxima: 14, minima: 2, activas: 3, cancelar: 24, empadronados: false };
  },
  normasTextos(nome) {
    const n = this.normasDe(nome);
    const plural = (v, s, p) => v + ' ' + (Number(v) === 1 ? s : p);
    const l = [
      'Podes reservar con ata ' + plural(n.maxima, 'día', 'días') + ' de antelación.',
      'Reserva polo menos ' + plural(n.minima, 'hora', 'horas') + ' antes do inicio.',
      'Podes ter ' + plural(n.activas, 'reserva activa', 'reservas activas') + ' como máximo por conta.',
      'Podes cambiar ou cancelar ata ' + plural(n.cancelar, 'hora', 'horas') + ' antes.'
    ];
    if (n.empadronados) l.push('Só para persoas empadroadas no concello.');
    return l;
  },
  duracion(nome) {
    const H = this.instancia('Horarios');
    return H.duracionDe ? H.duracionDe(nome) : 60;
  },
  pechado(nome, pista, data, h, minutos) {
    const H = this.instancia('Horarios');
    const ini = new Date(data.getFullYear(), data.getMonth(), data.getDate(), Math.floor(h), Math.round((h % 1) * 60));
    const fin = new Date(ini.getTime() + minutos * 60000);
    return (H.state.peches || []).some((p) => {
      if (!p.desde || !p.ata) return false;
      const dentro = p.ambito === 'Todas as instalacións' || p.ambito === nome || p.ambito === nome + ' · Pista ' + pista;
      return dentro && ini < new Date(p.ata) && fin > new Date(p.desde);
    });
  },
  modificando: null,
  comezarModificacion(res) {
    this.modificando = { id: res.id, instalacion: res.instalacion, recurso: res.recurso, cando: res.cando };
    this.verFicha(res.instalacion);
    this.ir('ficha');
  },
  rematarModificacion() {
    const m = this.modificando;
    if (!m) return false;
    this.modificando = null;
    try {
      const R = this.instancia('Reservas');
      R.state.modificadas = (R.state.modificadas || []).concat(m.id);
    } catch (e) { /* sen reservas */ }
    return true;
  },
  cancelarModificacion() {
    this.modificando = null;
    this.ir('reservas');
  },
  cancelarReservaId(id) {
    try {
      const R = this.instancia('Reservas');
      if ((R.state.canceladas || []).indexOf(id) === -1) R.state.canceladas = (R.state.canceladas || []).concat(id);
      R.state.qr = R.state.qr === id ? null : R.state.qr;
    } catch (e) { /* sen reservas */ }
  },
  reservasActivas() {
    const R = this.instancia('Reservas');
    const ids = [1, 2].concat(this.reservas.map((x) => x.id));
    return ids.filter((id) => (R.state.canceladas || []).indexOf(id) === -1 && (R.state.modificadas || []).indexOf(id) === -1).length;
  },
  validarReserva(nome, data, h, minutos) {
    const n = this.normasDe(nome);
    const plural = (v, s, p) => v + ' ' + (Number(v) === 1 ? s : p);
    const activasAgora = this.reservasActivas() - (this.modificando ? 1 : 0);
    if (activasAgora >= Number(n.activas)) return 'Xa tes ' + plural(activasAgora, 'reserva activa', 'reservas activas') + ', o máximo que permite este concello. Cancela unha para reservar outra.';
    const ini = new Date(data.getFullYear(), data.getMonth(), data.getDate(), Math.floor(h), Math.round((h % 1) * 60));
    if ((ini - this.hoxe) / 36e5 < Number(n.minima)) return 'Tes que reservar polo menos ' + plural(n.minima, 'hora', 'horas') + ' antes do inicio.';
    if ((ini - this.hoxe) / 864e5 > Number(n.maxima)) return 'Só podes reservar con ata ' + plural(n.maxima, 'día', 'días') + ' de antelación.';
    return '';
  },
  descargar(nome, mime, contido) {
    try {
      const url = URL.createObjectURL(new Blob([contido], { type: mime }));
      const a = document.createElement('a');
      a.href = url;
      a.download = nome;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      return true;
    } catch (e) {
      return false;
    }
  },
  ics(eventos) {
    const p2 = (n) => (n < 10 ? '0' : '') + n;
    const local = (d) => d.getFullYear() + p2(d.getMonth() + 1) + p2(d.getDate()) + 'T' + p2(d.getHours()) + p2(d.getMinutes()) + '00';
    const utc = (d) => d.getUTCFullYear() + p2(d.getUTCMonth() + 1) + p2(d.getUTCDate()) + 'T' + p2(d.getUTCHours()) + p2(d.getUTCMinutes()) + p2(d.getUTCSeconds()) + 'Z';
    const BS = String.fromCharCode(92);
    const esc = (s) => String(s || '').split(BS).join(BS + BS).split(';').join(BS + ';').split(',').join(BS + ',').split(String.fromCharCode(13)).join('').split(String.fromCharCode(10)).join(BS + 'n');
    const l = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//${NOME_PROXECTO}//Reservas deportivas municipais//GL', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH'];
    eventos.forEach((e) => {
      l.push('BEGIN:VEVENT', 'UID:' + e.id + '@${NOME_PROXECTO}.example', 'DTSTAMP:' + utc(new Date()), 'DTSTART:' + local(e.inicio), 'DTEND:' + local(e.fin), 'SUMMARY:' + esc(e.titulo));
      if (e.lugar) l.push('LOCATION:' + esc(e.lugar));
      if (e.descricion) l.push('DESCRIPTION:' + esc(e.descricion));
      l.push('END:VEVENT');
    });
    l.push('END:VCALENDAR');
    const CRLF = String.fromCharCode(13, 10);
    return l.join(CRLF) + CRLF;
  },
  engadirCalendario(eventos, nome) {
    const ok = this.descargar(nome, 'text/calendar;charset=utf-8', this.ics(eventos));
    this.avisar(ok ? 'Calendario preparado: ' + nome : 'Non se puido preparar o calendario.');
    return ok;
  },
  descargarDatos(pref) {
    const u = this.usuario || {};
    let v = { proximas: [], historial: [] };
    try { v = this.instancia('Reservas').valsPantalla(); } catch (e) { /* sen datos */ }
    const dato = {
      xerado: new Date().toISOString(),
      persoa: { nome: u.nome || '', correo: u.correo || '', metodo_identificacion: u.metodo || '', telefono: pref.telefono || '' },
      preferencias_aviso: { correo: !!pref.correoAvisos, sms: !!pref.sms, whatsapp: !!pref.whatsapp, consentimento_sms_whatsapp: !!pref.consentimento },
      reservas_activas: v.proximas.map((x) => ({ instalacion: x.instalacion, recurso: x.recurso, cando: x.cando })),
      historial: v.historial.map((x) => ({ reserva: x.texto, estado: x.estado }))
    };
    const nome = 'os-meus-datos.json';
    return this.descargar(nome, 'application/json;charset=utf-8', JSON.stringify(dato, null, 2)) ? nome : '';
  },
  engadirReserva(recurso, cando, extra) {
    this.reservas.push({ id: 100 + this.reservas.length, instalacion: (this.fichaInst() || { nome: 'Pistas de pádel do Campo da Feira' }).nome, recurso, cando: cando.charAt(0).toUpperCase() + cando.slice(1), prazo: true, inicio: extra && extra.inicio, fin: extra && extra.fin, importe: extra && extra.importe, desconto: extra && extra.desconto });
  },
  instancia(archivo) {
    if (this.instancias[archivo]) return this.instancias[archivo];
    const i = new Clases[archivo](archivo === 'Marca' ? {} : this.props);
    i.temaActual = () => App.tema;
    const orixinal = i.setState.bind(i);
    i.setState = (p) => {
      if (p && p.temaElixido) { App.setTema(p.temaElixido); return; }
      orixinal(p);
    };
    this.instancias[archivo] = i;
    if (i.componentDidMount) i.componentDidMount();
    return i;
  },
  pedirRender() {
    if (this.pendente) return;
    this.pendente = true;
    Promise.resolve().then(() => { this.pendente = false; this.render(); });
  },
  esMovil() { return this.vistaMovil || document.getElementById('marco').clientWidth < 768; },
  archivoDe(p) { return p.archivo === 'Ficha' && this.esMovil() ? 'FichaMobil' : p.archivo; },
  render() {
    if (!this.actual) return;
    const archivo = this.permitido(this.actual) ? this.archivoDe(this.actual) : 'Restrinxido';
    const vals = Object.assign({}, this.instancia(archivo).renderVals(), { menuAberto: this.menuAberto, alternarMenu: () => { App.menuAberto = !App.menuAberto; App.pedirRender(); }, soLectura: !this.usuario, sesionOn: !!this.usuario, sesionOff: !this.usuario, iGL: this.idioma === 'gl', iES: this.idioma === 'es', iEN: this.idioma === 'en', nGL: this.idioma !== 'gl', nES: this.idioma !== 'es' && this.idiomaOn('es'), nEN: this.idioma !== 'en' && this.idiomaOn('en'), vES: this.idiomaOn('es'), vEN: this.idiomaOn('en'), nomeConcello: this.concelloActivo().nome, nomeCurto: this.concelloActivo().nome.replace(/^Concello (de |da |do |das |dos |d')?/i, ''), inicialConcello: this.concelloActivo().nome.replace(/^Concello (de |da |do |das |dos |d')?/i, '').charAt(0).toUpperCase(), codIdioma: this.idioma.toUpperCase(), ariaIdioma: 'Cambiar o idioma' });
    const novos = [];
    fillos(document.getElementById('t-' + archivo).content, vals, novos);
    parchear(this.raiz, novos);
    this.archivoPintado = archivo;
    document.title = tr(TITULOS[archivo] || '${NOME_PROXECTO}').replace(/Concello de Exemplo/g, this.concelloActivo().nome);
    const cb = document.getElementById('convidado');
    const xestion = !!(this.usuario && this.usuario.rol && this.usuario.rol !== 'cidadan');
    cb.hidden = !((this.convidado && !this.usuario) || xestion);
    if (!cb.hidden) {
      document.getElementById('convidado-txt').textContent = tr(xestion ? (this.usuario.rol === 'superadmin' ? 'Sesión de superadministración (proba)' : 'Sesión de persoa xestora (proba)') : 'Estás como convidado: só podes consultar.');
      document.getElementById('convidado-btn').textContent = tr(xestion ? 'Pechar sesión' : 'Entrar');
    }
  },
  mostrar(ruta, ancla, primeira) {
    this.menuAberto = false;
    const p = RUTAS.find((r) => r.ruta === ruta) || RUTAS[0];
    const cambiar = () => {
      this.actual = p;
      this.raiz.textContent = '';
      this.render();
      const sel = document.getElementById('ir');
      if ([...sel.options].some((o) => o.value === p.ruta)) sel.value = p.ruta;
      window.scrollTo(0, 0);
      if (primeira) return;
      if (ancla && this.ancorar(ancla)) return;
      const m = this.raiz.querySelector('main');
      if (m) { m.setAttribute('tabindex', '-1'); m.focus({ preventScroll: true }); }
    };
    const redux = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!primeira && !redux && document.startViewTransition && !document.hidden) {
      try {
        const t = document.startViewTransition(cambiar);
        [t.ready, t.finished, t.updateCallbackDone].forEach((p) => p.catch(() => {}));
        return;
      } catch (e) { /* seguimos sen transición */ }
    }
    cambiar();
    if (!primeira) {
      this.raiz.classList.remove('entrando');
      void this.raiz.offsetWidth;
      this.raiz.classList.add('entrando');
    }
  },
  ir(ruta, ancla) {
    const actual = this.actual && this.actual.ruta;
    if (ruta === actual) {
      if (ancla) this.ancorar(ancla); else window.scrollTo(0, 0);
      return;
    }
    this.mostrar(ruta, ancla);
    try { window.location.hash = ruta; } catch (e) { /* o marco pode non permitilo */ }
  },
  ancorar(id) {
    const el = this.raiz.querySelector('#' + CSS.escape(id));
    if (!el) return false;
    el.scrollIntoView({ block: 'start' });
    if (!el.matches('a,button,input,select,textarea')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
    return true;
  },
  avisar(txt) {
    const a = document.getElementById('aviso');
    document.getElementById('aviso-txt').textContent = tr(txt);
    document.getElementById('aviso-btn').textContent = tr('Pechar');
    a.hidden = false;
  }
};
window.__app = App;
const tr = (txt) => App.idioma === 'es' ? traducirEs(txt) : App.idioma === 'en' ? traducirEn(txt) : txt;

const reHole = /\\{\\{\\s*([^}]+?)\\s*\\}\\}/g;
const reTodo = /^\\s*\\{\\{\\s*([^}]+?)\\s*\\}\\}\\s*$/;
function valor(expr, ctx) {
  if (expr === 'true') return true;
  if (expr === 'false') return false;
  if (expr === 'null') return null;
  if (/^-?\\d+(\\.\\d+)?$/.test(expr)) return Number(expr);
  return expr.split('.').reduce((o, k) => (o === null || o === undefined ? undefined : o[k]), ctx);
}
function cru(txt, ctx) {
  const m = txt.match(reTodo);
  return m ? valor(m[1], ctx) : txt.replace(reHole, (_, e) => { const v = valor(e, ctx); return v === null || v === undefined ? '' : String(v); });
}
function interpTexto(txt, ctx) {
  if (!/\\S/.test(txt)) return txt;
  const inicio = txt.match(/^\\s*/)[0];
  const fin = txt.match(/\\s*$/)[0];
  const base = reHole.test(txt) ? tr(txt.trim()) : null;
  reHole.lastIndex = 0;
  if (base === null) return inicio + tr(txt.trim()) + fin;
  return inicio + base.replace(reHole, (_, e) => { const v = valor(e, ctx); return v === null || v === undefined ? '' : tr(String(v)); }) + fin;
}
function interp(txt, ctx) {
  const v = cru(txt, ctx);
  return v === null || v === undefined ? '' : String(v);
}
function fillos(n, ctx, out) { n.childNodes.forEach((c) => construir(c, ctx, out)); }
function construir(n, ctx, out) {
  if (n.nodeType === 3) { out.push(document.createTextNode(interpTexto(n.nodeValue, ctx))); return; }
  if (n.nodeType !== 1) return;
  const tag = n.localName;
  if (tag === 'sc-for') {
    const lista = cru(n.getAttribute('list'), ctx) || [];
    const como = n.getAttribute('as');
    lista.forEach((item, i) => {
      const c = Object.create(ctx);
      c[como] = item;
      c.$index = i;
      fillos(n, c, out);
    });
    return;
  }
  if (tag === 'sc-if') {
    if (cru(n.getAttribute('value'), ctx)) fillos(n, ctx, out);
    return;
  }
  const el = document.createElementNS(n.namespaceURI, n.localName);
  const props = {};
  const on = {};
  for (const a of Array.from(n.attributes)) {
    const nome = a.name;
    if (nome.indexOf('hint-') === 0 || nome === 'data-opcions') continue;
    if (/^on[a-z]+$/.test(nome)) { on[nome.slice(2)] = cru(a.value, ctx); continue; }
    if (nome === 'checked' || nome === 'disabled') { props[nome] = !!cru(a.value, ctx); continue; }
    if (nome === 'value' && el.namespaceURI.endsWith('xhtml')) { props.value = cru(a.value, ctx); continue; }
    if ((nome === 'aria-label' || nome === 'title') && n.getAttribute('lang') === null) { el.setAttribute(nome, interpTexto(a.value, ctx)); continue; }
    const v = cru(a.value, ctx);
    if (v === undefined || v === null) continue;
    el.setAttribute(nome, String(v));
  }
  el.__on = on;
  el.__props = props;
  const contido = n.localName === 'template' ? n.content : n;
  const sub = [];
  if (n.localName === 'select' && n.hasAttribute('data-opcions')) {
    (cru(n.getAttribute('data-opcions'), ctx) || []).forEach((o) => {
      const op = document.createElement('option');
      op.setAttribute('value', o.valor);
      op.appendChild(document.createTextNode(tr(o.texto)));
      sub.push(op);
    });
  } else {
    fillos(contido, ctx, sub);
  }
  sub.forEach((s) => el.appendChild(s));
  if (n.localName === 'option' && !n.hasAttribute('value')) el.setAttribute('value', n.textContent.trim());
  out.push(el);
}
function aplicarProps(el) {
  const p = el.__props;
  if (!p) return;
  if ('disabled' in p) el.disabled = p.disabled;
  if ('checked' in p) el.checked = p.checked;
  if ('value' in p) {
    const v = p.value === undefined || p.value === null ? '' : String(p.value);
    if (el.value !== v) el.value = v;
  }
}
function aplicarArbore(el) {
  if (el.nodeType !== 1) return;
  Array.from(el.children).forEach(aplicarArbore);
  aplicarProps(el);
}
function parchear(pai, novos) {
  const vellos = Array.from(pai.childNodes);
  novos.forEach((nv, i) => {
    const ve = vellos[i];
    if (!ve) { pai.appendChild(nv); aplicarArbore(nv); return; }
    if (ve.nodeType !== nv.nodeType || ve.nodeName !== nv.nodeName || ve.namespaceURI !== nv.namespaceURI) {
      pai.replaceChild(nv, ve);
      aplicarArbore(nv);
      return;
    }
    if (nv.nodeType === 3) {
      if (ve.nodeValue !== nv.nodeValue) ve.nodeValue = nv.nodeValue;
      return;
    }
    Array.from(ve.attributes).forEach((a) => {
      if (a.name !== 'tabindex' && !nv.hasAttribute(a.name)) ve.removeAttribute(a.name);
    });
    Array.from(nv.attributes).forEach((a) => {
      if (ve.getAttribute(a.name) !== a.value) ve.setAttribute(a.name, a.value);
    });
    ve.__on = nv.__on;
    ve.__props = nv.__props;
    parchear(ve, Array.from(nv.childNodes));
    aplicarProps(ve);
  });
  for (let i = novos.length; i < vellos.length; i++) vellos[i].remove();
}

function buscarManexador(e, tipo) {
  let el = e.target;
  while (el && el !== App.raiz.parentNode) {
    if (el.__on && el.__on[tipo]) return el;
    el = el.parentNode;
  }
  return null;
}
function lanzar(e, tipo) {
  const el = buscarManexador(e, tipo);
  if (!el) return;
  el.__on[tipo]({ target: e.target, currentTarget: el, key: e.key, preventDefault: () => e.preventDefault(), stopPropagation: () => e.stopPropagation() });
}
const conCambio = (t) => t.tagName === 'SELECT' || (t.tagName === 'INPUT' && (t.type === 'checkbox' || t.type === 'radio'));

function arrancar() {
  App.raiz = document.getElementById('app');
  if (/[?&]limpo/.test(window.location.search)) document.documentElement.classList.add('limpo');
  App.iniciarTema();
  App.iniciarIdioma();
  const zona = document.getElementById('marco');
  zona.addEventListener('click', (e) => {
    const a = e.target.closest ? e.target.closest('a[href]') : null;
    if (a) {
      e.preventDefault();
      if (a.getAttribute('data-login')) { App.entrar(a.getAttribute('data-login')); return; }
      const href = a.getAttribute('href');
      if (href.indexOf('.dc.html') !== -1) {
        if (href.indexOf('Acceso.dc.html') === 0 && App.actual && App.actual.ruta !== 'acceso') App.destinoLogin = App.actual.ruta;
        if (a.getAttribute('data-inst')) App.verFicha(a.getAttribute('data-inst'));
        const partes = href.split('#');
        const archivo = partes[0].replace('.dc.html', '');
        const r = RUTAS.find((x) => x.archivo === archivo);
        App.ir(r ? r.ruta : 'inicio', partes[1]);
      } else if (/^https?:/.test(href)) {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else if (href.indexOf('#idioma') === 0) {
        const ordem = App.listaIdiomas();
        App.setIdioma(href.length > 8 ? href.slice(8) : ordem[(ordem.indexOf(App.idioma) + 1) % ordem.length]);
      } else if (href.charAt(0) === '#') {
        if (!App.ancorar(href.slice(1))) App.avisar('Aínda non dispoñible nesta versión de proba.');
      }
      return;
    }
    lanzar(e, 'click');
  });
  zona.addEventListener('input', (e) => { if (!conCambio(e.target)) lanzar(e, 'change'); });
  zona.addEventListener('change', (e) => { if (conCambio(e.target)) lanzar(e, 'change'); });
  zona.addEventListener('keydown', (e) => lanzar(e, 'keydown'));
  zona.addEventListener('submit', (e) => e.preventDefault());

  document.getElementById('aviso-btn').addEventListener('click', () => { document.getElementById('aviso').hidden = true; });
  document.getElementById('convidado-btn').addEventListener('click', () => { if (App.usuario && App.usuario.rol && App.usuario.rol !== 'cidadan') { App.sair('pechada'); return; } if (App.actual && App.actual.ruta !== 'acceso') App.destinoLogin = App.actual.ruta; App.ir('acceso'); });
  document.getElementById('ir').addEventListener('change', (e) => App.ir(e.target.value));
  document.querySelectorAll('[data-vista]').forEach((b) => {
    b.addEventListener('click', () => {
      App.vistaMovil = b.getAttribute('data-vista') === 'movil';
      document.querySelectorAll('[data-vista]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      zona.classList.toggle('marco-movil', App.vistaMovil);
      App.pedirRenderCambio();
    });
  });
  App.pedirRenderCambio = () => {
    if (App.actual && App.archivoDe(App.actual) !== App.archivoPintado) App.raiz.textContent = '';
    App.pedirRender();
  };
  window.addEventListener('resize', () => App.pedirRenderCambio());
  if (window.ResizeObserver) new ResizeObserver(() => App.pedirRenderCambio()).observe(zona);
  window.addEventListener('hashchange', () => {
    const r = window.location.hash.slice(1);
    if (App.actual && r && r !== App.actual.ruta) App.mostrar(r);
  });
  App.mostrar(window.location.hash.slice(1) || 'inicio', null, true);
}
`;

const fontFaces = [400, 700].map((p) => '@font-face{font-family:"Atkinson Hyperlegible";font-style:normal;font-weight:' + p + ';font-display:swap;src:url(data:font/woff2;base64,' + fs.readFileSync(path.join(__dirname, 'tipografia', 'atkinson-hyperlegible-' + p + '.woff2')).toString('base64') + ') format("woff2")}').join('');
const topo = `<title>DeporteAberto · Reservas deportivas municipais</title>
<style>${fontFaces}${css}</style>`;

const corpo = `<div class="barra" lang="es">
  <strong>Versión de prueba</strong>
  <label for="ir">Ir a <select id="ir">${opcions}</select></label>
  <div class="vista" role="group" aria-label="Vista"><button type="button" data-vista="escritorio" aria-pressed="true">Escritorio</button><button type="button" data-vista="movil" aria-pressed="false">Móvil</button></div>
</div>
<div id="convidado" class="convidado" hidden><span id="convidado-txt"></span><button type="button" id="convidado-btn"></button></div>
<div id="marco"><div id="app"></div></div>
<div id="aviso" class="aviso" role="status" hidden><span id="aviso-txt"></span><button type="button" id="aviso-btn">Pechar</button></div>
${plantillas.join('\n')}
<script>
(function () {
const NOME_PROXECTO = '${NOME_PROXECTO}';
${i18n}
${runtime}
${clases.join('\n')}
arrancar();
})();
</script>`;

fs.mkdirSync(path.dirname(saidaCompleta), { recursive: true });
fs.mkdirSync(path.dirname(saidaFragmento), { recursive: true });
fs.writeFileSync(saidaCompleta, `<!doctype html>
<!-- SPDX-License-Identifier: EUPL-1.2 -->
<!-- SPDX-FileCopyrightText: 2026 DeporteAberto contributors -->
<html lang="gl" translate="no">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="google" content="notranslate">
${topo}
</head>
<body>
${corpo}
</body>
</html>
`, 'utf8');
fs.writeFileSync(saidaFragmento, '<!-- SPDX-License-Identifier: EUPL-1.2 -->\n<!-- SPDX-FileCopyrightText: 2026 DeporteAberto contributors -->\n' + topo + '\n' + corpo + '\n', 'utf8');

// Comprobación de sintaxe do script final.
new Function(corpo.match(/<script>([\s\S]*)<\/script>/)[1]);
console.log('Pantallas:', TODAS.length, '· Tamaño:', Math.round(fs.statSync(saidaCompleta).size / 1024) + ' KB');

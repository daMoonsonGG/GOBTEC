// SPDX-License-Identifier: EUPL-1.2
// SPDX-FileCopyrightText: 2026 DeporteAberto contributors
// Aplica os tokens de cor claro/escuro e o botón de modo ás pantallas.
const fs = require('fs');
const path = require('path');

const dir = process.argv[2];
const AZUL = '#0B5CAD';
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.dc.html'));

const css = `<style>
[data-tema="claro"]{color-scheme:light;--fondo:#FFFFFF;--superficie:#F3F5F8;--superficie2:#E6EAF0;--texto:#141A22;--texto2:#4A5462;--linea:#CBD2DB;--linea-forte:#6B7686;--forte:#141A22;--sobre-forte:#FFFFFF}
[data-tema="escuro"]{color-scheme:dark;--fondo:#11161C;--superficie:#1A212A;--superficie2:#2A333F;--texto:#EEF1F5;--texto2:#B3BCC8;--linea:#3A4553;--linea-forte:#8894A3;--forte:#EEF1F5;--sobre-forte:#11161C}
body{margin:0}
body:has([data-tema="escuro"]){background:#11161C}
a{color:var(--texto)}a:hover{color:var(--texto2)}
:focus-visible{outline:3px solid var(--texto);outline-offset:2px}
.saltar{position:absolute;left:-9999px}.saltar:focus{left:16px;top:8px;background:var(--fondo);color:var(--texto);padding:12px 16px;z-index:10}
</style>`;

const iconas = `<sc-if value="{{escuro}}" hint-placeholder-val="{{ false }}"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg></sc-if><sc-if value="{{claro}}" hint-placeholder-val="{{ true }}"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg></sc-if>`;

const boton = (extra = '') => `<button type="button" onClick="{{alternarTema}}" style="min-height: 44px; padding: 0 12px; border-radius: 8px; border: 1px solid currentColor; background: transparent; color: inherit; font: inherit; cursor: pointer; display: inline-flex; align-items: center; gap: 8px${extra}">${iconas}{{rotuloTema}}</button>`;
const botonIcona = `<button type="button" aria-label="{{rotuloTema}}" onClick="{{alternarTema}}" style="width: 44px; height: 44px; flex: 0 0 auto; padding: 0; border-radius: 8px; border: 1px solid currentColor; background: transparent; color: inherit; cursor: pointer; display: inline-flex; align-items: center; justify-content: center">${iconas}</button>`;

const metodos = `class Component extends DCLogic {
  temaActual() {
    const e = this.state || {};
    if (e.temaElixido) return e.temaElixido;
    if (this.props.modo === 'Claro') return 'claro';
    if (this.props.modo === 'Escuro') return 'escuro';
    let gardado = null;
    try { gardado = window.localStorage.getItem(NOME_PROXECTO + '-tema'); } catch (err) { gardado = null; }
    if (gardado === 'claro' || gardado === 'escuro') return gardado;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro';
  }
  luminanciaTema(hex) {
    const canle = (i) => {
      const v = parseInt(hex.substr(i, 2), 16) / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * canle(1) + 0.7152 * canle(3) + 0.0722 * canle(5);
  }
  marcaEscura(hex) {
    const fondo = this.luminanciaTema('#11161C');
    const mestura = (i, p) => Math.round(parseInt(hex.substr(i, 2), 16) * (1 - p) + 255 * p);
    const pasar = (n) => (n < 16 ? '0' : '') + n.toString(16);
    for (let p = 0; p <= 1; p += 0.05) {
      const cor = '#' + pasar(mestura(1, p)) + pasar(mestura(3, p)) + pasar(mestura(5, p));
      if ((this.luminanciaTema(cor) + 0.05) / (fondo + 0.05) >= 6) return cor;
    }
    return '#FFFFFF';
  }
  valsTema() {
    const tema = this.temaActual();
    const escuro = tema === 'escuro';
    const base = this.props.brand ?? (this.state && this.state.cor) ?? '${AZUL}';
    return {
      tema,
      escuro,
      claro: !escuro,
      rotuloTema: escuro ? 'Modo claro' : 'Modo escuro',
      marca: escuro ? this.marcaEscura(base) : base,
      sobreMarca: escuro ? '#11161C' : '#FFFFFF',
      alternarTema: () => {
        const novo = escuro ? 'claro' : 'escuro';
        try { window.localStorage.setItem(NOME_PROXECTO + '-tema', novo); } catch (err) { /* sen almacenamento */ }
        this.setState({ temaElixido: novo });
      }
    };
  }
  componentDidMount() {
    this.oirTema = (e) => {
      if (e.key === NOME_PROXECTO + '-tema' && (e.newValue === 'claro' || e.newValue === 'escuro')) {
        this.setState({ temaElixido: e.newValue });
      }
    };
    window.addEventListener('storage', this.oirTema);
  }
  componentWillUnmount() {
    window.removeEventListener('storage', this.oirTema);
  }
  renderVals() {
    return { ...this.valsPantalla(), ...this.valsTema() };
  }`;

const substituir = (txt, de, a, obrigatorio, nome) => {
  if (obrigatorio && !txt.includes(de)) throw new Error('Non se atopou en ' + nome + ': ' + de.slice(0, 70));
  return txt.split(de).join(a);
};

for (const f of files) {
  const ruta = path.join(dir, f);
  let t = fs.readFileSync(ruta, 'utf8');
  if (t.includes('data-tema')) throw new Error(f + ' xa ten o tema aplicado');

  // Estilos da páxina e tokens.
  t = t.replace(/<style>[\s\S]*?<\/style>/, css);

  // Atributo do tema na raíz: o primeiro div dentro de <x-dc>, despois do </helmet>.
  t = t.replace(/<\/helmet>\s*<div style="/, '</helmet>\n<div data-tema="{{tema}}" style="');

  // Elementos que deben quedar fixos en ambos modos.
  t = t.split('height: 240px; border-radius: 12px; background: #16211D; color: #FFFFFF').join('height: 240px; border-radius: 12px; background: #0B1016; color: #F5F7FA');
  t = t.split('border: 3px dashed #FFFFFF').join('border: 3px dashed #F5F7FA');
  t = t.split('<header style="background: #16211D; color: #FFFFFF">').join('<header style="background: #0B1016; color: #F5F7FA">');
  t = t.split('padding: 12px; background: #FFFFFF; display: grid').join('padding: 12px; background: __QR__; display: grid');
  t = t.split('style="width: 250px; height: 250px; display: grid').join('style="width: 250px; height: 250px; padding: 12px; background: __QR__; display: grid');

  // Marca do concello.
  t = t.split('background: {{brand}}; color: #FFFFFF').join('background: {{marca}}; color: {{sobreMarca}}');
  t = t.split('background: {{cor}}; color: #FFFFFF').join('background: {{marca}}; color: {{sobreMarca}}');
  t = t.split('{{brand}}').join('{{marca}}');
  t = t.split('background: {{fondoBotonGardar}}; color: #FFFFFF').join('background: {{fondoBotonGardar}}; color: var(--sobre-forte)');
  t = t.split("fondo: brand, texto: '#FFFFFF'").join('fondo: this.valsTema().marca, texto: this.valsTema().sobreMarca');
  t = t.split("'1px solid ' + brand").join("'1px solid ' + this.valsTema().marca");

  // Pares fondo forte + texto.
  t = t.split('background: #16211D; color: #FFFFFF').join('background: var(--forte); color: var(--sobre-forte)');
  t = t.replace(/background: #16211D/g, 'background: var(--forte)');

  // Valores calculados en JS.
  t = t.replace(/\bfondo: [^,\n]*/g, (m) => m.split('#16211D').join('var(--forte)').split('#FFFFFF').join('var(--fondo)'));
  t = t.replace(/\btexto: [^,\n]*/g, (m) => m.split('#FFFFFF').join('var(--sobre-forte)').split('#16211D').join('var(--texto)'));
  t = t.replace(/fondoBotonGardar: ok \? '#16211D' : '#47524D'/, "fondoBotonGardar: ok ? 'var(--forte)' : 'var(--texto2)'");

  // Cores de marca por defecto: fóra o verde.
  t = t.split('"brand":{"editor":"color","default":"#0B6B57","options":["#0B6B57","#1D4ED8","#A4372B"]}').join(`"brand":{"editor":"color","default":"${AZUL}","options":["${AZUL}","#6D28D9","#A4372B"]}`);
  t = t.split("?? '#0B6B57'").join(`?? '${AZUL}'`);
  t = t.split("cor: '#0b6b57'").join("cor: '#0b5cad'");
  t = t.split("cor: '#1d4ed8'").join("cor: '#6d28d9'");
  t = t.split("novo: { nome: '', cor: '#6d28d9', correo: '' }").join("novo: { nome: '', cor: '#0e7490', correo: '' }");

  // Neutros restantes.
  const mapa = {
    '#FFFFFF': null,
    '#16211D': 'var(--texto)',
    '#55615C': 'var(--texto2)',
    '#47524D': 'var(--texto2)',
    '#CDD3D0': 'var(--linea)',
    '#F2F5F3': 'var(--superficie)',
    '#E7EBE9': 'var(--superficie2)',
    '#6B7671': 'var(--linea-forte)'
  };
  for (const [de, a] of Object.entries(mapa)) if (a) t = t.split(de).join(a);
  t = t.replace(/background: #FFFFFF/g, 'background: var(--fondo)');
  t = t.split('__QR__').join('#FFFFFF');

  // Botón de modo na cabeceira.
  const gl = '<span style="display: inline-flex; align-items: center; gap: 8px; color: var(--texto2)"><strong';
  const verSitio = '<a href="Main.dc.html" style="min-height: 44px; display: inline-flex; align-items: center">Ver o sitio público</a>';
  if (f === 'Acceso.dc.html') {
    t = substituir(t, gl, boton('; margin-left: auto') + '\n      ' + gl, true, f);
  } else if (t.includes(gl)) {
    t = substituir(t, gl, boton() + '\n        ' + gl, true, f);
  } else if (t.includes(verSitio)) {
    t = substituir(t, verSitio, '<span style="display: flex; flex-wrap: wrap; align-items: center; gap: 4px 24px">' + boton() + verSitio + '</span>', true, f);
  } else if (f === 'FichaMobil.dc.html') {
    const a = '<a href="ReservaMobil.dc.html" style="min-height: 44px; display: inline-flex; align-items: center">As miñas reservas</a>';
    t = substituir(t, a, '<span style="display: inline-flex; align-items: center; gap: 8px">' + a + botonIcona + '</span>', true, f);
  } else if (f === 'ReservaMobil.dc.html') {
    const a = '<a href="Reservas.dc.html" style="min-height: 44px; display: inline-flex; align-items: center">As miñas reservas</a>';
    t = substituir(t, a, '<span style="display: inline-flex; align-items: center; gap: 8px">' + a + botonIcona + '</span>', true, f);
  } else if (f === 'ValidarQR.dc.html') {
    const a = '<a href="Axenda.dc.html" style="min-height: 44px; display: inline-flex; align-items: center">Axenda</a>';
    t = substituir(t, a, '<span style="display: inline-flex; align-items: center; gap: 12px">' + a + botonIcona + '</span>', true, f);
  } else if (f === 'Superadmin.dc.html') {
    const d = 'min-height: 44px; display: flex; align-items: center; font-weight: 700; font-size: 19px">Superadministración da plataforma</div>';
    t = substituir(t, d, 'min-height: 44px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px 24px; font-weight: 700; font-size: 19px"><span>Superadministración da plataforma</span>' + boton('; font-weight: 400; font-size: 17px') + '</div>', true, f);
  } else {
    throw new Error('Sen sitio para o botón en ' + f);
  }

  // Lóxica e axustes.
  t = substituir(t, 'class Component extends DCLogic {', metodos, true, f);
  t = t.replace(/\n  renderVals\(\) \{\n(?!    return \{ \.\.\.this\.valsPantalla)/, '\n  valsPantalla() {\n');
  t = t.replace(/data-props='\{/, `data-props='{"modo":{"editor":"enum","options":["Sistema","Claro","Escuro"],"default":"Sistema"},`);

  fs.writeFileSync(ruta, t, 'utf8');

  // Comprobacións.
  const js = t.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
  new Function('DCLogic', js);
  const props = t.match(/data-props='([^']*)'/)[1];
  JSON.parse(props);
  const soltas = (t.replace(/<style>[\s\S]*?<\/style>/, '').match(/#[0-9A-Fa-f]{6}\b/g) || []);
  const contas = {};
  soltas.forEach((h) => { contas[h] = (contas[h] || 0) + 1; });
  const pantalla = (js.match(/valsPantalla\(\) \{/g) || []).length;
  console.log(f.padEnd(24), 'valsPantalla:', pantalla, 'data-tema:', (t.match(/data-tema=/g) || []).length, JSON.stringify(contas));
}

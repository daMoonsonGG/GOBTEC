// SPDX-License-Identifier: EUPL-1.2
// SPDX-FileCopyrightText: 2026 DeporteAberto contributors
// Pasa axe-core (reglas WCAG 2.1 A e AA) por todas as rutas de index.html con Edge headless e comproba o reflow.
// Uso: npm install axe-core (nunha carpeta calquera) e despois
//   node comprobar_accesibilidade.js <index.html> <ruta a axe.min.js> [ancho=320] [idioma=gl] [tema=claro]
// Escribe "TODO OK" ou unha liña por ruta con incumprimentos ou desbordamento horizontal.
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const [html, axeRuta, anchoArg, lang = 'gl', tema = 'claro'] = process.argv.slice(2);
if (!html || !axeRuta) { console.error('Uso: node comprobar_accesibilidade.js <html> <axe.min.js> [ancho] [idioma] [tema]'); process.exit(1); }
const ancho = Number(anchoArg || 320);
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const axe = fs.readFileSync(axeRuta, 'utf8');
const rutina = `
;(async () => {
  const e = (ms) => new Promise((r) => setTimeout(r, ms));
  const A = window.__app; const out = [];
  A.setTema('${tema}'); A.setIdioma('${lang}');
  const admin = ['panel','uso','avisos','axenda','instalacions','horarios','normas','marca','validar-qr'];
  const rutas = ['inicio','ficha','reservas','usuario','acceso','accesibilidade','privacidade','panel','uso','avisos','axenda','instalacions','horarios','normas','marca','validar-qr','reserva-mobil','superadmin'];
  for (const r of rutas) {
    A.entrar(admin.includes(r) ? 'xestor' : r === 'superadmin' ? 'superadmin' : 'chave365'); await e(500);
    A.ir(r); await e(700);
    const res = await axe.run(document.querySelector('#app'), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } });
    const v = res.violations.map((x) => x.id + '(' + x.impact + ')x' + x.nodes.length + ' ' + (x.nodes[0] && x.nodes[0].target ? String(x.nodes[0].target).slice(0, 70) : ''));
    const sw = document.documentElement.scrollWidth, cw = document.documentElement.clientWidth;
    if (v.length || sw > cw + 1) out.push(r + ': ' + v.join(' ; ') + (sw > cw + 1 ? ' | DESBORDE ' + sw + '>' + cw : ''));
  }
  return out.length ? out.join(String.fromCharCode(10)) : 'TODO OK';
})()`;

(async () => {
  const porto = 9400 + Math.floor(Math.random() * 100);
  const proc = spawn(edge, ['--headless=new', '--remote-debugging-port=' + porto, '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'edge-axe-')), '--no-first-run', '--hide-scrollbars', '--allow-file-access-from-files', 'about:blank'], { stdio: 'ignore' });
  let info = null;
  for (let i = 0; i < 60 && !info; i++) { try { info = await (await fetch('http://127.0.0.1:' + porto + '/json/list')).json(); if (!info.length) info = null; } catch (e) { await new Promise((r) => setTimeout(r, 200)); } }
  const ws = new WebSocket(info.find((x) => x.type === 'page').webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r));
  let n = 0; const pend = {};
  ws.addEventListener('message', (m) => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) { pend[d.id](d); delete pend[d.id]; } });
  const cdp = (m, p = {}) => new Promise((r) => { const id = ++n; pend[id] = r; ws.send(JSON.stringify({ id, method: m, params: p })); });
  await cdp('Emulation.setDeviceMetricsOverride', { width: ancho, height: 900, deviceScaleFactor: 1, mobile: false });
  await cdp('Page.navigate', { url: 'file:///' + html.replace(/\\/g, '/') + '?limpo' });
  await new Promise((r) => setTimeout(r, 2500));
  const r = await cdp('Runtime.evaluate', { expression: axe + rutina, awaitPromise: true, returnByValue: true });
  console.log(r.result && r.result.result ? r.result.result.value : JSON.stringify(r.result));
  ws.close(); proc.kill(); process.exit(0);
})();

// SPDX-License-Identifier: EUPL-1.2
// SPDX-FileCopyrightText: 2026 [TITULAR]
// Captura todas as pantallas (altura completa) con Edge en modo headless, vía CDP.
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { NOME_PROXECTO } = require('../fonte/config_proxecto');

const [html, saida] = process.argv.slice(2);
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const perfil = fs.mkdtempSync(path.join(os.tmpdir(), 'edge-capt-'));
const url = 'file:///' + html.replace(/\\/g, '/');

const PANTALLAS = [
  ['inicio', 'inicio-e-instalacions'], ['ficha', 'ficha-e-reserva'], ['reservas', 'reservas'], ['usuario', 'a-mina-conta'],
  ['acceso', 'acceso'], ['panel', 'panel-indicadores'], ['uso', 'resumo-de-uso'], ['avisos', 'avisos'],
  ['axenda', 'axenda-de-reservas'], ['instalacions', 'instalacions'], ['horarios', 'horarios-e-peches'],
  ['normas', 'normas-de-uso'], ['marca', 'marca-do-concello'], ['validar-qr', 'validar-qr'],
  ['reserva-mobil', 'reserva-con-qr'], ['superadmin', 'superadministracion'], ['accesibilidade', 'declaracion-de-accesibilidade'], ['privacidade', 'politica-de-privacidade']
];
const ROL = (r) => (['panel', 'uso', 'avisos', 'axenda', 'instalacions', 'horarios', 'normas', 'marca', 'validar-qr'].includes(r) ? 'xestor' : r === 'superadmin' ? 'superadmin' : ['reservas', 'usuario', 'reserva-mobil'].includes(r) ? 'chave365' : '');
const TAMANOS = [
  { dir: 'escritorio-claro', w: 1440, mobil: false, tema: 'claro' },
  { dir: 'movil-claro', w: 390, mobil: false, tema: 'claro' },
  { dir: 'escritorio-escuro', w: 1440, mobil: false, tema: 'escuro' }
];

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const proc = spawn(edge, ['--headless=new', '--remote-debugging-port=9333', '--user-data-dir=' + perfil, '--no-first-run', '--hide-scrollbars', '--allow-file-access-from-files', 'about:blank'], { stdio: 'ignore' });
  let info = null;
  for (let i = 0; i < 50 && !info; i++) {
    try { info = await (await fetch('http://127.0.0.1:9333/json/list')).json(); if (!info.length) info = null; } catch (e) { await esperar(200); }
  }
  const alvo = info.find((x) => x.type === 'page');
  const ws = new WebSocket(alvo.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r));
  let n = 0;
  const pend = {};
  ws.addEventListener('message', (m) => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) { pend[d.id](d); delete pend[d.id]; } });
  const cdp = (method, params = {}) => new Promise((r) => { const id = ++n; pend[id] = r; ws.send(JSON.stringify({ id, method, params })); });
  await cdp('Page.enable');
  let total = 0;
  for (const t of TAMANOS) {
    fs.mkdirSync(path.join(saida, t.dir), { recursive: true });
    let i = 0;
    for (const [ruta, nome] of PANTALLAS) {
      i++;
      if (t.mobil && ruta === 'ficha') { /* a ficha móbil sérvese soa por ancho */ }
      await cdp('Emulation.setDeviceMetricsOverride', { width: t.w, height: 900, deviceScaleFactor: 1, mobile: t.mobil });
      await cdp('Page.navigate', { url: 'about:blank' });
      await cdp('Page.navigate', { url: url + '?limpo#' + ruta });
      await esperar(900);
      await cdp('Runtime.evaluate', { awaitPromise: true, expression: "(async () => { try{localStorage.setItem('" + NOME_PROXECTO + "-tema','" + t.tema + "');localStorage.setItem('" + NOME_PROXECTO + "-idioma','gl');}catch(e){}; window.__app && window.__app.setTema('" + t.tema + "'); " + (ROL(ruta) ? "window.__app.entrar('" + ROL(ruta) + "'); document.getElementById('aviso').hidden = true; await new Promise((r) => setTimeout(r, 1000)); " : "") + "window.__app && window.__app.ir('" + ruta + "'); return 1; })()" });
      await esperar(900);
      const h = await cdp('Runtime.evaluate', { expression: 'Math.max(document.documentElement.scrollHeight, 600)', returnByValue: true });
      const alto = Math.min(h.result.result.value, 6000);
      await cdp('Emulation.setDeviceMetricsOverride', { width: t.w, height: alto, deviceScaleFactor: 1, mobile: t.mobil });
      await esperar(300);
      const cap = await cdp('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
      fs.writeFileSync(path.join(saida, t.dir, String(i).padStart(2, '0') + '_' + nome + '.png'), Buffer.from(cap.result.data, 'base64'));
      total++;
    }
  }
  ws.close();
  proc.kill();
  console.log('Capturas:', total);
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });

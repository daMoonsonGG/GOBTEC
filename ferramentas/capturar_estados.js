// SPDX-License-Identifier: EUPL-1.2
// SPDX-FileCopyrightText: 2026 DeporteAberto contributors
// Captura estados (formularios, erros, confirmacións) de cada pantalla con Edge headless.
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { NOME_PROXECTO } = require('../fonte/config_proxecto');

const [html, saida] = process.argv.slice(2);
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const perfil = fs.mkdtempSync(path.join(os.tmpdir(), 'edge-est-'));
const url = 'file:///' + html.replace(/\\/g, '/');

const PRE = `
const e = (ms) => new Promise((r) => setTimeout(r, ms || 300));
const A = window.__app;
const set = (id, v) => { const x = document.querySelector('#' + id); if (!x) throw new Error('sen #' + id); x.value = v; x.dispatchEvent(new Event(x.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true })); };
const clic = async (t, i) => { const bs = [...document.querySelectorAll('#app button')].filter((x) => x.textContent.trim() === t); const b = bs[i || 0]; if (!b) throw new Error('sen botón ' + t); b.click(); await e(250); };
const ir = async (r) => { A.ir(r); await e(700); };
const entrar = async () => { A.entrar('chave365'); await e(600); };
`;
const E = (g, id, nome, ruta, setup, soMovil) => ({ g, id, nome, ruta, setup, soMovil });
const ESTADOS = [
  // Concello
  E('concello', 'instalacions-nova', 'Instalacións · alta nova', 'instalacions', "await clic('Dar de alta unha instalación');"),
  E('concello', 'instalacions-erro-nome', 'Instalacións · erro: falta o nome', 'instalacions', "await clic('Dar de alta unha instalación'); await clic('Gardar');"),
  E('concello', 'instalacions-borrar', 'Instalacións · confirmar borrado', 'instalacions', "await clic('Borrar');"),
  E('concello', 'horarios-martes-pechado', 'Horarios · día desactivado', 'horarios', "[...document.querySelectorAll('#app input[type=checkbox]')].find((x) => x.closest('label').textContent.includes('Martes')).click(); await e();"),
  E('concello', 'horarios-peche-creado', 'Horarios · peche creado', 'horarios', "await clic('Crear o peche e avisar');"),
  E('concello', 'horarios-erro-datas', 'Horarios · erro nas datas', 'horarios', "set('ata', '2026-11-12T10:00'); await e(); await clic('Crear o peche e avisar');"),
  E('concello', 'normas-erro', 'Normas · erro de antelación', 'normas', "set('minima', '9999'); await e(); await clic('Gardar as normas');"),
  E('concello', 'normas-gardadas', 'Normas · gardadas', 'normas', "await clic('Gardar as normas');"),
  E('concello', 'axenda-reserva-creada', 'Axenda · reserva para un veciño', 'axenda', "set('persoa', 'Ana P.'); await e(); await clic('Crear a reserva');"),
  E('concello', 'axenda-asistiu', 'Axenda · asistencia rexistrada', 'axenda', "await clic('Asistiu');"),
  E('concello', 'avisos-erro', 'Avisos · erro: falta o motivo', 'avisos', "await clic('Publicar aviso e notificar');"),
  E('concello', 'avisos-publicado', 'Avisos · aviso publicado e notificado', 'avisos', "set('afectada', 'Piscina Municipal A Ribeira'); set('desde', '2026-11-20'); set('ata', '2026-11-22'); set('motivo', 'Avaría na depuradora'); set('mensaxe', 'Desculpade as molestias.'); await e(); const cb = [...document.querySelectorAll('#app fieldset input[type=checkbox]')]; cb[2].click(); await e(80); cb[3].click(); await e(80); await clic('Publicar aviso e notificar');"),
  E('concello', 'marca-contraste', 'Marca · contraste insuficiente', 'marca', "set('cor', '#ffee00'); await e();"),
  E('concello', 'uso-taboa', 'Resumo de uso · vista en táboa', 'uso', "await clic('Táboa');"),
  E('concello', 'uso-agosto', 'Resumo de uso · agosto', 'uso', "set('periodo', 'ago'); await e();"),
  E('concello', 'validar-qr-usado', 'Validar QR · código xa usado', 'validar-qr', "await clic('Xa usado');"),
  E('concello', 'validar-qr-falso', 'Validar QR · código non válido', 'validar-qr', "await clic('Falso');"),
  E('concello', 'validar-qr-entrada', 'Validar QR · entrada rexistrada', 'validar-qr', "await clic('Válido'); await clic('Rexistrar a entrada');"),
  // Superadmin
  E('superadmin', 'superadmin-erro-alta', 'Superadministración · erros no alta', 'superadmin', "await clic('Crear o concello');"),
  E('superadmin', 'superadmin-concello-creado', 'Superadministración · concello creado', 'superadmin', "set('nome', 'Concello de Proba'); set('correo', 'xestion@proba.example'); set('telefono', '655 444 333'); await e(); await clic('Crear o concello');"),
  E('superadmin', 'superadmin-xestor-engadido', 'Superadministración · persoa xestora engadida', 'superadmin', "set('xestor', 'nova@concello-de-exemplo.example'); set('xestor-tel', '611 222 333'); await e(); await clic('Engadir');"),
  E('superadmin', 'superadmin-desactivado', 'Superadministración · concello desactivado', 'superadmin', "await clic('Desactivar');"),
  // Cidadanía
  E('cidadania', 'inicio-filtro-padel', 'Inicio · filtro por pádel', 'inicio', "await clic('Pádel');"),
  E('cidadania', 'inicio-convidado', 'Inicio · como convidado', 'inicio', "A.entrar('convidado'); await e(700);"),
  E('cidadania', 'ficha-franxa-elixida', 'Ficha · franxa elixida con sesión', 'ficha', "await entrar(); await ir('ficha'); document.querySelector('#app button[aria-label$=\"libre\"]').click(); await e();"),
  E('cidadania', 'ficha-reserva-confirmada', 'Ficha · reserva confirmada', 'ficha', "await entrar(); await ir('ficha'); document.querySelector('#app button[aria-label$=\"libre\"]').click(); await e(); await clic('Confirmar a reserva');"),
  E('cidadania', 'reservas-con-sesion', 'Reservas · con sesión', 'reservas', "await entrar(); await ir('reservas');"),
  E('cidadania', 'reservas-cancelar', 'Reservas · confirmar cancelación', 'reservas', "await entrar(); await ir('reservas'); await clic('Cancelar');"),
  E('cidadania', 'conta-con-sesion', 'A miña conta · con sesión', 'usuario', "await entrar(); await ir('usuario');"),
  E('cidadania', 'conta-erro-telefono', 'A miña conta · erro no teléfono', 'usuario', "await entrar(); await ir('usuario'); set('telefono', '123'); await e(); await clic('Gardar os avisos');"),
  E('cidadania', 'menu-movil-aberto', 'Menú móbil despregado', 'inicio', "document.querySelector('#app .menu-btn').click(); await e();", true)
];
const TAMANOS = [{ dir: 'escritorio-claro', w: 1440 }, { dir: 'movil-claro', w: 390 }];
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const proc = spawn(edge, ['--headless=new', '--remote-debugging-port=9334', '--user-data-dir=' + perfil, '--no-first-run', '--hide-scrollbars', '--allow-file-access-from-files', 'about:blank'], { stdio: 'ignore' });
  let info = null;
  for (let i = 0; i < 50 && !info; i++) { try { info = await (await fetch('http://127.0.0.1:9334/json/list')).json(); if (!info.length) info = null; } catch (e) { await esperar(200); } }
  const alvo = info.find((x) => x.type === 'page');
  const ws = new WebSocket(alvo.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r));
  let n = 0; const pend = {};
  ws.addEventListener('message', (m) => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) { pend[d.id](d); delete pend[d.id]; } });
  const cdp = (method, params = {}) => new Promise((r) => { const id = ++n; pend[id] = r; ws.send(JSON.stringify({ id, method, params })); });
  await cdp('Page.enable');
  const indice = []; const fallos = [];
  for (const t of TAMANOS) {
    fs.mkdirSync(path.join(saida, t.dir), { recursive: true });
    let k = 0;
    for (const s of ESTADOS) {
      k++;
      if (s.soMovil && t.w > 800) continue;
      await cdp('Emulation.setDeviceMetricsOverride', { width: t.w, height: 900, deviceScaleFactor: 1, mobile: false });
      await cdp('Page.navigate', { url: 'about:blank' });
      await cdp('Page.navigate', { url: url + '?limpo#' + s.ruta });
      await esperar(1000);
      const expr = '(async () => { try { ' + PRE + " localStorage.setItem('" + NOME_PROXECTO + "-tema','claro'); localStorage.setItem('" + NOME_PROXECTO + "-idioma','gl'); A.setTema('claro'); " + (s.g === 'concello' ? "A.entrar('xestor'); document.getElementById('aviso').hidden = true; await e(900); " : s.g === 'superadmin' ? "A.entrar('superadmin'); document.getElementById('aviso').hidden = true; await e(900); " : '') + "await ir('" + s.ruta + "'); " + s.setup + " await e(500); return 'ok'; } catch (err) { return 'ERRO ' + (err && err.message || err); } })()";
      const r = await cdp('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
      const res = r.result && r.result.result ? r.result.result.value : 'sen resposta';
      if (res !== 'ok') fallos.push(t.dir + '/' + s.id + ': ' + res);
      const h = await cdp('Runtime.evaluate', { expression: 'Math.max(document.documentElement.scrollHeight, 600)', returnByValue: true });
      const alto = Math.min(h.result.result.value, 6000);
      await cdp('Emulation.setDeviceMetricsOverride', { width: t.w, height: alto, deviceScaleFactor: 1, mobile: false });
      await esperar(300);
      const cap = await cdp('Page.captureScreenshot', { format: 'png' });
      const ficheiro = s.g + '_' + String(k).padStart(2, '0') + '_' + s.id;
      fs.writeFileSync(path.join(saida, t.dir, ficheiro + '.png'), Buffer.from(cap.result.data, 'base64'));
      if (t.dir === 'escritorio-claro' || s.soMovil) indice.push({ g: s.g, ficheiro, nome: s.nome, soMovil: !!s.soMovil });
    }
  }
  fs.writeFileSync(path.join(saida, 'indice.json'), JSON.stringify({ estados: indice, fallos }, null, 2));
  ws.close(); proc.kill();
  console.log('Estados:', ESTADOS.length, '· fallos:', fallos.length); fallos.forEach((f) => console.log(' -', f));
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });

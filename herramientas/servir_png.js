// SPDX-License-Identifier: EUPL-1.2
// SPDX-FileCopyrightText: 2026 [TITULAR]
// Serve SOLO as capturas PNG en localhost, con CORS, para cargalas en Penpot.
const http = require('http');
const fs = require('fs');
const path = require('path');
const raiz = path.resolve(process.argv[2]);
const porto = Number(process.argv[3] || 8125);
const cab = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Private-Network': 'true', 'Cache-Control': 'no-store' };
http.createServer((req, res) => {
  if (req.method === 'OPTIONS') { res.writeHead(204, cab); res.end(); return; }
  const nome = decodeURIComponent(req.url.split('?')[0]);
  const ruta = path.resolve(path.join(raiz, nome));
  const b64 = ruta.endsWith('.b64'); const real = b64 ? ruta.slice(0, -4) + '.png' : ruta;
  if (!real.startsWith(raiz) || !real.endsWith('.png') || !fs.existsSync(real)) { res.writeHead(404, cab); res.end('Non atopado'); return; }
  if (b64) { res.writeHead(200, Object.assign({ 'Content-Type': 'text/plain' }, cab)); res.end(fs.readFileSync(real).toString('base64')); return; }
  res.writeHead(200, Object.assign({ 'Content-Type': 'image/png' }, cab));
  fs.createReadStream(real).pipe(res);
}).listen(porto, '127.0.0.1', () => console.log('PNG en http://localhost:' + porto));

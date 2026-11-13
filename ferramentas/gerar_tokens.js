// SPDX-License-Identifier: EUPL-1.2
// SPDX-FileCopyrightText: 2026 DeporteAberto contributors
// Xera os tokens de deseño (formato DTCG) a partir dos valores reais da web.
const fs = require('fs');
const path = require('path');
const saida = process.argv[2];
fs.mkdirSync(saida, { recursive: true });

const lum = (hex) => {
  const c = (i) => { const v = parseInt(hex.substr(i, 2), 16) / 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  return 0.2126 * c(1) + 0.7152 * c(3) + 0.0722 * c(5);
};
const marcaEscura = (hex) => {
  const fondo = lum('#11161C');
  const mestura = (i, p) => Math.round(parseInt(hex.substr(i, 2), 16) * (1 - p) + 255 * p);
  const pasar = (n) => (n < 16 ? '0' : '') + n.toString(16);
  for (let p = 0; p <= 1; p += 0.05) {
    const cor = '#' + pasar(mestura(1, p)) + pasar(mestura(3, p)) + pasar(mestura(5, p));
    if ((lum(cor) + 0.05) / (fondo + 0.05) >= 6) return cor.toUpperCase();
  }
  return '#FFFFFF';
};
const cor = (v, desc) => ({ $type: 'color', $value: v, ...(desc ? { $description: desc } : {}) });
const dim = (v) => ({ $type: 'dimension', $value: v });

const base = {
  space: { 1: dim('4px'), 2: dim('8px'), 3: dim('12px'), 4: dim('16px'), 5: dim('20px'), 6: dim('24px'), 8: dim('32px'), 10: dim('40px'), 16: dim('64px') },
  radius: { sm: dim('4px'), md: dim('6px'), lg: dim('8px'), xl: dim('12px') },
  font: {
    family: { base: { $type: 'fontFamily', $value: 'Atkinson Hyperlegible', $description: 'OFL-1.1. Debe autoalojarse (sin Google Fonts) en el producto final.' } },
    size: { xs: dim('14px'), sm: dim('15px'), base: dim('17px'), md: dim('19px'), lg: dim('20px'), xl: dim('22px'), '2xl': dim('24px'), '3xl': dim('28px'), display: dim('44px') },
    weight: { regular: { $type: 'fontWeight', $value: 400 }, bold: { $type: 'fontWeight', $value: 700 } },
    lineHeight: { base: { $type: 'number', $value: 1.5 }, title: { $type: 'number', $value: 1.12 } }
  },
  size: { tap: dim('44px'), 'tap-lg': dim('52px') }
};

const claro = {
  color: {
    fondo: cor('#FFFFFF'), superficie: cor('#F3F5F8'), superficie2: cor('#E6EAF0'),
    texto: cor('#141A22'), texto2: cor('#4A5462', 'Texto secundario'),
    linea: cor('#CBD2DB'), 'linea-forte': cor('#6B7686'), forte: cor('#141A22'), 'sobre-forte': cor('#FFFFFF'),
    brand: { base: cor('#0B5CAD', 'Color de marca del concello. Solo cambia este token y el logotipo por concello.'), sobre: cor('#FFFFFF') },
    calendario: {
      libre: { fondo: cor('#DDF3E4'), texto: cor('#0B4A22'), borde: cor('#1E8E4A') },
      ocupada: { fondo: cor('#FBE0E0'), texto: cor('#7A1212'), borde: cor('#C62828') },
      pechada: { fondo: cor('#4A5159', 'Va con rayas diagonales (#4A5159 / #373D43, 45°)'), raias: cor('#373D43'), texto: cor('#FFFFFF'), borde: cor('#2B3036') },
      mia: { fondo: cor('#0B5CAD'), texto: cor('#FFFFFF'), borde: cor('#0B5CAD') }
    }
  }
};
const escuro = {
  color: {
    fondo: cor('#11161C'), superficie: cor('#1A212A'), superficie2: cor('#2A333F'),
    texto: cor('#EEF1F5'), texto2: cor('#B3BCC8'),
    linea: cor('#3A4553'), 'linea-forte': cor('#8894A3'), forte: cor('#EEF1F5'), 'sobre-forte': cor('#11161C'),
    brand: { base: cor(marcaEscura('#0B5CAD'), 'Marca aclarada hasta contraste 6:1 sobre el fondo oscuro'), sobre: cor('#11161C') },
    calendario: {
      libre: { fondo: cor('#123B22'), texto: cor('#BDF2CD'), borde: cor('#3FB66B') },
      ocupada: { fondo: cor('#4A1717'), texto: cor('#FFD1D1'), borde: cor('#E5534B') },
      pechada: { fondo: cor('#5A626C', 'Va con rayas diagonales (#5A626C / #474E57, 45°)'), raias: cor('#474E57'), texto: cor('#FFFFFF'), borde: cor('#98A2B0') },
      mia: { fondo: cor('#5AA2F0'), texto: cor('#0B1016'), borde: cor('#5AA2F0') }
    }
  }
};
const w = (n, o) => fs.writeFileSync(path.join(saida, n), JSON.stringify(o, null, 2) + '\n', 'utf8');
w('tokens-base.json', base);
w('tokens-claro.json', claro);
w('tokens-escuro.json', escuro);
console.log('Marca escura:', escuro.color.brand.base.$value);

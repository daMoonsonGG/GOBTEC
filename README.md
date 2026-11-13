# DeporteAberto

Prototipo **só de interface** para xestionar e reservar instalacións deportivas municipais. A aplicación non ten
servidor nin base de datos; usa datos ficticios e o estado de proba pérdese ao recargar a páxina. Inclúe galego,
castelán e inglés, temas claro e escuro, e vistas adaptadas ao escritorio e ao móbil.

## Probar a aplicación

Abre [`index.html`](./index.html) nun navegador moderno. O ficheiro inclúe a aplicación completa e a tipografía
autoaloxada; non solicita recursos remotos para amosar a interface. A barra superior permite cambiar de pantalla e
alternar entre as vistas de escritorio e móbil. `?limpo` agocha esa barra de probas.

As 20 fontes `pantallas-fonte/*.dc.html` son exportacións do lenzo de deseño e fan referencia a `./support.js`, que non
forma parte do repositorio. A forma prevista de usar o prototipo é abrir o HTML construído, non esas fontes.

## Estrutura

| Ruta | Contido |
|---|---|
| `index.html` | Aplicación xerada; non editar manualmente. |
| `pantallas-fonte/` | 20 fontes de pantalla e `canvas.json`. |
| `fonte/construir_proba.js` | Construtor da aplicación e o seu motor de modelos. |
| `fonte/config_proxecto.js` | Identificador único do proxecto (`NOME_PROXECTO`). |
| `fonte/i18n_es.js`, `fonte/i18n_en.js` | Traducións desde o galego, idioma de orixe. |
| `fonte/tipografia/` | Atkinson Hyperlegible autoaloxada e a súa licenza OFL-1.1. |
| `ferramentas/` | Scripts locais para capturas, comprobación da accesibilidade e xeración de tokens. |
| `ARQUITETURA.md` | Arquitectura, convencións e fluxo de desenvolvemento. |
| `LICENSE`, `LICENSES/` | EUPL-1.2 e licenzas de terceiros. |
| `REUSE.toml` | Metadatos de licenza para ficheiros sen cabeceira SPDX. |

Hai 16 pantallas principais e 4 fontes auxiliares. O selector da barra de probas amosa as principais; as auxiliares
úsanse para as vistas móbiles e os estados de acceso.

## Desenvolvemento

Precísase Node.js 18 ou superior. Desde a raíz do proxecto:

```bash
node fonte/construir_proba.js pantallas-fonte index.html fragmento.html
```

O construtor xera `index.html` e `fragmento.html` e comproba a sintaxe do JavaScript xerado. Edita as fontes
`pantallas-fonte/` e `fonte/`, e volve construír despois de cada cambio. Consulta [ARQUITETURA.md](./ARQUITETURA.md) para
coñecer as limitacións do motor e as comprobacións recomendadas.

## Licenza

O proxecto distribúese baixo a EUPL-1.2. Consulta [LICENSE](./LICENSE), [LICENZA.md](./LICENZA.md) e
[AVISOS_TERCEIROS.md](./AVISOS_TERCEIROS.md).

O prototipo simula o inicio de sesión, as notificacións e as reservas; non procesa datos reais nin substitúe unha
auditoría de accesibilidade ou unha revisión legal.

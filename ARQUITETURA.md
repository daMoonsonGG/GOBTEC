# Arquitectura e desenvolvemento

## Ámbito

O repositorio contén un prototipo de interface para reservar instalacións deportivas municipais. Non hai servidor,
autenticación real, base de datos nin envío de comunicacións: as contas, as reservas e os avisos son simulados. Os datos
visibles son de exemplo. O produto para probar é [`index.html`](./index.html), xerado a partir das fontes.

## Pantallas e navegación

Hai 20 ficheiros `*.dc.html`: 16 pantallas principais e catro fontes auxiliares (`ReservaMobil`, `ValidarQR`,
`FichaMobil` e `Restrinxido`). As rutas principais son `inicio`, `ficha`, `reservas`, `acceso`, `panel`, `usuario`,
`accesibilidade`, `privacidade`, `uso`, `avisos`, `axenda`, `instalacions`, `horarios`, `normas`, `marca` e
`superadmin`. A navegación do prototipo usa o fragmento do URL (`#inicio`, `#ficha`, etc.).

Cada fonte combina un modelo HTML, estilos e unha clase `Component`. O construtor extrae eses bloques, aplica as
adaptacións que conectan as pantallas, engade o runtime e os dicionarios de idioma, e escribe un único HTML. As
exportacións `.dc.html` pertencen ao formato do lenzo de deseño e fan referencia a `./support.js`, que non está neste
repositorio; para usar a aplicación, abre o HTML construído.

## Construción

Precísase Node.js 18 ou superior. Desde a raíz:

```bash
node fonte/construir_proba.js pantallas-fonte index.html fragmento.html
```

`index.html` é unha saída xerada e non se edita directamente. `fragmento.html` é unha variante sen a estrutura
`<html>/<head>`. O construtor tamén valida a sintaxe do script final e detense se algún dos parches de unión non atopa o
código fonte esperado.

O nome do proxecto configúrase unha soa vez en `fonte/config_proxecto.js`: `NOME_PROXECTO` vale
`reservas-deportivas`. O construtor úsao nas claves das preferencias de `localStorage`, no `PRODID` e nos
identificadores do calendario iCalendar, así como no título alternativo do documento.

## Motor de modelos

- Os marcadores `{{ruta.con.puntos}}` só buscan valores; non aceptan expresións. Calcula en JavaScript calquera valor
  derivado e devólveo desde `renderVals()`.
- `<sc-if value="{{condicion}}">` e `<sc-for list="{{lista}}" as="elemento">` son as estruturas dinámicas admitidas.
- Non uses `<sc-for>` dentro de `<select>` ou `<table>`: o analizador HTML pode descartalo. Para as opcións usa
  `data-opcions="{{lista}}"`; para as táboas dinámicas, `div` cos roles `table`, `row` e `cell`.
- Os atributos `value`, `checked` e `disabled` actualízanse como propiedades. En `<textarea>`, usa
  `value="{{valor}}"`.
- Os eventos declarados no modelo resólvense mediante funcións de `renderVals()` e deléganse no contedor da aplicación.
- O código do construtor que xera o runtime usa modelos de cadea: escapa as barras invertidas que deban chegar ao
  JavaScript xerado (por exemplo, `\\s`).
- Non agoches os erros da construción nin engadas valores predeterminados que disimulen parches ou traducións que falten.

## Estado compartido e conexión entre pantallas

`window.__app` coordina as pantallas e conserva o usuario simulado, a sesión, os avisos, as reservas, o idioma, o tema e
as instalacións. A pantalla `Instalacions` contén a lista principal; `Main`, `Uso`, `Horarios`, `Ficha` e `FichaMobil`
len dela. Os peches de `Horarios` bloquean franxas na ficha e crean avisos. As reservas creadas na ficha aparecen en
`Reservas` e nas vistas de xestión.

As instancias das pantallas consérvanse na caché durante a navegación. Os fluxos de inicio e peche de sesión e de
selección dunha instalación reinician as instancias que dependen deses datos.

## Idiomas, estilos e accesibilidade

O galego é o idioma de orixe. Todo texto novo da interface tamén debe engadirse a `fonte/i18n_es.js` e
`fonte/i18n_en.js`. As claves son cadeas exactas en galego; para as frases variables úsanse as regras de tradución
existentes neses ficheiros.

Os estilos e estados visuais defínense nas fontes e no construtor. Non comuniques un estado só mediante a cor: conserva
a súa icona e o seu texto. Mantén as etiquetas dos formularios, o foco visible, a navegación co teclado e os avisos
accesibles.

## Comprobacións

Despois de cambiar as fontes ou a lóxica:

1. Volve construír co comando anterior e comproba que non hai erros.
2. Percorre as 16 pantallas principais e as vistas auxiliares en escritorio e móbil.
3. Comproba os textos en galego, castelán e inglés, así como os temas claro e escuro.
4. Revisa o foco, o teclado, as etiquetas, os avisos e o reflow a 320 px. `ferramentas/comprobar_accesibilidade.js`
  pode executar axe-core se se lle proporciona unha copia local de `axe.min.js`; non carga esa dependencia da web.

Os scripts de captura e comprobación son ferramentas de desenvolvemento; non forman parte do produto publicado.

## Limitacións coñecidas

- As sesións, os datos, as comunicacións e os pagamentos non son reais; o estado non persistente pérdese ao recargar.
- Os indicadores dos meses anteriores usan cifras de exemplo.
- O prototipo non integra a comprobación do empadroamento nin ofrece garantías de illamento entre concellos.
- Hai comprobacións automatizadas de accesibilidade, pero aínda cómpre facer probas manuais con lectores de pantalla e
  dispositivos reais.
- As iconas SVG teñen un estilo visual semellante ao de Lucide; aínda cómpre confirmar a súa procedencia e se coinciden
  con iconas desa colección. Consulta [AVISOS_TERCEROS.md](./AVISOS_TERCEROS.md).

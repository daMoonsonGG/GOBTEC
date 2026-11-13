// SPDX-License-Identifier: EUPL-1.2
// SPDX-FileCopyrightText: 2026 DeporteAberto contributors
const REGRAS_ES = [];
const DIC_ES = {
  // Navegación e cabeceiras
  'Saltar ao contido': 'Saltar al contenido',
  'Principal': 'Principal',
  'Xestión': 'Gestión',
  'Instalacións': 'Instalaciones',
  'As miñas reservas': 'Mis reservas',
  'Reservas': 'Reservas',
  'Avisos': 'Avisos',
  'Avisos (1)': 'Avisos (1)',
  'Entrar': 'Entrar',
  'Entrar agora': 'Entrar ahora',
  'Modo claro': 'Modo claro',
  'Modo escuro': 'Modo oscuro',
  'Ver o sitio público': 'Ver el sitio público',
  'Volver ás instalacións': 'Volver a las instalaciones',
  'Ribadouro': 'Ribadouro',
  'Concello de Ribadouro': 'Ayuntamiento de Ribadouro',
  'Concello de Valdeira': 'Ayuntamiento de Valdeira',
  'Concello de Monteferro': 'Ayuntamiento de Monteferro',
  'Concello de exemplo con datos ficticios': 'Ayuntamiento de ejemplo con datos ficticios',
  'Declaración de accesibilidade': 'Declaración de accesibilidad',
  'Privacidade': 'Privacidad',
  'Contacto': 'Contacto',

  // Títulos de páxina
  'Instalacións deportivas': 'Instalaciones deportivas',
  'Reservar': 'Reservar',
  'Reservar pádel (móbil)': 'Reservar pádel (móvil)',
  'Reserva con QR (móbil)': 'Reserva con QR (móvil)',
  'Validar QR (móbil)': 'Validar QR (móvil)',
  'Superadministración': 'Superadministración',
  'Superadministración da plataforma': 'Superadministración de la plataforma',
  'Concellos e persoas xestoras': 'Ayuntamientos y personas gestoras',
  'Acceso': 'Acceso',

  // Barra de proba
  'Cidadanía': 'Ciudadanía',
  'Concello': 'Ayuntamiento',
  'Inicio e instalacións': 'Inicio e instalaciones',
  'Ficha e reserva': 'Ficha y reserva',
  'As miñas reservas e avisos': 'Mis reservas y avisos',
  'Aínda non dispoñible nesta versión de proba.': 'Aún no disponible en esta versión de prueba.',

  // Inicio
  'Reserva as instalacións deportivas de Ribadouro': 'Reserva las instalaciones deportivas de Ribadouro',
  'Reserva as instalacións deportivas': 'Reserva las instalaciones deportivas',
  'Consulta a dispoñibilidade real sen iniciar sesión. Só tes que identificarte para reservar.': 'Consulta la disponibilidad real sin iniciar sesión. Solo tienes que identificarte para reservar.',
  'Filtrar instalacións': 'Filtrar instalaciones',
  'Deporte': 'Deporte',
  'Data': 'Fecha',
  'Só instalacións accesibles': 'Solo instalaciones accesibles',
  '1 instalación': '1 instalación',
  'Ningunha instalación coincide con estes filtros.': 'Ninguna instalación coincide con estos filtros.',
  'Quitar filtros': 'Quitar filtros',
  '[Foto da instalación]': '[Foto de la instalación]',
  'Accesible': 'Accesible',
  'Acceso sen adaptar': 'Acceso sin adaptar',
  'Ver dispoñibilidade': 'Ver disponibilidad',
  'Todos': 'Todos',
  'Todas': 'Todas',
  'Pádel': 'Pádel',
  'Fútbol': 'Fútbol',
  'Fútbol sala': 'Fútbol sala',
  'Fútbol sala, Baloncesto': 'Fútbol sala, Baloncesto',
  'Baloncesto': 'Baloncesto',
  'Natación': 'Natación',
  'Tenis': 'Tenis',
  'Ioga': 'Yoga',

  // Instalacións (nomes descritivos; os topónimos non se traducen)
  'Pistas de pádel do Campo da Feira': 'Pistas de pádel del Campo da Feira',
  'Pavillón Municipal': 'Pabellón Municipal',
  'Pavillón': 'Pabellón',
  'Piscina Municipal A Ribeira': 'Piscina Municipal A Ribeira',
  'Sala Polivalente da Casa da Cultura': 'Sala Polivalente de la Casa de la Cultura',
  'Pistas de pádel': 'Pistas de pádel',
  'Pistas de tenis': 'Pistas de tenis',
  '3 pistas cubertas': '3 pistas cubiertas',
  '1 pista central': '1 pista central',
  '6 rúas': '6 calles',
  '1 campo de herba artificial': '1 campo de césped artificial',
  '2 pistas': '2 pistas',
  'Aforo: 20 persoas': 'Aforo: 20 personas',
  'Pista 1, Pista 2 e Pista 3': 'Pista 1, Pista 2 y Pista 3',
  'Pista 1 e Pista 2': 'Pista 1 y Pista 2',
  'Rúas 1 a 6': 'Calles 1 a 6',
  'Franxas de 1 hora': 'Franjas de 1 hora',

  // Ficha
  'Dispoñibilidade': 'Disponibilidad',
  'Pista': 'Pista',
  'Anterior': 'Anterior',
  'Seguinte': 'Siguiente',
  'Lenda': 'Leyenda',
  'Libre': 'Libre',
  'Ocupada': 'Ocupada',
  'A túa reserva': 'Tu reserva',
  'A túa': 'Tuya',
  'Pechada': 'Cerrada',
  'Escollida': 'Elegida',
  'Hora': 'Hora',
  'Lun': 'Lun',
  'Mar': 'Mar',
  'Mér': 'Mié',
  'Xov': 'Jue',
  'Ven': 'Vie',
  'Sáb': 'Sáb',
  'Dom': 'Dom',
  'Podes moverte polo calendario coas frechas do teclado.': 'Puedes moverte por el calendario con las flechas del teclado.',
  'A túa selección': 'Tu selección',
  'Reserva confirmada': 'Reserva confirmada',
  'Escolle unha franxa libre no calendario.': 'Elige una franja libre en el calendario.',
  'Escolle unha franxa libre.': 'Elige una franja libre.',
  'Podes cancelar ata 24 horas antes.': 'Puedes cancelar hasta 24 horas antes.',
  'Máximo de 2 reservas activas por persoa.': 'Máximo de 2 reservas activas por persona.',
  'Confirmar a reserva': 'Confirmar la reserva',
  'Pedirémosche que te identifiques con Chave365 ou Cl@ve se aínda non iniciaches sesión.': 'Te pediremos que te identifiques con Chave365 o Cl@ve si aún no has iniciado sesión.',
  'Enviámosche a confirmación ao teu correo.': 'Te hemos enviado la confirmación a tu correo.',
  'Ver o código QR': 'Ver el código QR',
  'Engadir ao meu calendario (.ics)': 'Añadir a mi calendario (.ics)',
  'Engadir ao meu calendario': 'Añadir a mi calendario',
  'Engadir ao calendario': 'Añadir al calendario',
  'Reservar outra franxa': 'Reservar otra franja',
  'Esa franxa xa está reservada por outra persoa. Escolle outra.': 'Esa franja ya está reservada por otra persona. Elige otra.',
  'A instalación está pechada nesa franxa.': 'La instalación está cerrada en esa franja.',
  '[Mapa de OpenStreetMap]': '[Mapa de OpenStreetMap]',
  'Como chegar': 'Cómo llegar',
  'Rúa da Feira, 12. Acceso sen chanzos e aseo adaptado.': 'Rúa da Feira, 12. Acceso sin escalones y aseo adaptado.',

  // As miñas reservas
  'Próximas': 'Próximas',
  'Reserva cancelada. Enviámosche a confirmación ao teu correo.': 'Reserva cancelada. Te hemos enviado la confirmación a tu correo.',
  'Xa non podes modificala nin cancelala: este concello permíteo só ata 24 horas antes do inicio.': 'Ya no puedes modificarla ni cancelarla: este ayuntamiento solo lo permite hasta 24 horas antes del inicio.',
  'Queres cancelar esta reserva?': '¿Quieres cancelar esta reserva?',
  'Si, cancelar': 'Sí, cancelar',
  'Manter a reserva': 'Mantener la reserva',
  'Cambiar a hora': 'Cambiar la hora',
  'Cancelar': 'Cancelar',
  'Sen ler': 'Sin leer',
  'Cambio do concello': 'Cambio del ayuntamiento',
  'As pistas de pádel pechan o xoves 12 de novembro desde as 16:00 por obras. A túa reserva non se ve afectada.': 'Las pistas de pádel cierran el jueves 12 de noviembre desde las 16:00 por obras. Tu reserva no se ve afectada.',
  'Recordatorio': 'Recordatorio',
  'Mañá ás 08:00 tes reserva na Piscina Municipal A Ribeira.': 'Mañana a las 08:00 tienes reserva en la Piscina Municipal A Ribeira.',
  'Confirmación': 'Confirmación',
  'Historial': 'Historial',
  'Asistida': 'Asistida',
  'Cancelada': 'Cancelada',
  'Confirmada': 'Confirmada',
  'Non presentada': 'No presentada',
  'Os meus datos': 'Mis datos',
  'Só gardamos o teu nome, correo e, se queres, o teléfono.': 'Solo guardamos tu nombre, tu correo y, si quieres, tu teléfono.',
  'Descargar os meus datos (JSON)': 'Descargar mis datos (JSON)',
  'Borrar a miña conta': 'Borrar mi cuenta',
  'Código de acceso': 'Código de acceso',
  'Amosa este código no mostrador.': 'Muestra este código en el mostrador.',
  'Escolle unha reserva activa para ver o seu código.': 'Elige una reserva activa para ver su código.',

  // Acceso
  'Identifícate para reservar': 'Identifícate para reservar',
  'Consultar a dispoñibilidade non require conta. Para reservar, confirma quen es cun destes sistemas públicos.': 'Consultar la disponibilidad no requiere cuenta. Para reservar, confirma quién eres con uno de estos sistemas públicos.',
  'Entrar con Chave365': 'Entrar con Chave365',
  'Entrar con Cl@ve': 'Entrar con Cl@ve',
  'Modo de demostración: estes botóns usan unha identidade simulada, sen datos reais.': 'Modo de demostración: estos botones usan una identidad simulada, sin datos reales.',
  'Que datos gardamos': 'Qué datos guardamos',
  'O teu nome, correo e, se queres, o teléfono. Non gardamos o teu NIF. Podes descargar os teus datos ou borrar a conta cando queiras.': 'Tu nombre, tu correo y, si quieres, tu teléfono. No guardamos tu NIF. Puedes descargar tus datos o borrar la cuenta cuando quieras.',
  'Política de privacidade do concello': 'Política de privacidad del ayuntamiento',

  // Reserva móbil
  'Pistas de pádel do Campo da Feira, Pista 1': 'Pistas de pádel del Campo da Feira, Pista 1',

  // Panel
  'Panel de indicadores': 'Panel de indicadores',
  'Datos de exemplo dun concello ficticio.': 'Datos de ejemplo de un ayuntamiento ficticio.',
  'Indicadores': 'Indicadores',
  'Axenda de reservas': 'Agenda de reservas',
  'Axenda': 'Agenda',
  'Horarios e peches': 'Horarios y cierres',
  'Normas de uso': 'Normas de uso',
  'Validar QR': 'Validar QR',
  'Marca do concello': 'Marca del ayuntamiento',
  'Período': 'Periodo',
  'Outubro de 2026': 'Octubre de 2026',
  'Setembro de 2026': 'Septiembre de 2026',
  'Agosto de 2026': 'Agosto de 2026',
  'Exportar CSV ou JSON': 'Exportar CSV o JSON',
  'Crear un peche': 'Crear un cierre',
  'Resumo do período': 'Resumen del periodo',
  'Ocupación media': 'Ocupación media',
  'Cancelacións': 'Cancelaciones',
  'Non presentados': 'No presentados',
  'Ocupación por instalación': 'Ocupación por instalación',
  'Ocupación': 'Ocupación',
  'Pavillón, Pista central': 'Pabellón, Pista central',
  '· Pavillón, Pista central': '· Pabellón, Pista central',
  'Canle: web': 'Canal: web',
  'Canle: teléfono': 'Canal: teléfono',
  'Canle: presencial': 'Canal: presencial',
  'Canle: {{r.canle}}': 'Canal: {{r.canle}}',
  'Reservar para un veciño': 'Reservar para un vecino',
  'Datos por instalación': 'Datos por instalación',
  'Instalación': 'Instalación',
  'Campo de Santa Mariña': 'Campo de Santa Mariña',

  // Instalacións (xestión)
  'Dar de alta unha instalación': 'Dar de alta una instalación',
  'Lista de instalacións': 'Lista de instalaciones',
  'Editar': 'Editar',
  'Activa': 'Activa',
  'De baixa': 'De baja',
  'Nova instalación': 'Nueva instalación',
  'Revisa este campo antes de gardar:': 'Revisa este campo antes de guardar:',
  'O nome é obrigatorio': 'El nombre es obligatorio',
  'Nome': 'Nombre',
  'Escribe o nome da instalación.': 'Escribe el nombre de la instalación.',
  'Tipo': 'Tipo',
  'Ver instalacións': 'Ver instalaciones',
  'Os SMS e WhatsApp só se envían co teu consentimento expreso, e usaremos o teu móbil unicamente para avisos das túas reservas.': 'Los SMS y WhatsApp solo se envían con tu consentimiento expreso, y usaremos tu móvil únicamente para avisos de tus reservas.',
  'Se activas WhatsApp, o teu número compártese con Meta Platforms para enviar as mensaxes, o que pode implicar transferencias internacionais de datos.': 'Si activas WhatsApp, tu número se comparte con Meta Platforms para enviar los mensajes, lo que puede implicar transferencias internacionales de datos.',
  'Ler a política de privacidade': 'Leer la política de privacidad',
  'Dou o meu consentimento expreso para recibir avisos por SMS ou WhatsApp. Podo retirar o consentimento en calquera momento desde esta pantalla.': 'Doy mi consentimiento expreso para recibir avisos por SMS o WhatsApp. Puedo retirar el consentimiento en cualquier momento desde esta pantalla.',
  'Para activar SMS ou WhatsApp tes que dar o teu consentimento expreso.': 'Para activar SMS o WhatsApp tienes que dar tu consentimiento expreso.',
  'Modelo de proba. O concello debe revisar e completar este texto coa persoa responsable de accesibilidade antes de publicalo.': 'Modelo de prueba. El ayuntamiento debe revisar y completar este texto con la persona responsable de accesibilidad antes de publicarlo.',
  'Esta é a declaración de accesibilidade da plataforma de reservas de instalacións deportivas municipais, preparada segundo o Real Decreto 1112/2018, do 7 de setembro, sobre accesibilidade dos sitios web e aplicacións para dispositivos móbiles do sector público.': 'Esta es la declaración de accesibilidad de la plataforma de reservas de instalaciones deportivas municipales, preparada según el Real Decreto 1112/2018, de 7 de septiembre, sobre accesibilidad de los sitios web y aplicaciones para dispositivos móviles del sector público.',
  'Estado de cumprimento': 'Estado de cumplimiento',
  'Este sitio web é parcialmente conforme coas Pautas de accesibilidade para o contido web (WCAG) 2.1, nivel AA, e coa norma EN 301 549 V3.2.1, debido ás excepcións e faltas de conformidade que se indican a continuación.': 'Este sitio web es parcialmente conforme con las Pautas de accesibilidad para el contenido web (WCAG) 2.1, nivel AA, y con la norma EN 301 549 V3.2.1, debido a las excepciones y faltas de conformidad que se indican a continuación.',
  'Contido non accesible': 'Contenido no accesible',
  'Mapa de situación: na versión de proba é un marcador de posición. O enderezo e as indicacións de acceso ofrécense tamén en texto.': 'Mapa de situación: en la versión de prueba es un marcador de posición. La dirección y las indicaciones de acceso se ofrecen también en texto.',
  'Código QR de acceso: ten unha alternativa en texto (instalación, pista e hora), pero a imaxe non se pode ler cun lector de pantalla.': 'Código QR de acceso: tiene una alternativa en texto (instalación, pista y hora), pero la imagen no se puede leer con un lector de pantalla.',
  'Probas con produtos de apoio: aínda non se verificou o uso con lectores de pantalla (NVDA, Orca, VoiceOver) nin con dispositivos reais. Está previsto antes da posta en produción.': 'Pruebas con productos de apoyo: todavía no se ha verificado el uso con lectores de pantalla (NVDA, Orca, VoiceOver) ni con dispositivos reales. Está previsto antes de la puesta en producción.',
  'Reflow (WCAG 1.4.10): comprobado a 320 px en todas as pantallas con axe-core, sen desprazamento horizontal; non se verificou en dispositivos reais.': 'Reflow (WCAG 1.4.10): comprobado a 320 px en todas las pantallas con axe-core, sin desplazamiento horizontal; no se ha verificado en dispositivos reales.',
  'Preparación desta declaración': 'Preparación de esta declaración',
  'A declaración preparouse o 5 de novembro de 2026. O método empregado foi unha autoavaliación realizada pola equipa de desenvolvemento, con comprobacións automáticas (axe-core, regras WCAG 2.1 A e AA, en todas as pantallas, en galego, castelán e inglés e en modo claro e escuro) e revisión manual. Non houbo auditoría externa.': 'La declaración se preparó el 5 de noviembre de 2026. El método empleado fue una autoevaluación realizada por el equipo de desarrollo, con comprobaciones automáticas (axe-core, reglas WCAG 2.1 A y AA, en todas las pantallas, en gallego, castellano e inglés y en modo claro y oscuro) y revisión manual. No hubo auditoría externa.',
  'Observacións e contacto': 'Observaciones y contacto',
  'Pode comunicar queixas sobre o cumprimento dos requisitos de accesibilidade, solicitar información en formatos accesibles ou facer suxestións usando este formulario ou escribindo ao correo de contacto do concello.': 'Puede comunicar quejas sobre el cumplimiento de los requisitos de accesibilidad, solicitar información en formatos accesibles o hacer sugerencias usando este formulario o escribiendo al correo de contacto del ayuntamiento.',
  'Correo de contacto:': 'Correo de contacto:',
  'Enviar unha comunicación': 'Enviar una comunicación',
  'Tipo de comunicación': 'Tipo de comunicación',
  'O teu correo (para responderche)': 'Tu correo (para responderte)',
  'Mensaxe': 'Mensaje',
  'Enviar': 'Enviar',
  'Procedemento de reclamación': 'Procedimiento de reclamación',
  'Se, tras comunicar a súa queixa ou solicitude, non obtén resposta satisfactoria ou esta é desestimada, pode iniciar unha reclamación seguindo o procedemento previsto no artigo 12 do Real Decreto 1112/2018 ante a unidade responsable de accesibilidade do concello.': 'Si, tras comunicar su queja o solicitud, no obtiene una respuesta satisfactoria o esta es desestimada, puede iniciar una reclamación siguiendo el procedimiento previsto en el artículo 12 del Real Decreto 1112/2018 ante la unidad responsable de accesibilidad del ayuntamiento.',
  'Modelo de proba. O concello e o seu delegado de protección de datos deben revisar e completar este texto antes de publicalo.': 'Modelo de prueba. El ayuntamiento y su delegado de protección de datos deben revisar y completar este texto antes de publicarlo.',
  'Esta política explica como trata os teus datos persoais a plataforma de reservas de instalacións deportivas municipais, conforme ao Regulamento (UE) 2016/679 (RGPD) e á Lei Orgánica 3/2018.': 'Esta política explica cómo trata tus datos personales la plataforma de reservas de instalaciones deportivas municipales, conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018.',
  'Responsable do tratamento': 'Responsable del tratamiento',
  'O concello que xestiona a instalación na que reservas.': 'El ayuntamiento que gestiona la instalación en la que reservas.',
  'Contacto do concello:': 'Contacto del ayuntamiento:',
  'Delegado ou delegada de protección de datos: o contacto indicará o concello (campo por completar).': 'Delegado o delegada de protección de datos: el contacto lo indicará el ayuntamiento (campo por completar).',
  'Que datos tratamos': 'Qué datos tratamos',
  'Identificación: nome e correo electrónico, que recibimos do servizo de identificación (Chave365 ou Cl@ve). Non recibimos nin gardamos o teu contrasinal.': 'Identificación: nombre y correo electrónico, que recibimos del servicio de identificación (Chave365 o Cl@ve). No recibimos ni guardamos tu contraseña.',
  'Contacto opcional: teléfono móbil, só se o indicas para recibir avisos por SMS ou WhatsApp.': 'Contacto opcional: teléfono móvil, solo si lo indicas para recibir avisos por SMS o WhatsApp.',
  'Reservas: instalación, pista, data e hora, número de persoas, estado (confirmada, cancelada, asistida ou non presentada) e canle de reserva.': 'Reservas: instalación, pista, fecha y hora, número de personas, estado (confirmada, cancelada, asistida o no presentada) y canal de reserva.',
  'Para que os usamos e con que base': 'Para qué los usamos y con qué base',
  'Xestionar as reservas e o uso das instalacións municipais. Base xurídica: o exercicio de poderes públicos e a execución dunha misión de interese público (art. 6.1.e RGPD).': 'Gestionar las reservas y el uso de las instalaciones municipales. Base jurídica: el ejercicio de poderes públicos y la ejecución de una misión de interés público (art. 6.1.e RGPD).',
  'Avisarche por correo de cambios ou peches que afecten ás túas reservas. Mesma base.': 'Avisarte por correo de cambios o cierres que afecten a tus reservas. Misma base.',
  'Enviarche avisos por SMS ou WhatsApp. Base xurídica: o teu consentimento expreso (art. 6.1.a RGPD), que podes retirar en calquera momento desde «A miña conta».': 'Enviarte avisos por SMS o WhatsApp. Base jurídica: tu consentimiento expreso (art. 6.1.a RGPD), que puedes retirar en cualquier momento desde «Mi cuenta».',
  'Destinatarios e transferencias': 'Destinatarios y transferencias',
  'Os datos non se ceden a terceiros salvo obriga legal. Se activas WhatsApp, o teu número de teléfono compártese con Meta Platforms para enviar as mensaxes, o que pode implicar transferencias internacionais. Se só activas o correo ou o SMS, non se comparte con Meta.': 'Los datos no se ceden a terceros salvo obligación legal. Si activas WhatsApp, tu número de teléfono se comparte con Meta Platforms para enviar los mensajes, lo que puede implicar transferencias internacionales. Si solo activas el correo o el SMS, no se comparte con Meta.',
  'Canto tempo os conservamos': 'Cuánto tiempo los conservamos',
  'Proposta de proba (o concello debe fixar os prazos definitivos): mentres teñas a conta activa e, despois de borrala, só o tempo necesario para atender posibles responsabilidades; o historial de reservas conservarase anonimizado para estatísticas.': 'Propuesta de prueba (el ayuntamiento debe fijar los plazos definitivos): mientras tengas la cuenta activa y, tras borrarla, solo el tiempo necesario para atender posibles responsabilidades; el historial de reservas se conservará anonimizado para estadísticas.',
  'Os teus dereitos': 'Tus derechos',
  'Podes exercer os dereitos de acceso, rectificación, supresión, limitación, oposición e portabilidade. Desde «A miña conta» podes descargar os teus datos en JSON e borrar a conta. Tamén podes escribir ao correo de contacto do concello.': 'Puedes ejercer los derechos de acceso, rectificación, supresión, limitación, oposición y portabilidad. Desde «Mi cuenta» puedes descargar tus datos en JSON y borrar la cuenta. También puedes escribir al correo de contacto del ayuntamiento.',
  'Se consideras que o tratamento non se axusta á normativa, podes presentar unha reclamación ante a Axencia Española de Protección de Datos (www.aepd.es).': 'Si consideras que el tratamiento no se ajusta a la normativa, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).',
  'Cookies e servizos externos': 'Cookies y servicios externos',
  'Esta versión non usa cookies de seguimento nin analítica. Só garda no teu navegador o tema e o idioma que escolles. A tipografía sérvese desde a propia plataforma, sen peticións a servizos externos.': 'Esta versión no usa cookies de seguimiento ni analítica. Solo guarda en tu navegador el tema y el idioma que eliges. La tipografía se sirve desde la propia plataforma, sin peticiones a servicios externos.',
  'Política de privacidade': 'Política de privacidad',
  'Queixa sobre accesibilidade': 'Queja sobre accesibilidad',
  'Solicitude de información en formato accesible': 'Solicitud de información en formato accesible',
  'Suxestión': 'Sugerencia',
  'Escribe un correo válido para poder responderche.': 'Escribe un correo válido para poder responderte.',
  'Escribe a túa mensaxe.': 'Escribe tu mensaje.',
  'Comunicación enviada. Na versión de proba non se envía de verdade; o concello respondería ao correo indicado.': 'Comunicación enviada. En la versión de prueba no se envía de verdad; el ayuntamiento respondería al correo indicado.',
  'Exportar CSV': 'Exportar CSV',
  'Exportar JSON': 'Exportar JSON',
  'Mes en curso: suma o que se vai rexistrando nesta sesión de proba.': 'Mes en curso: suma lo que se va registrando en esta sesión de prueba.',
  'Novembro de 2026 (en curso)': 'Noviembre de 2026 (en curso)',
  'Non hai reservas pendentes para hoxe.': 'No hay reservas pendientes para hoy.',
  'Non se puido preparar a descarga.': 'No se pudo preparar la descarga.',
  'Non se puido preparar o calendario.': 'No se pudo preparar el calendario.',
  'Historial do día': 'Historial del día',
  'As reservas pasan aquí cando se marcan como asistidas, non presentadas ou canceladas.': 'Las reservas pasan aquí cuando se marcan como asistidas, no presentadas o canceladas.',
  'Non tes reservas activas.': 'No tienes reservas activas.',
  'Normas desta instalación': 'Normas de esta instalación',
  'Marca «Todo o día» para ese día cun único horario de apertura e peche, sen corte de mañá e tarde. Se non, indica o turno de mañá e o de tarde (deixa a tarde baleira se non hai turno partido).': 'Marca «Todo el día» para ese día con un único horario de apertura y cierre, sin corte de mañana y tarde. Si no, indica el turno de mañana y el de tarde (deja la tarde vacía si no hay turno partido).',
  'Abre': 'Abre',
  'Presencial': 'Presencial',
  'Crear a reserva': 'Crear la reserva',
  'Asistiu': 'Asistió',
  'Non veu': 'No vino',
  'Escribe o nome da persoa.': 'Escribe el nombre de la persona.',
  'Esa franxa xa está reservada. Escolle outra hora.': 'Esa franja ya está reservada. Elige otra hora.',

  // Validar QR
  '[Vista da cámara]': '[Vista de la cámara]',
  'Simular unha lectura': 'Simular una lectura',
  'Na demostración, simula o que le a cámara:': 'En la demostración, simula lo que lee la cámara:',
  'Válido': 'Válido',
  'Xa usado': 'Ya usado',
  'Falso': 'Falso',
  'Apunta a cámara ao código da persoa.': 'Apunta la cámara al código de la persona.',
  'Reserva válida': 'Reserva válida',
  'Entrada rexistrada': 'Entrada registrada',
  'Rexistrar a entrada': 'Registrar la entrada',
  'Código xa usado': 'Código ya usado',
  'Esta reserva rexistrou a entrada ás 18:54. Non deixes pasar sen comprobalo.': 'Esta reserva registró la entrada a las 18:54. No dejes pasar sin comprobarlo.',
  'Código non válido': 'Código no válido',
  'A sinatura non coincide con ningunha reserva deste concello.': 'La firma no coincide con ninguna reserva de este ayuntamiento.',
  'Confirmada ': 'Confirmada ',

  // Marca
  'Datos da marca': 'Datos de la marca',
  'Nome público': 'Nombre público',
  'Logotipo': 'Logotipo',
  '[Subir o logotipo en SVG ou PNG]': '[Subir el logotipo en SVG o PNG]',
  'Cor principal': 'Color principal',
  'Idiomas': 'Idiomas',
  'Galego (por defecto)': 'Gallego (por defecto)',
  'Castelán': 'Castellano',
  'Correo de contacto': 'Correo de contacto',
  'Enderezo web': 'Dirección web',
  '/c/ribadouro · O cambia a superadministración.': '/c/ribadouro · Lo cambia la superadministración.',
  'Gardar a marca': 'Guardar la marca',
  'Marca gardada. Xa se aplica a todas as pantallas.': 'Marca guardada. Ya se aplica a todas las pantallas.',
  'Non se pode gardar: a cor non cumpre o contraste mínimo.': 'No se puede guardar: el color no cumple el contraste mínimo.',
  'Vista previa': 'Vista previa',
  'Marca gardada.': 'Marca guardada.',
  'nome-do-concello': 'nombre-del-ayuntamiento',

  // Superadministración
  'Activo': 'Activo',
  'Desactivado': 'Desactivado',
  'Activar': 'Activar',
  'Desactivar': 'Desactivar',
  'Xestión: {{c.xestores}}': 'Gestión: {{c.xestores}}',
  'Engadir unha persoa xestora': 'Añadir una persona gestora',
  'Correo': 'Correo',
  'Engadir': 'Añadir',
  'Dar de alta un concello': 'Dar de alta un ayuntamiento',
  'Nome do concello': 'Nombre del ayuntamiento',
  'Enderezo: /c/{{slugNovo}}': 'Dirección: /c/{{slugNovo}}',
  'Correo da persoa xestora': 'Correo de la persona gestora',
  'Crear o concello': 'Crear el ayuntamiento',
  'Cada concello ve só os seus datos. O resto configúrao a persoa xestora.': 'Cada ayuntamiento ve solo sus datos. El resto lo configura la persona gestora.',
  'A cor non chega ao contraste mínimo de 4,5:1.': 'El color no llega al contraste mínimo de 4,5:1.',
  'Escribe o nome do concello.': 'Escribe el nombre del ayuntamiento.',
  'Xa existe un concello con ese enderezo.': 'Ya existe un ayuntamiento con esa dirección.',
  'Escribe un correo válido.': 'Escribe un correo válido.',
  'Escribe un correo válido para engadir a persoa xestora.': 'Escribe un correo válido para añadir a la persona gestora.',
  'Persoa xestora engadida.': 'Persona gestora añadida.',

  // Avisos na pantalla principal
  'Avisos do concello': 'Avisos del ayuntamiento',
  'Xoves 12 de novembro, desde as 16:00. Obras no pavimento.': 'Jueves 12 de noviembre, desde las 16:00. Obras en el pavimento.',
  'Do 16 ao 18 de novembro. Mantemento do vaso.': 'Del 16 al 18 de noviembre. Mantenimiento del vaso.',
  'Venres 13 de novembro, pecha ás 20:00 por un evento.': 'Viernes 13 de noviembre, cierra a las 20:00 por un evento.',
  'Se tes reserva eses días, avisámosche por correo.': 'Si tienes reserva esos días, te avisamos por correo.',
  'Pechada o xoves 12 desde as 16:00': 'Cerrada el jueves 12 desde las 16:00',
  'Pecha ás 20:00 o venres 13': 'Cierra a las 20:00 el viernes 13',
  'Pechada do 16 ao 18 de novembro': 'Cerrada del 16 al 18 de noviembre',

  // Resumo de uso
  'Resumo de uso': 'Resumen de uso',
  'Só para uso interno do concello. Datos de exemplo.': 'Solo para uso interno del ayuntamiento. Datos de ejemplo.',
  'Vista': 'Vista',
  'Gráfico': 'Gráfico',
  'Táboa': 'Tabla',
  'Total de reservas': 'Total de reservas',
  'Máis usada': 'Más usada',
  'Menos usada': 'Menos usada',
  'Reservas por instalación': 'Reservas por instalación',
  'Número de reservas no período. Canto máis longa a barra, máis uso.': 'Número de reservas en el periodo. Cuanto más larga es la barra, más uso.',
  '% do total': '% del total'
};

// Días, meses e pequenos fragmentos dentro de textos xerados.
const MESES_ES = { novembro: 'noviembre', outubro: 'octubre', decembro: 'diciembre', setembro: 'septiembre', agosto: 'agosto' };
const FRAGMENTOS_ES = [
  [/Pistas de pádel do Campo da Feira/g, 'Pistas de pádel de Campo da Feira'],
  [/Piscina Municipal A Ribeira/g, 'Piscina Municipal A Ribeira'],
  [/Pavillón Municipal/g, 'Pabellón Municipal'],
  [/Campo de fútbol de Santa Mariña/g, 'Campo de fútbol de Santa Mariña'],
  [/Pistas de tenis de Outeiro/g, 'Pistas de tenis de Outeiro'],
  [/Sala Polivalente da Casa da Cultura/g, 'Sala Polivalente de la Casa de la Cultura'],
  [/Todas as pistas de pádel/g, 'Todas las pistas de pádel'],
  [/\bPavillón, Pista central/g, 'Pabellón, Pista central'],
  [/\bPavillón, /g, 'Pabellón, '],
  [/\bPádel, /g, 'Pádel, '],
  [/\bPista (\d+)/g, 'Pista $1'],
  [/\bRúa (\d)/g, 'Carril $1'],
  [/\b(Luns|luns)\b/g, 'lunes'],
  [/\b(Martes|martes)\b/g, 'martes'],
  [/\b(Mércores|mércores)\b/g, 'miércoles'],
  [/\b(Xoves|xoves)\b/g, 'jueves'],
  [/\b(Venres|venres)\b/g, 'viernes'],
  [/\b(Sábado|sábado)\b/g, 'sábado'],
  [/\b(Domingo|domingo)\b/g, 'domingo'],
  [/\b(\d{1,2}) de (novembro|outubro|decembro|setembro|agosto)(?: de (\d{4}))?/g, (m, d, mes, ano) => d + ' de ' + MESES_ES[mes] + (ano ? ' de ' + ano : '')],
  [/\bHoxe\b/g, 'Hoy'],
  [/ semana do (\d+) ao (\d+) /, ' semana del $1 al $2 '],
  [/, todo o día$/, ', todo el día'],
  [/, a túa reserva$/, ', tu reserva'],
  [/, A túa reserva$/, ', tu reserva'],
  [/, libre$/, ', libre'],
  [/, ocupada$/, ', ocupada'],
  [/, pechada$/, ', cerrada'],
  [/, escollida$/, ', seleccionada'],
  [/^(.+), abre$/, (m) => fragmentosEs(m[1]) + ', abre'],
  [/^(.+), pecha$/, (m) => fragmentosEs(m[1]) + ', cierra'],
  [/^(.+), todo o día sen corte$/, (m) => fragmentosEs(m[1]) + ', todo el día sin corte'],
  [/^(.+), abre pola mañá$/, (m) => fragmentosEs(m[1]) + ', abre por la mañana'],
  [/^(.+), pecha pola mañá$/, (m) => fragmentosEs(m[1]) + ', cierra por la mañana'],
  [/^(.+), abre pola tarde$/, (m) => fragmentosEs(m[1]) + ', abre por la tarde'],
  [/^(.+), pecha pola tarde$/, (m) => fragmentosEs(m[1]) + ', cierra por la tarde']
];
function fragmentosEs(s) {
  return FRAGMENTOS_ES.reduce((texto, [re, sustitucion]) => texto.replace(re, sustitucion), s);
}

function traducirEs(txt) {
  const orixe = txt.replace(/\s+/g, ' ').trim();
  if (!orixe) return txt;
  if (Object.prototype.hasOwnProperty.call(DIC_ES, orixe)) return txt.replace(orixe === txt ? txt : txt.trim(), DIC_ES[orixe]);
  for (const [re, f] of REGRAS_ES) {
    const m = orixe.match(re);
    if (m) return f(m);
  }
  if (orixe.includes(' · ')) return orixe.split(' · ').map(traducirEs).join(' · ');
  return fragmentosEs(orixe);
}

// Engadidos: número de pistas e botón de idioma
DIC_ES['Número de pistas'] = 'Número de pistas';
DIC_ES['Cambiar o idioma'] = 'Cambiar el idioma';
REGRAS_ES.unshift(
  [/^(\d+) pistas$/, (m) => m[1] + ' pistas'],
  [/^Pista 1 a Pista (\d+)$/, (m) => 'Pista 1 a Pista ' + m[1]]
);
DIC_ES['Canle: {{r.canle}} · {{r.estado}}'] = 'Canal: {{r.canle}} · {{r.estado}}';

Object.assign(DIC_ES, {
  'Deportes': 'Deportes',
  'Separa cada deporte cunha coma.': 'Separa cada deporte con una coma.',
  'Borrar': 'Borrar',
  'Si, borrar': 'Sí, borrar',
  'Non, manter': 'No, mantener',
  'Aínda non hai instalacións. Dá de alta a primeira.': 'Aún no hay instalaciones. Da de alta la primera.',
  'Instalación borrada.': 'Instalación borrada.',
  'Aínda non hai instalacións activas.': 'Aún no hay instalaciones activas.',
  '—': '—'
});
REGRAS_ES.unshift([/^Seguro que queres borrar «(.+)»\? Non se pode desfacer\.$/, (m) => '¿Seguro que quieres borrar «' + traducirEs(m[1]) + '»? No se puede deshacer.']);

Object.assign(DIC_ES, {
  'Reservas activas por persoa': 'Reservas activas por persona',
  'Toda a instalación': 'Toda la instalación',
  'Primeiro dá de alta unha instalación.': 'Primero da de alta una instalación.',
  'Teléfono móbil': 'Teléfono móvil',
  'Teléfono móbil da persoa xestora': 'Teléfono móvil de la persona gestora',
  'Opcional. Servirá para avisos por SMS ou WhatsApp máis adiante.': 'Opcional. Servirá para avisos por SMS o WhatsApp más adelante.',
  'Escribe un teléfono móbil válido.': 'Escribe un teléfono móvil válido.',
  'Escribe un teléfono móbil válido, por exemplo 600 123 456.': 'Escribe un teléfono móvil válido, por ejemplo 600 123 456.'
});

Object.assign(DIC_ES, {
  'Ocupada ou non dispoñible': 'Ocupada o no disponible',
  'Pechada ou festivo': 'Cerrada o festivo',
  'A túa reserva ou escollida': 'Tu reserva o elegida'
});

DIC_ES['Acceso sen chanzos e aseo adaptado.'] = 'Acceso sin escalones y aseo adaptado.';

Object.assign(DIC_ES, { 'Aforo (persoas por pista)': 'Aforo (personas por pista)', 'Persoas': 'Personas' });
REGRAS_ES.unshift(
  [/^(\d+) (persoa|persoas)$/, (m) => m[1] + ' ' + (Number(m[1]) === 1 ? 'persona' : 'personas')],
  [/^Aforo: (\d+) (persoa|persoas) por pista$/, (m) => 'Aforo: ' + m[1] + ' ' + (Number(m[1]) === 1 ? 'persona' : 'personas') + ' por pista'],
  [/^Máximo (\d+) (persoa|persoas) por pista\.$/, (m) => 'Máximo ' + m[1] + ' ' + (Number(m[1]) === 1 ? 'persona' : 'personas') + ' por pista.'],
  [/^Escribe entre 1 e (\d+) persoas\.$/, (m) => 'Escribe entre 1 y ' + m[1] + ' personas.']
);

Object.assign(DIC_ES, {
  'A miña conta': 'Mi cuenta', 'Sesión': 'Sesión', 'Pechar sesión': 'Cerrar sesión',
  'Estes datos veñen do teu provedor de identidade e non se poden cambiar aquí.': 'Estos datos vienen de tu proveedor de identidad y no se pueden cambiar aquí.',
  'Dereitos sobre os teus datos': 'Derechos sobre tus datos',
  'Seguro que queres borrar a túa conta? Non se pode desfacer.': '¿Seguro que quieres borrar tu cuenta? No se puede deshacer.',
  'Recibirás confirmacións, recordatorios e avisos de peches ou cambios do concello.': 'Recibirás confirmaciones, recordatorios y avisos de cierres o cambios del ayuntamiento.',
  'Como queres recibir os avisos': 'Cómo quieres recibir los avisos', 'Correo electrónico': 'Correo electrónico', 'SMS': 'SMS', 'WhatsApp': 'WhatsApp',
  'Nesta versión de proba os SMS e WhatsApp non se envían de verdade.': 'En esta versión de prueba los SMS y WhatsApp no se envían de verdad.',
  'Gardar os avisos': 'Guardar los avisos', 'Preferencias gardadas.': 'Preferencias guardadas.',
  'Para recibir SMS ou WhatsApp precisamos o teu teléfono móbil.': 'Para recibir SMS o WhatsApp necesitamos tu teléfono móvil.',
  'Sesión iniciada.': 'Sesión iniciada.', 'Sesión pechada.': 'Sesión cerrada.', 'Conta borrada.': 'Cuenta borrada.',
  'Publica un aviso na web e notifica a quen o teña activado.': 'Publica un aviso en la web y notifica a quien lo tenga activado.',
  'Novo aviso': 'Nuevo aviso', 'Que instalación afecta': 'Qué instalación afecta', 'Tipo de aviso': 'Tipo de aviso',
  'Peche': 'Cierre', 'Horario especial': 'Horario especial', 'Información': 'Información',
  'Desde (opcional)': 'Desde (opcional)', 'Ata (opcional)': 'Hasta (opcional)', 'Mensaxe adicional (opcional)': 'Mensaje adicional (opcional)',
  'Canles de envío': 'Canales de envío', 'Sempre': 'Siempre',
  'Só recibirán SMS ou WhatsApp as persoas que o activaron na súa conta.': 'Solo recibirán SMS o WhatsApp las personas que lo han activado en su cuenta.',
  'Así se verá': 'Así se verá', 'Publicar aviso e notificar': 'Publicar aviso y notificar', 'Aviso publicado.': 'Aviso publicado.',
  'Notificación enviada a:': 'Notificación enviada a:', 'Escribe o motivo do aviso.': 'Escribe el motivo del aviso.',
  'Avisos publicados': 'Avisos publicados', 'Retirar': 'Retirar', 'Aínda non hai avisos publicados.': 'Aún no hay avisos publicados.', 'Aviso retirado.': 'Aviso retirado.',
  'Web': 'Web', '[Motivo do aviso]': '[Motivo del aviso]'
});
REGRAS_ES.unshift(
  [/^Sesión iniciada con (.+)$/, (m) => 'Sesión iniciada con ' + m[1]],
  [/^Información: (.+)$/, (m) => 'Información: ' + traducirEs(m[1])],
  [/^Retirar o aviso: (.+)$/, (m) => 'Retirar el aviso: ' + traducirEs(m[1])],
  [/^(Correo|SMS|WhatsApp): (\d+) persoas$/, (m) => traducirEs(m[1]) + ': ' + m[2] + ' personas']
);
FRAGMENTOS_ES.push([/^Desde (\d)/, 'Desde $1'], [/ ata (\d)/, ' hasta $1'], [/^Ata (\d)/, 'Hasta $1']);

Object.assign(DIC_ES, {
  'Entrar como convidado': 'Entrar como invitado',
  'Como convidado podes consultar instalacións, dispoñibilidade e reservas, pero non facer cambios.': 'Como invitado puedes consultar instalaciones, disponibilidad y reservas, pero no hacer cambios.',
  'Estás como convidado: só podes consultar.': 'Estás como invitado: solo puedes consultar.',
  'Entraches como convidado: só podes consultar.': 'Has entrado como invitado: solo puedes consultar.',
  'Estás en modo só lectura.': 'Estás en modo solo lectura.',
  'Entrar para facer cambios': 'Entrar para hacer cambios',
  'Non iniciaches sesión. Só podes consultar como convidado.': 'No has iniciado sesión. Solo puedes consultar como invitado.'
});

DIC_ES['Menú'] = 'Menú';
REGRAS_ES.push([/^Xa non podes modificala nin cancelala: este concello permíteo só ata (\d+) horas? antes do inicio\.$/, (m) => 'Ya no puedes modificarla ni cancelarla: este ayuntamiento solo lo permite hasta ' + m[1] + (m[1] === '1' ? ' hora' : ' horas') + ' antes del inicio.']);
REGRAS_ES.push([/^Xa tes (\d+) reservas? activas?, o máximo que permite este concello\. Cancela unha para reservar outra\.$/, (m) => 'Ya tienes ' + m[1] + (m[1] === '1' ? ' reserva activa' : ' reservas activas') + ', el máximo que permite este ayuntamiento. Cancela una para reservar otra.']);
REGRAS_ES.push([/^Tes que reservar polo menos (\d+) horas? antes do inicio\.$/, (m) => 'Tienes que reservar al menos ' + m[1] + (m[1] === '1' ? ' hora' : ' horas') + ' antes del inicio.']);
REGRAS_ES.push([/^Só podes reservar con ata (\d+) días? de antelación\.$/, (m) => 'Solo puedes reservar con hasta ' + m[1] + (m[1] === '1' ? ' día' : ' días') + ' de antelación.']);
REGRAS_ES.push([/^Franxas de (.+)$/, (m) => 'Franjas de ' + traducirEs(m[1])]);
REGRAS_ES.push([/^Descarga preparada: (.+)$/, (m) => 'Descarga preparada: ' + m[1]]);
REGRAS_ES.push([/^Calendario preparado: (.+)$/, (m) => 'Calendario preparado: ' + m[1]]);
REGRAS_ES.push([/^(\d+) reservas? rexistradas?$/, (m) => m[1] + (m[1] === '1' ? ' reserva registrada' : ' reservas registradas')]);
REGRAS_ES.push([/^(.+): (\d+) % de ocupación, (\d+) reservas$/, (m) => traducirEs(m[1]) + ': ' + m[2] + ' % de ocupación, ' + m[3] + ' reservas']);
REGRAS_ES.push([/^Asistiu: (.+)$/, (m) => traducirEs('Asistiu') + ': ' + traducirEs(m[1])]);
REGRAS_ES.push([/^Non veu: (.+)$/, (m) => traducirEs('Non veu') + ': ' + traducirEs(m[1])]);
REGRAS_ES.push([/^Xestionar este concello: (.+)$/, (m) => traducirEs('Xestionar este concello') + ': ' + m[1]]);
REGRAS_ES.push([/^(Lun|Mar|Mér|Xov|Ven|Sáb|Dom) (\d+), (.+)$/, (m) => traducirEs(m[1]) + ' ' + m[2] + ', ' + traducirEs(m[3])]);
REGRAS_ES.push([/^(\d+) franxas? libres? o día escollido$/, (m) => m[1] + (m[1] === '1' ? ' franja libre' : ' franjas libres') + ' el día elegido']);
Object.assign(DIC_ES, {
  'Consultar a dispoñibilidade non require conta. Para reservar, crea unha conta con correo e móbil ou usa un sistema público.': 'Consultar la disponibilidad no requiere cuenta. Para reservar, crea una cuenta con correo y móvil o usa un sistema público.',
  'Chave365 · simulado · nivel 3 (evolución futura)': 'Chave365 · simulado · nivel 3 (evolución futura)',
  'Cl@ve · simulado · nivel 3 (evolución futura)': 'Cl@ve · simulado · nivel 3 (evolución futura)',
  'Crear conta con correo e móbil': 'Crear cuenta con correo y móvil',
  'Nivel 1 de seguridade · verificación simulada para esta demostración.': 'Nivel 1 de seguridad · verificación simulada para esta demostración.',
  'Correo': 'Correo',
  'Móbil': 'Móvil',
  'Acepto a ': 'Acepto la ',
  'política de privacidade.': 'política de privacidad.',
  'Código de demostración:': 'Código de demostración:',
  'Código de verificación': 'Código de verificación',
  'Verificar e crear sesión': 'Verificar y crear sesión',
  'Enviar código de demostración': 'Enviar código de demostración',
  'O concello asume o risco de posibles contas duplicadas ao usar correo e móbil, sen identificación oficial.': 'El ayuntamiento asume el riesgo de posibles cuentas duplicadas al usar correo y móvil, sin identificación oficial.',
  'Escribe un correo válido.': 'Escribe un correo válido.',
  'Escribe un móbil válido.': 'Escribe un móvil válido.',
  'Acepta a política de privacidade para continuar.': 'Acepta la política de privacidad para continuar.',
  'O código non coincide. Usa o código de demostración visible.': 'El código no coincide. Usa el código de demostración visible.',
  'Conta creada e sesión iniciada.': 'Cuenta creada y sesión iniciada.',
  'Correo e móbil (nivel 1)': 'Correo y móvil (nivel 1)',
  'Chave365 (simulado · nivel 3)': 'Chave365 (simulado · nivel 3)',
  'Cl@ve (simulado · nivel 3)': 'Cl@ve (simulado · nivel 3)',
  'Prezo base (€)': 'Precio base (€)',
  'Unidade de cobro': 'Unidad de cobro',
  'Por entrada': 'Por entrada',
  'Por hora': 'Por hora',
  'Prezos e descontos': 'Precios y descuentos',
  'Descontos': 'Descuentos',
  'Porcentaxe (%)': 'Porcentaje (%)',
  'Aplicación': 'Aplicación',
  'Fixo': 'Fijo',
  'Temporal': 'Temporal',
  'Vixencia': 'Vigencia',
  'Sen caducidade': 'Sin caducidad',
  '1–30 de novembro de 2026': '1–30 de noviembre de 2026',
  'Campaña de inverno': 'Campaña de invierno',
  'Persoas xubiladas': 'Personas jubiladas',
  'Carné xove': 'Carné joven',
  'Desconto aplicable': 'Descuento aplicable',
  'Sen desconto': 'Sin descuento',
  'O desconto verifícase na instalación.': 'El descuento se verifica en la instalación.',
  'Pagamento na instalación': 'Pago en la instalación',
  'Pagamento na instalación · {{importeTexto}} estimados': 'Pago en la instalación · {{importeTexto}} estimados',
  'Afluencia por día e hora': 'Afluencia por día y hora',
  'Ocupación das pistas na semana': 'Ocupación de las pistas en la semana',
  'Ocupación da semana mostrada.': 'Ocupación de la semana mostrada.',
  'Lenda da afluencia': 'Leyenda de afluencia',
  'Franxas recomendadas': 'Franjas recomendadas',
  'Calcúlase coas reservas feitas; a predición chegará cando haxa histórico': 'Se calcula con las reservas realizadas; la predicción llegará cuando haya histórico',
  'Reservas activas por conta': 'Reservas activas por cuenta',
  'Quitar desconto': 'Quitar descuento',
  'Engadir desconto': 'Añadir descuento',
  'Pechado': 'Cerrado'
});
REGRAS_ES.push([/^Desde (.+) €$/, (m) => 'Desde ' + m[1] + ' €']);
REGRAS_ES.push([/^Pagamento na instalación · (.+) € estimados(?: · (.+))?$/, (m) => 'Pago en la instalación · ' + m[1] + ' € estimados' + (m[2] ? ' · ' + m[2] : '')]);
REGRAS_ES.push([/^Podes ter (\d+) reservas? activas? como máximo por conta\.$/, (m) => 'Puedes tener ' + m[1] + (m[1] === '1' ? ' reserva activa' : ' reservas activas') + ' como máximo por cuenta.']);
REGRAS_ES.push([/^Ocupación das pistas na semana (.+)\.$/, (m) => 'Ocupación de las pistas en la semana ' + traducirEs(m[1]) + '.']);
REGRAS_ES.push([/^(Lun|Mar|Mér|Xov|Ven|Sáb|Dom) (\d+) · (.+)$/, (m) => traducirEs(m[1] + ' ' + m[2] + ', ' + m[3])]);
REGRAS_ES.push([/^(\d+)% ocupado$/, (m) => m[1] + '% ocupado']);
REGRAS_ES.push([/^(\d+) pistas(?: cubertas)?$/, (m) => m[1] + (m[1] === '1' ? ' pista' : ' pistas') + (m[0].includes('cubertas') ? ' cubiertas' : '')]);
REGRAS_ES.push([/^(Carné xove|Persoas xubiladas|Campaña de inverno) \(−(\d+) %\)$/, (m) => traducirEs(m[1]) + ' (−' + m[2] + ' %)']);

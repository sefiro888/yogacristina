// Contenido de la web: datos del centro y de cada práctica.
// Fuentes: Retiru, ficha de Google, Instagram y Facebook de la escuela, Yogaes y NOVAfisium (2016).

export const SITE = {
  name: 'Escuela de Yoga Cristina Herrera',
  short: 'Cristina Herrera',
  phone: '606 38 07 45',
  phoneIntl: '+34606380745',
  wa: '34606380745',
  email: 'cris28enero@gmail.com',
  street: 'C. de José Planes, 4',
  city: '30530 Cieza, Murcia',
  maps: 'https://maps.google.com/?cid=1013295508043008686',
  directions: 'https://www.google.com/maps/dir/?api=1&destination=38.2414556,-1.419749',
  mapEmbed: 'https://www.google.com/maps?q=Escuela+de+Yoga+Cristina+Herrera,+C.+de+Jos%C3%A9+Planes+4,+30530+Cieza,+Murcia&z=17&output=embed',
  instagram: 'https://www.instagram.com/cristinaherrerayoga/',
  facebook: 'https://www.facebook.com/cristina.herrerayoga/',
  rating: '5,0',
  reviews: 6,
  // Horario publicado en Google (0 = domingo)
  hours: [
    { d: 1, name: 'Lunes', slots: [['08:30', '10:30'], ['16:30', '22:30']] },
    { d: 2, name: 'Martes', slots: [['08:00', '10:30'], ['16:30', '20:30']] },
    { d: 3, name: 'Miércoles', slots: [['08:30', '10:30'], ['16:30', '22:30']] },
    { d: 4, name: 'Jueves', slots: [['08:00', '10:30'], ['16:30', '20:30']] },
    { d: 5, name: 'Viernes', slots: [['08:30', '10:30']] },
    { d: 6, name: 'Sábado', slots: [] },
    { d: 0, name: 'Domingo', slots: [] }
  ]
};

// Dirección pública de la demostración (GitHub Pages)
export const SITE_URL = 'https://sefiro888.github.io/yogacristina/';

// Cuadrante semanal de clases. EJEMPLO para la demostración: encaja en el horario de apertura,
// pero las prácticas y horas son inventadas salvo las marcadas como reales (niños, L y X 17:30).
export const CLASSES = [
  { d: 1, t: '09:00', dur: 75, slug: 'hatha-vinyasa' },
  { d: 1, t: '17:30', dur: 60, slug: 'yoga-ninos-adolescentes', real: true },
  { d: 1, t: '19:00', dur: 75, slug: 'hatha-vinyasa' },
  { d: 1, t: '20:45', dur: 45, slug: 'meditacion' },
  { d: 2, t: '08:30', dur: 40, slug: 'meditacion' },
  { d: 2, t: '09:15', dur: 75, slug: 'yoga-restaurativo' },
  { d: 2, t: '17:00', dur: 75, slug: 'hatha-vinyasa' },
  { d: 2, t: '19:00', dur: 60, slug: 'mantras' },
  { d: 3, t: '09:00', dur: 75, slug: 'hatha-vinyasa' },
  { d: 3, t: '17:30', dur: 60, slug: 'yoga-ninos-adolescentes', real: true },
  { d: 3, t: '19:00', dur: 75, slug: 'yoga-restaurativo' },
  { d: 3, t: '20:45', dur: 50, slug: 'yoga-nidra' },
  { d: 4, t: '08:30', dur: 40, slug: 'meditacion' },
  { d: 4, t: '09:15', dur: 75, slug: 'hatha-vinyasa' },
  { d: 4, t: '17:00', dur: 75, slug: 'yoga-restaurativo' },
  { d: 4, t: '19:00', dur: 75, slug: 'hatha-vinyasa' },
  { d: 5, t: '09:00', dur: 60, slug: 'yoga-nidra' }
];

// Opiniones públicas de Google (5/5). Se citan fragmentos breves.
export const REVIEWS = [
  { q: 'Cristina es una maestra increíble. Para mí sus clases son como un templo lleno de paz y aprendizaje.', a: 'Olga S.', t: 'Alumna · Google' },
  { q: 'Lo que más valoro es cómo se transmite la enseñanza del yoga desde el punto de vista más espiritual.', a: 'Pilar S.', t: 'Alumna · Google' },
  { q: '…no es solo un lugar de práctica de yoga de calidad, sino un lugar en el que el acogedor ambiente…', a: 'Malena D.', t: 'Alumna · Google' },
  { q: 'Con gran vocación, la maestra de yoga te guía con facilidad y te hace vivirlo con total entrega.', a: 'Pilar S.', t: 'Alumna · Google' },
  { q: 'Organiza retiros espectaculares.', a: 'Pilar S.', t: 'Alumna · Google' }
];

// Lo que la escuela cuenta de sí misma (Facebook, septiembre de 2026)
export const PILLARS = [
  { n: '01', t: 'El porqué de cada postura', d: 'Comprender sus beneficios, cómo hacerla correctamente y cómo influye en tu salud.' },
  { n: '02', t: 'Respiración integrada', d: 'Sintonizar de forma natural la respiración con el movimiento o con la relajación.' },
  { n: '03', t: 'Mantras con significado', d: 'Escucharlos, entenderlos y sentir su poder transformador sobre la mente.' },
  { n: '04', t: 'Los maestros y su legado', d: 'Descubrir la raíz del yoga a través de quienes lo transmitieron antes que nosotros.' },
  { n: '05', t: 'Cada sesión es distinta', d: 'Igual que tú. Porque eres energía en movimiento y necesitas una escuela en evolución.' }
];

const P = (slug, data) => ({ slug, file: `${slug}.html`, ...data });

export const SERVICES = [
  P('hatha-vinyasa', {
    group: 'clases',
    name: 'Hatha Vinyasa',
    menu: 'Movimiento y respiración',
    kicker: 'Movimiento consciente',
    title: 'Hatha <em>Vinyasa</em>',
    lead: 'Posturas, respiración y movimiento continuado. Una práctica fluida en la que cada transición se mueve al ritmo de tu respiración.',
    hero: 'hatha-vinyasa', heroPos: '62% 40%',
    card: 'guerrero-luminoso',
    energy: 4, energyLabel: 'Dinámica',
    chips: ['Clases regulares', 'Mañana y tarde', 'Yoga para todos'],
    orn: 'sol',
    intro: {
      title: 'Cuando el cuerpo <em>fluye</em>, la mente le sigue',
      paras: [
        'El Hatha Vinyasa une posturas, respiración y movimiento continuado. Es la modalidad perfecta si disfrutas de una práctica corporal con fluidez, en la que las transiciones forman parte de la experiencia y la atención se mantiene ligada al ritmo de cada inhalación y cada exhalación.',
        'En nuestras clases no solo te movemos: te explicamos el porqué de cada postura, sus beneficios y cómo hacerla correctamente, para que entiendas cómo afecta a tu salud y puedas sentir la raíz del yoga mientras practicas.'
      ],
      img: 'principiantes-atardecer', imgAlt: 'Grupo practicando la postura del guerrero en la sala al atardecer'
    },
    benefits: [
      { i: 'wave', t: 'Fluidez y coordinación', d: 'Secuencias que enlazan una postura con la siguiente sin perder el hilo de la respiración.' },
      { i: 'sun', t: 'Vitalidad renovada', d: 'Una práctica activa para recobrar energía y volver a tu centro.' },
      { i: 'balance', t: 'Fuerza y flexibilidad', d: 'Trabajo equilibrado del cuerpo, con atención a la alineación y a tus límites.' },
      { i: 'wind', t: 'Atención en la respiración', d: 'La respiración marca el ritmo y convierte el movimiento en meditación.' }
    ],
    flow: [
      { t: 'Llegar y centrarse', d: 'Unos minutos de quietud para observar la respiración y dejar fuera el ruido del día.' },
      { t: 'Despertar el cuerpo', d: 'Movilidad suave y saludos que preparan articulaciones y musculatura.' },
      { t: 'Secuencias fluidas', d: 'Posturas encadenadas al ritmo de la respiración, con propuestas para cada nivel.' },
      { t: 'Relajación final', d: 'Savasana: el cuerpo integra la práctica y la mente descansa.' }
    ],
    forWhom: ['Quien disfruta de una práctica con ritmo y fluidez', 'Quien quiere integrar movimiento y movilidad en su rutina', 'Quien busca entender el porqué de cada postura', 'Personas con o sin experiencia: cada postura tiene su adaptación'],
    gallery: ['guerrero-luminoso', 'yoga-pareja', 'sala-ambar'],
    quote: { q: 'Integrando de forma natural tu respiración y sintonizándola con el <em>movimiento</em>.', c: 'Así entendemos la práctica en la escuela' },
    wa: 'una clase de Hatha Vinyasa',
    resv: 'Tu clase de <em>Hatha Vinyasa</em>',
    desc: 'Clases de Hatha Vinyasa en Cieza: posturas, respiración y movimiento continuado en la Escuela de Yoga Cristina Herrera. Reserva por WhatsApp.'
  }),
  P('yoga-restaurativo', {
    group: 'clases',
    name: 'Yoga restaurativo',
    menu: 'Pausa y recuperación',
    kicker: 'Pausa y recuperación',
    title: 'Yoga <em>restaurativo</em>',
    lead: 'Una práctica pausada, con apoyos y permanencias largas, para compensar el estrés cotidiano y devolverle al cuerpo su descanso.',
    hero: 'restaurativo-ambar', heroPos: '70% 55%',
    card: 'restaurativo-sereno',
    energy: 1, energyLabel: 'Muy suave',
    chips: ['Clases regulares', 'Sin exigencia física', 'Con apoyos y mantas'],
    orn: 'luna',
    intro: {
      title: 'Descansar también <em>es practicar</em>',
      paras: [
        'El yoga restaurativo plantea una aproximación pausada, enfocada en el descanso, la permanencia en las posturas y la recuperación. Con la ayuda de cojines, mantas y bloques, el cuerpo se sostiene sin esfuerzo y puede soltar lo que lleva acumulado.',
        'Es una alternativa valiosa para compensar el estrés cotidiano, aliviar la sensación de sobrecarga o simplemente dedicar un espacio a bajar el ritmo. Y convive con el Hatha Vinyasa: desde una sesión más activa hasta una práctica de pausa y reposo, dentro de la misma escuela.'
      ],
      img: 'accesorios', imgAlt: 'Esterillas, cojines y mantas preparados en la sala con luz cálida'
    },
    benefits: [
      { i: 'moon', t: 'Descanso profundo', d: 'Posturas sostenidas que invitan al sistema nervioso a relajarse.' },
      { i: 'feather', t: 'Alivio de la sobrecarga', d: 'Un respiro para la tensión acumulada en hombros, espalda y mente.' },
      { i: 'leaf', t: 'Recuperación', d: 'El complemento ideal a una práctica dinámica o a semanas intensas.' },
      { i: 'heart', t: 'Bajar el ritmo', d: 'Un tiempo de calidad para ti, sin prisa y sin exigencia.' }
    ],
    flow: [
      { t: 'Preparar el nido', d: 'Colocamos apoyos, mantas y cojines para que cada postura te sostenga.' },
      { t: 'Respirar y soltar', d: 'La respiración se alarga y el cuerpo empieza a ceder.' },
      { t: 'Permanencias largas', d: 'Pocas posturas, mantenidas varios minutos en calma y silencio.' },
      { t: 'Regreso suave', d: 'Volvemos poco a poco, con una sensación de ligereza.' }
    ],
    forWhom: ['Quien vive con estrés o cansancio acumulado', 'Quien necesita compensar una práctica intensa', 'Quien busca una puerta de entrada amable al yoga', 'Cualquier persona que necesite parar'],
    gallery: ['restaurativo-sereno', 'rincon-calido', 'savasana-atardecer'],
    quote: { q: 'Desde una sesión más activa hasta una práctica de <em>pausa y reposo</em>.', c: 'Distintas puertas de entrada en una misma escuela' },
    wa: 'una clase de yoga restaurativo',
    resv: 'Tu clase de <em>yoga restaurativo</em>',
    desc: 'Yoga restaurativo en Cieza: práctica pausada con apoyos para descansar y recuperarte del estrés. Escuela de Yoga Cristina Herrera.'
  }),
  P('yoga-nidra', {
    group: 'clases',
    name: 'Yoga Nidra',
    menu: 'Relajación guiada',
    kicker: 'El sueño consciente',
    title: 'Yoga <em>Nidra</em>',
    lead: 'Relajación guiada en una postura cómoda para recorrer estados de atención profunda. Sin exigencia física: solo quietud, escucha interna y presencia.',
    hero: 'nidra-atardecer', heroPos: '60% 60%',
    card: 'nidra-grupo',
    energy: 0, energyLabel: 'Quietud total',
    chips: ['Tumbado y abrigado', 'Sin experiencia previa', 'También en talleres'],
    orn: 'luna',
    intro: {
      title: 'Parar, descansar y <em>estar presente</em>',
      paras: [
        'El Yoga Nidra es una técnica de relajación guiada que se practica habitualmente tumbado, en una posición cómoda, y que invita a recorrer estados de atención profunda. Tu única tarea es escuchar la voz que te guía.',
        'En una rutina marcada por la actividad constante, el Nidra suma una vía especialmente enfocada en parar, descansar y desarrollar presencia. No es una clase centrada en el esfuerzo, sino en la experiencia de la quietud, la escucha interna y la relajación consciente.'
      ],
      img: 'nidra-grupo', imgAlt: 'Alumnos tumbados y tapados con mantas durante una sesión de Yoga Nidra'
    },
    benefits: [
      { i: 'moon', t: 'Relajación consciente', d: 'Un descanso profundo sin perder el hilo de la atención.' },
      { i: 'ear', t: 'Escucha interna', d: 'Aprendes a observar sensaciones, respiración y pensamientos sin juzgarlos.' },
      { i: 'spark', t: 'Presencia', d: 'Una pausa que se queda contigo cuando vuelves a tu día.' },
      { i: 'feather', t: 'Para todos los cuerpos', d: 'Tumbado y abrigado: no necesitas flexibilidad ni experiencia.' }
    ],
    flow: [
      { t: 'Acomodarse', d: 'Esterilla, cojín y manta. Buscamos una postura en la que puedas quedarte quieto.' },
      { t: 'Intención', d: 'Un propósito sencillo que acompaña toda la práctica.' },
      { t: 'Recorrido guiado', d: 'La voz te lleva por el cuerpo, la respiración y las sensaciones.' },
      { t: 'Volver despacio', d: 'Regreso gradual al movimiento, sin brusquedad.' }
    ],
    forWhom: ['Quien llega agotado y necesita recargar', 'Quien tiene dificultad para desconectar', 'Quien practica asanas y quiere complementar', 'Quien busca relajarse sin esfuerzo físico'],
    gallery: ['savasana-atardecer', 'manos-serenas', 'restaurativo-ambar'],
    quote: { q: 'No se trata de exigencia física, sino de la experiencia de la <em>quietud</em>.', c: 'La esencia del Yoga Nidra' },
    wa: 'una sesión de Yoga Nidra',
    resv: 'Tu sesión de <em>Yoga Nidra</em>',
    desc: 'Yoga Nidra en Cieza: relajación guiada para parar, descansar y desarrollar presencia. Escuela de Yoga Cristina Herrera.'
  }),
  P('meditacion', {
    group: 'clases',
    name: 'Meditación',
    menu: 'Atención y calma',
    kicker: 'Entrenar la atención',
    title: '<em>Meditación</em>',
    lead: 'Un tiempo específico para observar con calma tu estado físico y mental. Complemento de tu práctica… o tu puerta de entrada al yoga.',
    hero: 'meditacion-ambar', heroPos: '72% 50%',
    card: 'meditacion-luminosa',
    energy: 1, energyLabel: 'Serena',
    chips: ['Sentado y estable', 'Para principiantes', 'Camino de autoconocimiento'],
    orn: 'mandala',
    intro: {
      title: 'El yoga va <em>más allá</em> de las posturas',
      paras: [
        'La meditación es uno de los ejes de la escuela y confirma una visión del yoga que va más allá de las asanas. Aporta un tiempo específico para entrenar la atención y observar, con mayor calma, lo que ocurre en el cuerpo y en la mente.',
        'Puede complementar tu práctica corporal habitual, pero también convertirse en tu punto de partida si deseas explorar el yoga desde su dimensión más contemplativa: el camino del autoconocimiento y el bienestar.'
      ],
      img: 'manos-serenas', imgAlt: 'Manos en mudra sobre las rodillas durante la meditación'
    },
    benefits: [
      { i: 'eye', t: 'Atención entrenada', d: 'Aprendes a sostener la atención y a volver a ella cuando se escapa.' },
      { i: 'wind', t: 'Calma mental', d: 'La respiración como ancla para serenar el ritmo de los pensamientos.' },
      { i: 'compass', t: 'Autoconocimiento', d: 'Observarte con perspectiva para conocerte mejor.' },
      { i: 'lotus', t: 'Dimensión contemplativa', d: 'La cara más silenciosa y profunda de la tradición yóguica.' }
    ],
    flow: [
      { t: 'Postura estable', d: 'Sentados en cojín o silla, con la espalda erguida y el cuerpo cómodo.' },
      { t: 'Respiración', d: 'Unos minutos para calmar el ritmo y llegar al momento presente.' },
      { t: 'Práctica guiada', d: 'Técnicas sencillas de atención: respiración, sensaciones, sonido.' },
      { t: 'Silencio', d: 'Un espacio para quedarse, observar y cerrar con gratitud.' }
    ],
    forWhom: ['Quien quiere calmar la mente', 'Quien practica yoga y busca profundizar', 'Quien se inicia desde la quietud', 'Quien desea conocerse mejor'],
    gallery: ['meditacion-luminosa', 'manos-guian', 'sala-madera'],
    quote: { q: 'Enseñando el camino del <em>autoconocimiento</em> y bienestar.', c: 'Cristina Herrera' },
    wa: 'una clase de meditación',
    resv: 'Tu clase de <em>meditación</em>',
    desc: 'Meditación en Cieza: entrena la atención y conoce la dimensión contemplativa del yoga en la Escuela de Yoga Cristina Herrera.'
  }),
  P('mantras', {
    group: 'clases',
    name: 'Mantras',
    menu: 'Voz y sonido',
    kicker: 'La voz como camino',
    title: '<em>Mantras</em>',
    lead: 'La voz, el sonido y la repetición como herramientas de concentración y vivencia compartida. Escucharlos, entender su significado y sentir su poder.',
    hero: 'mantras-ambar', heroPos: '50% 45%',
    card: 'mantras-calma',
    energy: 2, energyLabel: 'Vibrante y calmada',
    chips: ['En círculo', 'Significado de cada mantra', 'Sonido y silencio'],
    orn: 'om',
    intro: {
      title: 'Cuando el silencio <em>suena</em>',
      paras: [
        'Los mantras introducen la voz, el sonido y la repetición como herramientas de concentración y de vivencia colectiva. Para algunas personas son la forma más accesible y emocional de acercarse a la tradición yóguica; para otras, la oportunidad de ampliar la práctica más allá del movimiento.',
        'En la escuela no solo los cantamos: te contamos su significado y su poder transformador sobre la mente. Por algo el OM ilumina nuestro logotipo. Aquí conviven el cuerpo, la respiración, el silencio y la sonoridad.'
      ],
      img: 'cuenco', imgAlt: 'Cuenco tibetano junto a una vela en la sala'
    },
    benefits: [
      { i: 'sound', t: 'Concentración', d: 'La repetición enfoca la mente y la aquieta.' },
      { i: 'users', t: 'Vivencia colectiva', d: 'Voces que se unen en círculo y crean una vibración compartida.' },
      { i: 'heart', t: 'Emoción y apertura', d: 'Una vía sensible y cercana para conectar con la práctica.' },
      { i: 'book', t: 'Tradición viva', d: 'Conocer el origen y el significado de lo que cantamos.' }
    ],
    flow: [
      { t: 'Círculo', d: 'Nos sentamos juntos y respiramos para afinar la escucha.' },
      { t: 'Significado', d: 'Descubrimos de dónde viene el mantra y qué expresa.' },
      { t: 'Canto y repetición', d: 'La voz se suma poco a poco, sin necesidad de saber cantar.' },
      { t: 'Silencio resonante', d: 'Escuchamos la vibración que queda cuando el sonido se apaga.' }
    ],
    forWhom: ['Quien quiere ampliar su práctica más allá del movimiento', 'Quien disfruta de la voz y del sonido', 'Quien busca una experiencia emocional y compartida', 'No necesitas cantar bien: solo dejarte llevar'],
    gallery: ['mantras-calma', 'circulo-calma', 'cuenco'],
    quote: { q: 'Escuchando los mantras, su significado y el poder transformador de nuestra <em>mente</em>.', c: 'Lo que nos hace únicos' },
    wa: 'una sesión de mantras',
    resv: 'Tu círculo de <em>mantras</em>',
    desc: 'Mantras en Cieza: voz, sonido y repetición como camino de concentración y vivencia compartida. Escuela de Yoga Cristina Herrera.'
  }),
  P('yoga-ninos-adolescentes', {
    group: 'clases',
    name: 'Niños y adolescentes',
    menu: 'Yoga y mindfulness · L y X 17:30',
    kicker: 'Yoga y mindfulness para niños',
    title: 'Yoga para <em>niños</em> y adolescentes',
    lead: 'Movimiento, atención y calma adaptados a edades tempranas. Un espacio pensado para ellos, los lunes y miércoles a las 17:30.',
    hero: 'ninos-ambar', heroPos: '50% 45%',
    card: 'ninos-sonrisas',
    energy: 3, energyLabel: 'Juego y calma',
    chips: ['Lunes y miércoles', '17:30', 'Grupo propio'],
    orn: 'loto',
    kids: true,
    intro: {
      title: 'Crecer con <em>calma</em> y alegría',
      paras: [
        'La escuela amplía su propuesta a edades más tempranas y acerca a niños y adolescentes recursos de movimiento, atención y calma. Una opción pensada específicamente para ellos, en lugar de clases diseñadas solo para adultos.',
        'Es un buen momento para que tus hijos descubran los beneficios del yoga. Por eso la escuela reserva cada lunes y miércoles a las 17:30 un espacio de yoga y mindfulness solo para ellos.'
      ],
      img: 'ninos-sonrisas', imgAlt: 'Niños sonriendo en equilibrio sobre una pierna junto a la profesora'
    },
    benefits: [
      { i: 'eye', t: 'Atención y concentración', d: 'Juegos y posturas que entrenan la capacidad de estar presentes.' },
      { i: 'heart', t: 'Calma emocional', d: 'Recursos de respiración para gestionar nervios y emociones.' },
      { i: 'balance', t: 'Conciencia corporal', d: 'Equilibrio, coordinación y flexibilidad de forma natural.' },
      { i: 'smile', t: 'Confianza y juego', d: 'Un entorno amable donde moverse, reír y compartir.' }
    ],
    flow: [
      { t: 'Bienvenida', d: 'Saludo y una respiración divertida para llegar al grupo.' },
      { t: 'Posturas en juego', d: 'Animales, árboles y montañas: el yoga se aprende jugando.' },
      { t: 'Mindfulness', d: 'Pequeños ejercicios de atención adaptados a su edad.' },
      { t: 'Relajación', d: 'Un momento de calma para cerrar y llevarse a casa.' }
    ],
    forWhom: ['Niños que necesitan moverse y canalizar energía', 'Adolescentes que buscan calma y concentración', 'Familias de Cieza interesadas en el yoga', 'Sin experiencia previa'],
    gallery: ['ninos-alegria', 'ninos-luminoso', 'ninos-ambar'],
    quote: { q: 'Es un buen momento para que tus hijos descubran todos los <em>beneficios</em> del yoga.', c: 'Escuela de Yoga Cristina Herrera' },
    wa: 'la clase de yoga y mindfulness para niños y adolescentes (lunes y miércoles a las 17:30)',
    resv: 'Su plaza de <em>yoga infantil</em>',
    desc: 'Yoga y mindfulness para niños y adolescentes en Cieza, lunes y miércoles a las 17:30. Escuela de Yoga Cristina Herrera.'
  }),
  P('talleres', {
    group: 'experiencias',
    name: 'Talleres',
    menu: 'Sonido, Nidra, brunch…',
    kicker: 'Profundizar en un tema',
    title: '<em>Talleres</em> de yoga',
    lead: 'Encuentros especiales para dedicar más tiempo a una técnica, un tema o un enfoque concreto, y seguir descubriendo nuevas dimensiones del yoga.',
    hero: 'sala-madera', heroPos: '50% 50%',
    card: 'taller-luminoso',
    energy: 2, energyLabel: 'Variable',
    chips: ['Fechas especiales', 'Plazas limitadas', 'Abiertos a todos'],
    orn: 'vela',
    workshops: true,
    intro: {
      title: 'Más tiempo para <em>lo que te mueve</em>',
      paras: [
        'Además de las clases continuas, la escuela organiza talleres: la oportunidad de dedicar más tiempo a un tema, una técnica o un enfoque concreto, con calma y en buena compañía.',
        'Abrimos las puertas de nuestra escuela para que vengas y disfrutes del ambiente de yoga que se crea en cada propuesta. Formatos como «Yoga & Brunch & Nidra» o los talleres de sonido unen práctica, descanso y comunidad.'
      ],
      img: 'taller-luminoso', imgAlt: 'Grupo sentado en círculo durante un taller en un estudio luminoso'
    },
    benefits: [
      { i: 'compass', t: 'Profundizar', d: 'Tiempo para ir más allá de lo que cabe en una clase semanal.' },
      { i: 'users', t: 'Comunidad', d: 'Compartir la práctica con otras personas que buscan lo mismo.' },
      { i: 'spark', t: 'Descubrir', d: 'Nuevas técnicas y enfoques que enriquecen tu práctica.' },
      { i: 'sound', t: 'Sonido y vibración', d: 'Cuencos y voz para vivir el yoga desde la escucha.' }
    ],
    flow: [
      { t: 'Consulta la agenda', d: 'Anunciamos cada taller en Instagram y Facebook con su fecha.' },
      { t: 'Reserva tu plaza', d: 'Escríbenos por WhatsApp: las plazas son limitadas.' },
      { t: 'Vive el encuentro', d: 'Práctica, explicación y tiempo para compartir.' },
      { t: 'Llévatelo contigo', d: 'Recursos para integrar lo aprendido en tu día a día.' }
    ],
    forWhom: ['Alumnos de la escuela que quieren profundizar', 'Quien quiere conocer la escuela por primera vez', 'Quien busca una mañana distinta para cuidarse', 'Curiosos del sonido, el Nidra o los mantras'],
    gallery: ['circulo-calma', 'cuenco', 'mantras-calma'],
    quote: { q: 'Abrimos las puertas de nuestra escuela para que vengas y disfrutes del ambiente de yoga que se crea en nuestras <em>propuestas</em>.', c: 'Escuela de Yoga Cristina Herrera' },
    wa: 'los próximos talleres',
    resv: 'Tu plaza en el próximo <em>taller</em>',
    desc: 'Talleres de yoga en Cieza: sonido, Yoga Nidra, Yoga & Brunch y más encuentros especiales en la Escuela de Yoga Cristina Herrera.'
  }),
  P('retiros', {
    group: 'experiencias',
    name: 'Retiros',
    menu: 'Práctica inmersiva',
    kicker: 'Salir de la rutina',
    title: '<em>Retiros</em> de yoga',
    lead: 'Días para salir de la dinámica semanal y vivir el yoga de una manera inmersiva: práctica, naturaleza, silencio y comunidad.',
    hero: 'retiro-mediterraneo', heroPos: '50% 55%',
    card: 'retiro-olivos',
    energy: 3, energyLabel: 'Inmersiva',
    chips: ['Varios días', 'Naturaleza', 'Plazas limitadas'],
    orn: 'sol',
    retreat: true,
    intro: {
      title: 'Un paréntesis para <em>volver a ti</em>',
      paras: [
        'Los retiros permiten salir de la rutina de cada semana y vivir la práctica de forma inmersiva. Sin horarios de trabajo ni prisas: solo el ritmo del día, la naturaleza y el grupo.',
        'Son una de las propuestas más valoradas por el alumnado de la escuela. Cada retiro tiene su propio programa, en el que pueden convivir asanas, meditación, Yoga Nidra, mantras y tiempo para el silencio. Pregúntanos por el próximo.'
      ],
      img: 'retiro-olivos', imgAlt: 'Grupo practicando yoga al amanecer entre olivos'
    },
    benefits: [
      { i: 'mountain', t: 'Desconexión real', d: 'Lejos de la rutina, la práctica se vuelve más profunda.' },
      { i: 'sun', t: 'Naturaleza', d: 'Amaneceres y atardeceres como parte de la práctica.' },
      { i: 'users', t: 'Comunidad', d: 'Vínculos que nacen al compartir días de práctica.' },
      { i: 'lotus', t: 'Integración', d: 'Tiempo para asimilar y llevarte un cambio de vuelta a casa.' }
    ],
    flow: [
      { t: 'Amanecer', d: 'Práctica de asanas y respiración con la primera luz.' },
      { t: 'Día consciente', d: 'Comidas tranquilas, paseos y tiempo libre para descansar.' },
      { t: 'Atardecer', d: 'Meditación, mantras o Yoga Nidra cuando cae el sol.' },
      { t: 'Silencio', d: 'Espacios de quietud para escucharte de verdad.' }
    ],
    forWhom: ['Quien necesita un paréntesis de verdad', 'Alumnos que quieren profundizar en su práctica', 'Quien busca naturaleza y comunidad', 'Quien quiere regalarse unos días de cuidado'],
    gallery: ['retiro-olivos', 'circulo-calma', 'meditacion-luminosa'],
    quote: { q: 'Organiza retiros <em>espectaculares</em>.', c: 'Pilar S., alumna · Google' },
    wa: 'el próximo retiro',
    resv: 'Tu plaza en el próximo <em>retiro</em>',
    desc: 'Retiros de yoga con la Escuela de Yoga Cristina Herrera (Cieza): práctica inmersiva, naturaleza, silencio y comunidad.'
  }),
  P('sesiones-privadas', {
    group: 'experiencias',
    name: 'Sesiones privadas',
    menu: 'Yoga a tu medida',
    kicker: 'Yoga sessions',
    title: 'Sesiones <em>privadas</em>',
    lead: 'Un espacio donde explorar juntos y adaptarnos a tus necesidades: tu ritmo, tus objetivos y tu momento vital.',
    hero: 'estiramiento-guiado', heroPos: '55% 45%',
    card: 'manos-guian',
    energy: 2, energyLabel: 'A tu medida',
    chips: ['Individual', 'A tu ritmo', 'Con cita previa'],
    orn: 'mandala',
    private: true,
    intro: {
      title: 'Tu práctica, <em>a tu medida</em>',
      paras: [
        'Las sesiones privadas son un espacio donde podemos explorar juntos y adaptarnos a tus necesidades. Ideales si quieres iniciarte con atención personal, retomar el yoga después de un tiempo o profundizar en algo concreto.',
        'Cada sesión se diseña para ti: posturas, respiración, relajación, meditación o mantras, en la proporción que necesites. Porque cada persona es distinta, y su yoga también.'
      ],
      img: 'manos-guian', imgAlt: 'La profesora guía con sus manos la postura de una alumna'
    },
    benefits: [
      { i: 'compass', t: 'Adaptada a ti', d: 'Tus objetivos, tu cuerpo y tu momento marcan el camino.' },
      { i: 'eye', t: 'Atención personal', d: 'Correcciones y explicaciones solo para ti.' },
      { i: 'clock', t: 'Tu ritmo', d: 'Avanzas cuando estás preparado, sin compararte con nadie.' },
      { i: 'book', t: 'Comprensión', d: 'Entender el porqué de cada postura y cómo afecta a tu salud.' }
    ],
    flow: [
      { t: 'Conversación', d: 'Hablamos de lo que buscas, de tu experiencia y de cómo te encuentras.' },
      { t: 'Diseño', d: 'Preparamos una práctica pensada para ti.' },
      { t: 'Práctica guiada', d: 'Sesión individual con atención y ajustes personalizados.' },
      { t: 'Continuidad', d: 'Pautas para seguir practicando por tu cuenta.' }
    ],
    forWhom: ['Quien quiere empezar con atención personal', 'Quien retoma el yoga después de un tiempo', 'Quien tiene objetivos o necesidades concretas', 'Quien prefiere practicar a su ritmo'],
    gallery: ['respiracion', 'accesorios', 'rincon-calido'],
    quote: { q: 'Donde podemos explorar juntos y <em>adaptarnos</em> a tus necesidades.', c: 'Yoga sessions · Escuela de Yoga Cristina Herrera' },
    wa: 'una sesión privada de yoga',
    resv: 'Tu <em>sesión privada</em>',
    desc: 'Sesiones privadas de yoga en Cieza adaptadas a tus necesidades, con Cristina Herrera. Reserva por WhatsApp.'
  })
];

export const BY_SLUG = Object.fromEntries(SERVICES.map(s => [s.slug, s]));

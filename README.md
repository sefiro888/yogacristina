# Escuela de Yoga Cristina Herrera · demostración web

Web de demostración para la **Escuela de Yoga Cristina Herrera**, en C. de José Planes, 4 (30530 Cieza, Murcia).

**Verla:** https://sefiro888.github.io/yogacristina/ · en local, abre `index.html` o ejecuta `node scripts/serve.mjs 5190` y entra en http://localhost:5190.

> Es una **web de demostración**: lleva un aviso discreto «Demo», está marcada con `noindex` para que Google no la indexe, y el horario de clases y las fotos son de ejemplo.

## Páginas (16)

| Página | Contenido |
| --- | --- |
| `index.html` | Portada: intro con el sello que se enciende, pase de fotos, la escuela, 9 prácticas con filtro, «Encuentra tu práctica», respiración guiada con cuenco tibetano, filosofía, horario en vivo, opiniones, mapa |
| `hatha-vinyasa.html` · `yoga-restaurativo.html` · `yoga-nidra.html` · `meditacion.html` · `mantras.html` · `yoga-ninos-adolescentes.html` | Clases regulares (una página por práctica) |
| `talleres.html` · `retiros.html` · `sesiones-privadas.html` | Experiencias |
| `sobre-cristina.html` | Quién es, trayectoria, filosofía, lo que enseña y opiniones |
| `contacto.html` | WhatsApp, teléfono, correo, dirección, reserva guiada, horario, mapa y preguntas frecuentes |
| `aviso-legal.html` · `privacidad.html` · `cookies.html` | Borradores legales (LSSI-CE y RGPD) con los datos del titular marcados como «Pendiente» |
| `404.html` | Página no encontrada |

Cada práctica tiene: cabecera con foto y texto legible encima, medidor «quietud → movimiento», descripción, beneficios, cómo es una sesión, para quién es, galería, cita, **reserva por WhatsApp con mensaje escrito** y carrusel con las demás prácticas.

## Horario de clases (EJEMPLO)

- En la portada hay un cuadrante semanal (pestañas por día en móvil) y cada práctica muestra sus propias clases. Cada clase tiene **«Reservar esta clase»**, que abre WhatsApp con la práctica, el día y la hora: «¡Hola, Cristina! 🙏 Me gustaría reservar la clase de Hatha Vinyasa del lunes a las 9:00. ¿Queda plaza?».
- Se marca el día de hoy, se atenúan las clases que ya han pasado y se señala la **próxima clase**.
- Todas las clases llevan la etiqueta **«Ejemplo»** salvo el yoga para niños (lunes y miércoles a las 17:30), que es real y aparece como «Horario real». Los huecos encajan en el horario de apertura publicado en Google.
- Para poner el horario real: edita `CLASSES` en `scripts/content.mjs` (día, hora, duración, práctica y `real: true`) y regenera.

## Reserva por WhatsApp

Número: **606 38 07 45** (`34606380745`). Todos los botones abren WhatsApp con un mensaje ya redactado según la página (p. ej. «¡Hola, Cristina! 🙏 Me gustaría reservar una clase de Hatha Vinyasa…»). Además, cada práctica tiene un formulario que compone el mensaje con nombre, franja preferida, experiencia, edad del niño, plazas, etc., con vista previa; nada se envía hasta que la persona pulsa «Enviar» en WhatsApp.

## Cómo editar

- Textos, horario, teléfono y datos: `scripts/content.mjs`. Plantillas: `scripts/pages.mjs` y `scripts/build.mjs`.
- Después de editar: `node scripts/build.mjs` (regenera las 13 páginas y `assets/js/data.js`).
- Comprobar enlaces: `node scripts/check.mjs`. Desbordes en 320/390/768/1440 px: `node scripts/overflow.cjs`. Capturas: `node scripts/shots.cjs <carpeta>` (Playwright global y servidor en 5190).
- Estilos: `assets/css/site.css`. Interacción: `assets/js/main.js`. Scroll suave: Lenis (MIT).

## Identidad

- **Paleta sacada del letrero/logotipo:** noche `#120a07` (disco negro), azafrán `#f26a0c` y ámbar `#fb9b07` (halo de luz), oro `#fdc54a`, crema `#faf2ad` (letras), ladrillo `#7e3d39` y terracota `#b94e24` (muro), marfil `#fbf6ec` y arena `#f4e9d6` para las zonas claras.
- Tipografías: Fraunces (títulos) y Figtree (texto), **servidas desde la propia web** (`assets/fonts/`, licencia OFL): no se conecta con Google Fonts.
- Firma visual: el «eclipse» del letrero (disco oscuro con halo ámbar) se repite en la intro, el botón flotante de WhatsApp, la transición entre páginas y el círculo de respiración.

## Imágenes y adornos

- `scripts/prepare_assets.py` genera todo lo de `assets/img/` a partir de los PNG de la raíz: fotos WebP a 600/1000/1600/2400 px (la versión 2400 se reescala en HD con Lanczos en dos pasos y enfoque suave), sello circular del logo, favicon e imagen para compartir.
- Los 12 adornos se recortan de «Motivos dorados para estudio de yoga» (mandala, OM, loto, sol, luna, esterilla, vela, rama, arco, guirnalda, cojín y esquina). Siempre van en su propio espacio, nunca encima de fotos ni textos, y cada uno tiene su animación: el sol y el mandala giran, la luna flota, el loto respira, la rama se mece, la vela titila, la guirnalda y la esquina se dibujan al aparecer.
- No se han usado imágenes de Instagram, Facebook ni Retiru: allí son carteles con texto a 640 px o imágenes generadas, de peor calidad y estética que las de la carpeta.
- Los archivos «(1)» de la raíz son duplicados idénticos y no se usan.

## Privacidad

- Sin cookies de análisis ni de publicidad. Solo dos valores técnicos en `sessionStorage` (`ch-intro`, `ch-nav`), descritos en `cookies.html`.
- El mapa de Google **solo se carga si se pulsa** «Ver mapa interactivo»; antes se muestra una ilustración propia con la dirección.
- El asistente de reserva no envía nada a ningún servidor: compone el texto en el navegador y abre WhatsApp.

## Otras mejoras de experiencia

- En móvil la cabecera queda siempre visible y los beneficios son un carrusel deslizable con puntos.
- La respiración guiada vibra suavemente al cambiar de fase (en móviles compatibles).
- Yoga Nidra incluye un **escaneo corporal guiado** de unos dos minutos: la silueta se ilumina zona a zona (en móvil, en vertical), con texto que cambia y cuenco tibetano opcional.

## Fuentes de información

Retiru (historia, filosofía y servicios), ficha de Google (dirección, teléfono, horario, 6 opiniones de 5★), Instagram y Facebook de la escuela (correo, «Escuela en evolución», «el alumno, el gran protagonista», niños L y X 17:30, sesiones privadas, talleres «Yoga & Brunch & Nidra» y de sonido), Yogaes y NOVAfisium (2016: diplomada por la Escuela Internacional de Yoga).

## Pendiente de confirmar con Cristina antes de publicar

- El horario real de clases (el actual es de ejemplo) y si hay precios o bonos que mostrar.
- Una **foto real de Cristina** para «Sobre Cristina» (ahora se usan manos que guían y el letrero, sin atribuirle un retrato que no es suyo).
- Las fotos de la carpeta son ilustrativas: sustituir por fotos reales de la sala cuando las haya.
- Que el 606 38 07 45 tiene WhatsApp, y la trayectoria (2016, 2020) tal como aparece.
- Próximas fechas de talleres y retiros.
- Datos del titular para las páginas legales (nombre o razón social, NIF, domicilio) y revisión de esos textos por una asesoría.
- Quitar el aviso «Demo» y el `noindex` cuando sea la web definitiva (en `scripts/build.mjs`).

> Los PNG originales de la raíz no están en el repositorio (pesan unos 70 MB); `scripts/prepare_assets.py` los necesita para regenerar `assets/img/`.

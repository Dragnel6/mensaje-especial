//© Zero - Código libre no comercial

// ============================================================
//  ✏️  TEXTO DE DEDICATORIA — Edita aquí tu mensaje personal
//  Puedes usar <br><br> para separar párrafos.
// ============================================================
const textoDisculpa = `Tal vez me he quedado sin oportunidades, así que no te digo esto con la esperanza de tener una. Te lo digo con la intención de reparar el corazón que yo lastimé aunque sea un poco.<br><br>No para volver, no para cambiar tu decisión, sino porque hay culpas que pesan demasiado cuando se quedan en silencio. Me duele aceptar que fui yo quien rompió lo que más merecía protegerse, que en momentos donde debía cuidarte fui quien más te hirió, y que muchos de los sufrimientos que tuviste que cargar sé que llevan mi nombre.<br><br>Ojalá pudiera regresar el tiempo, no para hacer que te quedes, sino para haberte amado mejor, para haber sido lo que merecías, lo que necesitabas, lo que me duele ahora no haber sido y que cargaré con esa culpa por el resto de mi vida.<br><br>Entiendo que tal vez ya no hay espacio para mí en tu vida, lo llené de errores. Solo necesitaba que supieras que sí entendí, que sí me di cuenta, que sí me duele. Tal vez llegue tarde para recuperarte, pero espero estar a tiempo por lo menos para darte paz al saber lo que siento desde lo más profundo de mi alma.<br><br>Desearía haber tenido más tiempo contigo: un minuto para verte a los ojos, 5 minutos para tomar tu mano, media hora para abrazarte, una hora para reír contigo y una vida para no soltarte.<br><br>Qué ironía que el tiempo pasaba demasiado rápido y ahora que no estás parece ni siquiera avanzar, como si hubieras sido tú quien le daba sentido a los segundos y significado a los minutos. Si hubiera sabido que los momentos solo se repetirían en recuerdos, los habría sostenido más fuerte y me habría quedado un poco más. Habría puesto más atención a cada detalle, a cada palabra y a cada gesto.<br><br>Es una sensación extraña saber que el tiempo avanza y sentir que una parte de mí se quedó en los momentos donde tú aún estabas. Y no es que no quisiera avanzar, es que aprendí a hacerlo contigo, y ahora que no estás todo se siente distinto... como si sin ti tuviera que encontrarle a la vida un nuevo sentido.<br><br>Cómo me hubiera encantado volver a escucharte hablar por millonésima vez la increíble historia de cómo nos habíamos conocido.`;


let svgLoaded = false;
let svgElement = null;


// Cargar el SVG en background
fetch('Img/treelove.svg')
  .then(res => res.text())
  .then(svgText => {
    const container = document.getElementById('tree-container');
    container.innerHTML = svgText;
    svgElement = container.querySelector('svg');
    if (!svgElement) return;

    // Preparar los paths para que no se vean
    const allPaths = Array.from(svgElement.querySelectorAll('path'));
    allPaths.forEach(path => {
      path.style.stroke = '#222';
      path.style.strokeWidth = '2.5';
      path.style.fillOpacity = '0';
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.transition = 'none';
    });

    // Selecciona los corazones
    const heartPaths = allPaths.filter(el => {
      const style = el.getAttribute('style') || '';
      return style.includes('#FC6F58') || style.includes('#C1321F');
    });
    heartPaths.forEach(path => {
      path.classList.add('animated-heart');
    });

    svgLoaded = true;
  });

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('start-overlay');
  const startBtn = document.getElementById('start-btn');

  // --- Generar luciérnagas en el overlay ---
  const firefliesContainer = document.getElementById('fireflies-container');
  if (firefliesContainer) {
    for (let i = 0; i < 28; i++) {
      const ff = document.createElement('div');
      ff.className = 'firefly';
      // Posición aleatoria inicial
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      ff.style.left = `${startX}%`;
      ff.style.top = `${startY}%`;
      // Destino de movimiento aleatorio (CSS custom props)
      const dx = (Math.random() - 0.5) * 160;
      const dy = (Math.random() - 0.5) * 160;
      ff.style.setProperty('--fx', `${dx}px`);
      ff.style.setProperty('--fy', `${dy}px`);
      // Duración y delay variados
      const dur = 4 + Math.random() * 7;
      const del = Math.random() * 5;
      ff.style.animationDuration = `${dur}s`;
      ff.style.animationDelay = `${del}s`;
      firefliesContainer.appendChild(ff);
    }
  }

  if (startBtn && overlay) {
    startBtn.addEventListener('click', () => {
      overlay.classList.add('hidden');
      playBackgroundMusic();

      // Si el SVG cargó, empezamos la animación. Si no, esperamos.
      function tryStart() {
        if (svgLoaded && svgElement) {
          startSvgAnimation(svgElement);
        } else {
          setTimeout(tryStart, 100);
        }
      }
      tryStart();
    });
  }
});


function startSvgAnimation(svg) {
  const allPaths = Array.from(svg.querySelectorAll('path'));
  const container = document.getElementById('tree-container');

  // Forzar reflow y luego animar
  setTimeout(() => {
    allPaths.forEach((path, i) => {
      path.style.transition = `stroke-dashoffset 1.2s cubic-bezier(.77,0,.18,1) ${i * 0.08}s, fill-opacity 0.5s ${0.9 + i * 0.08}s`;
      path.style.strokeDashoffset = 0;
      setTimeout(() => {
        path.style.fillOpacity = '1';
        path.style.stroke = '';
        path.style.strokeWidth = '';
      }, 1200 + i * 80);
    });

    // Después de la animación de dibujo, mueve y aplica blur
    const totalDuration = 1200 + (allPaths.length - 1) * 80 + 500;
    setTimeout(() => {
      svg.classList.add('move-and-blur');
      container.classList.add('sway-active');

      // Mostrar texto con efecto fade-in/slide-up
      setTimeout(() => {
        showDedicationText();
        // Mostrar pétalos flotando
        startFloatingObjects();
      }, 800); // Tiempo para que el árbol ya esté en movimiento
    }, totalDuration);
  }, 50);
}

// Efecto máquina de escribir para el texto de dedicatoria (seguidores)
function getURLParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

/**
 * typeWriter — escribe el texto letra a letra sobre el árbol.
 * Lee de `textoDisculpa` (o del parámetro URL `text` para compartir).
 * Convierte \n en <br> para que los saltos de línea funcionen con innerHTML.
 */
function showDedicationText() {
  // Prioridad: parámetro URL → constante textoDisculpa
  let rawText = getURLParam('text');
  if (rawText) {
    rawText = decodeURIComponent(rawText).replace(/\\n/g, '\n');
  } else {
    rawText = textoDisculpa;
  }

  // Tokenizamos el texto: separamos los tags HTML (<br>, <br><br>, etc.)
  // de los caracteres normales para poder escribir letra a letra
  // e inyectar los tags directamente sin escaparlos.
  const tokenRegex = /(<[^>]+>)|([^<]+)/g;
  const tokens = [];
  let match;
  while ((match = tokenRegex.exec(rawText)) !== null) {
    if (match[1]) {
      // Es un tag HTML — lo guardamos como bloque atómico
      tokens.push({ type: 'html', value: match[1] });
    } else {
      // Es texto plano — lo dividimos carácter a carácter
      for (const ch of match[2]) {
        tokens.push({ type: 'char', value: ch });
      }
    }
  }

  const container = document.getElementById('dedication-text');
  container.classList.add('typing');   // fade-in + slide-up
  container.classList.add('writing');  // cursor parpadeante

  // Guardamos el nodo de la firma para no perderlo al reasignar innerHTML
  const signatureNode = container.querySelector('#signature');

  // ID único para el span del cursor en línea
  const CURSOR_ID = 'tw-cursor';

  let i = 0;
  let builtHTML = '';

  // Pausa adicional según puntuación para ritmo nostálgico
  function delayFor(ch) {
    if ('.…!?'.includes(ch)) return 350;
    if (',;:'.includes(ch)) return 180;
    return 90; // delay base por carácter
  }

  // Renderiza el HTML construido + cursor en línea + nodo de firma
  function render() {
    container.innerHTML =
      builtHTML +
      '<span id="' + CURSOR_ID + '" class="tw-cursor" aria-hidden="true">|</span>';
    if (signatureNode) container.appendChild(signatureNode);
    // Auto-scroll dinámico: siempre mantiene la última línea a la vista
    container.scrollTop = container.scrollHeight;
  }

  function typeWriter() {
    if (i < tokens.length) {
      const token = tokens[i];

      if (token.type === 'html') {
        // Tag HTML (ej: <br>) — se inyecta directo, pausa dramática
        builtHTML += token.value;
        render();
        i++;
        setTimeout(typeWriter, 600);
      } else {
        // Carácter normal — se escapa para seguridad
        const ch = token.value;
        builtHTML += ch
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        render();
        i++;
        setTimeout(typeWriter, delayFor(ch));
      }
    } else {
      // Terminó — eliminamos el cursor en línea y mostramos la firma
      container.classList.remove('writing');
      const cursor = document.getElementById(CURSOR_ID);
      if (cursor) cursor.remove();
      setTimeout(showSignature, 650);
    }
  }

  typeWriter();
}


// Firma manuscrita animada
function showSignature() {
  // Cambia para buscar la firma dentro del contenedor de dedicatoria
  const dedication = document.getElementById('dedication-text');
  let signature = dedication.querySelector('#signature');
  if (!signature) {
    signature = document.createElement('div');
    signature.id = 'signature';
    signature.className = 'signature';
    dedication.appendChild(signature);
  }
  let firma = getURLParam('firma');
  signature.textContent = firma ? decodeURIComponent(firma) : "Con mucho amor y arrepentimiento, Carlitos";
  signature.classList.add('visible');
}



// Controlador de objetos flotantes
function startFloatingObjects() {
  const container = document.getElementById('floating-objects');
  let count = 0;
  function spawn() {
    // 50% chance for Sakura petal, 50% for Fairy Dust
    const isSakura = Math.random() > 0.5;
    let el = document.createElement('div');

    if (isSakura) {
      el.className = 'sakura-petal';
      el.innerHTML = `<svg viewBox="0 0 512 512" width="${12 + Math.random() * 12}" height="${12 + Math.random() * 12}"><path fill="#ffb7c5" d="M380.2 268.4c-4.4-1.2-8.6-2.5-12.7-3.9 14.9-10.4 28.5-22.9 40.5-37.1 27.6-32.6 42.1-71.1 36.3-108.3-5-31.9-22-60-49-80.4C371 20.4 341.1 11.2 309 13c-38.3 2.1-74.9 22.3-100.9 55.6-7.8 10.1-14.7 20.8-20.6 32 3.1-13 4.2-26.3 3.3-39.7-2.3-33-16.6-63.5-41.2-85.3-24.8-22-56.1-33.1-88.3-31-31.5 2-60.6 17-80.9 42-20.3 25-29.3 57.3-24.8 89.2 4.1 29 17.5 56.4 38.6 79.1 16.7 18 36.8 32.2 59 41.7 4.5 1.9 9 3.6 13.7 5.1-16.9 8.2-32.4 18.6-46 31-29.2 26.6-47.5 62-52.6 100.3-4.5 33.7 3.3 67.9 22.3 95.8 19.3 28.3 47.9 47 81 53 32.5 5.9 66-.3 94.7-18.4 20-12.6 37.1-28.7 51.1-47.5-6.3 12.3-13.8 23.9-22.5 34.6-23.7 29.3-56.1 48-91.8 53-30.8 4.3-62.1-3.6-88.7-22.6-26.4-18.8-44.5-46.7-50.6-78.3-6.2-32-.1-64.8 17.6-91.7 14.5-22.1 34.1-40.2 56.9-52.9-10 17.1-17.1 35.8-20.9 55.6-4.5 23.8-3.1 48.5 4 71.9 6.8 22.5 18.6 42.8 34 58.7 16 16.5 35.9 27.8 57.7 32.5 24 5.2 49.3 2 71.8-8.8 22.1-10.6 41.1-26.7 54.4-46 22-31.9 31.6-69.7 26.8-107.5-4.5-35.3-21.8-67.6-48.7-90.8z"/></svg>`;
      el.style.opacity = 0.7 + Math.random() * 0.3;
    } else {
      el.className = 'fairy-dust';
      el.style.opacity = 0.4 + Math.random() * 0.6;
    }

    // Posición inicial
    el.style.left = `${Math.random() * 90 + 2}%`;
    el.style.top = `${100 + Math.random() * 10}%`;
    container.appendChild(el);

    // Animación flotante
    const duration = 6000 + Math.random() * 5000;
    const drift = (Math.random() - 0.5) * 80;
    const rotation = isSakura ? Math.random() * 720 : 0;

    setTimeout(() => {
      el.style.transition = `transform ${duration}ms cubic-bezier(.37,0,.63,1), opacity ${duration / 1.5}ms`;
      el.style.transform = `translate(${drift}px, -110vh) scale(${0.8 + Math.random() * 0.6}) rotate(${rotation}deg)`;
      el.style.opacity = 0;
    }, 30);

    // Eliminar después de animar
    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, duration + 500);

    // Generar más objetos
    if (count++ < 45) setTimeout(spawn, 300 + Math.random() * 400);
    else setTimeout(spawn, 1000 + Math.random() * 1500);
  }
  spawn();
}

// Función showCountdown() eliminada — el contador fue removido del diseño.

// --- Música de fondo ---
function playBackgroundMusic() {
  const audio = document.getElementById('bg-music');
  const btn = document.getElementById('music-btn');
  const iconPath = btn ? btn.querySelector('path') : null;
  if (!audio || !btn || !iconPath) return;

  const playIcon = "M8 5v14l11-7z"; // Play icon
  const pauseIcon = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"; // Pause icon

  // --- Opción archivo local por parámetro 'musica' ---
  let musicaParam = getURLParam('musica');
  if (musicaParam) {
    // Decodifica y previene rutas maliciosas
    musicaParam = decodeURIComponent(musicaParam).replace(/[^\w\d .\-]/g, '');
    audio.src = 'Music/' + musicaParam;
  }

  // --- Opción YouTube (solo mensaje de ayuda) ---
  let youtubeParam = getURLParam('youtube');
  if (youtubeParam) {
    // Muestra mensaje de ayuda para descargar el audio
    let helpMsg = document.getElementById('yt-help-msg');
    if (!helpMsg) {
      helpMsg = document.createElement('div');
      helpMsg.id = 'yt-help-msg';
      helpMsg.style.position = 'fixed';
      helpMsg.style.right = '18px';
      helpMsg.style.bottom = '90px';
      helpMsg.style.background = 'rgba(255,255,255,0.95)';
      helpMsg.style.color = '#e60026';
      helpMsg.style.padding = '10px 16px';
      helpMsg.style.borderRadius = '12px';
      helpMsg.style.boxShadow = '0 2px 8px #e6002633';
      helpMsg.style.fontSize = '1.05em';
      helpMsg.style.zIndex = 100;
      helpMsg.innerHTML = 'Para usar música de YouTube, descarga el audio (por ejemplo, usando y2mate, 4K Video Downloader, etc.), colócalo en la carpeta <b>Music</b> y usa la URL así:<br><br><code>?musica=nombre.mp3</code>';
      document.body.appendChild(helpMsg);
      setTimeout(() => { if (helpMsg) helpMsg.remove(); }, 15000);
    }
  }

  audio.volume = 0.7;
  audio.loop = true;
  // Intentar reproducir inmediatamente
  audio.play().then(() => {
    iconPath.setAttribute('d', pauseIcon);
  }).catch(() => {
    // Si falla el autoplay, esperar click en el botón
    iconPath.setAttribute('d', playIcon);
  });

  btn.onclick = () => {
    if (audio.paused) {
      audio.play();
      iconPath.setAttribute('d', pauseIcon);
    } else {
      audio.pause();
      iconPath.setAttribute('d', playIcon);
    }
  };
}

// La música ya no se inicia al cargar la página, sino al hacer click en el overlay
// window.addEventListener('DOMContentLoaded', () => {
//   playBackgroundMusic();
// });

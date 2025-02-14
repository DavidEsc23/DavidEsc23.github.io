document.addEventListener('DOMContentLoaded', () => {
  const noBtn = document.getElementById('noBtn');
  const yesBtn = document.getElementById('yesBtn');
  const message = document.getElementById('message');
  const container = document.querySelector('.buttons');
  const floatingImage = document.getElementById('floatingImage');
  const leftGif = document.getElementById('leftGif');
  const rightGif = document.getElementById('rightGif');

  let hoverCount = 0; // Contador de veces que se pasa el mouse sobre "No"

  /**
   * Mueve el botón "No" a una posición aleatoria en toda la pantalla,
   * respetando un margen y asegurándose de que se mueva lo suficiente.
   */
  function moveNoButton() {
    hoverCount++;
    if (hoverCount === 8) {
      showFloatingImage();
    }

    // Si aún no está en "modo huida", trasladarlo al <body>
    if (!noBtn.classList.contains('move')) {
      const btnRect = noBtn.getBoundingClientRect();
      noBtn.classList.add('move');
      document.body.appendChild(noBtn);
      noBtn.style.left = btnRect.left + 'px';
      noBtn.style.top = btnRect.top + 'px';
    }

    // Parámetros para el movimiento aleatorio en toda la pantalla
    const margin = 20;       // margen para no pegar al borde
    const minDistance = 100; // distancia mínima respecto a su posición actual

    const availableWidth = window.innerWidth - noBtn.offsetWidth - 2 * margin;
    const availableHeight = window.innerHeight - noBtn.offsetHeight - 2 * margin;

    const currentX = parseInt(noBtn.style.left, 10);
    const currentY = parseInt(noBtn.style.top, 10);

    let randomX, randomY, distance;
    let attempts = 0;

    do {
      randomX = margin + Math.floor(Math.random() * availableWidth);
      randomY = margin + Math.floor(Math.random() * availableHeight);
      distance = Math.hypot(randomX - currentX, randomY - currentY);
      attempts++;
      if (attempts > 15) break;
    } while (distance < minDistance);

    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
  }

  /**
   * Muestra la imagen flotante (del "No") con efecto fade in.
   */
  function showFloatingImage() {
    if (floatingImage) {
      floatingImage.classList.remove('hidden');
      floatingImage.classList.add('fade-in');
    }
  }

  noBtn.addEventListener('mouseover', moveNoButton);

  // Al hacer clic en "¡Claro que si!", se ocultan los botones (y la imagen flotante, si estuviera visible),
  // se muestran los GIFs a los lados, aparece el mensaje y comienza a sonar una canción.
  yesBtn.addEventListener('click', () => {
    container.style.opacity = 0;
    noBtn.style.opacity = 0;
    setTimeout(() => {
      container.style.display = 'none';
      noBtn.style.display = 'none';
      
      // Ocultar la imagen flotante, si está visible
      if (floatingImage) {
        floatingImage.style.display = 'none';
      }
      
      // Mostrar el mensaje de confirmación
      message.classList.remove('hidden');
      
      // Mostrar los GIFs a los lados
      leftGif.classList.remove('hiddenGif');
      leftGif.classList.add('showGif');
      rightGif.classList.remove('hiddenGif');
      rightGif.classList.add('showGif');
      
      // Reproducir la canción
      const song = new Audio('miau.mp3');
      song.loop = true;
      song.play();
    }, 300);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const message = document.getElementById("message");
  const container = document.querySelector(".buttons");
  const floatingImage = document.getElementById("floatingImage");
  const leftGif = document.getElementById("leftGif");
  const rightGif = document.getElementById("rightGif");

  let hoverCount = 0; // Contador de hovers sobre "No"

  function moveNoButton() {
    hoverCount++;
    if (hoverCount === 8) {
      showFloatingImage();
    }

    if (!noBtn.classList.contains("move")) {
      const btnRect = noBtn.getBoundingClientRect();
      noBtn.classList.add("move");
      document.body.appendChild(noBtn);
      noBtn.style.left = btnRect.left + "px";
      noBtn.style.top = btnRect.top + "px";
    }

    const margin = 20;
    const minDistance = 100;
    const availableWidth = window.innerWidth - noBtn.offsetWidth - 2 * margin;
    const availableHeight = window.innerHeight - noBtn.offsetHeight - 2 * margin;
    const currentX = parseInt(noBtn.style.left, 10);
    const currentY = parseInt(noBtn.style.top, 10);
    let randomX, randomY, distance, attempts = 0;

    do {
      randomX = margin + Math.floor(Math.random() * availableWidth);
      randomY = margin + Math.floor(Math.random() * availableHeight);
      distance = Math.hypot(randomX - currentX, randomY - currentY);
      attempts++;
      if (attempts > 15) break;
    } while (distance < minDistance);

    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
  }

  function showFloatingImage() {
    if (floatingImage) {
      floatingImage.classList.remove("hidden");
      floatingImage.classList.add("fade-in");
    }
  }

  noBtn.addEventListener("mouseover", moveNoButton);

  // Función para lanzar confeti usando la librería canvas-confetti
  function fireConfetti() {
    const duration = 3000; // 3 segundos
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff99cc", "#ff66a3", "#ff3399"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff99cc", "#ff66a3", "#ff3399"],
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }

  yesBtn.addEventListener("click", () => {
    container.style.opacity = 0;
    noBtn.style.opacity = 0;

    setTimeout(() => {
      container.style.display = "none";
      noBtn.style.display = "none";

      if (floatingImage) {
        floatingImage.style.display = "none";
      }

      message.classList.remove("hidden");
      leftGif.classList.remove("hiddenGif");
      leftGif.classList.add("showGif");
      rightGif.classList.remove("hiddenGif");
      rightGif.classList.add("showGif");

      const song = new Audio("miau.mp3");
      song.loop = true;
      song.play();

      fireConfetti();
    }, 300);
  });

  // Función para generar un solo corazón
  function generateHeart() {
    const heartSymbols = ["♥", "💕", "❣", "💖"];
    const heart = document.createElement("div");
    heart.className = "heart";
    // Seleccionar símbolo aleatorio
    heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    // Posición horizontal aleatoria
    heart.style.left = Math.random() * 100 + "%";
    // Tamaño aleatorio
    heart.style.fontSize = 12 + Math.random() * 30 + "px";
    // Duración aleatoria de la animación
    const duration = 5 + Math.random() * 5;
    heart.style.animationDuration = duration + "s";
    // Color aleatorio en tonos rosados/rojos
    const hue = Math.floor(Math.random() * 50) + 330;
    heart.style.color = `hsla(${hue}, 80%, 60%, 0.8)`;
    // Posición: inicia justo debajo de la pantalla
    heart.style.bottom = "-50px";

    document.getElementById("hearts-container").appendChild(heart);
    setTimeout(() => { heart.remove(); }, duration * 1000);
  }

  // Función para generar múltiples corazones a la vez
  function generateMultipleHearts(count) {
    for (let i = 0; i < count; i++) {
      generateHeart();
    }
  }

  // Intervalo para generar corazones (ajusta valores para más densidad)
  setInterval(() => { generateMultipleHearts(3); }, 300);
});

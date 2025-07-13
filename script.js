// --- [BARU] Script untuk Kontrol Musik ---
window.addEventListener("load", () => {
  const music = document.getElementById("background-music");
  const musicControlBtn = document.getElementById("music-control-btn");

  // Fungsi untuk mencoba memutar musik
  const playMusic = async () => {
    try {
      await music.play();
      musicControlBtn.classList.add("playing");
    } catch (err) {
      // Gagal autoplay, tunggu interaksi pengguna
      console.log(
        "Autoplay diblokir oleh browser. Menunggu interaksi pengguna."
      );
      // Tambahkan listener untuk klik pertama kali untuk memulai musik
      const playOnFirstInteraction = () => {
        music.play();
        musicControlBtn.classList.add("playing");
        window.removeEventListener("click", playOnFirstInteraction);
        window.removeEventListener("touchstart", playOnFirstInteraction);
      };
      window.addEventListener("click", playOnFirstInteraction, { once: true });
      window.addEventListener("touchstart", playOnFirstInteraction, {
        once: true,
      });
    }
  };

  // Panggil fungsi untuk autoplay saat halaman dimuat
  playMusic();

  // Tambahkan event listener untuk tombol kontrol
  musicControlBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      musicControlBtn.classList.add("playing");
    } else {
      music.pause();
      musicControlBtn.classList.remove("playing");
    }
  });
});

// --- Script untuk Animasi Font Interaktif (Tidak Berubah) ---
const interactiveTexts = document.querySelectorAll(".main-title, .subtitle");

function resetTextStyles() {
  interactiveTexts.forEach((text) => {
    text.classList.remove("text-active");
  });
}

interactiveTexts.forEach((text) => {
  text.addEventListener("click", (event) => {
    event.stopPropagation();
    const isAlreadyActive = text.classList.contains("text-active");
    resetTextStyles();
    if (!isAlreadyActive) {
      text.classList.add("text-active");
    }
  });
});

window.addEventListener("click", () => {
  resetTextStyles();
});

// --- Script untuk Animasi Partikel di Latar Belakang (Tidak Berubah) ---
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 9000;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 2 + 0.5;
    let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
    let directionX = Math.random() * 0.4 - 0.2;
    let directionY = Math.random() * 0.4 - 0.2;
    let color = "rgba(224, 224, 224, 0.3)";
    particlesArray.push(
      new Particle(x, y, directionX, directionY, size, color)
    );
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
}

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

init();
animate();

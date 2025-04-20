const flowerHeart = document.getElementById("flower-heart");
const confettiContainer = document.getElementById("confetti-container");
const player = document.getElementById("music-player");
const audio = document.getElementById("audio");

const songs = ["music/song2.mp3", "music/song1.mp3", "music/song3.mp3"];
let currentSong = 0;

function startMagic() {
  createHeartPattern("🌹");
  flowerHeart.style.display = "block";
  player.style.display = "flex";

  audio.volume = 0.1;
  audio.play();

  setTimeout(() => {
    createHeartPattern("🌻");
  }, 5000);

  setTimeout(() => {
    showConfetti();
  }, 10000);
}

window.addEventListener("load", () => {
  const carousel = document.getElementById("carousel");
  const images = carousel.querySelectorAll("img");
  const imageCount = images.length;
  const durationPerSlide = 2; // segundos por imagen
  const totalDuration = durationPerSlide * imageCount;

  // Asigna duración al CSS
  images.forEach(img => {
    img.style.animationDuration = `${totalDuration}s`;
  });

  // Genera keyframes dinámicos
  let keyframes = "@keyframes slideAnimation {\n";
  for (let i = 0; i <= imageCount - 1; i++) {
    const percent = (i * 100) / imageCount;
    const translate = -(i * 100);
    keyframes += `  ${percent}% { transform: translateX(${translate}%); }\n`;
  }
  keyframes += "}\n";

  // Inyecta en el DOM
  const style = document.createElement("style");
  style.innerHTML = keyframes;
  document.head.appendChild(style);
});


function createHeartPattern(emoji) {
	const count = 30;
  const container = document.getElementById("flower-heart");
  container.querySelectorAll(".flower").forEach(f => f.remove());

  for (let i = 0; i < count; i++) {
    const t = Math.PI - (i / count) * 2 * Math.PI;
    const scale = 100; // controla el tamaño del corazón
    let offsetX = 50; // 50
    let offsetY = 30; // 50

	let scaleX = 15;
	let scaleY = 45;
	
	if (window.innerWidth <= 480) {
		offsetX = 45;   // puedes ajustar fino
		offsetY = 62;
		scaleX = 40;
		scaleY = 47;
	}

    const x = offsetX + scaleX * Math.pow(Math.sin(t), 3); // más angosto //15
    const y = offsetY - scaleY * ( //45
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    ) / 17;

    const flower = document.createElement("div");
    flower.className = "flower";
    flower.textContent = emoji;
    flower.style.left = `${x}%`;
    flower.style.top = `${y}%`;
    flower.style.animationDelay = `${i * 0.05}s`;
    container.appendChild(flower);
  }
}

function generateHeartCoordinates(n) {
  const coords = [];
  for (let i = 0; i < n; i++) {
    const t = Math.PI - (i / (n - 1)) * 2 * Math.PI;
    const x = 50 + 15 * Math.pow(Math.sin(t), 3); // más angosto
    const y = 50 - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 17;
    coords.push({ x, y });
  }
  return coords;
}

function showConfetti() {
  for (let i = 0; i < 100; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.fontSize = `${Math.random() * 20 + 10}px`;
    heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
    heart.textContent = "❤️";
    confettiContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }
}

function moreLove() {
  const romanticEmojis = ["❤️", "💕", "💘", "💖", "🌹", "😘", "💞", "💋", "💓", "😍"];
  for (let i = 0; i < 100; i++) {
    const emoji = romanticEmojis[Math.floor(Math.random() * romanticEmojis.length)];
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.fontSize = `${Math.random() * 20 + 10}px`;
    heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
    heart.textContent = emoji;
    confettiContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }
}


// 🎵 Player Controls
function togglePlayPause() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  audio.src = songs[currentSong];
  audio.play();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  audio.src = songs[currentSong];
  audio.play();
}

function changeVolume(val) {
  audio.volume = parseFloat(val);
}

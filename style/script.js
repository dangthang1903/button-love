const sound = document.getElementById('popsound');
const nyanCat = document.getElementById('nyan-cat');
const meow = document.getElementById('meosound');
const backgroundMusic = document.getElementById('backgroundmusic');

// Music Player Variables
const playlist = [
  {
    title: "Shay Nắnggg",
    artist: "AMEE x OBITO x HỨA KIM TUYỀN",
    src: "music/Amee x Obito x Hứa Kim Tuyền  Shay Nắnggg Lyrics.mp3"
  },
  {
    title: "Anh Đánh Rơi Người Yêu Này",
    artist: "Andiez ft. AMEE",
    src: "music/anh đánh rơi người yêu này (speed up) _ andiez ft amee.mp3"
  },
  {
    title: "Cô Gái Này Là Của Ai",
    artist: "Krix X Rush ft. Nhi Nhi",
    src: "music/「speedup」Cô Gái Này Là Của Ai I Krix X Rush ft. Nhi Nhi I _ Flechazowu.mp3"
  }
];

let currentSongIndex = 0;
let isLooping = false;
let isPlayerExpanded = false;

// Initialize music player when page loads
window.addEventListener('load', () => {
  loadSong(currentSongIndex);
  backgroundMusic.volume = 0.3;
  updateUI();
  
  // Update progress bar
  backgroundMusic.addEventListener('timeupdate', updateProgress);
  backgroundMusic.addEventListener('loadedmetadata', () => {
    updateTotalTime();
  });
  
  // Handle song end
  backgroundMusic.addEventListener('ended', () => {
    if (isLooping) {
      backgroundMusic.currentTime = 0;
      backgroundMusic.play();
    } else {
      nextSong();
    }
  });
  
  // Try autoplay
  backgroundMusic.play().catch(() => {
    console.log('Autoplay prevented. User will need to interact with the page first.');
  });
});

// Enable autoplay after first user interaction
document.addEventListener('click', () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play().catch(() => {
      console.log('Could not play background music');
    });
  }
}, { once: true });

nyanCat.addEventListener('click', () => {
  meow.play();
});

nyanCat.addEventListener('touchstart', () => {
  meow.play();
});

const messages = [
  "Anh yêu Sún 💕", "Anh thương Sún 🤗", "I Love Sún 🥰", "Sún xinh đẹp 😍",
  "Hạnh phúc nhé 💫", "❤️ Gửi yêu thương ❤️", "Luôn mỉm cười nhé 😊",
  "Love Sún iu 3000 💖", "Cảm ơn Sún vì tất cả 🌸",
  "Sún là một món quà 🎁", "Trái tim này là của Sún 💘",
  "Sún iu làm thế giới này đẹp hơn 💐", "Love You In Every Universe",
  "Em bé là duy nhất 💞", "Saranghaeyo❤️",
  "Anh nhớ Sún nhắm nhắm 🌈", "You Are My Everything 🫶",
  "Yêu Sún không cần lý do 🏡", "Sún là lý do anh luôn mỉm cười nà 😘",
  "Anh yêu Sún vì em là chính em ✨"
];

function showRandomMessage(event) {
  sound.play();
  const msg = document.createElement("div");
  msg.className = "message";
  msg.textContent = messages[Math.floor(Math.random() * messages.length)];

  const directions = [0, Math.PI/4, Math.PI/2, 3*Math.PI/4, Math.PI, 5*Math.PI/4, 3*Math.PI/2, 7*Math.PI/4];
  const angle = directions[Math.floor(Math.random() * directions.length)];
  const distance = 200;
  const dx = Math.cos(angle) * distance + "px";
  const dy = Math.sin(angle) * distance + "px";
  msg.style.setProperty('--dx', dx);
  msg.style.setProperty('--dy', dy);

  const rect = event.currentTarget.getBoundingClientRect();
  msg.style.left = rect.left + rect.width / 2 + "px";
  msg.style.top = rect.top + rect.height / 2 + "px";
  msg.style.transform = "translate(-50%, -50%)";
  msg.style.position = "fixed";

  document.body.appendChild(msg);

  setTimeout(() => msg.remove(), 3000);
}

// Music Player Functions
function loadSong(index) {
  const song = playlist[index];
  backgroundMusic.src = song.src;
  document.getElementById('songTitle').textContent = song.title;
  document.getElementById('songArtist').textContent = song.artist;
}

function updateUI() {
  const playPauseIcon = document.getElementById('playPauseIcon');
  const loopBtn = document.getElementById('loopBtn');
  
  playPauseIcon.textContent = backgroundMusic.paused ? '▶️' : '⏸️';
  loopBtn.style.opacity = isLooping ? '1' : '0.6';
  loopBtn.style.color = isLooping ? '#ff4081' : '#666';
}

function togglePlayPause() {
  if (backgroundMusic.paused) {
    backgroundMusic.play().catch(() => {
      console.log('Could not play music');
    });
  } else {
    backgroundMusic.pause();
  }
  updateUI();
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(currentSongIndex);
  if (!backgroundMusic.paused) {
    backgroundMusic.play();
  }
  updateUI();
}

function previousSong() {
  currentSongIndex = currentSongIndex > 0 ? currentSongIndex - 1 : playlist.length - 1;
  loadSong(currentSongIndex);
  if (!backgroundMusic.paused) {
    backgroundMusic.play();
  }
  updateUI();
}

function toggleLoop() {
  isLooping = !isLooping;
  backgroundMusic.loop = isLooping;
  updateUI();
}

function togglePlayer() {
  const playerControls = document.getElementById('playerControls');
  const toggleIcon = document.getElementById('playerToggleIcon');
  
  isPlayerExpanded = !isPlayerExpanded;
  
  if (isPlayerExpanded) {
    playerControls.style.display = 'block';
    toggleIcon.textContent = '🔽';
  } else {
    playerControls.style.display = 'none';
    toggleIcon.textContent = '🎵';
  }
}

function setVolume(value) {
  backgroundMusic.volume = value / 100;
}

function updateProgress() {
  const progressFill = document.getElementById('progressFill');
  const currentTime = document.getElementById('currentTime');
  
  if (backgroundMusic.duration) {
    const progress = (backgroundMusic.currentTime / backgroundMusic.duration) * 100;
    progressFill.style.width = progress + '%';
    
    const minutes = Math.floor(backgroundMusic.currentTime / 60);
    const seconds = Math.floor(backgroundMusic.currentTime % 60);
    currentTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

function updateTotalTime() {
  const totalTime = document.getElementById('totalTime');
  
  if (backgroundMusic.duration) {
    const minutes = Math.floor(backgroundMusic.duration / 60);
    const seconds = Math.floor(backgroundMusic.duration % 60);
    totalTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

function setProgress(event) {
  const progressBar = event.currentTarget;
  const rect = progressBar.getBoundingClientRect();
  const percent = (event.clientX - rect.left) / rect.width;
  
  if (backgroundMusic.duration) {
    backgroundMusic.currentTime = percent * backgroundMusic.duration;
  }
}

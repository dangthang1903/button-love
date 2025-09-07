const sound = document.getElementById('popsound');
const nyanCat = document.getElementById('nyan-cat');
const meow = document.getElementById('meosound');

nyanCat.addEventListener('click', () => {
  meow.play();
});

nyanCat.addEventListener('touchstart', () => {
  meow.play();
});

const messages = [
  "Anh yêu em Uyên 💕", "Anh thương em Uyên 🤗", "I Love You Uyên 🥰", "Em thật xinh đẹp Uyên",
  "Hạnh phúc nhé Uyên 💫", "❤️ Gửi yêu thương ❤️ Uyên", "Luôn mỉm cười nhé 😊 Uyên",
  "Love You 3000 Uyên 💖", "Cảm ơn vì tất cả Uyên 🌸",
  "Em là một món quà Uyên 🎁", "Trái tim này là của em Uyên 💘",
  "Em làm thế giới này đẹp hơn Uyên 💐", "Love You In Every Universe Uyên",
  "Em bé Uyên là duy nhất Uyên 💞", "Saranghaeyo❤️ Uyên",
  "Anh nhớ em nhiều Uyên 🌈", "You Are My Everything Uyên 🫶",
  "Yêu em không cần lý do Uyên 🏡", "Em là lý do anh luôn mỉm cười Uyên 😘",
  "Anh yêu em vì em là chính em Uyên ✨"
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

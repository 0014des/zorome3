let autoRolling = false;
let history = [];

const sound = document.getElementById("success-sound");

document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

function rollOnce() {
  if (autoRolling) return;
  const result = rollDice();
  const isZoro = isZorome(result);

  const message = document.getElementById("result-message");
  if (isZoro) {
    message.textContent = `🎉 ゾロ目成功！出目は ${result[0]}！`;
    message.style.color = "limegreen";
    playSuccessSound();
  } else {
    message.textContent = `出目: ${result.join(", ")}（ゾロ目ではありません）`;
    message.style.color = "black";
  }
}

function startAutoRoll() {
  if (autoRolling) return;
  autoRolling = true;

  const message = document.getElementById("result-message");
  message.textContent = "ゾロ目が出るまで振り続けています...";
  message.style.color = "black";

  const interval = setInterval(() => {
    const result = rollDice();
    if (isZorome(result)) {
      clearInterval(interval);
      autoRolling = false;
      playSuccessSound();
      message.textContent = `🎉 ゾロ目成功！出目は ${result[0]}！`;
      message.style.color = "limegreen";
    }
  }, 200);
}

function rollDice() {
  const container = document.getElementById("dice-container");
  const count = parseInt(document.getElementById("dice-count").value);
  const result = [];
  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const value = Math.floor(Math.random() * 6) + 1;
    result.push(value);

    const dice = document.createElement("div");
    dice.className = "dice";
    dice.textContent = getDiceEmoji(value);
    container.appendChild(dice);
  }

  addToHistory(result);
  return result;
}

function isZorome(arr) {
  return arr.every(val => val === arr[0]);
}

function addToHistory(result) {
  const historyList = document.getElementById("history-list");
  history.unshift(result.join(", "));
  if (history.length > 100) history.pop();

  historyList.innerHTML = "";
  history.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
}

function playSuccessSound() {
  sound.currentTime = 0;
  sound.play();
}

function getDiceEmoji(num) {
  const emojis = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
  return emojis[num - 1] || num;
}

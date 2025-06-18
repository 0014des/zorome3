let autoRolling = false;
let history = [];
const sound = document.getElementById("success-sound");

document.getElementById("toggle-theme").onclick = () => {
  document.body.classList.toggle("dark");
};

document.getElementById("go-home").onclick = () => {
  alert("あるわけねーだろｗ");
};

function rollOnce() {
  if (autoRolling) return;
  const result = rollDice();
  const isZoro = result.every(v => v === result[0]);
  showResult(result, isZoro);
}

function startAutoRoll() {
  if (autoRolling) return;
  autoRolling = true;
  setResult("ゾロ目が出るまで振り続けています...", "black");

  const interval = setInterval(() => {
    const result = rollDice();
    const isZoro = result.every(v => v === result[0]);
    if (isZoro) {
      clearInterval(interval);
      autoRolling = false;
      showResult(result, true);
    }
  }, 200);
}

function rollDice() {
  const container = document.getElementById("dice-container");
  const count = parseInt(document.getElementById("dice-count").value);
  const result = [];
  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const val = Math.floor(Math.random() * 6) + 1;
    result.push(val);
    const dice = createDiceElement(val);
    container.appendChild(dice);
  }

  addToHistory(result);
  return result;
}

function createDiceElement(value) {
  const dice = document.createElement("div");
  dice.className = "dice";
  dice.dataset.value = value;
  for (let i = 0; i < 9; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";
    dice.appendChild(dot);
  }
  return dice;
}

function showResult(result, isZoro) {
  const message = isZoro
    ? `🎉 ゾロ目成功！出目は ${result[0]}`
    : `出目: ${result.join(", ")}（ゾロ目ではありません）`;
  const color = isZoro ? "green" : "black";
  setResult(message, color);
  if (isZoro) {
    sound.currentTime = 0;
    sound.play();
  }
}

function setResult(text, color) {
  const el = document.getElementById("result-message");
  el.textContent = text;
  el.style.color = color;
}

function addToHistory(result) {
  const list = document.getElementById("history-list");
  history.unshift(result.join(", "));
  if (history.length > 100) history.pop();

  list.innerHTML = "";
  history.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    list.appendChild(li);
  });
}

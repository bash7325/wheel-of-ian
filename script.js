const categoryForm = document.getElementById('categoryForm');
const categoryInput = document.getElementById('categoryInput');
const categoryList = document.getElementById('categoryList');
const wheelCanvas = document.getElementById('wheelCanvas');
const spinButton = document.getElementById('spinButton');
const result = document.getElementById('result');

const categories = [];

function drawWheel() {
  const ctx = wheelCanvas.getContext('2d');
  ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

  const centerX = wheelCanvas.width / 2;
  const centerY = wheelCanvas.height / 2;
  const radius = Math.min(centerX, centerY);

  categories.forEach((category, index) => {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, (index / categories.length) * Math.PI * 2, ((index + 1) / categories.length) * Math.PI * 2);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();

    ctx.fillStyle = `hsl(${index / categories.length * 360}, 100%, 50%)`;
    ctx.fill();
  });
}

function spinWheel() {
  const randomIndex = Math.floor(Math.random() * categories.length);
  result.textContent = `Selected Category: ${categories[randomIndex]}`;
}

categoryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const category = categoryInput.value.trim();
  if (category) {
    categories.push(category);
    const listItem = document.createElement('li');
    listItem.textContent = category;
    categoryList.appendChild(listItem);
    drawWheel();
    spinButton.disabled = false;
  }
  categoryInput.value = '';
});

spinButton.addEventListener('click', spinWheel);

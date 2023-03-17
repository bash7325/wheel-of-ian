const categoryForm = document.getElementById('categoryForm');
const categoryInput = document.getElementById('categoryInput');
const categoryList = document.getElementById('categoryList');
const wheelCanvas = document.getElementById('wheelCanvas');
const spinButton = document.getElementById('spinButton');
const result = document.getElementById('result');

const categories = [];

function drawWheel(rotation) {
  const ctx = wheelCanvas.getContext('2d');
  ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

  const centerX = wheelCanvas.width / 2;
  const centerY = wheelCanvas.height / 2;
  const radius = Math.min(centerX, centerY);

  categories.forEach((category, index) => {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, ((index / categories.length) * Math.PI * 2) + rotation, (((index + 1) / categories.length) * Math.PI * 2) + rotation);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();

    ctx.fillStyle = `hsl(${index / categories.length * 360}, 100%, 50%)`;
    ctx.fill();
  });
}

function spinWheel() {
  const spinDuration = 5000; // Spin duration in milliseconds
  const start = performance.now();
  const initialRotation = Math.random() * Math.PI * 2;
  const totalRotations = 5 + Math.floor(Math.random() * 5); // Spin at least 5 times and at most 10 times

  function animate(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / spinDuration, 1);
    const easeOutCubic = (t) => (--t) * t * t + 1;
    const currentRotation = initialRotation + easeOutCubic(progress) * totalRotations * Math.PI * 2;

    drawWheel(currentRotation);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      const selectedCategoryIndex = Math.floor((currentRotation / (Math.PI * 2)) * categories.length) % categories.length;
      result.textContent = `Selected Category: ${categories[selectedCategoryIndex]}`;
    }
  }

  requestAnimationFrame(animate);
}

categoryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const category = categoryInput.value.trim();
  if (category) {
    categories.push(category);
    const listItem = document.createElement('li');
    listItem.textContent = category;
    categoryList.appendChild(listItem);
    drawWheel(0);
    spinButton.disabled = false;
  }
  categoryInput.value = '';
});

spinButton.addEventListener('click', spinWheel);

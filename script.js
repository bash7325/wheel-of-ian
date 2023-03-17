// Get DOM elements
const categoryForm = document.getElementById('categoryForm');
const categoryInput = document.getElementById('categoryInput');
const categoryList = document.getElementById('categoryList');
const wheelCanvas = document.getElementById('wheelCanvas');
const spinButton = document.getElementById('spinButton');
const result = document.getElementById('result');

// Initialize categories array
const categories = [];

// Function to draw the wheel with a given rotation
function drawWheel(rotation) {
  // Get the 2D rendering context for the canvas
  const ctx = wheelCanvas.getContext('2d');
  // Clear the canvas
  ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

  // Calculate center and radius of the wheel
  const centerX = wheelCanvas.width / 2;
  const centerY = wheelCanvas.height / 2;
  const radius = Math.min(centerX, centerY);

  // Set font properties
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Draw each category segment on the wheel
  categories.forEach((category, index) => {
    // Calculate angles for each category segment
    const startAngle = ((index / categories.length) * Math.PI * 2) + rotation;
    const endAngle = (((index + 1) / categories.length) * Math.PI * 2) + rotation;
    const middleAngle = (startAngle + endAngle) / 2;

    // Draw the wheel segment
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = `hsl(${index / categories.length * 360}, 100%, 50%)`;
    ctx.fill();

    // Draw the category name
    ctx.fillStyle = '#000';
    ctx.save();
    ctx.translate(centerX + Math.cos(middleAngle) * radius * 0.6, centerY + Math.sin(middleAngle) * radius * 0.6);
    ctx.rotate(middleAngle + Math.PI / 2);
    ctx.fillText(category, 0, 0);
    ctx.restore();
  });
}

// Function to spin the wheel
function spinWheel() {
  // Set spin duration and initial rotation
  const spinDuration = 5000;
  const start = performance.now();
  const initialRotation = Math.random() * Math.PI * 2;
  const totalRotations = 5 + Math.floor(Math.random() * 5);

  // Animation function
  function animate(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / spinDuration, 1);
    const easeOutCubic = (t) => (--t) * t * t + 1;
    const currentRotation = initialRotation + easeOutCubic(progress) * totalRotations * Math.PI * 2;

    // Draw the wheel with the current rotation
    drawWheel(currentRotation);

    // Continue animating until the spin is complete
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // Calculate and display the selected category
      const selectedCategoryIndex = Math.floor((currentRotation / (Math.PI * 2)) * categories.length) % categories.length;
      result.textContent = `Selected Category: ${categories[selectedCategoryIndex]}`;
    }
  }

  // Start the animation
  requestAnimationFrame(animate);
}

//event listener for the category form
categoryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const category = categoryInput.value.trim();
  if (category) {
    categories.push(category);
    drawWheel(0);
    spinButton.disabled = false;
  }
  categoryInput.value = '';
});

//spin it!
spinButton.addEventListener('click', spinWheel);
//dark mode
const toggleDarkModeButton = document.getElementById('toggleDarkMode');

toggleDarkModeButton.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark-theme');
});


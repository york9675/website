// Retro scanline effect
const scanlineCanvas = document.getElementById('scanline-canvas');
function resizeScanline() {
  scanlineCanvas.width = window.innerWidth;
  scanlineCanvas.height = window.innerHeight;
}
resizeScanline();
window.addEventListener('resize', resizeScanline);

function drawScanlines() {
  const ctx = scanlineCanvas.getContext('2d');
  ctx.clearRect(0, 0, scanlineCanvas.width, scanlineCanvas.height);
  ctx.globalAlpha = 0.16;
  for (let y = 0; y < scanlineCanvas.height; y += 4) {
    ctx.fillStyle = (y % 8 === 0) ? '#00000030' : '#00000010';
    ctx.fillRect(0, y, scanlineCanvas.width, 2);
  }
  ctx.globalAlpha = 1.0;
}
setInterval(drawScanlines, 50);
drawScanlines();

// Retro pixel cursor (only for desktop)
const retroCursor = document.getElementById('retro-cursor');
if (window.matchMedia('(pointer: fine)').matches) {
  retroCursor.style.display = 'block';
  document.body.style.cursor = 'none';
  window.addEventListener('mousemove', e => {
    retroCursor.style.left = (e.clientX - 2) + 'px';
    retroCursor.style.top = (e.clientY - 2) + 'px';
  });
  // Click feedback
  window.addEventListener('mousedown', () => {
    retroCursor.style.transform = 'scale(0.94)';
  });
  window.addEventListener('mouseup', () => {
    retroCursor.style.transform = 'none';
  });
}

// Interactive pixel "popup" effect
document.querySelectorAll('.app-card, .member-card').forEach(card => {
  card.addEventListener('mousedown', e => {
    card.style.transform = 'scale(0.96)';
  });
  card.addEventListener('mouseup', e => {
    card.style.transform = '';
  });
  card.addEventListener('mouseleave', e => {
    card.style.transform = '';
  });
});

// Fun: Random "CRT Flicker" effect on section hover
document.querySelectorAll('section').forEach(section => {
  section.addEventListener('mouseenter', () => {
    section.animate([
      { filter: 'brightness(1) blur(0px)' },
      { filter: 'brightness(1.3) blur(1px)' },
      { filter: 'brightness(1) blur(0px)' }
    ], {
      duration: 180,
      easing: 'steps(2, start)'
    });
  });
});

// Fun: "Error" shake effect when clicking the logo
document.querySelector('.logo').addEventListener('click', () => {
  const logo = document.querySelector('.logo');
  logo.animate([
    { transform: 'translate(0,0) rotate(0deg)' },
    { transform: 'translate(-8px,0) rotate(-4deg)' },
    { transform: 'translate(8px,0) rotate(4deg)' },
    { transform: 'translate(-6px,0) rotate(-2deg)' },
    { transform: 'translate(6px,0) rotate(2deg)' },
    { transform: 'translate(0,0) rotate(0deg)' },
  ], {
    duration: 400,
    easing: 'ease-in-out'
  });
});

// Fun: "Pixel sparkle" effect on any click/tap
document.body.addEventListener('click', e => {
  if (e.target.id === 'retro-cursor') return;
  for (let i = 0; i < 8; i++) {
    pixelSparkle(e.clientX, e.clientY);
  }
});

function pixelSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.style.position = 'fixed';
  sparkle.style.left = `${x + (Math.random() - 0.5) * 22}px`;
  sparkle.style.top = `${y + (Math.random() - 0.5) * 22}px`;
  sparkle.style.width = '8px';
  sparkle.style.height = '8px';
  sparkle.style.background = Math.random() > 0.5 ? '#fadc60' : '#6c39be';
  sparkle.style.boxShadow = '0 0 0 2px #fff4';
  sparkle.style.opacity = '1';
  sparkle.style.zIndex = 3000;
  sparkle.style.pointerEvents = 'none';
  sparkle.style.imageRendering = 'pixelated';
  sparkle.style.transition = 'opacity 0.4s, transform 0.4s';
  document.body.appendChild(sparkle);
  setTimeout(() => {
    sparkle.style.opacity = '0';
    sparkle.style.transform = `translateY(${16 + Math.random() * 16}px) scale(0.6)`;
  }, 10);
  setTimeout(() => {
    sparkle.remove();
  }, 420);
}

const canvas = document.getElementById('bg-anim');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
let mouse = { x: width / 2, y: height / 2 };
// زود عدد النقاط والخطوط
const POINTS = 90;
const DIST = 170;
const POINT_RADIUS = 2.1;
const LINE_COLOR = 'rgba(78,161,247,0.13)';
const POINT_COLOR = 'rgba(78,161,247,0.7)';

const points = [];

function randomVel() {
  return (Math.random() - 0.5) * 0.6;
}

function initPoints() {
  points.length = 0;
  for (let i = 0; i < POINTS; i++) {
    points.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: randomVel(),
      vy: randomVel()
    });
  }
}

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  initPoints();
}
window.addEventListener('resize', resize);

document.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Ensure canvas always covers the viewport
function setCanvasFullScreen() {
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
setCanvasFullScreen();

resize();

function draw() {
  ctx.clearRect(0, 0, width, height);

  // Draw lines
  for (let i = 0; i < POINTS; i++) {
    for (let j = i + 1; j < POINTS; j++) {
      const p1 = points[i];
      const p2 = points[j];
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < DIST) {
        ctx.strokeStyle = LINE_COLOR;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 1 - dist / DIST;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
    // Line to mouse
    const dxm = points[i].x - mouse.x;
    const dym = points[i].y - mouse.y;
    const distm = Math.sqrt(dxm * dxm + dym * dym);
    if (distm < DIST) {
      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth = 1.2;
      ctx.globalAlpha = 1 - distm / DIST;
      ctx.beginPath();
      ctx.moveTo(points[i].x, points[i].y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;

  // Draw points
  for (let i = 0; i < POINTS; i++) {
    ctx.beginPath();
    ctx.arc(points[i].x, points[i].y, POINT_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = POINT_COLOR;
    ctx.fill();
  }
}

function update() {
  for (let i = 0; i < POINTS; i++) {
    points[i].x += points[i].vx;
    points[i].y += points[i].vy;

    // Bounce from edges
    if (points[i].x < 0 || points[i].x > width) points[i].vx *= -1;
    if (points[i].y < 0 || points[i].y > height) points[i].vy *= -1;
  }
}

function animate() {
  update();
  draw();
  requestAnimationFrame(animate);
}
animate();

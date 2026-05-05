'use strict';

// ── Shared state ──────────────────────────────────────────────
let canvas, ctx;
let blocks   = [];
let ball     = {};
let paddleX  = CW / 2;
let score    = 0, hiScore = 0;
let gameRunning = false;
let animId   = null;
let elapsed  = 0, nextRowAt = 0, prevTs = null;

// ── Game start ────────────────────────────────────────────────
function startGame() {
  blocks  = [];
  score   = 0;
  paddleX = CW / 2;
  elapsed = 0;
  nextRowAt = ROW_MS;
  prevTs  = null;
  gameRunning = true;

  for (let i = 0; i < 3; i++) addRow();

  const ang = (Math.random() - 0.5) * 0.85;
  ball = {
    x:  CW / 2,
    y:  PADDLE_Y - 28,
    vx: SPEED * Math.sin(ang),
    vy: -SPEED * Math.cos(ang)
  };

  if (animId) cancelAnimationFrame(animId);
  animId = requestAnimationFrame(loop);
}

// ── Game loop ─────────────────────────────────────────────────
function loop(ts) {
  if (!prevTs) prevTs = ts;
  const dt = Math.min(ts - prevTs, 50);
  prevTs = ts;
  elapsed += dt;

  if (elapsed >= nextRowAt) {
    addRow();
    nextRowAt += ROW_MS;
    if (dangerReached()) { endGame(); return; }
  }

  // Ball movement
  ball.x += ball.vx;
  ball.y += ball.vy;

  // Wall bounces
  if (ball.x - BALL_R < 0)  { ball.x = BALL_R;      ball.vx =  Math.abs(ball.vx); }
  if (ball.x + BALL_R > CW) { ball.x = CW - BALL_R; ball.vx = -Math.abs(ball.vx); }
  if (ball.y - BALL_R < 0)  { ball.y = BALL_R;       ball.vy =  Math.abs(ball.vy); }

  if (ball.y - BALL_R > CH) { endGame(); return; }

  // Paddle collision
  const px = paddleX - PW / 2;
  const closestPX = clamp(ball.x, px, px + PW);
  const closestPY = clamp(ball.y, PADDLE_Y, PADDLE_Y + PH);
  const pdx = ball.x - closestPX, pdy = ball.y - closestPY;
  if (ball.vy > 0 && pdx * pdx + pdy * pdy < BALL_R * BALL_R) {
    const hit = clamp((ball.x - paddleX) / (PW / 2), -0.9, 0.9);
    ball.vx = SPEED * hit;
    ball.vy = -Math.sqrt(SPEED * SPEED - ball.vx * ball.vx);
    ball.y  = PADDLE_Y - BALL_R;
  }

  hitBlocks();
  draw();

  if (gameRunning) animId = requestAnimationFrame(loop);
}

// ── End game ──────────────────────────────────────────────────
function endGame() {
  gameRunning = false;
  cancelAnimationFrame(animId);
  if (score > hiScore) hiScore = score;
  document.getElementById('scoreVal').textContent = score;
  document.getElementById('hiVal').textContent    = hiScore;
  setTimeout(() => showScreen('score'), 350);
}

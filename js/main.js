'use strict';

function showScreen(name) {
  ['title', 'game', 'score'].forEach(n => {
    document.getElementById(n + 'Screen').classList.toggle('hidden', n !== name);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  canvas = document.getElementById('gameCanvas');
  ctx    = canvas.getContext('2d');
  canvas.width  = CW;
  canvas.height = CH;

  function resize() {
    const s = Math.min(window.innerWidth / CW, window.innerHeight / CH);
    canvas.style.width  = CW * s + 'px';
    canvas.style.height = CH * s + 'px';
  }
  window.addEventListener('resize', resize);
  resize();

  function trackPointer(clientX) {
    const r = canvas.getBoundingClientRect();
    paddleX = clamp((clientX - r.left) * (CW / r.width), PW / 2, CW - PW / 2);
  }

  canvas.addEventListener('mousemove',  e => trackPointer(e.clientX));
  canvas.addEventListener('touchmove',  e => { e.preventDefault(); trackPointer(e.touches[0].clientX); }, { passive: false });
  canvas.addEventListener('touchstart', e => { e.preventDefault(); trackPointer(e.touches[0].clientX); }, { passive: false });

  document.getElementById('startBtn').addEventListener('click', () => {
    showScreen('game');
    startGame();
  });
  document.getElementById('backBtn').addEventListener('click', () => {
    showScreen('title');
  });
});

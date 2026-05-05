'use strict';

function blockTopY(row) {
  return BTOP + row * (BH + BGAP);
}

function addRow() {
  blocks.forEach(b => b.row++);
  for (let c = 0; c < COLS; c++) {
    if (Math.random() < 0.78) {
      blocks.push({
        col: c,
        row: 0,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      });
    }
  }
}

function dangerReached() {
  return blocks.some(b => blockTopY(b.row) + BH >= DANGER_Y);
}

function hitBlocks() {
  let reflX = false, reflY = false;
  for (let i = blocks.length - 1; i >= 0; i--) {
    const b  = blocks[i];
    const bx = b.col * BW + BGAP / 2;
    const by = blockTopY(b.row);
    const bw = BW - BGAP;

    const cx = clamp(ball.x, bx, bx + bw);
    const cy = clamp(ball.y, by, by + BH);
    const dx = ball.x - cx, dy = ball.y - cy;

    if (dx * dx + dy * dy < BALL_R * BALL_R) {
      blocks.splice(i, 1);
      score += 10;
      if (Math.abs(dx) >= Math.abs(dy)) {
        if (!reflX) { ball.vx *= -1; reflX = true; }
      } else {
        if (!reflY) { ball.vy *= -1; reflY = true; }
      }
    }
  }
}

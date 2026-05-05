'use strict';

function draw() {
  ctx.fillStyle = '#060618';
  ctx.fillRect(0, 0, CW, CH);

  // Subtle column grid
  ctx.strokeStyle = 'rgba(255,255,255,0.025)';
  ctx.lineWidth = 1;
  for (let x = BW; x < CW; x += BW) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CH); ctx.stroke();
  }

  // Danger zone glow
  const dg = ctx.createLinearGradient(0, DANGER_Y - 32, 0, DANGER_Y + 8);
  dg.addColorStop(0, 'rgba(255,50,50,0)');
  dg.addColorStop(1, 'rgba(255,50,50,0.09)');
  ctx.fillStyle = dg;
  ctx.fillRect(0, DANGER_Y - 32, CW, 40);

  // Danger line
  ctx.strokeStyle = 'rgba(255,80,80,0.55)';
  ctx.setLineDash([10, 7]);
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, DANGER_Y); ctx.lineTo(CW, DANGER_Y); ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = 'rgba(255,100,100,0.45)';
  ctx.font = '10px Arial';
  ctx.fillText('DANGER', CW - 54, DANGER_Y - 4);

  // Blocks
  blocks.forEach(b => {
    const x = b.col * BW + BGAP / 2;
    const y = blockTopY(b.row);
    const w = BW - BGAP;

    ctx.shadowColor = b.color;
    ctx.shadowBlur  = 7;
    ctx.fillStyle   = b.color;
    rr(x, y, w, BH, 3);
    ctx.fill();

    ctx.shadowBlur  = 0;
    ctx.fillStyle   = 'rgba(255,255,255,0.22)';
    rr(x + 2, y + 2, w - 4, 5, 2);
    ctx.fill();
  });
  ctx.shadowBlur = 0;

  // Paddle
  const px = paddleX - PW / 2;
  ctx.shadowColor = '#4D96FF';
  ctx.shadowBlur  = 24;
  const pg = ctx.createLinearGradient(px, 0, px + PW, 0);
  pg.addColorStop(0, '#4D96FF');
  pg.addColorStop(1, '#845EC2');
  ctx.fillStyle = pg;
  rr(px, PADDLE_Y, PW, PH, 7);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  rr(px + 4, PADDLE_Y + 2, PW - 8, 4, 3);
  ctx.fill();

  // Ball
  ctx.shadowColor = '#FFD93D';
  ctx.shadowBlur  = 24;
  const bg = ctx.createRadialGradient(ball.x - 2, ball.y - 2, 1, ball.x, ball.y, BALL_R);
  bg.addColorStop(0,    '#FFF');
  bg.addColorStop(0.35, '#FFD93D');
  bg.addColorStop(1,    '#FF8C42');
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, BALL_R, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Score HUD
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = 'bold 13px Arial';
  ctx.fillText('SCORE  ' + score, 12, CH - 12);

  // Next-row progress bar
  const pct = clamp(1 - (nextRowAt - elapsed) / ROW_MS, 0, 1);
  ctx.fillStyle = 'rgba(255,255,255,0.07)';
  ctx.fillRect(0, CH - 5, CW, 5);
  const bGrad = ctx.createLinearGradient(0, 0, CW * pct, 0);
  bGrad.addColorStop(0, 'rgba(77,150,255,0.7)');
  bGrad.addColorStop(1, 'rgba(199,125,255,0.9)');
  ctx.fillStyle = bGrad;
  ctx.fillRect(0, CH - 5, CW * pct, 5);

  ctx.fillStyle = 'rgba(200,180,255,0.45)';
  ctx.font = '10px Arial';
  ctx.fillText('NEXT ROW', CW - 66, CH - 9);
}

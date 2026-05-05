'use strict';

const CW = 400, CH = 640;
const COLS  = 8;
const BW    = CW / COLS;   // 50 px per column
const BH    = 18;
const BGAP  = 3;
const BTOP  = 8;

const PW = 90, PH = 13;
const PADDLE_Y = CH - 56;

const BALL_R = 7;
const SPEED  = 6.0;

const ROW_MS   = 7000;
const DANGER_Y = 498;

const COLORS = ['#FF6B6B','#FF8C42','#FFD93D','#6BCB77','#4D96FF','#C77DFF'];

import Brick from './Brick.js';
import Ball from './Ball.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const ball = new Ball(200, 200, 10);
// const brick = new Brick(200, 200);

const bricks = [];
for (let c = 0; c < 10; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < 4; r += 1) {
    bricks[c][r] = new Brick(0, 0);
  }
}

const drawBricks = (columnCount, rowCount, brickPadding, brickOffsetLeft, brickOffsetTop) => {
  console.log('hello');
  for (let c = 0; c < columnCount; c += 1) {
    for (let r = 0; r < rowCount; r += 1) {
      if (bricks[c][r].status === 1) {
        const brickX = (c * (bricks[c][r].width + brickPadding)) + brickOffsetLeft;
        const brickY = (r * (bricks[c][r].height + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        console.log(bricks[c][r].x, bricks[c][r].y);
        bricks[c][r].render(ctx);
      }
    }
  }
};

const draw = () => {
  ball.render(ctx);
  drawBricks(6, 4, 10, 30, 25);
};

draw();

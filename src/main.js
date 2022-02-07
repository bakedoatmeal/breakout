import Brick from './Brick.js';
import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Text from './Text.js';
import Bricks from './Bricks.js';
import Background from './Background.js'

const canvas = document.getElementById('myCanvas');
const button = document.getElementById('restart-btn');
const ctx = canvas.getContext('2d');
const ball = new Ball(200, 200, 10);
const paddle = new Paddle(0, canvas.height - 10, 75, 10);
const bricks = new Bricks();
const background = new Background(canvas.width, canvas.height, 'honeydew');
// const brick = new Brick(200, 200);

ball.x = canvas.width / 2;
ball.y = canvas.height - 30;
ball.dx = 1.5 + Math.random();
ball.dy = -1.5 + Math.random();
const brickRowCount = 3;
const brickColumnCount = 5;
paddle.x = (canvas.width - 75) / 2;
let rightPressed = false;
let leftPressed = false;
let score = 0;
let lives = 3;
const colors = ['b5179e', '560bad', '480ca8', '3f37c9', '4895ef', '4cc9f0'];
let keepPlaying = true;
const livesDisplay = new Text(canvas.width - 65, 20, '#0095DD', '16px Arial', `Lives: ${lives}`);
const scoreDisplay = new Text(8, 20, '#0095DD', '16px Arial', `Score: ${lives}`);
const textDisplay = new Text(canvas.width / 2, canvas.height / 2, '#0095DD', '16px Arial');

const keyDownHandler = (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
};

const keyUpHandler = (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
};

const mouseMoveHandler = (e) => {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddle.width / 2;
  }
};

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);
button.onclick = () => {
  keepPlaying = true;
  document.location.reload();
};

const collisionDetection = () => {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks.bricks[c][r];
      if (b.status === 1) {
        if (ball.x > b.x && ball.x < b.x + b.width && ball.y > b.y) {
          if (ball.y < b.y + b.height) {
            ball.dy = -ball.dy;
            b.status = 0;
            score += 1;
            if (score === brickRowCount * brickColumnCount) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              textDisplay.render(ctx, 'You win, congratulations!');
              keepPlaying = false;
              // document.location.reload();
            }
          }
        }
      }
    }
  }
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.render(ctx);
  ball.render(ctx);
  paddle.render(ctx);
  scoreDisplay.render(ctx, `Score: ${score}`);
  livesDisplay.render(ctx, `Lives: ${lives}`);
  collisionDetection();
  bricks.render(ctx);
  // drawBricks(6, 4, 10, 30, 25);

  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.dy = -ball.dy;
    } else {
      lives -= 1;
      if (!lives) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        textDisplay.render(ctx, 'Game Over');
        keepPlaying = false;
        // document.location.reload();
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 2;
        ball.dy = -2;
        paddle.x = (canvas.width - paddle.width) / 2;
      }
    }
  }

  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }

  if (rightPressed) {
    paddle.x += 7;
    if (paddle.x + paddle.width > canvas.width) {
      paddle.x = canvas.width - paddle.width;
    }
  } else if (leftPressed) {
    paddle.x -= 7;
    if (paddle.x < 0) {
      paddle.x = 0;
    }
  }
  if (keepPlaying) {
    requestAnimationFrame(draw);
  }
};

draw();

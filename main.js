import Brick from './Brick.js';
import Ball from './Ball.js';

const canvas = document.getElementById('myCanvas');
const button = document.getElementById('restart-btn');
const ctx = canvas.getContext('2d');
const ball = new Ball(200, 200, 10);
// const brick = new Brick(200, 200);

ball.x = canvas.width / 2;
let y = canvas.height - 30;
ball.dx = 1.5 + Math.random();
ball.dy = -1.5 + Math.random();
const paddleHeight = 10;
const paddleWidth = 75;
const brickRowCount = 4;
const brickColumnCount = 6;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let score = 0;
let lives = 3;
const colors = ['b5179e', '560bad', '480ca8', '3f37c9', '4895ef', '4cc9f0'];
let keepPlaying = true;

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

const displayMessage = (message) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(message, canvas.width / 2, canvas.height / 2);
};

const drawPaddle = () => {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#b5179e';
  ctx.fill();
  ctx.closePath();
};

const drawLives = () => {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
};

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
    paddleX = relativeX - paddleWidth / 2;
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
      const b = bricks[c][r];
      if (b.status === 1) {
        if (ball.x > b.x && ball.x < b.x + b.width && ball.y > b.y) {
          if (ball.y < b.y + b.height) {
            ball.dy = -ball.dy;
            b.status = 0;
            score += 1;
            if (score === brickRowCount * brickColumnCount) {
              displayMessage('You win, congratulations!');
              keepPlaying = false;
              // document.location.reload();
            }
          }
        }
      }
    }
  }
};

const drawScore = () => {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Score: ${score}`, 8, 20);
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.render(ctx);
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  drawBricks(6, 4, 10, 30, 25);

  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.y + ball.dy < ball.radius) {
    ball.y += ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
      ball.y += ball.dy;
    } else {
      lives -= 1;
      if (!lives) {
        displayMessage('Game Over');
        keepPlaying = false;
        // document.location.reload();
      } else {
        ball.x = canvas.width / 2;
        y = canvas.height - 30;
        ball.dx = 2;
        ball.dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }

  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
  if (keepPlaying) {
    requestAnimationFrame(draw);
  }
};

draw();

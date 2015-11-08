var context = document.getElementById('canvas').getContext('2d');

var x = 100;
var y = 100;

var grid = [];
var tileCount = 0;
var gameCount = 0;
var gameStart = false;
var snakeDirection = null;

function startGame(e) {


  // clear any existing games, just in case
  stopGame();

  // make sure the grid is cleared to start ovver
  resetCanvas();

  // start in a default upward direction
  setDirection(38);
  // every 100 milliseconds, try to grow the snake
  timer = setInterval(checkSnake, 100, e);
}

function stopGame() {
  if (timer) {
    clearInterval(timer);
  }
}

function setDirection(direction) {
  snakeDirection = direction;
}

function growSnake(direction) {
  switch (snakeDirection) {
    case 38:
      (y = y - 10);
      break;

    case 40:
      (y = y + 10);
      break;

    case 39:
      (x = x + 10);
      break;

    case 37:
      (x = x - 10);
      break;
  }
  var red, green, blue = randomColor();

  // add a new empty square in the direction outlined above
  context.fillRect(x, y, 10, 10);
}

function randomColor() {
  //random color generation
  var colors = [];

  //loop describing 3 random number generations which are then pushes to empty array
  for (var g = 0; g < 3; g++) {
    colors.push(Math.floor(Math.random() * 255));
  }

  //calling dot to the assign random numbers as rgb colors in css format
  context.fillStyle = "rgb(" + colors[0] + "," + colors[1] + "," + colors[2] + ")";

}

function resetCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  x = 100;
  y = 100;

  //mapping the canvas grid to track collision detection and labelling all
  // usable coordinates in the grid as false
  for (i = 0; i < 200; ++i) {
    grid[i] = [];
    for (j = 0; j < 200; ++j) {
      grid[i][j] = false;
    }
  }

}

function checkCollision(grid) {
  // if statement within movement function to check grid coordinate is new and
  //  then labelling  contacted coordinates as true
  if (grid[x][y] === false) {
    grid[x][y] = true;
    console.log("painting:", x, y);
    return true;

  } else {
    return false;
  }
}

function checkSnake() {
  console.log("tick");
  snakeOK = checkCollision(grid);

  if (snakeOK) {
    growSnake(snakeDirection);
  } else {
    console.log("GAME OVER!");
    stopGame();
  }
}

//timer variable to allow continuous movement
var timer;

// set the direction the snake should grow in
document.onkeydown = function(e) {
  setDirection(e.keyCode);
};

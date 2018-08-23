const CANVAS_BORDER_COLOR = 'black'
const CANVAS_BACKGROUND_COLOR = 'white'

var gameCanvas = document.getElementById('GameCanvas')
var ctx = gameCanvas.getContext('2d')
ctx.fillStyle = CANVAS_BACKGROUND_COLOR
ctx.strokeStyle = CANVAS_BORDER_COLOR
ctx.fillRect(0, 0, gameCanvas.Width, gameCanvas.height)
ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height)

document.addEventListener('keydown', changeDirection)

var snake = [
  { x: 300, y: 300 },
  { x: 280, y: 300 },
  { x: 260, y: 300 },
  { x: 240, y: 300 },
  { x: 220, y: 300 },
];

var dx = 20
var dy = 0
var foodX
var foodY
var score = 0

createFood()
main()

function main() {
  if (didGameEnd()) return
  setTimeout( function() {
    clearCanvas()
    drawFood()
    advanceSnake()
    drawSnake()

    main()
  }, 100)
}

function drawSnakePart(snakePart) {
  ctx.fillStyle = 'lightgreen'
  ctx.strokeStyle = 'darkgreen'

  ctx.fillRect(snakePart.x, snakePart.y, 20, 20)
  ctx.strokeRect(snakePart.x, snakePart.y, 20, 20)
}

function drawSnake() {
  snake.forEach(drawSnakePart)
}

function changeDirection(event) {
  const LEFT_KEY = 37
  const RIGHT_KEY = 39
  const UP_KEY = 38
  const DOWN_KEY = 40

  var keyPressed = event.keyCode

  var goingUp = dy === -20
  var goingDown = dy === 20
  var goingLeft = dx === -20
  var goingRight = dx === 20

  if(keyPressed === LEFT_KEY && !goingRight) {
    dx = -20
    dy = 0
  }

  if(keyPressed === UP_KEY && !goingDown) {
    dx = 0
    dy = -20
  }

  if(keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 20
    dy = 0
  }

  if(keyPressed === DOWN_KEY && !goingUp) {
    dx = 0
    dy = 20
  }
}

function advanceSnake() {
  var head = {x: snake[0].x + dx, y: snake[0].y + dy}
  snake.unshift(head)

  var didEatFood = snake[0].x == foodX && snake[0].y == foodY
  if(didEatFood) {
    score += 10
    document.getElementById('score').innerHTML = "Score: " + score
    createFood()
  } else {
    snake.pop()
  }
}

function didGameEnd() {
  for(var i = 4; i < snake.length; i++) {
    var didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y
    if(didCollide) return true
  }

  var hitLeftWall = snake[0].x < 0
  var hitRightWall = snake[0].x > gameCanvas.width - 20
  var hitTopWall = snake[0].y < 0
  var hitBottonWall = snake[0].y > gameCanvas.height - 20

  return hitLeftWall || hitRightWall || hitTopWall || hitBottonWall
}

function clearCanvas() {
  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'black'

  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height)
  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height)
}

function randomTen(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 20) * 20
}

function createFood() {
  foodX = randomTen(0, gameCanvas.width - 20)
  foodY = randomTen(0, gameCanvas.height - 20)

  snake.forEach(function(part) {
    var foodIsOnSnake = part.x == foodX && part.y == foodY
    if(foodIsOnSnake) {
      createFood()
    }
  })
}

function drawFood() {
  ctx.fillStyle = 'red'
  ctx.strokeStyle = 'darkred'

  ctx.fillRect(foodX, foodY, 20, 20)
  ctx.strokeRect(foodX, foodY, 20, 20)
}
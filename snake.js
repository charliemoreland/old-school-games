const board_border = 'white';
const board_background = 'black';
const snake_col = 'lightgreen';
const snake_border = 'white';

let snake = [
  {x: 500, y: 370},
  {x: 480, y: 370},
  {x: 460, y: 370},
  {x: 440, y: 370},
  {x: 420, y: 370}
]
let changing_direction = false;

let score = 0;

let dx = 20;
let dy = 0;
let food_x;
let food_y;

let quit = false;

document.addEventListener("keydown", change_direction);
var snakeboard;
var snakeboard_ctx;

function reset()
{
  let head_x = 500;
  score = 0;
  dx = 20;
  dy = 0;
  let i = snake.length - 1;
  for(; i > 4; i--)
    snake.pop();

  for(;i >= 0; i--)
  {
    snake[i].x = head_x - (i*10);
    snake[i].y = 370;
  }

  changing_direction = false;
  quit = false;

  document.getElementById("start").style.visibility = "visible";
  document.getElementById("stop").style.visibility = "hidden";
  document.getElementById("reset").style.visibility = "hidden";
  document.getElementById('score').innerHTML = score;
  document.getElementById("snakeboard").style.visibility = "visible";
  document.getElementById("GameOver").style.visibility = "hidden";

  clear_board();
}

function gameLoop()
{
  if(has_game_ended() || quit){
    document.getElementById("snakeboard").style.visibility = "hidden";
    document.getElementById("GameOver").style.visibility = "visible";
    document.getElementById("stop").style.visibility = "hidden";
    document.getElementById("reset").style.visibility = "visible";
    return;
  }

  changing_direction = false;
  setTimeout(function onTick() {
    clear_board();
    drawFood();
    move_snake();
    drawSnake();
    gameLoop();
  }, 100)
}

function stop()
{
  document.getElementById("start").style.visibility = "hidden";
  document.getElementById("stop").style.visibility = "hidden";
  document.getElementById("reset").style.visibility = "visible";
  quit = true;
  return;
}

function main() 
{ 
  document.getElementById("start").style.visibility = "hidden";
  document.getElementById("stop").style.visibility = "visible";
  document.getElementById("reset").style.visibility = "hidden";
  snakeboard = document.getElementById('snakeboard');
  snakeboard_ctx = snakeboard.getContext('2d');
  gen_food();
  gameLoop();
}

function has_game_ended()
{
  for(let i = 1; i < snake.length; i++)
  {
      if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        return true;
  }

  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > snakeboard.width - 20;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > snakeboard.height - 20;
  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function change_direction(key)
{
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  if(changing_direction)
      return;

  changing_direction = true;

  const keyPressed = key.keyCode;
  const goingUp = dy === -20;
  const goingDown = dy === 20;
  const goingRight = dx === 20;  
  const goingLeft = dx === -20;

  if (keyPressed === LEFT_KEY && !goingRight)
  {    
        dx = -20;
        dy = 0;  
  }

  if (keyPressed === UP_KEY && !goingDown)
  {    
        dx = 0;
        dy = -20;
  }

  if (keyPressed === RIGHT_KEY && !goingLeft)
  {    
        dx = 20;
        dy = 0;
  }

  if (keyPressed === DOWN_KEY && !goingUp)
  {    
        dx = 0;
        dy = 20;
  }
}

function clear_board() 
{
  snakeboard_ctx.fillStyle = board_background;
  snakeboard_ctx.strokestyle = board_border;
  snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

function drawSnake() 
{
  snake.forEach(drawSnakePart)
}

function drawSnakePart(snakePart) 
{
  snakeboard_ctx.fillStyle = snake_col;
  snakeboard_ctx.strokestyle = snake_border;
  snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
  snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
}

function move_snake() 
{
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);
  const has_eaten_food = head.x === food_x && head.y === food_y;
  if(has_eaten_food)
  {
      score +=10;
      document.getElementById('score').innerHTML = score;
      gen_food();
  }

  else
      snake.pop();
}

function drawFood()
{
  snakeboard_ctx.fillStyle = '#ff0000';
  snakeboard_ctx.strokestyle = '#450101';
  snakeboard_ctx.fillRect(food_x, food_y, 20, 20);
  snakeboard_ctx.strokeRect(food_x, food_y, 20, 20);         
}

function random_food(min, max) 
{
  return Math.round((Math.random() * (max - min) + min) / 20) * 20;
}

function gen_food() 
{
  food_x = random_food(0, snakeboard.width - 20);
  food_y = random_food(0, snakeboard.height - 30) + 10;
  snake.forEach(function has_snake_eaten_food(part) 
  {
      const has_eaten = part.x == food_x && part.y == food_y;
      if (has_eaten) 
        gen_food();
  });
}
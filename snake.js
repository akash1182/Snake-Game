function init(){
  canvas = document.getElementById('mycanvas');
  W = H = canvas.width = canvas.height = 750;
  pen = canvas.getContext('2d');
  cs = 30;
  food = getRandomFood();
  gameOver = false;
  bites = false;
  //create Image object for foodX
  food_img = new Image();
  food_img.src = "apple_1.png";

  trophy_img = new Image();
  trophy_img.src = "trophy.png";
  score = 0;

  snake = {
    init_len:5,
    color:'blue',
    direction:"right",
    cells:[],

    createSnake : function(){
      for(var i=this.init_len;i>0;i--){
        this.cells.push({x:i,y:0});
      }
    },

    drawSnake : function(){
      for(var i=0;i<this.cells.length;i++){
        pen.fillStyle = this.color;
        pen.fillRect(this.cells[i].x*cs, this.cells[i].y*cs, cs-2, cs-2);
      }
    },

    updateSnake : function(){
      //check if snake has eaten food and if yes update size of snake & generate new food
      var headX = this.cells[0].x;
      var headY = this.cells[0].y;

      if(headX == food.x && headY==food.y){
        console.log("food eaten");
        food = getRandomFood();
        score++;
      }
      else{
        this.cells.pop(); //pop only when food is not eaten, this will increase the size og snake when food is eaten
      }
      console.log("updating snake...according to direction");

      if(this.direction=="right"){
        var nextX=headX+1;
        var nextY=headY;
      }
      else if(this.direction=="left"){
        var nextX=headX-1;
        var nextY=headY;
      }
      else if(this.direction=="down"){
        var nextX=headX;
        var nextY=headY+1;
      }
      else if(this.direction=="up"){
        var nextX=headX;
        var nextY=headY-1;
      }
      this.cells.unshift({x:nextX,y:nextY});

      var last_x = Math.round(W/cs);
      var last_y = Math.round(H/cs);

      if(this.cells[0].x > last_x || this.cells[0].x < 0 || this.cells[0].y > last_y || this.cells[0].y < 0){
        gameOver = true;
      }

      for(var i=1;i<snake.cells.length;i++)
      {
        if(snake.cells[0].x == snake.cells[i].x && snake.cells[0].y == snake.cells[i].y){
          bites = true;
          break;
        }
      }

    }

  };

  snake.createSnake();
  //add event listener om document object
  function keyPressed(e){
    if(e.key == "ArrowRight" && snake.direction != "left" ){
      snake.direction="right";
    }
    else if(e.key == "ArrowLeft" && snake.direction != "right"){
      snake.direction="left";
    }
    else if(e.key == "ArrowDown" && snake.direction != "up"){
      snake.direction="down";
    }
    else if(e.key == "ArrowUp" && snake.direction != "down"){
      snake.direction="up";
    }
    console.log(snake.direction);
  }
  document.addEventListener('keydown',keyPressed);
}

function draw(){
  pen.clearRect(0,0,W,H);
  snake.drawSnake();
  pen.fillStyle = food.color;
  pen.drawImage(food_img, food.x*cs, food.y*cs , cs, cs);

  pen.fillStyle = "red";
  pen.font = "20px Roboto";
  pen.fillText(score,W-25,40);

  pen.drawImage(trophy_img, W-80, 0, 2*cs, 2*cs);
}

function update(){
  snake.updateSnake();
}

function getRandomFood(){
  foodX = Math.round(Math.random()*(W-cs)/cs);
  foodY = Math.round(Math.random()*(H-cs)/cs);

  var food = {
    x:foodX,
    y:foodY,
    color:"red",
  }
  return food;
}


function gameloop(){
  if(gameOver == true || bites == true){
    clearInterval(f);
    alert("Game Over");
    return;
  }
  draw();
  update();


}

init();
var f = setInterval(gameloop,100);

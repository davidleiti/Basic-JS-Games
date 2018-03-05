/*TO-DO: ADD MORE PADDLE CONTROL DEPENDING ON THE POINT OF COLLISION RELATIVE TO THE CENTER*/ 

var playing = false;

const PADDLE_WIDTH = 180;
const PADDLE_HEIGHT = 15;

var brickWidth;
var brickHeight = 30;
var verticalPadding;
var horizontalPadding;
var columnCount = 8;
var rowCount = 6;

var paddleX;
var paddleY;

const BALL_RADIUS = 15;
var ballX;
var ballY;
var ballSpeedX = 7;
var ballSpeedY = -6;

var bricks = [];

window.onload = function(){

    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");

    paddleX = canvas.width / 2 - PADDLE_WIDTH / 2;
    paddleY = canvas.height - PADDLE_HEIGHT;  

    ballX = paddleX + PADDLE_WIDTH / 2;
    ballY = paddleY - BALL_RADIUS;

    brickWidth = canvas.width / (columnCount + 1);
    brickHeight = 2/3 * canvas.height / (rowCount + 1) ;

    horizontalPadding = brickWidth / columnCount;
    verticalPadding = brickHeight / (rowCount + 1);

    for (let i = 0 ;i < rowCount; i++)
        for (let j = 0; j < columnCount; j++)
            bricks.push({x: (j+1) * horizontalPadding + j * brickWidth,
                            y: (i+1) * verticalPadding + i * brickHeight,
                            status: 1});

    setInterval(function(){
        controlMovement();
        draw();}
        ,1000/30);

    canvas.addEventListener("mousemove", function(event){
            var mousePos = getMousePosition(event);
            paddleX = mousePos.x - PADDLE_WIDTH/2;
        }
    );

    canvas.addEventListener("click",function(event){
        playing = true;
    });
}

function controlMovement(){
    if (playing){
        moveBall();
    }
    else{
        ballX = paddleX + PADDLE_WIDTH / 2;
    }
}

function moveBall(){
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    checkCollision();
}

function checkCollision(){
	var paddleCenterX = paddleX - PADDLE_WIDTH / 2;
    if (ballX >= canvas.width || ballX <= 0)
        ballSpeedX = -ballSpeedX;
    if (ballY <= 0)
        ballSpeedY = -ballSpeedY;
    if (ballY >= canvas.height){
        reset();
    }
    if (ballY + BALL_RADIUS >= paddleY && ballX > paddleX && ballX < paddleX + PADDLE_WIDTH){
        ballSpeedY = -ballSpeedY;
    }   
    checkBrickCollision();
}

function checkBrickCollision(){
    if (bricks.find(function(e){return e.status == 1}) == undefined) 
        reset();
    bricks.forEach(function(b){
        if (b.status == 0)
            return;
        var bottomHit = ballY - BALL_RADIUS < b.y + brickHeight && ballY - BALL_RADIUS > b.y && ballX > b.x && ballX < b.x + brickWidth;
        var topHit =  ballY + BALL_RADIUS < b.y + brickHeight && ballY + BALL_RADIUS > b.y && ballX > b.x && ballX < b.x + brickWidth;
        var leftHit = ballY < b.y + brickHeight && ballY > b.y && ballX + BALL_RADIUS > b.x && ballX + BALL_RADIUS < b.x + brickWidth;
        var rightHit = ballY < b.y + brickHeight && ballY > b.y && ballX - BALL_RADIUS > b.x && ballX - BALL_RADIUS < b.x + brickWidth;
        if (bottomHit || topHit){
            ballSpeedY = -ballSpeedY;
            b.status = 0;
        }
        if (leftHit || rightHit){
            ballSpeedX = -ballSpeedX;
            b.status = 0;
        }
    })
}

function getMousePosition(event){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = event.clientX - rect.left - root.scrollLeft;
    var mouseY = event.clientY - rect.right - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

function reset(){
    ballY = paddleY - BALL_RADIUS;
    ballSpeedY = -ballSpeedY;
    playing = false;
}
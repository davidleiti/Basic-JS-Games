var canvas;
var canvasContext;

var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 5;

var showingWinScreen = false;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 5;

var playerY = 250;
var player2Y = 250;
const PADDLE_HEIGHT = 130;
const PADDLE_WIDTH = 10;
const PLAYER2_SPEED = 8;

window.onload = function(){
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	
	var frames = 30;
	setInterval(function() { 
		if (!showingWinScreen){	
			allMovement();
			drawEverything();
		}
		else
			showWinScreen();
		},1000/frames);
	
	canvas.addEventListener("mousemove", function(event){ 
		var mousePos = getMousePosition(event); 
		playerY = mousePos.y - PADDLE_HEIGHT / 2;
	});
	
	canvas.addEventListener("click", function() { showingWinScreen = false; player1Score = player2Score = 0;});
}

function showWinScreen(){
	canvasContext.fillStyle = "white";
	canvasContext.font.replace(/\d+px/,"10px");
	if (player1Score == WINNING_SCORE)
		canvasContext.fillText("Right player won the game!",300,200);
	else
		canvasContext.fillText("Right player won the game!",300,200);
	canvasContext.fillText("Click to play again...",325,400);
}

function player2Movement(){
	var player2Center = player2Y + PADDLE_HEIGHT / 2;
	if (player2Center - 35 > ballY)
		player2Y -= PLAYER2_SPEED;
	else if (player2Center + 35 < ballY)
		player2Y += PLAYER2_SPEED;
}

function ballReset(){
	if (player1Score == WINNING_SCORE || player2Score == WINNING_SCORE)
		showingWinScreen = true;
	ballSpeedX = - ballSpeedX;
	ballSpeedY = - ballSpeedY;
	ballX = canvas.width / 2;
	ballY = canvas.height / 2;
}

function getMousePosition(event){
	var rect = canvas.getBoundingClientRect(); 
	var root = document.documentElement; 
	var mouseX = event.clientX - rect.left - root.scrollLeft; 
	var mouseY = event.clientY - rect.top - root.scrollTop; 
	return {
		x: mouseX,
		y: mouseY
	} ;
}	

function moveBall(){
	ballX += ballSpeedX;
	ballY += ballSpeedY;
	checkCollision();
}

function allMovement(){

	moveBall();
	player2Movement();

}

function checkCollision(){
	var playerCenterY = playerY - PADDLE_HEIGHT / 2;
	var player2CenterY = player2Y - PADDLE_HEIGHT / 2;
	if (ballX <= 0)
		if (playerY + PADDLE_HEIGHT >= ballY && playerY <= ballY){
			ballSpeedX = -ballSpeedX;
			ballSpeedY =  (ballY-playerCenterY) % 10;
		}
		else {
			player2Score++;
			ballReset();
		}
	if (ballX >= canvas.width)
		if (player2Y + PADDLE_HEIGHT >= ballY && player2Y <= ballY){
			ballSpeedX = -ballSpeedX;
			ballSpeedY =  (ballY-playerCenterY) % 10;
		}
		else {
			console.log("what");
			player1Score++;
			ballReset();
		}
	if (ballY <= 0 || ballY >= canvas.height)
		ballSpeedY = - ballSpeedY;
		
}
function drawEverything(){
    
        //Blank black background
        drawRectangle(0,0,canvas.width,canvas.height,"black");
        
        //Middle line
        for (i = 0;i<canvas.height;i+=40)
            drawRectangle(canvas.width/2-1,i,2,30,"white");
        
        //Ball
        drawBall(ballX,ballY,10,"white");
        
        //Player
        drawRectangle(0,playerY,PADDLE_WIDTH,PADDLE_HEIGHT,"white");
            
        //Player two
        drawRectangle(canvas.width - PADDLE_WIDTH,player2Y,PADDLE_WIDTH,PADDLE_HEIGHT,"white");	
            
        //Show scores
        canvasContext.font = canvasContext.font.replace(/\d+px/, "16px");
        canvasContext.fillText("score: " + player1Score,100,100);
        canvasContext.fillText("score: " + player2Score,canvas.width-150,100);
    }

function drawBall(x,y,radius,color){
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(x,y, radius, 0, Math.PI * 2, true);
	canvasContext.fill();
}

function drawRectangle(x,y,width,height,color){
	canvasContext.fillStyle = color;
	canvasContext.fillRect(x,y,width,height);
}


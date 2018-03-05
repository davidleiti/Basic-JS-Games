function drawRectangle(x, y, width, height, color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x,y,width,height);   
}

function drawCircle(x, y, radius, color){
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(x, y, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function draw(){
    //background
    drawRectangle(0, 0, canvas.width, canvas.height, "black");

    drawBricks();
    
    //player paddle
    drawRectangle(paddleX, paddleY, PADDLE_WIDTH, PADDLE_HEIGHT, "white");
    
    //ball
    drawCircle(ballX, ballY, BALL_RADIUS, "white"    
    );
}

function drawBricks(){
    bricks.forEach(function(e){
        if (e.status)
            drawRectangle(e.x, e.y, brickWidth, brickHeight, "white");
        });
    drawRectangle(canvas.width-horizontalPadding,0,horizontalPadding,canvas.height,"black");
}
function draw(){
    context.fillStyle = "white";
    context.fillRect(0,0,canvas.width,canvas.height);
    drawGrid();
    drawNumbers();
    drawScore();
    drawGameStatus();
}

function drawGameStatus(){
    context.fillStyle = "black"
    if (isWinningTile())
        context.fillText("YOU WON!", canvas.width*3/5, canvas.height/10);
    else if (isGameOver())
        context.fillText("GAME OVER!", canvas.width*3/5, canvas.height/10);
}

function drawScore(){
    context.fillStyle = "black";
    context.font = "30px Arial";
    context.fillText("Score:" + score, 55 + 5 * score.toString().length, canvas.height / 10);
}

function drawGrid(){
    let size = canvas.width / 5 - 10;
    context.fillStyle = "black";
    for (let i = 1; i < 6; i++)
        context.fillRect(0,i*size, size * 4 + 5, 5);
    for (let i = 0; i < 5; i++)
        context.fillRect(i*size, size ,5 , size * 4 + 5);

}

function drawNumbers(){
    let size = canvas.width / 5 - 10;
    context.fillStyle = "black"
    context.textAlign = "center";
    context.font = "46px Arial";
    for (let i = 0; i < 4; i++){
        for (let j = 0; j < 4; j++){
            if (grid[i][j] != 0)
                context.fillText(grid[i][j], j*size + size / 2, (i + 1) * size + size*2/3);
        }
    }
}
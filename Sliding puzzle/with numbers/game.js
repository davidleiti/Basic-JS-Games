var canvas;
var context;
var tiles = [4,1,2,3,5,9,6,7,8,10,0,11,12,13,14,15];
var finalConfig = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var gameOver = false;
var noOfMoves = 0;

window.onload = function(){
    canvas = document.getElementById("gameCanvas");
    context = canvas.getContext("2d");
    draw();
    document.onkeydown = (event) => {if (!gameOver) keyHandler(event)};
}

function keyHandler(event){
    const keyPressed = event.keyCode;
    emptyPosition = tiles.indexOf(0);
    switch (keyPressed){
        case 40:
            if (emptyPosition / 4 < 3)
                tiles[emptyPosition] = [tiles[emptyPosition + 4], tiles[emptyPosition + 4] = tiles[emptyPosition]][0];
            break;
        case 38: 
            if (Math.floor(emptyPosition / 4) > 0)
                tiles[emptyPosition] = [tiles[emptyPosition - 4], tiles[emptyPosition - 4] = tiles[emptyPosition]][0];
            break;
        case 37:
            if (emptyPosition % 4 > 0)
                tiles[emptyPosition - 1] = [tiles[emptyPosition], tiles[emptyPosition] = tiles[emptyPosition - 1]][0];
            break;
        case 39:    
            if (emptyPosition % 4 < 3)
                tiles[emptyPosition + 1] = [tiles[emptyPosition], tiles[emptyPosition] = tiles[emptyPosition + 1]][0];
            break;
    }
    noOfMoves += 1;
    equals = tiles.every((v, i) => v === finalConfig[i])
    if (equals)
        gameOver = true;
    draw();    
}

function draw(){
    context.fillStyle = "white";
    context.fillRect(0,0,canvas.width,canvas.height);
    drawGrid();
    drawNumbers();
    drawMoves();
}

function drawGrid(){
    size = canvas.width / 4;
    context.fillStyle = "black";
    for (i = 0; i < 5; i++){
        context.fillRect(0, i * size - 2, canvas.width, 2);
        context.fillRect(i * size - 2, 0, 2, canvas.width);
    }
    context.fillRect(0,0,canvas.width, 2);
    context.fillRect(0,0,2, canvas.width);
}

function drawNumbers(){
    context.fillStyle = "black"
    context.textAlign = "center";
    context.font = "100px Arial";
    size = canvas.width / 4;
    for (i = 0; i < 4; i++)
        for (j = 0; j < 4; j++){
            if (tiles[i * 4 + j] != 0)
                context.fillText(tiles[i*4+j], j * size + size / 2 - 5, i * size + size / 2 + 30);
        }
}

function drawMoves(){
    context.fillStyle = "black";
    context.textAlign = "left";
    context.font = "32px Arial";
    context.fillText("Moves: " + noOfMoves, 5, canvas.height - 5);
    if (gameOver)
        context.fillText("Congratulations, you won!", 230, canvas.height - 6)
}
var canvas;
var context;
var img;
var ogWidth;
var ogHeight;
var tileWidth;
var tileHeight;
var tiles = [4,1,2,3,5,9,6,7,8,10,0,11,12,13,14,15];
var finalConfig = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var isGameOver = false;
var noOfMoves = 0;

window.onload = function(){
    canvas = document.getElementById("gameCanvas");
    context = canvas.getContext("2d");

    img = document.getElementById("img");
    ogWidth = img.width / 4;
    ogHeight = img.height / 4;
    tileWidth = canvas.width / 4;
    tileHeight = (canvas.height - 40) / 4;

    draw();
    document.addEventListener("click", () => {
        if (!isGameOver) 
            mouseClickHandler(event);
        }
    );
}

function mouseClickHandler(event){
    let x = event.clientX;
    let y = event.clientY;
    if (x < 600 && y < 600){
        let clickedPosition = Math.floor(y / tileHeight) * 4 + Math.floor(x / tileWidth);
        let emptyPosition = tiles.indexOf(0);
        //Replace empty tile with left neighbour
        if (clickedPosition + 1 == emptyPosition && emptyPosition % 4 != 0)
            tiles[clickedPosition] = [tiles[emptyPosition], tiles[emptyPosition] = tiles[clickedPosition]][0];
        
        //Replace empty tile with right neighbour
        else if (clickedPosition - 1 == emptyPosition && emptyPosition % 4 != 3)
            tiles[clickedPosition] = [tiles[emptyPosition], tiles[emptyPosition] = tiles[clickedPosition]][0];

        //Replace empty tile with lower neighbour
        else if (clickedPosition + 4 == emptyPosition)
            tiles[emptyPosition] = [tiles[clickedPosition], tiles[clickedPosition] = tiles[emptyPosition]][0];

        //Replace empty tile with upper neighbour
        else if (clickedPosition - 4 == emptyPosition)
            tiles[emptyPosition] = [tiles[clickedPosition], tiles[clickedPosition] = tiles[emptyPosition]][0];
        else 
            return
    noOfMoves += 1;
    equals = tiles.every((v, i) => v === finalConfig[i])
    if (equals)
        isGameOver = true;
    draw();
    }
}

function draw(){
    context.fillStyle = "white";
    context.fillRect(0,0,canvas.width,canvas.height);
    drawImagePieces();
    drawGrid();
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

function drawImagePieces(){
    let indx = 0;
    let pos;
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++){
            pos = tiles[indx];
            if (pos != 0)
                context.drawImage(
                    img,
                    pos % 4 * ogWidth, Math.floor(pos / 4) * ogHeight, ogWidth, ogHeight,
                    j * tileWidth, i * tileHeight, tileWidth, tileHeight
                );
            indx++;
        }
}

function drawMoves(){
    context.fillStyle = "black";
    context.textAlign = "left";
    context.font = "32px Arial";
    context.fillText("Moves: " + noOfMoves, 5, canvas.height - 5);
    if (isGameOver)
        context.fillText("Congratulations, you won!", 230, canvas.height - 6)
}
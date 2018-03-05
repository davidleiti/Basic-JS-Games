var canvas;
var context;
var grid = [];
var score = 0;

window.onload = function(){
    canvas =  document.getElementById("gameCanvas");
    context = canvas.getContext("2d");
    for (let i = 0; i < 4; i++){
        grid[i] = [];
        for (let j = 0; j < 4; j++)
            grid[i][j] = 0;
    }
    newNumber();
    newNumber();
    draw();
    document.onkeydown = (event) => {
        if (!isGameOver() && !isWinningTile())
            keyHandler(event)};
}

function slide(row){
    let arr = row.filter(e => e);
    let zeros = Array(4-arr.length).fill(0);
    row = zeros.concat(arr);
    for (let i = 3; i > 0; i--){
        if (row[i] == row[i-1]){
            row[i] = 2 * row[i];
            score += row[i];
            row[i-1] = 0;
        }
        if (row[i] == 0){
            row[i] = [row[i-1],row[i-1] = row[i]][0];
        }
    }
    return row;
}

function keyHandler(event){
    const keyPressed = event.keyCode;
    if (keyPressed == 39){
        for (i = 0; i < 4; i++)
            grid[i] = slide(grid[i]);
            newNumber();    
    }
    if (keyPressed == 37 ){
        flipGrid();
        for (let i = 0; i < 4; i++)
            grid[i] = slide(grid[i]);
        flipGrid();
        newNumber();
    }
    if (keyPressed == 40){
        grid = rotateGridLeft();
        for (let i = 0; i < 4; i++)
            grid[i] = slide(grid[i]);
        grid = rotateGridRight();
        newNumber();
    }
    if (keyPressed == 38){
        grid = rotateGridRight();
        for (let i = 0; i < 4; i++)
            grid[i] = slide(grid[i]);
        grid = rotateGridLeft();
        newNumber();
    }
    draw();
}

function isGameOver(){
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++){
            if (grid[i][j] == 0) return false;
            if ((i != 3 && grid[i][j] == grid[i+1][j]) || (j != 3 && grid[i][j] == grid[i][j+1]))
                return false;
        }
    return true;
}

function isWinningTile(){
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++)
            if (grid[i][j] == 2048)
                return true;
    return false;
}
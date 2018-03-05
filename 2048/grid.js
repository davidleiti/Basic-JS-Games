function flipGrid(){
    for (let i = 0; i < 4; i++){
        grid[i].reverse();
    }
}

function rotateGridLeft(){
    newGrid = [];
    for (i = 0; i < 4; i++){
        newGrid[i] = [];
        for (j = 0; j < 4; j++)
            newGrid[i][j] = grid[j][3-i];
    }
    return newGrid;
}

function rotateGridRight(){
    newGrid = [];
    for (i = 0; i < 4; i++){
        newGrid[i] = [];
        for (j = 0; j < 4; j++)
            newGrid[i][j] = grid[3-j][i];
    }
    return newGrid;
}

function newNumber(){
    let available = [];
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++)
            if (grid[i][j] == 0)
                available.push({
                    x: i,
                    y: j
                });
    if (available.length > 0){
    let choice = available[Math.floor(Math.random()*available.length)];
    grid[choice.x][choice.y] = (Math.random() > 0.5) ? 2 : 4;
    }
}




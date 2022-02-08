let totalSectionsp1 = 17;
let totalSectionsp2 = 17;
let gameWon = false;
let player2Wins = false;
let player1Wins = false;

while (gameWon) {
    if(totalSectionsp1 = 0) {
        player2Wins = true;
        return gameWon = true;
        //game won screen displays player 2 winner
    }
    if(totalSectionsp2 = 0) {
        player1Wins = true;
        return gameWon = true;
        //game won screen displays player 1 winner
    }
    else{
        return;
    }
}

const playerOneTurn = turn => {
    if(!gameWon) {
        
    }
}





while (totalSectionsp2 > 0 && totalSectionsp1 > 0) {

}






if (totalSectionsp1 < totalSectionsp2) {
console.log('player 2 wins');
} else {
console.log('player 1 wins');
}




function placeCharacter(x, y, c, grid) {
grid[y][x] = c;
}

function placeRandomCharacter(c, grid, max) {
    let didPlace = false;
    while (!didPlace) {
    let x = getRandomInt(max);
    let y = getRandomInt(max);
    if (!enemyLocations[`${x}-${y}`]) {
        placeCharacter(x, y, c, grid);
        didPlace = true;
        enemyLocations[`${x}-${y}`] = true;
    }
    }
}


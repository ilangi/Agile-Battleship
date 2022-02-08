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
  let x = prompt('Enter the x coordinate for your attack');
  let y = prompt('Enter the y coordinate for your attack');
}






if (totalSectionsp1 < totalSectionsp2) {
  console.log('player 2 wins');
} else {
  console.log('player 1 wins');
}




function placeCharacter(x, y, c, grid) {
  grid[y][x] = c;
}


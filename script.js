document.addEventListener('DOMContentLoaded', () => {
  const userGrid = document.querySelector('.grid-user');
  const computerGrid = document.querySelector('.grid-computer');
  
  const userSquares = []
  const computerSquares = []
  const width = 10

  const displayGrid = document.querySelector('.grid-display');
  const ships = document.querySelectorAll('.ship');


  let isHorizontal = true;
  let allShipsPlaced = false;
  let CheckWin = false;

  const rotateButton = document.getElementById('rotateButton');
  const startButton = document.getElementById('startButton');

  const ship1 = document.querySelector('.battleship1');
  const ship2 = document.querySelector('.battleship2');
  const ship3 = document.querySelector('.battleship3');
  const ship4 = document.querySelector('.battleship4');
  const ship5 = document.querySelector('.battleship5');



  /*----------------------------------------------- */
  /*Generate the ocrean map and call it when launches */

  createBoard(userGrid, userSquares)
  createBoard(computerGrid, computerSquares)


  function createBoard(grid, squares) {
    for (let i = 0; i < width*width; i++) {
      const square = document.createElement('div')
      square.dataset.id = i
      grid.appendChild(square)
      squares.push(square)
    }
  }

  /*----------------------------------------------- */
  //draggable ships//

  ships.forEach(ship => ship.addEventListener('dragstart', dragStart))
  userSquares.forEach(square => square.addEventListener('dragstart', dragStart))
  userSquares.forEach(square => square.addEventListener('dragover', dragOver))
  userSquares.forEach(square => square.addEventListener('dragenter', dragEnter))
  userSquares.forEach(square => square.addEventListener('dragleave', dragLeave))
  userSquares.forEach(square => square.addEventListener('drop', dragDrop))
  userSquares.forEach(square => square.addEventListener('dragend', dragEnd))

  let selectedShipNameWithIndex
  let draggedShip
  let draggedShipLength

  ships.forEach(ship => ship.addEventListener('mousedown', (e) => {
    selectedShipNameWithIndex = e.target.id
  }))

  function dragStart() {
    draggedShip = this
    draggedShipLength = this.childNodes.length
  }

  function dragOver(e) {
    e.preventDefault()
  }

  function dragEnter(e) {
    e.preventDefault()
  }

  function dragLeave() {
  }

/*---------------------------------------------------------------------*/
//releases the ship on the player map, it will drops the ship inside the grid 
//ships only can be place on player map not on the computer map
//check if all player ships are used 
function dragDrop() {
  let shipNameWithLastId = draggedShip.lastChild.id
  let shipClass = shipNameWithLastId.slice(0, -2)
  let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
  let shipLastId = lastShipIndex + parseInt(this.dataset.id)


  const notAllowedHorizontal = []
  const notAllowedVertical = []
  
  let newNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * lastShipIndex)
  let newNotAllowedVertical = notAllowedVertical.splice(0, 10 * lastShipIndex)

  selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))

  shipLastId = shipLastId - selectedShipIndex


  if (isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {
    for (let i=0; i < draggedShipLength; i++) {
      let directionClass
      if (i === 0) directionClass = 'start'
      if (i === draggedShipLength - 1) directionClass = 'end'
      userSquares[parseInt(this.dataset.id) - selectedShipIndex + i].classList.add('taken', 'horizontal', directionClass, shipClass)
    }
  } else if (!isHorizontal && !newNotAllowedVertical.includes(shipLastId)) {
    for (let i=0; i < draggedShipLength; i++) {
      let directionClass
      if (i === 0) directionClass = 'start'
      if (i === draggedShipLength - 1) directionClass = 'end'
      userSquares[parseInt(this.dataset.id) - selectedShipIndex + width*i].classList.add('taken', 'vertical', directionClass, shipClass)
    }
  } else return

  displayGrid.removeChild(draggedShip)
  if(!displayGrid.querySelector('.ship')) allShipsPlaced = true
}

function dragEnd() {
}

/*------------------------------------------------------------------------------------------*/
//Rotate player ships  ( when rotate button is clicked)

rotateButton.addEventListener('click', rotate);

function rotate(){
  console.log("testing");

  if(isHorizontal){
    //document.getElementById("battleship1-0").style.backgroundColor = "lightblue";
    ship1.classList.toggle('battleship1-vertical');
    ship2.classList.toggle('battleship2-vertical');
    ship3.classList.toggle('battleship3-vertical');
    ship4.classList.toggle('battleship4-vertical');
    ship5.classList.toggle('battleship5-vertical');
    
    //ship1.style.backgroundColor = "white";
    isHorizontal = false;
    console.log("testing vertical")
    return
  }
  if(!isHorizontal){
    ship1.classList.toggle('battleship1-vertical');
    ship2.classList.toggle('battleship2-vertical');
    ship3.classList.toggle('battleship3-vertical');
    ship4.classList.toggle('battleship4-vertical');
    ship5.classList.toggle('battleship5-vertical');
    isHorizontal = true;
    return
  }
  console.log("testing 2")
}





/*------------------------------------------------------------------------------------------- */
//Randomly place 5 ships on computer ocrean map ( when start button is clicked)

  startButton.addEventListener('click', ()=>{
    if(allShipsPlaced) startGame()
    else alert("Please make sure all ships are placed before starting the game")
  });


const shipArray = [
  {
    name: 'ship1',
    directions: [
      [0, 1],
      [0, width]
    ]
  
  },
  {
    name: 'ship2',
    directions: [
      [0, 1, 2],
      [0, width, width*2]
    ]
  
  },

  {
    name: 'ship3',
    directions: [
      [0, 1, 2],
      [0, width, width*2]
    ]
  
  },
  {
    name: 'ship4',
    directions: [
      [0, 1, 2, 3],
      [0, width, width*2, width*3,width*4]
    ]
  
  },

  {
    name: 'ship5',
    directions: [
      [0, 1, 2, 3, 4],
      [0, width, width*2, width*3,width*4,width*5]
    ],
  }

]


function startGame() {
  console.log('start game testing')

  generate(shipArray[0])
  generate(shipArray[1])
  generate(shipArray[2])
  generate(shipArray[3])
  generate(shipArray[4])
  startButton.disabled = true;
}


function generate(ship) {
  let randomDirection = Math.floor(Math.random() * ship.directions.length)
  let current = ship.directions[randomDirection]
  if (randomDirection === 0) direction = 1
  if (randomDirection === 1) direction = 10
  let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * direction)))

  const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains('takenC'))
  const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1)
  const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)

  if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(index => computerSquares[randomStart + index].classList.add('takenC', ship.name))

  else generate(ship)
}


/*---------------------------------------------------------------------------------------------*/
//Attacking system (Take turn between player and computer)











/*---------------------------------------------------------------------------*/
//Win condition
})

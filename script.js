document.addEventListener('DOMContentLoaded', () => {
  const userGrid = document.querySelector('.grid-user');
  const computerGrid = document.querySelector('.grid-computer');
  
  const userSquares = []
  const computerSquares = []
  const width = 10

  const displayGrid = document.querySelector('.grid-display');
  const ships = document.querySelectorAll('.ship');


  let isHorizontal = true

  const rotateButton = document.getElementById('rotateButton');

  //const battleship1 = document.getElementById('battleship1');
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

rotateButton.addEventListener('click', rotate);




/*------------------------------------------------------------------------------------------- */
//Randomly place 5 ships on computer ocrean map ( when start button is clicked)
 






/*---------------------------------------------------------------------------------------------*/


})

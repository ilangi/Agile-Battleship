document.addEventListener('DOMContentLoaded', () => {
  const userGrid = document.querySelector('.grid-user')
  const computerGrid = document.querySelector('.grid-computer')

  const userSquares = []
  const computerSquares = []

  const width = 10


  function createBoard(grid, squares) {
    for (let i = 0; i < width*width; i++) {
      const square = document.createElement('div')
      square.dataset.id = i
      grid.appendChild(square)
      squares.push(square)
    }
  }
  createBoard(userGrid, userSquares)
  createBoard(computerGrid, computerSquares)

})



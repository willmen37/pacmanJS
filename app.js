document.addEventListener('DOMContentLoaded', () => {

    const scoreDisplay = document.getElementById('score')
    const width = 28
    let score = 0
    const grid = document.querySelector('.grid')
    const layout = [
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,0,1,
      1,0,0,0,0,0,0,1,1,0,1,1,1,2,2,1,1,1,0,1,1,0,0,0,0,0,0,1,
      1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1,
      4,4,4,4,4,4,0,0,0,0,1,2,2,2,2,2,2,1,0,0,0,0,4,4,4,4,4,4,
      1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
      1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
      1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
      1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
      1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
      1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]
    // 0 - pac-dots
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pellet
    // 4 - empty
  
    const squares = []
  
    //draw the grid and render it
    function createBoard() {
      for (let i = 0; i < layout.length; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)
  
        //add layout to the board
        if(layout[i] === 0) {
          squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
          squares[i].classList.add('wall')
        } else if (layout[i] === 2) {
          squares[i].classList.add('ghost-lair')
        } else if (layout[i] === 3) {
          squares[i].classList.add('power-pellet')
        }
      }
    }
    createBoard()
     
    //starting position for pac-man

    let pacmanCurrentIndex = 490

    squares[pacmanCurrentIndex].classList.add("pac-man")

    //move pac-man

    function movePacman(e){
        squares[pacmanCurrentIndex].classList.remove("pac-man")

        switch(e.keyCode) {
            case 37:
                if(pacmanCurrentIndex % width !==0 && !squares[pacmanCurrentIndex -1].classList.contains("wall")
                && !squares[pacmanCurrentIndex -1].classList.contains("ghost-lair")) pacmanCurrentIndex -=1
                
                //check if pacman is in the left exit
                if((pacmanCurrentIndex -1) === 363){
                  pacmanCurrentIndex = 391
                }
                break
            case 38:
                if(pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex -width].classList.contains("wall")
                && !squares[pacmanCurrentIndex -1].classList.contains("ghost-lair")) pacmanCurrentIndex -=width
                break
            case 39:
                if(pacmanCurrentIndex % width < width -1 && !squares[pacmanCurrentIndex +1].classList.contains("wall")
                && !squares[pacmanCurrentIndex +1].classList.contains("ghost-lair")) pacmanCurrentIndex +=1
                
                //check if pacman is in the right exit
               
                if((pacmanCurrentIndex +1) === 392){
                  pacmanCurrentIndex = 364
                }
                break

                 case 40:
                if(pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex +width].classList.contains("wall")
                && !squares[pacmanCurrentIndex +width].classList.contains("ghost-lair")) pacmanCurrentIndex +=width
                break
        }
        squares[pacmanCurrentIndex].classList.add("pac-man")
        pacDotEaten()
        powerPelletEaten()
        checkForGameOver()
        checkForWin()

    }
    document.addEventListener("keyup", movePacman)

    //What happens when Pac-man eats a pac-dot
    function pacDotEaten(){
      if(squares[pacmanCurrentIndex].classList.contains("pac-dot")){
        score++
        scoreDisplay.innerHTML = score
        squares[pacmanCurrentIndex].classList.remove("pac-dot")
      }
    }

    //what happens when you eat a pellet
      function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
      score +=10
      ghosts.forEach(ghost => ghost.isScared = true)
      setTimeout(unScareGhosts, 10000)
      squares[pacmanCurrentIndex].classList.remove('power-pellet')
    }
  }

    //make the ghost stop appearing as aquamarine
    function unScareGhosts(){
      ghosts.forEach(ghost => ghost.isScared = false)
    }

    //Create our Ghost Template
    class Ghost {
      constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.timeId = NaN
        this.isScared= false
      }
    }

    ghosts = [
      new Ghost("blinky", 348, 250),
      new Ghost("pinky", 376, 400),
      new Ghost("inky", 351, 300),
      new Ghost("clyde", 379, 500)

    ]

    //draw my ghoosts onto the grid
    ghosts.forEach(ghost => {
      squares[ghost.currentIndex].classList.add(ghost.className)
      squares[ghost.currentIndex].classList.add("ghost")
    })

    //move the ghost randomly
    ghosts.forEach(ghost => moveGhost(ghost))

    //write the function to move the ghosts
    function moveGhost(ghost) {
      const directions = [-1, +1, width, -width]
      let direction = directions[Math.floor(Math.random() * directions.length)]

      ghost.timerId = setInterval(function(){
        // if the next square your ghost is going to to go in DOES NOT contain a wall or a ghost you can go there
        if (!squares[ghost.currentIndex + direction].classList.contains("wall")&& !squares[ghost.currentIndex+
        direction].classList.contains("ghost")){
          // you can go here
          //remove all ghost related classes
          squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
          //change the cuurentIndex to the new safe square
          ghost.currentIndex += direction
          //redraw the ghost in the new safe space
          squares[ghost.currentIndex].classList.add(ghost.className, "ghost")

          //else find a new directio  to try
        }else direction = directions[Math.floor(Math.random() * directions.length)]

        // if the ghost is currently scared
        if(ghost.isScared) {
          squares[ghost.currentIndex].classList.add("scared-ghost")
        }

        //if ghost is scared and pacman runs into it
        if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
          squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
          ghost.currentIndex = ghost.startIndex
          score +=100
          squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }

        checkForGameOver()
      }, ghost.speed)
    }

    //check for game over

    function checkForGameOver() {
      if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', movePacman)
        scoreDisplay.innerHTML = 'Game Over'
      }
    }

    //check for a win

    function checkForWin() {
      if (score === 274) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', movePacman)
        setTimeout(function(){ alert("You have WON!"); }, 500)
      }
    }

})
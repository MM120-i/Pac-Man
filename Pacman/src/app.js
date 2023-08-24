document.addEventListener("DOMContentLoaded", () => {

  const scoreDisplay = document.getElementById("score");
  const width = 28;
  let score = 0;
  const grid = document.querySelector(".grid");
  const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
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
  ];
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

  const squares = [];

  //create your board
  function createBoard() {

    for (let i = 0; i < layout.length; i++) {

      const square = document.createElement("div");
      grid.appendChild(square);
      squares.push(square);

      //add layout to the board
      if(layout[i] === 0) {

        squares[i].classList.add("pac-dot");
      } else if (layout[i] === 1) {

        squares[i].classList.add("wall");
      } else if (layout[i] === 2) {

        squares[i].classList.add("ghost-lair");
      } else if (layout[i] === 3) {

        squares[i].classList.add("power-pellet");
      }
      else if(layout[i] === 4){
        square.classList.add("empty");
      }
    }
  }
  createBoard();


  //create Characters
  //draw pacman onto the board
  let pacmanCurrentIndex = 490;
  squares[pacmanCurrentIndex].classList.add("pac-man");

  //move pacman
  function movePacman(e) {

    const direction = {
        37: { dx: -1, check: (i) => i % width !== 0 },
        38: { dx: -width, check: (i) => i - width >= 0 },
        39: { dx: 1, check: (i) => i % width < width - 1 },
        40: { dx: width, check: (i) => i + width < width * width },
    };

    const move = direction[e.keyCode];

    if (!move) return;

    const newPosition = pacmanCurrentIndex + move.dx;

    if (move.check(pacmanCurrentIndex) && !squares[newPosition].classList.contains("wall") &&
        !squares[newPosition].classList.contains("ghost-lair")) {

        squares[pacmanCurrentIndex].classList.remove("pac-man");

        pacmanCurrentIndex = newPosition;

        if (newPosition === 363) {

            pacmanCurrentIndex = 391;
        } else if (newPosition === 392) {

            pacmanCurrentIndex = 364;
        }

        squares[pacmanCurrentIndex].classList.add("pac-man");
        pacDotEaten();
        powerPelletEaten();
        checkForGameOver();
        checkForWin();
    }
}

  document.addEventListener("keyup", movePacman);

  // what happens when you eat a pac-dot
  function pacDotEaten() {

    const currentSquare = squares[pacmanCurrentIndex];

    if (currentSquare.classList.contains("pac-dot")) {

        score++;
        scoreDisplay.textContent = score;
        currentSquare.classList.remove("pac-dot");
    }
}


  //what happens when you eat a power-pellet
function powerPelletEaten() {

    const currentSquare = squares[pacmanCurrentIndex];

    if (currentSquare.classList.contains("power-pellet")) {

        score += 10;
        updateScoreDisplay();
        scareGhosts();
        setTimeout(unscareGhosts, 10000);
        currentSquare.classList.remove("power-pellet");
    }
}

function updateScoreDisplay() {

    scoreDisplay.textContent = score;
}

function scareGhosts() {

    ghosts.forEach(ghost => ghost.isScared = true);
}

function unscareGhosts() {
  
    ghosts.forEach(ghost => ghost.isScared = false);
}

  //create ghosts using Constructors
  class Ghost {
    constructor(className, startIndex, speed) {
      this.className = className;
      this.startIndex = startIndex;
      this.speed = speed;
      this.currentIndex = startIndex;
      this.isScared = false;
      this.timerId = NaN;
    };
  };

  //all my ghosts
  ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
    ];

  //draw my ghosts onto the grid
  ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add("ghost");
    });

  //move the Ghosts randomly
  for (const ghost of ghosts) {
    
    moveGhost(ghost);
  }


  function moveGhost(ghost) {

    ghost.timerId = setInterval(function() {

        const directions = [-1, +1, width, -width];
        let direction = directions[Math.floor(Math.random() * directions.length)];

        while (

            squares[ghost.currentIndex + direction].classList.contains("ghost") ||
            squares[ghost.currentIndex + direction].classList.contains("wall")
        ) {

            direction = directions[Math.floor(Math.random() * directions.length)];
        }

        squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
        ghost.currentIndex += direction;
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");

        if (ghost.isScared) {

            squares[ghost.currentIndex].classList.add("scared-ghost");
        }

        if (ghost.isScared && squares[ghost.currentIndex].classList.contains("pac-man")) {

            squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
            ghost.currentIndex = ghost.startIndex;
            score += 100;
            squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
        }

        checkForGameOver();
    }, ghost.speed);
}

  //check for a game over
  function checkForGameOver() {

    if (squares[pacmanCurrentIndex].classList.contains("ghost") &&
        !squares[pacmanCurrentIndex].classList.contains("scared-ghost")) {

        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener("keyup", movePacman);

        setTimeout(() => {
            alert("Game Over");
        }, 500);
    }
}


  //check for a win - more is when this score is reached
  function checkForWin() {

    if (score === 274) {

        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener("keyup", movePacman);

        setTimeout(() => {
            alert("You have WON!");
        }, 500);
    }
  }

})
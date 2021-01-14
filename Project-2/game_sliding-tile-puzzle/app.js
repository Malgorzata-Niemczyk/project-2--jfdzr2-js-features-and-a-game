const puzzlePieces = document.querySelectorAll('.pieces');
const puzzleBoard = document.querySelector('#puzzle-container');
const newGameBtn = document.querySelector('#launch');
const movesDisplay = document.querySelector('.moves p span');
const timerDisplay = document.querySelector('.time p span');
const winPopup = document.querySelector('.win-modal');

const gameState = [
    [puzzlePieces[0], puzzlePieces[1], puzzlePieces[2]],
    [puzzlePieces[3], puzzlePieces[4], puzzlePieces[5]],
    [puzzlePieces[6], puzzlePieces[7], puzzlePieces[8]],
];

let movesCounter = 0;

// setting variable for the timer
let sec = 0;
let min = 0;
let hour = 0;
let timerState = false;

/***********************************/
//TO RENDER THE PUZZLE BOARD
/***********************************/
function loadPuzzleChange(puzzleBoard, gameState) {
    gameState.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            column.style.top = `${rowIndex * 200}px`; // positioning pieces vertically by multiplying the row number/index with a height of the puzzle piece
            column.style.left = `${columnIndex * 200}px`; // positioning pieces horizontally by multiplying the column number/index with a width of the puzzle piece

            puzzleBoard.appendChild(column);
        })
    })
};

loadPuzzleChange(puzzleBoard, gameState);

/***********************************/
//DEFINING THE POSITION OF A CLICKED ELEMENT AND SETTING WHICH MOVES ARE ALLOWED
/***********************************/
function movePuzzlePiece(piece1, piece2) {
    const tempTopPosition = piece1.style.top;
    const tempLeftPosition = piece1.style.left;

    piece1.style.top = piece2.style.top;
    piece1.style.left = piece2.style.left;

    piece2.style.top = tempTopPosition;
    piece2.style.left = tempLeftPosition;
};

puzzleBoard.addEventListener('click', (event) => {
// searching for the clicked element - getting its position, that is, its row and column index
    function getPiecePosition() {
        let x;
        let y; // variables that define the position of a puzzle piece on a vertical and horizontal position; X - is a row number, Y - is a column number

        gameState.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                if (column === event.target) {
                    x = rowIndex;
                    y = columnIndex;
                }
            });
        });

        let emptyX;
        let emptyY;

        gameState.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                if (column.innerText === '') {
                    emptyX = rowIndex;
                    emptyY = columnIndex;
                }
            })
        });

        // checking whether the clicked element has an empty element in the same column and in an above or below row (e.g. when clickec on 6), or in the same row and in a next or previous column (when clicked on 8)
        if (
            ((y === emptyY) && (x + 1 === emptyX || x - 1 === emptyX)) || 
            ((x === emptyX) && (y + 1 === emptyY || y - 1 === emptyY))
        ) {
            movePuzzlePiece(gameState[x][y], gameState[emptyX][emptyY]);

             // switching the empty element with a clicked element
            const tempPosition = gameState[x][y]; // assigning the clicked element to the tempPosition 
            gameState[x][y] = gameState[emptyX][emptyY];
            gameState[emptyX][emptyY] = tempPosition;

            // console.log('This move is allowed');
        } else {
            // console.log('This move is not allowed');
            movesCounter--;
        };

        // console.log(gameState);
    };
    
    getPiecePosition();

    movesCounter++;
    movesDisplay.textContent = movesCounter;
})


/***********************************/
// ADDING TIMER FUNCTIONALITY
/***********************************/
function startTimer() {
    if (timerState === false) {
        timerState = setInterval(formatTimer, 1000);
    }      
};

function formatTimer() { 
    sec++
    
    if (sec === 59) {
        sec = 0;
        min++;
    };

    if (min === 59) {
        min = 0;
        hour++;
    };

    timerDisplay.textContent = (hour < 10 ? `0${hour}` : hour) + ":" + (min < 10 ? `0${min}` : min) + ":" + (sec < 10 ? `0${sec}` : sec); // add zeros if less than 10 and add the timer numbers to the HTML
};


function resetTimer() {
    clearInterval(timerState);
    timerState = false;
    sec = 0;
    min = 0;
    hour = 0;
    
    timerDisplay.textContent = (hour < 10 ? `0${hour}` : hour) + ":" + (min < 10 ? `0${min}` : min) + ":" + (sec < 10 ? `0${sec}` : sec);
}

/***********************************/
//SHUFFLING THE PUZZLE PIECES
/***********************************/
// to calculate a random index for the array
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function shufflePuzzlePieces(arr)  {
    // looping over the gameState array
  for (let i = 0; i < arr.length; i++) {

    for (let j = 0; j < arr[i].length; j++) {
        // console.log(i, arr[i].length, arr[i][j])

        let randomRowIndex = getRandomInt(0, 2);
        let randomColumnIndex = getRandomInt(0, 2);
       
        let temp;
        let currentTile = arr[i][j];
        let randomTile = arr[randomRowIndex][randomColumnIndex];
    
        // swapping puzzle pieces
        temp = currentTile;
        arr[i][j] = randomTile;
        arr[randomRowIndex][randomColumnIndex] = temp; 
    }
  } 
  return arr;
};

newGameBtn.addEventListener('click', () => {
    // console.log('new order', shufflePuzzlePieces(gameState));
    if (timerState !== false) {
        movesCounter = 0;

        resetTimer()
        // reset the board with the number of moves
        movesDisplay.textContent = '0';

        startTimer();
        const newGameState = shufflePuzzlePieces(gameState);
        
        // to reset the state of the game
        loadPuzzleChange(puzzleBoard, newGameState);
        
    } else {
        startTimer();
        const newGameState = shufflePuzzlePieces(gameState);
        
        // to reset the state of the game
        loadPuzzleChange(puzzleBoard, newGameState);
        
        winPopup.style.visibility = 'hidden';
        newGameBtn.textContent = 'Restart Game'
        movesDisplay.textContent = '0';
    }
});

/***********************************/
//SHOW THE CONGRATS POPUP UPON SOLVING THE PUZZLE
/***********************************/
function isSolved(gameState) {
    return (
        gameState[0][0] === 0 &&
        gameState[0][1] === 1 &&
        gameState[0][2] === 2 &&
        gameState[1][0] === 3 &&
        gameState[1][1] === 4 &&
        gameState[1][2] === 5 &&
        gameState[2][0] === 6 &&
        gameState[2][1] === 7 &&
        gameState[2][2] === 8
    )
};

function checkWin() {
    if (isSolved(gameState) === true) {
        winPopup.style.visibility = 'visible';
        winPopup.innerHTML = `
        <p>Congratulations, you solved it with time ${timerDisplay} and ${movesCounter} moves!</p>
        <p><i class="fas fa-medal"></i></p> -->
        `
        newGameBtn.textContent = 'Start Game';
        movesCounter = 0;
        resetTimer();
        // to reset the state of the game
        loadPuzzleChange(puzzleBoard, gameState);
    }
};

checkWin()
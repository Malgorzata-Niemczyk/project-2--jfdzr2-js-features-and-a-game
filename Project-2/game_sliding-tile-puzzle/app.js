const puzzlePieces = document.querySelectorAll('.pieces');
const puzzleBoard = document.querySelector('#puzzle-container');

const gameState = [
    [puzzlePieces[0], puzzlePieces[1], puzzlePieces[2]],
    [puzzlePieces[3], puzzlePieces[4], puzzlePieces[5]],
    [puzzlePieces[6], puzzlePieces[7], puzzlePieces[8]],
];


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

            console.log('This move is allowed');
        } else {
            console.log('This move is not allowed');
        };

        console.log(gameState);
    };
    
    getPiecePosition();
})
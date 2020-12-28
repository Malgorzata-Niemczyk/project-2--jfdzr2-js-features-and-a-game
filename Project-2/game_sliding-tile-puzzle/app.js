const puzzlePieces = document.querySelectorAll('.pieces');
const puzzleBoard = document.querySelector('#puzzle-container');

const gameState = [
    [puzzlePieces[0], puzzlePieces[1], puzzlePieces[2]],
    [puzzlePieces[3], puzzlePieces[4], puzzlePieces[5]],
    [puzzlePieces[6], puzzlePieces[7], puzzlePieces[8]],
];


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
        
        // switching the empty element with a clicked element
        const tempPosition = gameState[x][y]; // assigning to the tempPosition the clicked element
        gameState[x][y] = gameState[emptyX][emptyY];
        gameState[emptyX][emptyY] = tempPosition;

        console.log(gameState);
    };

    getPiecePosition()
})
const puzzlePieces = document.querySelectorAll('.pieces');
const puzzleBoard = document.querySelector('#puzzle-container');

const gameState = [
    [puzzlePieces[0], puzzlePieces[1], puzzlePieces[2]],
    [puzzlePieces[3], puzzlePieces[4], puzzlePieces[5]],
    [puzzlePieces[6], puzzlePieces[7], puzzlePieces[8]],
];


puzzleBoard.addEventListener('click', (event) => {
    console.log(event.target)
})
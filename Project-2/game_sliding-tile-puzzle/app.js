// defining drag and drop event handlers
const dragstart_handler = ev => {
    console.log("dragstart")
    ev.dataTransfer.setData("text/plain", ev.target.id)
    ev.dataTransfer.dropEffect = "move";
    ev.target.style.opacity = 0.5;
};

const dragover_handler = ev => {
    console.log("dragOver");
    ev.preventDefault();
};

// getting the data stored in the dataTransfer object and then we ‘transferring’ it to the element in which we it is dropped onto
const drop_handler = ev => {
    console.log("drag")
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData("text/plain");
    ev.target.innerText = document.getElementById(data).innerText;

    document.getElementById(data).innerText = "";
};

// clearing the data stored in the dataTransfer when the drag event ends
const dragend_handler = ev => {
  console.log("dragEnd");
  // Remove all of the drag data
  ev.dataTransfer.clearData();
  ev.target.style.opacity = "";
};

// selecting all the elements inside the div with an id of puzzle-container
let tiles = document.querySelectorAll('#puzzle-container > div');
// console.log(tilesContainer)


const numbers = [1, 2, 3, 4, 5, 6, 7, 8, ''];

// setting up the initial state of the game
function setUpTheGame() {
    fillGrid(tiles, numbers);
    setID(tiles);
    setDroppable(tiles);
    setDraggable(tiles);
}

// creating an object that hold the state of the game
const gameState = {};
gameState.content = numbers;

// setting up the draggable and droppable content
function setDroppable(items) {
    items.forEach((item, i) => {
        if(!item.innerText) {
            item.setAttribute('ondrop', 'drop_handler(event);');
            item.setAttribute('ondragover', 'dragover_handler(event);');
            item.setAttribute('class', 'empty');
        }
        return;
    }) 
};

function setDraggable(items) {
    items.forEach(item => {
            item.setAttribute('draggable', 'true');
            item.setAttribute('ondragstart', 'dragstart_handler(event)');
            item.setAttribute('ondragend', 'dragend_handler(event');
        })
};

// setting a unique id for each div tag that is within the element with a class of puzzle-container
const setID = (items) => {
    for (i = 0; i < items.length; i++) {
        items[i].setAttribute('id', `div${i}`);
    }
}; 

const fillGrid = (items, numbers) => {
    let shuffled = shuffleTiles(numbers);

    items.forEach((item, i) => {
        item.innerText = shuffled[i];
    })
};

fillGrid(tiles, numbers);


// shuffing the 'numbers' array 
function shuffleTiles(arr) {
    const copiedNumbers = [...arr];

    // looping over 'numbers' array
    for (let i = 0; i < copiedNumbers.length; i++) {

        //picking a random index j for each index i
        let j = parseInt(Math.random() * copiedNumbers.length);

        //swapping elements at i and j
        let temp = copiedNumbers[i];
        copiedNumbers[i] = copiedNumbers[j];
        copiedNumbers[j] = temp;
    }
    return copiedNumbers
};



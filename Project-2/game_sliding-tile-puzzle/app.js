// defining drag and drop event handlers
const dragstart_handler = ev => {
    console.log("dragstart")
    ev.dataTransfer.setData("text/plain", ev.target.id)
    ev.dataTransfer.dropEffect = "move";
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
};

//selecting all the elements inside the div with an id of puzzle-container
let tiles = document.querySelectorAll('#puzzle-container > div');
// console.log(tilesContainer)

const numbers = [11, 12, 13, 21, 22, 23, 31, 32, ''];

//setting a unique id for each div tag that is within the element with a class of puzzle-container
const setID = (items) => {
    for (i = 0; i < items.length; i++) {
        items[i].setAttribute('id', `div${i}`)
    }
}; 

const fillGrid = (items, numbers) => {
    let shuffled = shuffleTiles(numbers);

    items.forEach((item, i) => {
        item.innerText = shuffled[i];
    })
};

fillGrid(tiles, numbers);


//shuffing the 'numbers' array 
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



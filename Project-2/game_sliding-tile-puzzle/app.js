// defining drag and drop event handlers
const dragstart_handler = ev => {
    console.log("dragstart")
    ev.dataTransfer.setData("text/plain", ev.target.id)
    ev.dataTransfer.dropEffect = "move";
}

const dragover_handler = ev => {
    console.log("dragOver");
    ev.preventDefault();
}

// getting the data stored in the dataTransfer object and then we ‘transferring’ it to the element in which we it is dropped onto
const drop_handler = ev => {
    console.log("drag")
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData("text/plain");
    ev.target.innerText = document.getElementById(data).innerText;

    document.getElementById(data).innerText = "";
}

// clearing the data stored in the dataTransfer when the drag event ends
const dragend_handler = ev => {
  console.log("dragEnd");
  // Remove all of the drag data
  ev.dataTransfer.clearData();
}

//select all the elements inside the div with an id of puzzle-container
let tilesContainer = document.querySelectorAll('#puzzle-container > div');

const tilesPosition = [11, 12, 13, 21, 22, 23, 31, 32, ''];
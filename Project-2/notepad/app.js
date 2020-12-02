const addBtn = document.querySelector('.add');
const deleteAllBtn = document.querySelector('.delete-all');
const deleteNoteBtn = document.getElementsByClassName('delete-note');
const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');

const noteArea = document.querySelector('.note-area');
const notePanel = document.querySelector('.note-panel');
const categorySelection = document.querySelector('#category');
const textArea = document.querySelector('#text'); 
const errorMessage = document.querySelector('.error');

let $selectedValue;
let $cardID = 0;

//function for opening the note panel element when clicking the add button
function openPanel() {
    notePanel.style.display = 'flex';
};

/*function for closing the note panel element when clicking the cancel button within this element; the function will also clear the inserted content in the text area element and clear the chosen category when we try to open the panel again*/
function closePanel() {
    notePanel.style.display = 'none';
    categorySelection.selectedIndex = 0;
    textArea.value = '';
    errorMessage.style.visibility = 'hidden';
};

//event listeners
addBtn.addEventListener('click', openPanel);
cancelBtn.addEventListener('click', closePanel)
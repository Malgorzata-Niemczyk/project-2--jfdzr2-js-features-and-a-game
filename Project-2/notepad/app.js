const addBtn = document.querySelector('.add');
const deleteAllBtn = document.querySelector('.delete-all');
const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');

const noteArea = document.querySelector('.note-area');
const notePanel = document.querySelector('.note-panel');
const categorySelection = document.querySelector('#category');
const textArea = document.querySelector('#text'); 
const errorMessage = document.querySelector('.error');

let selectedValue;
let cardID = 0;

//getting data from localStorage
const savedNotes = JSON.parse(localStorage.getItem(`${selectedValue} ${cardID}`));
// console.log(savedNotes);

// checking if the data in localStorage exists and if so add each data to the DOM
if(savedNotes) {
    savedNotes.forEach(note => addNote(note));
};

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

/*function fo addding a new note, it add a new not on condition that the textArea.value is not equal to an empty string and the the option value of the categorySelection element is not equal to zero*/
function addNote() {
    const optionValue = categorySelection.options[categorySelection.selectedIndex].value

    if (textArea.value !== '' && optionValue !== '0') {
        createNote();
        errorMessage.style.visibility = 'hidden';
    } else {
        errorMessage.style.visibility = 'visible';
    }
};

/*function for creating a new note and appending it to the div tag with a class of note; upon adding a new note when clicking the save button the function also clears the value of the textArea, sets display of the notePanel to none and set the selectedIndex of the categorySelection element to zero*/
const createNote = () => {
    cardID++;
    const noteWrapper = document.createElement('div');
    noteWrapper.classList.add('note');
    noteWrapper.setAttribute('id', cardID);
    noteArea.appendChild(noteWrapper);
    
    noteWrapper.innerHTML = `
        <div class="note-header">
            <h3 class="note-title">${selectedValue}</h3>
            <button class="delete-note" onclick="deleteNote(${cardID})">
                <i class="far fa-times-circle"></i>
            </button>
        </div>
        <div class="note-body">
            <p>${addNoteText()}</p>
        </div>
    `
    updateLocalStorage();

    // clearing the modal after pressing the save button
    textArea.value = '';
    categorySelection.selectedIndex = 0;
    notePanel.style.display = 'none';

    checkColor(noteWrapper); /* triggering the  CheckColor function that checks what value is stored in the selectedValue variable when creating a new note */
};

function addNoteText() {
    textArea.addEventListener('input', (event) => {
        // console.log(event.target.value);

        let notesText = document.querySelector('.note-body > p');
        notesText.textContent = event.target.value;
        // console.log(notesText);
    })
};

function updateLocalStorage() {
    let notesText = document.querySelectorAll('.note-body > p');
    notesText.textContent = textArea.value;

    const notesArr = [];

    notesText.forEach(note => notesArr.push(note.textContent));
    // console.log(notesArr)

    localStorage.setItem(`${selectedValue} ${cardID}`, JSON.stringify(notesArr));
};

// function updateLocalStorage() {
//     let notesText = document.querySelectorAll('.note-body > p');

//     notesText.textContent = textArea.value;
//     console.log(notesText);

//     const notesArr = [];

//     notesText.forEach(note => notesArr.push(notesText.textContent));
//     console.log(notesArr)

//     localStorage.setItem(`${selectedValue} ${cardID}`, JSON.stringify(notesArr));
// };

//function for assinging the value to the global variable selectedValue
const selectValue = () => {
    selectedValue = categorySelection.options[categorySelection.selectedIndex].text;
};

/*function that checks what text has been chosen within the selectedValue element and dependent on the value of the selectedvalue variable it changes the color of a new note added to the noteArea*/
const checkColor = (note) => {
    switch (selectedValue) {
        case 'Shopping':
            note.style.backgroundColor = 'orange';
            break;
        case 'Work':
            note.style.backgroundColor = 'rgb(35, 215, 228)';
            break;
        case 'Friends':
            note.style.backgroundColor = 'tomato';
            break;
        case 'Other':
            note.style.backgroundColor = 'rgb(80, 230, 50)';
            break;
    };
};

/* deleting a single note by firstly grabbing an element with an id and then deleting it from a parent element, that is, the noteArea */
function deleteNote(id) {
    const noteToBeDeleted = document.getElementById(id);
    noteArea.removeChild(noteToBeDeleted);

    // deleting an item from localStorage
    localStorage.removeItem(`${selectedValue} ${cardID}`);
};

//deleting all the notes from the div with a class of note-area
function deleteAllNotes() {
    noteArea.textContent = '';

    //clearing the whole localStorage
    localStorage.clear(`${selectedValue} ${cardID}`);
};

//event listeners
addBtn.addEventListener('click', openPanel);
cancelBtn.addEventListener('click', closePanel);
saveBtn.addEventListener('click', addNote);
categorySelection.addEventListener('change', selectValue);
deleteAllBtn.addEventListener('click', deleteAllNotes);
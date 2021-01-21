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

let noteItemsArr = [];
//retrieving data from localStorage
noteItemsArr = noteItemsArr.concat(JSON.parse(localStorage.getItem('myNotes') || '[]'));
// console.log(noteItemsArr);

if (noteItemsArr) {
    noteItemsArr.forEach(note => renderNotes(note));
};

function renderNotes(note) {
    cardID++;
    const noteWrapper = document.createElement("div");
    noteWrapper.classList.add("note");
    noteWrapper.setAttribute("id", cardID);
    noteWrapper.innerHTML = `
        <div class="note-header">
            <h3 class="note-title">${note.category}</h3>
            <button class="delete-note" onclick="deleteNote(${cardID})">
                <i class="far fa-times-circle"></i>
            </button>
        </div>
        <div class="note-body">
            <p>${note.content}</p>
        </div>
    `;
        
    checkColor(noteWrapper, note.category);
        
    noteArea.appendChild(noteWrapper);
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
function createNote() {
    let noteItem = {
        id: cardID,
        category: `${selectedValue}`,
        content: textArea.value
    };

    cardID++;
    const noteWrapper = document.createElement('div');
    noteWrapper.classList.add('note');
    noteWrapper.setAttribute('id', cardID);
    
    noteWrapper.innerHTML = `
        <div class="note-header">
            <h3 class="note-title">${noteItem.category}</h3>
            <button class="delete-note" onclick="deleteNote(${cardID})">
                <i class="far fa-times-circle"></i>
            </button>
        </div>
        <div class="note-body">
            <p>${noteItem.content}</p>
        </div>
    `
    
    noteArea.appendChild(noteWrapper);
    checkColor(noteWrapper, noteItem.category); /* triggering the CheckColor function that checks what value is stored in the selectedValue variable when creating a new note */


    // saving data to localStorage
    noteItemsArr.push(noteItem);
    localStorage.setItem('myNotes', JSON.stringify(noteItemsArr));
    //  console.log(localStorage)

     // clearing the modal after pressing the save button
    textArea.value = '';
    categorySelection.selectedIndex = 0;
    notePanel.style.display = 'none';
};

//function for assinging the value to the global variable selectedValue
const selectValue = () => {
    selectedValue = categorySelection.options[categorySelection.selectedIndex].text;
};

/*function that checks what text has been chosen within the selectedValue element and dependent on the value of the selectedvalue variable it changes the color of a new note added to the noteArea*/
function checkColor(noteWrapper, noteCategory) {
    switch (noteCategory) {
        case 'Shopping':
            noteWrapper.style.backgroundColor = 'orange';
            break;
        case 'Work':
            noteWrapper.style.backgroundColor = 'rgb(35, 215, 228)';
            break;
        case 'Friends':
            noteWrapper.style.backgroundColor = 'tomato';
            break;
        case 'Other':
            noteWrapper.style.backgroundColor = 'rgb(80, 230, 50)';
            break;
    };
};

/* deleting a single note by firstly grabbing an element with an id and then deleting it from a parent element, that is, the noteArea */
function deleteNote(id) {
    const noteToBeDeleted = document.getElementById(id);
    noteArea.removeChild(noteToBeDeleted);
};

//deleting all the notes from the div with a class of note-area
function deleteAllNotes() {
    noteArea.textContent = '';

    //clearing the whole localStorage
    localStorage.clear();
};

//event listeners
addBtn.addEventListener('click', openPanel);
cancelBtn.addEventListener('click', closePanel);
saveBtn.addEventListener('click', addNote);
categorySelection.addEventListener('change', selectValue);
deleteAllBtn.addEventListener('click', deleteAllNotes);
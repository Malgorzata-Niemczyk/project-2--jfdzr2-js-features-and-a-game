const addBtn = document.querySelector('.add');
const deleteAllBtn = document.querySelector('.delete-all');
const deleteNoteBtn = document.getElementsByClassName('delete-note');
const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');

const noteArea = ocument.querySelector('.note-area');
const notePanel = document.querySelector('.note-panel');
const categorySelection = document.querySelector('#category');
const textArea = document.querySelector('#text'); 
const errorMessage = document.querySelector('.error');

let $selectedValue;
let $cardID = 0;
import './styles.css';
import { addProject } from "./dom.js"

const dialog = document.querySelector('dialog');
const projectNameInput = document.getElementById('project-name-input')
const addProjectBtn = document.getElementById('add-project-btn');
const projectsUl = document.getElementById('projects-ul');
const showDialogProjectBtn = document.getElementById('show-dialog-project-btn');
const tasksContainer = document.getElementById('tasks-container');


showDialogProjectBtn.addEventListener('click', e => {
    dialog.showModal();
})

addProjectBtn.addEventListener('click',(e) => {
    e.preventDefault;
    addProject(projectNameInput.value);
    dialog.close();
    projectNameInput.value = "";
})


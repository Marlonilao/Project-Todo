import './styles.css';
import { Project, addTaskToStorage } from "./logic.js"
import { addProject, showMainContent, renderTasks} from "./dom.js"

const dialog = document.querySelector('#projects-dialog');
const projectNameInput = document.getElementById('project-name-input')
const addProjectBtn = document.getElementById('add-project-btn');
const projectsUl = document.getElementById('projects-ul');
const showDialogProjectBtn = document.getElementById('show-dialog-project-btn');
const tasksContainer = document.getElementById('tasks-container');
const tasksDialog = document.querySelector('#tasks-dialog');
const title = document.querySelector('input[id="title"]');
const description = document.querySelector('input[id="description"]');
const dueDate = document.querySelector('input[id="due-date"]');
const priority = document.querySelector('input[name="priority"]:checked');
const h2 = document.querySelector('#project-title');
const projectForm = document.querySelector('#projects-dialog >form');


showDialogProjectBtn.addEventListener('click', e => {
    dialog.showModal();
})

projectForm.addEventListener('submit', e=>{
    e.preventDefault();
})

addProjectBtn.addEventListener('click',(e) => {
    e.preventDefault();
    const projectName = projectNameInput.value.trim();
    addProject(projectName);
    const newProject = new Project(projectName)
    localStorage.setItem(projectName, JSON.stringify(newProject));
    dialog.close();
    projectNameInput.value = "";
})

const submitTaskBtn = document.getElementById('submitTask');
submitTaskBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    if (title.value || description.value || dueDate.value) {
        addTaskToStorage({title: title.value, description: description.value, dueDate: dueDate.value});
        tasksDialog.close();
        document.querySelector('#tasks-dialog form').reset();
        renderTasks();
    } else {
        alert('add task');
        return;
    }
})

if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        addProject(key);
    }
}
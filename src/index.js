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


showDialogProjectBtn.addEventListener('click', e => {
    dialog.showModal();
})

addProjectBtn.addEventListener('click',(e) => {
    e.preventDefault;
    const projectName = projectNameInput.value.trim();
    addProject(projectName);
    const newProject = new Project(projectName)
    localStorage.setItem(projectName, JSON.stringify(newProject));
    dialog.close();
    projectNameInput.value = "";
})

const submitTaskBtn = document.querySelector('button[type="submit"]');
submitTaskBtn.addEventListener('click',(e)=>{
    e.preventDefault;
    addTaskToStorage({title: title.value, description: description.value, dueDate: dueDate.value});
    tasksDialog.close();
    document.querySelector('#tasks-dialog form').reset();
    renderTasks();
})
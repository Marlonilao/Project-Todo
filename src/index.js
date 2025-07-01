import './styles.css';
import Project from './logic.js';
import { renderProjectLists, renderMainContent } from './dom.js';

const main = document.getElementById('main')
const projectsUl = document.getElementById('projects-ul')
const inputProjectName = document.getElementById('project-name-input');
const dialog = document.querySelector('body > dialog')
const addProjectBtn = document.getElementById('add-project-btn');
addProjectBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const projectObj = new Project(inputProjectName.value)
    localStorage.setItem(inputProjectName.value, JSON.stringify(projectObj));
    renderProjectLists(projectsUl, main);
    dialog.close();
    document.querySelector('body > dialog > form').reset();
})

const showAddProjectBtn = document.getElementById('show-add-project-btn');
showAddProjectBtn.addEventListener('click',(e)=>{
    dialog.showModal();
})


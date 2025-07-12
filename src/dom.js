import { deleteProject, deleteTaskFromStorage } from "./logic";

function addProject(projectName) {
    const projectsUl = document.getElementById('projects-ul');
    const template = document.querySelector('#project-li');
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector('li');
    const deleteProjectButton = clone.querySelector('button');
    li.textContent = projectName;
    projectsUl.appendChild(clone);
    li.addEventListener('click', (e) => {
        console.log(e.target.innerText);
        showMainContent(projectName);
        renderTasks();
    });
    deleteProjectButton.addEventListener('click',(e) => {
        e.target.parentElement.remove();
        deleteProject(e.target.previousElementSibling.innerText);
        const h2 = document.getElementById('project-title');
        h2.innerHTML = "";
        const ul = document.getElementById('tasks-ul');
        ul.innerHTML = "";
        const ulPreviousElem = ul.previousElementSibling;
        if (ulPreviousElem) {
            ulPreviousElem.remove();
        }
    });
}

function showMainContent(projectName) {
    const h2 = document.querySelector('#project-title')
    if (h2.innerText == projectName) {
        return
    } else {
        h2.innerText = projectName;
        const tasksContainer = document.getElementById('tasks-container');
        tasksContainer.innerHTML = ""
        const tasksDialog = document.querySelector('#tasks-dialog');
        const template = document.querySelector('#main-content');
        const clone = template.content.cloneNode(true);
        const addTasksButton = clone.querySelector('#add-task-btn');
        addTasksButton.addEventListener('click',(e) => {
            e.preventDefault()
            tasksDialog.showModal();
        })

        const tasksUl = clone.querySelector('#tasks-ul');
        tasksContainer.appendChild(clone);
        const cancelBtn = document.querySelector('#cancel-btn');
        cancelBtn.addEventListener('click', (e) => {
            e.preventDefault;
            tasksDialog.close();
        })
    }
}

function renderTasks(){
    const h2 = document.querySelector('#project-title');
    const tasksUl = document.getElementById('tasks-ul');
    const tasksLists = JSON.parse(localStorage.getItem(h2.innerText));
    if (tasksUl.children.length > 0) {
            tasksUl.innerHTML = ""
    }
    for (let i=0; i<tasksLists.tasks.length; i++) {
        const template = document.querySelector('#task-li');
        const clone = template.content.cloneNode(true);
        const taskTitle = clone.querySelector('#task-title');
        const deleteTaskBtn = clone.querySelector('#delete-task-btn');
        deleteTaskBtn.addEventListener('click', (e)=>{
            const match = taskTitle.textContent;
            deleteTaskFromStorage(match);
            e.target.parentElement.remove();
        })
        taskTitle.innerText = tasksLists.tasks[i].title;
        tasksUl.appendChild(clone);
    }
}

// function deleteTasks(){
//     const tasks = document.querySelectorAll('#tasks-ul li');
//     tasks.forEach((task, index) => {
//         const para = task.children[1];
//         const deleteBtn = task.lastElementChild;
//         deleteBtn.addEventListener('click', (e) =>{
//             const match = para.textContent
//             deleteTaskFromStorage(match);
//             e.target.parentElement.remove();
//         })
//     })
// }



export { addProject, showMainContent, renderTasks }
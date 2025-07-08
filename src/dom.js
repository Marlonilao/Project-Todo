function addProject(projectName) {
    const projectsUl = document.getElementById('projects-ul');
    const template = document.querySelector('#project-li');
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector('li');
    li.textContent = projectName;
    projectsUl.appendChild(clone);
    li.addEventListener('click', () => {
        showMainContent(projectName);
    });
    return clone;
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
    console.log(tasksLists.tasks);
    if (tasksUl.children.length > 0) {
            tasksUl.innerHTML = ""
    }
    for (let i=0; i<tasksLists.tasks.length; i++) {
        const template = document.querySelector('#task-li');
        const clone = template.content.cloneNode(true);
        const taskTitle = clone.querySelector('#task-title')
        taskTitle.innerText = tasksLists.tasks[i].title;
        tasksUl.appendChild(clone);
    }
}



export { addProject, showMainContent, renderTasks }
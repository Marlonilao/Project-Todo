import { deleteProject, deleteTaskFromStorage } from './logic';

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
  deleteProjectButton.addEventListener('click', (e) => {
    e.target.parentElement.remove();
    deleteProject(e.target.previousElementSibling.innerText);
    const h2 = document.getElementById('project-title');
    h2.innerHTML = '';
    const ul = document.getElementById('tasks-ul');
    ul.innerHTML = '';
    if (ul.previousElementSibling) {
      const ulPreviousElem = ul.previousElementSibling;
      ulPreviousElem.remove();
    }
  });
}

function showMainContent(projectName) {
  const h2 = document.querySelector('#project-title');
  if (h2.innerText == projectName) {
    return;
  } else {
    h2.innerText = projectName;
    const tasksContainer = document.getElementById('tasks-container');
    tasksContainer.innerHTML = '';
    const tasksDialog = document.querySelector('#tasks-dialog');
    const template = document.querySelector('#main-content');
    const clone = template.content.cloneNode(true);
    const addTasksButton = clone.querySelector('#add-task-btn');
    addTasksButton.addEventListener('click', (e) => {
      e.preventDefault();
      tasksDialog.showModal();
    });

    tasksContainer.appendChild(clone);
    const cancelBtn = document.querySelector('#cancel-btn');
    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault;
      tasksDialog.close();
    });
  }
}

function renderTasks() {
  const h2 = document.querySelector('#project-title');
  const tasksUl = document.getElementById('tasks-ul');
  const tasksLists = JSON.parse(localStorage.getItem(h2.innerText));
  if (tasksUl.children.length > 0) {
    tasksUl.innerHTML = '';
  }
  for (let i = 0; i < tasksLists.tasks.length; i++) {
    const template = document.querySelector('#task-li');
    const clone = template.content.cloneNode(true);
    const taskTitle = clone.querySelector('#task-title');
    const checkbox = clone.querySelector('#checkbox');
    const deleteTaskBtn = clone.querySelector('#delete-task-btn');
    const editTaskBtn = clone.querySelector('#edit-task-btn');
    deleteTaskBtn.addEventListener('click', (e) => {
      const match = taskTitle.textContent;
      deleteTaskFromStorage(match);
      e.target.parentElement.remove();
    });
    taskTitle.innerText = tasksLists.tasks[i].title;
    tasksUl.appendChild(clone);
    checkbox.addEventListener('change', function () {
      if (this.checked) {
        taskTitle.classList.add('strikethrough');
      } else {
        taskTitle.classList.remove('strikethrough');
      }
    });
    editTaskBtn.addEventListener('click', (e) => {
      showDialogToEdit(e);
    });

    taskTitle.addEventListener('click', (e) => {
      showDialog(e);
    });
  }
}

function showDialogToEdit(e) {
  const titleInput = document.getElementById('edit-title');
  const descriptionInput = document.getElementById('edit-description');
  const dueDateInput = document.getElementById('edit-due-date');
  const span = e.target.previousElementSibling;
  const para = span.lastElementChild;
  const match = para.textContent;
  const h2 = document.querySelector('#project-title');
  const data = localStorage.getItem(h2.innerText);
  const parsedData = JSON.parse(data);
  const index = parsedData.tasks.findIndex((task) => task.title === match);
  titleInput.value = parsedData.tasks[index].title;
  descriptionInput.value = parsedData.tasks[index].description;
  dueDateInput.value = parsedData.tasks[index].dueDate;

  const tasksDialog = document.getElementById('edit-tasks-dialog');
  tasksDialog.showModal();

  const updateTaskBtn = document.getElementById('updateTask');
  updateTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    parsedData.tasks[index].title = titleInput.value;
    parsedData.tasks[index].description = descriptionInput.value;
    parsedData.tasks[index].dueDate = dueDateInput.value;
    localStorage.setItem(h2.innerText, JSON.stringify(parsedData));
    renderTasks();
    tasksDialog.close();
    // document.querySelector('#edit-tasks-dialog > form').reset();
  });

  const cancelBtn = document.getElementById('edit-cancel-btn');
  cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    tasksDialog.close();
    document.querySelector('#edit-tasks-dialog form').reset();
  });
}

function showDialog(e) {
  const dialog = document.getElementById('show-task-details');
  const titleInput = document.getElementById('show-title');
  const descriptionInput = document.getElementById('show-description');
  const dueDateInput = document.getElementById('show-due-date');
  const match = e.target.innerText;
  const h2 = document.querySelector('#project-title');
  const data = localStorage.getItem(h2.innerText);
  const parsedData = JSON.parse(data);
  const index = parsedData.tasks.findIndex((task) => task.title === match);
  titleInput.value = parsedData.tasks[index].title;
  descriptionInput.value = parsedData.tasks[index].description;
  dueDateInput.value = parsedData.tasks[index].dueDate;

  dialog.show();

  const closeBtn = document.getElementById('close-task-details');
  closeBtn.addEventListener('click', function () {
    dialog.close();
  });
}

export { addProject, showMainContent, renderTasks };

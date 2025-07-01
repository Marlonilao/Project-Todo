import Project from './logic.js';


function renderProjectLists(ul,main){
    ul.innerHTML = '';
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
        const li = document.createElement('li');
        li.innerText = `${key}`
        li.addEventListener('click',function(){
            renderMainContent(main,key);
        });
        ul.appendChild(li);
    })
}

function renderMainContent(main,key){
    main.innerHTML = 
    `<h2>${key}</h2>
    <label><input type="text" placeholder="Add task"><button id="add-task-btn">Add</button></label>
    <ul id="tasksList"> </ul>`;
    const input = document.querySelector('input[placeholder="Add task"]');
    const addTaskBtn = document.getElementById('add-task-btn');

    const data = JSON.parse(localStorage.getItem(key));
    const newObj = new Project(data.name)
    newObj.task = data.task;
    renderTaskList(newObj);

    addTaskBtn.addEventListener('click',e=>{
        e.preventDefault();
        newObj.addTask(input.value);
        localStorage.setItem(key,JSON.stringify(newObj));
        input.value = ''
        renderTaskList(newObj);
    })
}

function renderTaskList(object) {
    const ul = document.getElementById('tasksList');
    ul.innerHTML = '';
    object.getTasks().forEach(task => {
        const li = document.createElement('li');
        li.innerText = task;
        ul.appendChild(li);
    })
}



export {renderProjectLists, renderMainContent};
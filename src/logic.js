class Project {
    constructor() {
        this.tasks = [];
    }

}

function addTaskToStorage(task) {
    const h2 = document.querySelector('#project-title')
    const data = localStorage.getItem(h2.innerText)
    const parsedData = JSON.parse(data)
    parsedData.tasks.push(task);
    localStorage.setItem(h2.innerText, JSON.stringify(parsedData));
}
export { Project, addTaskToStorage }
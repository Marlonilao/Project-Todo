export default class Project {
    constructor(projectname) {
        this.name = projectname,
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(task) {
        this.tasks.splice(this.tasks.indexOf(task),1);
    }

    getProjectName() {
        return this.name;
    }

    getTasks() {
        return this.tasks;
    }
}
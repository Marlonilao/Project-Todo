function addProject(projectName) {
    const projectsUl = document.getElementById('projects-ul');
    const template = document.querySelector('#project-li');
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector('li');
    li.textContent = projectName;
    projectsUl.appendChild(clone);
}

export { addProject }
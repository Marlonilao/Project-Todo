function renderProjectLists(ul){
    ul.innerHTML = '';
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
        const li = document.createElement('li');
        li.innerText = `${key}`;
        ul.appendChild(li);
    })
}

export {renderProjectLists};
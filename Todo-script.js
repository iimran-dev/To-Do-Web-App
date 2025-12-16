const todoArray = JSON.parse(localStorage.getItem('todoArray')) || [];

renderTodo();

function renderTodo() {
    const display = document.querySelector('.displayTodo');
    display.style.minHeight = "40px"; // prevents jump when empty
    display.innerHTML = ''; // clear before rendering

    for (let i = 0; i < todoArray.length; i++) {
        const todoObj = todoArray[i];
        const name = todoObj.name;

        const container = document.createElement('div');
        container.classList.add('todo-list-js-container');
        const checked = todoObj.completed ? 'checked' : '';
        container.innerHTML = `
            <div>
                <input type="checkbox" class="checkbox" ${checked}>
            </div>
            <div class="todo-tasks">
                <div class="todo-text">${name}</div> 
            </div>
            <button class="delete-button">
                <img src="./trash.svg">
            </button>
        `;
        const checkbox = container.querySelector('.checkbox');

        checkbox.addEventListener('change', () => {
            todoArray[i].completed = checkbox.checked;
            localStorage.setItem('todoArray', JSON.stringify(todoArray));
            });


        display.appendChild(container);

        // fade-in
        setTimeout(() => container.classList.add('show'), 10);

        // delete with fade-out + smooth height shrink
        const deleteBtn = container.querySelector('.delete-button');
        deleteBtn.addEventListener('click', () => {
            container.classList.add('hide');
            setTimeout(() => {
                todoArray.splice(i, 1);
                localStorage.setItem('todoArray', JSON.stringify(todoArray));
                renderTodo();
            }, 300);
        });
    }
};

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTodo();
    }
});


 function addTodo() {
    let input = document.querySelector('.todo-input');
    
    
    let name = input.value;
    if (name.trim() === "") {
        input.placeholder = "Type something!";
        input.classList.add("error");
        setTimeout(() => {
        input.classList.remove("error");
        input.placeholder = "Add a new task";
        }, 1000);
        return;
    }
    todoArray.push({
        name,
        completed: false
        });

    localStorage.setItem('todoArray', JSON.stringify(todoArray));
    renderTodo();
    const display = document.querySelector('.displayTodo');
    const lastTodo = display.lastElementChild;

    if (lastTodo) {
        lastTodo.classList.add('todo-item'); // ensure base style
        setTimeout(() => {
            lastTodo.classList.add('show'); // trigger animation
        }, 10);
    }

    input.value = "";
}


function autoGrow(el) {
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
}
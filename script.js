// script.js
const todoInput = document.getElementById('todoInput');
const addTodoButton = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');

addTodoButton.addEventListener('click', addTodo);

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        const todoItem = createTodoItem(todoText);
        todoList.appendChild(todoItem);
        todoInput.value = ''; // Clear input field
    }
}

function createTodoItem(text) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', toggleComplete);
    li.appendChild(checkbox);


    const todoText = document.createElement('span');
    todoText.classList.add('todo-text');
    todoText.textContent = text;
    li.appendChild(todoText);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', deleteTodo);
    li.appendChild(deleteButton);

    return li;
}

function toggleComplete(event) {
    const checkbox = event.target;
    const todoItem = checkbox.parentNode;
    todoItem.classList.toggle('completed', checkbox.checked); // Add/remove completed class
}


function deleteTodo(event) {
    const deleteButton = event.target;
    const todoItem = deleteButton.parentNode;
    const checkbox = todoItem.querySelector('input[type="checkbox"]');

    if (checkbox.checked) {
        todoList.removeChild(todoItem);
    } else {
        alert("Please complete task and check the todo to be deleted.");
    }
}

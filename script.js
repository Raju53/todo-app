const todoInput = document.getElementById('todoInput');
const addTodoButton = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');

// Load todos from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTodos);

addTodoButton.addEventListener('click', addTodo);

function loadTodos() {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || []; // Get stored todos or empty array
    storedTodos.forEach(todoText => {
        const todoItem = createTodoItem(todoText);
        todoList.appendChild(todoItem);
    });
}

function saveTodos() {
    const todos = [];
    const todoItems = document.querySelectorAll('.todo-item .todo-text'); // Select all todo text elements
    todoItems.forEach(todoText => {
        todos.push(todoText.textContent); // Add the actual text content of the todo item
    });
    localStorage.setItem('todos', JSON.stringify(todos)); // Save the array of todo texts
}


function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        const todoItem = createTodoItem(todoText);
        todoList.appendChild(todoItem);
        todoInput.value = ''; // Clear input field
        saveTodos(); // Save todos after adding
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
    todoItem.classList.toggle('completed', checkbox.checked);
    saveTodos(); // Save todos after toggling complete
}

function deleteTodo(event) {
    const deleteButton = event.target;
    const todoItem = deleteButton.parentNode;
    const checkbox = todoItem.querySelector('input[type="checkbox"]');

    if (checkbox.checked) {
        todoList.removeChild(todoItem);
        saveTodos(); // Save todos after deleting
    } else {
        alert("Please check the todo to be deleted.");
    }
}

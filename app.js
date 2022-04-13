const form = document.querySelector('#add-newtodo');
const input = document.querySelector('#input');
const todoList = document.querySelector('#todo-list')
const completed = document.querySelectorAll('li.completed');
// let todos = [];

function storeTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

let storedTodos = JSON.parse(localStorage.getItem('todos')) ||[];

function setTodos() {
    storedTodos = JSON.parse(localStorage.getItem('todos'));
    // todos.push(storedTodos);
    for (let i = 0; i < storedTodos.length; i++) {
        const li = document.createElement('li');
        li.innerText = storedTodos[i]['text'];
        li.classList = 'todo';
        //creating id for stored todo
        li.setAttribute("id", storedTodos[i]['id']);
        todoList.appendChild(li);
        if (storedTodos[i]['completed'] === true) {
            li.classList = 'todo completed';
        }
    }
}

setTodos();

form.addEventListener('submit', function (e) {
    e.preventDefault();
    li = document.createElement('li');
    let todoText = input.value;
    li.innerText = todoText;
    input.value = '';
    li.classList = 'todo';
    let todo = {
        text: todoText,
        id: '',
        completed: false
    };
    storedTodos.push(todo);
    //creating id for todo
    li.setAttribute("id", todos.indexOf(todo));
    //adding id# to todo array
    storedTodos[storedTodos.indexOf(todo)].id = storedTodos.indexOf(todo);
    todoList.appendChild(li);
    storeTodos();
});

todoList.addEventListener('click', function (e) {
    e.target.classList.toggle('completed');
    let isCompleted = document.querySelector(`[id='${e.target.id}']`).getAttribute('class');
    if(isCompleted === 'todo completed'){
    storedTodos[e.target.id]['completed'] = true;
    }else{
        storedTodos[e.target.id]['completed'] = false;
    }
    storeTodos();
});

todoList.addEventListener('dblclick', function (e) {
    if (e.target.classList.contains('completed')) {
        e.target.remove();
        //removing the removed todo from the todos array
        storedTodos.splice(storedTodos.indexOf(e.target.innerHTML), 1);
        storeTodos();
    }
});

const deleteButton = document.querySelector('#delete-all');
deleteButton.addEventListener('click', function (e) {
    for (li of document.querySelectorAll('li')) {
        li.remove();
    };
    //removing everything in localStorage
    localStorage.clear();
    //removing everything in todos array
    storedTodos.splice(0, storedTodos.length);
});
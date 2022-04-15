const form = document.querySelector('#add-newtodo');
const input = document.querySelector('#input');
const todoList = document.querySelector('#todo-list')
const completed = document.querySelectorAll('li.completed');

const storedTodos = JSON.parse(localStorage.getItem('storedTodos')) || {};

function setTodos() {
    JSON.parse(localStorage.getItem('storedTodos'));
    let nums = Object.keys(storedTodos);
    for (let num of nums) {
        const li = document.createElement('li');
        li.innerText = storedTodos[num]['text'];
        li.classList = 'todo';
        //creating id for stored todo
        li.setAttribute("id", storedTodos[num]['id']);
        todoList.appendChild(li);
        if (storedTodos[num]['completed'] === true) {
            li.classList = 'todo completed';
        }
    }
}

setTodos();

function storeTodos() {
    localStorage.setItem('storedTodos', JSON.stringify(storedTodos));
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    li = document.createElement('li');
    let todoText = input.value;
    li.innerText = todoText;
    input.value = '';
    li.classList = 'todo';
    if (document.getElementById('todo-list').lastChild === null) {
        li.setAttribute('id', 0)
    } else {
        li.setAttribute("id", Number(document.getElementById('todo-list').lastChild.id) + 1);
    }
    todoList.appendChild(li);
    storedTodos[`${document.getElementById('todo-list').lastChild.id}`] = {};
    storedTodos[`${document.getElementById('todo-list').lastChild.id}`] = {
        text: todoText,
        id: `${document.getElementById('todo-list').lastChild.id}`,
        completed: false
    };
    storeTodos();
});

todoList.addEventListener('click', function (e) {
    e.target.classList.toggle('completed');
    let isCompleted = document.querySelector(`[id='${e.target.id}']`).getAttribute('class');
    if (isCompleted === 'todo completed') {
        storedTodos[e.target.id]['completed'] = true;
    } else {
        storedTodos[e.target.id]['completed'] = false;
    }
    storeTodos();
});

todoList.addEventListener('dblclick', function (e) {
    if (e.target.classList.contains('completed')) {
        e.target.remove();
        //removing the removed todo from the storedTodos object
        delete storedTodos[e.target.id];
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
    //removing everything in storedTodos object
    for (key in storedTodos) {
        delete storedTodos[key];
    }
});
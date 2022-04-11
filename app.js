const form = document.querySelector('#add-newtodo');
const input = document.querySelector('#input');
const todoList = document.querySelector('#todo-list')
const completed = document.querySelectorAll('li.completed');
let todos = [];

function storeTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    JSON.parse(localStorage.getItem('todos'))
}

let storedTodos = JSON.parse(localStorage.getItem('todos'));

function setTodos() {
    for (let i = 0; i < storedTodos.length; i++) {
        const li = document.createElement('li');
        li.innerText = storedTodos[i]['text'];
        console.log(li);
        li.classList = 'todo';
        todoList.appendChild(li);
        if (storedTodos[i]['completed'] === true) {
            li.classList = 'completed';
        }
    }
}
setTodos();


form.addEventListener('submit', function (e) {
    e.preventDefault();
    li = document.createElement('li');
    let todoText = input.value;
    console.log('todoText', todoText);
    li.innerText = todoText;
    input.value = '';
    li.classList = 'todo';
    let todo = {
        text: todoText,
        id: '',
        completed: false
    };
    todos.push(todo);
    //creating id for todo
    li.setAttribute("id", todos.indexOf(todo));
    //adding id# to todo array
    todos[todos.indexOf(todo)].id = todos.indexOf(todo);
    console.log(li);
    todoList.appendChild(li);
    storeTodos();
});

todoList.addEventListener('click', function (e) {
    e.target.classList.toggle('completed');
    // localStorage.setItem()
});

todoList.addEventListener('dblclick', function (e) {
    if (e.target.classList.contains('completed')) {
        e.target.remove();
        //removing the removed todo from the todos array
        console.log('splice', todos.splice(todos.indexOf(e.target.innerHTML), 1));
        console.log('todos', todos);
        todos.splice(todos.indexOf(e.target.innerHTML), 1);
        console.log('localStorage', localStorage.getItem('todos')[todos.indexOf(e.target.innerHTML)]);
        storeTodos();
    }
});


const deleteButton = document.querySelector('#delete-all');

deleteButton.addEventListener('click', function (e) {
    for (li of document.querySelectorAll('li')) {
        li.remove();
    };
    //remove everything in localStorage
    localStorage.clear();
    //remove everything in todos array
    todos.splice(0, todos.length);
});
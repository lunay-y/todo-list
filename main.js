//Change background function, fetching new image everytime
let pageBackground = document.querySelector('body');

async function getBackgroundImage(){
    let promise = await fetch('https://api.unsplash.com/photos/random/?query=nature&client_id=lan5flN6nSaloM1z7loBO3jJ9hYQoV4__cY0OnFFmrw');
    let data = await promise.json();
    console.log(data)
    let img = data.urls.regular
    console.log(img)
    pageBackground.style.backgroundImage = `url('${img}')`
}

getBackgroundImage();


//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getToDos);   //when everything is loaded run this function
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterToDo);


//Functions
function addTodo(event){
    //prevent form from submitting
    event.preventDefault();

    //todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //ADD TO DO TO LOCAL STOARGE
    saveLocalTodos(todoInput.value);

    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-eraser"></i>';
    trashButton.classList.add('delete-btn');
    todoDiv.appendChild(trashButton);

    //append to listStyle: 
    todoList.appendChild(todoDiv);

    //clear todoInput value
    todoInput.value = "";
}

function deleteCheck(e){
// console.log(e.target) -> this console log the functionality I can do (click page with DOM in devtool)
const item = e.target;

//Delete to do
if(item.classList[0] === "delete-btn"){
    const todo = item.parentElement;
    //animation
    todo.classList.add('fall');
    removeLocalStorageTodos(todo);
    todo.addEventListener('transitionend', function(){
        todo.remove();
    });
    //todo.remove();
}
//check mark
if(item.classList[0] === "complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle("completed");
}
}

//NOT WORKING, filter for the dropdown options
function filterToDo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

//save to local storage the added List Items
function saveLocalTodos(todo){
    //CHECK if I have already things in there
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    } else {todos = JSON.parse(localStorage.getItem('todos'));
}
todos.push(todo);
localStorage.setItem('todos', JSON.stringify(todos));
}


//display the todos saved in the localstorage to front end
function getToDos(){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    } else {todos = JSON.parse(localStorage.getItem('todos'));
}
todos.forEach(function(todo){
    //TODO div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-eraser"></i>';
    trashButton.classList.add('delete-btn');
    todoDiv.appendChild(trashButton);

    //append to listStyle: 
    todoList.appendChild(todoDiv);
})
}


function removeLocalStorageTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    } else {todos = JSON.parse(localStorage.getItem('todos'));
}
const todoIndex = todo.children[0].innerText;
todos.splice(todos.indexOf(todoIndex), 1);
localStorage.setItem('todos', JSON.stringify(todos));
}




















//Input for user name
// const inputField = document.getElementById('input-name');
// const submitButton = document.getElementById('press-me');

// function getInputName(){
//     let name = inputField.value
//     let h2 = document.getElementById('insert-name');
//     h2.innerText = `Hi, ${name}`;

//     localStorage.setItem('name', JSON.stringify(name));

//     console.log(localStorage);

// }

// submitButton.addEventListener('click', getInputName)


// //CSS animation for writing effect on H1
// const text =['homework', 'hobbies', 'meeting', 'self-care.',]
// let count = 0;
// let index = 0;
// let currentText = '';
// let letter = '';

//function is in () so it will start as it the code is being read (instead of invoking the function on a lower line)
//this will make it go through the array on loop
// (function typeEffect(){             
// // if(count === text.length){       
// //     count = 0;
// // }
// currentText = text[count];
// letter = currentText.slice(0, ++index);

// document.querySelector('.typing').textContent = letter;
// if(letter.length === currentText.length){
//     count++;
//     index = 0;
// }
// setTimeout(typeEffect, 1000)
// }());




// function showName(){
//     if(localStorage.name){
//         h2.innerText = `Hi, ${JSON.parse(localStorage.getItem(name))} .` 
//     }
// }

// showName();


//plan create 2 toggle
//when toggle 1 is clicked (eventlistener) the background theme will change into the option selected
    //

// localStorage.setItem('name', 'luna');
// console.log(localStorage)

// const button = document.querySelector('button');
// button.addEventListener('click', getBackgroundImage)
const todoList = document.querySelector(".todo-list");
const onlyIncomplete = document.querySelector("#incompleteFilter");
const sortByPriority = document.querySelector("#sortPriority");
let checkboxes = document.querySelectorAll(".completed");
updateList();
const list = document.querySelectorAll("li");
//add button
document.querySelector(".add-todo").addEventListener('click', () => {
  const newObj = {
    text: document.querySelector(".todo-input").value,
    complete: false,
    priority: document.querySelector("#priority").value,
    id: todos.length + 1
  }
  document.querySelector(".todo-input").value = "";
  todos.push(newObj);
  updateList();
})

//clear button
document.querySelector("#clearTodos").addEventListener('click', () =>{
  todos.length = 0;
  updateList();
})

//filter checkbox
onlyIncomplete.addEventListener('change', () => toggleCompleted())

//sort by priority checkbox
sortByPriority.addEventListener('change', () => updateList())

//update complete
function updateCompleted(){
  checkboxes = document.querySelectorAll(".completed");
  for(let i = 0; i < checkboxes.length; i++){
    checkboxes[i].addEventListener('change', (e) =>{
      todos[i].complete = e.target.checked;
      toggleCompleted();
    })
  }
}

//print DOM elements
function printTodo(todo) {
  let checkedStr = todo.complete ? "checked=\"true\"" : "";
  let newElement = document.createElement('li');
  newElement.classList.add(`priority${todo.priority}`);
  newElement.classList.add("todoElement");
  newElement.classList.add("list-group-item");
  newElement.id = `item${todo.id}`;
  newElement.innerHTML = 
  `<input type="checkbox" class="completed" ${checkedStr}">...${todo.text}
  <div class="btn-group" role="group">
  <button type="button" class="btn btn-success btn-sm edit" id="edit${todo.id}">Edit</button>
  <button type="button" class="btn btn-danger btn-sm remove" id="remove${todo.id}">Remove</button>
  </div>`;
  todoList.appendChild(newElement);
  newElement.querySelector(`#edit${todo.id}`).addEventListener('click', () => editTodo(newElement, todo));
  newElement.querySelector(`#remove${todo.id}`).addEventListener('click', () => removeTodo(todo));
}

//resort and refresh list
function updateList(){
  todoList.innerHTML = "";
  if (sortByPriority.checked === true){
    todos.sort((a, b) => a.priority - b.priority);
  }else if (sortByPriority.checked === false){
    todos.sort((a, b) => a.id - b.id)
  }
  for(let todo of todos){
    printTodo(todo);
  }
  updateCompleted();
  toggleCompleted();
}

function toggleCompleted(){
  if(onlyIncomplete.checked){
    for(let i = 0; i < checkboxes.length; i++){
      if(todos[i].complete){
        document.querySelector(`#item${todos[i].id}`).hidden = true;
      }
    }
  }else{
    for(let i = 0; i < checkboxes.length; i++){
      if(todos[i].complete){
        document.querySelector(`#item${todos[i].id}`).hidden = false;
      }
    }
  }
}

//edit todo
function editTodo(element, todo){
  let checkedStr = todo.complete ? "checked=\"true\"" : "";
  element.innerHTML = `<input type="checkbox" class="completed" ${checkedStr}">...
  <input type="text" class="form-control form-control-xs" id="editText${todo.id}" value="${todo.text}">
  <div class="btn-group" role="group">
  <button type="button" class="btn btn-info btn-sm edit" id="save${todo.id}">Save</button>
  <button type="button" class="btn btn-danger btn-sm remove" id="remove${todo.id}">Remove</button>
  </div>`;
  updateCompleted();
  document.querySelector(`#save${todo.id}`).addEventListener('click', () =>{
    
    todo.text = element.querySelector('.form-control').value;
    updateList();
  })
  document.querySelector(`#remove${todo.id}`).addEventListener('click', () => removeTodo(todo));
}

//remove todo
function removeTodo(todo){
  const i = todos.findIndex(x => x.id === todo.id)
  todos.splice(i, 1);
  updateList();
}
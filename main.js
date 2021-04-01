const todoList = document.querySelector(".todo-list");
const onlyIncomplete = document.querySelector("#filters");
updateList();

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
onlyIncomplete.addEventListener('change', () => {
  toggleCompleted();
})

//update checkboxes
const checkboxes = document.querySelectorAll(".completed");
for(let i = 0; i < checkboxes.length; i++){
  checkboxes[i].addEventListener('change', (e) =>{
    todos[i].complete = e.target.checked;
    toggleCompleted();
  })
}

//print DOM elements
function printTodo(todo) {
  let checkedStr = todo.complete ? "checked=\"true\"" : "";
  let newElement = document.createElement('li');
  newElement.classList.add(`priority${todo.priority}`);
  newElement.classList.add("todoElement");
  newElement.id = `item${todo.id}`;
  newElement.innerHTML = `<input type="checkbox" class="completed" ${checkedStr}">...${todo.text}`;
  todoList.appendChild(newElement);
  document.querySelector
}

//resort and refresh list
function updateList(){
  todoList.innerHTML = "";
  todos.sort((a, b) => a.priority - b.priority);
  for(let todo of todos){
    printTodo(todo);
  }
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
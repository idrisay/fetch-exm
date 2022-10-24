let todoForm = document.querySelector("#todo-form");
let todosWrapper = document.querySelector("#todos");
let editElm;
let allTodos = [];

const getTodos = () => {
  fetch("http://localhost:3000/todos")
    .then((res) => res.json())
    .then((response) => {
      allTodos = response;
      showTodos(response);
    });
};

getTodos();

todoForm.onsubmit = (event) => {
  event.preventDefault();

  console.log(editElm);

  if (!event.target[0].value || !event.target[1].value) {
    alert("Formu doldurun");
  } else {
    sendTodo({ title: event.target[0].value, author: event.target[1].value });
  }
};

const sendTodo = (todo) => {
  console.log(todo);
  fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(todo),
  });
};

const showTodos = (todos) => {
  todosElm = "<ul>";
  todos.forEach((element) => {
    todosElm +=
      "<li>" +
      element.title +
      " - " +
      element.author +
      " - " +
      '<i onclick="editTodo(' +
      element.id +
      ')" class="edit">Edit</i>' +
      " - " +
      '<i onclick="deleteTodo(' +
      element.id +
      ')" class="del">Delete</i>' +
      "</li>";
  });
  todosElm += "</ul>";
  todosWrapper.innerHTML = todosElm;
};

const deleteTodo = (id) => {
  console.log("delete", id);
  fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json()) // or res.json()
    .then((res) => console.log(res));
};

const editTodo = (id) => {
  editElm = allTodos.find((element) => element.id == id);

  console.log(editElm);
  todoForm[0].value = editElm.title;
  todoForm[1].value = editElm.author;
  document.getElementById("submit").style.display = "none";
  document.getElementById("edit").style.display = "inline";
};

document.getElementById("edit").onclick = () => {
  console.log("edit");
  data = {
    id: editElm.id,
    title: todoForm[0].value,
    author: todoForm[1].value,
  };
  fetch(`http://localhost:3000/todos/${editElm.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
};

// CRUD Operations => Create(POST), Read(GET), Update(PUT), Delete(DELETE)

"use strict";

let todos = [];
let currentNum = 0;
let updateNum = 0;
const editTodoSubmit = document.querySelector(".editTodo__submit");
const container = document.querySelector(".container");
const addFormWrapper = document.querySelector(".addFormWrapper");
const addForm = document.querySelector(".addForm");
const searchForm = document.querySelector(".searchForm");
const editTodo = document.querySelector(".editTodo");
const editTodoReturnButton = document.querySelector(".editTodo__return");
const editForm = document.querySelector(".editForm__form");
const editTodoText = document.querySelector(".editTodo__text");
const list = document.querySelector(".todo__listFrame");

// todoを用意する関数
const initTodos = (addTodoValue) => {
  todos.push({
    id: currentNum,
    title: addTodoValue,
    state: false,
  });
  currentNum++;
};

// todosを元に実際に画面に描画する関数
const createListView = () => {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.dataset.num = todo.id;
    li.classList.add("todo__listItem");
    li.textContent = todo.title;

    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    editBtn.classList.add("button--edit");
    deleteBtn.classList.add("button--delete");

    editBtn.addEventListener("click", () => {
      const todoId = editBtn.parentNode.dataset.num;
      const todoTitle = editBtn.parentNode.textContent;
      openEditForm(todoId, todoTitle);
    });

    deleteBtn.addEventListener("click", () => {
      const todoId = deleteBtn.parentNode.dataset.num;
      deleteTodo(todoId);
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
};

// タスクの登録処理
addFormWrapper.addEventListener("submit", (e) => {
  e.preventDefault();
  if (addForm.value === "") {
    alert("項目を入力してください");
    return;
  }
  initTodos(addForm.value);
  createListView(addForm.value);
  addForm.value = "";
});

// タスクの削除
const deleteTodo = (todoId) => {
  todos = todos.filter((todo) => {
    if (todo.id != todoId) {
      return todo;
    }
  });
  createListView();
};

// タスク検索
const filterTasks = (term) => {
  const todoItems = list.childNodes;
  todoItems.forEach((item) => {
    // 入力項目に一致しないものにactiveクラスを付ける
    if (!item.textContent.toLowerCase().includes(term)) {
      item.classList.add("js-filtered");
    } else {
      // それ以外はactiveクラスを除去する
      item.classList.remove("js-filtered");
    }
  });
};

// モーダルで編集フィームを開く
const openEditForm = (todoId, todoTitle) => {
  editTodo.classList.toggle("js-show");
  updateNum = todoId;
  editTodoText.textContent = `項目名：${todoTitle}を編集`;
};

editTodoReturnButton.addEventListener("click", () => {
  editTodo.classList.remove("js-show");
});

editTodoSubmit.addEventListener("click", () => {
  if (editForm.value === "") {
    alert("項目を入力してください。");
    return;
  }
  todos.forEach((todo) => {
    if (todo.id == updateNum) {
      todo.title = editForm.value;
      createListView();
    }
  });
  editForm.value = "";
  editTodo.classList.toggle("js-show");
});

searchForm.addEventListener("keyup", () => {
  // 空白削除かつ、小文字に変換(大文字・小文字の区別をなくす
  const term = searchForm.value.trim().toLowerCase();
  filterTasks(term);
});

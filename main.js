const todoValue = document.getElementsByClassName('todo_value')[0];
const todoSubmit = document.getElementsByClassName('todo_submit')[0];
const todoList = document.getElementsByClassName('todo_list')[0];
const todoItemCountElement = document.querySelector("#js-todo-count");
const doneItemCountElement = document.querySelector("#js-done-count");
const willItemCountElement = document.querySelector("#js-will-count");
let todoItemCount = 0;
let doneItemCount = 0;

const addTodos = (todo) => {
  const listItem = document.createElement('li');

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.name = 'todoCheckbox';

  listItem.appendChild(checkBox);

  const showItem = document.createTextNode(todo);

  listItem.appendChild(showItem);

  checkBox.addEventListener('change', evt => {
    evt.preventDefault();
    checkTodos(checkBox);
  });

  const editButton = document.createElement('button');
  editButton.innerHTML = '編集';
  listItem.appendChild(editButton);

  editButton.addEventListener('click', evt => {
    evt.preventDefault();
    const taskForm = document.createElement('input');
    taskForm.type = 'text';
    taskForm.id = 'target';

    listItem.replaceChild(taskForm, showItem);
  
    document.getElementById('target').value = todo;

    const keepButton = document.createElement('button');
    keepButton.innerHTML = '保存';
    listItem.appendChild(keepButton);
    editButton.style.display = 'none';
    deleteButton.style.display = 'none';

    keepButton.addEventListener('click', evt => {
      evt.preventDefault();
      const editText = document.getElementById('target').value;
      const editItem = document.createTextNode(editText);

      listItem.replaceChild(editItem, taskForm);

      keepButton.style.display = 'none';
      editButton.style.display = 'block';
      deleteButton.style.display = 'block';
    });
  });

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '削除';
  listItem.appendChild(deleteButton);

  deleteButton.addEventListener('click', evt => {
    evt.preventDefault();
    deleteTodos(deleteButton);
  });

  todoList.appendChild(listItem);
};

const editTodos = (editButton) => {
  const chosenTodo = editButton.closest('li');

  const editForm = document.createElement('input');
  const todoText = chosenTodo.firstChild.textContent;
  editForm.value = todoText;

  editButton.addEventListener('click', (event) => {
    editTodos(event.target);
  });
};

const checkTodos = (checkBox) => {
  if (checkBox.checked) {
    doneItemCount += 1;
  } else {
    doneItemCount -= 1;
  }
  todoItemCountElement.textContent = `全てのタスク: ${todoItemCount}`;
  doneItemCountElement.textContent = `完了済み: ${doneItemCount}`;
  willItemCountElement.textContent = `未完了: ${todoItemCount - doneItemCount}`;
};

const deleteTodos = (deleteButton) => {
  let result = confirm('本当に削除してもよろしいですか？');

  if(!result) return;
  const chosenTodo = deleteButton.closest('li');

  if (chosenTodo.querySelector('input[type="checkbox"]').checked) {
    doneItemCount -= 1;
  }

  todoList.removeChild(chosenTodo);

  todoItemCount -= 1;
  todoItemCountElement.textContent = `全てのタスク: ${todoItemCount}`
  doneItemCountElement.textContent = `完了済み: ${doneItemCount}`
  willItemCountElement.textContent = `未完了: ${todoItemCount - doneItemCount}`
  };

todoSubmit.addEventListener('click', evt => {
  evt.preventDefault();
  const todo = todoValue.value;
  addTodos(todo);
  todoValue.value = '';

  todoItemCount += 1;
  todoItemCountElement.textContent = `全てのタスク: ${todoItemCount}`;
  doneItemCountElement.textContent = `完了済み: ${doneItemCount}`
  willItemCountElement.textContent = `未完了: ${todoItemCount - doneItemCount}`
});

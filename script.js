const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const darkToggle = document.getElementById('darkToggle');
const body = document.body;

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({ text: li.querySelector('.task-text').innerText });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem('tasks') || '[]');
  saved.forEach(item => addTask(item.text));
}

function addTask(text) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.innerText = text;
  span.className = 'task-text';
  span.style.flex = '1';

  const btnGroup = document.createElement('div');
  btnGroup.className = 'buttons';

  const editBtn = document.createElement('button');
  editBtn.innerText = 'Edit';
  editBtn.className = 'btn edit-btn';
  editBtn.onclick = () => {
    const newText = prompt('Edit task:', span.innerText);
    if (newText) {
      span.innerText = newText;
      saveTasks();
    }
  };

  const delBtn = document.createElement('button');
  delBtn.innerText = 'Delete';
  delBtn.className = 'btn delete-btn';
  delBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  btnGroup.append(editBtn, delBtn);
  li.append(span, btnGroup);
  taskList.appendChild(li);
  saveTasks();
}

addBtn.onclick = () => {
  const text = taskInput.value.trim();
  if (text) {
    addTask(text);
    taskInput.value = '';
    taskInput.focus();
  }
};

taskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addBtn.click();
});

darkToggle.onclick = () => {
  body.classList.toggle('dark-mode');
};

loadTasks();

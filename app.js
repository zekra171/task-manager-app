// Task Class
class Task {
  constructor(id, title, completed = false) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }
}

// TaskManager Class
class TaskManager {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.renderTasks();
  }

  addTask(title) {
    const newTask = new Task(Date.now(), title);
    this.tasks.push(newTask);
    this.saveTasks();
    this.renderTasks();
  }

  toggleTask(id) {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.saveTasks();
    this.renderTasks();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
    this.renderTasks();
  }

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    this.tasks.forEach(task => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="${task.completed ? "completed" : ""}">${task.title}</span>
        <div>
          <button onclick="taskManager.toggleTask(${task.id})">✔</button>
          <button onclick="taskManager.deleteTask(${task.id})">❌</button>
        </div>
      `;
      taskList.appendChild(li);
    });
  }
}

// تشغيل التطبيق
const taskManager = new TaskManager();

document.getElementById("addTaskBtn").addEventListener("click", () => {
  const input = document.getElementById("taskInput");
  const title = input.value.trim();
  if (title) {
    taskManager.addTask(title);
    input.value = "";
  }
});

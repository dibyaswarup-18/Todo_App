// Select DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Event listener to add task
addTaskBtn.addEventListener("click", addTask);

// Add new task to the list
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const taskItem = createTaskElement(taskText);
    taskList.appendChild(taskItem);

    saveTask(taskText);

    taskInput.value = "";
}

// Create task list item with delete and complete buttons
function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)"><i class="fas fa-trash"></i></button>
    `;

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        updateTaskStatus(taskText);
    });

    return li;
}

// Save task to localStorage
function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete task from list and localStorage
function deleteTask(deleteButton) {
    const taskItem = deleteButton.parentElement;
    const taskText = taskItem.firstChild.textContent;

    taskItem.remove();
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Toggle task completed status
function updateTaskStatus(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const taskItem = createTaskElement(task.text);
        if (task.completed) {
            taskItem.classList.add("completed");
        }
        taskList.appendChild(taskItem);
    });
}

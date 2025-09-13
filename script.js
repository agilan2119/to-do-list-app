// Select elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task on button click
addBtn.addEventListener("click", addTask);

// Add task on Enter key press
taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Function: Add Task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Create list item
  const li = document.createElement("li");
  li.textContent = taskText;

  // Add complete toggle
  li.addEventListener("click", function() {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Add delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "deleteBtn";
  deleteBtn.addEventListener("click", function() {
    taskList.removeChild(li);
    saveTasks();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  // Save to localStorage
  saveTasks();

  // Clear input
  taskInput.value = "";
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) {
      li.classList.add("completed");
    }

    li.addEventListener("click", function() {
      li.classList.toggle("completed");
      saveTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "deleteBtn";
    deleteBtn.addEventListener("click", function() {
      taskList.removeChild(li);
      saveTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}
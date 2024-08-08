// Load tasks and background color from local storage when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get saved tasks from local storage
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // Add saved tasks to the DOM
    savedTasks.forEach((task) => {
      addTaskToDOM(task);
    });

      // Get saved background color from local storage
  const savedColor = localStorage.getItem("backgroundColor");
  if (savedColor) {
    document.body.style.backgroundColor = savedColor;
    setTextColorBasedOnBg(savedColor);
  }
  });

  // Function to add a task to the DOM
  function addTaskToDOM(task) {
    const taskList = document.getElementById("task-list");

    // Create a new paragraph element for the task
    const taskItem = document.createElement("p");
    taskItem.className = "task-item";
    taskItem.id = "task-items";
    // Create the delete button
    const deletebtn = document.createElement("button");
    deletebtn.className = "fas fa-trash";
    deletebtn.id = "delete-btn";
    // Create a checkbox input element
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.checked = task.completed;
    // Add an event listener to the checkbox for task completion
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        taskP.style.textDecoration = "line-through";
        saveTasksToLocalStorage();
      } else {
        taskP.style.textDecoration = "none";
        saveTasksToLocalStorage();
      }
    });
    deletebtn.addEventListener("click", function () {
      taskItem.remove();
      saveTasksToLocalStorage();
    });

    // Create a paragraph element for the task text
    const taskP = document.createElement("p");
    taskP.innerText = task.text;

    // Append the checkbox and task text to the task item and add it to the task list
    taskItem.appendChild(checkbox);
    taskItem.appendChild(deletebtn);
    taskItem.appendChild(taskP);
    taskList.appendChild(taskItem);

    // Save the tasks to local storage
    saveTasksToLocalStorage();
  }

  // Function to save tasks to local storage
  function saveTasksToLocalStorage() {
    // Get all task items, map them to an array of task objects, and save to local storage
    const tasks = Array.from(document.querySelectorAll(".task-item")).map(
      (taskItem) => ({
        text: taskItem.querySelector("p").innerText,
        completed: taskItem.querySelector("input").checked,
      })
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Function to add a new task
  function buttontask() {
    // Get the input field for the task
    const inputField = document.getElementById("task-input");

    // Check if the input field is not empty
    if (inputField.value.trim() !== "") {
      // Check if the current amount of tasks is less than the limit
      addTaskToDOM({ text: inputField.value, completed: false });
      inputField.value = "";
    } else {
      // Alert the user if the input field is empty
      alert("لطفا یه چیزی بنویس بعد دکمه ثبتو بزن :)");
    }
  }

  // Function to change the background color
  function changecolor() {
    // Prompt the user for a color
  const color = prompt("Enter a background color (e.g., red, #ff0000):");

  if (color) {
    // Set the background color of the page
    document.body.style.backgroundColor = color;
    setTextColorBasedOnBg(color);

    // Save the background color to local storage
    localStorage.setItem("backgroundColor", color);
  }
  }

  // Function to set text color based on background color luminance
  function setTextColorBasedOnBg(bgColor) {
    const luminance = getLuminance(bgColor);
    const textColor = luminance > 0.5 ? "black" : "white";
    const textColor2 = (bgColor.toLowerCase() === '#ffffff' || bgColor.toLowerCase() === 'white') ? "black" : "white";
    document.body.style.color = textColor;
    document.body.style.color = textColor2;
  }

  // Function to get the luminance of a color
  function getLuminance(color) {
    const rgb = color.match(/^#?(([0-9a-fA-F]{3}){1,2})$/);
    if (rgb) {
      color = color.substring(1);
      if (color.length === 3) {
        color = color.split("").map((c) => c + c).join("");
      }
      const r = parseInt(color.substring(0, 2), 16) / 255;
      const g = parseInt(color.substring(2, 4), 16) / 255;
      const b = parseInt(color.substring(4, 6), 16) / 255;
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }
    return 0;
  }
// Setting Up Variables
let todoContainer = document.querySelector(".todo-container"),
	
	addTaskContainer = todoContainer.querySelector(".add-task"),
	addInput = addTaskContainer.querySelector("input"),
	addButton = addTaskContainer.querySelector(".plus"),
	
	tasksContainer = todoContainer.querySelector(".tasks-content"),
	noTasksMsg = tasksContainer.querySelector(".no-tasks-message"),
	
	taskStats = todoContainer.querySelector(".task-stats"),
	tasksCount = taskStats.querySelector(".tasks-count span"),
	tasksCompleted = taskStats.querySelector(".tasks-completed span");

// Focus On Input Field
window.onload = function () {
	addInput.focus()
};

// Add Task To Tasks When Click
addButton.addEventListener("click", createTask);

// Add Task When Press [ Enter Key ]
addInput.addEventListener("keypress", (e) => {
	if (e.keyCode === 13) createTask();
});

// Create Task Function
function createTask() {
	// If Input Not Empty
	if (addInput.value !== "") {
		// Create Task1
		createTaskContent(addInput.value);
	
		// Empty Input After Add Task
		addInput.value = "";

		// Handle No Tasks Message
		handleNoTasksMsg();

		// Calculate Tasks
		calculateTasks();
	
		// Focus On Input Again
		addInput.focus();
	} else {
		Swal.fire('This Field Should Not Be Empty')
	}
}

// Create Task Function
function createTaskContent(taskText) {
	let taskBox = document.createElement("div"),
		deleteButton = document.createElement("span"),
		deleteButtonText = document.createTextNode("Delete");

	// Add [ delete ] Class To [ deleteButton ]
	deleteButton.className = "delete";
	// Add Delete Button Text
	deleteButton.appendChild(deleteButtonText);

	// Add [ task-box ] To [ taskBox ]
	taskBox.className = "task-box";
	// Append [ Task Text & Delete Button ] To [ Task Container ]
	taskBox.append(taskText, deleteButton);

	// Append [ taskBox ] To [ tasksContainer ]
	tasksContainer.appendChild(taskBox);
};

document.addEventListener("click", function (e) {
	// Delete Task
	if (e.target.className === "delete") {
		// Remove Current Task
		e.target.parentElement.remove();

		// Handle No Tasks Message
		handleNoTasksMsg();

		// Calculate Tasks
		calculateTasks();

		// Hundle Complete Tasks Number
		calculateCompleteTasks();
	}

	// Finish Task
	if (e.target.classList.contains("task-box")) {
		// Toggle Class [Finished]
		e.target.classList.toggle("finished");

		// Hundle Complete Tasks Number
		calculateCompleteTasks();
	}
});

// Function For Checking Is There Tasks Or No
function handleNoTasksMsg() {
	// Note - [ childElementCount ] Not Working Becouse I Use [ Display ] Property Not Removing The Element
	if (tasksContainer.querySelectorAll(".task-box").length > 0) {
		// Hide [ noTasksMsg ] Element
		noTasksMsg.style.display = "none";
	} else {
		// Show [ noTasksMsg ] Element
		noTasksMsg.style.display = "block";
	}
}

// Founction For Calculate All Tasks
function calculateTasks() {
	tasksCount.textContent = tasksContainer.querySelectorAll(".task-box").length;
}

// Founction For Calculate Completed Tasks
function calculateCompleteTasks() {
	tasksCompleted.textContent = tasksContainer.querySelectorAll(".task-box.finished").length;
}
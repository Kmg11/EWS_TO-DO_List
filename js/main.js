// Setting Up Variables
let todoContainer = document.querySelector(".todo-container"),
	
	addTaskContainer = todoContainer.querySelector(".add-task"),
	addInput = addTaskContainer.querySelector("input"),
	addButton = addTaskContainer.querySelector(".plus"),
	
	tasksContainer = todoContainer.querySelector(".tasks-content"),
	noTasksMsg = tasksContainer.querySelector(".no-tasks-message"),
	
	taskStats = todoContainer.querySelector(".task-stats"),
	tasksCount = taskStats.querySelector(".tasks-count"),
	tasksCompleted = taskStats.querySelector(".tasks-completed");

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
		// Remove No Tasks Message
		noTasksMsg.style.display = "none";

		// Create Task1
		createTaskContent(addInput.value);
	
		// Empty Input After Add Task
		addInput.value = "";
	
		// Focus On Input Again
		addInput.focus();
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
	}

	// Finish Task
	if (e.target.classList.contains("task-box")) {
		// Toggle Class [Finished]
		e.target.classList.toggle("finished");
	}
});
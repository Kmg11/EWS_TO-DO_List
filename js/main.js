// Setting Up Variables
let todoContainer = document.querySelector(".todo-container"),

	addTaskContainer = todoContainer.querySelector(".add-task"),
	addInput = addTaskContainer.querySelector("input"),
	addButton = addTaskContainer.querySelector(".plus"),

	tasksContainer = todoContainer.querySelector(".tasks-content"),
	noTasksMsg = tasksContainer.querySelector(".no-tasks-message"),

	taskStats = todoContainer.querySelector(".task-stats"),
	tasksCount = taskStats.querySelector(".tasks-count span"),
	tasksCompleted = taskStats.querySelector(".tasks-completed span"),

	buttons = todoContainer.querySelector(".buttons"),
	finishAll = buttons.querySelector(".finish-all"),
	deleteAll = buttons.querySelector(".delete-all");

// Local Storage
let toDoTasksLocal = localStorage.getItem("toDoTasksLocal");

if (toDoTasksLocal !== null) {
	let convertObj = JSON.parse(toDoTasksLocal);

	for (let key in convertObj) {
		createTaskContent(key, convertObj[key]);
	}

	// Handle Appear
	handleAppear();

	// Calculate Tasks
	calculateTasks();

	// Calculate Complete Tasks
	calculateCompleteTasks();
}

// Focus On Input Field
window.onload = function () {
	addInput.focus()
};

// Add Task To Tasks When Click
addButton.addEventListener("click", createTask);

// Add Task When Press [ Enter Key ]
addInput.addEventListener("keypress", (e) => {
	if (e.key === "Enter") createTask();
});

// Create Task Function
function createTask() {
	// If Input Not Empty
	if (addInput.value !== "") {
		// Create Task1
		createTaskContent(addInput.value);

		setTaskInLocalStorage();

		// Empty Input After Add Task
		addInput.value = "";

		// Handle No Tasks Message
		handleAppear();

		// Calculate Tasks
		calculateTasks();

		// Focus On Input Again
		addInput.focus();
	} else {
		Swal.fire('This Field Should Not Be Empty');
	}
}

// Create Task Function
function createTaskContent(taskText, status) {
	let taskBox = document.createElement("div"),
		taskBoxText = document.createElement("span"),
		taskBoxTextContent = document.createTextNode(taskText),
		deleteButton = document.createElement("span"),
		deleteButtonText = document.createTextNode("Delete");

	// Add [ delete ] Class To [ deleteButton ]
	deleteButton.className = "delete";
	// Add Delete Button Text
	deleteButton.appendChild(deleteButtonText);

	// Add [ text ] Class To [ taskBoxText ]
	taskBoxText.className = "text";
	// Append [ taskBoxTextContent ] To [ taskBoxText ]
	taskBoxText.appendChild(taskBoxTextContent);
	// Add [ task-box ] Class To [ taskBox ]
	taskBox.className = "task-box";
	// Add [ finished ] Class If Status Is True
	if (status) {
		taskBox.classList.add("finished");
	}
	// Append [ Task Text & Delete Button ] To [ Task Container ]
	taskBox.append(taskBoxText, deleteButton);

	// Append [ taskBox ] To [ tasksContainer ]
	tasksContainer.appendChild(taskBox);
};

document.addEventListener("click", function (e) {
	// Delete Task
	if (e.target.className === "delete") {
		// Remove Current Task
		e.target.parentElement.remove();

		// Set Local Storage
		setTaskInLocalStorage();

		// Handle No Tasks Message
		handleAppear();

		// Calculate Tasks
		calculateTasks();

		// Hundle Complete Tasks Number
		calculateCompleteTasks();
	}

	// Finish Task
	if (e.target.classList.contains("task-box")) {
		// Toggle Class [ Finished ]
		e.target.classList.toggle("finished");

		// Hundle Complete Tasks Number
		calculateCompleteTasks();

		// Set In Local Storage
		setTaskInLocalStorage();
	}
});

// Finish All Tasks
finishAll.addEventListener("click", () => {
	document.querySelectorAll(".task-box").forEach(element => {
		if (!element.classList.contains("finished")) {
			// Add [ finished ] Class To [ task-box ]
			element.classList.add("finished");
	
		}
		// Calculate Complete Tasks
		calculateCompleteTasks();

		// Alert
		Swal.fire('All Tasks Has Been Finished');

		// Focus On Input Field
		addInput.focus();

		// Set In Local Storage
		setTaskInLocalStorage();
	});
});

// Delete All Tasks
deleteAll.addEventListener("click", () => {
	document.querySelectorAll(".task-box .delete").forEach(element => {
		// Click In All Elements
		element.click();

		// Calculate Tasks
		calculateTasks();

		// Calculate Complete Tasks
		calculateCompleteTasks();

		// Handle Appearing Elements
		handleAppear();

		// Empty Input Field
		addInput.value = "";

		// Focus On Input Field
		addInput.focus();

		// Alert
		Swal.fire('All Tasks Has Been Deleted');

		// Set In Local Storage
		localStorage.removeItem("toDoTasksLocal");
	});
});

// Function For Checking Is There Tasks Or No
function handleAppear() {
	// Note - [ childElementCount ] Not Working Becouse I Use [ Display ] Property Not Removing The Element
	if (tasksContainer.querySelectorAll(".task-box").length > 0) {
		// Hide [ noTasksMsg ] Element
		noTasksMsg.style.display = "none";
		// Show [ buttons ] Element
		buttons.style.display = "block";
	} else {
		// Show [ noTasksMsg ] Element
		noTasksMsg.style.display = "block";
		// Hide [ buttons ] Element
		buttons.style.display = "none";
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

function setTaskInLocalStorage() {
	let tasksObj = {};
	if (document.querySelectorAll(".task-box").length > 0) {
		document.querySelectorAll(".task-box").forEach(element => {
			let taskText = element.querySelector(".text").textContent,
				taskStatus = element.classList.contains("finished");
	
			tasksObj[taskText] = taskStatus;
		});
		localStorage.setItem("toDoTasksLocal", JSON.stringify(tasksObj));
	} else {
		localStorage.removeItem("toDoTasksLocal");
	}
}
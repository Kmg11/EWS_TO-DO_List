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
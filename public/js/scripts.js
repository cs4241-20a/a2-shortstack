const submit = function(e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const taskName = document.querySelector("#taskName");
  const taskPriority = document.querySelector("#taskPriority");
  const taskComplete = document.querySelector("#taskComplete");
  const currentDate = new Date();
  const taskDueDate = new Date(currentDate);
  taskDueDate.setDate(taskDueDate.getDate() + 1);

  let json = {
    task: taskName.value,
    priority: parseInt(taskPriority.value),
    isTaskComplete: taskComplete.checked,
    taskDue: taskDueDate.value
  };

  const body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body
  }).then(function(response) {
    // do something with the reponse
  });

  return false;
};

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
};

const checkEmptyInput = (input) =>
  input.trim() !== "" || (alert("Task cannot be empty!"), false);

const checkDuplicateInput = (input, taskList) =>
  !taskList.some(
    (task) => task.text.toLowerCase() === input.trim().toLowerCase()
  ) || (alert("Task already exists!"), false);

const isValidInput = (input, taskList) => checkEmptyInput(input) && checkDuplicateInput(input, taskList);

export default isValidInput;
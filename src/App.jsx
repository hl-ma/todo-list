import { useState } from "react";
import Task from "./components/Task";
import "./App.scss";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filterState, setFilterState] = useState("All");

  const checkEmptyInput = () =>
    newTask.trim() !== "" || (alert("Task cannot be empty!"), false);

  const checkDuplicateInput = () =>
    !tasks.some(
      (task) => task.text.toLowerCase() === newTask.trim().toLowerCase()
    ) || (alert("Task already exists!"), false);

  const isValidInput = () => checkEmptyInput() && checkDuplicateInput();

  const addNewTask = () => {
    if (!isValidInput()) return;
    setTasks([...tasks, { text: newTask, completed: false }]), setNewTask("");
  };

  const handleToggleTask = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const filterCondition = {
      All: true,
      Completed: task.completed,
      Incomplete: !task.completed,
    };
    return filterCondition[filterState];
  });

  return (
    <div className="container">
      <header>
        <h1>My To-Do List</h1>
      </header>
      <main>
        <div className="input-container add-task">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
          />
          <button onClick={addNewTask}>Add Task</button>
        </div>
        <div className="task-list-header">
          <h2>Tasks List</h2>
          <div className="filter-buttons">
            <button onClick={() => setFilterState("All")}>All</button>
            <button onClick={() => setFilterState("Completed")}>
              Completed
            </button>
            <button onClick={() => setFilterState("Incomplete")}>
              Incomplete
            </button>
          </div>
        </div>
        <div className="task-list">
          {filteredTasks.map((task, index) => (
            <Task
              key={index}
              task={task}
              onComplete={() => handleToggleTask(index)}
            />
          ))}
        </div>
      </main>
      <footer>
        <p>&copy; 2025 To-Do List. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

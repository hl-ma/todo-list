import { Children, useState } from "react";
import Task from "./components/Task";
import "./App.scss";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filterState, setFilterState] = useState("All");

  const CheckEmptyInput = () =>
    newTask.trim() !== "" || (alert("Task cannot be empty!"), false);

  const CheckDuplicateInput = () =>
    !tasks.some(
      (task) => task.text.toLowerCase() === newTask.trim().toLowerCase()
    ) || (alert("Task already exists!"), false);

  const IsValidInput = () => CheckEmptyInput() && CheckDuplicateInput();

  const AddNewTask = () => {
    if (!IsValidInput()) return;
    setTasks([...tasks, { text: newTask, completed: false }]), setNewTask("");
  };

  const HandleToggleTask = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const FilteredTasks = tasks.filter((task) => {
    const FilterCondition = {
      All: true,
      Completed: task.completed,
      Incomplete: !task.completed,
    };
    return FilterCondition[filterState];
  });

  const CreateFilterButton = ({ children }) => (
    <button
      className={filterState === children ? "active" : ""}
      onClick={() => setFilterState(children)}
    >
      {children}
    </button>
  );

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
          <button onClick={AddNewTask}>Add Task</button>
        </div>
        <div className="task-list-header">
          <h2>Tasks List</h2>
          <div className="filter-buttons">
            <CreateFilterButton>All</CreateFilterButton>
            <CreateFilterButton>Completed</CreateFilterButton>
            <CreateFilterButton>Incomplete</CreateFilterButton>
          </div>
        </div>
        <div className="task-list">
          {FilteredTasks.map((task, index) => (
            <Task
              key={index}
              task={task}
              onComplete={() => HandleToggleTask(index)}
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

App.propTypes = {
  children: Children,
};

export default App;

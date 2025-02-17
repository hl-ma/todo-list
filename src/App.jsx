import { Children, useState, useEffect } from "react";
import Task from "./components/Task";
import isValidInput from "./Utility/InputValidation";
import "./App.scss";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskFilter, setTaskFilter] = useState("All");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("taskList")) || [];
    setTaskList(storedTasks);
  }, []);

  useEffect(() => {
    if (taskList.length > 0) {
      localStorage.setItem("taskList", JSON.stringify(taskList));
    }
  }, [taskList]);

  const handleAddTask = () => {
    if (!isValidInput(newTask, taskList)) return;
    setTaskList([
      ...taskList,
      { text: newTask, completed: false, editing: false },
    ]);
    setNewTask("");
  };

  const handleToggleTask = (index) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (index, newText = null) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index
          ? {
              ...task,
              text: newText !== null ? newText : task.text,
              editing: newText !== null ? false : !task.editing,
            }
          : task
      )
    );
  };

  const DeleteTask = (index) => {
    setTaskList((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const FilteredTasks = taskList.filter((task) => {
    const FilterCondition = {
      All: true,
      Completed: task.completed,
      Incomplete: !task.completed,
    };
    return FilterCondition[taskFilter];
  });

  const CreateFilterButton = ({ children }) => (
    <button
      className={taskFilter === children ? "active" : ""}
      onClick={() => setTaskFilter(children)}
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
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddTask();
            }}
            placeholder="Add a new task"
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        <div className="task-list-header">
          <h2>Tasks List</h2>
          <div className="buttons">
            <div className="filter-buttons">
              <CreateFilterButton>All</CreateFilterButton>
              <CreateFilterButton>Completed</CreateFilterButton>
              <CreateFilterButton>Incomplete</CreateFilterButton>
            </div>
          </div>
        </div>
        <div className="task-list">
          {FilteredTasks.map((task, index) => (
            <Task
              key={index}
              task={task}
              onComplete={() => handleToggleTask(index)}
              onDelete={() => DeleteTask(index)}
              onEdit={() => handleEditTask(index)}
              onSave={(newText) => handleEditTask(index, newText)}
              tasklist={taskList}
            />
          ))}
        </div>
        <button
          className="clear-button"
          onClick={() => {
            localStorage.removeItem("tasks");
            setTaskList([]);
          }}
        >
          Clear All
        </button>
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

import PropTypes from "prop-types";

function Task({ task, onComplete }) {
  return (
    <div className={`task ${task.completed ? "completed" : ""}`}>
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          color: task.completed ? "gray" : "black",
        }}
      >
        {task.text}
      </span>
      <button
        onClick={onComplete}
        style={{
          color: task.completed ? "whitesmoke" : "white",
          backgroundColor: task.completed ? "gray" : "",
        }}
      >
        {task.completed ? "Undo" : "Complete"}
      </button>
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default Task;

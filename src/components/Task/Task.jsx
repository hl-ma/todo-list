import { useState } from "react";
import PropTypes from "prop-types";
import isValidInput from "../../Utility/InputValidation";

function Task({ task, onEdit, onSave, onComplete, onDelete, tasklist }) {
  const [editedText, setEditedText] = useState(task.text);

  const handleSave = () => {
    if (!isValidInput(editedText, tasklist)) return;
    onSave(editedText);
  };

  return (
    <div className="task">
      {task.editing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
          }}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <span
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "gray" : "black",
          }}
        >
          {task.text}
        </span>
      )}

      <div className="buttons">
        {task.editing && (
          <button
            onClick={() => {
              onSave(editedText);
            }}
          >
            Save
          </button>
        )}
        <button onClick={onEdit}>Edit</button>
        <button onClick={onComplete}>
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
  }).isRequired,
  tasklist: PropTypes.array.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Task;

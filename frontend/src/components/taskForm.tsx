import React from "react";
import "../styles/taskModal.css";

interface TaskFormProps {
  taskTitle: string;
  description: string;
  taskType: string;
  taskDueDate: string;
  taskTime: string;
  priority: string;
  status: string;
  setTaskTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setTaskType: React.Dispatch<React.SetStateAction<string>>;
  setTaskDueDate: React.Dispatch<React.SetStateAction<string>>;
  setTaskTime: React.Dispatch<React.SetStateAction<string>>;
  setPriority: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  taskTitle,
  description,
  taskType,
  taskDueDate,
  taskTime,
  priority,
  setTaskTitle,
  setDescription,
  setTaskType,
  setTaskDueDate,
  setTaskTime,
  setPriority,
  handleSubmit,
  onClose,
}) => {
  // Get today’s date in yyyy-mm-dd format
  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="taskTitle">Task Title</label>
        <input
          id="taskTitle"
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="input"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="taskType">Task Type</label>
        <select
          id="taskType"
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
          className="input"
          required
        >
          <option value="note">Note</option>
          <option value="reminder">Reminder</option>
        </select>
      </div>

      {taskType === "reminder" && (
        <>
          <div className="form-group">
            <label htmlFor="taskDueDate">Due Date</label>
            <input
              id="taskDueDate"
              type="date"
              min={today}
              value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="taskTime">Reminder Time</label>
            <input
              id="taskTime"
              type="time"
              value={taskTime}
              onChange={(e) => setTaskTime(e.target.value)}
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="input"
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </>
      )}

      <div className="modal-actions">
        <button type="submit" className="btn-primary">
          Save Task
        </button>
        <button type="button" onClick={onClose} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
};

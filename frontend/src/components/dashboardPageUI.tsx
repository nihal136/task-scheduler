import React from "react";
import { Task } from "../pages/dashboardPage";
import "../styles/dashboard.css";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  refreshTasks: () => void;
  openEditModal: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  openEditModal,
}) => {
  return (
    <div className="task-list-container">
      {tasks.length ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`task-card ${task.priority.toLowerCase()}`}
          >
            <h2 className="task-title">{task.tasktitle}</h2>
            <p className="task-description">{task.description}</p>
            <p className="task-due">Due: {task.taskDueDate || "N/A"}</p>

            {/* Show time only if taskType is reminder */}
            {task.taskType.toLowerCase() === "reminder" && (
              <p className="task-time">Time: {task.taskTime || "N/A"}</p>
            )}
            <p className="task-status">Status: {task.status}</p>

            <div className="button-group">
              <button onClick={() => openEditModal(task)} className="edit-btn">
                Edit
              </button>
              <button onClick={() => onDelete(task.id)} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="empty-state">No tasks available.</p>
      )}
    </div>
  );
};

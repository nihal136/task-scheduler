import React from "react";
import { Task } from "../pages/dashboardPage";
import "../styles/dashboard.css";

// Import icons
import {
  FaRegBell,
  FaStickyNote,
  FaTrash,
  FaEdit,
  FaClock,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

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
            className={`task-card ${task.taskType.toLowerCase()}`}
          >
            <div className="task-header">
              <h2 className="task-title">{task.tasktitle}</h2>
              <div className="task-icon">
                {task.taskType.toLowerCase() === "reminder" ? (
                  <FaRegBell size={18} color="#fbd38d" />
                ) : (
                  <FaStickyNote size={18} color="#4a90e2" />
                )}
              </div>
            </div>

            <p className="task-description">{task.description}</p>

            {task.taskType.toLowerCase() === "reminder" && (
              <div className="task-meta">
                {task.taskDueDate && (
                  <div className="meta-item">
                    <FaCalendarAlt className="meta-icon" />
                    <span>
                      {new Date(task.taskDueDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}
                {task.taskTime && (
                  <div className="meta-item">
                    <FaClock className="meta-icon" />
                    <span>
                      {(() => {
                        const [hours, minutes] = task.taskTime
                          .split(":")
                          .map(Number);
                        const ampm = hours >= 12 ? "PM" : "AM";
                        const adjustedHours = hours % 12 || 12;
                        return `${adjustedHours}:${minutes
                          .toString()
                          .padStart(2, "0")} ${ampm}`;
                      })()}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="task-meta">
              <div className="meta-item">
                <FaCheckCircle className="meta-icon" />
                <span>{task.status}</span>
              </div>
            </div>

            <div className="button-group">
              <button onClick={() => openEditModal(task)} className="edit-btn">
                <FaEdit />
              </button>
              <button onClick={() => onDelete(task.id)} className="delete-btn">
                <FaTrash />
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

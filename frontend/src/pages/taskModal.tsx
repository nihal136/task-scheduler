import React, { useState, useEffect } from "react";
import { Task } from "../pages/dashboardPage"; // Ensure Task interface is imported
import axiosInstance from "../api/apiInstance";
import { TaskForm } from "../components/taskForm"; // Import the new TaskForm component

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task; // Optional prop for editing an existing task
  refreshTasks: () => void; // Function to refresh the task list after add/edit
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  task,
  refreshTasks,
}) => {
  const [taskTitle, setTaskTitle] = useState<string>(task?.tasktitle || "");
  const [description, setDescription] = useState<string>(
    task?.description || ""
  );
  const [taskType, setTaskType] = useState<string>(task?.taskType || "note");
  const [taskDueDate, setTaskDueDate] = useState<string>(
    task?.taskDueDate || ""
  );
  const [taskTime, setTaskTime] = useState<string>(task?.taskTime || "00:00");
  const [priority, setPriority] = useState<string>(task?.priority || "medium");
  const [status, setStatus] = useState<string>(task?.status || "pending");

  useEffect(() => {
    if (task) {
      // If it's an edit, pre-fill the form with the task data
      setTaskTitle(task.tasktitle);
      setDescription(task.description);
      setTaskType(task.taskType);
      setTaskDueDate(task.taskDueDate || "");
      setTaskTime(task.taskTime || "23:59");
      setPriority(task.priority);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Combine date and time into a full ISO date string
    let combinedDateTime: Date | null = null;
    if (taskDueDate && taskTime) {
      combinedDateTime = new Date(`${taskDueDate}T${taskTime}`);
    }

    const taskData = {
      tasktitle: taskTitle,
      description,
      taskType,
      taskDueDate: combinedDateTime ? combinedDateTime.toISOString() : null,
      taskTime, // Keep as HH:mm string
      priority,
      status,
    };

    try {
      if (task) {
        // Edit Task
        await axiosInstance.put(`/tasks/${task.id}`, taskData);
      } else {
        // Add Task
        await axiosInstance.post("/tasks/addTask", taskData);
      }

      // Clear form
      setTaskTitle("");
      setDescription("");
      setTaskType("note");
      setTaskDueDate("");
      setTaskTime("23:59");
      setPriority("medium");
      setStatus("pending");

      refreshTasks();
      onClose();
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2 className="modal-title">{task ? "Edit Task" : "Add Task"}</h2>
          <TaskForm
            taskTitle={taskTitle}
            description={description}
            taskType={taskType}
            taskDueDate={taskDueDate}
            taskTime={taskTime}
            priority={priority}
            status={status}
            setTaskTitle={setTaskTitle}
            setDescription={setDescription}
            setTaskType={setTaskType}
            setTaskDueDate={setTaskDueDate}
            setTaskTime={setTaskTime}
            setPriority={setPriority}
            setStatus={setStatus}
            handleSubmit={handleSubmit}
            onClose={onClose}
          />
        </div>
      </div>
    )
  );
};

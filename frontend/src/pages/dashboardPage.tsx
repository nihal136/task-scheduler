import React, { useEffect, useState } from "react";
import axiosInstance from "../api/apiInstance";
import { TaskList } from "../components/dashboardPageUI";
import { TaskModal } from "./taskModal";
import "../styles/dashboard.css";

export interface Task {
  id: number;
  tasktitle: string;
  description: string;
  taskType: string;
  taskDueDate?: string;
  taskTime?: string;
  priority: string;
  status: string;
}

export const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

  const fetchTasks = async () => {
    try {
      const allTasks = await axiosInstance.get("/tasks");
      setTasks(allTasks.data);
    } catch (error) {
      console.log("Error Fetching Tasks :", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      fetchTasks(); // Refresh after delete
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const openModal = (task?: Task) => {
    setSelectedTask(task || undefined);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(undefined);
  };

  const openEditModal = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const refreshTasks = () => {
    fetchTasks();
    closeModal();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h1>Dashboard</h1>
        <div className="nav-item">My Tasks</div>
        <div className="footer"></div>
      </div>

      <div className="task-list-section">
        <button className="add-task-btn-floating" onClick={() => openModal()}>
          +
        </button>
        <TaskModal
          isOpen={isModalOpen}
          onClose={closeModal}
          task={selectedTask}
          refreshTasks={refreshTasks}
        />
        <TaskList
          tasks={tasks}
          onDelete={handleDelete}
          refreshTasks={fetchTasks}
          openEditModal={openEditModal}
        />
      </div>
    </div>
  );
};

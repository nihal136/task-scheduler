import React, { useEffect, useState } from "react";
import axiosInstance from "../api/apiInstance";
import { TaskList } from "../components/dashboardPageUI";
import "../styles/dashboard.css";
import { TaskModal } from "./taskModal";

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
      const sortedTasks = allTasks.data.sort((a: Task, b: Task) => {
        const priorityOrder: { [key: string]: number } = {
          low: 1,
          medium: 2,
          high: 3,
        };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
      setTasks(sortedTasks);
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
    <div>
      <button className="add-task-btn" onClick={() => openModal()}>
        Add Task
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
  );
};

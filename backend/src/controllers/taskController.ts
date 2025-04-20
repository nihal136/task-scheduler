import { Request, Response } from "express";
import { taskRepository } from "../repositories/taskRepository";

export const createTask = async (req: Request, res: Response) => {
  try {
    const {
      tasktitle,
      taskType,
      description,
      taskDueDate,
      taskTime,
      priority,
    } = req.body;
    const userid = (req.user as any).id;

    const task = taskRepository.create({
      tasktitle,
      taskType,
      description,
      userid,
      taskDueDate,
      taskTime,
      priority,
    });
    await taskRepository.save(task);

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userid = (req.user as any).id;

    const tasks = await taskRepository.find({ where: { userid } });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      tasktitle,
      taskType,
      description,
      taskDueDate,
      taskTime,
      priority,
      status,
    } = req.body;
    const userid = (req.user as any).id;

    const task = await taskRepository.findOne({
      where: { id: Number(id), userid },
    });
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.tasktitle = tasktitle || task.tasktitle;
    task.taskType = taskType || task.taskType;
    task.description = description || task.description;
    task.taskDueDate = taskDueDate || task.taskDueDate;
    task.taskTime = taskTime || task.taskTime;
    task.priority = priority || task.priority;
    task.status = status || task.status;

    const updatedTask = await taskRepository.save(task);

    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userid = (req.user as any).id;

    const task = await taskRepository.findOne({
      where: { id: Number(id), userid },
    });
    if (!task) return res.status(404).json({ message: "Task not found" });

    await taskRepository.remove(task);

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

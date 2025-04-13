import { DataBaseInitializer } from "../database/data-source";
import { Task } from "../entities/Task.entity";

export const taskRepository = DataBaseInitializer.getRepository(Task);

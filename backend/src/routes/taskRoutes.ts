import { Router } from "express";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/taskController";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticateToken, createTask);
router.get("/", authenticateToken, getTasks);
router.put("/:id", authenticateToken, updateTask)
router.delete("/:id", authenticateToken, deleteTask)
export default router;

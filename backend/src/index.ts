import { DataBaseInitializer } from "./database/data-source";
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT;
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

DataBaseInitializer.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(port, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

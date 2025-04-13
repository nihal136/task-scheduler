import { DataSource } from "typeorm";
import "reflect-metadata";
import * as dotenv from "dotenv";

import { User } from "../entities/User.entity";
import { Task } from "../entities/Task.entity";

dotenv.config();

export const DataBaseInitializer = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [User, Task],
  migrations: ["src/database/migrations/*.ts"],
});

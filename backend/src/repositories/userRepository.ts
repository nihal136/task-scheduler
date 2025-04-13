import { DataBaseInitializer } from "../database/data-source";
import { User } from "../entities/User.entity";

export const userRepository = DataBaseInitializer.getRepository(User);

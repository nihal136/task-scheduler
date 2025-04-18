import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/userRepository";
import { generateToken } from "../helper";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await userRepository.findOne({ where: { email } });
    if (userExist) return res.status(400).json({ message: "Email in use" });

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const user = userRepository.create({ name, email, password: hashPassword });
    await userRepository.save(user);

    return res.status(201).json({ message: "User created succesfully" });
  } catch (err) {
    console.log("Error :", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findOne({ where: { email } });

    if (!user) return res.status(401).json({ message: "User Does not Exist" });

    const passCheck = await bcrypt.compare(password, user.password);
    if (!passCheck)
      return res.status(401).json({ message: "Invalid Details" });

    const token = generateToken({ id: user.id, email: user.email });

    return res.status(200).json({
      message: "Login Successful",
      token: token,
    });
  } catch (err) {
    console.log("Error :", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

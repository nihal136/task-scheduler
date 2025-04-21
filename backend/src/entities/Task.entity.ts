import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User.entity";

@Entity({ name: "tasks" })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  tasktitle: string;

  @Column({ nullable: false })
  userid: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userid" })
  user: User;

  @Column({
    type: "enum",
    enum: ["note", "reminder"],
    nullable: false,
  })
  taskType: "note" | "reminder";

  @Column({ type: "timestamp", nullable: true })
  taskDueDate: Date;

  @Column({ type: "time", nullable: true })
  taskTime: string;

  @Column({
    type: "enum",
    enum: ["low", "medium", "high"],
    default: "medium",
  })
  priority: "low" | "medium" | "high";

  @Column({
    type: "enum",
    enum: ["pending", "completed"],
    default: "pending",
  })
  status: "pending" | "completed";

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

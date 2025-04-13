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

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
    onDelete: "CASCADE",
  }) // Define the many-to-one relationship
  @JoinColumn({ name: "userid" }) // Specify the foreign key column name
  user: User;

  @Column({
    type: "enum",
    enum: ["note", "reminder"],
    nullable: false,
  })
  type: "note" | "reminder";

  @Column({ default: false })
  isCompleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import { Column, Entity, ManyToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";

@Entity()
export class Notification extends AbstractEntity {
  @Column()
  message: string;

  // @ManyToOne(()=> Employee,(employee)=>employee.notification)
}

import { Column, Entity, ManyToOne, OneToMany, Unique } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Referal from "./referal.entity";
import Position from "./position.entity";

@Entity()
class Employee extends AbstractEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  experience: string;

  @Column()
  password: string;

  @ManyToOne(() => Position, (position) => position.employee)
  position: Position;

  @OneToMany(() => Referal, (referal) => referal.employee)
  referal: Referal[];
}

export default Employee;

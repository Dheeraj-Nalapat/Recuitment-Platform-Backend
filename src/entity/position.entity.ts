import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import JobOpening from "./jobOpening.entity";
import Employee from "./employee.entity";

@Entity()
class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => JobOpening, (jobOpening) => jobOpening.position)
  jobOpening: JobOpening[];

  @OneToMany(() => Employee, (employee) => employee.position)
  employee: Employee;
}

export default Position;

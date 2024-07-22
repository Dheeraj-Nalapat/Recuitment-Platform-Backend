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
import AbstractEntity from "./abstract.entity";

@Entity()
class Position extends AbstractEntity {
  
  @Column()
  name: string;

  @OneToMany(() => JobOpening, (jobOpening) => jobOpening.position)
  jobOpening: JobOpening[];

  @OneToMany(() => Employee, (employee) => employee.position)
  employee: Employee[];
}

export default Position;

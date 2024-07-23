import {
  Column,
  Entity,
  OneToMany,
} from "typeorm";
import JobOpening from "./jobOpening.entity";
import Employee from "./employee.entity";
import AbstractEntity from "./abstract.entity";

@Entity()
class Position extends AbstractEntity {
  
  @Column()
  name: string;

  @OneToMany(() => JobOpening, (jobOpening) => jobOpening.position)
  jobOpenings: JobOpening[];

  @OneToMany(() => Employee, (employee) => employee.position)
  employees: Employee[];
}

export default Position;

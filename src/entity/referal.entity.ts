import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Candidate from "./candidate.entity";
import JobOpenings from "./jobOpening.entity";
import Employee from "./employee.entity";

@Entity()
class Referal extends AbstractEntity {
  @Column()
  state: string;

  @Column()
  acceptDate: Date;

  @Column()
  bonusGiven: boolean;

  @ManyToOne(() => Employee, (employee) => employee.referal)
  employee: Employee;

  @ManyToOne(() => Candidate, (candidate) => candidate.referal)
  candidate: Candidate;

  @ManyToOne(() => JobOpenings, (jobOpenings) => jobOpenings.referal)
  jobOpening: JobOpenings;
}

export default Referal;

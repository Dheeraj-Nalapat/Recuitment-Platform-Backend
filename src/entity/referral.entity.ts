import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Candidate from "./candidate.entity";
import JobOpenings from "./jobOpening.entity";
import Employee from "./employee.entity";

@Entity()
class Referral extends AbstractEntity {
  @Column()
  state: string;

  @Column({ nullable: true })
  acceptDate: Date;

  @Column()
  bonusGiven: boolean;

  @ManyToOne(() => Employee, (employee) => employee.referral)
  employee: Employee;

  @ManyToOne(() => Candidate, (candidate) => candidate.referral)
  candidate: Candidate;

  @ManyToOne(() => JobOpenings, (jobOpenings) => jobOpenings.referral)
  jobOpening: JobOpenings;
}

export default Referral;

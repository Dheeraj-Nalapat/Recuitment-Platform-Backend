import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Candidate from "./candidate.entity";
import JobOpening from "./jobOpening.entity";
import Employee from "./employee.entity";
import { Status } from "../utils/status.enum";

@Entity()
class Referral extends AbstractEntity {
  @Column()
  status: Status;

  @Column({ nullable: true })
  acceptDate: Date;

  @Column()
  bonusGiven: boolean;

  @ManyToOne(() => Employee, (employee) => employee.referrals)
  referrer: Employee;

  @ManyToOne(() => Candidate, (candidate) => candidate.referrals)
  referree: Candidate;

  @ManyToOne(() => JobOpening, (jobOpenings) => jobOpenings.referrals)
  jobOpening: JobOpening;
}

export default Referral;

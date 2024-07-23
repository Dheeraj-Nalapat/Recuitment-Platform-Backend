import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Referral from "./referral.entity";

@Entity()
class Candidate extends AbstractEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  experience: string;

  @Column()
  resume: string;

  @Column()
  skills: string[];

  @OneToMany(() => Referral, (referral) => referral.referree)
  referrals: Referral[];
}

export default Candidate;

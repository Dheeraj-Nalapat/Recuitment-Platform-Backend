import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import AbstractEntity from "./abstract.entity";
import referral from "./referral.entity";

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

  @Column("simple-json")
  skill: { name: string }[];

  @OneToMany(() => referral, (referral) => referral.candidate)
  referral: referral[];
}

export default Candidate;

import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import AbstractEntity from "./abstract.entity";
import exp from "constants";
import Referal from "./referal.entity";

@Entity()
class Candidate extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  experience: number;

  @Column()
  resume: string;

  @Column()
  skill: JSON;

  @OneToMany(() => Referal, (referal) => referal.candidate)
  referal: Referal[];
}

export default Candidate;

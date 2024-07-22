import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Referal from "./referal.entity";

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

  @OneToMany(() => Referal, (referal) => referal.candidate)
  referal: Referal[];
}

export default Candidate;

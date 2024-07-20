import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Position from "./position.entity";
import Referal from "./referal.entity";

@Entity()
class JobOpening extends AbstractEntity {
  @Column()
  positionId;

  @Column()
  description: string;

  @Column()
  skill: JSON;

  @Column()
  location: string;

  @Column()
  experience: string;

  @Column()
  noOfOpening: number;

  @Column()
  active: boolean;

  @ManyToOne(() => Position, (position) => position.jobOpening)
  position: Position;

  @OneToMany(() => Referal, (referal) => referal.jobOpening)
  referal: Referal[];
}

export default JobOpening;

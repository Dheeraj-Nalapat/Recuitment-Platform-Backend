import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Position from "./position.entity";
import Referal from "./referal.entity";

@Entity()
class JobOpening extends AbstractEntity {
  @Column()
  positionId;

  @Column("simple-json")
  description: {
    responsibility: { point: string }[];
    qualification: { point: string }[];
  };

  @Column("simple-json")
  skill: { name: string }[];

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

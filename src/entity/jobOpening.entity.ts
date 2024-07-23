import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Position from "./position.entity";
import Referral from "./referral.entity";

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
  0;

  @Column()
  noOfOpening: number;

  @Column()
  active: boolean;

  @ManyToOne(() => Position, (position) => position.jobOpening)
  position: Position;

  @OneToMany(() => Referral, (referral) => referral.jobOpening)
  referral: Referral[];
}

export default JobOpening;

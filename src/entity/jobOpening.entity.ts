import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Position from "./position.entity";
import Referral from "./referral.entity";

@Entity()
class JobOpening extends AbstractEntity {

  @Column("simple-json")
  description: {
    responsibility: string[];
    qualification: string [];
  };

  @Column("simple-array")
  skills : string [];

  @Column()
  location: string;

  @Column()
  experience: string;

  @Column()
  noOfOpening: number;

  @Column()
  active: boolean;

  @ManyToOne(() => Position, (position) => position.jobOpenings)
  position: Position;

  @OneToMany(() => Referral, (referral) => referral.jobOpening)
  referrals: Referral[];
}

export default JobOpening;

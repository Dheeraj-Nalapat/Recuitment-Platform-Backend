import { Column, Entity, ManyToOne, OneToMany, Unique } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Referral from "./referral.entity";
import Position from "./position.entity";

@Entity()
class Employee extends AbstractEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  experience: string;

  @Column()
  password: string;

  @ManyToOne(() => Position, (position) => position.employees)
  position: Position;

  @OneToMany(() => Referral, (referral) => referral.referrer)
  referrals: Referral[];
}

export default Employee;

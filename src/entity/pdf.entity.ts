import { Column, Entity } from "typeorm";
import AbstractEntity from "./abstract.entity";

@Entity()
export class PdfDetails extends AbstractEntity {
  @Column()
  filename: string;

  @Column()
  originalname: string;

  @Column()
  path: string;

  @Column()
  size: number;
}

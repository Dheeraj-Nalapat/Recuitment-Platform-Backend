import { FindOptionsWhere, Repository } from "typeorm";
import Position from "../entity/position.entity";

class PositionRepository {
  constructor(private repository: Repository<Position>) {}

  find = async () => {
    return this.repository.find({ relations: ["employees", "jobOpenings"] });
  };

  findOneBy = async (filter: FindOptionsWhere<Position>) => {
    return this.repository.findOne({
      where: filter,
      relations: ["employees", "jobOpenings"],
    });
  };

  save = async (position: Position): Promise<Position> => {
    return this.repository.save(position);
  };

  softDelete = async (id: number): Promise<void> => {
    await this.repository.softDelete({ id });
  };

  softRemove = async (id: number): Promise<void> => {
    await this.repository.softRemove({ id });
  };
}

export default PositionRepository;

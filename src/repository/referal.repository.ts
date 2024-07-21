import { Repository } from "typeorm";
import Referal from "../entity/referal.entity";

class ReferalRepository {
  constructor(private repository: Repository<Referal>) {}

  find = async (p0: { where: { employee: { id: number; }; }; }) => {
    return this.repository.find({
      relations: ["employee", "jobOpening", "candidate"],
    });
  };

  findOneBy = async (filter: Partial<Referal>) => {
    return this.repository.findOne({
      where: filter,
      relations: ["employee", "jobOpening", "candidate"],
    });
  };

  save = async (referal: Referal): Promise<Referal> => {
    return this.repository.save(referal);
  };

  softDelete = async (id: number): Promise<void> => {
    await this.repository.softDelete({ id });
  };

  softRemove = async (id: number): Promise<void> => {
    await this.repository.softRemove({ id });
  };
}

export default ReferalRepository;

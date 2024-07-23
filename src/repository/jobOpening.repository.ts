import { FindOptionsWhere, Repository } from "typeorm";
import JobOpening from "../entity/jobOpening.entity";
import Position from "../entity/position.entity";

class JobOpeningRepository {
  constructor(private repository: Repository<JobOpening>) {}

  find = async () => {
    return this.repository.find({ relations: ["position", "referrals"] });
  };

  findOneBy = async (filter: FindOptionsWhere<JobOpening>) => {
    return this.repository.findOne({
      where: filter,
      relations: ["position", "referrals"],
    });
  };

  save = async (jobOpening: JobOpening): Promise<JobOpening> => {
    return this.repository.save(jobOpening);
  };

  softDelete = async (id: number): Promise<void> => {
    await this.repository.softDelete({ id });
  };

  softRemove = async (id: number): Promise<void> => {
    await this.repository.softRemove({ id });
  };
}

export default JobOpeningRepository;

import { Repository } from "typeorm";
import JobOpening from "../entity/jobOpening.entity";

class JobOpeningRepository {
  constructor(private repository: Repository<JobOpening>) {}

  find = async () => {
    return this.repository.find({ relations: ["position", "referral"] });
  };

  findOneBy = async (filter: Partial<JobOpening>) => {
    return this.repository.findOne({
      where: filter,
      relations: ["position", "referral"],
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

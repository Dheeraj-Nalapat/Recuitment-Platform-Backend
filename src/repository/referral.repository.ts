import { Repository } from "typeorm";
import referral from "../entity/referral.entity";

class referralRepository {
  constructor(private repository: Repository<referral>) {}

  find = async (filter: any) => {
    return this.repository.find({
      where: filter,
      relations: ["employee", "jobOpening", "candidate"],
    });
  };

  findOneBy = async (filter: Partial<referral>) => {
    return this.repository.findOne({
      relations: ["employee", "jobOpening", "candidate"],
    });
  };

  save = async (referral: referral): Promise<referral> => {
    return this.repository.save(referral);
  };

  softDelete = async (id: number): Promise<void> => {
    await this.repository.softDelete({ id });
  };

  softRemove = async (id: number): Promise<void> => {
    await this.repository.softRemove({ id });
  };
}

export default referralRepository;

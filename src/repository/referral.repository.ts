import { Repository } from "typeorm";
import Referral from "../entity/referral.entity";

class referralRepository {
  constructor(private repository: Repository<Referral>) {}

  find = async (filter: any) => {
    return this.repository.find({
      where: filter,
      relations: ["referrer", "jobOpening", "referree"],
    });
  };

  findOneBy = async (filter: Partial<Referral>) => {
    return this.repository.findOne({
      relations: ["referrer", "jobOpening", "referree"],
    });
  };

  save = async (referral: Referral): Promise<Referral> => {
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

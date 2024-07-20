import { Repository } from "typeorm";
import Candidate from "../entity/candidate.entity";

class CandidateRepository {
  constructor(private repository: Repository<Candidate>) {}

  find = async () => {
    return this.repository.find({ relations: { referal: true } });
  };

  findOneBy = async (filter: Partial<Candidate>) => {
    return this.repository.findOne({
      where: filter,
      relations: { referal: true },
    });
  };

  save = async (candidate: Candidate) => {
    return this.repository.save(candidate);
  };

  softRemove = async (id: number) => {
    return this.repository.softRemove({ id });
  };
}

export default CandidateRepository;

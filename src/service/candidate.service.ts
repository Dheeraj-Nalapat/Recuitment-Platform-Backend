import Candidate from "../entity/candidate.entity";
import CandidateRepository from "../repository/candidate.repository";
import { ErrorCodes } from "../utils/error.code";

class CandidateService {
  constructor(
    private candidateRepository: CandidateRepository,
    private candidateService: CandidateService
  ) {}

  getAllCandidate = async () => {
    return this.candidateRepository.find();
  };
  getCandidateById = async (id: number) => {
    return this.candidateRepository.findOneBy({ id });
  };

  getCandidateByName = async (name: string) => {
    return this.candidateRepository.findOneBy({ name });
  };
  createCandidate = async (
    name: string,
    email: string,
    experience: string,
    resume: string,
    skill: { name: string[] }
  ) => {
    const newCandidate = new Candidate();
    newCandidate.name = name;
    newCandidate.email = email;
    newCandidate.experience = experience;
    newCandidate.resume = resume;
    newCandidate.skill = skill;

    return this.candidateRepository.save(newCandidate);
  };

  updateCandidateById = async (
    id: number,
    name: string,
    email: string,
    experience: string,
    resume: string,
    skill: { name: string[] }
  ) => {
    const existingCandidate = await this.candidateRepository.findOneBy({ id });
    if (!existingCandidate) {
      throw ErrorCodes.CANDIDATE_WITH_ID_NOT_FOUND;
    }
    existingCandidate.name = name;
    existingCandidate.email = email;
    existingCandidate.experience = experience;
    existingCandidate.resume = resume;
    existingCandidate.skill = skill;

    return this.candidateRepository.save(existingCandidate);
  };

  deleteCandidate = async (id: number) => {
    const employee = await this.getCandidateById(id);

    if (!employee) {
      throw ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND;
    }
    return this.candidateRepository.softRemove(id);
  };
}

export default CandidateService;

import Referal from "../entity/referal.entity";
import CandidateRepository from "../repository/candidate.repository";
import EmployeeRepository from "../repository/employee.repository";
import JobOpeningRepository from "../repository/jobOpening.repository";
import ReferalRepository from "../repository/referal.repository";
import { ErrorCodes } from "../utils/error.code";

class ReferalService {
  constructor(
    private referalRepository: ReferalRepository,
    private candidateRepository: CandidateRepository,
    private employeeRepository: EmployeeRepository,
    private jobOpeningRepository: JobOpeningRepository
  ) {}

  getAllReferal = async () => {
    return this.referalRepository.find();
  };

  getAllReferalById = async (id: number) => {
    return this.referalRepository.findOneBy({ id });
  };

  getAllReferalByEmployee = async (id: number) => {};

  getAllReferalByCandidate = async () => {};

  getAllReferalByJobOpening = async () => {};

  createReferal = async (
    employeeId: number,
    candidateId: number,
    jobOpeningId: number
  ) => {
    const candidate = await this.candidateRepository.findOneBy({
      id: candidateId,
    });
    if (!candidate) {
      throw ErrorCodes.CANDIDATE_NOT_FOUND;
    }
    const employee = await this.employeeRepository.findOneBy({id: employeeId})
    const jobOpening = await this.jobOpeningRepository.findOneBy({id: jobOpeningId});
    const newReferal = new Referal()
    newReferal.jobOpening = jobOpening;
    newReferal.employee = employee;
    newReferal.candidate = candidate;
    return this.referalRepository.save(newReferal);
  };

  updateReferal = async () => {};

  deleteReferal = async () => {};
}

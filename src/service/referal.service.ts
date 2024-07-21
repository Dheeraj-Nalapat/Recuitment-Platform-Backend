import Referal from "../entity/referal.entity";
import CandidateRepository from "../repository/candidate.repository";
import EmployeeRepository from "../repository/employee.repository";
import JobOpeningRepository from "../repository/jobOpening.repository";
import ReferalRepository from "../repository/referal.repository";
import { ErrorCodes } from "../utils/error.code";

class ReferalService {
  constructor(private referalRepository: ReferalRepository) {}

  getAllReferals = async () => {
    return this.referalRepository.find();
  };

  getReferalById = async (id: number) => {
    const referal = await this.referalRepository.findOneBy({ id });
    if (!referal) {
      throw ErrorCodes.REFERAL_WITH_ID_NOT_FOUND;
    }
    return referal;
  };

  getAllReferalsByEmployee = async (employeeId: number) => {
    const employee = await this.employeeRepository.findOneBy({ id: employeeId });
    if (!employee) {
      throw ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND;
    }
    return this.referalRepository.find({ where: { employee} });
  };

  getAllReferalsByCandidate = async (candidateId: number) => {
    const candidate = await this.candidateRepository.findOneBy({ id: candidateId });
    if (!candidate) {
      throw ErrorCodes.CANDIDATE_WITH_ID_NOT_FOUND;
    }
    return this.referalRepository.find({ where: { candidate } });
  };

  getAllReferalsByJobOpening = async (jobOpeningId: number) => {
    const jobOpening = await this.jobOpeningRepository.findOneBy({ id: jobOpeningId });
    if (!jobOpening) {
      throw ErrorCodes.JOB_OPENING_WITH_ID_NOT_FOUND;
    }
    return this.referalRepository.find({ where: { jobOpening } });
  };

  createReferal = async () => {};

  updateReferal = async () => {};

  deleteReferal = async (id: number) => {
    const referal = await this.getReferalById(id);
    if (!referal) {
      throw ErrorCodes.REFERAL_WITH_ID_NOT_FOUND;
    }
    return this.referalRepository.softRemove(id);
  };
}

export default ReferalService;

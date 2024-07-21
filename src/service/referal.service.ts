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

  getAllReferals = async () => {
    return this.referalRepository.find({
      where: {},
      relations: ["employee", "jobOpening", "candidate"],
    });
  };

  getReferalById = async (id: number) => {
    const referal = await this.referalRepository.findOneBy({ id });
    if (!referal) {
      throw ErrorCodes.REFERAL_WITH_ID_NOT_FOUND;
    }
    return referal;
  };

  getAllReferalsByEmployee = async (employeeId: number) => {
    const employee = await this.employeeRepository.findOneBy({
      id: employeeId,
    });
    if (!employee) {
      throw ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND;
    }
    return this.referalRepository.find({ where: { employee } });
  };

  getAllReferalsByCandidate = async (candidateId: number) => {
    const candidate = await this.candidateRepository.findOneBy({
      id: candidateId,
    });
    if (!candidate) {
      throw ErrorCodes.CANDIDATE_WITH_ID_NOT_FOUND;
    }
    return this.referalRepository.find({ where: { candidate } });
  };

  getAllReferalsByJobOpening = async (jobOpeningId: number) => {
    const jobOpening = await this.jobOpeningRepository.findOneBy({
      id: jobOpeningId,
    });
    if (!jobOpening) {
      throw ErrorCodes.JOB_OPENING_WITH_ID_NOT_FOUND;
    }
    return this.referalRepository.find({ where: { jobOpening } });
  };

  createReferal = async (
    state: string,
    bonusGiven: boolean,
    employeeId: number,
    jobOpeningId: number,
    candidateId: number
  ) => {
    const employee = await this.employeeRepository.findOneBy({
      id: employeeId,
    });
    if (!employee) {
      throw ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND;
    }

    const jobOpening = await this.jobOpeningRepository.findOneBy({
      id: jobOpeningId,
    });
    if (!jobOpening) {
      throw ErrorCodes.JOB_OPENING_WITH_ID_NOT_FOUND;
    }

    const candidate = await this.candidateRepository.findOneBy({
      id: candidateId,
    });
    if (!candidate) {
      throw ErrorCodes.CANDIDATE_WITH_ID_NOT_FOUND;
    }

    const newReferal = new Referal();
    newReferal.state = state;
    newReferal.bonusGiven = bonusGiven;
    newReferal.employee = employee;
    newReferal.jobOpening = jobOpening;
    newReferal.candidate = candidate;

    return this.referalRepository.save(newReferal);
  };

  updateReferal = async (id: number, state: string, bonusGiven: boolean) => {
    const existingReferal = await this.getReferalById(id);
    if (!existingReferal) {
      throw ErrorCodes.REFERAL_WITH_ID_NOT_FOUND;
    }
    existingReferal.state = state;
    existingReferal.bonusGiven = bonusGiven;

    return this.referalRepository.save(existingReferal);
  };

  deleteReferal = async (id: number) => {
    const referal = await this.getReferalById(id);
    if (!referal) {
      throw ErrorCodes.REFERAL_WITH_ID_NOT_FOUND;
    }
    return this.referalRepository.softRemove(id);
  };
}

export default ReferalService;

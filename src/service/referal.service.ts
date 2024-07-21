import Referal from "../entity/referal.entity";
import CandidateRepository from "../repository/candidate.repository";
import EmployeeRepository from "../repository/employee.repository";
import JobOpeningRepository from "../repository/jobOpening.repository";
import ReferalRepository from "../repository/referal.repository";
import { ErrorCodes } from "../utils/error.code";
import CandidateService from "./candidate.service";
import EmployeeService from "./employee.service";
import JobOpeningService from "./jobOpening.service";

class ReferalService {
  constructor(
    private referalRepository: ReferalRepository,
    private employeeService: EmployeeService,
    private candidateService: CandidateService,
    private jobOpeningService: JobOpeningService
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
    const employee = await this.employeeService.getEmployeeById(employeeId);
    if (!employee) {
      throw ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND;
    }
    return this.referalRepository.find({ where: { employee } });
  };

  getAllReferalsByCandidate = async (candidateId: number) => {
    const candidate = await this.candidateService.getCandidateById(candidateId);
    if (!candidate) {
      throw ErrorCodes.CANDIDATE_WITH_ID_NOT_FOUND;
    }
    return this.referalRepository.find({ where: { candidate } });
  };

  getAllReferalsByJobOpening = async (jobOpeningId: number) => {
    const jobOpening = await this.jobOpeningService.getJobOpeningById(
      jobOpeningId
    );
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
    const employee = await this.employeeService.getEmployeeById(employeeId);
    if (!employee) {
      throw ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND;
    }

    const jobOpening = await this.jobOpeningService.getJobOpeningById(
      jobOpeningId
    );
    if (!jobOpening) {
      throw ErrorCodes.JOB_OPENING_WITH_ID_NOT_FOUND;
    }

    const candidate = await this.candidateService.getCandidateById(candidateId);
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

import Candidate from "../entity/candidate.entity";
import Referal from "../entity/referal.entity";
import ReferalRepository from "../repository/referal.repository";
import { ErrorCodes } from "../utils/error.code";
import CandidateService from "./candidate.service";
import EmployeeService from "./employee.service";
import JobOpeningService from "./jobOpening.service";
import { differenceInMonths } from "date-fns";

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

  checkPreviousReferal = async (
    jobId: number,
    employeeId: number,
    email: string
  ) => {
    let result = {
      candidateExists: false,
      alreadyApplied: false,
      employeeReferalValid: true,
      candidate: null,
    };
    const jobOpeningEntity = await this.jobOpeningService.getJobOpeningById(
      jobId
    );
    const existingCandidate = await this.candidateService.getCandidateByEmail(
      email
    );
    if (!existingCandidate) {
      return result;
    } else {
      result.candidateExists = true;
    }
    const candidatesReferal = jobOpeningEntity.referal.filter(
      (referal) => referal.candidate.id == existingCandidate.id
    );
    if (candidatesReferal.length) {
      result.alreadyApplied = true;
      return result;
    }
    const employeeReferal = await this.getAllReferalsByEmployee(employeeId);
    const positionReferal = employeeReferal.filter(
      (referal) => referal.jobOpening.positionId == jobOpeningEntity.positionId
    );
    for (let i = 0; i < positionReferal.length; i++) {
      let currentDate = new Date();
      let referalDate = new Date(positionReferal[i].createdAt);
      let monthsDifferance = differenceInMonths(currentDate, referalDate);
      if (monthsDifferance < 6) {
        result.employeeReferalValid = false;
        return result;
      }
    }
    return result;
  };

  //TODO : create candidate
  createReferal = async (
    state: string,
    bonusGiven: boolean,
    employeeId: number,
    jobOpeningId: number,
    name: string,
    email: string,
    experience: string,
    resume: string,
    skill: { name: string }[]
  ) => {
    const employee = await this.employeeService.getEmployeeByIdWithPassword(
      employeeId
    );
    if (!employee) {
      throw ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND;
    }

    const jobOpening = await this.jobOpeningService.getJobOpeningById(
      jobOpeningId
    );
    if (!jobOpening) {
      throw ErrorCodes.JOB_OPENING_WITH_ID_NOT_FOUND;
    }

    const newCandidate = new Candidate();
    const candidate = await this.candidateService.getCandidateByEmail(email);
    if (!candidate) {
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

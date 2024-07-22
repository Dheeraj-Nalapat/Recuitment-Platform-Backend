import Candidate from "../entity/candidate.entity";
import referral from "../entity/referral.entity";
import referralRepository from "../repository/referral.repository";
import { ErrorCodes } from "../utils/error.code";
import CandidateService from "./candidate.service";
import EmployeeService from "./employee.service";
import JobOpeningService from "./jobOpening.service";
import { differenceInMonths } from "date-fns";

class referralService {
  constructor(
    private referralRepository: referralRepository,
    private employeeService: EmployeeService,
    private candidateService: CandidateService,
    private jobOpeningService: JobOpeningService
  ) {}

  getAllReferrals = async () => {
    return this.referralRepository.find({
      where: {},
    });
  };

  getReferralById = async (id: number) => {
    const referral = await this.referralRepository.findOneBy({ id });
    if (!referral) {
      throw ErrorCodes.referral_WITH_ID_NOT_FOUND;
    }
    return referral;
  };

  getAllReferralsByEmployee = async (employeeId: number) => {
    const employee = await this.employeeService.getEmployeeById(employeeId);
    if (!employee) {
      throw ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND;
    }
    return this.referralRepository.find({ where: { employee } });
  };

  getAllReferralsByCandidate = async (candidateId: number) => {
    const candidate = await this.candidateService.getCandidateById(candidateId);
    if (!candidate) {
      throw ErrorCodes.CANDIDATE_WITH_ID_NOT_FOUND;
    }
    return this.referralRepository.find({ where: { candidate } });
  };

  getAllReferralsByJobOpening = async (jobOpeningId: number) => {
    const jobOpening = await this.jobOpeningService.getJobOpeningById(
      jobOpeningId
    );
    if (!jobOpening) {
      throw ErrorCodes.JOB_OPENING_WITH_ID_NOT_FOUND;
    }
    return this.referralRepository.find({ where: { jobOpening } });
  };

  checkPreviousReferral = async (
    jobId: number,
    employeeId: number,
    email: string
  ) => {
    let result = {
      candidateExists: false,
      alreadyApplied: false,
      employeereferralValid: true,
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
    const candidatesreferral = jobOpeningEntity.referral.filter(
      (referral) => referral.candidate.id == existingCandidate.id
    );
    if (candidatesreferral.length) {
      result.alreadyApplied = true;
      return result;
    }
    const employeereferral = await this.getAllReferralsByEmployee(employeeId);
    const positionreferral = employeereferral.filter(
      (referral) =>
        referral.jobOpening.positionId == jobOpeningEntity.positionId
    );
    for (let i = 0; i < positionreferral.length; i++) {
      let currentDate = new Date();
      let referralDate = new Date(positionreferral[i].createdAt);
      let monthsDifferance = differenceInMonths(currentDate, referralDate);
      if (monthsDifferance < 6) {
        result.employeereferralValid = false;
        return result;
      }
    }
    return result;
  };

  //TODO : create candidate
  createReferral = async (
    state: string,
    bonusGiven: boolean,
    employeeId: number,
    jobOpeningId: number,
    // name: string,
    email: string,
    // experience: string,
    // resume: string,
    // skill: { name: string }[]
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

    const newreferral = new referral();
    newreferral.state = state;
    newreferral.bonusGiven = bonusGiven;
    newreferral.employee = employee;
    newreferral.jobOpening = jobOpening;
    newreferral.candidate = candidate;
    return this.referralRepository.save(newreferral);
  };

  updateReferral = async (id: number, state: string, bonusGiven: boolean) => {
    const existingReferral = await this.getReferralById(id);
    if (!existingReferral) {
      throw ErrorCodes.REFERRAL_WITH_ID_NOT_FOUND;
    }
    existingReferral.state = state;
    existingReferral.bonusGiven = bonusGiven;

    return this.referralRepository.save(existingReferral);
  };

  deleteReferral = async (id: number) => {
    const referral = await this.getReferralById(id);
    if (!referral) {
      throw ErrorCodes.referral_WITH_ID_NOT_FOUND;
    }
    return this.referralRepository.softRemove(id);
  };
}

export default referralService;

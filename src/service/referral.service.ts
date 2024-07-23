import exp from "constants";
import Candidate from "../entity/candidate.entity";
import Referral from "../entity/referral.entity";
import ReferralRepository from "../repository/referral.repository";
import { ErrorCodes } from "../utils/error.code";
import CandidateService from "./candidate.service";
import EmployeeService from "./employee.service";
import JobOpeningService from "./jobOpening.service";
import { differenceInMonths } from "date-fns";

class ReferralService {
  constructor(
    private referralRepository: ReferralRepository,
    private employeeService: EmployeeService,
    private candidateService: CandidateService,
    private jobOpeningService: JobOpeningService
  ) {}

  getAllReferrals = async () => {
    return this.referralRepository.find({});
  };

  getReferralById = async (id: number) => {
    const referral = await this.referralRepository.findOneBy({ id });
    if (!referral) {
      throw ErrorCodes.REFERRAL_WITH_ID_NOT_FOUND;
    }
    return referral;
  };

  getAllReferralsByEmployee = async (employeeId: number) => {
    const employee = await this.employeeService.getEmployeeById(employeeId);
    if (!employee) {
      throw ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND;
    }
    return this.referralRepository.find({ employee });
  };

  getAllReferralsByCandidate = async (candidateId: number) => {
    const candidate = await this.candidateService.getCandidateById(candidateId);
    if (!candidate) {
      throw ErrorCodes.CANDIDATE_WITH_ID_NOT_FOUND;
    }
    return this.referralRepository.find({ candidate });
  };

  getAllReferralsByJobOpening = async (jobOpeningId: number) => {
    const jobOpening = await this.jobOpeningService.getJobOpeningById(
      jobOpeningId
    );
    if (!jobOpening) {
      throw ErrorCodes.JOB_OPENING_WITH_ID_NOT_FOUND;
    }
    return this.referralRepository.find({ jobOpening });
  };

  checkPreviousReferral = async (
    jobId: number,
    employeeId: number,
    email: string
  ) => {
    let result = {
      candidateExists: false,
      alreadyApplied: false,
      employeeReferralValid: true,
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
    const candidatesReferral = jobOpeningEntity.referral.filter(
      (referral) =>
        referral.candidate.id == existingCandidate.id &&
        referral.state != "Rejected"
    );
    if (candidatesReferral.length) {
      result.alreadyApplied = true;
      return result;
    }
    const rejectedCandidateReferral = jobOpeningEntity.referral.filter(
      (referral) =>
        referral.candidate.id == existingCandidate.id &&
        referral.state == "Rejected"
    );
    for (let i = 0; i < rejectedCandidateReferral.length; i++) {
      let currentDate = new Date();
      let referralDate = new Date(rejectedCandidateReferral[i].createdAt);
      let monthsDifferance = differenceInMonths(currentDate, referralDate);
      if (monthsDifferance < 6) {
        result.employeeReferralValid = false;
        return result;
      }
    }
    const employeeReferral = await this.getAllReferralsByEmployee(employeeId);
    const positionReferral = employeeReferral.filter(
      (referral) =>
        referral.jobOpening.positionId == jobOpeningEntity.positionId
    );
    for (let i = 0; i < positionReferral.length; i++) {
      let currentDate = new Date();
      let referralDate = new Date(positionReferral[i].createdAt);
      let monthsDifferance = differenceInMonths(currentDate, referralDate);
      if (monthsDifferance < 6) {
        result.employeeReferralValid = false;
        return result;
      }
    }
    return result;
  };

  createReferral = async (
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

    let newCandidate = new Candidate();
    const candidate = await this.candidateService.getCandidateByEmail(email);
    if (candidate) {
      newCandidate = { ...candidate };
      newCandidate.name = name;
      newCandidate.email = email;
      newCandidate.experience = experience;
      newCandidate.resume = resume;
      newCandidate.skill = skill;
      const result = await  this.candidateService.updateCandidateById(candidate.id,name,email,experience,resume,skill);
      console.log(result)
    }
    else{
      newCandidate.name = name;
      newCandidate.email = email;
      newCandidate.experience = experience;
      newCandidate.resume = resume;
      newCandidate.skill = skill;
      const result = await this.candidateService.createCandidate(newCandidate.name, newCandidate.email, newCandidate.experience, newCandidate.resume, newCandidate.skill);
      console.log(result)
    }
    const savedCandidate = await this.candidateService.getCandidateByEmail(email);


    const newreferral = new Referral();
    newreferral.state = state;
    newreferral.bonusGiven = bonusGiven;
    newreferral.employee = employee;
    newreferral.jobOpening = jobOpening;
    newreferral.candidate = savedCandidate;
    return this.referralRepository.save(newreferral);
  };

  updateReferral = async (id: number, state: string, bonusGiven: boolean) => {
    const existingReferral = await this.getReferralById(id);
    if (!existingReferral) {
      throw ErrorCodes.REFERRAL_WITH_ID_NOT_FOUND;
    }
    existingReferral.state = state;
    existingReferral.bonusGiven = bonusGiven;
    if (state == "Joined") {
      const updatedJobOpen = this.jobOpeningService.updateJobOpeningById(
        existingReferral.jobOpening.id,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        existingReferral.jobOpening.noOfOpening - 1 > 0
          ? existingReferral.jobOpening.noOfOpening - 1
          : 0,
        existingReferral.jobOpening.noOfOpening - 1 > 0 ? true : false
      );
      existingReferral.acceptDate = new Date();
    }
    return this.referralRepository.save(existingReferral);
  };

  deleteReferral = async (id: number) => {
    const referral = await this.getReferralById(id);
    if (!referral) {
      throw ErrorCodes.REFERRAL_WITH_ID_NOT_FOUND;
    }
    return this.referralRepository.softRemove(id);
  };
}

export default ReferralService;
import exp from "constants";
import Candidate from "../entity/candidate.entity";
import Referral from "../entity/referral.entity";
import ReferralRepository from "../repository/referral.repository";
import { ErrorCodes } from "../utils/error.code";
import CandidateService from "./candidate.service";
import EmployeeService from "./employee.service";
import JobOpeningService from "./jobOpening.service";
import { differenceInMonths } from "date-fns";
import NotificationsService from "./notification.service";
import { Status } from "../utils/status.enum";
import { ADMIN_ID } from "../utils/constants";

class ReferralService {
  constructor(
    private referralRepository: ReferralRepository,
    private employeeService: EmployeeService,
    private candidateService: CandidateService,
    private jobOpeningService: JobOpeningService,
    private notificationsService: NotificationsService
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
    const candidatesReferral = jobOpeningEntity.referrals.filter(
      (referral) =>
        referral.referree.id == existingCandidate.id &&
        referral.status != Status.declined
    );
    if (candidatesReferral.length) {
      result.alreadyApplied = true;
      return result;
    }
    const rejectedCandidateReferral = jobOpeningEntity.referrals.filter(
      (referral) =>
        referral.referree.id == existingCandidate.id &&
        referral.status == Status.declined
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
      (referral) => referral.jobOpening.position == jobOpeningEntity.position
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
    status: Status,
    bonusGiven: boolean,
    employeeId: number,
    jobOpeningId: number,
    name: string,
    email: string,
    experience: string,
    resume: string,
    skills: string[]
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
      newCandidate.skills = skills;
      const result = await this.candidateService.updateCandidateById(
        candidate.id,
        name,
        email,
        experience,
        resume,
        skills
      );
      console.log(result);
    } else {
      newCandidate.name = name;
      newCandidate.email = email;
      newCandidate.experience = experience;
      newCandidate.resume = resume;
      newCandidate.skills = skills;
      const result = await this.candidateService.createCandidate(
        newCandidate.name,
        newCandidate.email,
        newCandidate.experience,
        newCandidate.resume,
        newCandidate.skills
      );
      console.log(result);
    }
    const savedCandidate = await this.candidateService.getCandidateByEmail(
      email
    );

    const message = `Employee: ${employee.name} referred ${savedCandidate.name} for the position ${jobOpening.position.name}.`;
    const notification = await this.notificationsService.createNotification(
      ADMIN_ID,
      message
    );

    const newreferral = new Referral();
    newreferral.status = status;
    newreferral.bonusGiven = bonusGiven;
    newreferral.referrer = employee;
    newreferral.jobOpening = jobOpening;
    newreferral.referree = savedCandidate;
    return this.referralRepository.save(newreferral);
  };

  updateReferral = async (id: number, status: Status, bonusGiven: boolean) => {
    const existingReferral = await this.getReferralById(id);
    if (!existingReferral) {
      throw ErrorCodes.REFERRAL_WITH_ID_NOT_FOUND;
    }
    if (existingReferral.status != status) {
      let message = `Status of ${existingReferral.referree.name} with RefferalId:${existingReferral.id} was changed to ${status}.`;
      const stateChangeNotification =
        this.notificationsService.createNotification(
          existingReferral.referrer.id,
          message
        );
    }
    existingReferral.status = status;
    existingReferral.bonusGiven = bonusGiven;

    if (status == Status.accepted) {
      if (!(existingReferral.jobOpening.noOfOpening - 1)) {
        const message = `Number of the openings for the Job Opening with ID:${existingReferral.jobOpening.id} is met.`;
        const notification = await this.notificationsService.createNotification(
          ADMIN_ID,
          message
        );
      }
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

import JobOpening from "../entity/jobOpening.entity";
import JobOpeningRepository from "../repository/jobOpening.repository";
import { ErrorCodes } from "../utils/error.code";
import PositionService from "./position.service";

class JobOpeningService {
  constructor(
    private jobOpeningRepository: JobOpeningRepository,
    private positionService: PositionService
  ) {}

  getAllJobOpening = async () => {
    return this.jobOpeningRepository.find();
  };

  getJobOpeningById = async (id: number) => {
    return this.jobOpeningRepository.findOneBy({ id });
  };

  //TODO : write the getJobOpeningByPosition function
  getJobOpeningByPosition = async (Position: string) => {};

  createJobOpeningByPosition = async (
    position: string,
    description: string,
    location: string,
    skills: JSON,
    experience: string,
    noOfOpenings: number,
    active: boolean
  ) => {
    const newJobOpening = new JobOpening();

    const positionEntity = await this.positionService.getPositionByName(
      position
    );
    if (!positionEntity) {
      throw ErrorCodes.POSITION_WITH_ID_NOT_FOUND;
    }
    newJobOpening.position = positionEntity;
    newJobOpening.description = description;
    newJobOpening.location = location;
    newJobOpening.skill = skills;
    newJobOpening.experience = experience;
    newJobOpening.noOfOpening = noOfOpenings;
    newJobOpening.active = active;

    return this.jobOpeningRepository.save(newJobOpening);
  };

  updateJobOpeningById = async (
    id: number,
    position: string,
    description: string,
    location: string,
    skill: JSON,
    experience: string,
    noOfOpenings: number,
    active: boolean
  ) => {
    const existingJobOpening = await this.jobOpeningRepository.findOneBy({
      id,
    });
    if (!existingJobOpening) {
      throw ErrorCodes.JOBOPENING_WITH_ID_NOT_FOUND;
    }

    const positionEntity = await this.positionService.getPositionByName(
      position
    );
    if (!position && !positionEntity) {
      throw ErrorCodes.POSITION_WITH_ID_NOT_FOUND;
    }
    existingJobOpening.position = positionEntity;
    existingJobOpening.description = description;
    existingJobOpening.location = location;
    existingJobOpening.skill = skill;
    existingJobOpening.experience = experience;
    existingJobOpening.noOfOpening = noOfOpenings;
    existingJobOpening.active = active;

    return this.jobOpeningRepository.save(existingJobOpening);
  };

  deleteJobOpening = async (id: number) => {
    const jobOpening = await this.getJobOpeningById(id);

    if (!jobOpening) {
      throw ErrorCodes.JOBOPENING_WITH_ID_NOT_FOUND;
    }
    return this.jobOpeningRepository.softRemove(id);
  };
}
export default JobOpeningService;
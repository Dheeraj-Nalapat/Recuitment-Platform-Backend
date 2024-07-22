import { NextFunction, Request, Response, Router } from "express";
import JobOpeningService from "../service/jobOpening.service";
import { ErrorCodes } from "../utils/error.code";
import { plainToInstance } from "class-transformer";
import { CreateJobOpeningDto, UpdateJobOPeningDto } from "../dto/jobOpening.dto";
import { validate } from "class-validator";
import errorsToJson from "../utils/errorstojason";
import HttpException from "../exceptions/http.exceptions";

class JobOpeningController {
  public router: Router;
  constructor(private jobOpeningService: JobOpeningService) {
    this.router = Router();
    this.router.get("/", this.getAllJobOpening);
    this.router.get("/:id", this.getJobOpeningById);
    this.router.post("/", this.createJobOpening);
    this.router.put("/:id",this.updateJobOpening)
  }

  public getAllJobOpening = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const jobs = await this.jobOpeningService.getAllJobOpening();
    res.status(200).send(jobs);
  };

  public getJobOpeningById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const jobId = Number(req.params.id);
      const job = await this.jobOpeningService.getJobOpeningById(jobId);
      if (!job) {
        throw ErrorCodes.JOBOPENING_WITH_ID_NOT_FOUND;
      }

      res.status(200).send(job);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  public createJobOpening = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const jobOpeningDto = plainToInstance(CreateJobOpeningDto, req.body);
      const errors = await validate(jobOpeningDto);
      if (errors.length) {
        console.log(errorsToJson(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }

      const newJobOpening =
        await this.jobOpeningService.createJobOpeningByPosition(
          jobOpeningDto.position,
          jobOpeningDto.description,
          jobOpeningDto.location,
          jobOpeningDto.skills,
          jobOpeningDto.experience,
          jobOpeningDto.noOfOpening,
          jobOpeningDto.active
        );
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  public updateJobOpening= async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const jobOpeningDto = plainToInstance(UpdateJobOPeningDto, req.body);
      const errors = await validate(jobOpeningDto);
      if (errors.length) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }

     
      const jobOPeningId = Number(req.params.id);
      const updatedJobOpening = await this.jobOpeningService.updateJobOpeningById(
        jobOPeningId,
        jobOpeningDto.position,
        jobOpeningDto.description,
        jobOpeningDto.location,
        jobOpeningDto.skills,
        jobOpeningDto.experience,
        jobOpeningDto.noOfOpening,
        jobOpeningDto.active
);
if (!updatedJobOpening) {
  throw ErrorCodes.JOBOPENING_WITH_ID_NOT_FOUND;
}
res.status(204).send(updatedJobOpening);
} catch (err) {
console.log(err);
next(err);
}};
    
    




  };


export default JobOpeningController;





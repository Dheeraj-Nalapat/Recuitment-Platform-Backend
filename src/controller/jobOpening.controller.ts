import { NextFunction, Request, Response, Router } from "express";
import JobOpeningService from "../service/jobOpening.service";
import { ErrorCodes } from "../utils/error.code";
import { plainToInstance } from "class-transformer";
import { CreateJobOpeningDto } from "../dto/jobOpening.dto";

class JobOpeningController {
  public router: Router;
  constructor(private jobOpeningService: JobOpeningService) {
    this.router = Router();
    this.router.get("/", this.getAllJobOpening);
    this.router.get("/:jobId", this.getJobOpeningById);
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
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

export default JobOpeningController;

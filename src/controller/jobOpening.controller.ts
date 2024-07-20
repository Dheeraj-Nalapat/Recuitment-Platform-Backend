import { NextFunction, Request, Response, Router } from "express";
import JobOpeningService from "../service/jobOpening.service";
import { ErrorCodes } from "../utils/error.code";

class JobOpeningController {
  public router: Router;
  constructor(private jobOpeningService: JobOpeningService) {
    this.router = Router();
    this.router.get("/", this.getAllJobs);
    this.router.get("/:jobId", this.getJobById);
  }

  public getAllJobs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const jobs = await this.jobOpeningService.getAllJobOpening();
    res.status(200).send(jobs);
  };

  public getJobById = async (
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


 // TODO add create and edit job.
}

export default JobOpeningController;

import { NextFunction, Request, Response, Router } from "express";
import ReferralService from "../service/referral.service";
import HttpException from "../exceptions/http.exceptions";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import authorize from "../middleware/authorization.middleware";
import { ReferralDto, UpdateReferralDto } from "../dto/referral.dto";
import { RequestWithUser } from "../utils/jwtPayload.types";
class ReferralController {
  public router: Router;
  constructor(private referralService: ReferralService) {
    this.router = Router();
    this.router.get("/", this.getAllReferrals);
    this.router.get("/:id", this.getReferralById);
    this.router.get("/candidate/:id", this.getAllReferralsByCandidate);
    this.router.get("/employee/:id", this.getAllReferralsByEmployee);
    this.router.get("/job/:id", this.getAllReferralsByJobOpening);
    this.router.post("/", this.createReferral);
    this.router.put("/:id", authorize, this.updateReferral);
    this.router.delete("/:id", authorize, this.deleteReferral);
    this.router.post("/check", this.checkPreviousReferral);
  }

  public getAllReferrals = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const referrals = await this.referralService.getAllReferrals();
      if (referrals.length == 0)
        throw new HttpException(404, "No referrals found");
      res.status(200).send(referrals);
    } catch (error) {
      next(error);
    }
  };

  public getReferralById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const referralId = Number(req.params.id);
      const referral = await this.referralService.getReferralById(referralId);
      if (!referral) {
        throw new HttpException(
          404,
          `No referral found with id :${referralId}`
        );
      }
      res.status(200).send(referral);
    } catch (error) {
      next(error);
    }
  };

  public getAllReferralsByEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const employeeId = Number(req.params.id);
      const referrals = await this.referralService.getAllReferralsByEmployee(
        employeeId
      );
      if (!referrals) {
        throw new HttpException(
          404,
          `No referral found from employee with id :${employeeId}`
        );
      }
      res.status(200).send(referrals);
    } catch (error) {
      next(error);
    }
  };

  public getAllReferralsByCandidate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const candidateId = Number(req.params.id);
      const referrals = await this.referralService.getAllReferralsByCandidate(
        candidateId
      );
      if (!referrals) {
        throw new HttpException(
          404,
          `No referral found from candidate with id :${candidateId}`
        );
      }
      res.status(200).send(referrals);
    } catch (error) {
      next(error);
    }
  };

  public getAllReferralsByJobOpening = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const jobOpeningId = Number(req.params.id);
      const referrals = await this.referralService.getAllReferralsByJobOpening(
        jobOpeningId
      );
      if (!referrals) {
        throw new HttpException(
          404,
          `No referral found from job opening with id :${jobOpeningId}`
        );
      }
      res.status(200).send(referrals);
    } catch (error) {
      next(error);
    }
  };

  public checkPreviousReferral = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const result = await this.referralService.checkPreviousReferral(
      req.body.jobId,
      req.body.employeeId,
      req.body.email
    );
    console.log(result);
    res.status(200).send(result);
  };

  public createReferral = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const referral = plainToInstance(ReferralDto, req.body);
      const errors = await validate(referral);
      if (errors.length) {
        console.log(JSON.stringify(errors));

        throw new HttpException(400, JSON.stringify(errors));
      }
      console.log(req.body.jobId);
      const newReferral = await this.referralService.createReferral(
        req.body.state,
        req.body.bonusGiven,
        req.body.employeeId,
        req.body.jobOpeningId,
        req.body.name,
        req.body.email,
        req.body.experience,
        req.body.resume,
        req.body.skills
      );
      res.status(200).send(newReferral);
    } catch (error) {
      next(error);
    }
  };

  public updateReferral = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const referral = plainToInstance(UpdateReferralDto, req.body);
      const errors = await validate(referral);
      if (errors.length) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      console.log(req.body.state, req.body.bonusGiven);
      const referralId = Number(req.params.id);
      const updatedReferral = await this.referralService.updateReferral(
        referralId,
        req.body.state,
        req.body.bonusGiven
      );

      res.status(200).send(updatedReferral);
    } catch (error) {
      next(error);
    }
  };

  public deleteReferral = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.referralService.deleteReferral(Number(req.params.id));
      res.status(204).send("Deleted");
    } catch (error) {
      next(error);
    }
  };
}

export default ReferralController;

import { NextFunction, Request, Response, Router } from "express";
import ReferralService from "../service/referral.service";
import HttpException from "../exceptions/http.exceptions";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import authorize from "../middleware/authorization.middleware";
import { ReferralDto } from "../dto/referral.dto";
class ReferralController {
  public router: Router;
  constructor(private referralService: ReferralService) {
    this.router = Router();
    this.router.get("/", this.getAllReferrals);
    this.router.get("/:id", this.getReferralById);
    this.router.post("/", this.createReferral);
    this.router.put("/:id", this.updateReferral);
    this.router.delete("/:id", this.deleteReferral);
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

      const newReferral = await this.referralService.createReferral(
        referral.state,
        referral.bonusGiven,
        referral.employeeId,
        referral.jobId,
        req.body.name,
        req.body.email,
        req.body.experience,
        req.body.resume,
        req.body.skill
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
      const referral = plainToInstance(ReferralDto, req.body);
      const errors = await validate(referral);
      if (errors.length) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const referralId = Number(req.params.id);
      const updatedReferral = await this.referralService.updateReferral(
        req.body.referralId,
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

import express from "express";
import Candidate from "../entity/candidate.entity";
import CandidateService from "../service/candidate.service";
import { ErrorCodes } from "../utils/error.code";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateCandidateDto } from "../dto/candidate.dto";
import HttpException from "../exceptions/http.exceptions";
import errorsToJson from "../utils/errorstojson";
import authorize from "../middleware/authorization.middleware";
import { RequestWithUser } from "../utils/jwtPayload.types";
import CandidateRepository from "../repository/candidate.repository";

class CandidateController {
  public router: express.Router;
  constructor(
    private candidateService: CandidateService
  ) {
    this.router = express.Router();
    this.router.get("/", this.getAllCandidate);
    this.router.get("/:id", this.getCandidateById);
    this.router.get("/name/:name", this.getCandidateByName);
    this.router.get("/email/:email", this.getCandidateByEmail);
    this.router.get("/referral/:email", this.getReferralByCandidateEmail);
    this.router.post("/", this.createCandidate);
    this.router.put("/:id", this.updateCandidateById);
    this.router.delete("/:id", this.deleteCandidate);
  }

  public getAllCandidate = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const candidates = await this.candidateService.getAllCandidate();
      res.status(200).send(candidates);
    } catch (err) {
      next(err);
    }
  };

  public getCandidateById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const candidateId = Number(req.params.id);
      const candidate = await this.candidateService.getCandidateById(
        candidateId
      );

      if (!candidate) {
        throw ErrorCodes.CANDIDATE_NOT_FOUND;
      }

      res.status(200).send(candidate);
    } catch (err) {
      next(err);
    }
  };
  public getCandidateByName = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const candidateName = req.body.name; 
      const candidate = await this.candidateService.getCandidateByName(
        candidateName
      );

      if (!candidate) {
        throw ErrorCodes.CANDIDATE_NOT_FOUND;
      }

      res.status(200).send(candidate);
    } catch (err) {
      next(err);
    }
  };

  public getCandidateByEmail = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const candidateEmail = req.body.email;
      const candidate = await this.candidateService.getCandidateByEmail(
        candidateEmail
      );

      if (!candidate) {
        throw ErrorCodes.CANDIDATE_NOT_FOUND;
      }

      res.status(200).send(candidate);
    } catch (err) {
      next(err);
    }
  };

  public getReferralByCandidateEmail = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const candidateEmail = req.body.email;
      const candidate = await this.candidateService.getCandidateByEmail(
        candidateEmail
      );

      if (!candidate) {
        throw ErrorCodes.CANDIDATE_NOT_FOUND;
      }

      res.status(200).send(candidate.referrals);
    } catch (err) {
      next(err);
    }
  };

  createCandidate = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const candidateDto = plainToInstance(CreateCandidateDto, req.body);
      const errors = await validate(candidateDto);
      if (errors.length) {
        console.log(errorsToJson(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const newCandidate = await this.candidateService.createCandidate(
        candidateDto.name,
        candidateDto.email,
        candidateDto.experience,
        candidateDto.resume,
        candidateDto.skills
      );
      res.status(201).send(newCandidate);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  public updateCandidateById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const candidateId = Number(req.params.id);
      const candidateDto = req.body;
      const updatedCandidate = await this.candidateService.updateCandidateById(
        candidateId,
        candidateDto.name,
        candidateDto.email,
        candidateDto.experience,
        candidateDto.resume,
        candidateDto.skills
      );

      res.status(200).send(updatedCandidate);
    } catch (err) {
      next(err);
    }
  };

  public deleteCandidate = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      // const role = req.role;
      // if (role != Role.HR) {
      //   throw ErrorCodes.UNAUTHORIZED;
      // }
      const CandidateId = Number(req.params.id);
      const deletedCandidate = await this.candidateService.deleteCandidate(
        CandidateId
      );
      res.status(204).send(deletedCandidate);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

export default CandidateController;

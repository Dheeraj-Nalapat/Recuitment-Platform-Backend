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
        private candidateRepositoy: CandidateRepository,
        private candidateService: CandidateService
        
      ) {
        this.router = express.Router();
        this.router.get("/", this.getAllCandidate);
        this.router.get("/:id", this.getCandidateById);
        this.router.post("/", this.createCandidate);
        this.router.put("/:id", this.updateCandidateById);
        this.router.patch("/:id", this.updateEmployee);
        this.router.delete("/:id", this.deleteCandidate);
        this.router.post("/login", this.loginEmployee);
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
        const newCandidate= await this.candidateService.createCandidate(
          candidateDto.name,
          candidateDto.email,
          candidateDto.experience,
          candidateDto.resume,
          candidateDto.skill
        );
        res.status(201).send(newCandidate);
      } catch (err) {
        console.log(err);
        next(err);
      }
  };

  updateEmployeeById = async (
    id: number,
    name: string,
    email: string,
    experience: string,
    password: string,
    position: string
  ) => {
    const existingEmployee = await this.candidateRepositoy.findOneBy({ id });
    if (!existingEmployee) {
      throw ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND;
    }
    existingEmployee.name = name;
    existingEmployee.email = email;
    existingEmployee.experience = experience;

    if (password) {
      existingEmployee.password = password
        ? await bcrypt.hash(password, 10)
        : "";
    }

    const positionEntity = await this.positionService.getPositionByName(
      position
    );
    if (position && !positionEntity) {
      throw ErrorCodes.POSITION_WITH_ID_NOT_FOUND;
    }
    existingEmployee.position = positionEntity;

    return this.employeeRepository.save(existingEmployee);
  };
 
}

export default CandidateController;

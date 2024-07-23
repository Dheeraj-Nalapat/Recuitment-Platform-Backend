import CandidateController from "../controller/candidate.controller";
import dataSource from "../db/data-source.db";
import Candidate from "../entity/candidate.entity";
import CandidateRepository from "../repository/candidate.repository";
import CandidateService from "../service/candidate.service";

const candidateController = new CandidateController(
    new CandidateService(
      new CandidateRepository(dataSource.getRepository(Candidate))
    )
  );
  
  const candidateRouter = candidateController.router;
  
  export default candidateRouter;
  
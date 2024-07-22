import ReferralController from "../controller/referral.controller";
import dataSource from "../db/data-source.db";
import Candidate from "../entity/candidate.entity";
import Employee from "../entity/employee.entity";
import JobOpening from "../entity/jobOpening.entity";
import Position from "../entity/position.entity";
import Referral from "../entity/referral.entity";
import CandidateRepository from "../repository/candidate.repository";
import EmployeeRepository from "../repository/employee.repository";
import JobOpeningRepository from "../repository/jobOpening.repository";
import PositionRepository from "../repository/position.repository";
import referralRepository from "../repository/referral.repository";
import CandidateService from "../service/candidate.service";
import EmployeeService from "../service/employee.service";
import JobOpeningService from "../service/jobOpening.service";
import PositionService from "../service/position.service";
import ReferralService from "../service/referral.service";

const referralController = new ReferralController(
    new ReferralService(
        new referralRepository(dataSource.getRepository(Referral)),
    
    new EmployeeService(
        new EmployeeRepository(dataSource.getRepository(Employee)),
        new PositionService(
            new PositionRepository(dataSource.getRepository(Position))
        )
    ),
    new CandidateService(
        new CandidateRepository(dataSource.getRepository(Candidate))
    ),
    new JobOpeningService(
        new JobOpeningRepository(dataSource.getRepository(JobOpening)),
        new PositionService(
            new PositionRepository(dataSource.getRepository(Position))
        )
    ),

)
)

const referralRouter = referralController.router;

export default referralRouter;
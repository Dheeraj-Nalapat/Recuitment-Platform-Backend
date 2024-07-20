import JobOpeningController from "../controller/jobOpening.controller";
import dataSource from "../db/data-source.db";
import JobOpening from "../entity/jobOpening.entity";
import Position from "../entity/position.entity";
import JobOpeningRepository from "../repository/jobOpening.repository";
import PositionRepository from "../repository/position.repository";
import JobOpeningService from "../service/jobOpening.service";
import PositionService from "../service/position.service";

const jobOpeningController = new JobOpeningController(
    new JobOpeningService(new JobOpeningRepository(dataSource.getRepository(JobOpening)),
    new PositionService(
      new PositionRepository(dataSource.getRepository(Position))
    ))
);

const jobOpeningRouter = jobOpeningController.router;

export default jobOpeningRouter;
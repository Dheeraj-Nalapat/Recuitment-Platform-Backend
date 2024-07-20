import PositionController from "../controller/position.controller";
import dataSource from "../db/data-source.db";
import Position from "../entity/position.entity";
import PositionRepository from "../repository/position.repository";
import PositionService from "../service/position.service";

const positionController = new PositionController(
  new PositionService(
    new PositionRepository(dataSource.getRepository(Position))
  )
);
const positionRouter = positionController.router;

export default positionRouter;

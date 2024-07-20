import { NextFunction, Request, Response, Router } from "express";
import PositionService from "../service/position.service";
import HttpException from "../exceptions/http.exceptions";
import { plainToInstance } from "class-transformer";
import PositionDto from "../dto/position.dto";
import { validate } from "class-validator";
import authorize from "../middleware/authorization.middleware";
class PositionController {
  public router: Router;
  constructor(private positionService: PositionService) {
    this.router = Router();
    this.router.get("/",  this.getAllPosition);
    this.router.get("/:id",  this.getPosition);
    this.router.post("/",  this.createPosition);
    this.router.put("/:id",  this.updatePosition);
    this.router.delete("/:id",  this.deletePosition);
  }

  public getAllPosition = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const positions = await this.positionService.getAllPosition();
      if (positions.length == 0)
        throw new HttpException(404, "No positions found");
      res.status(200).send(positions);
    } catch (error) {
      next(error);
    }
  };

  public getPosition = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const positionId = Number(req.params.id);
      const position = await this.positionService.getPositionById(positionId);
      if (!position) {
        throw new HttpException(
          404,
          `No position found with id :${positionId}`
        );
      }
      res.status(200).send(position);
    } catch (error) {
      next(error);
    }
  };

  public createPosition = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log(req.body);
      
      const positionDto = plainToInstance(PositionDto, req.body);
      const errors = await validate(positionDto);
      if (errors.length) {
        console.log(JSON.stringify(errors));

        throw new HttpException(400, JSON.stringify(errors));
      }
      
      const newPosition = await this.positionService.createPosition(
        positionDto.name
      );
      console.log(newPosition);
      res.status(200).send(newPosition);
    } catch (error) {
      next(error);
    }
  };

  public updatePosition = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const positionDto = plainToInstance(PositionDto, req.body);
      const errors = await validate(positionDto);
      if (errors.length) {
        console.log(JSON.stringify(errors));

        throw new HttpException(400, JSON.stringify(errors));
      }
      const updatedPositionData = req.body;
      const positionId = Number(req.params.id);
      const updatedPosition = await this.positionService.updatePosition(
        positionId,
        updatedPositionData
      );

      res.status(200).send(updatedPosition);
    } catch (error) {
      next(error);
    }
  };

  public deletePosition = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.positionService.deletePosition(Number(req.params.id));
      res.status(204).send("Deleted");
    } catch (error) {
      next(error);
    }
  };
}

export default PositionController;

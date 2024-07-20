import Position from "../entity/position.entity";
import PositionRepository from "../repository/position.repository";
import { ErrorCodes } from "../utils/error.code";

class PositionService {
  constructor(private positionRepository: PositionRepository) {}

  getAllPosition = async () => {
    return this.positionRepository.find();
  };

  getPositionById = async (id: number) => {
    return this.positionRepository.findOneBy({ id });
  };

  getPositionByName = async (name: string) => {
    return this.positionRepository.findOneBy({ name });
  };

  createPosition = async (name: string) => {
    const newPosition = new Position();
    newPosition.name = name;

    return this.positionRepository.save(newPosition);
  };

  updatePosition = async (id: number, name: string) => {
    const existingPosition = await this.getPositionById(id);
    if (!existingPosition) {
      throw ErrorCodes.POSITION_WITH_ID_NOT_FOUND;
    }
    existingPosition.name = name;

    return this.positionRepository.save(existingPosition);
  };

  deletePosition = async (id: number) => {
    const position = await this.getPositionById(id);
    if (!position) {
      throw ErrorCodes.POSITION_WITH_ID_NOT_FOUND;
    }
    return this.positionRepository.softRemove(id);
  };
}

export default PositionService;

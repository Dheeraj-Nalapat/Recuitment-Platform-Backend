import EmployeeController from "../controller/employee.controller";
import dataSource from "../db/data-source.db";
import Employee from "../entity/employee.entity";
import Position from "../entity/position.entity";
import EmployeeRepository from "../repository/employee.repository";
import PositionRepository from "../repository/position.repository";
import EmployeeService from "../service/employee.service";
import PositionService from "../service/position.service";

const employeeController = new EmployeeController(
  new EmployeeService(
    new EmployeeRepository(dataSource.getRepository(Employee)),
    new PositionService(
      new PositionRepository(dataSource.getRepository(Position))
    )
  )
);

const employeeRouter = employeeController.router;

export default employeeRouter;

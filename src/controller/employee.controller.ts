import express from "express";
import EmployeeService from "../service/employee.service";
import { ErrorCodes } from "../utils/error.code";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import Employee from "../entity/employee.entity";

class EmployeeController {
  public router: express.Router;

  constructor(private employeeService: EmployeeService) {
    this.router = express.Router();
  }

  public getAllEmployees = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const employees = await this.employeeService.getAllEmployee();
    res.status(200).send(employees);
  };

  public getEmployeeById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const employeeId = Number(req.params.id);
      const employee = await this.employeeService.getEmployeeById(employeeId);

      if (!employee) {
        throw ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND;
      }

      res.status(200).send(employee);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  public createEmployee = async (
    req: Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    // try {
    //   const role = req.role;
    //   if (role != Role.HR) {
    //     throw ErrorCodes.UNAUTHORIZED;
    //   }
    // const employeeDto = plainToInstance(CreateEmployeeDto, req.body);
    // const errors = await validate(employeeDto);
    // if (errors.length) {
    //   console.log(errorsToJson(errors));
    //   throw new HttpException(400, JSON.stringify(errors));
    // }
    // const newEmployee = await this.employeeService.createEmployee(
    //   employeeDto.name,
    //   employeeDto.email,
    //   employeeDto.experience,
    //   employeeDto.password,
    //   employeeDto.role,
    //   employeeDto.status,
    //   employeeDto.address,
    //   employeeDto.department
    // );
    //   res.status(201).send(newEmployee);
    // } catch (err) {
    //   console.log(err);
    //   next(err);
    // }
  };
}

export default EmployeeController;

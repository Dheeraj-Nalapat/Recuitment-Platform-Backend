import express from "express";
import EmployeeService from "../service/employee.service";
import { ErrorCodes } from "../utils/error.code";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import CreateEmployeeDto from "../dto/employee.dto";
import HttpException from "../exceptions/http.exceptions";
import errorsToJson from "../utils/errorstojason";

class EmployeeController {
  public router: express.Router;

  constructor(private employeeService: EmployeeService) {
    this.router = express.Router();
    this.router.get("/", this.getAllEmployees);  
    this.router.post("/",this.createEmployee);
    this.router.post("/login", this.loginEmployee);

  }


  public loginEmployee = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { email, password } = req.body;
      const token = await this.employeeService.loginEmployee(email, password);
      console.log(token);
      res.status(200).send({ data: token });
    } catch (err) {
      next(err);
    }
  };

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
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      //   const role = req.role;
      //   if (role != Role.HR) {
      //     throw ErrorCodes.UNAUTHORIZED;
      //   }
      const employeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(employeeDto);
      if (errors.length) {
        console.log(errorsToJson(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const newEmployee = await this.employeeService.createEmployee(
        employeeDto.name,
        employeeDto.email,
        employeeDto.experience,
        employeeDto.password,
        employeeDto.position
      );
      res.status(201).send(newEmployee);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };


}

export default EmployeeController;

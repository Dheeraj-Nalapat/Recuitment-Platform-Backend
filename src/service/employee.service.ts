import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import bcrypt from "bcrypt";
import PositionService from "./position.service";
import { ErrorCodes } from "../utils/error.code";
import { jwtPayload } from "../utils/jwtPayload.types";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();

class EmployeeService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private positionService: PositionService
  ) {}

  getAllEmployee = async () => {
    const employee = await this.employeeRepository.find();
    return employee.map((employee) => {
      const { password, ...employeeWithOutPassword } = employee;
      return employeeWithOutPassword;
    });
  };

  getEmployeeByIdWithPassword = async (id: number) => {
    return this.employeeRepository.findOneBy({ id });
  };

  getEmployeeById = async (id: number) => {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (employee) {
      const { password, ...employeeWithOutPassword } = employee;
      return employeeWithOutPassword;
    }
    return null;
  };

  getEmployeeByEmail = async (email: string) => {
    return this.employeeRepository.findOneBy({ email });
  };

  createEmployee = async (
    name: string,
    email: string,
    experience: string,
    password: string,
    position: string
  ) => {
    const newEmployee = new Employee();
    newEmployee.name = name;
    newEmployee.email = email;
    newEmployee.experience = experience;
    newEmployee.password = password ? await bcrypt.hash(password, 10) : "";

    const positionEntity = await this.positionService.getPositionByName(
      position
    );
    if (!positionEntity) {
      throw ErrorCodes.POSITION_WITH_ID_NOT_FOUND;
    }
    newEmployee.position = positionEntity;

    return this.employeeRepository.save(newEmployee);
  };

  updateEmployeeById = async (
    id: number,
    name: string,
    email: string,
    experience: string,
    password: string,
    position: string
  ) => {
    const existingEmployee = await this.employeeRepository.findOneBy({ id });
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

  deleteEmployee = async (id: number) => {
    const employee = await this.getEmployeeById(id);

    if (!employee) {
      throw ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND;
    }
    return this.employeeRepository.softRemove(id);
  };

  loginEmployee = async (email: string, password: string) => {
    let employee = await this.employeeRepository.findOneBy({ email });
    if (!employee) {
      throw ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND;
    }

    const result = await bcrypt.compare(password, employee.password);
    if (!result) {
      throw ErrorCodes.INCORRECT_PASSWORD;
    }
    const payload: jwtPayload = {
      name: employee.name,
      email: employee.email,
      position: employee.position.name,
      userId: employee.id,
    };

    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_VALIDITY,
    });
    return { token };
  };
}

export default EmployeeService;

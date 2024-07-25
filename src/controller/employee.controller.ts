import express from "express";
import EmployeeService from "../service/employee.service";
import { ErrorCodes } from "../utils/error.code";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateEmployeeDto, UpdateEmployeeDto } from "../dto/employee.dto";
import HttpException from "../exceptions/http.exceptions";
import errorsToJson from "../utils/errorstojson";
import authorize from "../middleware/authorization.middleware";
import { RequestWithUser } from "../utils/jwtPayload.types";

class EmployeeController {
	public router: express.Router;

	constructor(private employeeService: EmployeeService) {
		this.router = express.Router();
		this.router.get("/", this.getAllEmployees);
		this.router.get("/:id", this.getEmployeeById);
		this.router.get("/referral/:id", this.getEmployeeReferrals);
		this.router.post("/", this.createEmployee);
		this.router.put("/:id", this.updateEmployee);
		this.router.patch("/:id", this.updateEmployee);
		this.router.delete("/:id", this.deleteEmployee);
		this.router.post("/login", this.loginEmployee);
	}

	public loginEmployee = async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		try {
			const { email, password } = req.body;
			console.log(email, password);
			const token = await this.employeeService.loginEmployee(
				email,
				password
			);
			console.log(token);
			res.status(200).send({ data: token });
		} catch (err) {
			res.status(401).json({ message: "Login Failed" });
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
			const employee = await this.employeeService.getEmployeeById(
				employeeId
			);

			if (!employee) {
				throw ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND;
			}

			res.status(200).send(employee);
		} catch (err) {
			console.log(err);
			next(err);
		}
	};

	public getEmployeeReferrals = async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		try {
			// const employeeId = Number(req.userId);
      const userId= Number(req.params.id)
			const employee = await this.employeeService.getEmployeeById(
        userId
			);

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
		req: RequestWithUser,
		res: express.Response,
		next: express.NextFunction
	) => {
		try {
			// const position = req.position;
			// console.log(position);
			// if (position !== "HR") {
			//   throw ErrorCodes.UNAUTHORIZED;
			// }
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

	public updateEmployee = async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		try {
			const employeeDto = plainToInstance(UpdateEmployeeDto, req.body);
			const errors = await validate(employeeDto);
			if (errors.length) {
				console.log(errorsToJson(errors));
				throw new HttpException(400, JSON.stringify(errors));
			}

			const employeeId = Number(req.params.id);
			const updatedEmployee =
				await this.employeeService.updateEmployeeById(
					employeeId,
					employeeDto.name,
					employeeDto.email,
					employeeDto.experience,
					employeeDto.password,
					employeeDto.position
				);
			if (!updatedEmployee) {
				throw ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND;
			}
			res.status(204).send(updatedEmployee);
		} catch (err) {
			console.log(err);
			next(err);
		}
	};

	public deleteEmployee = async (
		req: RequestWithUser,
		res: express.Response,
		next: express.NextFunction
	) => {
		try {
			// const role = req.role;
			// if (role != Role.HR) {
			//   throw ErrorCodes.UNAUTHORIZED;
			// }
			const employeeId = Number(req.params.id);
			const deletedEmployee = await this.employeeService.deleteEmployee(
				employeeId
			);
			res.status(204).send(deletedEmployee);
		} catch (err) {
			console.log(err);
			next(err);
		}
	};
}

export default EmployeeController;

import NotificationsController from "../controller/notification.controller";
import dataSource from "../db/data-source.db";
import Employee from "../entity/employee.entity";
import { Notifications } from "../entity/notification.entity";
import Position from "../entity/position.entity";
import EmployeeRepository from "../repository/employee.repository";
import NotificationsRepository from "../repository/notification.repository";
import PositionRepository from "../repository/position.repository";
import EmployeeService from "../service/employee.service";
import NotificationsService from "../service/notification.service";
import PositionService from "../service/position.service";

const notificationsController = new NotificationsController(
  new NotificationsService(
    new NotificationsRepository(dataSource.getRepository(Notifications)),
    new EmployeeService(
      new EmployeeRepository(dataSource.getRepository(Employee)),
      new PositionService(
        new PositionRepository(dataSource.getRepository(Position))
      )
    )
  )
);

const notificationsRouter = notificationsController.router;

export default notificationsRouter;

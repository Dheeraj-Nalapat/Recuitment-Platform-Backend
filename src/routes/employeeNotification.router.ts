import EmployeeNotificationController from "../controller/employeeNotification.controller";
import dataSource from "../db/data-source.db";
import { EmployeeNotification } from "../entity/employeeNotification.entity";
import EmployeeNotificationRepository from "../repository/employeeNotification.repository";
import EmployeeNotificationService from "../service/employeeNotification.service";

const employeeNotificationController = new EmployeeNotificationController(
  new EmployeeNotificationService(
    new EmployeeNotificationRepository(
      dataSource.getRepository(EmployeeNotification)
    )
  )
);

const notificationRouter = employeeNotificationController.router;

export default notificationRouter;

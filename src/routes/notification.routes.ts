import EmployeeNotificationController from "../controller/notification.controller";
import dataSource from "../db/data-source.db";
import { EmployeeNotification } from "../entity/notification.entity";
import EmployeeNotificationRepository from "../repository/notification.repository";
import EmployeeNotificationService from "../service/notification.service";

const employeeNotificationController = new EmployeeNotificationController(
  new EmployeeNotificationService(
    new EmployeeNotificationRepository(
      dataSource.getRepository(EmployeeNotification)
    )
  )
);

const notificationRouter = employeeNotificationController.router;

export default notificationRouter;

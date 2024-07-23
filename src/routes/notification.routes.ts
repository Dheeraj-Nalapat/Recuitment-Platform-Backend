import NotificationsController from "../controller/notification.controller";
import dataSource from "../db/data-source.db";
import { Notifications } from "../entity/notification.entity";
import NotificationsRepository from "../repository/notification.repository";
import NotificationsService from "../service/notification.service";

const notificationsController = new NotificationsController(
  new NotificationsService(
    new NotificationsRepository(dataSource.getRepository(Notifications))
  )
);

const notificationsRouter = notificationsController.router;

export default notificationsRouter;

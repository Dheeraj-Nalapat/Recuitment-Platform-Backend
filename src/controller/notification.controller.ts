import express from "express";
import EmployeeNotificationService from "../service/notification.service";
import { RequestWithUser } from "../utils/jwtPayload.types";
import authorize from "../middleware/authorization.middleware";

class EmployeeNotificationController {
  public router: express.Router;

  constructor(
    private employeeNotificationService: EmployeeNotificationService
  ) {
    this.router = express.Router();

    this.router.get("/", authorize, this.getUnreadNotifications);
    this.router.put("/:id/read", authorize, this.markAsRead);
  }

  public getUnreadNotifications = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const userId = Number(req.body.id);
      const notifications =
        await this.employeeNotificationService.getUnreadNotifications(userId);
      res.json({ notifications });
    } catch (err) {
      res.status(500).send("an error occured while sending notification");
      next(err);
    }
  };

  public markAsRead = async (
    req: RequestWithUser,
    res: express.Response,
    next
  ) => {
    try {
      const notificationId = Number(req.params.id);
      await this.employeeNotificationService.markAsRead(notificationId);
      res.status(200).json({ success: true });
    } catch (err) {
      res
        .status(500)
        .json({ error: "an error occured while marking notification as read" });
      next(err);
    }
  };
}

export default EmployeeNotificationController;

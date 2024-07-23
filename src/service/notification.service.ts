import NotificationsRepository from "../repository/notification.repository";
import EmployeeService from "./employee.service";

class NotificationsService {
  constructor(
    private notificationsRepository: NotificationsRepository,
    private employeeService: EmployeeService
  ) {}

  getUnreadNotifications = async (userEmail: string) => {
    const employee = await this.employeeService.getEmployeeByEmail(userEmail);
    return this.notificationsRepository.findUnreadByUserId(employee.id);
  };

  markAsRead = async (id: number) => {
    await this.notificationsRepository.markAsRead(id);
  };

  createNotification = async (userId: number, message: string) => {
    return this.notificationsRepository.createNotification(userId, message);
  };
}

export default NotificationsService;

import EmployeeNotificationRepository from "../repository/employeeNotification.repository";

class EmployeeNotificationService {
  constructor(
    private employeeNotificationRepository: EmployeeNotificationRepository
  ) {}

  getUnreadNotifications = async (userId: number) => {
    return this.employeeNotificationRepository.findUnreadByUserId(userId);
  };

  markAsRead = async (id: number) => {
    await this.employeeNotificationRepository.markAsRead(id);
  };

  createNotification = async (userId: number, message: string) => {
    return this.employeeNotificationRepository.createNotification(
      userId,
      message
    );
  };
}

export default EmployeeNotificationService;

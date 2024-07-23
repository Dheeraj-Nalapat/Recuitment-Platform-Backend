import NotificationsRepository from "../repository/notification.repository";

class NotificationsService {
  constructor(private notificationsRepository: NotificationsRepository) {}

  getUnreadNotifications = async (userId: number) => {
    return this.notificationsRepository.findUnreadByUserId(userId);
  };

  markAsRead = async (id: number) => {
    await this.notificationsRepository.markAsRead(id);
  };

  createNotification = async (userId: number, message: string) => {
    return this.notificationsRepository.createNotification(userId, message);
  };
}

export default NotificationsService;

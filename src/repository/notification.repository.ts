import { Repository } from "typeorm";
import { Notifications } from "../entity/notification.entity";

class NotificationsRepository {
  constructor(private repository: Repository<Notifications>) {}

  findUnreadByUserId = async (userId: number): Promise<Notifications[]> => {
    return this.repository.find({
      where: { employee: { id: userId }, read: false },
      order: { createdAt: "DESC" },
    });
  };

  markAsRead = async (id: number): Promise<void> => {
    await this.repository.update(id, { read: true });
  };

  createNotification = async (
    userId: number,
    message: string
  ): Promise<Notifications> => {
    const newNoftification = new Notifications();
    newNoftification.employee = { id: userId } as any;
    newNoftification.message = message;
    return this.repository.save(newNoftification);
  };
}

export default NotificationsRepository;

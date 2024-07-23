import { Repository } from "typeorm";
import { EmployeeNotification } from "../entity/employeeNotification.entity";

class EmployeeNotificationRepository {
  constructor(private repository: Repository<EmployeeNotification>) {}

  findUnreadByUserId = async (
    userId: number
  ): Promise<EmployeeNotification[]> => {
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
  ): Promise<EmployeeNotification> => {
    const newNoftification = new EmployeeNotification();
    newNoftification.employee = { id: userId } as any;
    newNoftification.message = message;
    return this.repository.save(newNoftification);
  };
}

export default EmployeeNotificationRepository;

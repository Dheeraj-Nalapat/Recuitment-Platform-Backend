import { Repository } from "typeorm";

class EmployeeNotification {
  constructor(private repository: Repository<EmployeeNotification>) {}
}

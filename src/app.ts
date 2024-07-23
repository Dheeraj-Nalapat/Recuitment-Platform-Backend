import express, { Request, Response } from "express";
import dataSource from "./db/data-source.db";
import cors from "cors";
import loggerMiddleware from "./middleware/logger.middleware";
import bodyParser from "body-parser";
import employeeRouter from "./routes/employee.routes";
import positionRouter from "./routes/position.routes";
import jobOpeningRouter from "./routes/jobOpening.routes";
import referralRouter from "./routes/referral.routes";
import notificationsRouter from "./routes/notification.routes";
import candidateRouter from "./routes/candidate.routes";
import NotificationCronJob from "./config/cron";
import NotificationsService from "./service/notification.service";
import NotificationsRepository from "./repository/notification.repository";
import { Notifications } from "./entity/notification.entity";
import ReferralService from "./service/referral.service";
import EmployeeService from "./service/employee.service";
import EmployeeRepository from "./repository/employee.repository";
import Employee from "./entity/employee.entity";
import PositionService from "./service/position.service";
import PositionRepository from "./repository/position.repository";
import Position from "./entity/position.entity";
import CandidateService from "./service/candidate.service";
import CandidateRepository from "./repository/candidate.repository";
import Candidate from "./entity/candidate.entity";
import JobOpeningService from "./service/jobOpening.service";
import JobOpeningRepository from "./repository/jobOpening.repository";
import JobOpening from "./entity/jobOpening.entity";
import referralRepository from "./repository/referral.repository";
import Referral from "./entity/referral.entity";

const server = express();

server.use(bodyParser.json());
server.use(loggerMiddleware);
server.use(cors());
server.use("/employee", employeeRouter);
server.use("/position", positionRouter);
server.use("/jobs", jobOpeningRouter);
server.use("/referrals", referralRouter);
server.use("/notifications", notificationsRouter);
server.use("/candidates", candidateRouter);
server.get("/", (request: Request, response: Response) => {
  response.status(201).send("home");
});

(async () => {
  try {
    await dataSource.initialize();

    const notificationCronJob = new NotificationCronJob(
      new NotificationsService(
        new NotificationsRepository(dataSource.getRepository(Notifications)),
        new EmployeeService(
          new EmployeeRepository(dataSource.getRepository(Employee)),
          new PositionService(
            new PositionRepository(dataSource.getRepository(Position))
          )
        )
      ),
      new ReferralService(
        new referralRepository(dataSource.getRepository(Referral)),

        new EmployeeService(
          new EmployeeRepository(dataSource.getRepository(Employee)),
          new PositionService(
            new PositionRepository(dataSource.getRepository(Position))
          )
        ),
        new CandidateService(
          new CandidateRepository(dataSource.getRepository(Candidate))
        ),
        new JobOpeningService(
          new JobOpeningRepository(dataSource.getRepository(JobOpening)),
          new PositionService(
            new PositionRepository(dataSource.getRepository(Position))
          )
        ),
        new NotificationsService(
          new NotificationsRepository(dataSource.getRepository(Notifications)),
          new EmployeeService(
            new EmployeeRepository(dataSource.getRepository(Employee)),
            new PositionService(
              new PositionRepository(dataSource.getRepository(Position))
            )
          )
        )
      )
    );

    notificationCronJob.startNotificationCronJob();
  } catch (e) {
    console.log("failed to initialize dataSource: ", e);
    process.exit(1);
  }
  server.listen(3000, () => {
    console.log("server is running on port 3000");
  });
})();

import cron from "node-cron";
import NotificationsService from "../service/notification.service";
import ReferralService from "../service/referral.service";
import { differenceInMonths } from "date-fns";
import EmployeeService from "../service/employee.service";
import {
  CRONTIME_STAMP,
  TIME_DURATION_FOR_VALIDATING_BONUS,
} from "./cron.constants";

class NotificationCronJob {
  constructor(
    private notificationsService: NotificationsService,
    private referralService: ReferralService,
    private employeeService: EmployeeService
  ) {}

  startNotificationCronJob = () => {
    cron.schedule(CRONTIME_STAMP, async () => {
      console.log("Running notification check cron job");

      try {
        const referrals = await this.referralService.getAllReferrals();
        const today = new Date();

        for (const referral of referrals) {
          if (referral.acceptDate && !referral.bonusGiven) {
            let monthsDifferance = differenceInMonths(
              today,
              referral.acceptDate
            );
            if (monthsDifferance == TIME_DURATION_FOR_VALIDATING_BONUS) {
              let message = `Your Candidate: ${referral.referree.name} with Rerferral ID:${referral.id} has completed 3 months in the company and you are eligible for a bonus`;
              const notificationEmployee =
                await this.notificationsService.createNotification(
                  referral.referrer.id,
                  message
                );
              message = `Referral with Referral ID:${referral.id} by Employee: ${referral.referrer.name} is successful and is ELIGIBLE for Bonus`;
              let admins = (await this.employeeService.getAllEmployee()).filter(
                (employee) => employee.position.name == "ADMIN"
              );
              for (let i = 0; i < admins.length; i++) {
                const notification =
                  await this.notificationsService.createNotification(
                    admins[i].id,
                    message
                  );
              }
            }
          }
        }
      } catch (err) {
        console.log("Error in notification cron job", err);
      }
    });
  };
}

export default NotificationCronJob;

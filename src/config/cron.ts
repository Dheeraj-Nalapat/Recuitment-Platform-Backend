import cron from "node-cron";
import NotificationsService from "../service/notification.service";
import ReferralService from "../service/referral.service";
import { differenceInMonths } from "date-fns";
import { ADMIN_ID } from "../utils/constants";

class NotificationCronJob {
  constructor(
    private notificationService: NotificationsService,
    private referralService: ReferralService
  ) {}

  startNotificationCronJob = () => {
    cron.schedule("0 0 * * *", async () => {
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
            if (monthsDifferance == 3) {
              let message = `Your Candidate: ${referral.referree.name} with Rerferral ID:${referral.id} has completed 3 months in the company and you are eligible for a bonus`;
              const notificationEmployee =
                await this.notificationService.createNotification(
                  referral.referrer.id,
                  message
                );
              message = `Referral with Referral ID:${referral.id} by Employee: ${referral.referrer.name} is successful and is ELIGIBLE for Bonus`;
              const notificationAdmin =
                await this.notificationService.createNotification(
                  ADMIN_ID,
                  message
                );
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

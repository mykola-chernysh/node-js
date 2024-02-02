import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { EEmailAction } from "../enums/email-action.enum";
import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "../services/emai.service";

dayjs.extend(utc);

const reminderOldVisitors = async function () {
  try {
    const previousMonth = dayjs().utc().subtract(10, "minutes");

    const users = await userRepository.getManyByParams({ createdAt: { $lte: previousMonth } });

    await Promise.all(
      users.map(async (user) => {
        await emailService.sendMail(user.email, EEmailAction.OLD_VISITOR, { name: user.name });
      }),
    );
  } catch (e) {
    throw new ApiError(e.message, e.status);
  }
};

export const visitorsReminder = new CronJob("* * * * *", reminderOldVisitors);

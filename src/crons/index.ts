// import { tokenRemover } from "./remove-old-tokens";

import { visitorsReminder } from "./reminder-old-visitors";

export const runAllCronJobs = () => {
  // tokenRemover.start();
  visitorsReminder.start();
};

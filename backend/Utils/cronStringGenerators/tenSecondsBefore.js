/**
 * to be used when i have two cron jobs
 * one to check if the task still exust or to be updated and this cron job will run 5 seconds before
 */

const dateSimplifier = require("./dateSimplifier");
module.exports = (date) => {
  const { minutes, month, day_of_the_month, day_of_the_week, hours } =
    dateSimplifier(date);
  const transformedMinute = minutes === 0 ? 0 : minutes - 1;
  const transformedSeconds = minutes === 0 ? 0 : 50;
  return `${transformedSeconds} ${transformedMinute} ${hours} ${day_of_the_month} ${month} ${day_of_the_week}`;
};

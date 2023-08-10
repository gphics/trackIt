/**
 * when a user turn on dual-factor-auth, a mail is sent to the user containing an OTP
 * that will expire in ten-minutes
 * the cron string to be used is this
 */

const dateSimplifier = require("./dateSimplifier");
module.exports = () => {
  const date = new Date();
  const { hours, minutes, day_of_the_month, day_of_the_week, month } =
    dateSimplifier(date);

  const transformedMin = minutes >= 48 ? 10 : minutes + 10;
  const transformedHours = transformedMin === 10 ? hours + 1 : hours;
  const cron = `10 ${transformedMin} ${transformedHours} ${day_of_the_month} ${month} ${day_of_the_week}`;
  return cron;
};

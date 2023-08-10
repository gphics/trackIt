/**
 * to be used to repeat a cron job monthly
 */
const dateSimplifier = require("./dateSimplifier");
module.exports = (date) => {
  const { minutes, month, day_of_the_month, day_of_the_week, hours } =
    dateSimplifier(date);
  const transformedDayOfTheMonth =
    day_of_the_month === 31 ? 1 : day_of_the_month;

  return `10 ${minutes} ${hours} ${transformedDayOfTheMonth} * *`;
};

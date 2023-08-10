/**
 * to be used single non-repetitive cron job
 */
const dateSimplifier = require("./dateSimplifier");

module.exports = (date) => {
  const { minutes, month, day_of_the_month, day_of_the_week, hours } =
    dateSimplifier(date);

  return `10 ${minutes} ${hours} ${day_of_the_month} ${month} ${day_of_the_week}`;
};

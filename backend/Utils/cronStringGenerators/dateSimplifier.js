/** 
 * this function get all the required date object from a particular date
 */
module.exports = (when) => {
  const date = new Date(when)
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const month = date.getMonth() + 1;
  const day_of_the_week = date.getDay();
  const day_of_the_month = date.getDate();
  const obj = {};
  return {
    day_of_the_month,
    day_of_the_week,
    month,
    minutes,
    hours,
  };
};

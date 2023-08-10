/**
 * all cron jobs fires at the tenth seconds of the minute, except
 * fiveSecondsBefore
 */
const DFAString = require("./DFAString")
const monthlyString = require("./monthlyString");
const weeklyString = require("./weeklyString");
const dailyString = require("./dailyString");
const tenSecondsBefore = require("./tenSecondsBefore");
const actualDateString = require("./actualDateString");
const dateStringGenerator = require("./dateStringGenerator");

module.exports = {

  tenSecondsBefore,
  weeklyString,
  dailyString,
  monthlyString,
  actualDateString,
  dateStringGenerator,
  DFAString
};

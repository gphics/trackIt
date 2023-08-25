require("dotenv").config();
const nodeMailer = require("nodemailer");
const mailTransporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

module.exports = async (recepient, subject, html) => {
  try {
    await mailTransporter.sendMail({
      from: process.env.MAIL_USER,
      to: recepient,
      subject,
      html,
    });
  } catch (error) {}
};

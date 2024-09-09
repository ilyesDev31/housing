/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const nodemailer = require("nodemailer");
class Email {
  constructor(url, user) {
    this.url = url;
    this.username = user.name;
    this.from = "ibendjellal@house-marketplace.io";
    this.to = user.email;
  }
  createEmailTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  async sendEmail(subject, text) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text,
    };
    return await this.createEmailTransport().sendMail(mailOptions);
  }
  async resetPassword() {
    await this.sendEmail(
      "resetPassword",
      `go to ${this.url} to reset your passsword`
    );
  }
}

module.exports = Email;

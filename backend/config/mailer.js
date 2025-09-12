import nodemailer from "nodemailer";

const sendMail = async (option) => {
    var transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});
  const mailOptions = {
    from: '"Shop Fola" <help@shopfola.com>',
    to: option.email,
    subject: option.subject,
    text: option.message,
  };
  await transport.sendMail(mailOptions);
};

export default sendMail;
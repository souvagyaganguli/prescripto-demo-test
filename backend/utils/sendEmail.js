import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "smtp.gmail.com",
  port: process.env.MAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  if (!to) return;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
};

export default sendEmail;

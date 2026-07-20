const nodemailer = require('nodemailer');

const sendEmail = async ({ subject, text }) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('[sendEmail] SMTP not configured, skipping:', subject, text);
    return;
  }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER,
    subject,
    text
  });
};

module.exports = sendEmail;
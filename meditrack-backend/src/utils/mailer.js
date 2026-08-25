const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  tls: {
    rejectUnauthorized: false,
  },

  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 30000,
});

const sendMail = async (to, subject, htmlContent) => {
  try {
    console.log("=================================");
    console.log("GMAIL: Sending email...");
    console.log("From:", process.env.EMAIL_USER);
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("=================================");

    const info = await transporter.sendMail({
      from: `"MediTrack Hospital" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    });

    console.log("=================================");
    console.log("EMAIL SENT SUCCESSFULLY ✅");
    console.log("Recipient:", to);
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);
    console.log("=================================");

    return info;

  } catch (error) {
    console.error("=================================");
    console.error("EMAIL ERROR ❌");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("Command:", error.command);
    console.error("Response:", error.response);
    console.error("=================================");

    throw error;
  }
};

module.exports = sendMail;
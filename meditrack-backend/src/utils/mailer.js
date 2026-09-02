const nodemailer = require("nodemailer");
const dns = require("dns");

/* =========================================
   FORCE NODE.JS TO PREFER IPv4
========================================= */

dns.setDefaultResultOrder("ipv4first");

/* =========================================
   GMAIL SMTP CONFIGURATION
========================================= */

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",

  port: 587,

  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 30000,

  greetingTimeout: 30000,

  socketTimeout: 60000,

  family: 4,

  tls: {
    rejectUnauthorized: true,
    minVersion: "TLSv1.2",
  },
});

/* =========================================
   TEST SMTP CONNECTION
========================================= */

(async () => {
  try {
    console.log("=================================");
    console.log("GMAIL SMTP: Testing connection...");
    console.log("Host: smtp.gmail.com");
    console.log("Port: 587");
    console.log("DNS Order: IPv4 First");
    console.log("IPv4: Forced");
    console.log("User:", process.env.EMAIL_USER);
    console.log("=================================");

    await transporter.verify();

    console.log("=================================");
    console.log("GMAIL SMTP CONNECTION SUCCESSFUL ✅");
    console.log("=================================");

  } catch (error) {

    console.error("=================================");
    console.error("GMAIL SMTP CONNECTION FAILED ❌");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("Command:", error.command);
    console.error("Response:", error.response);
    console.error("=================================");
  }
})();

/* =========================================
   SEND EMAIL
========================================= */

const sendMail = async (
  to,
  subject,
  htmlContent
) => {

  if (!to) {
    throw new Error(
      "Recipient email is required"
    );
  }

  if (!process.env.EMAIL_USER) {
    throw new Error(
      "EMAIL_USER environment variable is missing"
    );
  }

  if (!process.env.EMAIL_PASS) {
    throw new Error(
      "EMAIL_PASS environment variable is missing"
    );
  }

  try {

    console.log("=================================");
    console.log("GMAIL: Sending email...");
    console.log(
      "From:",
      process.env.EMAIL_USER
    );
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("=================================");

    const info =
      await transporter.sendMail({

        from: `"MediTrack Hospital" <${process.env.EMAIL_USER}>`,

        to,

        subject,

        html: htmlContent,

      });

    console.log("=================================");
    console.log(
      "EMAIL SENT SUCCESSFULLY ✅"
    );
    console.log(
      "Recipient:",
      to
    );
    console.log(
      "Message ID:",
      info.messageId
    );
    console.log(
      "Response:",
      info.response
    );
    console.log("=================================");

    return info;

  } catch (error) {

    console.error("=================================");
    console.error(
      "GMAIL EMAIL ERROR ❌"
    );
    console.error(
      "Message:",
      error.message
    );
    console.error(
      "Code:",
      error.code
    );
    console.error(
      "Command:",
      error.command
    );
    console.error(
      "Response:",
      error.response
    );
    console.error("=================================");

    throw error;
  }
};

module.exports = sendMail;
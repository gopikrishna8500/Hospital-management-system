const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  logger: true,
  debug: true,
});


/* =========================================
   TEST GMAIL CONNECTION
========================================= */

const verifyMailer = async () => {
  try {

    console.log("=================================");
    console.log("GMAIL SMTP TEST");
    console.log("=================================");

    console.log(
      "EMAIL_USER:",
      process.env.EMAIL_USER
        ? "Loaded ✅"
        : "Missing ❌"
    );

    console.log(
      "EMAIL_PASS:",
      process.env.EMAIL_PASS
        ? "Loaded ✅"
        : "Missing ❌"
    );

    await transporter.verify();

    console.log(
      "GMAIL SMTP CONNECTION SUCCESSFUL ✅"
    );

    console.log("=================================");

  } catch (error) {

    console.error(
      "GMAIL SMTP CONNECTION FAILED ❌"
    );

    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("Response:", error.response);
    console.error("Response Code:", error.responseCode);

    console.error("=================================");
  }
};


/* =========================================
   SEND EMAIL
========================================= */

const sendMail = async (
  to,
  subject,
  htmlContent
) => {

  try {

    console.log("=================================");
    console.log("GMAIL: Sending email...");
    console.log("From:", process.env.EMAIL_USER);
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("=================================");

    const info = await transporter.sendMail({

      from:
        `"MediTrack Hospital" <${process.env.EMAIL_USER}>`,

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
    console.error("Response Code:", error.responseCode);
    console.error("=================================");

    throw error;
  }
};


/* =========================================
   RUN CONNECTION TEST
========================================= */

verifyMailer();


module.exports = sendMail;
const nodemailer = require("nodemailer");
const dns = require("dns").promises;

/* =========================================
   GET GMAIL IPv4 ADDRESS
========================================= */

const getGmailIPv4 = async () => {
  try {
    const addresses = await dns.resolve4("smtp.gmail.com");

    console.log("=================================");
    console.log("GMAIL IPv4 ADDRESSES:");
    console.log(addresses);
    console.log("=================================");

    if (!addresses || addresses.length === 0) {
      throw new Error(
        "No IPv4 address found for smtp.gmail.com"
      );
    }

    return addresses[0];

  } catch (error) {
    console.error(
      "GMAIL IPv4 DNS ERROR:",
      error.message
    );

    throw error;
  }
};


/* =========================================
   CREATE SMTP TRANSPORTER
========================================= */

const createTransporter = async () => {

  const gmailIPv4 =
    await getGmailIPv4();

  console.log("=================================");
  console.log(
    "Connecting to Gmail IPv4:",
    gmailIPv4
  );
  console.log("Port: 587");
  console.log("=================================");

  const transporter =
    nodemailer.createTransport({

      /*
       Use Gmail IPv4 address directly
      */

      host: gmailIPv4,

      port: 587,

      secure: false,

      requireTLS: true,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },

      /*
       IMPORTANT:
       Connect using IP,
       but validate Gmail TLS hostname
      */

      tls: {
        servername: "smtp.gmail.com",
        rejectUnauthorized: true,
        minVersion: "TLSv1.2",
      },

      connectionTimeout: 30000,

      greetingTimeout: 30000,

      socketTimeout: 60000,

      family: 4,
    });

  return transporter;
};


/* =========================================
   TEST SMTP CONNECTION
========================================= */

(async () => {

  try {

    console.log("=================================");
    console.log(
      "GMAIL SMTP: Testing IPv4 connection..."
    );
    console.log(
      "User:",
      process.env.EMAIL_USER
    );
    console.log("=================================");

    const transporter =
      await createTransporter();

    await transporter.verify();

    console.log("=================================");
    console.log(
      "GMAIL SMTP CONNECTION SUCCESSFUL ✅"
    );
    console.log("=================================");

  } catch (error) {

    console.error("=================================");
    console.error(
      "GMAIL SMTP CONNECTION FAILED ❌"
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

  try {

    console.log("=================================");
    console.log(
      "GMAIL: Creating IPv4 SMTP connection..."
    );
    console.log("To:", to);
    console.log("=================================");

    const transporter =
      await createTransporter();

    console.log("=================================");
    console.log(
      "GMAIL: Sending email..."
    );
    console.log(
      "From:",
      process.env.EMAIL_USER
    );
    console.log(
      "To:",
      to
    );
    console.log(
      "Subject:",
      subject
    );
    console.log("=================================");

    const info =
      await transporter.sendMail({

        from:
          `"MediTrack Hospital" <${process.env.EMAIL_USER}>`,

        to,

        subject,

        html: htmlContent,

      });

    console.log("=================================");
    console.log(
      "EMAIL SENT SUCCESSFULLY ✅"
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

    transporter.close();

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
    console.error("=================================");

    throw error;
  }

};


module.exports = sendMail;
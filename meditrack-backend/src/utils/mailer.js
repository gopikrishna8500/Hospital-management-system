const { Resend } = require("resend");

/* =========================================
   RESEND CONFIGURATION
========================================= */

const resend = new Resend(
  process.env.RESEND_API_KEY
);

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

  if (!process.env.RESEND_API_KEY) {
    throw new Error(
      "RESEND_API_KEY is missing"
    );
  }

  try {

    console.log("=================================");
    console.log(
      "RESEND: Sending email..."
    );
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("=================================");

    const { data, error } =
      await resend.emails.send({

        /*
         TEMPORARY TEST SENDER
        */

        from:
          "MediTrack Hospital <onboarding@resend.dev>",

        to: [to],

        subject: subject,

        html: htmlContent,

      });

    if (error) {

      console.error(
        "RESEND API ERROR:",
        error
      );

      throw new Error(
        error.message ||
        "Failed to send email"
      );
    }

    console.log("=================================");
    console.log(
      "EMAIL SENT SUCCESSFULLY WITH RESEND ✅"
    );
    console.log(
      "Email ID:",
      data?.id
    );
    console.log("=================================");

    return data;

  } catch (error) {

    console.error("=================================");
    console.error(
      "RESEND EMAIL ERROR ❌"
    );
    console.error(
      "Message:",
      error.message
    );
    console.error("=================================");

    throw error;
  }
};

module.exports = sendMail;
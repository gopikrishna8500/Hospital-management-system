const { Resend } = require("resend");

/* =========================================
   CREATE RESEND CLIENT
========================================= */

const getResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set in environment variables");
  }

  return new Resend(process.env.RESEND_API_KEY);
};

/* =========================================
   FROM ADDRESS
========================================= */

const getFromAddress = () => {
  const fromEmail =
    process.env.FROM_EMAIL || "MediTrack Hospital <onboarding@resend.dev>";
  return fromEmail;
};

/* =========================================
   SEND EMAIL
========================================= */

const sendMail = async (to, subject, htmlContent) => {
  if (!to) {
    throw new Error("Recipient email is required");
  }

  const resend = getResendClient();
  const from = getFromAddress();

  console.log("=================================");
  console.log("RESEND: Sending email...");
  console.log("From:", from);
  console.log("To:", to);
  console.log("Subject:", subject);
  console.log("=================================");

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html: htmlContent,
  });

  if (error) {
    console.error("=================================");
    console.error("RESEND EMAIL ERROR ❌");
    console.error("Message:", error.message);
    console.error("=================================");
    throw error;
  }

  console.log("=================================");
  console.log("EMAIL SENT SUCCESSFULLY ✅");
  console.log("Message ID:", data.id);
  console.log("=================================");

  return data;
};

module.exports = sendMail;

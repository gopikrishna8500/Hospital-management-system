const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (to, subject, htmlContent) => {
  try {
    console.log("=================================");
    console.log("RESEND: Sending email...");
    console.log("From:", process.env.RESEND_FROM_EMAIL);
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("=================================");

    const { data, error } = await resend.emails.send({
      from: `MediTrack Hospital <${process.env.RESEND_FROM_EMAIL}>`,
      to: [to],
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      console.error("=================================");
      console.error("RESEND EMAIL ERROR ❌");
      console.error(error);
      console.error("=================================");

      throw new Error(error.message || "Email sending failed");
    }

    console.log("=================================");
    console.log("EMAIL SENT SUCCESSFULLY ✅");
    console.log("Recipient:", to);
    console.log("Email ID:", data.id);
    console.log("=================================");

    return data;

  } catch (error) {
    console.error("EMAIL ERROR ❌");
    console.error(error.message);

    throw error;
  }
};

module.exports = sendMail;
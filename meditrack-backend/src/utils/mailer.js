// const { Resend } = require("resend");

// const resend = new Resend(process.env.RESEND_API_KEY);

// const sendMail = async (to, subject, htmlContent) => {
//   try {
//     console.log("=================================");
//     console.log("RESEND: Sending email...");
//     console.log("From:", process.env.RESEND_FROM_EMAIL);
//     console.log("To:", to);
//     console.log("Subject:", subject);
//     console.log("=================================");

//     const { data, error } = await resend.emails.send({
//       from: `MediTrack Hospital <${process.env.RESEND_FROM_EMAIL}>`,
//       to: [to],
//       subject: subject,
//       html: htmlContent,
//     });

//     if (error) {
//       console.error("=================================");
//       console.error("RESEND EMAIL ERROR ❌");
//       console.error(error);
//       console.error("=================================");

//       throw new Error(error.message || "Email sending failed");
//     }

//     console.log("=================================");
//     console.log("EMAIL SENT SUCCESSFULLY ✅");
//     console.log("Recipient:", to);
//     console.log("Email ID:", data.id);
//     console.log("=================================");

//     return data;

//   } catch (error) {
//     console.error("EMAIL ERROR ❌");
//     console.error(error.message);

//     throw error;
//   }
// };

// module.exports = sendMail;


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000,
});

const sendMail = async (to, subject, htmlContent) => {
  try {
    if (!to || typeof to !== "string") {
      throw new Error("Valid recipient email is required");
    }

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
    console.error("GMAIL EMAIL ERROR ❌");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("Command:", error.command);
    console.error("=================================");

    throw error;
  }
};

module.exports = sendMail;
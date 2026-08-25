// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",

//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const sendMail = async (to, subject, htmlContent) => {
//   await transporter.sendMail({
//     from: `"MediTrack Hospital" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html: htmlContent,
//   });

//   console.log(`Email sent successfully to ${to} ✅`);
// };

// module.exports = sendMail;



const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (to, subject, htmlContent) => {
  try {
    const info = await transporter.sendMail({
      from: `"MediTrack Hospital" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    });

    console.log("Email sent successfully ✅");
    console.log("Email recipient:", to);
    console.log("Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("EMAIL ERROR ❌");
    console.error(error);

    // IMPORTANT: allow appointments.js to know email failed
    throw error;
  }
};

module.exports = sendMail;
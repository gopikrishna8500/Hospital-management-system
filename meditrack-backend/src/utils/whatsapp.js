const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendWhatsApp = async (mobile, message) => {
  try {
    const response = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER, // whatsapp:+14155238886
      to: `whatsapp:+91${mobile}`,
      body: message,
    });

    console.log("WhatsApp Sent:", response.sid);
  } catch (error) {
    console.error("WhatsApp Error:", error.message);
  }
};

module.exports = sendWhatsApp;
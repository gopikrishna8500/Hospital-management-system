const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendWhatsApp = async (mobile, message) => {
  try {
    if (!mobile) {
      throw new Error("Mobile number is required");
    }

    let phone = mobile.replace(/\D/g, "");

    if (phone.startsWith("0")) {
      phone = "91" + phone.substring(1);
    }

    if (phone.length === 10) {
      phone = "91" + phone;
    }

    if (phone.length !== 12 || !phone.startsWith("91")) {
      throw new Error("Invalid Indian mobile number");
    }

    const result = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: `whatsapp:+${phone}`,
      body: message,
    });

    console.log("WhatsApp sent successfully:", result.sid);

    return result;

  } catch (error) {
    console.error("WhatsApp Error:", error.message);
    throw error;
  }
};

module.exports = sendWhatsApp;
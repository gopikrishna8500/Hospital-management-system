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

    console.log("=================================");
    console.log("WHATSAPP: Sending message...");
    console.log("Mobile:", phone);
    console.log("=================================");

    const result = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: `whatsapp:+${phone}`,
      body: message,
    });

    console.log("=================================");
    console.log("WHATSAPP SENT SUCCESSFULLY ✅");
    console.log("Message SID:", result.sid);
    console.log("Status:", result.status);
    console.log("=================================");

    return result;

  } catch (error) {
    console.error("=================================");
    console.error("WHATSAPP ERROR ❌");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("=================================");

    throw error;
  }
};

module.exports = sendWhatsApp;
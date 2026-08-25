require("dotenv").config();

const sendWhatsApp = require("./src/utils/whatsapp");

sendWhatsApp(
  "7995127015",
  `MediTrack Hospital 🏥

This is a test message.

WhatsApp notification system is working successfully ✅`
)
  .then(() => {
    console.log("WhatsApp test completed ✅");
  })
  .catch((error) => {
    console.error("WhatsApp test failed ❌");
    console.error(error.message);
  });
// require("dotenv").config();

// const app = require("./src/app");

// const PORT = process.env.PORT || 5000;

// console.log("=================================");
// console.log("MediTrack Environment Check");
// console.log("=================================");

// console.log(
//   "EMAIL_USER:",
//   process.env.EMAIL_USER ? "✅ Loaded" : "❌ Missing"
// );

// console.log(
//   "EMAIL_PASS:",
//   process.env.EMAIL_PASS ? "✅ Loaded" : "❌ Missing"
// );

// console.log(
//   "TWILIO_ACCOUNT_SID:",
//   process.env.TWILIO_ACCOUNT_SID ? "✅ Loaded" : "❌ Missing"
// );

// console.log(
//   "TWILIO_AUTH_TOKEN:",
//   process.env.TWILIO_AUTH_TOKEN ? "✅ Loaded" : "❌ Missing"
// );

// console.log(
//   "TWILIO_WHATSAPP_FROM:",
//   process.env.TWILIO_WHATSAPP_FROM ? "✅ Loaded" : "❌ Missing"
// );

// console.log("=================================");

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT || 5000;

console.log("=================================");
console.log("MediTrack Environment Check");
console.log("=================================");

console.log(
  "EMAIL_USER:",
  process.env.EMAIL_USER ? "✅ Loaded" : "❌ Missing"
);

console.log(
  "EMAIL_PASS:",
  process.env.EMAIL_PASS ? "✅ Loaded" : "❌ Missing"
);

console.log(
  "ADMIN_EMAIL:",
  process.env.ADMIN_EMAIL ? "✅ Loaded" : "❌ Missing"
);

console.log(
  "DATABASE_URL:",
  process.env.DATABASE_URL ? "✅ Loaded" : "❌ Missing"
);

console.log("=================================");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
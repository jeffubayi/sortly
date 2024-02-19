// Require the package
const AfricasTalking = require("africastalking");

// Initialize the SDK
const username = process.env.AT_USER_NAME
const from = process.env.AT_FROM
const apiKey = process.env.AT_API

const africastalking = AfricasTalking({
  username,
  apiKey,
});

// Send SMS
module.exports = async function sendSMS(message,recipients) {
  try {
    const result = await africastalking.SMS.send({
      from,
      to: recipients,
      message,
    });
    console.log(result);
  } catch (ex) {
    console.error(ex);
  }
};

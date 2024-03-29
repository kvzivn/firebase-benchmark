const functions = require("firebase-functions");

const API_ENDPOINT =
  "https://clientapi.benchmarkemail.com/Contact/21019657/ContactDetails";
const AUTH_TOKEN = functions.config().benchmark.key;

exports.addBenchmarkContact = functions.https.onCall(async (data, context) => {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "AuthToken": AUTH_TOKEN,
    },
    body: JSON.stringify({
      Data: {
        Email: data.email,
        EmailPerm: "1",
      },
    }),
  });

  if (!response.ok) {
    throw new functions.https.HttpsError("unknown", "Failed to add contact");
  }

  const responseData = await response.json();

  return responseData;
});

import axios from "axios";

export const sendSMS = async (message: any, destination: any) => {
  const smsData = {
    version: "1.0",
    applicationId: process.env.SMS_APP_ID,
    password: process.env.SMS_APP_PASSWORD,
    message: message,
    destinationAddresses: [destination],
    sourceAddress: "77000",
    deliveryStatusRequest: "1",
    encoding: "245",
    binaryHeader: process.env.SMS_BINARY_HEADER,
  };

  try {
    const response = await axios.post(
      "https://api.ideamart.io/sms/send",
      smsData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("SMS sent successfully", response.data);
  } catch (error) {
    console.error("Error sending SMS", error);
    throw error;
  }
};

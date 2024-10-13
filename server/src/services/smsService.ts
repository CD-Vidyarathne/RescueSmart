import axios from "axios";

export const sendSMSToUser = async (message: any, destination: any) => {
  const smsData = {
    applicationId: process.env.SMS_APP_ID,
    password: process.env.SMS_APP_PASSWORD,
    message: message,
    destinationAddresses: [`tel: ${destination}`],
    deliveryStatusRequest: "1",
  };

  console.log(smsData);

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

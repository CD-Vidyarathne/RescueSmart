import axios from "axios";

export const subscribeUser = async (number: any) => {
  const request = {
    applicationId: process.env.SMS_APP_ID,
    password: process.env.SMS_APP_PASSWORD,
    action: "1",
    subscriberId: `tel:${number}`,
  };

  console.log("Subscription Request: ", request);

  try {
    const response = await axios.post(
      "https://api.ideamart.io/subscription/send",
      request,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("Subscribed", response.data);
  } catch (error) {
    console.error("Error sending SMS", error);
    throw error;
  }
};

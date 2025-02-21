import axios from "axios";

export const subscribeUser = async (
  number: any,
  method: "subscribe" | "unsubscribe",
) => {
  const request = {
    applicationId: process.env.SMS_APP_ID,
    password: process.env.SMS_APP_PASSWORD,
    action: method == "subscribe" ? "1" : "0",
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
    console.log("Subscription process completed.", response.data);
  } catch (error) {
    console.error("Error sending SMS", error);
    throw error;
  }
};

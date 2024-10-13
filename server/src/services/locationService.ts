import axios from "axios";

export const getLocationOfUser = async (userNumber: any) => {
  const request = {
    applicationId: process.env.SMS_APP_ID,
    password: process.env.SMS_APP_PASSWORD,
    subscriberId: `tel: ${userNumber}`,
    serviceType: "IMMEDIATE",
    responseTime: "NO_DELAY",
    freshness: "HIGH",
    horizontalAccuracy: "1500",
  };

  try {
    const response = await axios.post(
      "https://api.ideamart.io/lbs/locate",
      request,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("Location : ", response.data);
    let result;
    if (response.data.latitude && response.data.longitude) {
      result = {
        lat: response.data.latitude,
        long: response.data.longitude,
      };
    } else {
      result = {
        lat: null,
        long: null,
      };
    }
    // return result;
    // NOTE: This is for testing only
    return {
      lat: 9.6615,
      long: 80.0255,
    };
  } catch (error) {
    console.error("Error fetching location", error);
    return {
      lat: null,
      long: null,
    };
  }
};

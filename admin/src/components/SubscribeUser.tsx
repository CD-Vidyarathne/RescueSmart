import React, { useState } from "react";
import axios from "../config/axiosClient";

const SubscribeUser: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubscribe = () => {
    axios.post("/subscription/subscribe", {
      number: phoneNumber,
    });
    console.log(`Subscribed user with phone number: ${phoneNumber}`);
  };

  const handleUnsubscribe = () => {
    axios.post("/subscription/unsubscribe", {
      number: phoneNumber,
    });
    console.log(`Unsubscribed user with phone number: ${phoneNumber}`);
  };

  return (
    <div className="flex flex-col bg-white p-6 rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Subscribe/Unsubscribe User</h2>
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <p className="text-gray-500">
        Phone number must be in format of 947712345678
      </p>
      <div className="flex-grow" />
      <div className="flex gap-2">
        <button
          onClick={handleSubscribe}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Subscribe
        </button>
        <button
          onClick={handleUnsubscribe}
          className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
        >
          Unsubscribe
        </button>
      </div>
    </div>
  );
};

export default SubscribeUser;

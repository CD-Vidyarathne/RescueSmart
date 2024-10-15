import React, { useState } from "react";
import axios from "../config/axiosClient";

const BroadcastMessage: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleBroadcast = () => {
    axios.post("/sms/send-all", {
      message,
    });
    console.log(`Broadcasting message: ${message}`);
  };

  return (
    <div className="flex flex-col bg-white p-6 rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Send Broadcast SMS</h2>
      <textarea
        placeholder="Message to Broadcast"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <div className="flex-grow" />
      <button
        onClick={handleBroadcast}
        className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
      >
        Send Broadcast
      </button>
    </div>
  );
};

export default BroadcastMessage;

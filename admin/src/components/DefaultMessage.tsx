import React from "react";

const DefaultMessage: React.FC = () => {
  return (
    <div
      className="p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700"
      role="alert"
    >
      <h2 className="font-bold text-lg">
        Welcome to the Disaster Management Service
      </h2>
      <ul className="list-disc list-inside">
        <li>
          <strong>SAFELOCATION:</strong> Use this command followed by your
          location to save a safe location. Example:
          <code className="bg-gray-200 p-1">SAFELOCATION [Location Name]</code>
        </li>
        <li>
          <strong>HELPER:</strong> If you want to volunteer as a helper, send
          this command followed by your name. Example:
          <code className="bg-gray-200 p-1">HELPER [Your Name]</code>
        </li>
        <li>
          <strong>NEARESTHELP:</strong> To get information about the nearest
          safe locations and helper contacts, use this command.
        </li>
      </ul>
      <p>For further assistance, please contact our support team.</p>
    </div>
  );
};

export default DefaultMessage;

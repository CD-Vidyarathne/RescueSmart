import React from "react";

const DefaultMessage: React.FC = () => {
  return (
    <div>
      <div className="p-4  border-4" role="alert">
        <div className="bg-blue-100">
          <h2 className="font-bold text-lg">Demo Broadcast Messages.</h2>
        </div>
        <ul className="list-disc list-inside">
          <li>
            <strong>SAFELOCATION:</strong> Use this command followed by your
            location to save a safe location. Example:
            <code className="bg-gray-200 p-1">
              SAFELOCATION [Location Name]
            </code>
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
          <li>Ask Any question directly from SMS for any help.</li>
        </ul>
        <p>For further assistance, please contact our support team.</p>
      </div>
      <div className="p-4  border-4" role="alert">
        Are you in a safe place? Are there any room for others? You can help
        them by providing your location.
        <strong>SAFELOCATION:</strong> Use this command followed by your
        location to save a safe location. Example:
        <code className="bg-gray-200 p-1">SAFELOCATION [Location Name]</code>
      </div>
    </div>
  );
};

export default DefaultMessage;

import React, { useState, useEffect } from "react";
import axios from "../config/axiosClient";

interface Disaster {
  city: string;
  disaster: string;
}

const CurrentDisasters: React.FC = () => {
  const [disasters, setDisasters] = useState<Disaster[]>([]);

  useEffect(() => {
    fetchDisasters();
  }, []);

  const fetchDisasters = async () => {
    try {
      const response = await axios.get("/locations/current-disasters");
      setDisasters(response.data); // Assuming the data is an array of disasters
    } catch (error) {
      console.error("Error fetching current disasters:", error);
    }
  };

  const handleRemoveDisaster = async (disaster: Disaster) => {
    const csvString = `${disaster.city},${disaster.disaster}\n`;
    try {
      await axios.post("/locations/remove-disaster", { csvString });
      setDisasters(
        disasters.filter(
          (d) =>
            !(d.city === disaster.city && d.disaster === disaster.disaster),
        ),
      );
    } catch (error) {
      console.error("Error removing disaster:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Current Disasters</h2>
      {disasters.length > 0 ? (
        <div className="max-h-48 overflow-y-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">City</th>
                <th className="py-2">Type</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {disasters.map((disaster, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 border">{disaster.city}</td>
                  <td className="py-2 border">{disaster.disaster}</td>
                  <td className="py-2 border">
                    <button
                      onClick={() => handleRemoveDisaster(disaster)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No current disasters reported.</p>
      )}
    </div>
  );
};

export default CurrentDisasters;

import React from "react";
import Navbar from "./components/Navbar";
import AddDisaster from "./components/AddDisaster";
import SubscribeUser from "./components/SubscribeUser";
import BroadcastMessage from "./components/BroadcastMessage";
import DefaultMessage from "./components/DefaultMessage";
import CurrentDisasters from "./components/CurrentDisasters";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Functions</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AddDisaster />
          <CurrentDisasters />
          <SubscribeUser />
          <BroadcastMessage />
          <DefaultMessage />
        </div>
      </div>
    </div>
  );
};

export default App;

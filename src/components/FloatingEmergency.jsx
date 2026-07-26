import React from "react";
import { PhoneCall } from "lucide-react";

const FloatingEmergency = () => {
  return (
    <a
      href="tel:+919876543210"
      className="fixed bottom-24 right-6 z-50 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-xl animate-pulse transition-all duration-300"
      title="Emergency Call"
    >
      <PhoneCall size={26} />
    </a>
  );
};

export default FloatingEmergency;
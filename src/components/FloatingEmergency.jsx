import React from "react";
import { PhoneCall } from "lucide-react";

const FloatingEmergency = () => {
  return (
    <a
      href="tel:+919876543210"
      className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-xl z-50 animate-pulse"
    >
      <PhoneCall size={26} />
    </a>
  );
};

export default FloatingEmergency;
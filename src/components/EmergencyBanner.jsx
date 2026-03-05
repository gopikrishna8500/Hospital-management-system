import React from "react";
import { PhoneCall, Ambulance } from "lucide-react";
import { Link } from "react-router-dom";

const EmergencyBanner = () => {
  return (
    <section className="bg-red-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">

        {/* Left Content */}
        <div className="flex items-center space-x-4 mb-6 md:mb-0">
          <Ambulance className="w-12 h-12" />

          <div>
            <h2 className="text-2xl font-bold">
              24/7 Emergency Medical Service
            </h2>
            <p className="text-red-100 text-sm">
              Immediate medical care available anytime. Call our emergency team now.
            </p>
          </div>
        </div>

        {/* Right Buttons */}
        <div className="flex space-x-4">

          <a
            href="tel:+919876543210"
            className="flex items-center bg-white text-red-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            <PhoneCall className="w-5 h-5 mr-2" />
            Call Now
          </a>

          <Link
            to="/appointments"
            className="flex items-center border border-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition"
          >
            Book Appointment
          </Link>

        </div>

      </div>
    </section>
  );
};

export default EmergencyBanner;
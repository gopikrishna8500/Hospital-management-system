import React from "react";
import { useNavigate } from "react-router-dom";

const CallToActionSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-linear-to-r from-teal-950 via-teal-900 to-teal-800 py-20 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Transform Your Hospital Management?
        </h2>
        <p className="text-md md:text-lg mb-8 max-w-2xl mx-auto">
          Experience secure, intelligent patient tracking, seamless EMR, automated billing, and full hospital workflow management — all in one unified platform with MediTrack.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <button
            onClick={() => navigate("/appointments")}
            className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-3 rounded-md font-semibold shadow-lg transition transform hover:scale-105"
          >
            Book Appointment
          </button>

          <button
            onClick={() => navigate("/contact-us")}
            className="bg-white text-teal-900 hover:text-teal-700 hover:bg-teal-100 px-6 py-3 rounded-md font-semibold shadow-lg transition transform hover:scale-105"
          >
            Request Demo
          </button>
        </div>

        <p className="mt-6 text-sm text-teal-200">
          Trusted by healthcare professionals worldwide for secure and efficient hospital management.
        </p>
      </div>
    </section>
  );
};

export default CallToActionSection;

import React from "react";
import { useParams } from "react-router-dom";
import { doctorsData } from "./DoctorCard";

const Appointment = () => {
  const { id } = useParams();

  const doctor = doctorsData.find(
    (doc) => doc.id === parseInt(id)
  );

  if (!doctor) {
    return <div className="p-10">Doctor Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          Book Appointment with {doctor.name}
        </h2>

        <p className="text-gray-600 mb-2">
          Specialization: {doctor.specialization}
        </p>

        <p className="text-gray-600 mb-6">
          Experience: {doctor.experience}
        </p>

        {/* Example Form */}
        <input
          type="date"
          className="w-full border p-3 rounded-md mb-4"
        />

        <button className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition">
          Confirm Appointment
        </button>
      </div>
    </div>
  );
};

export default Appointment;
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { doctorsData } from "../pages/DoctorCard";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctor = doctorsData.find((doc) => doc.id === parseInt(id));

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Doctor not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 flex flex-col md:flex-row gap-8">
        {/* Doctor Photo */}
        <div className="shrink-0">
          <div className="w-48 h-48 bg-gray-300 rounded-full"></div>
        </div>

        {/* Doctor Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-teal-600">{doctor.name}</h1>
          <p className="text-lg text-gray-600 mt-2">{doctor.specialization}</p>
          <p className="text-sm text-gray-500 mt-1">Experience: {doctor.experience}</p>
          
          {/* Availability */}
          <div className="mt-2">
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                doctor.availability === "Available"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {doctor.availability}
            </span>
          </div>

          {/* Rating */}
          <div className="flex mt-3">
            {Array.from({ length: doctor.rating }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400" />
            ))}
          </div>

          {/* Doctor Bio */}
          <p className="mt-4 text-gray-700">
            Dr. {doctor.name} is a highly skilled specialist in {doctor.specialization}. 
            With {doctor.experience} of experience, Dr. {doctor.name} is committed 
            to providing compassionate and professional care to all patients.
          </p>

          {/* Book Appointment */}
          <button
            onClick={() => navigate(`/appointments/book/${doctor.id}`)}
            className="mt-6 bg-teal-600 text-white py-2 px-6 rounded-md hover:bg-teal-700 transition"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;

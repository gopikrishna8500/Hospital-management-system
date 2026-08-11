import React from "react";
import { Star, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  if (!doctor) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center">

      {/* Doctor Photo */}
      <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center mb-4 overflow-hidden border-2 border-teal-100">

        {doctor.photo ? (
          <img
            src={doctor.photo}
            alt={doctor.name || "Doctor"}
            className="w-full h-full object-cover"
          />
        ) : (
          <UserRound
            size={70}
            className="text-gray-400"
          />
        )}

      </div>

      {/* Doctor Name */}
      <h3 className="text-xl font-bold text-gray-900">
        {doctor.name || "Doctor Name Not Available"}
      </h3>

      {/* Specialization */}
      <p className="text-teal-600 font-semibold mt-2">
        {doctor.specialization || "Specialization Not Available"}
      </p>

      {/* Department */}
      {doctor.department && (
        <p className="text-gray-600 text-sm mt-1">
          Department: {doctor.department}
        </p>
      )}

      {/* Qualification */}
      {doctor.qualification && (
        <p className="text-gray-500 text-sm mt-1">
          {doctor.qualification}
        </p>
      )}

      {/* Experience */}
      <p className="text-sm text-gray-500 mt-2">
        Experience:{" "}
        <span className="font-medium text-gray-700">
          {doctor.experience || "Not specified"}
        </span>
      </p>

      {/* Availability */}
      <div className="mt-3">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            doctor.availability === "Available"
              ? "bg-green-100 text-green-700"
              : doctor.availability === "Busy"
              ? "bg-yellow-100 text-yellow-700"
              : doctor.availability === "On Leave"
              ? "bg-red-100 text-red-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {doctor.availability || "Not Available"}
        </span>
      </div>

      {/* Rating */}
      <div className="flex mt-3 gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            className="text-yellow-400 fill-yellow-400"
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="flex mt-5 gap-3 w-full">

        {/* View Profile */}
        <button
          onClick={() => navigate(`/doctors/${doctor.id}`)}
          className="flex-1 bg-teal-600 text-white py-2.5 rounded-md hover:bg-teal-700 transition font-medium"
        >
          View Profile
        </button>

        {/* Book Appointment */}
        <button
          onClick={() => {
            if (doctor.availability !== "Available") {
              alert(
                `Dr. ${doctor.name} is currently ${doctor.availability}.`
              );
              return;
            }

            navigate(`/appointments/book/${doctor.id}`);
          }}
          disabled={doctor.availability !== "Available"}
          className={`flex-1 py-2.5 rounded-md transition font-medium border ${
            doctor.availability === "Available"
              ? "border-teal-600 text-teal-600 hover:bg-teal-50"
              : "border-gray-300 text-gray-400 cursor-not-allowed"
          }`}
        >
          {doctor.availability === "Available"
            ? "Book Appointment"
            : "Unavailable"}
        </button>

      </div>

    </div>
  );
};

export default DoctorCard;
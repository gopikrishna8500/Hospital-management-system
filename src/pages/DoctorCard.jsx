import React from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Exporting doctorsData for reuse in Doctors.jsx
export const doctorsData = [
  { id: 1, name: "Dr. John Smith", specialization: "General Medicine", experience: "12 Years", availability: "Available", rating: 5 },
  { id: 2, name: "Dr. Sarah Williams", specialization: "Cardiology", experience: "15 Years", availability: "Available", rating: 4 },
  { id: 3, name: "Dr. Michael Brown", specialization: "Neurology", experience: "10 Years", availability: "On Leave", rating: 4 },
  { id: 4, name: "Dr. David Johnson", specialization: "Orthopedics", experience: "14 Years", availability: "Available", rating: 5 },
  { id: 5, name: "Dr. Emily Carter", specialization: "Pediatrics", experience: "8 Years", availability: "Available", rating: 5 },
  { id: 6, name: "Dr. Laura White", specialization: "Gynecology", experience: "11 Years", availability: "Available", rating: 4 },
  { id: 7, name: "Dr. Robert Lee", specialization: "Oncology", experience: "13 Years", availability: "Available", rating: 5 },
  { id: 8, name: "Dr. Angela Scott", specialization: "Emergency", experience: "9 Years", availability: "Available", rating: 4 },
  { id: 9, name: "Dr. Kevin Hall", specialization: "Radiology", experience: "10 Years", availability: "Available", rating: 4 },
  { id: 10, name: "Dr. Rachel Adams", specialization: "Pathology", experience: "7 Years", availability: "On Leave", rating: 4 },
  { id: 11, name: "Dr. Steven Wilson", specialization: "Pharmacy", experience: "12 Years", availability: "Available", rating: 5 },
  { id: 12, name: "Dr. Jennifer Clark", specialization: "ICU", experience: "14 Years", availability: "Available", rating: 5 },
];

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
      {/* Doctor Photo */}
      <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>

      {/* Doctor Info */}
      <h3 className="text-xl font-semibold">{doctor.name}</h3>
      <p className="text-gray-600 mt-2">{doctor.specialization}</p>
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
          <Star key={i} className="w-4 h-4 text-yellow-400" />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex mt-4 gap-3 w-full">
        <button
          onClick={() => navigate(`/doctors/${doctor.id}`)}
          className="flex-1 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
        >
          View Profile
        </button>
        <button
          onClick={() => navigate(`/appointments/book/${doctor.id}`)}
          className="flex-1 border border-teal-600 text-teal-600 py-2 rounded-md hover:bg-teal-50 transition"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;

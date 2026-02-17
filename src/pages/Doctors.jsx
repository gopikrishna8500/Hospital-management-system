import React from "react";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Williams",
    specialization: "Cardiologist",
    experience: "12 Years",
    availability: "Available",
  },
  {
    id: 2,
    name: "Dr. Michael Brown",
    specialization: "Neurologist",
    experience: "10 Years",
    availability: "On Leave",
  },
  {
    id: 3,
    name: "Dr. Emily Carter",
    specialization: "Pediatrician",
    experience: "8 Years",
    availability: "Available",
  },
  {
    id: 4,
    name: "Dr. David Johnson",
    specialization: "Orthopedic",
    experience: "15 Years",
    availability: "Available",
  },
];

const Doctors = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-teal-600 mb-4">
          Our Doctors
        </h1>
        <p className="text-gray-600 text-lg">
          Meet our highly qualified and experienced medical professionals.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
          >
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>

            <h3 className="text-xl font-semibold text-center">
              {doctor.name}
            </h3>

            <p className="text-center text-gray-600 mt-2">
              {doctor.specialization}
            </p>

            <p className="text-center text-sm text-gray-500 mt-1">
              Experience: {doctor.experience}
            </p>

            <div className="text-center mt-4">
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

            <button className="mt-6 w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;

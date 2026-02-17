import React from "react";

const departments = [
  {
    id: 1,
    name: "Cardiology",
    description: "Diagnosis and treatment of heart-related conditions.",
    head: "Dr. Sarah Williams",
    doctors: 5,
  },
  {
    id: 2,
    name: "Neurology",
    description: "Treatment of brain and nervous system disorders.",
    head: "Dr. Michael Brown",
    doctors: 4,
  },
  {
    id: 3,
    name: "Pediatrics",
    description: "Medical care for infants, children, and adolescents.",
    head: "Dr. Emily Carter",
    doctors: 6,
  },
  {
    id: 4,
    name: "Orthopedics",
    description: "Treatment of bones, joints, and musculoskeletal system.",
    head: "Dr. David Johnson",
    doctors: 3,
  },
];

const Departments = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-teal-600 mb-4">
          Our Departments
        </h1>
        <p className="text-gray-600 text-lg">
          Explore our specialized medical departments providing expert care.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
          >
            <h3 className="text-2xl font-semibold text-teal-600 mb-3">
              {dept.name}
            </h3>

            <p className="text-gray-600 mb-4">
              {dept.description}
            </p>

            <p className="text-sm text-gray-500">
              Head: <span className="font-medium">{dept.head}</span>
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Available Doctors: {dept.doctors}
            </p>

            <button className="mt-6 w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;

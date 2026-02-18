import React from "react";
import { useNavigate } from "react-router-dom";

const departments = [
  { id: 1, name: "General Medicine", description: "Comprehensive care for adults, diagnosing and treating common illnesses.", head: "Dr. John Smith", doctors: 6 },
  { id: 2, name: "Cardiology", description: "Diagnosis and treatment of heart-related conditions.", head: "Dr. Sarah Williams", doctors: 5 },
  { id: 3, name: "Neurology", description: "Treatment of brain and nervous system disorders.", head: "Dr. Michael Brown", doctors: 4 },
  { id: 4, name: "Orthopedics", description: "Treatment of bones, joints, and musculoskeletal system.", head: "Dr. David Johnson", doctors: 3 },
  { id: 5, name: "Pediatrics", description: "Medical care for infants, children, and adolescents.", head: "Dr. Emily Carter", doctors: 6 },
  { id: 6, name: "Gynecology", description: "Healthcare for women, including reproductive and maternal care.", head: "Dr. Laura White", doctors: 4 },
  { id: 7, name: "Oncology", description: "Diagnosis and treatment of cancer.", head: "Dr. Robert Lee", doctors: 3 },
  { id: 8, name: "Emergency", description: "24/7 emergency care for urgent medical situations.", head: "Dr. Angela Scott", doctors: 8 },
  { id: 9, name: "Radiology", description: "Medical imaging services for diagnosis and treatment guidance.", head: "Dr. Kevin Hall", doctors: 5 },
  { id: 10, name: "Pathology", description: "Lab testing and analysis for accurate diagnoses.", head: "Dr. Rachel Adams", doctors: 4 },
  { id: 11, name: "Pharmacy", description: "Dispensing medications and managing hospital inventory.", head: "Dr. Steven Wilson", doctors: 3 },
  { id: 12, name: "ICU", description: "Intensive care for critically ill patients requiring specialized attention.", head: "Dr. Jennifer Clark", doctors: 5 },
];

const Departments = () => {
  const navigate = useNavigate();

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

            <button
              onClick={() =>
                navigate(`/departments/${encodeURIComponent(dept.name.toLowerCase())}`)
              }
              className="mt-6 w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;

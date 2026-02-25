import React from "react";
import { useParams } from "react-router-dom";
import { doctorsData } from "../data/doctorsData";
import { useNavigate } from "react-router-dom";
const DepartmentDetails = () => {
  const navigate = useNavigate();
  const { departmentName } = useParams();

  const departmentDoctors = doctorsData.filter(
    (doc) =>
      doc.specialization.toLowerCase() === departmentName.toLowerCase()
  );

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-teal-600 capitalize">
          {departmentName} Department
        </h1>
        <p className="text-gray-600 mt-3">
          Meet our expert doctors in the {departmentName} department.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {departmentDoctors.length > 0 ? (
          departmentDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>

              <h3 className="text-xl font-semibold text-center">
                {doctor.name}
              </h3>

              <p className="text-center text-sm text-gray-500 mt-2">
                Experience: {doctor.experience}
              </p>

              <div className="text-center mt-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${doctor.availability === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                    }`}
                >
                  {doctor.availability}
                </span>
              </div>
              {/* <Link
                to="/doctors"
                className="bg-teal-600 text-white text-center py-2 rounded-md mt-4"
              >
                Book Appointment
              </Link> */}

              <button
                onClick={() => navigate("/appointments")}
                className="mt-6 w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
              >
                Book Appointment
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No doctors found for this department.
          </p>
        )}
      </div>
    </div>
  );
};

export default DepartmentDetails;

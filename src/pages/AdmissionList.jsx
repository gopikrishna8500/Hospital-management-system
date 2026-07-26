import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const AdmissionList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("admissions")) || [];

    setPatients(data);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-teal-700 mb-6">
          Admitted Patients
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-teal-600 text-white">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Room</th>
              <th className="p-3 text-left">Doctor</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-b">
                <td className="p-3">{patient.patientName}</td>
                <td className="p-3">{patient.roomNumber}</td>
                <td className="p-3">{patient.doctor}</td>
                <td className="p-3 text-center">
                  <Link
                    to={`/discharge/${patient.id}`}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                  >
                    Discharge
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdmissionList;
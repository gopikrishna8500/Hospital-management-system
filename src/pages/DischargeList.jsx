import React, { useEffect, useState } from "react";

const DischargeList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("dischargedPatients")) || [];

    setPatients(data);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h2 className="text-2xl font-bold text-red-600 mb-6">
          Discharged Patients
        </h2>

        <table className="w-full border-collapse">

          <thead>
            <tr className="bg-red-600 text-white">
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">Room</th>
              <th className="p-3 text-left">Doctor</th>
              <th className="p-3 text-left">Discharge Date</th>
            </tr>
          </thead>

          <tbody>

            {patients.map((patient) => (
              <tr key={patient.id} className="border-b">
                <td className="p-3">
                  {patient.patientName}
                </td>

                <td className="p-3">
                  {patient.roomNumber}
                </td>

                <td className="p-3">
                  {patient.doctor}
                </td>

                <td className="p-3">
                  {patient.dischargeDate}
                </td>
              </tr>
            ))}

            {patients.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-6 text-gray-500"
                >
                  No discharged patients
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
};

export default DischargeList;
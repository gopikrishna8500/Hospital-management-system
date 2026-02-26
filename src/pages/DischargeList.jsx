import React from "react";

const dischargedPatients = [
  {
    id: 1,
    name: "John Doe",
    room: "101A",
    doctor: "Dr. Smith",
    dischargeDate: "2026-02-20",
  },
  {
    id: 2,
    name: "Mary Johnson",
    room: "203B",
    doctor: "Dr. Adams",
    dischargeDate: "2026-02-22",
  },
];

const DischargeList = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-6">
          Discharged Patients
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-red-600 text-white">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Room</th>
              <th className="p-3 text-left">Doctor</th>
              <th className="p-3 text-left">Discharge Date</th>
            </tr>
          </thead>

          <tbody>
            {dischargedPatients.map((patient) => (
              <tr key={patient.id} className="border-b">
                <td className="p-3">{patient.name}</td>
                <td className="p-3">{patient.room}</td>
                <td className="p-3">{patient.doctor}</td>
                <td className="p-3">{patient.dischargeDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DischargeList;
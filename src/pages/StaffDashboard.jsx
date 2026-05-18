// import React from "react";

// const StaffDashboard = () => {
//   return (
//     <div className="min-h-screen bg-blue-50 p-10">

//       <h1 className="text-4xl font-bold text-blue-700 mb-8">
//         Staff Dashboard
//       </h1>

//       <div className="grid md:grid-cols-3 gap-6">

//         <div className="bg-white p-8 rounded-2xl shadow-xl">
//           <h2 className="text-2xl font-bold mb-3">Patient Records</h2>
//           <p className="text-gray-600">Manage patient details</p>
//         </div>

//         <div className="bg-white p-8 rounded-2xl shadow-xl">
//           <h2 className="text-2xl font-bold mb-3">Admissions</h2>
//           <p className="text-gray-600">Handle admissions & discharge</p>
//         </div>

//         <div className="bg-white p-8 rounded-2xl shadow-xl">
//           <h2 className="text-2xl font-bold mb-3">Billing Support</h2>
//           <p className="text-gray-600">Assist billing & insurance</p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default StaffDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Users,
  BedDouble,
  CreditCard,
  ClipboardList,
} from "lucide-react";

const StaffDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(
          "https://hospital-management-system-4-kceq.onrender.com/api/patients",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPatients(res.data.data || []);
      } catch (error) {
        console.error("Staff dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [token]);

  if (loading) {
    return (
      <div className="p-6 text-lg font-semibold">
        Loading Staff Dashboard...
      </div>
    );
  }

  // Admissions
  const admissions = patients.filter(
    (p) =>
      p.admission_status === "Admitted" ||
      p.isAdmitted === true
  );

  // Billing Support
  const billingPatients = patients.filter(
    (p) =>
      p.billing_status ||
      p.payment_status
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-teal-700">
          Staff Dashboard
        </h1>

        <p className="text-gray-600 mt-2">
          Manage patient records, admissions and billing support.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <StatCard
          icon={<Users />}
          title="Patient Records"
          value={patients.length}
        />

        <StatCard
          icon={<BedDouble />}
          title="Admissions"
          value={admissions.length}
        />

        <StatCard
          icon={<CreditCard />}
          title="Billing Support"
          value={billingPatients.length}
        />

        <StatCard
          icon={<ClipboardList />}
          title="Total Services"
          value={patients.length}
        />
      </div>

      {/* PATIENT RECORDS */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 overflow-x-auto">

        <h2 className="text-xl font-semibold mb-4">
          Patient Records
        </h2>

        <table className="w-full text-left">

          <thead>
            <tr className="border-b bg-gray-50">
              <th className="py-3 px-2">Patient Name</th>
              <th className="py-3 px-2">Department</th>
              <th className="py-3 px-2">Gender</th>
              <th className="py-3 px-2">Blood Group</th>
              <th className="py-3 px-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-3 px-2">
                  {patient.first_name} {patient.last_name}
                </td>

                <td className="py-3 px-2">
                  {patient.department || "General"}
                </td>

                <td className="py-3 px-2">
                  {patient.gender}
                </td>

                <td className="py-3 px-2">
                  {patient.blood_group}
                </td>

                <td className="py-3 px-2">
                  {new Date(
                    patient.created_at
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {patients.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500"
                >
                  No patient records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ADMISSIONS */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">

        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          Admissions
        </h2>

        {admissions.length > 0 ? (
          admissions.map((patient) => (
            <div
              key={patient.id}
              className="border rounded-lg p-4 mb-3 bg-blue-50"
            >
              <h3 className="font-bold">
                {patient.first_name} {patient.last_name}
              </h3>

              <p>
                Department: {patient.department}
              </p>

              <p>
                Status: Admitted
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No admissions found
          </p>
        )}
      </div>

      {/* BILLING SUPPORT */}
      <div className="bg-white p-6 rounded-xl shadow-md">

        <h2 className="text-xl font-semibold mb-4 text-green-700">
          Billing Support
        </h2>

        {billingPatients.length > 0 ? (
          billingPatients.map((patient) => (
            <div
              key={patient.id}
              className="border rounded-lg p-4 mb-3 bg-green-50"
            >
              <h3 className="font-bold">
                {patient.first_name} {patient.last_name}
              </h3>

              <p>
                Payment Status:{" "}
                {patient.payment_status || "Pending"}
              </p>

              <p>
                Billing Status:{" "}
                {patient.billing_status || "In Progress"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No billing records found
          </p>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 hover:shadow-xl transition">

    <div className="text-teal-600 w-10 h-10">
      {icon}
    </div>

    <div>
      <h3 className="text-gray-600 text-sm">
        {title}
      </h3>

      <p className="text-2xl font-bold text-gray-800">
        {value}
      </p>
    </div>
  </div>
);

export default StaffDashboard;
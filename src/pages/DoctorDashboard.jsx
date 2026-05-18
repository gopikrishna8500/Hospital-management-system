import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Users,
  FileText,
  AlertTriangle,
  Activity,
} from "lucide-react";

const DoctorDashboard = () => {
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
        console.error("Doctor dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [token]);

  if (loading) {
    return (
      <div className="p-6 text-lg font-semibold">
        Loading Doctor Dashboard...
      </div>
    );
  }

  // Emergency patients
  const emergencyPatients = patients.filter(
    (p) =>
      p.case_type === "Emergency" ||
      p.emergency === true
  );

  // Patients with reports
  const medicalReports = patients.filter(
    (p) => p.report || p.medical_report
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-teal-700">
          Doctor Dashboard
        </h1>

        <p className="text-gray-600 mt-2">
          View patient records, emergency cases and medical reports.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <StatCard
          icon={<Users />}
          title="Total Patients"
          value={patients.length}
        />

        <StatCard
          icon={<FileText />}
          title="Medical Reports"
          value={medicalReports.length}
        />

        <StatCard
          icon={<AlertTriangle />}
          title="Emergency Cases"
          value={emergencyPatients.length}
        />

        <StatCard
          icon={<Activity />}
          title="Active Cases"
          value={patients.length}
        />
      </div>

      {/* RECENT PATIENTS */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">
          Registered Patients
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="py-3 px-2">Patient Name</th>
              <th className="py-3 px-2">Gender</th>
              <th className="py-3 px-2">Blood Group</th>
              <th className="py-3 px-2">Department</th>
              <th className="py-3 px-2">Registered Date</th>
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
                  {patient.gender}
                </td>

                <td className="py-3 px-2">
                  {patient.blood_group}
                </td>

                <td className="py-3 px-2">
                  {patient.department || "General"}
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
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* EMERGENCY CASES */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Emergency Cases
        </h2>

        {emergencyPatients.length > 0 ? (
          emergencyPatients.map((patient) => (
            <div
              key={patient.id}
              className="border p-4 rounded-lg mb-3 bg-red-50"
            >
              <h3 className="font-bold">
                {patient.first_name} {patient.last_name}
              </h3>

              <p>Department: {patient.department}</p>

              <p>Blood Group: {patient.blood_group}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No emergency cases found
          </p>
        )}
      </div>

      {/* MEDICAL REPORTS */}
      <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">
          Medical Reports
        </h2>

        {medicalReports.length > 0 ? (
          medicalReports.map((patient) => (
            <div
              key={patient.id}
              className="border p-4 rounded-lg mb-3"
            >
              <h3 className="font-bold">
                {patient.first_name} {patient.last_name}
              </h3>

              <p className="text-gray-600">
                Report Available
              </p>

              {patient.report && (
                <a
                  href={patient.report}
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-600 underline"
                >
                  View Report
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No medical reports uploaded
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

export default DoctorDashboard;
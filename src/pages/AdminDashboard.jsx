import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Users, CalendarCheck, BedDouble, CreditCard } from "lucide-react";

const AdminDashboard = () => {
  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  const appointments =
    JSON.parse(localStorage.getItem("appointments")) || [];

  /* =========================
     Dynamic Department Chart
  ============================*/
  const departmentCount = patients.reduce((acc, p) => {
    if (p.department) {
      acc[p.department] = (acc[p.department] || 0) + 1;
    }
    return acc;
  }, {});

  const departmentChartData = Object.keys(departmentCount).map((key) => ({
    department: key,
    count: departmentCount[key],
  }));

  /* =========================
     Monthly Patient Growth (Dynamic)
  ============================*/
  const monthlyData = patients.reduce((acc, patient) => {
    const month = new Date().toLocaleString("default", { month: "short" });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const patientData = Object.keys(monthlyData).map((key) => ({
    month: key,
    patients: monthlyData[key],
  }));

  /* =========================
     Weekly Appointment Chart
  ============================*/
  const appointmentData = appointments.map((appt) => ({
    day: new Date(appt.date).toLocaleDateString("en-US", {
      weekday: "short",
    }),
    appointments: 1,
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Admin Dashboard
      </h1>

      {/* =========================
          Stats Cards
      ============================*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          icon={<Users />}
          title="Total Patients"
          value={patients.length}
        />
        <StatCard
          icon={<CalendarCheck />}
          title="Total Appointments"
          value={appointments.length}
        />
        <StatCard
          icon={<BedDouble />}
          title="Bed Occupancy"
          value="78%"
        />
        <StatCard
          icon={<CreditCard />}
          title="Revenue (Monthly)"
          value="$48,200"
        />
      </div>

      {/* =========================
          Charts Section
      ============================*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

        {/* Patient Growth Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Monthly Patient Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={patientData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="patients"
                stroke="#0f766e"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Department Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#14b8a6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* =========================
          Recent Activity Table
      ============================*/}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Recent Activities
        </h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Patient Name</th>
              <th className="py-2">Department</th>
              <th className="py-2">Status</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {patients.slice(0, 5).map((patient, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2">{patient.name}</td>
                <td>{patient.department || "General"}</td>
                <td className="text-green-600 font-medium">
                  Registered
                </td>
                <td>{new Date().toLocaleDateString()}</td>
              </tr>
            ))}

            {patients.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No recent patient activity
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

const StatCard = ({ icon, title, value }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 hover:shadow-xl transition">
      <div className="text-teal-600 w-10 h-10">{icon}</div>
      <div>
        <h3 className="text-gray-600 text-sm">{title}</h3>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;

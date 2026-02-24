// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";

// import { Users, CalendarCheck, BedDouble, CreditCard } from "lucide-react";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [patients, setPatients] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   /* =========================
//      Fetch Dashboard Data
//   ============================*/
//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:5000/api/dashboard/stats",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setStats(res.data);
//         setPatients(res.data.patients || []);
//         setAppointments(res.data.appointments || []);
//       } catch (error) {
//         console.error("Dashboard error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, [token]);

//   if (loading) return <div className="p-6">Loading dashboard...</div>;

//   /* =========================
//      Department Chart
//   ============================*/
//   const departmentCount = patients.reduce((acc, p) => {
//     if (p.department) {
//       acc[p.department] = (acc[p.department] || 0) + 1;
//     }
//     return acc;
//   }, {});

//   const departmentChartData = Object.keys(departmentCount).map((key) => ({
//     department: key,
//     count: departmentCount[key],
//   }));

//   /* =========================
//      Monthly Patient Growth
//   ============================*/
//   const monthlyData = patients.reduce((acc, patient) => {
//     const month = new Date(patient.createdAt || Date.now()).toLocaleString(
//       "default",
//       { month: "short" }
//     );
//     acc[month] = (acc[month] || 0) + 1;
//     return acc;
//   }, {});

//   const patientData = Object.keys(monthlyData).map((key) => ({
//     month: key,
//     patients: monthlyData[key],
//   }));

//   /* =========================
//      Weekly Appointment Chart
//   ============================*/
//   const appointmentData = appointments.map((appt) => ({
//     day: new Date(appt.date || Date.now()).toLocaleDateString("en-US", {
//       weekday: "short",
//     }),
//     appointments: 1,
//   }));

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">
//         Admin Dashboard
//       </h1>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         <StatCard
//           icon={<Users />}
//           title="Total Patients"
//           value={patients.length}
//         />
//         <StatCard
//           icon={<CalendarCheck />}
//           title="Total Appointments"
//           value={appointments.length}
//         />
//         <StatCard
//           icon={<BedDouble />}
//           title="Bed Occupancy"
//           value={stats?.bedOccupancy || "78%"}
//         />
//         <StatCard
//           icon={<CreditCard />}
//           title="Revenue (Monthly)"
//           value={stats?.revenue || "$0"}
//         />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <h2 className="text-lg font-semibold mb-4">
//             Monthly Patient Overview
//           </h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={patientData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="patients" stroke="#0f766e" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <h2 className="text-lg font-semibold mb-4">
//             Department Distribution
//           </h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={departmentChartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="department" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="count" fill="#14b8a6" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white p-6 rounded-xl shadow-md">
//         <h2 className="text-lg font-semibold mb-4">
//           Recent Activities
//         </h2>

//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="border-b">
//               <th className="py-2">Patient Name</th>
//               <th className="py-2">Department</th>
//               <th className="py-2">Status</th>
//               <th className="py-2">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {patients.slice(0, 5).map((patient, index) => (
//               <tr key={index} className="border-b hover:bg-gray-50">
//                 <td className="py-2">{patient.name}</td>
//                 <td>{patient.department || "General"}</td>
//                 <td className="text-green-600 font-medium">
//                   Registered
//                 </td>
//                 <td>
//                   {new Date(
//                     patient.createdAt || Date.now()
//                   ).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))}

//             {patients.length === 0 && (
//               <tr>
//                 <td colSpan="4" className="py-4 text-center text-gray-500">
//                   No recent patient activity
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ icon, title, value }) => (
//   <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 hover:shadow-xl transition">
//     <div className="text-teal-600 w-10 h-10">{icon}</div>
//     <div>
//       <h3 className="text-gray-600 text-sm">{title}</h3>
//       <p className="text-xl font-bold text-gray-800">{value}</p>
//     </div>
//   </div>
// );

// export default AdminDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";

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
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  /* =========================
     Fetch Patients
  ============================*/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientRes = await axios.get(
          "http://localhost:5000/api/patients",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPatients(patientRes.data.data || []);

        // OPTIONAL: If you create appointments API later
        // const apptRes = await axios.get("http://localhost:5000/api/appointments", { headers: { Authorization: `Bearer ${token}` }});
        // setAppointments(apptRes.data.data || []);

      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <div className="p-6">Loading dashboard...</div>;

  /* =========================
     Department Chart
  ============================*/
  const departmentCount = patients.reduce((acc, p) => {
    const dept = p.department || "General";
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});

  const departmentChartData = Object.keys(departmentCount).map((key) => ({
    department: key,
    count: departmentCount[key],
  }));

  /* =========================
     Monthly Patient Growth
  ============================*/
  const monthlyData = patients.reduce((acc, patient) => {
    const month = new Date(patient.created_at).toLocaleString("default", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const patientData = Object.keys(monthlyData).map((key) => ({
    month: key,
    patients: monthlyData[key],
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
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
          value="$12,000"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            Monthly Patient Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={patientData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="patients" stroke="#0f766e" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">
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

      {/* Recent Patients */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">
          Recent Patients
        </h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Patient Name</th>
              <th className="py-2">Gender</th>
              <th className="py-2">Blood Group</th>
              <th className="py-2">Registered Date</th>
            </tr>
          </thead>
          <tbody>
            {patients.slice(0, 5).map((patient) => (
              <tr key={patient.id} className="border-b hover:bg-gray-50">
                <td className="py-2">
                  {patient.first_name} {patient.last_name}
                </td>
                <td>{patient.gender}</td>
                <td>{patient.blood_group}</td>
                <td>
                  {new Date(patient.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {patients.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No patient records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 hover:shadow-xl transition">
    <div className="text-teal-600 w-10 h-10">{icon}</div>
    <div>
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;
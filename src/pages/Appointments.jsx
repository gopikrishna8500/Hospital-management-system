import React, { useEffect, useState } from "react";
import API from "../api";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments");
      setAppointments(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load appointments");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>

      <table className="w-full border">
        <thead className="bg-teal-600 text-white">
          <tr>
            <th className="p-2">Patient</th>
            <th className="p-2">Email</th>
            <th className="p-2">Doctor</th>
            <th className="p-2">Department</th>
            <th className="p-2">Date</th>
            <th className="p-2">Time</th>
          </tr>
        </thead>

        <tbody>
          {appointments.length > 0 ? (
            appointments.map((a) => (
              <tr key={a.id} className="text-center border-b">
                <td className="p-2">{a.patient_name}</td>
                <td className="p-2">{a.email}</td>
                <td className="p-2">{a.doctor_name}</td>
                <td className="p-2">{a.department}</td>
                <td className="p-2">{a.appointment_date}</td>
                <td className="p-2">{a.appointment_time}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-4 text-center">
                No appointments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
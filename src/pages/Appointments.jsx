import React, { useState } from "react";

const Appointments = () => {
  const [appointments, setAppointments] = useState(
    JSON.parse(localStorage.getItem("appointments")) || []
  );

  const [form, setForm] = useState({
    patient: "",
    date: "",
    time: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = [...appointments, form];
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Book Appointment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Patient Name"
          required
          className="border p-2 rounded-md w-full"
          onChange={(e) => setForm({ ...form, patient: e.target.value })}
        />
        <input
          type="date"
          required
          className="border p-2 rounded-md w-full"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          type="time"
          required
          className="border p-2 rounded-md w-full"
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />
        <button className="bg-teal-600 text-white px-4 py-2 rounded-md">
          Book
        </button>
      </form>
    </div>
  );
};

export default Appointments;

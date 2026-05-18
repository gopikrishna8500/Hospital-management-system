import React, { useState } from "react";
import API from "../api";

const AppointmentForm = () => {
  // ✅ ALWAYS declare state FIRST
  const [form, setForm] = useState({
    patient_id: "",
    patient_name: "",
    email: "",
    doctor_name: "",
    department: "",
    appointment_date: "",
    appointment_time: "",
  });

  /* =========================
     HANDLE INPUT CHANGE
  ========================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* =========================
     HANDLE SUBMIT
  ========================= */
  const handleSubmit = async () => {
    // ✅ Fix for your previous backend error (empty patient_id)
    if (!form.patient_id) {
      alert("Please enter Patient ID");
      return;
    }

    try {
      await API.post("/appointments", form);

      alert("Appointment booked & Email sent ✅");

      // Reset form
      setForm({
        patient_id: "",
        patient_name: "",
        email: "",
        doctor_name: "",
        department: "",
        appointment_date: "",
        appointment_time: "",
      });
    } catch (err) {
      console.error(err);
      alert("Booking failed ❌");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>

      {/* ✅ IMPORTANT: patient_id must be filled */}
      <input
        name="patient_id"
        placeholder="Patient ID"
        value={form.patient_id}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        name="patient_name"
        placeholder="Patient Name"
        value={form.patient_name}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        name="doctor_name"
        placeholder="Doctor Name"
        value={form.doctor_name}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        type="date"
        name="appointment_date"
        value={form.appointment_date}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        type="time"
        name="appointment_time"
        value={form.appointment_time}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <button
        onClick={handleSubmit}
        className="bg-teal-600 text-white w-full py-2 mt-4 rounded-md"
      >
        Book Appointment
      </button>
    </div>
  );
};

export default AppointmentForm;
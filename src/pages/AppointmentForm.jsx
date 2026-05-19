import React, { useState } from "react";
import API from "../api";
import { doctorsData } from "../data/doctorsData";

const AppointmentForm = () => {
  /* =========================
     STATE
  ========================= */
  const [form, setForm] = useState({
    patient_id: "",
    patient_name: "",
    email: "",
    doctor_name: "",
    department: "",
    appointment_date: "",
    appointment_time: "",
  });

  const [loading, setLoading] = useState(false);

  /* =========================
     HANDLE INPUT CHANGE
  ========================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* =========================
     HANDLE DOCTOR SELECT
  ========================= */
  const handleDoctorChange = (e) => {
    const selectedDoctor = doctorsData.find(
      (doc) => doc.name === e.target.value
    );

    setForm({
      ...form,
      doctor_name: selectedDoctor.name,
      department: selectedDoctor.specialization,
    });
  };

  /* =========================
     HANDLE SUBMIT
  ========================= */
  const handleSubmit = async () => {
    if (
      !form.patient_name ||
      !form.email ||
      !form.doctor_name ||
      !form.department ||
      !form.appointment_date ||
      !form.appointment_time
    ) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      await API.post("/appointments", form);

      alert("Appointment booked & Email sent ✅");

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

    setLoading(false);
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Book Appointment
      </h2>

      {/* Patient ID */}
      <input
        name="patient_id"
        placeholder="Patient ID (optional)"
        value={form.patient_id}
        onChange={handleChange}
        className="border p-2 w-full mb-2 rounded"
      />

      {/* Patient Name */}
      <input
        name="patient_name"
        placeholder="Patient Name"
        value={form.patient_name}
        onChange={handleChange}
        className="border p-2 w-full mb-2 rounded"
      />

      {/* Email */}
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full mb-2 rounded"
      />

      {/* ✅ DOCTOR DROPDOWN */}
      <select
        value={form.doctor_name}
        onChange={handleDoctorChange}
        className="border p-2 w-full mb-2 rounded"
      >
        <option value="">Select Doctor</option>
        {doctorsData
          .filter((doc) => doc.availability === "Available")
          .map((doc) => (
            <option key={doc.id} value={doc.name}>
              {doc.name} ({doc.specialization})
            </option>
          ))}
      </select>

      {/* ✅ AUTO-FILLED DEPARTMENT */}
      <input
        name="department"
        value={form.department}
        readOnly
        className="border p-2 w-full mb-2 rounded bg-gray-100"
      />

      {/* Date */}
      <input
        type="date"
        name="appointment_date"
        value={form.appointment_date}
        onChange={handleChange}
        className="border p-2 w-full mb-2 rounded"
      />

      {/* Time */}
      <input
        type="time"
        name="appointment_time"
        value={form.appointment_time}
        onChange={handleChange}
        className="border p-2 w-full mb-2 rounded"
      />

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-teal-600 text-white w-full py-2 mt-4 rounded-md hover:bg-teal-500 transition disabled:opacity-50"
      >
        {loading ? "Booking..." : "Book Appointment"}
      </button>
    </div>
  );
};

export default AppointmentForm;
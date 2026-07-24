import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { doctorsData } from "../components/DoctorCard";
import API from "../api";

const Appointment = () => {
  const { id } = useParams();

  const doctor = doctorsData.find(
    (doc) => doc.id === Number(id)
  );

  const [form, setForm] = useState({
    patient_name: "",
    email: "",
    appointment_date: "",
    appointment_time: "",
  });

  const [loading, setLoading] = useState(false);

  if (!doctor) {
    return <div className="p-10">Doctor Not Found</div>;
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !form.patient_name ||
      !form.email ||
      !form.appointment_date ||
      !form.appointment_time
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await API.post("/appointments", {
        patient_id: null,
        patient_name: form.patient_name,
        email: form.email,
        doctor_name: doctor.name,
        department: doctor.specialization,
        appointment_date: form.appointment_date,
        appointment_time: form.appointment_time,
      });

      alert("Appointment Booked Successfully ✅");

      setForm({
        patient_name: "",
        email: "",
        appointment_date: "",
        appointment_time: "",
      });

    } catch (err) {
      console.error(err);
      alert("Booking Failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-8">

        <h2 className="text-3xl font-bold text-teal-700 mb-2">
          Book Appointment
        </h2>

        <p className="text-gray-600 mb-6">
          {doctor.name}
        </p>

        <input
          type="text"
          name="patient_name"
          placeholder="Patient Name"
          value={form.patient_name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <input
          type="text"
          value={doctor.name}
          readOnly
          className="w-full border rounded-lg p-3 mb-4 bg-gray-100"
        />

        <input
          type="text"
          value={doctor.specialization}
          readOnly
          className="w-full border rounded-lg p-3 mb-4 bg-gray-100"
        />

        <input
          type="date"
          name="appointment_date"
          value={form.appointment_date}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <input
          type="time"
          name="appointment_time"
          value={form.appointment_time}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-6"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700"
        >
          {loading ? "Booking..." : "Confirm Appointment"}
        </button>

      </div>
    </div>
  );
};

export default Appointment;
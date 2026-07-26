import React, { useState } from "react";
import { doctorsData } from "../data/doctorsData";
const departments = [
  "General Medicine",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Gynecology",
  "Oncology",
  "Emergency",
  "Radiology",
  "Pathology",
  "Pharmacy",
  "ICU",
];
const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "",
    department: "",
    doctor: "",
    roomNumber: "",
    admissionDate: "",
    symptoms: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const admissions =
      JSON.parse(localStorage.getItem("admissions")) || [];

    admissions.push({
      id: Date.now(),
      ...formData,
    });

    localStorage.setItem(
      "admissions",
      JSON.stringify(admissions)
    );

    alert("Patient Admitted Successfully!");

    setFormData({
      patientName: "",
      age: "",
      gender: "",
      department: "",
      doctor: "",
      roomNumber: "",
      admissionDate: "",
      symptoms: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <input type="text" name="patientName" placeholder="Patient Name" onChange={handleChange} className="input" required />
      <input type="number" name="age" placeholder="Age" onChange={handleChange} className="input" required />

      <select name="gender" onChange={handleChange} className="input" required>
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <input
        type="text"
        name="department"
        value={formData.department}
        readOnly
        className="input bg-gray-100"
      />
      <select
        name="doctor"
        value={formData.doctor}
        onChange={(e) => {
          const selectedDoctor = doctorsData.find(
            (doc) => doc.name === e.target.value
          );

          setFormData({
            ...formData,
            doctor: selectedDoctor.name,
            department: selectedDoctor.specialization,
          });
        }}
        className="input"
        required
      >
        <option value="">Select Doctor</option>

        {doctorsData
          .filter((doctor) => doctor.availability === "Available")
          .map((doctor) => (
            <option key={doctor.id} value={doctor.name}>
              {doctor.name} ({doctor.specialization})
            </option>
          ))}
      </select>
      <input type="text" name="roomNumber" placeholder="Room Number" onChange={handleChange} className="input" />
      <input type="date" name="admissionDate" onChange={handleChange} className="input" />

      <textarea name="symptoms" placeholder="Symptoms / Condition" onChange={handleChange} className="input md:col-span-2" />

      <button
        type="submit"
        className="md:col-span-2 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition"
      >
        Admit Patient
      </button>
    </form>
  );
};

export default AdmissionForm;
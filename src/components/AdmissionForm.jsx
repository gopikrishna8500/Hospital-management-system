import React, { useState } from "react";

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
    console.log("Admission Data:", formData);
    alert("Patient Admitted Successfully!");
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

      <input type="text" name="department" placeholder="Department" onChange={handleChange} className="input" />
      <input type="text" name="doctor" placeholder="Assigned Doctor" onChange={handleChange} className="input" />
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
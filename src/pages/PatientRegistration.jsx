import React, { useState } from "react";

const PatientRegistration = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    department: "",
    photo: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        photo: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.age || !form.gender || !form.department) {
      alert("Please fill all required fields");
      return;
    }

    const existingPatients =
      JSON.parse(localStorage.getItem("patients")) || [];

    const newPatient = {
      id: Date.now(),
      ...form,
      createdAt: new Date().toISOString(),
    };

    const updatedPatients = [...existingPatients, newPatient];

    localStorage.setItem("patients", JSON.stringify(updatedPatients));

    alert("Patient Registered Successfully");

    setForm({
      name: "",
      age: "",
      gender: "",
      department: "",
      photo: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-xl">
      <h2 className="text-2xl font-bold mb-6">
        Register New Patient
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Full Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
        />

        {/* Age */}
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
        />

        {/* Gender */}
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* Department */}
        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
        >
          <option value="">Select Department</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="General Medicine">General Medicine</option>
        </select>

        {/* Photo Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-2 rounded-md"
        />

        {/* Preview Photo */}
        {form.photo && (
          <div className="flex justify-center">
            <img
              src={form.photo}
              alt="Preview"
              className="w-20 h-20 rounded-full object-cover border"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-500 transition transform hover:scale-105"
        >
          Register Patient
        </button>

      </form>
    </div>
  );
};

export default PatientRegistration;

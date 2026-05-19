import React, { useState } from "react";
import axios from "axios";

const PatientRegistration = () => {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    phone: "",
    email: "",
    address: "",
    blood_group: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      first_name,
      last_name,
      gender,
      date_of_birth,
      phone,
      email,
      address,
      blood_group,
    } = form;

    if (
      !first_name ||
      !last_name ||
      !gender ||
      !date_of_birth ||
      !phone ||
      !email ||
      !address ||
      !blood_group
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await axios.post(
        "https://hospital-management-system-4-kceq.onrender.com/api/patients",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Patient Registered Successfully ✅");

      setForm({
        first_name: "",
        last_name: "",
        gender: "",
        date_of_birth: "",
        phone: "",
        email: "",
        address: "",
        blood_group: "",
      });

    } catch (error) {
      console.error("Error registering patient:", error);
      alert("Failed to register patient");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-xl">
      <h2 className="text-2xl font-bold mb-6">
        Register New Patient
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* First Name */}
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
        />

        {/* Last Name */}
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
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

        {/* Date of Birth */}
        <input
          type="date"
          name="date_of_birth"
          value={form.date_of_birth}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
        />

        {/* Address */}
        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
        />

        {/* Blood Group */}
        <select
          name="blood_group"
          value={form.blood_group}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        {/* Submit */}
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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      formData.email === "doctor@gmail.com" &&
      formData.password === "doctor123"
    ) {
      alert("Doctor Login Successful");
      navigate("/doctor-dashboard");
    } else {
      alert("Invalid Doctor Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-teal-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-teal-700 mb-2">
          Doctor Login
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Welcome Back Doctor
        </p>

        <form onSubmit={handleLogin} className="space-y-6">

          <input
            type="email"
            name="email"
            placeholder="Doctor Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl outline-none focus:ring-2 focus:ring-teal-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl text-lg font-semibold transition"
          >
            Login as Doctor
          </button>

        </form>
      </div>
    </div>
  );
};

export default DoctorLogin;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StaffLogin = () => {
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
      formData.email === "staff@gmail.com" &&
      formData.password === "staff123"
    ) {
      alert("Staff Login Successful");
      navigate("/staff-dashboard");
    } else {
      alert("Invalid Staff Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-blue-700 mb-2">
          Staff Login
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Welcome Hospital Staff
        </p>

        <form onSubmit={handleLogin} className="space-y-6">

          <input
            type="email"
            name="email"
            placeholder="Staff Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold transition"
          >
            Login as Staff
          </button>

        </form>
      </div>
    </div>
  );
};

export default StaffLogin;
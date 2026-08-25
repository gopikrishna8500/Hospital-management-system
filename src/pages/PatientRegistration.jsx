import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const PatientRegistration = () => {
  const navigate = useNavigate();

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

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // ================================
  // HANDLE INPUT
  // ================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // ================================
  // RESET FORM
  // ================================
  const resetForm = () => {
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
  };

  // ================================
  // SUBMIT
  // ================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // ================================
    // CHECK TOKEN
    // ================================
    const token = localStorage.getItem("token");

    if (!token) {
      setError(
        "You are not logged in. Please login again."
      );

      return;
    }

    // ================================
    // VALIDATION
    // ================================
    if (
      !form.first_name.trim() ||
      !form.last_name.trim() ||
      !form.gender ||
      !form.date_of_birth ||
      !form.phone.trim() ||
      !form.email.trim() ||
      !form.address.trim() ||
      !form.blood_group
    ) {
      setError(
        "Please fill all required fields."
      );

      return;
    }

    // ================================
    // PHONE VALIDATION
    // ================================
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(form.phone.trim())) {
      setError(
        "Please enter a valid 10-digit phone number."
      );

      return;
    }

    // ================================
    // EMAIL VALIDATION
    // ================================
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email.trim())) {
      setError(
        "Please enter a valid email address."
      );

      return;
    }

    try {
      setLoading(true);

      // ================================
      // REGISTER PATIENT
      // ================================
      const response = await API.post(
        "/patients",
        {
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim(),
          gender: form.gender,
          date_of_birth: form.date_of_birth,
          phone: form.phone.trim(),
          email: form.email.trim(),
          address: form.address.trim(),
          blood_group: form.blood_group,
        }
      );

      console.log(
        "Patient registered:",
        response.data
      );

      setSuccess(
        "Patient registered successfully!"
      );

      resetForm();

      // Optional redirect
      setTimeout(() => {
        navigate("/patient-records");
      }, 1200);

    } catch (error) {
      console.error(
        "Error registering patient:",
        error.response?.data || error
      );

      // ================================
      // 401
      // ================================
      if (error.response?.status === 401) {
        setError(
          "Your login session is invalid or expired. Please login again."
        );

        localStorage.removeItem("token");

        return;
      }

      // ================================
      // 400
      // ================================
      if (error.response?.status === 400) {
        setError(
          error.response?.data?.message ||
            "Invalid patient information."
        );

        return;
      }

      // ================================
      // 409
      // ================================
      if (error.response?.status === 409) {
        setError(
          error.response?.data?.message ||
            "A patient with this information already exists."
        );

        return;
      }

      // ================================
      // OTHER ERRORS
      // ================================
      setError(
        error.response?.data?.message ||
          "Failed to register patient. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

      <div className="max-w-3xl mx-auto">

        {/* ================================
            HEADER
        ================================= */}
        <div className="mb-6">

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Register New Patient
          </h1>

          <p className="text-gray-500 mt-1">
            Add a new patient to the MediTrack system.
          </p>

        </div>

        {/* ================================
            CARD
        ================================= */}
        <div className="bg-white rounded-xl shadow-md p-6">

          {/* SUCCESS */}
          {success && (
            <div className="mb-5 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700">
              {success}
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="mb-5 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* ================================
                NAME
            ================================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>

                <input
                  type="text"
                  name="first_name"
                  placeholder="Enter first name"
                  value={form.first_name}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>

                <input
                  type="text"
                  name="last_name"
                  placeholder="Enter last name"
                  value={form.last_name}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100"
                />
              </div>

            </div>

            {/* ================================
                GENDER + DOB
            ================================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>

                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100"
                >
                  <option value="">
                    Select Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>

                <input
                  type="date"
                  name="date_of_birth"
                  value={form.date_of_birth}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100"
                />
              </div>

            </div>

            {/* ================================
                PHONE + EMAIL
            ================================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="10-digit phone number"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={10}
                  disabled={loading}
                  className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="patient@example.com"
                  value={form.email}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100"
                />
              </div>

            </div>

            {/* ================================
                BLOOD GROUP
            ================================= */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Group *
              </label>

              <select
                name="blood_group"
                value={form.blood_group}
                onChange={handleChange}
                disabled={loading}
                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100"
              >
                <option value="">
                  Select Blood Group
                </option>

                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            {/* ================================
                ADDRESS
            ================================= */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>

              <textarea
                name="address"
                placeholder="Enter complete address"
                value={form.address}
                onChange={handleChange}
                disabled={loading}
                rows={4}
                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none disabled:bg-gray-100"
              />
            </div>

            {/* ================================
                BUTTONS
            ================================= */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">

              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-semibold px-5 py-3 rounded-lg transition"
              >
                {loading
                  ? "Registering Patient..."
                  : "Register Patient"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                disabled={loading}
                className="sm:w-32 border border-gray-300 text-gray-700 px-5 py-3 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
              >
                Reset
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistration;
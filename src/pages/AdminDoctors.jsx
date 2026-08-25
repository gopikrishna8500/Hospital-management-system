import React, { useEffect, useState } from "react";
import API from "../api";

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    doctor_name: "",
    specialization: "",
    department_id: "",
    qualification: "",
    experience: "",
    phone: "",
    email: "",
    consultation_fee: "",
    availability: "Available",
    working_days: "",
    working_hours: "",
    photo: "",
  });

  useEffect(() => {
    loadDoctors();
    loadDepartments();
  }, []);

  const loadDoctors = async () => {
    const res = await API.get("/doctors");
    setDoctors(res.data);
  };

  const loadDepartments = async () => {
    const res = await API.get("/departments");
    setDepartments(res.data.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addDoctor = async () => {
    await API.post("/doctors", form);

    alert("Doctor Added");

    loadDoctors();

    setForm({
      doctor_name: "",
      specialization: "",
      department_id: "",
      qualification: "",
      experience: "",
      phone: "",
      email: "",
      consultation_fee: "",
      availability: "Available",
      working_days: "",
      working_hours: "",
      photo: "",
    });
  };

  const deleteDoctor = async (id) => {
    if (!window.confirm("Delete Doctor?")) return;

    await API.delete(`/doctors/${id}`);

    loadDoctors();
  };

  const changeAvailability = async (doctor) => {
    const availability = prompt(
      "Available / Busy / On Leave / Not Available",
      doctor.availability
    );

    if (!availability) return;

    await API.put(`/doctors/${doctor.id}`, {
      ...doctor,
      availability,
    });

    loadDoctors();
  };

  return (
<div className="p-8 bg-gray-100 dark:bg-gray-950 min-h-screen text-gray-900 dark:text-white">
      <h2 className="text-3xl font-bold text-teal-700 mb-6">
        Doctor Management
      </h2>

<div className="grid md:grid-cols-2 gap-4 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md">
        <input
          className="input"
          placeholder="Doctor Name"
          name="doctor_name"
          value={form.doctor_name}
          onChange={handleChange}
        />

        <input
          className="input"
          placeholder="Specialization"
          name="specialization"
          value={form.specialization}
          onChange={handleChange}
        />

        <select
          className="input"
          name="department_id"
          value={form.department_id}
          onChange={handleChange}
        >
<option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.department_name}
            </option>
          ))}
        </select>

        <input
          className="input"
          placeholder="Qualification"
          name="qualification"
          value={form.qualification}
          onChange={handleChange}
        />

        <input
          className="input"
          placeholder="Experience"
          name="experience"
          value={form.experience}
          onChange={handleChange}
        />

        <input
          className="input"
          placeholder="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          className="input"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          className="input"
          placeholder="Consultation Fee"
          name="consultation_fee"
          value={form.consultation_fee}
          onChange={handleChange}
        />

        <input
          className="input"
          placeholder="Working Days"
          name="working_days"
          value={form.working_days}
          onChange={handleChange}
        />

        <input
          className="input"
          placeholder="Working Hours"
          name="working_hours"
          value={form.working_hours}
          onChange={handleChange}
        />

      </div>

      <button
        onClick={addDoctor}
        className="bg-teal-600 text-white px-6 py-3 rounded mt-6"
      >
        Add Doctor
      </button>

<table className="w-full mt-10 bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
        <thead className="bg-teal-600 text-white">

          <tr>

            <th>Name</th>
            <th>Department</th>
            <th>Availability</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {doctors.map((doctor) => (

            <tr key={doctor.id} className="border-b">

              <td className="p-3">{doctor.doctor_name}</td>

              <td>{doctor.department_name}</td>

              <td>{doctor.availability}</td>

              <td>

                <button
                  className="bg-yellow-500 px-3 py-1 rounded text-white mr-2"
                  onClick={() => changeAvailability(doctor)}
                >
                  Change Status
                </button>

                <button
                  className="bg-red-600 px-3 py-1 rounded text-white"
                  onClick={() => deleteDoctor(doctor.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default AdminDoctors;
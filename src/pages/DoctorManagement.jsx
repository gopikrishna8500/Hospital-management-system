import React, { useState } from "react";

const departments = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "ENT",
  "Radiology",
];

const DoctorManagement = () => {
  const [doctor, setDoctor] = useState({
    name: "",
    department: "",
    experience: "",
    availability: "Available",
  });

  const [doctors, setDoctors] = useState([]);

  const handleChange = (e) => {
    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value,
    });
  };

  const addDoctor = () => {
    setDoctors([
      ...doctors,
      {
        id: Date.now(),
        ...doctor,
      },
    ]);

    setDoctor({
      name: "",
      department: "",
      experience: "",
      availability: "Available",
    });
  };

  const deleteDoctor = (id) => {
    setDoctors(doctors.filter((d) => d.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-teal-700 mb-8">
          Doctor Management
        </h1>

        <div className="grid md:grid-cols-4 gap-4 mb-8">

          <input
            name="name"
            placeholder="Doctor Name"
            value={doctor.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <select
            name="department"
            value={doctor.department}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option>Select Department</option>

            {departments.map((d) => (
              <option key={d}>{d}</option>
            ))}

          </select>

          <input
            name="experience"
            placeholder="Experience"
            value={doctor.experience}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <select
            name="availability"
            value={doctor.availability}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option>Available</option>
            <option>Busy</option>
            <option>On Leave</option>
            <option>Not Available</option>
          </select>

        </div>

        <button
          onClick={addDoctor}
          className="bg-teal-600 text-white px-6 py-3 rounded-lg"
        >
          Add Doctor
        </button>

        <table className="w-full mt-8">

          <thead>

            <tr className="bg-teal-600 text-white">

              <th>Name</th>

              <th>Department</th>

              <th>Experience</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {doctors.map((doc) => (

              <tr key={doc.id} className="border-b text-center">

                <td>{doc.name}</td>

                <td>{doc.department}</td>

                <td>{doc.experience}</td>

                <td>{doc.availability}</td>

                <td>

                  <button
                    onClick={() => deleteDoctor(doc.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default DoctorManagement;
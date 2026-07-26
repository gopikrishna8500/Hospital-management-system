import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const Discharge = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDischarge = () => {
    const admissions =
      JSON.parse(localStorage.getItem("admissions")) || [];

    const patient = admissions.find(
      (p) => p.id === Number(id)
    );

    if (!patient) {
      alert("Patient not found");
      return;
    }

    const discharged =
      JSON.parse(localStorage.getItem("dischargedPatients")) || [];

    discharged.push({
      ...patient,
      dischargeDate: new Date().toLocaleDateString(),
    });

    localStorage.setItem(
      "dischargedPatients",
      JSON.stringify(discharged)
    );

    const remainingPatients = admissions.filter(
      (p) => p.id !== Number(id)
    );

    localStorage.setItem(
      "admissions",
      JSON.stringify(remainingPatients)
    );

    alert("Patient Discharged Successfully ✅");

    navigate("/discharge-list");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-6">
          Patient Discharge
        </h2>

        <p className="mb-6">
          Patient ID: <strong>{id}</strong>
        </p>

        <button
          onClick={handleDischarge}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
        >
          Confirm Discharge
        </button>
      </div>
    </div>
  );
};

export default Discharge;
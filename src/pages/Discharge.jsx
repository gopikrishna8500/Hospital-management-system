import React from "react";
import { useParams } from "react-router-dom";

const Discharge = () => {
  const { id } = useParams();

  const handleDischarge = () => {
    alert(`Patient ID ${id} Discharged Successfully`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-6">
          Patient Discharge
        </h2>

        <p className="mb-6 text-gray-600">
          Discharging patient with ID: <strong>{id}</strong>
        </p>

        <button
          onClick={handleDischarge}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
        >
          Confirm Discharge
        </button>
      </div>
    </div>
  );
};

export default Discharge;
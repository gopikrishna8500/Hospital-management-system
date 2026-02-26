import React, { useState } from "react";

const DischargeForm = ({ patientId }) => {
  const [summary, setSummary] = useState("");
  const [billAmount, setBillAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Discharge Info:", { patientId, summary, billAmount });
    alert("Patient Discharged Successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <div>
        <label className="block font-semibold mb-2">
          Patient ID
        </label>
        <input
          type="text"
          value={patientId}
          disabled
          className="input bg-gray-100"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">
          Discharge Summary
        </label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="input"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">
          Final Bill Amount
        </label>
        <input
          type="number"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
          className="input"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
      >
        Confirm Discharge
      </button>
    </form>
  );
};

export default DischargeForm;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Billing = () => {
  const [patientName, setPatientName] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const generateInvoice = async () => {
    try {
      const res = await axios.post(
        "https://hospital-management-system-4-kceq.onrender.com/api/billing",
        {
          patient_name: patientName,
          amount: amount,
        }
      );

      console.log("Invoice Created:", res.data);

      // ✅ GO TO INVOICE LIST PAGE
      navigate("/billing-list");

    } catch (err) {
      console.error(err);
      alert("Billing failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Billing System</h2>

      <input
        placeholder="Patient Name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        className="border p-2 mr-2"
      />

      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 mr-2"
      />

      <button
        onClick={generateInvoice}
        className="bg-teal-600 text-white px-4 py-2 rounded"
      >
        Generate Invoice
      </button>
    </div>
  );
};

export default Billing;
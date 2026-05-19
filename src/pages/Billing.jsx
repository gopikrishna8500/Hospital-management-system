import React, { useEffect, useState } from "react";
import API from "../api";

const Billing = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [amount, setAmount] = useState("");

  /* =========================
     FETCH PATIENTS
  ============================ */
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await API.get("/patients");
        setPatients(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPatients();
  }, []);

  /* =========================
     GENERATE INVOICE (FINAL FIX)
  ============================ */
  const generateInvoice = async () => {
    if (!selectedPatient || !amount) {
      alert("Select patient and enter amount");
      return;
    }

    const patient = patients.find(
      (p) => p.id === Number(selectedPatient)
    );

    if (!patient) {
      alert("Patient not found");
      return;
    }

    try {
      await API.post("/billing", {
        patient_id: patient.id,
        patient_name: `${patient.first_name} ${patient.last_name}`,
        amount: amount,
      });

      alert("Invoice generated successfully ✅");

      setSelectedPatient("");
      setAmount("");

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Billing failed ❌");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-xl">
      <h2 className="text-2xl font-bold mb-6">Billing System</h2>

      {/* SELECT PATIENT */}
      <select
        value={selectedPatient}
        onChange={(e) => setSelectedPatient(e.target.value)}
        className="border p-2 rounded-md mb-4 w-full"
      >
        <option value="">Select Patient</option>
        {patients.map((p) => (
          <option key={p.id} value={p.id}>
            {p.first_name} {p.last_name}
          </option>
        ))}
      </select>

      {/* AMOUNT */}
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded-md mb-4 w-full"
      />

      {/* BUTTON */}
      <button
        onClick={generateInvoice}
        className="w-full bg-teal-600 text-white px-4 py-2 rounded-md"
      >
        Generate Invoice
      </button>
    </div>
  );
};

export default Billing;
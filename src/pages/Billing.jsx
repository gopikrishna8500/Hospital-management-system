import React, { useState } from "react";

const Billing = () => {
  const [invoice, setInvoice] = useState(null);

  const generateInvoice = (name, amount) => {
    setInvoice({
      id: Date.now(),
      name,
      amount,
      date: new Date().toLocaleDateString(),
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Billing System</h2>

      <button
        onClick={() => generateInvoice("Test Patient", 500)}
        className="bg-teal-600 text-white px-4 py-2 rounded-md"
      >
        Generate Invoice
      </button>

      {invoice && (
        <div className="mt-6 border p-4 rounded-md">
          <p>Invoice ID: {invoice.id}</p>
          <p>Patient: {invoice.name}</p>
          <p>Amount: ${invoice.amount}</p>
          <p>Date: {invoice.date}</p>
        </div>
      )}
    </div>
  );
};

export default Billing;

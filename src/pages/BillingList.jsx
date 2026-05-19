import React, { useEffect, useState } from "react";
import API from "../api";

const BillingList = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    API.get("/billing")
      .then((res) => setBills(res.data.data))
      .catch(() => alert("Failed to load bills"));
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">All Invoices</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>ID</th>
            <th>Patient</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bills.map((bill) => (
            <tr key={bill.id}>
              <td>{bill.id}</td>
              <td>{bill.patient_name}</td>
              <td>₹ {bill.total_amount}</td>
              <td>{bill.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillingList;
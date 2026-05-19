import React, { useEffect, useState } from "react";
import API from "../api";

const BillingList = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await API.get("/billing");
        setBills(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBills();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">All Invoices</h2>

      {bills.length === 0 ? (
        <p>No invoices found</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Patient</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id} className="text-center border-t">
                <td className="p-2">{bill.patient_name}</td>
                <td className="p-2">₹{bill.amount}</td>
                <td className="p-2">
                  {new Date(bill.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BillingList;
import React, { useState, useEffect } from "react";
import API from "../api";
import jsPDF from "jspdf";

const Billing = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [items, setItems] = useState([{ name: "", cost: "" }]);
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    API.get("/patients").then(res => {
      setPatients(res.data.data || []);
    });
  }, []);

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { name: "", cost: "" }]);
  };

  const getTotal = () => {
    return items.reduce((sum, item) => sum + Number(item.cost || 0), 0);
  };

  const generateInvoice = async () => {
    const patient = patients.find(p => p.id == selectedPatient);

    const newInvoice = {
      patient_id: selectedPatient,
      patient_name: `${patient.first_name} ${patient.last_name}`,
      items,
      total_amount: getTotal(),
    };

    const res = await API.post("/billing", newInvoice);

    setInvoice(res.data.data);
  };

  /* =========================
     DOWNLOAD PDF
  ============================ */
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.text("MediTrack Hospital Invoice", 20, 20);
    doc.text(`Patient: ${invoice.patient_name}`, 20, 30);
    doc.text(`Date: ${new Date(invoice.created_at).toLocaleString()}`, 20, 40);

    let y = 50;

    invoice.items.forEach((item) => {
      doc.text(`${item.name} - ₹${item.cost}`, 20, y);
      y += 10;
    });

    doc.text(`Total: ₹${invoice.total_amount}`, 20, y + 10);

    doc.save("invoice.pdf");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Hospital Billing</h2>

      {/* PATIENT */}
      <select
        value={selectedPatient}
        onChange={(e) => setSelectedPatient(e.target.value)}
        className="border p-2 mb-4 w-full"
      >
        <option>Select Patient</option>
        {patients.map(p => (
          <option key={p.id} value={p.id}>
            {p.first_name} {p.last_name}
          </option>
        ))}
      </select>

      {/* ITEMS */}
      {items.map((item, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            placeholder="Service"
            value={item.name}
            onChange={(e) =>
              handleItemChange(index, "name", e.target.value)
            }
            className="border p-2 w-2/3"
          />
          <input
            type="number"
            placeholder="Cost"
            value={item.cost}
            onChange={(e) =>
              handleItemChange(index, "cost", e.target.value)
            }
            className="border p-2 w-1/3"
          />
        </div>
      ))}

      <button onClick={addItem} className="text-blue-600 mb-3">
        + Add Item
      </button>

      <p className="mb-3 font-bold">Total: ₹ {getTotal()}</p>

      <button
        onClick={generateInvoice}
        className="bg-teal-600 text-white px-4 py-2 w-full rounded"
      >
        Generate & Save Invoice
      </button>

      {/* SHOW INVOICE */}
      {invoice && (
        <div className="mt-6 border p-4">
          <h3 className="font-bold text-lg">Invoice Saved</h3>
          <p>Patient: {invoice.patient_name}</p>
          <p>Total: ₹ {invoice.total_amount}</p>
          <p>Status: {invoice.status}</p>

          <button
            onClick={downloadPDF}
            className="mt-3 bg-green-600 text-white px-3 py-1 rounded"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default Billing;
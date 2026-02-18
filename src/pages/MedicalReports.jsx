import React, { useState, useEffect } from "react";

const MedicalReports = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [report, setReport] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(data);
  }, []);

  const handleFile = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setReport(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleUpload = () => {
    const data = JSON.parse(localStorage.getItem("patients")) || [];

    const updated = data.map((p) =>
      p.name === selectedPatient
        ? { ...p, report }
        : p
    );

    localStorage.setItem("patients", JSON.stringify(updated));
    alert("Report Uploaded");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Upload Medical Report</h2>

      <select
        onChange={(e) => setSelectedPatient(e.target.value)}
        className="border p-2 rounded-md mb-4"
      >
        <option>Select Patient</option>
        {patients.map((p, i) => (
          <option key={i}>{p.name}</option>
        ))}
      </select>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFile}
        className="block mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-teal-600 text-white px-4 py-2 rounded-md"
      >
        Upload
      </button>
    </div>
  );
};

export default MedicalReports;

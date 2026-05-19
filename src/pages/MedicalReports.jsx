import React, { useEffect, useState, useRef } from "react";
import API from "../api";

const MedicalReports = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await API.get("/patients");
        setPatients(res.data.data || []);
      } catch (err) {
        console.error(err);
        alert("Failed to load patients");
      }
    };

    fetchPatients();
  }, []);

  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const allowed = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (!allowed.includes(selected.type)) {
      alert("Only PDF or Image allowed");
      return;
    }

    setFile(selected);
  };

  const handleUpload = async () => {
    if (!selectedPatient || !file) {
      alert("Select patient & file");
      return;
    }

    const formData = new FormData();
    formData.append("report", file);

    try {
      setLoading(true);

      const res = await API.post(`/reports/${selectedPatient}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("SUCCESS:", res.data);

      alert("Uploaded Successfully ✅");

      setFile(null);
      setSelectedPatient("");
      fileInputRef.current.value = "";

    } catch (err) {
      console.error("UPLOAD ERROR:", err);

      alert(
        err.response?.data?.message ||
        err.message ||
        "Upload failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-xl">
      <h2 className="text-2xl font-bold mb-6">
        Upload Medical Report
      </h2>

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

      <input
        type="file"
        accept="application/pdf,image/*"
        onChange={handleFile}
        ref={fileInputRef}
        className="block mb-4 w-full"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full bg-teal-600 text-white px-4 py-2 rounded-md"
      >
        {loading ? "Uploading..." : "Upload Report"}
      </button>
    </div>
  );
};

export default MedicalReports;
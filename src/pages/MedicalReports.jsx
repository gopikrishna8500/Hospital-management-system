// import React, { useState, useEffect } from "react";

// const MedicalReports = () => {
//   const [patients, setPatients] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState("");
//   const [report, setReport] = useState("");

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("patients")) || [];
//     setPatients(data);
//   }, []);

//   const handleFile = (e) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       setReport(reader.result);
//     };
//     reader.readAsDataURL(e.target.files[0]);
//   };

//   const handleUpload = () => {
//     const data = JSON.parse(localStorage.getItem("patients")) || [];

//     const updated = data.map((p) =>
//       p.name === selectedPatient
//         ? { ...p, report }
//         : p
//     );

//     localStorage.setItem("patients", JSON.stringify(updated));
//     alert("Report Uploaded");
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-6">Upload Medical Report</h2>

//       <select
//         onChange={(e) => setSelectedPatient(e.target.value)}
//         className="border p-2 rounded-md mb-4"
//       >
//         <option>Select Patient</option>
//         {patients.map((p, i) => (
//           <option key={i}>{p.name}</option>
//         ))}
//       </select>

//       <input
//         type="file"
//         accept="application/pdf"
//         onChange={handleFile}
//         className="block mb-4"
//       />

//       <button
//         onClick={handleUpload}
//         className="bg-teal-600 text-white px-4 py-2 rounded-md"
//       >
//         Upload
//       </button>
//     </div>
//   );
// };

// export default MedicalReports;


import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const MedicalReports = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");

  /* =========================
     Fetch Patients
  ============================*/
  useEffect(() => {
    if (!token) {
      alert("Please login first");
      return;
    }

    const fetchPatients = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/patients",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPatients(res.data.data || []);
      } catch (error) {
        console.error("Error fetching patients:", error.response?.data || error.message);
      }
    };

    fetchPatients();
  }, [token]);

  /* =========================
     File Handler
  ============================*/
  const handleFile = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    setFile(selectedFile);
  };

  /* =========================
     Upload Report
  ============================*/
  const handleUpload = async () => {
    if (!selectedPatient || !file) {
      alert("Please select patient and upload file");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("report", file);

    try {
      await axios.post(
        `http://localhost:5000/api/reports/${selectedPatient}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // DO NOT manually set Content-Type
          },
        }
      );

      alert("Report Uploaded Successfully ✅");

      setFile(null);
      setSelectedPatient("");
      fileInputRef.current.value = "";
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-xl">
      <h2 className="text-2xl font-bold mb-6">
        Upload Medical Report
      </h2>

      {/* Select Patient */}
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

      {/* Upload File */}
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFile}
        ref={fileInputRef}
        className="block mb-4 w-full"
      />

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-500 transition disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Report"}
      </button>
    </div>
  );
};

export default MedicalReports;
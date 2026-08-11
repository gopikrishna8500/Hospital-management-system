import React, { useEffect, useRef, useState } from "react";
import API from "../api";

const MedicalReports = () => {
  const [patients, setPatients] = useState([]);
  const [reports, setReports] = useState([]);

  const [selectedPatient, setSelectedPatient] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingReports, setLoadingReports] = useState(false);

  const fileInputRef = useRef(null);

  /* =========================
     LOAD PATIENTS
  ========================= */
  useEffect(() => {
    fetchPatients();
    fetchReports();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await API.get("/patients");

      setPatients(res.data.data || []);

    } catch (err) {
      console.error("PATIENT ERROR:", err);
      alert("Failed to load patients");
    }
  };

  /* =========================
     LOAD ALL REPORTS
  ========================= */
  const fetchReports = async () => {
    try {
      setLoadingReports(true);

      const res = await API.get("/reports");

      setReports(res.data.data || []);

    } catch (err) {
      console.error("REPORT ERROR:", err);

      alert(
        err.response?.data?.message ||
        "Failed to load medical reports"
      );

    } finally {
      setLoadingReports(false);
    }
  };

  /* =========================
     FILE SELECT
  ========================= */
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
      e.target.value = "";
      return;
    }

    setFile(selected);
  };

  /* =========================
     UPLOAD REPORT
  ========================= */
  const handleUpload = async () => {
    if (!selectedPatient || !file) {
      alert("Please select patient and medical report");
      return;
    }

    const formData = new FormData();

    formData.append("report", file);

    try {
      setLoading(true);

      const res = await API.post(
        `/reports/${selectedPatient}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("UPLOAD SUCCESS:", res.data);

      alert("Medical Report Uploaded Successfully ✅");

      /* Reset form */

      setFile(null);
      setSelectedPatient("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      /* Refresh report list */

      fetchReports();

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

  /* =========================
     OPEN REPORT
  ========================= */
  const openReport = (filePath) => {

    const filename = filePath.split(/[\\/]/).pop();

    const reportUrl = `${API.defaults.baseURL}/../uploads/${filename}`;

    window.open(reportUrl, "_blank");
  };

  return (
    <div className="space-y-8">

      {/* =========================
          UPLOAD SECTION
      ========================= */}

      <div className="bg-white p-6 rounded-xl shadow-md max-w-xl">

        <h2 className="text-2xl font-bold text-teal-700 mb-6">
          Upload Medical Report
        </h2>

        <select
          value={selectedPatient}
          onChange={(e) =>
            setSelectedPatient(e.target.value)
          }
          className="border p-3 rounded-md mb-4 w-full"
        >

          <option value="">
            Select Patient
          </option>

          {patients.map((p) => (

            <option
              key={p.id}
              value={p.id}
            >
              {p.first_name} {p.last_name}
            </option>

          ))}

        </select>

        <input
          type="file"
          accept="application/pdf,image/*"
          onChange={handleFile}
          ref={fileInputRef}
          className="block mb-4 w-full border p-2 rounded"
        />

        {file && (
          <p className="text-sm text-gray-600 mb-4">
            Selected file:{" "}
            <span className="font-semibold">
              {file.name}
            </span>
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-md transition"
        >
          {loading
            ? "Uploading..."
            : "Upload Medical Report"}
        </button>

      </div>


      {/* =========================
          REPORT LIST
      ========================= */}

      <div className="bg-white p-6 rounded-xl shadow-md">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-teal-700">
            Medical Reports
          </h2>

          <button
            onClick={fetchReports}
            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md"
          >
            Refresh
          </button>

        </div>


        {loadingReports ? (

          <p className="text-gray-500">
            Loading reports...
          </p>

        ) : reports.length === 0 ? (

          <div className="text-center py-10 text-gray-500">
            No medical reports uploaded yet.
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-teal-700 text-white">

                  <th className="p-3 text-left">
                    Patient
                  </th>

                  <th className="p-3 text-left">
                    File Name
                  </th>

                  <th className="p-3 text-left">
                    Uploaded
                  </th>

                  <th className="p-3 text-center">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {reports.map((report) => {

                  const filename =
                    report.file_name ||
                    report.file_path
                      ?.split(/[\\/]/)
                      .pop();

                  return (

                    <tr
                      key={report.id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-3 font-medium">

                        {report.first_name || "Unknown"}{" "}
                        {report.last_name || "Patient"}

                      </td>

                      <td className="p-3 text-gray-600">

                        {filename}

                      </td>

                      <td className="p-3 text-gray-500">

                        {report.uploaded_at
                          ? new Date(
                              report.uploaded_at
                            ).toLocaleString()
                          : "-"}

                      </td>

                      <td className="p-3 text-center">

                        <button
                          onClick={() =>
                            openReport(report.file_path)
                          }
                          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md"
                        >
                          View Report
                        </button>

                      </td>

                    </tr>

                  );
                })}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default MedicalReports;
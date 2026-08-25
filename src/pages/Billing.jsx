import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Receipt,
  User,
  IndianRupee,
  FileText,
  ArrowLeft,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import API from "../api";

const Billing = () => {
  const navigate = useNavigate();

  // ================================
  // STATES
  // ================================
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [amount, setAmount] = useState("");

  const [loadingPatients, setLoadingPatients] = useState(true);
  const [generating, setGenerating] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ================================
  // FETCH PATIENTS
  // ================================
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoadingPatients(true);
      setError("");

      const response = await API.get("/patients");

      const patientData = response.data?.data || [];

      setPatients(patientData);
    } catch (err) {
      console.error(
        "Error fetching patients:",
        err.response?.data || err.message
      );

      setError("Unable to load patients. Please try again.");
    } finally {
      setLoadingPatients(false);
    }
  };

  // ================================
  // SELECTED PATIENT
  // ================================
  const selectedPatientData = patients.find(
    (patient) => patient.id === Number(selectedPatient)
  );

  // ================================
  // FORMAT CURRENCY
  // ================================
  const formatCurrency = (value) => {
    if (!value) return "₹0.00";

    return `₹${Number(value).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // ================================
  // GENERATE INVOICE
  // ================================
  const generateInvoice = async () => {
    setMessage("");
    setError("");

    if (!selectedPatient) {
      setError("Please select a patient.");
      return;
    }

    if (!amount) {
      setError("Please enter the billing amount.");
      return;
    }

    if (Number(amount) <= 0) {
      setError("Amount must be greater than ₹0.");
      return;
    }

    if (!selectedPatientData) {
      setError("Selected patient could not be found.");
      return;
    }

    try {
      setGenerating(true);

      const patientName =
        `${selectedPatientData.first_name || ""} ${selectedPatientData.last_name || ""
          }`.trim();

      const response = await API.post("/billing", {
        patient_id: selectedPatientData.id,
        patient_name: patientName,
        amount: Number(amount),
      });

      console.log(
        "Invoice Created:",
        response.data
      );

      setMessage(
        "Invoice generated successfully!"
      );

      setSelectedPatient("");
      setAmount("");

      // Go directly to invoice list
      navigate("/billing-list");

    } catch (err) {
      console.error(
        "Billing error:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
        "Failed to generate invoice. Please try again."
      );

    } finally {
      setGenerating(false);
    }
  };

  // ================================
  // RESET FORM
  // ================================
  const resetForm = () => {
    setSelectedPatient("");
    setAmount("");
    setMessage("");
    setError("");
  };

  // ================================
  // UI
  // ================================
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">

      {/* =================================
          PAGE HEADER
      ================================== */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <div className="flex items-center gap-3">
              <div className="bg-teal-600 p-3 rounded-xl shadow-sm">
                <Receipt className="w-6 h-6 text-white" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Billing
                </h1>

                <p className="text-gray-500 text-sm mt-1">
                  Create and manage patient invoices
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/billing-list")}
            className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition shadow-sm"
          >
            <FileText className="w-4 h-4" />
            View Invoices
          </button>

        </div>
      </div>

      {/* =================================
          MAIN CONTENT
      ================================== */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* =================================
            BILLING FORM
        ================================== */}
        <div className="lg:col-span-2">

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            {/* Card Header */}
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">
                Create New Invoice
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Select a patient and enter the billing amount.
              </p>
            </div>

            {/* Form */}
            <div className="p-6">

              {/* SUCCESS MESSAGE */}
              {message && (
                <div className="mb-5 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  <CheckCircle className="w-5 h-5 shrink-0" />

                  <span className="text-sm font-medium">
                    {message}
                  </span>
                </div>
              )}

              {/* ERROR MESSAGE */}
              {error && (
                <div className="mb-5 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <AlertCircle className="w-5 h-5 shrink-0" />

                  <span className="text-sm font-medium">
                    {error}
                  </span>
                </div>
              )}

              {/* PATIENT SELECT */}
              <div className="mb-6">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Patient
                </label>

                <div className="relative">

                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />

                  <select
                    value={selectedPatient}
                    onChange={(e) => {
                      setSelectedPatient(e.target.value);
                      setError("");
                      setMessage("");
                    }}
                    disabled={loadingPatients || generating}
                    className="w-full appearance-none border border-gray-300 rounded-xl pl-11 pr-4 py-3 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {loadingPatients
                        ? "Loading patients..."
                        : patients.length === 0
                          ? "No patients available"
                          : "Select a patient"}
                    </option>

                    {patients.map((patient) => (
                      <option
                        key={patient.id}
                        value={patient.id}
                      >
                        {patient.first_name} {patient.last_name}
                      </option>
                    ))}
                  </select>

                </div>

                {!loadingPatients && patients.length === 0 && (
                  <button
                    onClick={fetchPatients}
                    className="text-sm text-teal-600 hover:text-teal-700 mt-2"
                  >
                    Try loading patients again
                  </button>
                )}
              </div>

              {/* SELECTED PATIENT INFO */}
              {selectedPatientData && (
                <div className="mb-6 bg-teal-50 border border-teal-100 rounded-xl p-4">

                  <div className="flex items-center gap-3 mb-3">

                    <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800">
                        {selectedPatientData.first_name}{" "}
                        {selectedPatientData.last_name}
                      </p>

                      <p className="text-xs text-gray-500">
                        Patient ID: #{selectedPatientData.id}
                      </p>
                    </div>

                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">

                    {selectedPatientData.age && (
                      <div>
                        <p className="text-gray-500">
                          Age
                        </p>

                        <p className="font-medium text-gray-800">
                          {selectedPatientData.age}
                        </p>
                      </div>
                    )}

                    {selectedPatientData.gender && (
                      <div>
                        <p className="text-gray-500">
                          Gender
                        </p>

                        <p className="font-medium text-gray-800">
                          {selectedPatientData.gender}
                        </p>
                      </div>
                    )}

                    {selectedPatientData.department && (
                      <div>
                        <p className="text-gray-500">
                          Department
                        </p>

                        <p className="font-medium text-gray-800">
                          {selectedPatientData.department}
                        </p>
                      </div>
                    )}

                  </div>
                </div>
              )}

              {/* AMOUNT */}
              <div className="mb-6">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Billing Amount
                </label>

                <div className="relative">

                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setError("");
                      setMessage("");
                    }}
                    disabled={generating}
                    className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-100"
                  />

                </div>

                <p className="text-xs text-gray-500 mt-2">
                  Enter the total amount to be billed to the patient.
                </p>

              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3">

                <button
                  onClick={generateInvoice}
                  disabled={generating || loadingPatients}
                  className="flex-1 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-semibold py-3 px-5 rounded-xl transition"
                >
                  {generating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Receipt className="w-5 h-5" />
                      Generate Invoice
                    </>
                  )}
                </button>

                <button
                  onClick={resetForm}
                  disabled={generating}
                  className="sm:w-32 border border-gray-300 text-gray-700 font-semibold py-3 px-5 rounded-xl hover:bg-gray-50 transition disabled:opacity-50"
                >
                  Reset
                </button>

              </div>

            </div>
          </div>
        </div>

        {/* =================================
            INVOICE PREVIEW
        ================================== */}
        <div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            {/* Preview Header */}
            <div className="bg-teal-600 px-6 py-5 text-white">

              <div className="flex items-center gap-3">
                <Receipt className="w-6 h-6" />

                <div>
                  <h2 className="font-semibold">
                    Invoice Preview
                  </h2>

                  <p className="text-teal-100 text-xs mt-1">
                    Review billing details
                  </p>
                </div>
              </div>

            </div>

            {/* Preview */}
            <div className="p-6">

              {/* Patient */}
              <div className="mb-6">

                <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
                  Patient
                </p>

                {selectedPatientData ? (
                  <div>
                    <p className="font-semibold text-gray-800">
                      {selectedPatientData.first_name}{" "}
                      {selectedPatientData.last_name}
                    </p>

                    <p className="text-sm text-gray-500">
                      ID #{selectedPatientData.id}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-400">
                    No patient selected
                  </p>
                )}

              </div>

              {/* Divider */}
              <div className="border-t border-dashed border-gray-200 my-5" />

              {/* Amount */}
              <div className="mb-6">

                <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
                  Total Amount
                </p>

                <p className="text-3xl font-bold text-gray-800">
                  {formatCurrency(amount)}
                </p>

              </div>

              {/* Status */}
              <div className="bg-gray-50 rounded-xl p-4">

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Invoice Status
                  </span>

                  <span className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                    Pending
                  </span>

                </div>

              </div>

              {/* Info */}
              <div className="mt-5 flex gap-3 text-xs text-gray-500">

                <AlertCircle className="w-4 h-4 shrink-0 text-gray-400" />

                <p>
                  The invoice will be saved to the billing system
                  after you click "Generate Invoice".
                </p>

              </div>

            </div>
          </div>

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="mt-4 w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 py-2 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

        </div>
      </div>
    </div>
  );
};

export default Billing;
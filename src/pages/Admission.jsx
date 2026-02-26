import React from "react";
import AdmissionForm from "../components/AdmissionForm";

const Admission = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-teal-700 mb-6">
          Patient Admission
        </h2>

        <AdmissionForm />
      </div>
    </div>
  );
};

export default Admission;
import React from "react";
import { FileText, ShieldCheck, Database } from "lucide-react";

const EmrPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">

        <FileText className="mx-auto text-blue-600" size={60}/>

        <h1 className="text-4xl font-bold mt-6">
          Electronic Medical Records
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Secure digital records to store patient history, treatments,
          prescriptions, and lab reports.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          <div className="bg-white p-6 rounded-xl shadow">
            <Database className="mx-auto text-indigo-600" size={40}/>
            <h3 className="text-xl font-semibold mt-4">Centralized Data</h3>
            <p className="text-gray-600 mt-2">
              All patient records stored in one secure system.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <ShieldCheck className="mx-auto text-green-600" size={40}/>
            <h3 className="text-xl font-semibold mt-4">Secure Access</h3>
            <p className="text-gray-600 mt-2">
              Strong security to protect patient information.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <FileText className="mx-auto text-blue-600" size={40}/>
            <h3 className="text-xl font-semibold mt-4">Easy Reports</h3>
            <p className="text-gray-600 mt-2">
              Doctors can access medical history instantly.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmrPage;
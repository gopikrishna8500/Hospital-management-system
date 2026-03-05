import React from "react";
import { ShieldCheck, FileText, CreditCard } from "lucide-react";

const InsurancePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">

        <ShieldCheck className="mx-auto text-green-600" size={60}/>

        <h1 className="text-4xl font-bold mt-6">Insurance & Billing</h1>

        <p className="mt-4 text-gray-600 text-lg">
          Simplified hospital billing with insurance claim assistance
          and transparent payment processes.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          <div className="bg-white p-6 rounded-xl shadow">
            <ShieldCheck className="mx-auto text-green-600" size={40}/>
            <h3 className="text-xl font-semibold mt-4">Insurance Support</h3>
            <p className="text-gray-600 mt-2">
              Assistance with all major insurance providers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <FileText className="mx-auto text-blue-600" size={40}/>
            <h3 className="text-xl font-semibold mt-4">Transparent Billing</h3>
            <p className="text-gray-600 mt-2">
              Clear and detailed billing for every treatment.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <CreditCard className="mx-auto text-purple-600" size={40}/>
            <h3 className="text-xl font-semibold mt-4">Easy Payments</h3>
            <p className="text-gray-600 mt-2">
              Multiple payment options for patient convenience.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InsurancePage;
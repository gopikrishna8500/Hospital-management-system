import React from "react";
import { Pill, Truck, Clock } from "lucide-react";

const PharmacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">

        <Pill className="mx-auto text-green-600" size={60} />

        <h1 className="text-4xl font-bold mt-6">Hospital Pharmacy</h1>

        <p className="mt-4 text-gray-600 text-lg">
          We provide a wide range of medicines and healthcare products
          with trusted pharmaceutical services.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          <div className="bg-white p-6 rounded-xl shadow">
            <Pill className="mx-auto text-green-600" size={40}/>
            <h3 className="text-xl font-semibold mt-4">All Medicines Available</h3>
            <p className="text-gray-600 mt-2">
              Complete stock of essential medicines and prescriptions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <Truck className="mx-auto text-blue-600" size={40}/>
            <h3 className="text-xl font-semibold mt-4">Medicine Supply</h3>
            <p className="text-gray-600 mt-2">
              Reliable medicine supply chain for patient care.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <Clock className="mx-auto text-purple-600" size={40}/>
            <h3 className="text-xl font-semibold mt-4">24/7 Pharmacy</h3>
            <p className="text-gray-600 mt-2">
              Pharmacy services available anytime for emergencies.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PharmacyPage;
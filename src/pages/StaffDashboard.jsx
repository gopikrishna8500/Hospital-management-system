import React from "react";

const StaffDashboard = () => {
  return (
    <div className="min-h-screen bg-blue-50 p-10">

      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        Staff Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-3">Patient Records</h2>
          <p className="text-gray-600">Manage patient details</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-3">Admissions</h2>
          <p className="text-gray-600">Handle admissions & discharge</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-3">Billing Support</h2>
          <p className="text-gray-600">Assist billing & insurance</p>
        </div>

      </div>
    </div>
  );
};

export default StaffDashboard;
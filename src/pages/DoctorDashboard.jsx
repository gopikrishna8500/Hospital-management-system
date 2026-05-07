import React from "react";

const DoctorDashboard = () => {
  return (
    <div className="min-h-screen bg-teal-50 p-10">

      <h1 className="text-4xl font-bold text-teal-700 mb-8">
        Doctor Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-3">Today's Patients</h2>
          <p className="text-gray-600">View patient appointments</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-3">Medical Reports</h2>
          <p className="text-gray-600">Access reports & prescriptions</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-3">Emergency Cases</h2>
          <p className="text-gray-600">Handle emergency patients</p>
        </div>

      </div>
    </div>
  );
};

export default DoctorDashboard;
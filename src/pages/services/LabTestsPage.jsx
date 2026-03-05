import React from "react";
import { Microscope, FileSearch, Clock } from "lucide-react";

const LabTestsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">

        <Microscope className="mx-auto text-purple-600" size={60}/>

        <h1 className="text-4xl font-bold mt-6">Lab Tests & Diagnostics</h1>

        <p className="mt-4 text-gray-600 text-lg">
          Accurate diagnostic tests using modern laboratory equipment
          and expert technicians.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          <div className="bg-white p-6 rounded-xl shadow">
            <Microscope className="mx-auto text-purple-600" size={40}/>
            <h3 className="text-xl font-semibold mt-4">Advanced Testing</h3>
            <p className="text-gray-600 mt-2">
              Modern lab equipment for precise test results.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <FileSearch className="mx-auto text-blue-600" size={40}/>
            <h3 className="text-xl font-semibold mt-4">Digital Reports</h3>
            <p className="text-gray-600 mt-2">
              Patients receive reports online instantly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <Clock className="mx-auto text-green-600" size={40}/>
            <h3 className="text-xl font-semibold mt-4">Fast Results</h3>
            <p className="text-gray-600 mt-2">
              Lab reports delivered quickly for faster diagnosis.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LabTestsPage;
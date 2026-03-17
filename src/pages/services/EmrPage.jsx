import React from "react";
import { FileText, ShieldCheck, Database } from "lucide-react";
import { motion } from "framer-motion";

const EmrPage = () => {
  return (
    <div className="min-h-screen bg-gray-50  px-6">
      <section className="relative bg-linear-to-r bg-teal-700 text-white pt-10 pb-24">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
             Our Hospital  Services

          </motion.h1>

          <motion.p
            className="max-w-3xl mx-auto text-lg text-teal-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
             We provide world-class healthcare services with modern technology and
            professional medical staff to ensure the best treatment for patients.
          </motion.p>

        </div>

        {/* Bottom Shape */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#f9fafb"
              fillOpacity="1"
              d="M0,192L80,176C160,160,320,128,480,138.7C640,149,800,203,960,218.7C1120,235,1280,213,1360,202.7L1440,192L1440,320L0,320Z"
            ></path>
          </svg>
        </div>

      </section>
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
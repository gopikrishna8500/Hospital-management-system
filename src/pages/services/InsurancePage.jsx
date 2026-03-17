import React from "react";
import { ShieldCheck, FileText, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const InsurancePage = () => {
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
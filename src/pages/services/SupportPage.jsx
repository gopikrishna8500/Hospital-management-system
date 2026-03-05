import React from "react";
import { Headphones, MessageCircle, Clock } from "lucide-react";

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">

        <Headphones className="mx-auto text-blue-600" size={60}/>

        <h1 className="text-4xl font-bold mt-6">24/7 Patient Support</h1>

        <p className="mt-4 text-gray-600 text-lg">
          Our support team is always ready to assist patients with
          appointments, queries, and medical assistance.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          <div className="bg-white p-6 rounded-xl shadow">
            <Clock className="mx-auto text-green-600" size={40}/>
            <h3 className="text-xl font-semibold mt-4">24/7 Helpdesk</h3>
            <p className="text-gray-600 mt-2">
              Assistance anytime for patient needs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <MessageCircle className="mx-auto text-purple-600" size={40}/>
            <h3 className="text-xl font-semibold mt-4">Live Support</h3>
            <p className="text-gray-600 mt-2">
              Quick support for appointments and services.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <Headphones className="mx-auto text-blue-600" size={40}/>
            <h3 className="text-xl font-semibold mt-4">Patient Care</h3>
            <p className="text-gray-600 mt-2">
              Dedicated team ensuring patient satisfaction.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SupportPage;
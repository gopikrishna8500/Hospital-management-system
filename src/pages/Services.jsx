import React from "react";
import {
  Ambulance,
  Pill,
  FileText,
  FlaskConical,
  ShieldCheck,
  Headset
} from "lucide-react";

const services = [
  {
    title: "Emergency Ambulance",
    icon: <Ambulance className="w-10 h-10 text-teal-600" />,
    description:
      "24/7 emergency ambulance service equipped with advanced life-support systems and trained paramedics.",
  },
  {
    title: "Pharmacy & Medicine Supply",
    icon: <Pill className="w-10 h-10 text-teal-600" />,
    description:
      "Hospital pharmacy providing authentic medicines with expert pharmacist guidance.",
  },
  {
    title: "Digital Medical Records",
    icon: <FileText className="w-10 h-10 text-teal-600" />,
    description:
      "Secure electronic medical records allowing doctors instant access to patient history.",
  },
  {
    title: "Lab Test & Reports",
    icon: <FlaskConical className="w-10 h-10 text-teal-600" />,
    description:
      "Advanced diagnostic laboratory offering accurate test results with digital reports.",
  },
  {
    title: "Insurance & Billing",
    icon: <ShieldCheck className="w-10 h-10 text-teal-600" />,
    description:
      "Transparent billing and support for multiple health insurance providers.",
  },
  {
    title: "24/7 Patient Support",
    icon: <Headset className="w-10 h-10 text-teal-600" />,
    description:
      "Dedicated support team available round the clock for patient assistance and appointments.",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">

      {/* Title */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-800">
          Our Hospital Services
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          We provide comprehensive healthcare services with advanced
          medical technology and expert doctors to ensure the best
          treatment for every patient.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition duration-300 border"
          >
            <div className="mb-5">{service.icon}</div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {service.title}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Services;
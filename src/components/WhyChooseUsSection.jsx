import React from "react";
import { ShieldCheck, Clock, Cloud, HeartPulse } from "lucide-react";

const WhyChooseUsSection = () => {
  const points = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-teal-600" />,
      title: "Secure & Compliant",
      desc: "End-to-end encrypted patient data with healthcare compliance standards.",
    },
    {
      icon: <Clock className="w-10 h-10 text-teal-600" />,
      title: "24/7 Availability",
      desc: "Always accessible hospital management with zero downtime architecture.",
    },
    {
      icon: <Cloud className="w-10 h-10 text-teal-600" />,
      title: "Cloud Based",
      desc: "Access your hospital system securely from anywhere at any time.",
    },
    {
      icon: <HeartPulse className="w-10 h-10 text-teal-600" />,
      title: "Patient-Centric",
      desc: "Built to improve patient experience and medical workflow efficiency.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Why Choose MediTrack?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Enterprise-grade healthcare automation built for modern hospitals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl mx-auto px-6">
        {points.map((item, index) => (
          <div key={index} className="bg-gray-50 p-10 rounded-xl shadow-md hover:shadow-xl transition text-center">
            <div className="mb-4 flex justify-center">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
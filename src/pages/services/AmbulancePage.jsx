import React from "react";
import { Ambulance, Clock, ShieldCheck } from "lucide-react";
import ServiceCard from "../../components/ServiceCard";

const AmbulancePage = () => {
  return (
    <div>

      {/* HERO */}
      <div className="bg-red-600 text-white py-20 text-center">
        <Ambulance size={60} className="mx-auto mb-4"/>
        <h1 className="text-4xl font-bold">
          Emergency Ambulance Service
        </h1>
        <p className="mt-4">
          Fast emergency response with advanced ambulance support
        </p>
      </div>

      {/* FEATURES */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 py-16 px-6">

        <ServiceCard
          icon={Clock}
          title="24/7 Emergency"
          text="Ambulance service available anytime"
        />

        <ServiceCard
          icon={ShieldCheck}
          title="Advanced Equipment"
          text="Life support ambulance facilities"
        />

        <ServiceCard
          icon={Ambulance}
          title="Quick Response"
          text="Fast patient transportation"
        />

      </div>

      {/* CTA */}
      <div className="text-center pb-16">
        <a
          href="tel:+919876543210"
          className="bg-red-600 text-white px-8 py-3 rounded-lg"
        >
          Call Ambulance
        </a>
      </div>

    </div>
  );
};

export default AmbulancePage;
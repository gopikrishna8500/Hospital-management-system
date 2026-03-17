import React from "react";
import { Ambulance, Clock, ShieldCheck } from "lucide-react";
import ServiceCard from "../../components/ServiceCard";
import { motion } from "framer-motion";

const AmbulancePage = () => {
  return (
    <div>

      {/* HERO */}

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
      <section>
      <div className="bg-red-600 text-white py-20 text-center">
        <Ambulance size={60} className="mx-auto mb-4" />
        <h1 className="text-4xl font-bold">
          Emergency Ambulance Service
        </h1>
        <p className="mt-4">
          Fast emergency response with advanced ambulance support
        </p>
      </div>
</section>
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
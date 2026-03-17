import React, { useState } from "react";
import DoctorCard, { doctorsData } from "./DoctorCard";
import { motion } from "framer-motion";
const Doctors = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const filteredDoctors = doctorsData.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter ? doc.specialization === filter : true)
  );

  const specializations = [...new Set(doctorsData.map((doc) => doc.specialization))];

  return (
    <div className="bg-gray-50 min-h-screen ">
           <section className="relative bg-linear-to-r from-teal-700 to-teal-500 text-white pt-10 pb-24">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
             Our Doctors
          
          </motion.h1>

          <motion.p
            className="max-w-3xl mx-auto text-lg text-teal-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Explore our specialized medical Doctors providing expert care.
            We are transforming healthcare with intelligent digital solutions.
            Our Hospital Management System simplifies hospital operations,
            enhances patient care, and empowers healthcare professionals with
            secure and scalable technology.
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
      {/* ...title and search/filter code... */}

      <div className="grid md:grid-cols-3 gap-8">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default Doctors;

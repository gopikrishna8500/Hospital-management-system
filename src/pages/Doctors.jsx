import React, { useEffect, useState } from "react";
import DoctorCard from "../pages/DoctorCard";
import { motion } from "framer-motion";
import API from "../api";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);

      const res = await API.get("/doctors");

      console.log("Doctors from database:", res.data);

      setDoctors(res.data);
    } catch (error) {
      console.error("Failed to load doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter((doc) => {
    const doctorName = doc.doctor_name || "";
    const specialization = doc.specialization || "";

    const matchesSearch = doctorName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter = filter
      ? specialization === filter
      : true;

    return matchesSearch && matchesFilter;
  });

  const specializations = [
    ...new Set(
      doctors
        .map((doc) => doc.specialization)
        .filter(Boolean)
    ),
  ];

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* =========================
          HERO
      ========================= */}

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
            transition={{
              delay: 0.4,
              duration: 0.8,
            }}
          >
            Meet our experienced doctors and healthcare
            professionals providing expert medical care.
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
              d="M0,192L80,176C160,160,320,128,480,138.7C640,149,800,203,960,218.7C1120,235,1280,213,1360,202.7L1440,192L1440,320L0,320Z"
            />
          </svg>

        </div>

      </section>

      {/* =========================
          SEARCH + FILTER
      ========================= */}

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row gap-4 my-8">

          <input
            type="text"
            placeholder="Search Doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 flex-1 bg-white"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 bg-white"
          >

            <option value="">
              All Specializations
            </option>

            {specializations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}

          </select>

        </div>

        {/* =========================
            LOADING
        ========================= */}

        {loading && (
          <div className="text-center py-16">

            <p className="text-teal-600 text-lg font-medium">
              Loading doctors...
            </p>

          </div>
        )}

        {/* =========================
            NO DOCTORS
        ========================= */}

        {!loading && filteredDoctors.length === 0 && (
          <div className="text-center py-16">

            <p className="text-gray-500 text-lg">
              No doctors found.
            </p>

          </div>
        )}

        {/* =========================
            DOCTOR CARDS
        ========================= */}

        {!loading && filteredDoctors.length > 0 && (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">

            {filteredDoctors.map((doctor) => (

              <DoctorCard
                key={doctor.id}
                doctor={{
                  id: doctor.id,

                  name: doctor.doctor_name,

                  specialization:
                    doctor.specialization,

                  department:
                    doctor.department_name,

                  availability:
                    doctor.availability,

                  experience:
                    doctor.experience,

                  qualification:
                    doctor.qualification,

                  phone:
                    doctor.phone,

                  email:
                    doctor.email,

                  consultationFee:
                    doctor.consultation_fee,

                  workingDays:
                    doctor.working_days,

                  workingHours:
                    doctor.working_hours,

                  photo:
                    doctor.photo,
                }}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Doctors;
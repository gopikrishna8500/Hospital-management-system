import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  /* ===============================
     SLIDER DATA
  =============================== */

  const slides = [
    {
      image:
        "https://5.imimg.com/data5/ANDROID/Default/2024/9/452669990/KA/CF/MV/54596979/product-jpeg-1000x1000.jpg",
      title: "Smart Patient Tracking. Seamless Hospital Management.",
      subtitle:
        "RunsEra MediTrack is a secure, intelligent hospital management system designed to streamline patient care and optimize hospital operations.",
      description:
        "From patient registration to discharge, billing to EMR, and inventory to analytics — MediTrack centralizes every hospital operation into one powerful, secure platform.",
      button: "Request Demo",
      link: "/about",
    },
    {
      image:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=60",
      title: "Next-Generation Hospital Patient Tracking System",
      subtitle:
        "Digitize hospital workflows, enhance patient experiences, and ensure complete data security.",
      description:
        "Manage patients, doctors, appointments, lab reports, pharmacy, and billing — all in one intelligent dashboard built for modern healthcare institutions.",
      button: "Explore Features",
      link: "/about",
    },
    {
      image:
        "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1600&q=60",
      title: "Caring for Patients. Empowering Healthcare Professionals.",
      subtitle:
        "A unified hospital management system built to simplify healthcare administration.",
      description:
        "MediTrack enables real-time patient tracking, secure medical record management, streamlined billing, and compliance-ready infrastructure.",
      button: "Book a Demo",
      link: "/about",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

return (
  <>
    {/* ===============================
        IMAGE SLIDER SECTION (FIRST)
    =============================== */}

    <section className="relative w-full h-[90vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 flex items-center justify-center text-center px-6">
            <div className="text-white max-w-4xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                {slide.title}
              </h1>

              <h2 className="text-lg md:text-2xl font-semibold mb-4 text-teal-300">
                {slide.subtitle}
              </h2>

              <p className="text-sm md:text-base mb-8 text-gray-200">
                {slide.description}
              </p>

              <button
                className="px-8 py-3 bg-teal-600 hover:bg-teal-500 transition rounded-lg font-semibold shadow-xl"
                onClick={() => navigate(slide.link)}
              >
                {slide.button}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-6 -translate-y-1/2 bg-black/40 hover:bg-black/70 p-3 rounded-full text-white transition"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-6 -translate-y-1/2 bg-black/40 hover:bg-black/70 p-3 rounded-full text-white transition"
      >
        <ChevronRight size={28} />
      </button>
    </section>

    {/* ===============================
        PREMIUM SaaS INTRO SECTION
    =============================== */}

    <section className="relative py-32 bg-linear-to-br from-teal-950 via-teal-900 to-teal-800 text-white overflow-hidden">
      <div className="absolute w-150 h-150 bg-teal-500/20 rounded-full blur-3xl -top-37.5 -left-37.5" />
      <div className="absolute w-125 h-125 bg-teal-300/10 rounded-full blur-3xl -bottom-37.5 -right-37.5" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold leading-tight mb-6"
        >
          Intelligent Hospital Management
          <span className="block text-teal-400">
            Powered by MediTrack
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-teal-100 max-w-3xl mx-auto mb-10"
        >
          Secure patient tracking, seamless EMR integration,
          automated billing, and real-time analytics —
          all in one unified enterprise healthcare platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <button
            onClick={() => navigate("/appointments")}
            className="bg-teal-500 hover:bg-teal-400 px-8 py-3 rounded-lg font-semibold shadow-xl transition transform hover:scale-105"
          >
            Book Appointment
          </button>

          <button
            onClick={() => navigate("/contact-us")}
            className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-900 transition"
          >
            Request Enterprise Demo
          </button>
        </motion.div>
      </div>
    </section>
  </>
);
};

export default HeroSection;
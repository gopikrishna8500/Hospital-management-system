import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

const HeroSection = () => {
  const navigate = useNavigate(); 

  const slides = [
  {
    image: "https://5.imimg.com/data5/ANDROID/Default/2024/9/452669990/KA/CF/MV/54596979/product-jpeg-1000x1000.jpg",
        title: "Smart Patient Tracking. Seamless Hospital Management.",
    subtitle: "RunsEra MediTrack is a secure, intelligent hospital management system designed to streamline patient care and optimize hospital operations.",
    description: "From patient registration to discharge, billing to EMR, and inventory to analytics — MediTrack centralizes every hospital operation into one powerful, secure platform.",
    button: "Request Demo",
    link: "/about"
  },
  {
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=60",
    title: "Next-Generation Hospital Patient Tracking System",
    subtitle: "Digitize hospital workflows, enhance patient experiences, and ensure complete data security.",
    description: "Manage patients, doctors, appointments, lab reports, pharmacy, and billing — all in one intelligent dashboard built for modern healthcare institutions.",
    button: "Explore Features",
    link: "/about"
  },
  {
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1600&q=60",
    title: "Caring for Patients. Empowering Healthcare Professionals.",
    subtitle: "A unified hospital management system built to simplify healthcare administration.",
    description: "MediTrack enables real-time patient tracking, secure medical record management, streamlined billing, and compliance-ready infrastructure.",
    button: "Book a Demo",
    link: "/about"
  }
];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-200 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={slide.image} alt="" className="w-full h-full object-cover" />

          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-4">
            <div className="text-white max-w-2xl">
              <h1 className="text-2xl md:text-4xl font-bold mb-2">{slide.title}</h1>
              <h2 className="text-lg md:text-2xl font-semibold mb-2">{slide.subtitle}</h2>
              <p className="text-sm md:text-base mb-4">{slide.description}</p>

              <button
                className="px-5 py-2 bg-teal-600 hover:bg-teal-500 transition rounded-md text-sm font-medium uppercase"
                onClick={() => navigate(slide.link)} 
              >
                {slide.button}
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default HeroSection;

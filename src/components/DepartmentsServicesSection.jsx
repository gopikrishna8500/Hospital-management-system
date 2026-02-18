import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const DepartmentsServicesSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const departments = [
    {
      name: "General Medicine",
      image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg",
      link: "/departments/general-medicine",
      doctors: [
        "Dr. Arjun Mehta",
        "Dr. Sara Singh",
        "Dr. Rohit Malhotra"
      ]
    },
    {
      name: "Cardiology",
      image: "https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg",
      link: "/departments/cardiology",
      doctors: [
        "Dr. Nisha Patel",
        "Dr. Rahul Verma",
        "Dr. Kavita Iyer"
      ]
    },
    {
      name: "Neurology",
      image: "https://images.pexels.com/photos/7088489/pexels-photo-7088489.jpeg",
      link: "/departments/neurology",
      doctors: [
        "Dr. Priya Sharma",
        "Dr. Anil Kumar",
        "Dr. Meera Joshi"
      ]
    },
    {
      name: "Orthopedics",
      image: "https://images.pexels.com/photos/3845659/pexels-photo-3845659.jpeg",
      link: "/departments/orthopedics",
      doctors: [
        "Dr. Vikram Singh",
        "Dr. Ritu Agarwal",
        "Dr. Aman Desai"
      ]
    },
    {
      name: "Pharmacy & Inventory",
      image: "https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg",
      link: "/services/pharmacy",
      doctors: []
    },
    {
      name: "Laboratory Integration",
      image: "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg",
      link: "/services/lab",
      doctors: []
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`py-24 bg-gray-50 transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Explore Our Departments & Services
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          MediTrack centralizes hospital operations. Discover our departments,
          expert doctors, and advanced healthcare services.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-6">
        {departments.map((dept, index) => (
          <div
            key={index}
            onClick={() => navigate(dept.link)}
            className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group transform hover:scale-105 transition duration-500"
          >
            {/* Department Image */}
            <img
              src={dept.image}
              alt={dept.name}
              className="w-full h-64 object-cover"
              loading="lazy"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-black/30 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-center items-center p-6 text-center">
              <h3 className="text-white text-2xl font-semibold mb-3">
                {dept.name}
              </h3>

              {dept.doctors.length > 0 && (
                <ul className="text-gray-200 text-sm space-y-1">
                  {dept.doctors.map((doc, i) => (
                    <li key={i}>{doc}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DepartmentsServicesSection;

import React from "react";
import { Ambulance, Pill, FileText, Microscope, CreditCard, Headphones } from "lucide-react";

const services = [
  {
    icon: <Ambulance size={40} className="text-red-500" />,
    title: "Emergency Ambulance",
    description:
      "24/7 ambulance service for emergency patient transportation with advanced life-support equipment."
  },
  {
    icon: <Pill size={40} className="text-green-600" />,
    title: "Pharmacy & Medicine Supply",
    description:
      "Fully stocked hospital pharmacy providing prescribed medicines and medical supplies."
  },
  {
    icon: <FileText size={40} className="text-blue-600" />,
    title: "Digital Medical Records",
    description:
      "Secure electronic medical record system allowing doctors and patients to access health data anytime."
  },
  {
    icon: <Microscope size={40} className="text-purple-600" />,
    title: "Lab Test & Reports",
    description:
      "Advanced diagnostic lab for blood tests, scans, and accurate medical reports."
  },
  {
    icon: <CreditCard size={40} className="text-yellow-600" />,
    title: "Insurance & Billing",
    description:
      "Easy insurance processing, billing management, and digital payment options."
  },
  {
    icon: <Headphones size={40} className="text-teal-600" />,
    title: "24/7 Patient Support",
    description:
      "Our patient support team is available round the clock to assist with appointments and queries."
  }
];

const ServicesPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO SECTION */}
      <div className="bg-teal-700 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Hospital Services</h1>
        <p className="text-lg max-w-2xl mx-auto">
          We provide world-class healthcare services with modern technology and
          professional medical staff to ensure the best treatment for patients.
        </p>
      </div>

      {/* SERVICES GRID */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition duration-300"
            >
              <div className="mb-4">{service.icon}</div>

              <h3 className="text-xl font-semibold mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* CTA SECTION */}
      <div className="bg-teal-800 text-white text-center py-14">
        <h2 className="text-3xl font-bold mb-4">
          Need Medical Assistance?
        </h2>

        <p className="mb-6">
          Our doctors and emergency team are available 24/7 for your healthcare needs.
        </p>

        <button className="bg-white text-teal-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100">
          Book Appointment
        </button>
      </div>

    </div>
  );
};

export default ServicesPage;
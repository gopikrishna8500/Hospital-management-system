import React from "react";
import { UserCheck, FileText, CalendarCheck, CreditCard, Box, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";



const FeaturesSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <UserCheck className="w-8 h-8 text-teal-600" />,
      title: "Patient Management",
      description: "Register patients, manage in/out patients, track admissions, visit history, prescriptions, and ward allocations.",
      link: "/patient-registration"
    },
    {
      icon: <FileText className="w-8 h-8 text-teal-600" />,
      title: "Medical Records (EMR)",
      description: "Secure digital storage of diagnostics, lab reports, treatment history, surgeries, and prescriptions for easy access.",
      link: "/emr"
    },
    {
      icon: <CalendarCheck className="w-8 h-8 text-teal-600" />,
      title: "Appointments & Queue",
      description: "Online and walk-in appointment booking, real-time token tracking, and automatic SMS/email reminders.",
      link: "/appointments"
    },
    {
      icon: <CreditCard className="w-8 h-8 text-teal-600" />,
      title: "Billing & Insurance",
      description: "Manage OP/IP billing, insurance claims, and auto-generated invoices & receipts with full tracking.",
      link: "/billing"
    },
    {
      icon: <Box className="w-8 h-8 text-teal-600" />,
      title: "Inventory & Pharmacy",
      description: "Monitor medicine stock, expiry alerts, prescription integration, and pharmacy operations seamlessly.",
      link: "/pharmacy"
    },
    {
      icon: <Activity className="w-8 h-8 text-teal-600" />,
      title: "Admin Dashboard",
      description: "Get real-time statistics, occupancy rates, patient counts, and generate detailed reports easily.",
      link: "/admin-dashboard"
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Core Features of MediTrack
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition cursor-pointer group"
              onClick={() => navigate(feature.link)}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-teal-600 transition">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

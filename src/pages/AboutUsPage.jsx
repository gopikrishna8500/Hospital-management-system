import React from "react";
import {
  HeartPulse,
  Users,
  ShieldCheck,
  Award,
  Clock,
  CheckCircle,
} from "lucide-react";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-8">

      {/* HERO */}
      <div className="text-center max-w-4xl mx-auto mb-20">
        <h1 className="text-5xl font-bold text-teal-600 mb-6">
          Transforming Healthcare Through Digital Innovation
        </h1>
        <p className="text-gray-600 text-lg">
          Our Hospital Management System is built to modernize healthcare
          operations, enhance patient care, and provide hospitals with
          intelligent digital infrastructure.
        </p>
      </div>

      {/* COMPANY STORY */}
      <div className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">
          Our Story
        </h2>
        <p className="text-gray-600 text-center leading-7">
          Founded with the vision to digitize healthcare management, our
          platform was developed to address inefficiencies in hospital
          administration. We combined medical expertise with advanced
          technology to create a secure, scalable and user-friendly solution
          that empowers healthcare institutions worldwide.
        </p>
      </div>

      {/* MISSION & VISION */}
      <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-6xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-teal-600">
            Our Mission
          </h2>
          <p className="text-gray-600">
            To provide hospitals with a smart digital infrastructure that
            simplifies patient management, improves workflow automation,
            and ensures better healthcare delivery.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-teal-600">
            Our Vision
          </h2>
          <p className="text-gray-600">
            To become a leading healthcare SaaS solution powering hospitals,
            clinics and medical institutions with secure and scalable systems.
          </p>
        </div>
      </div>

      {/* CORE VALUES */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <ShieldCheck className="mx-auto text-teal-600 mb-4" size={40} />
          <h3 className="font-semibold text-xl mb-3">Integrity</h3>
          <p className="text-gray-600">
            We prioritize patient data security and ethical healthcare practices.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <HeartPulse className="mx-auto text-teal-600 mb-4" size={40} />
          <h3 className="font-semibold text-xl mb-3">Compassion</h3>
          <p className="text-gray-600">
            Technology designed to enhance patient experience and care.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <Award className="mx-auto text-teal-600 mb-4" size={40} />
          <h3 className="font-semibold text-xl mb-3">Excellence</h3>
          <p className="text-gray-600">
            We deliver high-performance systems with enterprise-grade quality.
          </p>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="bg-teal-600 text-white py-12 rounded-xl mb-20">
        <div className="grid md:grid-cols-4 text-center gap-6">
          <div>
            <h3 className="text-3xl font-bold">10,000+</h3>
            <p>Patients Managed</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">250+</h3>
            <p>Healthcare Staff</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">50+</h3>
            <p>Departments Digitized</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">99.9%</h3>
            <p>System Uptime</p>
          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-teal-600 text-center mb-10">
          Our Journey
        </h2>

        <div className="space-y-6 max-w-3xl mx-auto">
          {[
            {
              year: "2022 — Foundation",
              text: "Started development of a smart hospital administration system.",
            },
            {
              year: "2023 — Expansion",
              text: "Introduced role-based access and dynamic analytics.",
            },
            {
              year: "2024 — Enterprise Ready",
              text: "Launched advanced modules: billing, appointments, and reports.",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <Clock className="text-teal-600 mt-1" />
              <div>
                <h4 className="font-semibold">{item.year}</h4>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CERTIFICATIONS */}
      <div className="bg-white p-10 rounded-xl shadow-md mb-20 text-center">
        <CheckCircle className="mx-auto text-teal-600 mb-4" size={40} />
        <h3 className="text-2xl font-semibold mb-4">
          Compliance & Security Standards
        </h3>
        <p className="text-gray-600">
          Our system follows healthcare data protection standards and
          enterprise security protocols to ensure maximum reliability and trust.
        </p>
      </div>

      {/* TESTIMONIALS */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-teal-600 text-center mb-10">
          What Professionals Say
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-600 mb-4">
              “This system streamlined our hospital operations and improved
              workflow efficiency significantly.”
            </p>
            <h4 className="font-semibold">Dr. Maria Thompson</h4>
            <p className="text-sm text-gray-500">Senior Physician</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-600 mb-4">
              “User-friendly interface and powerful analytics — exactly what
              modern hospitals need.”
            </p>
            <h4 className="font-semibold">James Robertson</h4>
            <p className="text-sm text-gray-500">Hospital Administrator</p>
          </div>
        </div>
      </div>

      {/* TEAM SECTION */}
      <div className="text-center mb-20">
        <h2 className="text-3xl font-bold text-teal-600 mb-6">Our Leadership</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { name: "Dr. Sarah Williams", role: "Chief Medical Officer" },
            { name: "Michael Johnson", role: "Hospital Administrator" },
            { name: "Emily Carter", role: "Lead Software Engineer" },
          ].map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h4 className="font-semibold">{member.name}</h4>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="text-center bg-teal-600 text-white py-12 rounded-xl">
        <h3 className="text-2xl font-bold mb-4">
          Join the Future of Digital Healthcare
        </h3>
        <p className="mb-6">
          Experience secure, scalable and intelligent hospital management.
        </p>
        <button className="bg-white text-teal-600 px-6 py-3 rounded-md font-semibold">
          Contact Us
        </button>
      </div>

    </div>
  );
};

export default AboutUs;

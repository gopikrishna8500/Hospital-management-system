import React from "react";
import {
  HeartPulse,
  Users,
  ShieldCheck,
  Award,
  Clock,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const AboutUs = () => {
  // Framer Motion variants for smooth animations
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">

      {/* HERO */}
      <motion.div
        className="text-center max-w-4xl mx-auto mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h1 className="text-5xl font-bold text-teal-600 mb-6">
          Transforming Healthcare Through Digital Innovation
        </h1>
        <p className="text-gray-600 text-lg">
          Our Hospital Management System is built to modernize healthcare
          operations, enhance patient care, and provide hospitals with
          intelligent digital infrastructure.
        </p>
      </motion.div>

      {/* COMPANY STORY */}
      <motion.div
        className="max-w-5xl mx-auto mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
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
      </motion.div>

      {/* MISSION & VISION */}
      <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-6xl mx-auto">
        <motion.div
          className="bg-white p-8 rounded-xl shadow-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-2xl font-semibold mb-3 text-teal-600">
            Our Mission
          </h2>
          <p className="text-gray-600">
            To provide hospitals with a smart digital infrastructure that
            simplifies patient management, improves workflow automation,
            and ensures better healthcare delivery.
          </p>
        </motion.div>

        <motion.div
          className="bg-white p-8 rounded-xl shadow-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-3 text-teal-600">
            Our Vision
          </h2>
          <p className="text-gray-600">
            To become a leading healthcare SaaS solution powering hospitals,
            clinics and medical institutions with secure and scalable systems.
          </p>
        </motion.div>
      </div>

      {/* CORE VALUES */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {[
          { icon: ShieldCheck, title: "Integrity", desc: "We prioritize patient data security and ethical healthcare practices." },
          { icon: HeartPulse, title: "Compassion", desc: "Technology designed to enhance patient experience and care." },
          { icon: Award, title: "Excellence", desc: "We deliver high-performance systems with enterprise-grade quality." }
        ].map((val, i) => (
          <motion.div
            key={i}
            className="bg-white p-8 rounded-xl shadow-md text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: i * 0.2 }}
          >
            <val.icon className="mx-auto text-teal-600 mb-4" size={40} />
            <h3 className="font-semibold text-xl mb-3">{val.title}</h3>
            <p className="text-gray-600">{val.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* STATISTICS */}
      <motion.div
        className="bg-teal-600 text-white py-12 rounded-xl mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="grid md:grid-cols-4 text-center gap-6">
          {[
            { value: "10,000+", label: "Patients Managed" },
            { value: "250+", label: "Healthcare Staff" },
            { value: "50+", label: "Departments Digitized" },
            { value: "99.9%", label: "System Uptime" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="transition"
            >
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* TIMELINE */}
      <motion.div
        className="mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-3xl font-bold text-teal-600 text-center mb-10">
          Our Journey
        </h2>

        <div className="space-y-6 max-w-3xl mx-auto">
          {[
            { year: "2022 — Foundation", text: "Started development of a smart hospital administration system." },
            { year: "2023 — Expansion", text: "Introduced role-based access and dynamic analytics." },
            { year: "2024 — Enterprise Ready", text: "Launched advanced modules: billing, appointments, and reports." }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <Clock className="text-teal-600 mt-1" />
              <div>
                <h4 className="font-semibold">{item.year}</h4>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CERTIFICATIONS */}
      <motion.div
        className="bg-white p-10 rounded-xl shadow-md mb-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <CheckCircle className="mx-auto text-teal-600 mb-4" size={40} />
        <h3 className="text-2xl font-semibold mb-4">
          Compliance & Security Standards
        </h3>
        <p className="text-gray-600">
          Our system follows healthcare data protection standards and
          enterprise security protocols to ensure maximum reliability and trust.
        </p>
      </motion.div>

      {/* TESTIMONIALS */}
      <motion.div
        className="mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-3xl font-bold text-teal-600 text-center mb-10">
          What Professionals Say
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { text: "“This system streamlined our hospital operations and improved workflow efficiency significantly.”", name: "Dr. Maria Thompson", role: "Senior Physician" },
            { text: "“User-friendly interface and powerful analytics — exactly what modern hospitals need.”", name: "James Robertson", role: "Hospital Administrator" }
          ].map((t, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow-md"
              whileHover={{ scale: 1.03 }}
            >
              <p className="text-gray-600 mb-4">{t.text}</p>
              <h4 className="font-semibold">{t.name}</h4>
              <p className="text-sm text-gray-500">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* TEAM SECTION */}
      <motion.div
        className="text-center mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-3xl font-bold text-teal-600 mb-6">Our Leadership</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { name: "Dr. Sarah Williams", role: "Chief Medical Officer" },
            { name: "Michael Johnson", role: "Hospital Administrator" },
            { name: "Emily Carter", role: "Lead Software Engineer" }
          ].map((member, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow-md"
              whileHover={{ scale: 1.03 }}
            >
              <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h4 className="font-semibold">{member.name}</h4>
              <p className="text-sm text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FINAL CTA */}
      <motion.div
        className="text-center bg-teal-600 text-white py-12 rounded-xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h3 className="text-2xl font-bold mb-4">
          Join the Future of Digital Healthcare
        </h3>
        <p className="mb-6">
          Experience secure, scalable and intelligent hospital management.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-white text-teal-600 px-6 py-3 rounded-md font-semibold"
        >
          Contact Us
        </motion.button>
      </motion.div>

    </div>
  );
};

export default AboutUs;

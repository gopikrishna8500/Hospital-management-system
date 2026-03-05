import React from "react";
import { motion } from "framer-motion";

const ServiceCard = ({ icon: Icon, title, text }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <Icon size={40} className="text-teal-600 mb-3" />
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 mt-2">{text}</p>
    </motion.div>
  );
};

export default ServiceCard;
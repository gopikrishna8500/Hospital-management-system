import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api";

const Departments = () => {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const res = await API.get("/departments");
      setDepartments(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      <section className="relative bg-linear-to-r from-teal-700 to-teal-500 text-white pt-12 pb-24">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Departments
          </motion.h1>

          <motion.p
            className="max-w-3xl mx-auto text-lg text-teal-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Explore our specialized medical departments providing expert care.
            We are transforming healthcare with intelligent digital solutions.
          </motion.p>

        </div>

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

      <div className="grid md:grid-cols-2 gap-8">

        {departments.map((dept) => (

          <div
            key={dept.id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
          >

            <h3 className="text-2xl font-semibold text-teal-600 mb-3">
              {dept.department_name}
            </h3>

            <p className="text-gray-600 mb-4">
              {dept.description}
            </p>

            <p className="text-sm text-gray-500">
              Head :
              <span className="font-medium">
                {" "}
                {dept.department_head}
              </span>
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Status :
              <span className="font-medium">
                {" "}
                {dept.status}
              </span>
            </p>

            <button
              onClick={() =>
                navigate(
                  `/departments/${encodeURIComponent(
                    dept.department_name.toLowerCase()
                  )}`
                )
              }
              className="mt-6 w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
            >
              View Details
            </button>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Departments;
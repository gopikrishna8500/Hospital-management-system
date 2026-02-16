import React, { useState } from "react";
import hospitalmanagementsystemLogo from "../assets/hospitalmanagementsystemLogo.jpg";
import { Phone, Mail, ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPatientOpen, setIsPatientOpen] = useState(false); 
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed w-full top-0 left-0 z-50 bg-teal-900 text-white shadow-md h-16 lg:h-20 transition-all duration-300">

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <div className="flex items-center space-x-0.5">
              <img
                src={hospitalmanagementsystemLogo}
                alt="hms"
                className="h-12 w-auto object-contain"
                style={{ maxWidth: "160px" }}
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">

              <Link
                to="/"
                className="font-bold text-white text-lg hover:text-teal-300 transition-colors"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="font-bold text-white text-lg hover:text-teal-300 transition-colors"
              >
                About Us
              </Link>

              <Link
                to="/about"
                className="font-bold text-white text-lg hover:text-teal-300 transition-colors"
              >
                Doctors
              </Link>

            {/* ================= Departments Dropdown ================= */}
              <div
                className="relative"
                onMouseEnter={() => setIsDepartmentsOpen(true)}
                onMouseLeave={() => setIsDepartmentsOpen(false)}
              >
                <button className="font-bold text-white text-lg hover:text-teal-300 transition-colors flex items-center space-x-1">
                  <span>Departments</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {isDepartmentsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-teal-800 text-white rounded-md shadow-lg py-2 z-50 border border-teal-700"
                    >
                      {[
                        "General Medicine","Cardiology","Neurology","Orthopedics",
                        "Pediatrics","Gynecology","Oncology","Emergency",
                        "Radiology","Pathology","Pharmacy","ICU"
                      ].map((dept) => (
                        <Link
                          key={dept}
                          to={`/departments/${dept.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block px-4 py-2 font-semibold hover:bg-teal-700 hover:text-teal-200 transition-colors"
                          onClick={() => setIsDepartmentsOpen(false)}
                        >
                          {dept}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>


                            {/* Patient Management Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsPatientOpen(true)}
                onMouseLeave={() => setIsPatientOpen(false)}
              >
                <button
                  type="button"
                  className="font-bold text-lg hover:text-teal-300 flex items-center space-x-1"
                  onClick={() => setIsPatientOpen(!isPatientOpen)}
                >
                  <span>Patient Management</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {isPatientOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-teal-800 rounded-md shadow-lg py-2 border border-teal-700"
                    >
                      <Link to="/jobSeeker" className="block px-4 py-2 hover:bg-teal-700" onClick={() => setIsPatientOpen(false)}>Patient Registration</Link>
                      <Link to="/employee" className="block px-4 py-2 hover:bg-teal-700" onClick={() => setIsPatientOpen(false)}>Patient Records</Link>
                      <Link to="/client" className="block px-4 py-2 hover:bg-teal-700" onClick={() => setIsPatientOpen(false)}>Admission & Discharge</Link>
                      <Link to="/client" className="block px-4 py-2 hover:bg-teal-700" onClick={() => setIsPatientOpen(false)}>Prescriptions & Medications</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button
                  type="button"
                  className="font-bold text-white text-lg hover:text-teal-300 transition-colors flex items-center space-x-1 focus:outline-none"
                  onClick={() => {
                    navigate("/services");
                    setIsServicesOpen(!isServicesOpen);
                  }}
                >
                  <span>Services</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-teal-800 text-white rounded-md shadow-lg py-2 z-50 border border-teal-700"
                    >
                      <Link
                        to="/jobSeeker"
                        className="block px-4 py-2 font-semibold hover:bg-teal-700 hover:text-teal-200 transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        Patient Registration
                      </Link>

                      <Link
                        to="/employee"
                        className="block px-4 py-2 font-semibold hover:bg-teal-700 hover:text-teal-200 transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                      >
                       Electronic Medical Records
                      </Link>

                      <Link
                        to="/client"
                        className="block px-4 py-2 font-semibold hover:bg-teal-700 hover:text-teal-200 transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                      >
                      Billing & Insurance
                      </Link>
                      <Link
                        to="/client"
                        className="block px-4 py-2 font-semibold hover:bg-teal-700 hover:text-teal-200 transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                      >
                      Pharmacy & Inventory
                      </Link>
                      <Link
                        to="/client"
                        className="block px-4 py-2 font-semibold hover:bg-teal-700 hover:text-teal-200 transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                      >
                    Laboratory Integration
                      </Link>

                    </motion.div>
                  )}
                </AnimatePresence>
            </div>

             

              <Link
                to="/contact-us"
                className="font-bold text-white text-lg hover:text-teal-300 transition-colors"
              >
                Contact Us
              </Link>

            </nav>

            {/* Contact Info */}
            <div className="hidden lg:flex items-center space-x-6">


              <button className="ml-6 bg-teal-600 hover:bg-teal-500 px-4 py-2 rounded-md text-sm flex items-center space-x-2 transition-colors font-bold text-white shadow-md">
                <Mail className="w-4 h-4" />
                <span>
                  <a href="mailto:info@aptitps.com">Appointment</a>
                </span>
              </button>

              <button className="ml-4 bg-white text-teal-900 hover:bg-teal-200 px-4 py-2 rounded-md text-sm flex items-center space-x-2 transition-colors font-bold shadow-md">
                <Mail className="w-4 h-4" />
                <span>
                  <a href="mailto:info@aptitps.com">Mail Us</a>
                </span>
              </button>

            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>

          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden bg-teal-800 py-4 shadow-inner"
              >
                <nav className="flex flex-col space-y-4 px-4">

                  <Link to="/" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                  <Link to="/about" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
                  <Link to="/about" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Doctors</Link>
<Link to="/services" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Departments</Link>

                  <div className="pl-4 flex flex-col space-y-1">
                    <Link to="/jobseeker" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>General Medicine</Link>
                    <Link to="/employee" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Cardiology</Link>
                    <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Neurology</Link>
                    <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Orthopedics</Link>
                    <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Pediatrics</Link>
                    {/* <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Client</Link> */}


                  </div>                                  
                  <Link to="/services" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Patient Management</Link>

                  <div className="pl-4 flex flex-col space-y-1">
                    <Link to="/jobseeker" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Patient Registration</Link>
                    <Link to="/employee" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Appointment Management</Link>
                    <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Patient Records</Link>
                    <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Admission & Discharge</Link>
                    <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Prescriptions & Medications</Link>
                    {/* <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Client</Link> */}


                  </div>
                  <Link to="/services" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>

                  <div className="pl-4 flex flex-col space-y-1">
                    <Link to="/jobseeker" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Patient Navigation</Link>
                    <Link to="/employee" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Electronic Medical Records</Link>
                    <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Billing & Insurance</Link>
                    <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Pharmacy & Inventory</Link>
                    <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Laboratory Integration</Link>
                    {/* <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Client</Link> */}


                  </div>

                  <Link to="/contact-us" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>

                </nav>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </header>
    </>
  );
};

export default Header;

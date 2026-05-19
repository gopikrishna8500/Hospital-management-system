import React, { useState, useEffect } from "react";
import hospitalmanagementsystemLogo from "../assets/hospitalmanagementsystemLogo.jpg";
import { Phone, Mail, ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom"; const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPatientOpen, setIsPatientOpen] = useState(false);
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const [mobileDeptOpen, setMobileDeptOpen] = useState(false);
  const [mobilePatientOpen, setMobilePatientOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const departments = [
    "General Medicine",
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Gynecology",
    "Oncology",
    "Emergency",
    "Radiology",
    "Pathology",
    "Pharmacy",
    "ICU",
  ];

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <div className="hidden lg:flex justify-between items-center bg-teal-950 text-gray-200 text-sm px-10 py-2">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Phone size={16} />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail size={16} />
            <span>info@hms.com</span>
          </div>
        </div>
        <div className="font-semibold text-red-400">
          24/7 Emergency Care Available
        </div>
      </div>

      {/* ================= MAIN HEADER ================= */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg" : "bg-white"
          }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">

            {/* LOGO */}
            <Link to="/">
              <img
                src={hospitalmanagementsystemLogo}
                alt="HMS Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* ================= DESKTOP NAV ================= */}
            <nav className="hidden lg:flex items-center space-x-8 font-semibold text-gray-700">

              <Link to="/" className={location.pathname === "/" ? "text-teal-600" : "hover:text-teal-600"}>
                Home
              </Link>

              <Link to="/about" className={location.pathname === "/about" ? "text-teal-600" : "hover:text-teal-600"}>
                About Us
              </Link>

              <Link to="/doctors" className={location.pathname === "/doctors" ? "text-teal-600" : "hover:text-teal-600"}>
                Doctors
              </Link>

              {/* Departments */}
              <div
                className="relative"
                onMouseEnter={() => setIsDepartmentsOpen(true)}
                onMouseLeave={() => setIsDepartmentsOpen(false)}
              >
                <Link to="/departments" className="flex items-center hover:text-teal-600">
                  Departments
                  <ChevronDown className={`ml-1 w-4 h-4 ${isDepartmentsOpen ? "rotate-180" : ""}`} />
                </Link>

                <AnimatePresence>
                  {isDepartmentsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-4 w-64 bg-white rounded-lg shadow-xl border"
                    >
                      {departments.map((dept) => (
                        <Link
                          key={dept}
                          to={`/departments/${dept.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block px-5 py-3 hover:bg-teal-50"
                          onClick={() => setIsDepartmentsOpen(false)}
                        >
                          {dept}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Patient Management */}
              {isLoggedIn && (
                <div
                  className="relative"
                  onMouseEnter={() => setIsPatientOpen(true)}
                  onMouseLeave={() => setIsPatientOpen(false)}
                >
                  <button className="flex items-center hover:text-teal-600">
                    Patient Management
                    <ChevronDown className={`ml-1 w-4 h-4 ${isPatientOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isPatientOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 mt-4 w-64 bg-white rounded-lg shadow-xl border"
                      >
                        <Link to="/patient-registration" className="block px-5 py-3 hover:bg-teal-50">
                          Patient Registration
                        </Link>

                        <Link to="/patient-records" className="block px-5 py-3 hover:bg-teal-50">
                          Patient Records
                        </Link>

                        {/* ✅ NEW LINKS ADDED HERE */}

                        <Link to="/admission" className="block px-5 py-3 hover:bg-teal-50">
                          New Admission
                        </Link>

                        <Link to="/admission-list" className="block px-5 py-3 hover:bg-teal-50">
                          Admission List
                        </Link>
                        <Link to="/discharge-form" className="block px-5 py-3 hover:bg-teal-50">
                          Patient Discharge
                        </Link>
                        <Link to="/discharge" className="block px-5 py-3 hover:bg-teal-50">
                          Discharge Details
                        </Link>
                        <Link to="/discharge-list" className="block px-5 py-3 hover:bg-teal-50">
                          Discharge List
                        </Link>

                        {/* <Link to="/prescriptions" className="block px-5 py-3 hover:bg-teal-50">
                          Prescriptions & Medications
                        </Link> */}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Services */}
              <div
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className="flex items-center hover:text-teal-600">
                  <Link to="/services" className="hover:text-teal-600">
                    Services
                  </Link>
                  <ChevronDown className={`ml-1 w-4 h-4 ${isServicesOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-4 w-64 bg-white rounded-lg shadow-xl border"
                    >
                      <Link to="/services/ambulance" className="block px-5 py-3 hover:bg-teal-50">
                        Emergency Ambulance
                      </Link>

                      <Link to="/services/pharmacy" className="block px-5 py-3 hover:bg-teal-50">
                        Pharmacy & Medicine Supply
                      </Link>

                      <Link to="/services/emr" className="block px-5 py-3 hover:bg-teal-50">
                        Digital Medical Records
                      </Link>

                      <Link to="/services/lab-tests" className="block px-5 py-3 hover:bg-teal-50">
                        Lab Test & Reports
                      </Link>

                      <Link to="/services/insurance" className="block px-5 py-3 hover:bg-teal-50">
                        Insurance & Billing
                      </Link>

                      <Link to="/services/support" className="block px-5 py-3 hover:bg-teal-50">
                        24/7 Patient Support
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/contact-us" className="hover:text-teal-600">
                Contact Us
              </Link>

              {!isLoggedIn ? (
                <Link to="/login" className="hover:text-teal-600">
                  Login
                </Link>
              ) : (
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                    window.location.reload();
                  }}
                  className="hover:text-red-500"
                >
                  Logout
                </button>
              )}
            </nav>

            {/* RIGHT BUTTONS */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                to="appointments/form"
                className="bg-linear-to-r from-teal-600 to-teal-700 text-white px-6 py-2.5 rounded-md shadow-lg transition hover:scale-105"
              >
                Book Appointment
              </Link>
              <a
                href="mailto:info@hms.com"
                className="border border-teal-600 text-teal-700 px-5 py-2 rounded-md font-semibold hover:bg-teal-50"
              >
                Mail Us
              </a>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
        {/* ================= MOBILE MENU ================= */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white shadow-xl px-6 py-6 absolute top-full left-0 w-full z-50"
            >
              <nav className="flex flex-col space-y-4 font-semibold text-gray-800">

                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>

                <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                  About Us
                </Link>

                <Link to="/doctors" onClick={() => setIsMobileMenuOpen(false)}>
                  Doctors
                </Link>

                {/* ================= DEPARTMENTS ================= */}
                <button
                  onClick={() => setMobileDeptOpen(!mobileDeptOpen)}
                  className="flex justify-between items-center"
                >
                  Departments
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${mobileDeptOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileDeptOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 flex flex-col space-y-2 text-gray-600"
                    >
                      {departments.map((dept) => (
                        <Link
                          key={dept}
                          to={`/departments/${dept.toLowerCase().replace(/\s+/g, "-")}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {dept}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {isLoggedIn && (
                  <>
                    {/* ================= PATIENT MANAGEMENT ================= */}
                    <button
                      onClick={() => setMobilePatientOpen(!mobilePatientOpen)}
                      className="flex justify-between items-center"
                    >
                      Patient Management
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${mobilePatientOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    <AnimatePresence>
                      {mobilePatientOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 flex flex-col space-y-2 text-gray-600"
                        >
                          <Link to="/patient-registration" onClick={() => setIsMobileMenuOpen(false)}>
                            Patient Registration
                          </Link>

                          <Link to="/patient-records" onClick={() => setIsMobileMenuOpen(false)}>
                            Patient Records
                          </Link>

                          <Link to="/admission" onClick={() => setIsMobileMenuOpen(false)}>
                            New Admission
                          </Link>

                          <Link to="/admission-listt" onClick={() => setIsMobileMenuOpen(false)}>
                            Admission List
                          </Link>
                          <Link to="/discharge-form" onClick={() => setIsMobileMenuOpen(false)}>
                            Patient Discharge
                          </Link>

                          <Link to="/discharge" onClick={() => setIsMobileMenuOpen(false)}>
                            Discharge Details
                          </Link>
                          <Link to="/discharge-list" onClick={() => setIsMobileMenuOpen(false)}>
                            Discharge List 
                          </Link>
                          {/* <Link to="/prescriptions" onClick={() => setIsMobileMenuOpen(false)}>
                            Prescriptions & Medications
                          </Link> */}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}

                {/* ================= SERVICES ================= */}
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex justify-between items-center"
                >
                  Services
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 flex flex-col space-y-2 text-gray-600"
                    >
                      <Link to="/services/ambulance" onClick={() => setIsMobileMenuOpen(false)}>
                        Emergency Ambulance
                      </Link>

                      <Link to="/services/pharmacy" onClick={() => setIsMobileMenuOpen(false)}>
                        Pharmacy & Medicine Supply
                      </Link>

                      <Link to="/services/emr" onClick={() => setIsMobileMenuOpen(false)}>
                        Digital Medical Records
                      </Link>

                      <Link to="/services/lab-tests" onClick={() => setIsMobileMenuOpen(false)}>
                        Lab Test & Reports
                      </Link>

                      <Link to="/services/insurance" onClick={() => setIsMobileMenuOpen(false)}>
                        Insurance & Billing
                      </Link>

                      <Link to="/services/support" onClick={() => setIsMobileMenuOpen(false)}>
                        24/7 Patient Support
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link to="/contact-us" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact Us
                </Link>

                {!isLoggedIn ? (
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    Login
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/");
                      window.location.reload();
                    }}
                    className="hover:text-red-500"
                  >
                    Logout
                  </button>
                )}

                <Link
                  to="/appointments/form"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-teal-600 text-white text-center py-2 rounded-md mt-4"
                >
                  Book Appointment
                </Link>

              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header >
    </>
  );
};

export default Header;
// import React, { useState } from "react";
// import hospitalmanagementsystemLogo from "../assets/hospitalmanagementsystemLogo.jpg";
// import { Phone, Mail, ChevronDown, Menu, X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";

// const Header = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isPatientOpen, setIsPatientOpen] = useState(false); 
//   const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
//   const [isServicesOpen, setIsServicesOpen] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <>
//       {/* Fixed Header */}
//       <header className="fixed w-full top-0 left-0 z-50 bg-teal-900 text-white shadow-md h-16 lg:h-20 transition-all duration-300">

//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between h-16 lg:h-20">

//             {/* Logo */}
//             <div className="flex items-center space-x-0.5">
//               <img
//                 src={hospitalmanagementsystemLogo}
//                 alt="hms"
//                 className="h-12 w-auto object-contain"
//                 style={{ maxWidth: "160px" }}
//               />
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex items-center space-x-8">

//               <Link
//                 to="/"
//                 className="font-bold text-white text-lg hover:text-teal-300 transition-colors"
//               >
//                 Home
//               </Link>

//               <Link
//                 to="/about"
//                 className="font-bold text-white text-lg hover:text-teal-300 transition-colors"
//               >
//                 About Us
//               </Link>

//               <Link
//                 to="/about"
//                 className="font-bold text-white text-lg hover:text-teal-300 transition-colors"
//               >
//                 Doctors
//               </Link>

//             {/* ================= Departments Dropdown ================= */}
//               <div
//                 className="relative"
//                 onMouseEnter={() => setIsDepartmentsOpen(true)}
//                 onMouseLeave={() => setIsDepartmentsOpen(false)}
//               >
//                 <button className="font-bold text-white text-lg hover:text-teal-300 transition-colors flex items-center space-x-1">
//                   <span>Departments</span>
//                   <ChevronDown className="w-4 h-4" />
//                 </button>

//                 <AnimatePresence>
//                   {isDepartmentsOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.2 }}
//                       className="absolute top-full left-0 mt-2 w-64 bg-teal-800 text-white rounded-md shadow-lg py-2 z-50 border border-teal-700"
//                     >
//                       {[
//                         "General Medicine","Cardiology","Neurology","Orthopedics",
//                         "Pediatrics","Gynecology","Oncology","Emergency",
//                         "Radiology","Pathology","Pharmacy","ICU"
//                       ].map((dept) => (
//                         <Link
//                           key={dept}
//                           to={`/departments/${dept.toLowerCase().replace(/\s+/g, "-")}`}
//                           className="block px-4 py-2 font-semibold hover:bg-teal-700 hover:text-teal-200 transition-colors"
//                           onClick={() => setIsDepartmentsOpen(false)}
//                         >
//                           {dept}
//                         </Link>
//                       ))}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>


//                             {/* Patient Management Dropdown */}
//               <div
//                 className="relative"
//                 onMouseEnter={() => setIsPatientOpen(true)}
//                 onMouseLeave={() => setIsPatientOpen(false)}
//               >
//                 <button
//                   type="button"
//                   className="font-bold text-lg hover:text-teal-300 flex items-center space-x-1"
//                   onClick={() => setIsPatientOpen(!isPatientOpen)}
//                 >
//                   <span>Patient Management</span>
//                   <ChevronDown className="w-4 h-4" />
//                 </button>

//                 <AnimatePresence>
//                   {isPatientOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.2 }}
//                       className="absolute top-full left-0 mt-2 w-64 bg-teal-800 rounded-md shadow-lg py-2 border border-teal-700"
//                     >
//                       <Link to="/jobSeeker" className="block px-4 py-2 hover:bg-teal-700" onClick={() => setIsPatientOpen(false)}>Patient Registration</Link>
//                       <Link to="/employee" className="block px-4 py-2 hover:bg-teal-700" onClick={() => setIsPatientOpen(false)}>Patient Records</Link>
//                       <Link to="/client" className="block px-4 py-2 hover:bg-teal-700" onClick={() => setIsPatientOpen(false)}>Admission & Discharge</Link>
//                       <Link to="/client" className="block px-4 py-2 hover:bg-teal-700" onClick={() => setIsPatientOpen(false)}>Prescriptions & Medications</Link>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* Services Dropdown */}
//               <div
//                 className="relative"
//                 onMouseEnter={() => setIsServicesOpen(true)}
//                 onMouseLeave={() => setIsServicesOpen(false)}
//               >
//                 <button
//                   type="button"
//                   className="font-bold text-white text-lg hover:text-teal-300 transition-colors flex items-center space-x-1 focus:outline-none"
//                   onClick={() => {
//                     navigate("/services");
//                     setIsServicesOpen(!isServicesOpen);
//                   }}
//                 >
//                   <span>Services</span>
//                   <ChevronDown className="w-4 h-4" />
//                 </button>

//                 <AnimatePresence>
//                   {isServicesOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.2 }}
//                       className="absolute top-full left-0 mt-2 w-64 bg-teal-800 text-white rounded-md shadow-lg py-2 z-50 border border-teal-700"
//                     >
//                       <Link
//                         to="/jobSeeker"
//                         className="block px-4 py-2 font-semibold hover:bg-teal-700 hover:text-teal-200 transition-colors"
//                         onClick={() => setIsServicesOpen(false)}
//                       >
//                         Patient Registration
//                       </Link>

//                       <Link
//                         to="/employee"
//                         className="block px-4 py-2 font-semibold hover:bg-teal-700 hover:text-teal-200 transition-colors"
//                         onClick={() => setIsServicesOpen(false)}
//                       >
//                        Electronic Medical Records
//                       </Link>

//                       <Link
//                         to="/client"
//                         className="block px-4 py-2 font-semibold hover:bg-teal-700 hover:text-teal-200 transition-colors"
//                         onClick={() => setIsServicesOpen(false)}
//                       >
//                       Billing & Insurance
//                       </Link>
//                       <Link
//                         to="/client"
//                         className="block px-4 py-2 font-semibold hover:bg-teal-700 hover:text-teal-200 transition-colors"
//                         onClick={() => setIsServicesOpen(false)}
//                       >
//                       Pharmacy & Inventory
//                       </Link>
//                       <Link
//                         to="/client"
//                         className="block px-4 py-2 font-semibold hover:bg-teal-700 hover:text-teal-200 transition-colors"
//                         onClick={() => setIsServicesOpen(false)}
//                       >
//                     Laboratory Integration
//                       </Link>

//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//             </div>



//               <Link
//                 to="/contact-us"
//                 className="font-bold text-white text-lg hover:text-teal-300 transition-colors"
//               >
//                 Contact Us
//               </Link>

//             </nav>

//             {/* Contact Info */}
//             <div className="hidden lg:flex items-center space-x-6">


//               <button className="ml-6 bg-teal-600 hover:bg-teal-500 px-4 py-2 rounded-md text-sm flex items-center space-x-2 transition-colors font-bold text-white shadow-md">
//                 <Mail className="w-4 h-4" />
//                 <span>
//                   <a href="mailto:info@aptitps.com">Appointment</a>
//                 </span>
//               </button>

//               <button className="ml-4 bg-white text-teal-900 hover:bg-teal-200 px-4 py-2 rounded-md text-sm flex items-center space-x-2 transition-colors font-bold shadow-md">
//                 <Mail className="w-4 h-4" />
//                 <span>
//                   <a href="mailto:info@aptitps.com">Mail Us</a>
//                 </span>
//               </button>

//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               className="lg:hidden"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             >
//               {isMobileMenuOpen ? (
//                 <X className="w-6 h-6 text-white" />
//               ) : (
//                 <Menu className="w-6 h-6 text-white" />
//               )}
//             </button>

//           </div>

//           {/* Mobile Menu */}
//           <AnimatePresence>
//             {isMobileMenuOpen && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.3 }}
//                 className="lg:hidden bg-teal-800 py-4 shadow-inner"
//               >
//                 <nav className="flex flex-col space-y-4 px-4">

//                   <Link to="/" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
//                   <Link to="/about" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
//                   <Link to="/about" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Doctors</Link>
// <Link to="/services" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Departments</Link>

//                   <div className="pl-4 flex flex-col space-y-1">
//                     <Link to="/jobseeker" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>General Medicine</Link>
//                     <Link to="/employee" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Cardiology</Link>
//                     <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Neurology</Link>
//                     <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Orthopedics</Link>
//                     <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Pediatrics</Link>
//                     {/* <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Client</Link> */}


//                   </div>                                  
//                   <Link to="/services" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Patient Management</Link>

//                   <div className="pl-4 flex flex-col space-y-1">
//                     <Link to="/jobseeker" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Patient Registration</Link>
//                     <Link to="/employee" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Appointment Management</Link>
//                     <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Patient Records</Link>
//                     <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Admission & Discharge</Link>
//                     <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Prescriptions & Medications</Link>
//                     {/* <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Client</Link> */}


//                   </div>
//                   <Link to="/services" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>

//                   <div className="pl-4 flex flex-col space-y-1">
//                     <Link to="/jobseeker" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Patient Navigation</Link>
//                     <Link to="/employee" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Electronic Medical Records</Link>
//                     <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Billing & Insurance</Link>
//                     <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Pharmacy & Inventory</Link>
//                     <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Laboratory Integration</Link>
//                     {/* <Link to="/client" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Client</Link> */}


//                   </div>

//                   <Link to="/contact-us" className="font-bold text-white text-lg hover:text-teal-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>

//                 </nav>
//               </motion.div>
//             )}
//           </AnimatePresence>

//         </div>
//       </header>
//     </>
//   );
// };

// export default Header;





// import React, { useState } from "react";
// import hospitalmanagementsystemLogo from "../assets/hospitalmanagementsystemLogo.jpg";
// import { Phone, Mail, ChevronDown, Menu, X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link } from "react-router-dom";

// const Header = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);

//   const departments = [
//     "General Medicine",
//     "Cardiology",
//     "Neurology",
//     "Orthopedics",
//     "Pediatrics",
//     "Gynecology",
//     "Oncology",
//     "Emergency Care",
//   ];

//   return (
//     <>
//       {/* ================= TOP INFO BAR ================= */}
//       <div className="hidden lg:flex justify-between items-center bg-teal-950 text-gray-200 text-sm px-10 py-2">
//         <div className="flex items-center space-x-6">
//           <div className="flex items-center space-x-2">
//             <Phone size={16} />
//             <span>+91 98765 43210</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Mail size={16} />
//             <span>info@hms.com</span>
//           </div>
//         </div>

//         <div className="font-semibold text-red-400">
//           24/7 Emergency Services Available
//         </div>
//       </div>

//       {/* ================= MAIN HEADER ================= */}
//       <header className="sticky top-0 z-50 bg-white shadow-md">
//         <div className="container mx-auto px-6">
//           <div className="flex items-center justify-between h-20">

//             {/* LOGO */}
//             <Link to="/" className="flex items-center">
//               <img
//                 src={hospitalmanagementsystemLogo}
//                 alt="Hospital Logo"
//                 className="h-12 w-auto object-contain"
//               />
//             </Link>

//             {/* DESKTOP NAVIGATION */}
//             <nav className="hidden lg:flex items-center space-x-8 font-semibold text-gray-700">

//               <Link to="/" className="hover:text-teal-600 transition">
//                 Home
//               </Link>

//               <Link to="/about" className="hover:text-teal-600 transition">
//                 About Us
//               </Link>

//               <Link to="/doctors" className="hover:text-teal-600 transition">
//                 Doctors
//               </Link>

//               {/* Departments Dropdown */}
//               <div
//                 className="relative"
//                 onMouseEnter={() => setIsDepartmentsOpen(true)}
//                 onMouseLeave={() => setIsDepartmentsOpen(false)}
//               >
//                 <button className="flex items-center hover:text-teal-600 transition">
//                   Departments <ChevronDown size={16} className="ml-1" />
//                 </button>

//                 <AnimatePresence>
//                   {isDepartmentsOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 10 }}
//                       transition={{ duration: 0.2 }}
//                       className="absolute left-0 mt-4 w-60 bg-white rounded-lg shadow-xl border"
//                     >
//                       {departments.map((dept) => (
//                         <Link
//                           key={dept}
//                           to={`/departments/${dept
//                             .toLowerCase()
//                             .replace(/\s+/g, "-")}`}
//                           className="block px-5 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition"
//                         >
//                           {dept}
//                         </Link>
//                       ))}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               <Link to="/services" className="hover:text-teal-600 transition">
//                 Services
//               </Link>

//               <Link to="/contact-us" className="hover:text-teal-600 transition">
//                 Contact
//               </Link>
//             </nav>

//             {/* RIGHT SIDE BUTTON */}
//             <div className="hidden lg:block">
//               <Link
//                 to="/appointment"
//                 className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-md shadow-md transition font-semibold"
//               >
//                 Book Appointment
//               </Link>
//             </div>

//             {/* MOBILE MENU BUTTON */}
//             <button
//               className="lg:hidden"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             >
//               {isMobileMenuOpen ? (
//                 <X size={26} />
//               ) : (
//                 <Menu size={26} />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* ================= MOBILE MENU ================= */}
//         <AnimatePresence>
//           {isMobileMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -15 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -15 }}
//               transition={{ duration: 0.3 }}
//               className="lg:hidden bg-white shadow-md"
//             >
//               <nav className="flex flex-col space-y-4 px-6 py-6 font-medium text-gray-700">
//                 <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
//                   Home
//                 </Link>
//                 <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
//                   About Us
//                 </Link>
//                 <Link to="/doctors" onClick={() => setIsMobileMenuOpen(false)}>
//                   Doctors
//                 </Link>
//                 <Link to="/services" onClick={() => setIsMobileMenuOpen(false)}>
//                   Services
//                 </Link>
//                 <Link
//                   to="/contact-us"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Contact
//                 </Link>

//                 <Link
//                   to="/appointment"
//                   className="bg-teal-600 text-white px-4 py-2 rounded-md text-center"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Book Appointment
//                 </Link>
//               </nav>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </header>
//     </>
//   );
// };

// export default Header;



// import React, { useState, useEffect } from "react";
// import hospitalmanagementsystemLogo from "../assets/hospitalmanagementsystemLogo.jpg";
// import { Phone, Mail, ChevronDown, Menu, X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link, useNavigate, useLocation } from "react-router-dom";

// const Header = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isPatientOpen, setIsPatientOpen] = useState(false);
//   const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
//   const [isServicesOpen, setIsServicesOpen] = useState(false);

//   // Mobile toggle states
//   const [mobileDeptOpen, setMobileDeptOpen] = useState(false);
//   const [mobilePatientOpen, setMobilePatientOpen] = useState(false);
//   const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

//   const location = useLocation();
//   const [isScrolled, setIsScrolled] = useState(false);

//   const navigate = useNavigate();

//   // Optional: scroll effect for sticky header
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       {/* ================= TOP BAR ================= */}
//       <div className="hidden lg:flex justify-between items-center bg-teal-950 text-gray-200 text-sm px-10 py-2">
//         <div className="flex items-center space-x-6">
//           <div className="flex items-center space-x-2">
//             <Phone size={16} />
//             <span>+91 98765 43210</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Mail size={16} />
//             <span>info@hms.com</span>
//           </div>
//         </div>
//         <div className="font-semibold text-red-400">
//           24/7 Emergency Care Available
//         </div>
//       </div>

//       {/* ================= MAIN HEADER ================= */}
//       <header
//         className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-md ${isScrolled ? "bg-white/95 shadow-lg h-16" : "bg-white h-20"
//           }`}
//       >
//         <div className="container mx-auto px-6">
//           <div className="flex items-center justify-between h-20">
//             {/* Logo */}
//             <div className="flex items-center">
//               <img
//                 src={hospitalmanagementsystemLogo}
//                 alt="HMS Logo"
//                 className="h-12 w-auto object-contain"
//               />
//             </div>

//             {/* ================= DESKTOP NAVIGATION ================= */}
//             <nav className="hidden lg:flex items-center space-x-8 font-semibold text-gray-700">
//               <Link to="/" className="hover:text-teal-600 transition">Home</Link>
//               <Link to="/about" className="hover:text-teal-600 transition">About Us</Link>
//               <Link to="/doctors" className="hover:text-teal-600 transition">Doctors</Link>

//               {/* Departments Dropdown */}
//               <div
//                 className="relative"
//                 onMouseEnter={() => setIsDepartmentsOpen(true)}
//                 onMouseLeave={() => setIsDepartmentsOpen(false)}
//               >
//                 <button className="flex items-center hover:text-teal-600 transition">
//                   Departments
//                   <ChevronDown
//                     className={`ml-1 w-4 h-4 transition-transform duration-300 ${isDepartmentsOpen ? "rotate-180" : ""
//                       }`}
//                   />
//                 </button>
//                 <AnimatePresence>
//                   {isDepartmentsOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 10 }}
//                       transition={{ duration: 0.25 }}
//                       className="absolute left-0 mt-4 w-64 bg-white rounded-lg shadow-xl border"
//                     >
//                       {[
//                         "General Medicine", "Cardiology", "Neurology", "Orthopedics",
//                         "Pediatrics", "Gynecology", "Oncology", "Emergency",
//                         "Radiology", "Pathology", "Pharmacy", "ICU"
//                       ].map((dept) => (
//                         <Link
//                           key={dept}
//                           to={`/departments/${dept.toLowerCase().replace(/\s+/g, "-")}`}
//                           className="block px-5 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition"
//                           onClick={() => setIsDepartmentsOpen(false)}
//                         >
//                           {dept}
//                         </Link>
//                       ))}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* Patient Management Dropdown */}
//               <div
//                 className="relative"
//                 onMouseEnter={() => setIsPatientOpen(true)}
//                 onMouseLeave={() => setIsPatientOpen(false)}
//               >
//                 <button className="flex items-center hover:text-teal-600 transition">
//                   Patient Management
//                   <ChevronDown
//                     className={`ml-1 w-4 h-4 transition-transform duration-300 ${isPatientOpen ? "rotate-180" : ""
//                       }`}
//                   />
//                 </button>
//                 <AnimatePresence>
//                   {isPatientOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 10 }}
//                       transition={{ duration: 0.25 }}
//                       className="absolute left-0 mt-4 w-64 bg-white rounded-lg shadow-xl border"
//                     >
//                       <Link to="/patient-registration" className="block px-5 py-3 hover:bg-teal-50">Patient Registration</Link>
//                       <Link to="/patient-records" className="block px-5 py-3 hover:bg-teal-50">Patient Records</Link>
//                       <Link to="/admission" className="block px-5 py-3 hover:bg-teal-50">Admission & Discharge</Link>
//                       <Link to="/prescriptions" className="block px-5 py-3 hover:bg-teal-50">Prescriptions & Medications</Link>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* Services Dropdown */}
//               <div
//                 className="relative"
//                 onMouseEnter={() => setIsServicesOpen(true)}
//                 onMouseLeave={() => setIsServicesOpen(false)}
//               >
//                 <button className="flex items-center hover:text-teal-600 transition">
//                   Services
//                   <ChevronDown
//                     className={`ml-1 w-4 h-4 transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""
//                       }`}
//                   />
//                 </button>
//                 <AnimatePresence>
//                   {isServicesOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 10 }}
//                       transition={{ duration: 0.25 }}
//                       className="absolute left-0 mt-4 w-64 bg-white rounded-lg shadow-xl border"
//                     >
//                       <Link to="/emr" className="block px-5 py-3 hover:bg-teal-50">Electronic Medical Records</Link>
//                       <Link to="/billing" className="block px-5 py-3 hover:bg-teal-50">Billing & Insurance</Link>
//                       <Link to="/pharmacy" className="block px-5 py-3 hover:bg-teal-50">Pharmacy & Inventory</Link>
//                       <Link to="/lab" className="block px-5 py-3 hover:bg-teal-50">Laboratory Integration</Link>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               <Link to="/contact-us" className="hover:text-teal-600 transition">Contact Us</Link>
//             </nav>

//             {/* ================= RIGHT SIDE BUTTONS ================= */}
//             <div className="hidden lg:flex items-center space-x-4">
//               <Link
//                 to="/appointment"
//                 className="bg-gradient-to-r from-teal-600 to-teal-700 hover:scale-105 active:scale-95 text-white px-6 py-2.5 rounded-md shadow-lg transition-all duration-300 font-semibold"
//               >
//                 Book Appointment
//               </Link>
//               <a
//                 href="mailto:info@hms.com"
//                 className="border border-teal-600 text-teal-700 hover:bg-teal-50 px-5 py-2 rounded-md font-semibold transition"
//               >
//                 Mail Us
//               </a>
//             </div>

//             {/* ================= MOBILE BUTTON ================= */}
//             <button
//               className="lg:hidden"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             >
//               {isMobileMenuOpen ? (
//                 <X className="w-6 h-6 text-gray-800" />
//               ) : (
//                 <Menu className="w-6 h-6 text-gray-800" />
//               )}
//             </button>
//           </div>

//           {/* ================= MOBILE MENU ================= */}
//           <AnimatePresence>
//             {isMobileMenuOpen && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.3 }}
//                 className="lg:hidden bg-gray-200 py-6 px-6 shadow-inner absolute top-full left-0 w-full z-50"
//               >
//                 <nav className="flex flex-col space-y-4">

//                   <Link to="/" className="font-bold text-gray-800 text-lg hover:text-teal-500"
//                     onClick={() => setIsMobileMenuOpen(false)}>Home</Link>

//                   <Link to="/about" className="font-bold text-gray-800 text-lg hover:text-teal-500"
//                     onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>

//                   {/* Departments */}
//                   <button
//                     onClick={() => setMobileDeptOpen(!mobileDeptOpen)}
//                     className="font-bold text-teal-900 text-lg text-left flex justify-between items-center"
//                   >
//                     Departments
//                     <ChevronDown
//                       className={`w-4 h-4 transition-transform duration-300 ${mobileDeptOpen ? "rotate-180" : ""
//                         }`}
//                     />
//                   </button>
//                   {mobileDeptOpen && (
//                     <div className="pl-4 flex flex-col space-y-2 text-gray-700">
//                       <Link to="/general-medicine" onClick={() => setIsMobileMenuOpen(false)}>General Medicine</Link>
//                       <Link to="/cardiology" onClick={() => setIsMobileMenuOpen(false)}>Cardiology</Link>
//                       <Link to="/neurology" onClick={() => setIsMobileMenuOpen(false)}>Neurology</Link>
//                       <Link to="/orthopedics" onClick={() => setIsMobileMenuOpen(false)}>Orthopedics</Link>
//                       <Link to="/gynecology" onClick={() => setIsMobileMenuOpen(false)}>Gynecology</Link>
//                       <Link to="/pharmacy" onClick={() => setIsMobileMenuOpen(false)}>Pharmacy</Link>
//                       <Link to="/pathology" onClick={() => setIsMobileMenuOpen(false)}>Pathology</Link>
//                       <Link to="/radiology" onClick={() => setIsMobileMenuOpen(false)}>Radiology</Link>
//                     </div>
//                   )}

//                   {/* Patient Management */}
//                   <button
//                     onClick={() => setMobilePatientOpen(!mobilePatientOpen)}
//                     className="font-bold text-teal-900 text-lg text-left flex justify-between items-center mt-4"
//                   >
//                     Patient Management
//                     <ChevronDown
//                       className={`w-4 h-4 transition-transform duration-300 ${mobilePatientOpen ? "rotate-180" : ""
//                         }`}
//                     />
//                   </button>
//                   {mobilePatientOpen && (
//                     <div className="pl-4 flex flex-col space-y-2 text-gray-700">
//                       <Link to="/patient-registration" onClick={() => setIsMobileMenuOpen(false)}>Patient Registration</Link>
//                       <Link to="/patient-records" onClick={() => setIsMobileMenuOpen(false)}>Patient Records</Link>
//                       <Link to="/admission" onClick={() => setIsMobileMenuOpen(false)}>Admission & Discharge</Link>
//                       <Link to="/prescriptions" onClick={() => setIsMobileMenuOpen(false)}>Prescriptions & Medication</Link>
//                     </div>
//                   )}

//                   {/* Services */}
//                   <button
//                     onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
//                     className="font-bold text-teal-900 text-lg text-left flex justify-between items-center mt-4"
//                   >
//                     Services
//                     <ChevronDown
//                       className={`w-4 h-4 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""
//                         }`}
//                     />
//                   </button>
//                   {mobileServicesOpen && (
//                     <div className="pl-4 flex flex-col space-y-2 text-gray-700">
//                       <Link to="/emr" onClick={() => setIsMobileMenuOpen(false)}>Electronic Medical Records</Link>
//                       <Link to="/billing" onClick={() => setIsMobileMenuOpen(false)}>Billing & Insurance</Link>
//                       <Link to="/pharmacy-inventory" onClick={() => setIsMobileMenuOpen(false)}>Pharmacy & Inventory</Link>
//                       <Link to="/lab" onClick={() => setIsMobileMenuOpen(false)}>Laboratory Integration</Link>
//                     </div>
//                   )}
//                   <Link to="/careers" className="font-bold text-gray-800 text-lg"
//                     onClick={() => setIsMobileMenuOpen(false)}>Careers</Link>

//                   <Link to="/contact-us" className="font-bold text-gray-800 text-lg"
//                     onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>

//                 </nav>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </header>
//     </>
//   );
// };

// export default Header;















import React, { useState, useEffect } from "react";
import hospitalmanagementsystemLogo from "../assets/hospitalmanagementsystemLogo.jpg";
import { Phone, Mail, ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPatientOpen, setIsPatientOpen] = useState(false);
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const [mobileDeptOpen, setMobileDeptOpen] = useState(false);
  const [mobilePatientOpen, setMobilePatientOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const location = useLocation();
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

                      <Link to="/discharge" className="block px-5 py-3 hover:bg-teal-50">
                        Patient Discharge
                      </Link>
                      <Link to="/discharge-list" className="block px-5 py-3 hover:bg-teal-50">
                        Discharge List
                      </Link>

                      <Link to="/prescriptions" className="block px-5 py-3 hover:bg-teal-50">
                        Prescriptions & Medications
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Services */}
              <div
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className="flex items-center hover:text-teal-600">
                  Services
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
                      <Link to="/emr" className="block px-5 py-3 hover:bg-teal-50">EMR</Link>
                      <Link to="/billing" className="block px-5 py-3 hover:bg-teal-50">Billing & Insurance</Link>
                      <Link to="/inventory" className="block px-5 py-3 hover:bg-teal-50">Inventory & Pharmacy</Link>
                      <Link to="/admin-dashboard" className="block px-5 py-3 hover:bg-teal-50">Admin Dashboard</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/contact-us" className="hover:text-teal-600">
                Contact Us
              </Link>

              <Link to="/login" className="hover:text-teal-600">
                Login
              </Link>
            </nav>

            {/* RIGHT BUTTONS */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                to="/doctors"
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

                <Link to="/">Home</Link>
                <Link to="/about">About Us</Link>
                <Link to="/doctors">Doctors</Link>

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
                          to={`/departments/${dept
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {dept}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

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
                      <Link to="/patient-registration">Patient Registration</Link>
                      <Link to="/patient-records">Patient Records</Link>

                      {/* ✅ NEW LINKS */}

                      <Link to="/admission">New Admission</Link>
                      <Link to="/admission-listt">Admission List</Link>
                      <Link to="/discharge/:id">Patient Discharge</Link>
                      <Link to="/discharge-list">Discharge List</Link>

                      <Link to="/prescriptions">Prescriptions & Medications</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                      <Link to="/emr">EMR</Link>
                      <Link to="/billing">Billing & Insurance</Link>
                      <Link to="/inventory">Inventory & Pharmacy</Link>
                      <Link to="/admin-dashboard">Admin Dashboard</Link>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link to="/contact-us">Contact Us</Link>
                <Link to="/login">Login</Link>

                <Link
                  to="/doctors"
                  className="bg-teal-600 text-white text-center py-2 rounded-md mt-4"
                >
                  Book Appointment
                </Link>

              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
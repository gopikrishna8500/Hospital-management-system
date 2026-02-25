import React from "react";
import {
  Mail,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleNewsletter = (e) => {
    e.preventDefault();
    navigate("/contact");
  };

  return (
    <>
      {/* Main Footer */}
      <footer className="bg-linear-to-br from-teal-950 via-teal-900 to-teal-800 text-gray-200 py-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* About MediTrack */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 border-b border-teal-700 pb-2">
              RunsEra MediTrack
            </h3>
            <p className="text-sm leading-relaxed text-gray-300">
              A secure and intelligent Hospital Management System designed to
              streamline patient tracking, medical records, billing, pharmacy,
              and hospital operations — all in one powerful platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 border-b border-teal-700 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About Hospital</Link></li>
              <li><Link to="/doctors" className="footer-link">Our Doctors</Link></li>
              <li><Link to="/departments" className="footer-link">Departments</Link></li>
              <li><Link to="/doctors" className="footer-link">Book Appointment</Link></li>
            </ul>
          </div>

          {/* Hospital Services */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 border-b border-teal-700 pb-2">
              Our Services
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="footer-link">Patient Registration</li>
              <li className="footer-link">Electronic Medical Records</li>
              <li className="footer-link">Billing & Insurance</li>
              <li className="footer-link">Pharmacy & Inventory</li>
              <li className="footer-link">Laboratory Integration</li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 border-b border-teal-700 pb-2">
              Contact & Updates
            </h3>

            <div className="space-y-3 text-sm mb-6">
              <p className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-teal-300" />
                123 Healthcare Avenue, Medical City
              </p>
              <p className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-teal-300" />
                +1 (800) 555-HEALTH
              </p>
              <p className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-teal-300" />
                support@runserameditrack.com
              </p>
            </div>

            <form onSubmit={handleNewsletter} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 bg-teal-900 border border-teal-700 rounded focus:outline-none focus:ring-1 focus:ring-teal-400 text-white"
              />
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-500 text-white py-2 rounded font-semibold transition"
              >
                Subscribe
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-teal-400 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-sky-400 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-pink-400 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-teal-500 transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Footer */}
      <div className="bg-teal-950 text-gray-400 py-6 border-t border-teal-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

          <div className="flex space-x-6 text-sm mb-3 md:mb-0">
            <Link to="/privacy-policy" className="hover:text-teal-300 transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-teal-300 transition">
              Terms & Conditions
            </Link>
            <Link to="/contact" className="hover:text-teal-300 transition">
              Contact
            </Link>
          </div>

          <div className="text-sm">
            © 2026 <span className="text-teal-400 font-semibold">RunsEra MediTrack</span>. 
            All Rights Reserved.
          </div>

        </div>
      </div>
    </>
  );
};

export default Footer;

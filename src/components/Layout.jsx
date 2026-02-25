import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Footer from "./Footer";

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-teal-600">
          RunsEra MediTrack
        </h1>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-6">
          <a href="/">Home</a>
          <a href="/doctors">Doctors</a>
          <a href="/appointments">Appointments</a>
          <a href="/contact">Contact</a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-md p-6 space-y-4">
          <a href="/" className="block">Home</a>
          <a href="/doctors" className="block">Doctors</a>
          <a href="/appointments" className="block">Appointments</a>
          <a href="/contact" className="block">Contact</a>
        </div>
      )}

      {/* Page Content */}
      <Outlet />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Layout;
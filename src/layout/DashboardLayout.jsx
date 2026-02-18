import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  CalendarCheck,
  LogOut,
  Menu,
  X,
  FileText,
  Bed,
  Receipt,
  Moon,
  Sun,
} from "lucide-react";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // Persist theme
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  // ✅ Role-Based Menu (ROUTES FIXED)
  let menuItems = [];

  if (role === "admin") {
    menuItems = [
      { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admin-dashboard" },
      { name: "Register Patient", icon: <UserPlus size={18} />, path: "/patient-registration" },
      { name: "Patient Records", icon: <Users size={18} />, path: "/patient-records" },
      { name: "Medical Reports", icon: <FileText size={18} />, path: "/reports" },
      { name: "Bed Management", icon: <Bed size={18} />, path: "/beds" },
      { name: "Appointments", icon: <CalendarCheck size={18} />, path: "/appointments" },
      { name: "Billing", icon: <Receipt size={18} />, path: "/billing" },
    ];
  }

  if (role === "doctor") {
    menuItems = [
      { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admin-dashboard" },
      { name: "Patient Records", icon: <Users size={18} />, path: "/patient-records" },
      { name: "Medical Reports", icon: <FileText size={18} />, path: "/reports" },
      { name: "Appointments", icon: <CalendarCheck size={18} />, path: "/appointments" },
    ];
  }

  if (role === "staff") {
    menuItems = [
      { name: "Register Patient", icon: <UserPlus size={18} />, path: "/patient-registration" },
      { name: "Patient Records", icon: <Users size={18} />, path: "/patient-records" },
      { name: "Appointments", icon: <CalendarCheck size={18} />, path: "/appointments" },
    ];
  }

  if (role === "patient") {
    menuItems = [
      { name: "Appointments", icon: <CalendarCheck size={18} />, path: "/appointments" },
    ];
  }

  return (
    <div
      className={`flex min-h-screen transition-all duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`bg-teal-900 text-white w-64 p-6 space-y-6 fixed md:relative h-full z-40 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h2 className="text-2xl font-bold tracking-wide">RunsEra MediTrack</h2>

        <nav className="space-y-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-teal-600 shadow-md"
                    : "hover:bg-teal-800"
                }`
              }
              onClick={() => setOpen(false)}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 mt-10 text-yellow-300 hover:text-yellow-400 transition"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 mt-4 text-red-300 hover:text-red-400 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:ml-64">

        {/* Mobile Top Bar */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <button
            onClick={() => setOpen(!open)}
            className="text-teal-800"
          >
            {open ? <X /> : <Menu />}
          </button>
          <h1 className="font-bold text-lg">MediTrack</h1>
        </div>

        {/* Page Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

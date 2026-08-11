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
  UserRound,
  Building2,
} from "lucide-react";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const navigate = useNavigate();

  // Get logged-in role
  const role = localStorage.getItem("role");

  // =========================
  // DARK MODE
  // =========================
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    // Remove login information
    localStorage.removeItem("auth");
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");

    // Optional: clear other login information if you use it
    localStorage.removeItem("token");

    // Close mobile sidebar
    setOpen(false);

    // Go back to login page
    navigate("/login", { replace: true });
  };

  // =========================
  // ROLE BASED MENU
  // =========================

  let menuItems = [];

  // =========================
  // ADMIN
  // =========================
  if (role === "admin") {
    menuItems = [
      {
        name: "Dashboard",
        icon: <LayoutDashboard size={18} />,
        path: "/admin-dashboard",
      },

      {
        name: "Register Patient",
        icon: <UserPlus size={18} />,
        path: "/patient-registration",
      },

      {
        name: "Patient Records",
        icon: <Users size={18} />,
        path: "/patient-records",
      },

      {
        name: "Medical Reports",
        icon: <FileText size={18} />,
        path: "/reports",
      },

      {
        name: "Doctors",
        icon: <UserRound size={18} />,
        path: "/admin-doctors",
      },

      {
        name: "Departments",
        icon: <Building2 size={18} />,
        path: "/admin-departments",
      },

      {
        name: "Bed Management",
        icon: <Bed size={18} />,
        path: "/beds",
      },

      {
        name: "Appointments",
        icon: <CalendarCheck size={18} />,
        path: "/appointments",
      },

      {
        name: "Billing",
        icon: <Receipt size={18} />,
        path: "/billing",
      },

      {
        name: "Invoices",
        icon: <Receipt size={18} />,
        path: "/billing-list",
      },
    ];
  }

  // =========================
  // DOCTOR
  // =========================
  if (role === "doctor") {
    menuItems = [
      {
        name: "Dashboard",
        icon: <LayoutDashboard size={18} />,
        path: "/doctor-dashboard",
      },

      {
        name: "Patient Records",
        icon: <Users size={18} />,
        path: "/patient-records",
      },

      {
        name: "Medical Reports",
        icon: <FileText size={18} />,
        path: "/reports",
      },

      {
        name: "Appointments",
        icon: <CalendarCheck size={18} />,
        path: "/appointments",
      },
    ];
  }

  // =========================
  // STAFF
  // =========================
  if (role === "staff") {
    menuItems = [
      {
        name: "Dashboard",
        icon: <LayoutDashboard size={18} />,
        path: "/staff-dashboard",
      },

      {
        name: "Register Patient",
        icon: <UserPlus size={18} />,
        path: "/patient-registration",
      },

      {
        name: "Patient Records",
        icon: <Users size={18} />,
        path: "/patient-records",
      },

      {
        name: "Appointments",
        icon: <CalendarCheck size={18} />,
        path: "/appointments",
      },

      {
        name: "Invoices",
        icon: <Receipt size={18} />,
        path: "/billing-list",
      },
    ];
  }

  // =========================
  // PATIENT
  // =========================
  if (role === "patient") {
    menuItems = [
      {
        name: "Appointments",
        icon: <CalendarCheck size={18} />,
        path: "/appointments",
      },
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
      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside
        className={`bg-teal-900 text-white w-64 p-6 space-y-6 fixed md:relative h-screen z-40 transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo / Title */}

        <h2 className="text-xl font-bold tracking-wide">
          IdealPathSoftware
          <br />
          Solutions MediTrack
        </h2>

        {/* ROLE */}

        <div className="bg-teal-800 rounded-lg p-3">
          <p className="text-xs text-teal-200">
            Logged in as
          </p>

          <p className="font-semibold capitalize">
            {role || "User"}
          </p>
        </div>

        {/* =====================================
            MENU
        ===================================== */}

        <nav className="space-y-2">
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

              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* =====================================
            DARK MODE
        ===================================== */}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 mt-8 text-yellow-300 hover:text-yellow-400 transition"
        >
          {darkMode ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}

          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {/* =====================================
            LOGOUT
        ===================================== */}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 mt-4 p-3 rounded-lg text-red-300 hover:bg-red-900 hover:text-red-100 transition"
        >
          <LogOut size={18} />

          <span>Logout</span>
        </button>
      </aside>

      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <main className="flex-1 min-w-0">
        {/* Mobile Top Bar */}

        <div className="md:hidden flex justify-between items-center p-4 bg-white shadow">
          <button
            onClick={() => setOpen(!open)}
            className="text-teal-800"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>

          <h1 className="font-bold text-lg">
            MediTrack
          </h1>
        </div>

        {/* Page Content */}

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
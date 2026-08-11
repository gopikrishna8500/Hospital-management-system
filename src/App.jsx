import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import FeatureSection from "./components/FeatureSection";
import CallToActionSection from "./components/CallToActionSection";
import DepartmentsServicesSection from "./components/DepartmentsServicesSection";
import StatsSection from "./components/StatsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import HowItWorksSection from "./components/HowItWorksSection";
import FAQSection from "./components/FAQSection";

import AppointmentForm from "./pages/AppointmentForm";
import Appointments from "./pages/Appointments";

import ScrollToTop from "./ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";

import LoginPage from "./pages/LoginPage";
import HeroSection from "./components/HeroSection";

import DoctorProfile from "./components/DoctorProfile";

import DashboardLayout from "./layout/DashboardLayout";

import AdminDashboard from "./pages/AdminDashboard";
import PatientRegistration from "./pages/PatientRegistration";
import PatientRecords from "./pages/PatientRecords";
import MedicalReports from "./pages/MedicalReports";

import SupportPage from "./pages/services/SupportPage";

import Discharge from "./pages/Discharge";
import DischargeForm from "./components/DischargeForm";
import DischargeList from "./pages/DischargeList";

import Admission from "./pages/Admission";
import AdmissionList from "./pages/AdmissionList";

import BedManagement from "./pages/BedManagement";
import Billing from "./pages/Billing";
import BillingList from "./pages/BillingList";

import AboutUsPage from "./pages/AboutUsPage";
import Doctors from "./pages/Doctors";
import Departments from "./pages/Departments";
import Appointment from "./pages/Appointment";

import ServicesPage from "./pages/ServicesPage";
import DepartmentDetails from "./pages/DepartmentDetails";
import ContactUsPage from "./components/ContactUsPage";

import AmbulancePage from "./pages/services/AmbulancePage";
import PharmacyPage from "./pages/services/PharmacyPage";
import EmrPage from "./pages/services/EmrPage";
import LabTestsPage from "./pages/services/LabTestsPage";
import InsurancePage from "./pages/services/InsurancePage";

import EmergencyBanner from "./components/EmergencyBanner";
import FloatingEmergency from "./components/FloatingEmergency";

import DoctorLogin from "./pages/DoctorLogin";
import StaffLogin from "./pages/StaffLogin";

import DoctorDashboard from "./pages/DoctorDashboard";
import StaffDashboard from "./pages/StaffDashboard";

import AdminDoctors from "./pages/AdminDoctors";
import AdminDepartments from "./pages/AdminDepartments";


/* =========================================================
   PRIVACY POLICY
========================================================= */

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Privacy Policy
      </h1>

      <p className="text-gray-700">
        This is the Privacy Policy page.
      </p>
    </div>
  );
};


/* =========================================================
   MAIN APP CONTENT
========================================================= */

function AppContent() {

  const location = useLocation();


  /* =========================================================
     DASHBOARD ROUTES
     
     These routes should NOT show:
     - Public Header
     - Public Footer
     - Emergency floating button
  ========================================================= */

  const dashboardRoutes = [
    "/admin-dashboard",
    "/doctor-dashboard",
    "/staff-dashboard",
    "/patient-registration",
    "/patient-records",
    "/reports",
    "/appointments",
    "/beds",
    "/billing",
    "/billing-list",
    "/admin-doctors",
    "/admin-departments",
  ];


  const isDashboard = dashboardRoutes.some((route) =>
    location.pathname.startsWith(route)
  );


  return (
    <>
      {/* =====================================================
          PUBLIC HEADER
          
          Hidden automatically inside dashboards
      ===================================================== */}

      {!isDashboard && <Header />}


      {/* =====================================================
          ROUTES
      ===================================================== */}

      <Routes>

        {/* =====================================================
            HOME
        ===================================================== */}

        <Route
          path="/"
          element={
            <>
              <EmergencyBanner />

              <HeroSection />

              <WhyChooseUsSection />

              <FeatureSection />

              <DepartmentsServicesSection />

              <HowItWorksSection />

              <StatsSection />

              <TestimonialsSection />

              <CallToActionSection />

              <FAQSection />
            </>
          }
        />


        {/* =====================================================
            PUBLIC APPOINTMENT
        ===================================================== */}

        <Route
          path="/appointments/form"
          element={<AppointmentForm />}
        />


        {/* =====================================================
            PUBLIC ROUTES
        ===================================================== */}

        <Route
          path="/contact-us"
          element={<ContactUsPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/about"
          element={<AboutUsPage />}
        />

        <Route
          path="/doctors"
          element={<Doctors />}
        />

        <Route
          path="/appointments-view"
          element={<Appointments />}
        />

        <Route
          path="/appointments/book/:id"
          element={<Appointment />}
        />

        <Route
          path="/departments"
          element={<Departments />}
        />

        <Route
          path="/doctors/:id"
          element={<DoctorProfile />}
        />

        <Route
          path="/admission"
          element={<Admission />}
        />

        <Route
          path="/admission-list"
          element={<AdmissionList />}
        />

        <Route
          path="/discharge/:id"
          element={<Discharge />}
        />

        <Route
          path="/discharge-list"
          element={<DischargeList />}
        />

        <Route
          path="/discharge-form"
          element={<DischargeForm />}
        />

        <Route
          path="/services"
          element={<ServicesPage />}
        />

        <Route
          path="/services/ambulance"
          element={<AmbulancePage />}
        />

        <Route
          path="/services/pharmacy"
          element={<PharmacyPage />}
        />

        <Route
          path="/services/emr"
          element={<EmrPage />}
        />

        <Route
          path="/services/lab-tests"
          element={<LabTestsPage />}
        />

        <Route
          path="/services/insurance"
          element={<InsurancePage />}
        />

        <Route
          path="/services/support"
          element={<SupportPage />}
        />

        <Route
          path="/departments/:departmentName"
          element={<DepartmentDetails />}
        />

        <Route
          path="/privacy-policy"
          element={<PrivacyPolicyPage />}
        />


        {/* =====================================================
            DOCTOR LOGIN
        ===================================================== */}

        <Route
          path="/doctor-login"
          element={<DoctorLogin />}
        />


        {/* =====================================================
            STAFF LOGIN
        ===================================================== */}

        <Route
          path="/staff-login"
          element={<StaffLogin />}
        />


        {/* =====================================================
            DOCTOR DASHBOARD
        ===================================================== */}

        <Route element={<DashboardLayout />}>
  <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
  <Route path="/staff-dashboard" element={<StaffDashboard />} />
</Route>


        {/* =====================================================
            ADMIN / HOSPITAL MANAGEMENT LAYOUT
        ===================================================== */}

        <Route element={<DashboardLayout />}>

          <Route
            path="/admin-dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/patient-registration"
            element={<PatientRegistration />}
          />

          <Route
            path="/patient-records"
            element={<PatientRecords />}
          />

          <Route
            path="/reports"
            element={<MedicalReports />}
          />

          <Route
            path="/appointments"
            element={<Appointments />}
          />

          <Route
            path="/beds"
            element={<BedManagement />}
          />

          <Route
            path="/billing"
            element={<Billing />}
          />

          <Route
            path="/billing-list"
            element={<BillingList />}
          />

          <Route
            path="/admin-doctors"
            element={<AdminDoctors />}
          />

          <Route
            path="/admin-departments"
            element={<AdminDepartments />}
          />

        </Route>

      </Routes>


      {/* =====================================================
          PUBLIC FOOTER + FLOATING BUTTONS
          
          Hidden from dashboard area
      ===================================================== */}

      {!isDashboard && (
        <>
          <FloatingEmergency />

          <ScrollToTopButton />

          <Footer />
        </>
      )}

    </>
  );
}


/* =========================================================
   APP
========================================================= */

function App() {

  return (
    <Router>

      <ScrollToTop />

      <AppContent />

    </Router>
  );
}


export default App;
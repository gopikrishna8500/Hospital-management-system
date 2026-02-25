import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import ScrollToTop from "./ScrollToTop";
import LoginPage from "./pages/LoginPage";
import HeroSection from "./components/HeroSection";
import DoctorProfile from "./components/DoctorProfile";
import DashboardLayout from "./layout/DashboardLayout";
import AdminDashboard from "./pages/AdminDashboard";
import PatientRegistration from "./pages/PatientRegistration";
import PatientRecords from "./pages/PatientRecords";
import MedicalReports from "./pages/MedicalReports";
import Appointments from "./pages/Appointments";
import BedManagement from "./pages/BedManagement";
import Billing from "./pages/Billing";
import AboutUsPage from "./pages/AboutUsPage";
import Doctors from "./pages/Doctors";
import Departments from "./pages/Departments";
// import ServicesSection from "./components/ServicesSection";
import DepartmentDetails from "./pages/DepartmentDetails";
import ContactUsPage from "./components/ContactUsPage";
// import Services from "./components/Services";
// import JobSeekerPage from "./components/JobSeekerPage";
// import EmployeePage from "./components/EmployeePage";
// import ClientPage from "./components/ClientPage";
// import CareersPage from "./components/CareersPage";

// import PortfolioPage from "./components/PortfolioPage";


const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-gray-700">
        This is the Privacy Policy page. You can replace this content with your actual privacy policy information.
      </p>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="">
        <Header />


        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <WhyChooseUsSection />
                <FeatureSection />
                <DepartmentsServicesSection />
                <HowItWorksSection />
                <StatsSection />
                <TestimonialsSection />
                <CallToActionSection />
                <FAQSection />





                {/*
                <AboutSection />
                <ServicesSection />
                <JobSection />
                <ClientLogos />
                <ContactSection />  */}
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="fixed bottom-8 right-8 w-12 h-12 bg-teal-900 hover:bg-teal-500 text-white rounded-lg shadow-lg flex items-center justify-center"
                >
                  ↑
                </button>

              </>
            }
          />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<DashboardLayout />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/patient-registration" element={<PatientRegistration />} />
            <Route path="/patient-records" element={<PatientRecords />} />
            <Route path="reports" element={<MedicalReports />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="beds" element={<BedManagement />} />
            <Route path="billing" element={<Billing />} />
          </Route>
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/doctors/:id" element={<DoctorProfile />} />

          <Route
            path="/departments/:departmentName"
            element={<DepartmentDetails />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

          {/* <Route path="/services" element={<Services />} /> */}

          {/* <Route path="/portfolio" element={<PortfolioPage />} />  */}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;


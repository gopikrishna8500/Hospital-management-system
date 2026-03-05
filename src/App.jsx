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
import Discharge from "./pages/Discharge";
import DischargeList from "./pages/DischargeList";
import Admission from "./pages/Admission";
import AdmissionList from "./pages/AdmissionList";
import BedManagement from "./pages/BedManagement";
import Billing from "./pages/Billing";
import AboutUsPage from "./pages/AboutUsPage";
import Doctors from "./pages/Doctors";
import Departments from "./pages/Departments";
import Appointment from "./pages/Appointment";
import Services from "./pages/Services";
import ServicesPage from "./pages/ServicesPage";
import DepartmentDetails from "./pages/DepartmentDetails";
import ContactUsPage from "./components/ContactUsPage";
import AmbulancePage from "./pages/services/AmbulancePage";
import PharmacyPage from "./pages/services/PharmacyPage";
import EmrPage from "./pages/services/EmrPage";
import LabTestsPage from "./pages/services/LabTestsPage";
import InsurancePage from "./pages/services/InsurancePage";
import SupportPage from "./pages/services/SupportPage";
import EmergencyBanner from "./components/EmergencyBanner";
import FloatingEmergency from "./components/FloatingEmergency";
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
                <EmergencyBanner />
                <HeroSection />
               
                <WhyChooseUsSection />
                <FeatureSection />
                <DepartmentsServicesSection />
                <HowItWorksSection />
                <StatsSection />
                <TestimonialsSection />
                <CallToActionSection />
                 <FloatingEmergency />
                <FAQSection />

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
          <Route path="/appointments/book/:id" element={<Appointment />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/doctors/:id" element={<DoctorProfile />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/admission-list" element={<AdmissionList />} />
          <Route path="/discharge/:id" element={<Discharge />} />
          <Route path="/discharge-list" element={<DischargeList />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/ambulance" element={<AmbulancePage />} />
          <Route path="/services/pharmacy" element={<PharmacyPage />} />
          <Route path="/services/emr" element={<EmrPage />} />
          <Route path="/services/lab-tests" element={<LabTestsPage />} />
          <Route path="/services/insurance" element={<InsurancePage />} />
          <Route path="/services/support" element={<SupportPage />} />
          <Route
            path="/departments/:departmentName"
            element={<DepartmentDetails />}
          />
          <Route path="/services" element={<Services />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;


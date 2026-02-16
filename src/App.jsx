import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./ScrollToTop";

import HeroSection from "./components/HeroSection";
// import ServicesSection from "./components/ServicesSection";
// import AboutSection from "./components/AboutSection";
// import JobSection from "./components/JobSection";
// import TestimonialSection from "./components/TestimonialSection";
// import ContactSection from "./components/ContactSection";
// import ClientLogos from "./components/ClientLogos";
// import AboutUsPage from "./components/AboutUsPage";
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
      <div className="">
        <Header />
        <ScrollToTop />
        
        <Routes>
          <Route
            path="/"
            element={
              <>
              <HeroSection />
                {/*
                <AboutSection />
                <ServicesSection />
                <JobSection />
                <TestimonialSection />
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
          {/* <Route path="/about" element={<AboutUsPage />} />
          
          <Route path="/services" element={<Services />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/jobSeeker" element={<JobSeekerPage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/client" element={<ClientPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} /> */}
          {/* <Route path="/portfolio" element={<PortfolioPage />} />  */}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

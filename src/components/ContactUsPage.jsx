import React, { useState } from "react";
import { Phone, Mail, Clock, MapPin, ArrowUp, Ambulance } from "lucide-react";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    department: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Request:", formData);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* 🚑 Emergency Banner */}
      <div className="bg-red-600 text-white text-center py-3 font-semibold">
        <Ambulance className="inline mr-2" size={18} />
        24/7 Emergency Services | Call: +1 (800) 911-0000
      </div>

      {/* Hero */}
      <div className="bg-teal-900 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Contact & Patient Services
        </h1>
        <p className="max-w-2xl mx-auto text-teal-200">
          Our care team is available to assist you with appointments,
          medical concerns, insurance inquiries, and patient support.
        </p>
      </div>

      {/* Main Contact Grid */}
      <div className="py-16 container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12">

          {/* Left Side Info */}
          <div className="space-y-10">

            {/* General Contact */}
            <div>
              <h2 className="text-2xl font-bold text-teal-900 mb-6">
                General Information
              </h2>

              <div className="space-y-4 text-gray-700">
                <p><Phone className="inline mr-2 text-teal-700" size={18}/> Main Reception: +1 (800) 555-0100</p>
                <p><Mail className="inline mr-2 text-teal-700" size={18}/> info@runserahospital.com</p>
                <p><MapPin className="inline mr-2 text-teal-700" size={18}/> 1200 Healthcare Blvd, New York, NY 10001</p>
              </div>
            </div>

            {/* Visiting Hours */}
            <div>
              <h2 className="text-2xl font-bold text-teal-900 mb-6">
                Visiting Hours
              </h2>

              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex justify-between py-2 border-b">
                  <span>Monday - Friday</span>
                  <span>8:00 AM – 8:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Saturday</span>
                  <span>9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Sunday</span>
                  <span>Emergency Only</span>
                </div>
              </div>
            </div>

            {/* Insurance & Billing */}
            <div>
              <h2 className="text-2xl font-bold text-teal-900 mb-6">
                Insurance & Billing Support
              </h2>

              <p className="text-gray-700 mb-3">
                For insurance verification, billing questions, or payment
                assistance, please contact:
              </p>

              <p className="text-gray-700">
                📞 +1 (800) 555-0200 <br/>
                ✉ billing@runserahospital.com
              </p>
            </div>

          </div>

          {/* Right Side Appointment Form */}
          <div>
            <h2 className="text-2xl font-bold text-teal-900 mb-6">
              Request an Appointment
            </h2>

            <form
              onSubmit={handleSubmit}
              className="bg-gray-50 p-8 rounded-xl shadow-md space-y-5"
            >
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-teal-600 outline-none"
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-teal-600 outline-none"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-teal-600 outline-none"
                required
              />

              <select
                name="department"
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-teal-600 outline-none"
                required
              >
                <option value="">Select Department</option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Orthopedics</option>
                <option>Pediatrics</option>
                <option>Emergency</option>
                <option>Radiology</option>
              </select>

              <textarea
                name="message"
                rows="4"
                placeholder="Describe your medical concern..."
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-teal-600 outline-none"
                required
              ></textarea>

              <button
                type="submit"
                className="w-full bg-teal-800 hover:bg-teal-600 text-white py-3 rounded-md font-semibold transition"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-teal-900 mb-8 text-center">
            Hospital Location
          </h2>

          <div className="rounded-xl overflow-hidden shadow-lg h-112.5">
            <iframe
              title="Hospital Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.943860165385!2d-73.9905936845928!3d40.74881797932744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af18b0b6bb%3A0x7f33d0b5b29d4d5b!2sNew%20York!5e0!3m2!1sen!2sus!4v1616587890123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen=""
              className="border-0"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Scroll Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-teal-800 hover:bg-teal-600 text-white rounded-full shadow-lg flex items-center justify-center transition"
      >
        <ArrowUp size={20} />
      </button>

    </div>
  );
};

export default ContactUsPage;

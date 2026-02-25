import React from "react";

const HowItWorksSection = () => {
  const steps = [
    "Register Patient & Create EMR",
    "Assign Doctor & Schedule Appointment",
    "Track Treatment & Diagnostics",
    "Generate Billing & Insurance Claims",
    "Analyze Reports & Hospital Insights",
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          How MediTrack Works
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A seamless workflow designed for efficient hospital management.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-center gap-6">
            <div className="text-2xl font-bold text-teal-600">
              {index + 1}
            </div>
            <div className="text-gray-700 font-medium">{step}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
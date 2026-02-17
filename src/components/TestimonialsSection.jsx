import React from "react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Dr. Arjun Mehta",
      role: "Chief Medical Officer",
      message:
        "MediTrack has transformed our hospital workflow. Patient tracking and EMR integration have significantly improved efficiency and data security.",
    },
    {
      name: "Ananya Sharma",
      role: "Hospital Administrator",
      message:
        "The billing, inventory, and reporting modules are seamless. It reduced manual errors and improved our operational transparency.",
    },
    {
      name: "Rahul Verma",
      role: "Senior Nurse",
      message:
        "The patient management system is intuitive and easy to use. It helps us focus more on care and less on paperwork.",
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          What Healthcare Professionals Say
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Hospitals and medical professionals trust MediTrack for secure,
          efficient, and scalable hospital management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition"
          >
            <p className="text-gray-600 mb-6 italic">
              "{testimonial.message}"
            </p>
            <h4 className="font-semibold text-gray-900">
              {testimonial.name}
            </h4>
            <p className="text-sm text-teal-600">
              {testimonial.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;

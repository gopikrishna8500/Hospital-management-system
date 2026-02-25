import React, { useState } from "react";

const FAQSection = () => {
  const faqs = [
    {
      question: "Is patient data secure?",
      answer: "Yes, MediTrack uses enterprise-grade encryption and secure cloud storage.",
    },
    {
      question: "Does it support insurance billing?",
      answer: "Yes, automated billing and insurance claim processing are integrated.",
    },
    {
      question: "Can small clinics use MediTrack?",
      answer: "Absolutely. It is scalable from small clinics to large hospitals.",
    },
  ];

  const [active, setActive] = useState(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        {faqs.map((faq, index) => (
          <div key={index} className="mb-6 border-b pb-4">
            <button
              className="w-full text-left font-semibold text-lg"
              onClick={() => setActive(active === index ? null : index)}
            >
              {faq.question}
            </button>
            {active === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
import React, { useEffect, useState } from "react";

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target.replace(/\D/g, ""));
    if (start === end) return;

    let duration = 2000;
    let increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count.toLocaleString()}+</span>;
};

const StatsSection = () => {
  const stats = [
    { value: "25000", label: "Patients Managed" },
    { value: "120", label: "Medical Staff" },
    { value: "350", label: "Beds & Wards" },
    { value: "10000", label: "Appointments Monthly" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl mx-auto px-6 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="p-8">
            <h3 className="text-4xl font-bold text-teal-600 mb-2">
              <Counter target={stat.value} />
            </h3>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
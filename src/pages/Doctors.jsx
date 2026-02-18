import React, { useState } from "react";
import DoctorCard, { doctorsData } from "./DoctorCard";

const Doctors = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const filteredDoctors = doctorsData.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter ? doc.specialization === filter : true)
  );

  const specializations = [...new Set(doctorsData.map((doc) => doc.specialization))];

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      {/* ...title and search/filter code... */}

      <div className="grid md:grid-cols-3 gap-8">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default Doctors;

import React, { useState } from "react";

const BedManagement = () => {
  const [beds, setBeds] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      occupied: false,
    }))
  );

  const toggleBed = (id) => {
    setBeds(
      beds.map((bed) =>
        bed.id === id ? { ...bed, occupied: !bed.occupied } : bed
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Bed Allocation</h2>

      <div className="grid grid-cols-4 gap-4">
        {beds.map((bed) => (
          <div
            key={bed.id}
            onClick={() => toggleBed(bed.id)}
            className={`p-4 text-center rounded-md cursor-pointer ${
              bed.occupied ? "bg-red-500 text-white" : "bg-green-500 text-white"
            }`}
          >
            Bed {bed.id}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BedManagement;

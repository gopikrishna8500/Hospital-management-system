import React from "react";

const AppointmentPopup = ({ open, setOpen }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white p-8 rounded-xl w-100">

        <h2 className="text-2xl font-bold mb-4">
          Book Appointment
        </h2>

        <input
          type="text"
          placeholder="Patient Name"
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          type="text"
          placeholder="Phone"
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          type="date"
          className="border p-2 w-full mb-3 rounded"
        />

        <button className="bg-teal-600 text-white w-full py-2 rounded">
          Submit
        </button>

        <button
          onClick={() => setOpen(false)}
          className="mt-3 text-gray-500 text-sm"
        >
          Close
        </button>

      </div>

    </div>
  );
};

export default AppointmentPopup;
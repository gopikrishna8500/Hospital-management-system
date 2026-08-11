import React, { useState } from "react";

const BedManagement = () => {
  const [beds, setBeds] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      bed_number: `B-${String(i + 1).padStart(3, "0")}`,
      ward: i < 5 ? "General Ward" : i < 10 ? "ICU" : "Private Ward",
      status: "Available",
      patient_name: "",
    }))
  );

  const [selectedBed, setSelectedBed] = useState(null);

  const [form, setForm] = useState({
    status: "Available",
    patient_name: "",
  });

  /* =========================
     OPEN UPDATE WINDOW
  ========================= */

  const openUpdate = (bed) => {
    setSelectedBed(bed);

    setForm({
      status: bed.status,
      patient_name: bed.patient_name || "",
    });
  };

  /* =========================
     FORM CHANGE
  ========================= */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
     UPDATE BED STATUS
  ========================= */

  const updateBed = () => {
    if (!selectedBed) return;

    if (
      form.status === "Occupied" &&
      form.patient_name.trim() === ""
    ) {
      alert("Please enter patient name for an occupied bed.");
      return;
    }

    setBeds((currentBeds) =>
      currentBeds.map((bed) =>
        bed.id === selectedBed.id
          ? {
              ...bed,
              status: form.status,
              patient_name:
                form.status === "Occupied"
                  ? form.patient_name
                  : "",
            }
          : bed
      )
    );

    setSelectedBed(null);

    alert("Bed status updated successfully.");
  };

  /* =========================
     STATUS COLORS
  ========================= */

  const getStatusStyle = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-700 border-green-300";

      case "Occupied":
        return "bg-red-100 text-red-700 border-red-300";

      case "Maintenance":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";

      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  /* =========================
     COUNTS
  ========================= */

  const availableBeds = beds.filter(
    (bed) => bed.status === "Available"
  ).length;

  const occupiedBeds = beds.filter(
    (bed) => bed.status === "Occupied"
  ).length;

  const maintenanceBeds = beds.filter(
    (bed) => bed.status === "Maintenance"
  ).length;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Bed Management
          </h2>

          <p className="text-gray-500 mt-1">
            Manage hospital bed availability and patient allocation.
          </p>
        </div>

      </div>

      {/* =========================
          SUMMARY
      ========================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        {/* Available */}

        <div className="bg-green-50 border border-green-200 rounded-xl p-5">

          <p className="text-sm text-green-600 font-medium">
            Available Beds
          </p>

          <h3 className="text-3xl font-bold text-green-700 mt-2">
            {availableBeds}
          </h3>

        </div>

        {/* Occupied */}

        <div className="bg-red-50 border border-red-200 rounded-xl p-5">

          <p className="text-sm text-red-600 font-medium">
            Occupied Beds
          </p>

          <h3 className="text-3xl font-bold text-red-700 mt-2">
            {occupiedBeds}
          </h3>

        </div>

        {/* Maintenance */}

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">

          <p className="text-sm text-yellow-600 font-medium">
            Maintenance
          </p>

          <h3 className="text-3xl font-bold text-yellow-700 mt-2">
            {maintenanceBeds}
          </h3>

        </div>

      </div>

      {/* =========================
          BED GRID
      ========================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

        {beds.map((bed) => (

          <div
            key={bed.id}
            className={`border rounded-xl p-5 transition hover:shadow-lg ${getStatusStyle(
              bed.status
            )}`}
          >

            {/* Bed Number */}

            <div className="flex justify-between items-center">

              <h3 className="text-lg font-bold">
                {bed.bed_number}
              </h3>

              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white">
                {bed.status}
              </span>

            </div>

            {/* Ward */}

            <p className="text-sm mt-3">
              <strong>Ward:</strong> {bed.ward}
            </p>

            {/* Patient */}

            {bed.status === "Occupied" && (
              <p className="text-sm mt-2">
                <strong>Patient:</strong>{" "}
                {bed.patient_name}
              </p>
            )}

            {/* Update Button */}

            <button
              onClick={() => openUpdate(bed)}
              className="mt-5 w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-medium transition"
            >
              Update Bed
            </button>

          </div>

        ))}

      </div>

      {/* =========================
          UPDATE BED MODAL
      ========================= */}

      {selectedBed && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Update Bed Status
            </h2>

            <p className="text-gray-500 mb-6">
              Bed:{" "}
              <strong>
                {selectedBed.bed_number}
              </strong>
            </p>

            {/* Status */}

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bed Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 mb-5 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >

              <option value="Available">
                Available
              </option>

              <option value="Occupied">
                Occupied
              </option>

              <option value="Maintenance">
                Maintenance
              </option>

            </select>

            {/* Patient Name */}

            {form.status === "Occupied" && (

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient Name
                </label>

                <input
                  type="text"
                  name="patient_name"
                  value={form.patient_name}
                  onChange={handleChange}
                  placeholder="Enter patient name"
                  className="w-full border border-gray-300 rounded-lg p-3 mb-5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />

              </div>

            )}

            {/* Buttons */}

            <div className="flex gap-3">

              <button
                onClick={updateBed}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold"
              >
                Update
              </button>

              <button
                onClick={() => setSelectedBed(null)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default BedManagement;
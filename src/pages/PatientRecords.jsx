import React, { useEffect, useState } from "react";
import axios from "axios";

const ITEMS_PER_PAGE = 5;

const PatientRecords = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const token = localStorage.getItem("token");

  /* =========================
     Fetch Patients From Backend
  ============================*/
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get(
        "https://hospital-management-system-4-kceq.onrender.com/api/patients",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPatients(res.data.data || []);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  /* =========================
     Delete Patient
  ============================*/
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://hospital-management-system-4-kceq.onrender.com/api/patients/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchPatients();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  /* =========================
     Search Filter
  ============================*/
  const filtered = patients.filter((p) =>
    `${p.first_name} ${p.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Patient Records</h2>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 rounded-md w-full md:w-1/3"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2">Name</th>
              <th className="p-2">Gender</th>
              <th className="p-2">DOB</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Email</th>
              <th className="p-2">Address</th>
              <th className="p-2">Blood Group</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-2">
                  {p.first_name} {p.last_name}
                </td>
                <td>{p.gender}</td>
                <td>
                  {new Date(p.date_of_birth).toLocaleDateString()}
                </td>
                <td>{p.phone}</td>
                <td>{p.email}</td>
                <td>{p.address}</td>
                <td>{p.blood_group}</td>

                <td>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="8" className="py-4 text-gray-500">
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex gap-2 mt-6 flex-wrap">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1
                ? "bg-teal-600 text-white"
                : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PatientRecords;
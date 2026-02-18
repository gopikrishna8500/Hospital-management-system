import React, { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 5;

const PatientRecords = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(data);
  }, []);

  const saveToStorage = (updated) => {
    setPatients(updated);
    localStorage.setItem("patients", JSON.stringify(updated));
  };

  const handleDelete = (index) => {
    const updated = patients.filter((_, i) => i !== index);
    saveToStorage(updated);
  };

  const handleEditSave = (index) => {
    const updated = [...patients];
    updated[index] = editData;
    saveToStorage(updated);
    setEditingIndex(null);
  };

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (departmentFilter ? p.department === departmentFilter : true)
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Patient Records</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 rounded-md"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="border p-2 rounded-md"
          value={departmentFilter}
          onChange={(e) => {
            setDepartmentFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Departments</option>
          <option>Cardiology</option>
          <option>Neurology</option>
          <option>Orthopedics</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full border-collapse text-center">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2">Photo</th>
            <th className="p-2">Name</th>
            <th className="p-2">Age</th>
            <th className="p-2">Gender</th>
            <th className="p-2">Department</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginated.map((p, index) => {
            const realIndex =
              (currentPage - 1) * ITEMS_PER_PAGE + index;

            return (
              <tr key={realIndex} className="border-b hover:bg-gray-50">
                {editingIndex === realIndex ? (
                  <>
                    <td className="p-2">
                      {p.photo && (
                        <img
                          src={p.photo}
                          alt=""
                          className="w-10 h-10 rounded-full mx-auto"
                        />
                      )}
                    </td>

                    <td className="p-2">
                      <input
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                        className="border p-1 rounded w-full"
                      />
                    </td>

                    <td className="p-2">
                      <input
                        value={editData.age}
                        onChange={(e) =>
                          setEditData({ ...editData, age: e.target.value })
                        }
                        className="border p-1 rounded w-full"
                      />
                    </td>

                    <td className="p-2">{p.gender}</td>
                    <td className="p-2">{p.department}</td>

                    <td className="p-2">
                      <button
                        onClick={() => handleEditSave(realIndex)}
                        className="text-green-600 mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="text-gray-500"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-2">
                      {p.photo && (
                        <img
                          src={p.photo}
                          alt=""
                          className="w-10 h-10 rounded-full mx-auto"
                        />
                      )}
                    </td>

                    <td className="p-2">{p.name}</td>
                    <td className="p-2">{p.age}</td>
                    <td className="p-2">{p.gender}</td>
                    <td className="p-2">{p.department}</td>

                    <td className="p-2">
                      <button
                        onClick={() => {
                          setEditingIndex(realIndex);
                          setEditData(p);
                        }}
                        className="text-blue-600 mr-3"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(realIndex)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex gap-2 mt-6">
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

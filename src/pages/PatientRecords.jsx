// import React, { useEffect, useState } from "react";

// const ITEMS_PER_PAGE = 5;

// const PatientRecords = () => {
//   const [patients, setPatients] = useState([]);
//   const [search, setSearch] = useState("");
//   const [departmentFilter, setDepartmentFilter] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editData, setEditData] = useState({});

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("patients")) || [];
//     setPatients(data);
//   }, []);

//   const saveToStorage = (updated) => {
//     setPatients(updated);
//     localStorage.setItem("patients", JSON.stringify(updated));
//   };

//   const handleDelete = (index) => {
//     const updated = patients.filter((_, i) => i !== index);
//     saveToStorage(updated);
//   };

//   const handleEditSave = (index) => {
//     const updated = [...patients];
//     updated[index] = editData;
//     saveToStorage(updated);
//     setEditingIndex(null);
//   };

//   const filtered = patients.filter((p) =>
//     p.name.toLowerCase().includes(search.toLowerCase()) &&
//     (departmentFilter ? p.department === departmentFilter : true)
//   );

//   const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

//   const paginated = filtered.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-6">Patient Records</h2>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search by name..."
//           className="border p-2 rounded-md"
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1);
//           }}
//         />

//         <select
//           className="border p-2 rounded-md"
//           value={departmentFilter}
//           onChange={(e) => {
//             setDepartmentFilter(e.target.value);
//             setCurrentPage(1);
//           }}
//         >
//           <option value="">All Departments</option>
//           <option>Cardiology</option>
//           <option>Neurology</option>
//           <option>Orthopedics</option>
//         </select>
//       </div>

//       {/* Table */}
//       <table className="w-full border-collapse text-center">
//         <thead>
//           <tr className="border-b bg-gray-100">
//             <th className="p-2">Photo</th>
//             <th className="p-2">Name</th>
//             <th className="p-2">Age</th>
//             <th className="p-2">Gender</th>
//             <th className="p-2">Department</th>
//             <th className="p-2">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {paginated.map((p, index) => {
//             const realIndex =
//               (currentPage - 1) * ITEMS_PER_PAGE + index;

//             return (
//               <tr key={realIndex} className="border-b hover:bg-gray-50">
//                 {editingIndex === realIndex ? (
//                   <>
//                     <td className="p-2">
//                       {p.photo && (
//                         <img
//                           src={p.photo}
//                           alt=""
//                           className="w-10 h-10 rounded-full mx-auto"
//                         />
//                       )}
//                     </td>

//                     <td className="p-2">
//                       <input
//                         value={editData.name}
//                         onChange={(e) =>
//                           setEditData({ ...editData, name: e.target.value })
//                         }
//                         className="border p-1 rounded w-full"
//                       />
//                     </td>

//                     <td className="p-2">
//                       <input
//                         value={editData.age}
//                         onChange={(e) =>
//                           setEditData({ ...editData, age: e.target.value })
//                         }
//                         className="border p-1 rounded w-full"
//                       />
//                     </td>

//                     <td className="p-2">{p.gender}</td>
//                     <td className="p-2">{p.department}</td>

//                     <td className="p-2">
//                       <button
//                         onClick={() => handleEditSave(realIndex)}
//                         className="text-green-600 mr-2"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setEditingIndex(null)}
//                         className="text-gray-500"
//                       >
//                         Cancel
//                       </button>
//                     </td>
//                   </>
//                 ) : (
//                   <>
//                     <td className="p-2">
//                       {p.photo && (
//                         <img
//                           src={p.photo}
//                           alt=""
//                           className="w-10 h-10 rounded-full mx-auto"
//                         />
//                       )}
//                     </td>

//                     <td className="p-2">{p.name}</td>
//                     <td className="p-2">{p.age}</td>
//                     <td className="p-2">{p.gender}</td>
//                     <td className="p-2">{p.department}</td>

//                     <td className="p-2">
//                       <button
//                         onClick={() => {
//                           setEditingIndex(realIndex);
//                           setEditData(p);
//                         }}
//                         className="text-blue-600 mr-3"
//                       >
//                         Edit
//                       </button>

//                       <button
//                         onClick={() => handleDelete(realIndex)}
//                         className="text-red-600"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </>
//                 )}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="flex gap-2 mt-6">
//         {[...Array(totalPages)].map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentPage(i + 1)}
//             className={`px-3 py-1 border rounded ${
//               currentPage === i + 1
//                 ? "bg-teal-600 text-white"
//                 : "bg-white"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PatientRecords;
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
        "http://localhost:5000/api/patients",
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
        `http://localhost:5000/api/patients/${id}`,
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
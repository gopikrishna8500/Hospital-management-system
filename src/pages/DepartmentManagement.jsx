import React, { useState } from "react";

const DepartmentManagement = () => {
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "Cardiology",
      head: "Dr. Ravi Kumar",
    },
    {
      id: 2,
      name: "Neurology",
      head: "Dr. Priya",
    },
  ]);

  const addDepartment = () => {
    if (!department.trim()) {
      alert("Enter Department Name");
      return;
    }

    const newDepartment = {
      id: Date.now(),
      name: department,
      head: "",
    };

    setDepartments([...departments, newDepartment]);
    setDepartment("");
  };

  const deleteDepartment = (id) => {
    setDepartments(departments.filter((d) => d.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-teal-700 mb-8">
          Department Management
        </h1>

        <div className="flex gap-4 mb-8">

          <input
            type="text"
            placeholder="Department Name"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="border rounded-lg p-3 w-full"
          />

          <button
            onClick={addDepartment}
            className="bg-teal-600 text-white px-6 rounded-lg hover:bg-teal-700"
          >
            Add
          </button>

        </div>

        <table className="w-full">

          <thead>

            <tr className="bg-teal-600 text-white">

              <th className="p-3">Department</th>

              <th>Head</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {departments.map((dept) => (

              <tr key={dept.id} className="border-b">

                <td className="p-3">{dept.name}</td>

                <td>{dept.head || "-"}</td>

                <td>

                  <button
                    onClick={() => deleteDepartment(dept.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default DepartmentManagement;
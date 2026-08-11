import React, { useEffect, useState } from "react";
import API from "../api";

const AdminDepartments = () => {
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    department_name: "",
    department_head: "",
    description: "",
  });

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const res = await API.get("/departments");
      setDepartments(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addDepartment = async () => {
    if (
      !form.department_name ||
      !form.department_head ||
      !form.description
    ) {
      return alert("Please fill all fields");
    }

    try {
      await API.post("/departments", form);

      alert("Department Added Successfully");

      setForm({
        department_name: "",
        department_head: "",
        description: "",
      });

      loadDepartments();
    } catch (err) {
      console.log(err);
    }
  };

  const changeStatus = async (dept) => {
    const status =
      dept.status === "Active"
        ? "Inactive"
        : "Active";

    try {
      await API.put(`/departments/${dept.id}`, {
        status,
      });

      loadDepartments();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteDepartment = async (id) => {
    if (!window.confirm("Delete Department?")) return;

    try {
      await API.delete(`/departments/${id}`);

      loadDepartments();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8">

      <h2 className="text-3xl font-bold text-teal-700 mb-8">
        Department Management
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <input
          className="input"
          placeholder="Department Name"
          name="department_name"
          value={form.department_name}
          onChange={handleChange}
        />

        <input
          className="input"
          placeholder="Department Head"
          name="department_head"
          value={form.department_head}
          onChange={handleChange}
        />

        <textarea
          className="input md:col-span-3"
          placeholder="Department Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

      </div>

      <button
        onClick={addDepartment}
        className="bg-teal-600 text-white px-6 py-3 rounded mt-6 hover:bg-teal-700"
      >
        Add Department
      </button>

      <table className="w-full mt-10">

        <thead className="bg-teal-600 text-white">

          <tr>

            <th className="p-3">Department</th>
            <th>Head</th>
            <th>Status</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {departments.map((dept) => (

            <tr key={dept.id} className="border-b">

              <td className="p-3">
                {dept.department_name}
              </td>

              <td>{dept.department_head}</td>

              <td>

                <span
                  className={`px-3 py-1 rounded text-white ${
                    dept.status === "Active"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {dept.status}
                </span>

              </td>

              <td>

                <button
                  onClick={() => changeStatus(dept)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Change Status
                </button>

                <button
                  onClick={() => deleteDepartment(dept.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default AdminDepartments;
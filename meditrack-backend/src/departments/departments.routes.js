const express = require("express");
const router = express.Router();
const pool = require("../../config/db");

// Get Departments
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM departments ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Add Department
router.post("/", async (req, res) => {
  try {
    const {
      department_name,
      department_head,
      description,
      status,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO departments
      (department_name,department_head,description,status)
      VALUES($1,$2,$3,$4)
      RETURNING *`,
      [
        department_name,
        department_head,
        description,
        status,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Update Department
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      department_name,
      department_head,
      description,
      status,
    } = req.body;

    const result = await pool.query(
      `UPDATE departments
      SET
      department_name=$1,
      department_head=$2,
      description=$3,
      status=$4
      WHERE id=$5
      RETURNING *`,
      [
        department_name,
        department_head,
        description,
        status,
        id,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Delete Department
router.delete("/:id", async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM departments WHERE id=$1",
      [req.params.id]
    );

    res.json({
      message: "Department Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
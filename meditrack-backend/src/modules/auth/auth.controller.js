// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const pool = require("../../config/db");

// /* =========================
//    REGISTER USER
// ========================= */
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if user already exists
//     const userExists = await pool.query(
//       "SELECT * FROM users WHERE email = $1",
//       [email]
//     );

//     if (userExists.rows.length > 0) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert user
//     const newUser = await pool.query(
//       `INSERT INTO users (name, email, password, role)
//        VALUES ($1, $2, $3, $4)
//        RETURNING id, name, email, role`,
//       [name, email, hashedPassword, role || "admin"]
//     );

//     res.status(201).json({
//       message: "User registered successfully",
//       user: newUser.rows[0],
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /* =========================
//    LOGIN USER
// ========================= */
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const userResult = await pool.query(
//       "SELECT * FROM users WHERE email = $1",
//       [email]
//     );

//     if (userResult.rows.length === 0) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const user = userResult.rows[0];

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT
//     const token = jwt.sign(
//       { id: user.id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../../config/db");

/* =========================
   REGISTER USER
========================= */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // CHECK USER
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // INSERT USER
    const result = await pool.query(
      `INSERT INTO users(name, email, password, role)
       VALUES($1, $2, $3, $4)
       RETURNING id, name, email, role`,
      [name, email, hashedPassword, role]
    );

    res.status(201).json({
      message: "Registration successful",
      user: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

/* =========================
   LOGIN USER
========================= */
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // FIND USER
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const user = result.rows[0];

    // PASSWORD CHECK
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // ROLE CHECK
    if (user.role !== role) {
      return res.status(403).json({
        message: `Access denied. You are registered as ${user.role}`,
      });
    }

    // GENERATE TOKEN
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
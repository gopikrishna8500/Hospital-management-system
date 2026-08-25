const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  ssl: {
    rejectUnauthorized: false,
  },

  // Keep the pool small for Render
  max: 10,

  // Close idle connections after 30 seconds
  idleTimeoutMillis: 30000,

  // Wait up to 10 seconds when acquiring a connection
  connectionTimeoutMillis: 10000,
});

/* =========================================
   POOL ERROR HANDLER
========================================= */

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL pool error ❌");
  console.error(err.message);
});

/* =========================================
   DATABASE CONNECTION TEST
========================================= */

const testDatabaseConnection = async () => {
  let client;

  try {
    client = await pool.connect();

    console.log("Connected to PostgreSQL ✅");

  } catch (error) {
    console.error("DB connection error ❌");
    console.error(error.message);

  } finally {
    if (client) {
      client.release();
    }
  }
};

testDatabaseConnection();

module.exports = pool;
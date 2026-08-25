const { Pool } = require("pg");

require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  ssl: {
    rejectUnauthorized: false,
  },

  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL pool error ❌");
  console.error(err.message);
});

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
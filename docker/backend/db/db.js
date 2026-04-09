const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false, // required for AWS RDS
  },
});

// Test connection
pool.connect()
  .then(client => {
    console.log("✅ Connected to AWS RDS (PostgreSQL)");
    client.release();
  })
  .catch(err => {
    console.error("❌ RDS connection failed:", err);
  });

module.exports = pool;
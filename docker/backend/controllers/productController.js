const pool = require("../db/db");

const getProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows); // IMPORTANT
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching products");
  }
};

module.exports = { getProducts };
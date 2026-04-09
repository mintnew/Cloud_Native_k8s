require('dotenv').config();

const express = require("express");
const cors = require("cors");
const productsRouter = require("./routes/products");

const app = express();
app.use(cors(
  app.use(cors({
  origin: "http://leoboy.shop" // Your frontend domain
}))));
app.use(express.json());

app.use("/api/products", productsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
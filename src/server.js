const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

const pinwheel = axios.create({
  baseURL: "https://api.pinwheelapi.com/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.PINWHEEL_API_SECRET}`,
  },
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

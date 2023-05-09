const express = require("express");
const axios = require("axios");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());


const pinwheel = axios.create({
  baseURL: "https://api.pinwheelapi.com/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.PINWHEEL_API_SECRET}`,
  },
});

app.post("/pinwheel/link_tokens", (req, res) => {
  try {
    const response = await pinwheel.post('link_tokens', {
      user: {
        client_user_id: req.body.client_user_id,
      },
      institution: req.body.institution,
      products: req.body.products,
    });
    res.json(response.data);
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to create link token!' });
  }
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

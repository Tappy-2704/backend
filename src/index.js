require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const routesAdmin = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(
  cors({
    origin: "*", // Hoặc chỉ định cụ thể ["http://localhost:3000", "https://yourdomain.com"]
    // methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    // credentials: true,
  })
);
app.use(cors());
app.use(express.json());
app.use("/api", routesAdmin);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

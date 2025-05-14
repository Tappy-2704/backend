require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const routesAdmin = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api", routesAdmin);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

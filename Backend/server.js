const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const resourceRoutes = require("./routes/resourceRoutes");
const reflectionRoutes = require("./routes/reflectionRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "MisandristMeesha backend is running."
    });
});

app.use("/api/resources", resourceRoutes);
app.use("/api/reflections", reflectionRoutes);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully.");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });
const express = require("express");
const Reflection = require("../models/Reflection");

const router = express.Router();

// Get all public reflections
router.get("/", async (req, res) => {
    try {
        const reflections = await Reflection.find({ isPublic: true })
            .sort({ createdAt: -1 });

        res.json(reflections);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch reflections."
        });
    }
});

// Get one public reflection
router.get("/:id", async (req, res) => {
    try {
        const reflection = await Reflection.findOne({
            _id: req.params.id,
            isPublic: true
        });

        if (!reflection) {
            return res.status(404).json({
                success: false,
                message: "Reflection not found."
            });
        }

        res.json(reflection);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid reflection ID."
        });
    }
});

// Create a reflection
router.post("/", async (req, res) => {
    try {
        const reflection = await Reflection.create(req.body);

        res.status(201).json(reflection);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create reflection.",
            error: error.message
        });
    }
});

// Delete a reflection
router.delete("/:id", async (req, res) => {
    try {
        const reflection = await Reflection.findByIdAndDelete(req.params.id);

        if (!reflection) {
            return res.status(404).json({
                success: false,
                message: "Reflection not found."
            });
        }

        res.json({
            success: true,
            message: "Reflection deleted successfully."
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid reflection ID."
        });
    }
});

module.exports = router;
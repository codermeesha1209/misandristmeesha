const express = require("express");
const Resource = require("../models/Resource");

const router = express.Router();

// Get all resources
router.get("/", async (req, res) => {
    try {
        const resources = await Resource.find().sort({ createdAt: -1 });
        res.json(resources);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch resources."
        });
    }
});

// Get one resource
router.get("/:id", async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: "Resource not found."
            });
        }

        res.json(resource);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid resource ID."
        });
    }
});

// Create a resource
router.post("/", async (req, res) => {
    try {
        const resource = await Resource.create(req.body);

        res.status(201).json(resource);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create resource.",
            error: error.message
        });
    }
});

// Delete a resource
router.delete("/:id", async (req, res) => {
    try {
        const resource = await Resource.findByIdAndDelete(req.params.id);

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: "Resource not found."
            });
        }

        res.json({
            success: true,
            message: "Resource deleted successfully."
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid resource ID."
        });
    }
});

module.exports = router;
const mongoose = require("mongoose");

const reflectionSchema = new mongoose.Schema(
    {
        prompt: {
            type: String,
            required: true,
            trim: true
        },
        response: {
            type: String,
            required: true,
            trim: true
        },
        isPublic: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Reflection", reflectionSchema);
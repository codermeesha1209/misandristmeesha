const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            enum: [
                "Feminist Theory",
                "Internalized Misogyny",
                "Patriarchy",
                "Feminist History",
                "Critical Thinking"
            ]
        },
        excerpt: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Resource", resourceSchema);
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // Serve uploaded images

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    }
});
const upload = multer({ storage });

// Handle Found Item Submission
app.post("/submit-found-item", upload.single("item-photo"), (req, res) => {
    const { "item-description": itemDescription } = req.body;
    const itemPhoto = req.file ? req.file.filename : null;

    if (!itemDescription) {
        return res.status(400).json({ message: "Item description is required" });
    }

    res.json({
        message: "SUBMITTED SUCCESSFULLY",
        itemDescription,
        itemPhoto: itemPhoto ? `/uploads/${itemPhoto}` : null,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`);
});

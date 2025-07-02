const express = require("express");
const router = express.Router();
const prisma = require("../models/prismaClient");

router.get("/", async (req, res) => {
try {
    const categories = await prisma.category.findMany();
    res.json(categories);
} catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
}
});

module.exports = router;
const express = require("express");
const prisma = require("../lib/prisma");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add Review
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { rideId, driverId, rating, review } = req.body;

        const newReview = await prisma.review.create({
            data: {
                rideId,
                passengerId: req.user.id,
                driverId,
                rating,
                review,
            },
        });

        res.status(201).json({
            message: "Review added successfully",
            review: newReview,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to add review",
            error: error.message,
        });
    }
});

// Get all reviews for a driver
router.get("/:driverId", async (req, res) => {
    try {
        const reviews = await prisma.review.findMany({
            where: {
                driverId: Number(req.params.driverId),
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        res.json({
            reviews,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch reviews",
        });
    }
});

module.exports = router;
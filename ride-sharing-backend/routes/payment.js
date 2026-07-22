
const express = require("express");
const prisma = require("../lib/prisma");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ================= PAY FOR RIDE =================
router.put("/:id/pay", authMiddleware, async (req, res) => {
    try {
        const rideId = Number(req.params.id);

        console.log("========== PAYMENT REQUEST ==========");
        console.log("Ride ID:", rideId);
        console.log("User:", req.user);

        // Find Ride
        const ride = await prisma.ride.findUnique({
            where: {
                id: rideId,
            },
        });

        console.log("Ride Found:", ride);

        if (!ride) {
            return res.status(404).json({
                message: "Ride not found",
            });
        }

        // Only passenger can pay
        if (ride.passengerId !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to pay for this ride",
            });
        }

        // Ride must be completed
        if (ride.status !== "COMPLETED") {
            return res.status(400).json({
                message: "Ride is not completed yet",
            });
        }

        // Already paid
        if (ride.paymentStatus === "PAID") {
            return res.status(400).json({
                message: "Ride already paid",
            });
        }

        // Update payment
        const updatedRide = await prisma.ride.update({
            where: {
                id: rideId,
            },
            data: {
                paymentStatus: "PAID",
                paymentId: "PAY-" + Date.now(),
            },
        });

        console.log("Payment Successful:", updatedRide);

        res.json({
            message: "Payment Successful",
            ride: updatedRide,
        });

    } catch (error) {
        console.error("========== PAYMENT ERROR ==========");
        console.error(error);

        res.status(500).json({
            message: "Payment Failed",
            error: error.message,
            stack: error.stack,
        });
    }
});

module.exports = router;
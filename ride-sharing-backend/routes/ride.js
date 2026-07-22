
const express = require("express");
const prisma = require("../lib/prisma");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


// ================= REQUEST RIDE =================
router.post(
  "/request",
  authMiddleware,
  roleMiddleware("PASSENGER"),
  async (req, res) => {
    try {
      const {
        pickup,
        destination,
        rideType,
        pickupLat,
        pickupLng,
        destinationLat,
        destinationLng,
        distance,
        duration,
        fare,
      } = req.body;

      const ride = await prisma.ride.create({
        data: {
          passengerId: req.user.id,

          pickupLat: Number(pickupLat),
          pickupLng: Number(pickupLng),

          destinationLat: Number(destinationLat),
          destinationLng: Number(destinationLng),

          distance: Number(distance),
          duration: Number(duration),
          fare: Number(fare),

          status: "PENDING",
        },
      });

      res.status(201).json({
        message: "Ride requested successfully",
        ride,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Ride request failed",
        error: error.message,
      });
    }
  }
);
// ================= MY RIDES =================
router.get(
  "/my-rides",
  authMiddleware,
  roleMiddleware("PASSENGER"),
  async (req, res) => {
    try {
      const rides = await prisma.ride.findMany({
        where: {
          passengerId: req.user.id,
        },
        include: {
          driver: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          id: "desc",
        },
      });

      res.json({
        rides,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to fetch rides",
        error: error.message,
      });
    }
  }
);

// ================= AVAILABLE RIDES =================
router.get(
  "/available",
  authMiddleware,
  roleMiddleware("DRIVER"),
  async (req, res) => {
    try {
      const rides = await prisma.ride.findMany({
        where: {
          OR: [
            { status: "PENDING" },
            { status: "ACCEPTED" },
            { status: "ONGOING" },
          ],
        },
        orderBy: {
          id: "desc",
        },
      });

      console.log("Available rides:", rides);

      res.json({
        rides,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to fetch available rides",
        error: error.message,
      });
    }
  }
);// ================= ACCEPT RIDE =================
router.put(
  "/:id/accept",
  authMiddleware,
  roleMiddleware("DRIVER"),
  async (req, res) => {
    try {
      const driver = await prisma.driver.findUnique({
        where: {
          userId: req.user.id,
        },
      });

      if (!driver) {
        return res.status(404).json({
          message: "Driver not found",
        });
      }

      const ride = await prisma.ride.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });

      if (!ride) {
        return res.status(404).json({
          message: "Ride not found",
        });
      }

      if (ride.status !== "PENDING") {
        return res.status(400).json({
          message: "Ride cannot be accepted",
        });
      }

      const updatedRide = await prisma.ride.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          driverId: driver.id,
          status: "ACCEPTED",
        },
      });

      res.json({
        message: "Ride Accepted Successfully!",
        ride: updatedRide,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to accept ride",
        error: error.message,
      });
    }
  }
);

// ================= START RIDE =================
router.put(
  "/:id/start",
  authMiddleware,
  roleMiddleware("DRIVER"),
  async (req, res) => {
    try {
      const ride = await prisma.ride.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });

      if (!ride) {
        return res.status(404).json({
          message: "Ride not found",
        });
      }

      if (ride.status !== "ACCEPTED") {
        return res.status(400).json({
          message: "Ride must be accepted first",
        });
      }

      const updatedRide = await prisma.ride.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          status: "ONGOING",
        },
      });

      res.json({
        message: "Ride Started Successfully!",
        ride: updatedRide,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to start ride",
        error: error.message,
      });
    }
  }
);

// ================= COMPLETE RIDE =================
router.put(
  "/:id/complete",
  authMiddleware,
  roleMiddleware("DRIVER"),
  async (req, res) => {
    try {
      const ride = await prisma.ride.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });

      if (!ride) {
        return res.status(404).json({
          message: "Ride not found",
        });
      }

      if (ride.status !== "ONGOING") {
        return res.status(400).json({
          message: "Ride must be ongoing",
        });
      }

      const updatedRide = await prisma.ride.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          status: "COMPLETED",
        },
      });

      res.json({
        message: "Ride Completed Successfully!",
        ride: updatedRide,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to complete ride",
        error: error.message,
      });
    }
  }
);// ================= PASSENGER RIDE HISTORY =================
router.get(
  "/history",
  authMiddleware,
  roleMiddleware("PASSENGER"),
  async (req, res) => {
    try {
      const rides = await prisma.ride.findMany({
        where: {
          passengerId: req.user.id,
          status: "COMPLETED",
        },
        orderBy: {
          id: "desc",
        },
      });

      res.json({
        rides,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to fetch passenger ride history",
        error: error.message,
      });
    }
  }
);

// ================= DRIVER RIDE HISTORY =================
router.get(
  "/driver-history",
  authMiddleware,
  roleMiddleware("DRIVER"),
  async (req, res) => {
    try {
      const driver = await prisma.driver.findUnique({
        where: {
          userId: req.user.id,
        },
      });

      if (!driver) {
        return res.status(404).json({
          message: "Driver not found",
        });
      }

      const rides = await prisma.ride.findMany({
        where: {
          driverId: driver.id,
          status: "COMPLETED",
        },
        orderBy: {
          id: "desc",
        },
      });

      res.json({
        rides,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to fetch driver ride history",
        error: error.message,
      });
    }
  }
);

module.exports = router;
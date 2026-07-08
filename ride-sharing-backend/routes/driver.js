
const express = require("express");
const prisma = require("../lib/prisma");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ================= REGISTER DRIVER =================
router.post("/register", authMiddleware, async (req, res) => {
  try {
    const { vehicleNo } = req.body;

    if (!vehicleNo) {
      return res.status(400).json({
        message: "Vehicle number is required",
      });
    }

    const existingDriver = await prisma.driver.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    if (existingDriver) {
      return res.status(400).json({
        message: "Driver already registered",
      });
    }

    const driver = await prisma.driver.create({
      data: {
        userId: req.user.id,
        vehicleNo,
        latitude: 0,
        longitude: 0,
        status: "OFFLINE",
      },
    });

    res.status(201).json({
      message: "Driver registered successfully",
      driver,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Driver registration failed",
      error: error.message,
    });
  }
});

// ================= DRIVER PROFILE =================
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const driver = await prisma.driver.findUnique({
      where: {
        userId: req.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }

    res.json({
      message: "Driver profile fetched successfully",
      driver,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch driver profile",
    });
  }
});

// ================= UPDATE LOCATION =================
router.put("/location", authMiddleware, async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const driver = await prisma.driver.update({
      where: {
        userId: req.user.id,
      },
      data: {
        latitude,
        longitude,
      },
    });

    res.json({
      message: "Location updated successfully",
      driver,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Location update failed",
    });
  }
});

// ================= UPDATE STATUS =================
router.put("/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const driver = await prisma.driver.update({
      where: {
        userId: req.user.id,
      },
      data: {
        status,
      },
    });

    res.json({
      message: "Status updated successfully",
      driver,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Status update failed",
    });
  }
});

// ================= GET ALL DRIVERS =================
router.get("/", async (req, res) => {
  try {
    const drivers = await prisma.driver.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json({
      message: "Drivers fetched successfully",
      drivers,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch drivers",
    });
  }
});

module.exports = router;
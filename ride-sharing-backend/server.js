

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const driverRoutes = require("./routes/driver");
const rideRoutes = require("./routes/ride");
const paymentRoutes = require("./routes/payment");
const reviewRoutes = require("./routes/review");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Ride Sharing API Running");
});

// Test Route
app.get("/hello", (req, res) => {
  res.json({
    message: "Hello from server",
  });
});

// Routes
app.use("/auth", authRoutes);
app.use("/driver", driverRoutes);
app.use("/ride", rideRoutes);
app.use("/payment", paymentRoutes);
app.use("/review", reviewRoutes);


// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const driverRoutes = require("./routes/driver");
const rideRoutes = require("./routes/ride");

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
    message: "Hello from server"
  });
});

// Routes
app.use("/auth", authRoutes);
app.use("/driver", driverRoutes);
app.use("/ride", rideRoutes);

// Start Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
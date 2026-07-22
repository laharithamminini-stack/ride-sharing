import DriverRideHistory from "./pages/DriverRideHistory";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import PassengerDashboard from "./pages/PassengerDashboard";
import RequestRide from "./pages/RequestRide";
import MyRides from "./pages/MyRides";
import RideHistory from "./pages/RideHistory";
import RideDetails from "./pages/RideDetails";
import DriverDashboard from "./pages/DriverDashboard";
import AvailableRides from "./pages/AvailableRides";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Passenger */}
        <Route path="/dashboard" element={<PassengerDashboard />} />
        <Route path="/request-ride" element={<RequestRide />} />
        <Route path="/my-rides" element={<MyRides />} />
        <Route path="/ride-history" element={<RideHistory />} />
        <Route
          path="/ride-details/:id"
          element={<RideDetails />}
        />
        {/* Driver */}
        <Route
          path="/driver-dashboard"
          element={<DriverDashboard />}
        />
        <Route
          path="/available-rides"
          element={<AvailableRides />}
        />
        <Route
          path="/driver-history"
          element={<DriverRideHistory />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
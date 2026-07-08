
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import { MapContainer, TileLayer } from "react-leaflet";

import LocationMarker from "../components/LocationMarker";
import RouteMap from "../components/RouteMap";

function RequestRide() {
  const navigate = useNavigate();

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [rideType, setRideType] = useState("Standard");

  const [pickupPosition, setPickupPosition] = useState(null);
  const [destinationPosition, setDestinationPosition] = useState(null);

  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);

  const calculateFare = () => {
    const km = Number(distance || 0);

    switch (rideType) {
      case "Premium":
        return (40 + km * 18).toFixed(2);

      case "SUV":
        return (60 + km * 22).toFixed(2);

      default:
        return (20 + km * 12).toFixed(2);
    }
  };

  const handleRequestRide = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/ride/request",
        {
          pickup,
          destination,
          rideType,

          pickupLat: pickupPosition?.[0] || 0,
          pickupLng: pickupPosition?.[1] || 0,

          destinationLat: destinationPosition?.[0] || 0,
          destinationLng: destinationPosition?.[1] || 0,

          distance,
          duration,
          fare: calculateFare(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Ride Request Failed"
      );
    }
  }; return (
    <div
      style={{
        width: "600px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <h1>🚖 Request Ride</h1>

      <input
        type="text"
        placeholder="Pickup Location"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
        }}
      />

      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
        }}
      />

      <select
        value={rideType}
        onChange={(e) => setRideType(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        <option>Standard</option>
        <option>Premium</option>
        <option>SUV</option>
      </select>

      <div style={{ marginBottom: "20px" }}>
        <MapContainer
          center={[17.385, 78.4867]}
          zoom={13}
          style={{
            height: "400px",
            width: "100%",
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LocationMarker
            pickupPosition={pickupPosition}
            setPickupPosition={setPickupPosition}
            destinationPosition={destinationPosition}
            setDestinationPosition={setDestinationPosition}
          />

          <RouteMap
            pickupPosition={pickupPosition}
            destinationPosition={destinationPosition}
            setDistance={setDistance}
            setDuration={setDuration}
          />
        </MapContainer>
      </div>      <h3>📍 Pickup Coordinates</h3>

      <p>
        <strong>Latitude:</strong>{" "}
        {pickupPosition ? pickupPosition[0].toFixed(6) : "Not Selected"}
      </p>

      <p>
        <strong>Longitude:</strong>{" "}
        {pickupPosition ? pickupPosition[1].toFixed(6) : "Not Selected"}
      </p>

      <hr />

      <h3>🏁 Destination Coordinates</h3>

      <p>
        <strong>Latitude:</strong>{" "}
        {destinationPosition
          ? destinationPosition[0].toFixed(6)
          : "Not Selected"}
      </p>

      <p>
        <strong>Longitude:</strong>{" "}
        {destinationPosition
          ? destinationPosition[1].toFixed(6)
          : "Not Selected"}
      </p>

      <hr />

      <h2>🚖 Ride Details</h2>

      <p>
        <strong>📏 Distance:</strong> {distance} km
      </p>

      <p>
        <strong>⏱️ Estimated Time:</strong> {duration} minutes
      </p>

      <p
        style={{
          fontSize: "22px",
          color: "green",
          fontWeight: "bold",
        }}
      >
        💰 Estimated Fare: ₹{calculateFare()}
      </p>

      <button
        onClick={handleRequestRide}
        style={{
          width: "100%",
          padding: "14px",
          fontSize: "18px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        🚖 Request Ride
      </button>
    </div>
  );
}

export default RequestRide;
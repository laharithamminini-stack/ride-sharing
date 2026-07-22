
import { useEffect, useRef, useState } from "react";
import api from "../services/api";
import socket from "../services/socket";

function AvailableRides() {
  const [rides, setRides] = useState([]);
  const watchId = useRef(null);

  useEffect(() => {
    fetchAvailableRides();

    socket.on("updateDriverLocation", (data) => {
      console.log("📍 Driver Location:", data);
    });

    return () => {
      socket.off("updateDriverLocation");

      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, []);

  const fetchAvailableRides = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/ride/available", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRides(response.data.rides);
    } catch (error) {
      console.log(error);
      alert("Failed to load available rides");
    }
  };

  const startLocationTracking = () => {
    const token = localStorage.getItem("token");

    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    watchId.current = navigator.geolocation.watchPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Send live location through Socket.IO
        socket.emit("driverLocation", {
          latitude,
          longitude,
        });

        // Save location in database
        try {
          await api.put(
            "/driver/location",
            {
              latitude,
              longitude,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (err) {
          console.log(err);
        }
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
      }
    );
  };

  const stopLocationTracking = () => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  };

  const acceptRide = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/ride/${id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Ride Accepted Successfully!");
      fetchAvailableRides();
    } catch (error) {
      console.log(error);
      alert("Failed to accept ride");
    }
  };

  const startRide = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/ride/${id}/start`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      startLocationTracking();

      alert("Ride Started Successfully!");

      fetchAvailableRides();
    } catch (error) {
      console.log(error);
      alert("Failed to start ride");
    }
  };

  const completeRide = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/ride/${id}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      stopLocationTracking();

      alert("Ride Completed Successfully!");

      fetchAvailableRides();
    } catch (error) {
      console.log(error);
      alert("Failed to complete ride");
    }
  };

  return (
    <div
      style={{
        width: "900px",
        margin: "40px auto",
        textAlign: "center",
      }}
    >
      <h1>🚖 Available Rides</h1>

      {rides.length === 0 ? (
        <h3>No rides available</h3>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Passenger</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {rides.map((ride) => (
              <tr key={ride.id}>
                <td>{ride.id}</td>
                <td>{ride.passengerId}</td>
                <td>{ride.status}</td>

                <td>
                  {ride.status === "PENDING" && (
                    <button onClick={() => acceptRide(ride.id)}>
                      Accept Ride
                    </button>
                  )}

                  {ride.status === "ACCEPTED" && (
                    <button onClick={() => startRide(ride.id)}>
                      Start Ride
                    </button>
                  )}

                  {ride.status === "ONGOING" && (
                    <button onClick={() => completeRide(ride.id)}>
                      Complete Ride
                    </button>
                  )}

                  {ride.status === "COMPLETED" && (
                    <button disabled>
                      Completed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AvailableRides;
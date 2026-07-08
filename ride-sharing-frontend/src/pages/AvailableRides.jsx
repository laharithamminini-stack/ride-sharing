
import { useEffect, useState } from "react";
import api from "../services/api";

function AvailableRides() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetchAvailableRides();
  }, []);

  const fetchAvailableRides = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/ride/available", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("API Response:", response.data);

      setRides(response.data.rides);
    } catch (error) {
      console.log(error);
      alert("Failed to load available rides");
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
      <h1>Available Rides</h1>

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
import { useEffect, useState } from "react";
import api from "../services/api";

function MyRides() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/ride/my-rides", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRides(response.data);
    } catch (error) {
      alert("Failed to load rides");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>My Rides</h1>

      {rides.length === 0 ? (
        <p>No rides found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Passenger ID</th>
            </tr>
          </thead>

          <tbody>
            {rides.map((ride) => (
              <tr key={ride.id}>
                <td>{ride.id}</td>
                <td>{ride.status}</td>
                <td>{ride.passengerId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyRides;
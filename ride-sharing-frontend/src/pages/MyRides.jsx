
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MyRides() {
  const [rides, setRides] = useState([]);
  const navigate = useNavigate();

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

      setRides(response.data.rides);
    } catch (error) {
      console.log(error);
      alert("Failed to load rides");
    }
  };

  return (
    <div
      style={{
        width: "1000px",
        margin: "40px auto",
        textAlign: "center",
      }}
    >
      <h1>🚖 My Rides</h1>

      {rides.length === 0 ? (
        <h3>No rides found.</h3>
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
              <th>Status</th>
              <th>Distance</th>
              <th>Duration</th>
              <th>Fare</th>
              <th>Driver</th>
              <th>Vehicle</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {rides.map((ride) => (
              <tr key={ride.id}>
                <td>{ride.id}</td>

                <td>{ride.status}</td>

                <td>
                  {ride.distance ? `${ride.distance} km` : "-"}
                </td>

                <td>
                  {ride.duration ? `${ride.duration} min` : "-"}
                </td>

                <td>
                  {ride.fare ? `₹${ride.fare}` : "-"}
                </td>

                <td>
                  {ride.driver?.user?.name || "Not Assigned"}
                </td>

                <td>
                  {ride.driver?.vehicleNo || "-"}
                </td>

                <td>
                  <button
                    onClick={() => navigate(`/ride-details/${ride.id}`)}
                    style={{
                      padding: "8px 15px",
                      cursor: "pointer",
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyRides;
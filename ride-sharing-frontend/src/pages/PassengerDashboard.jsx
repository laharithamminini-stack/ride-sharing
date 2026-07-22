
import { useNavigate } from "react-router-dom";

function PassengerDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div
      style={{
        width: "500px",
        margin: "50px auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <h1>🚖 Passenger Dashboard</h1>

      <hr />

      <button
        onClick={() => navigate("/request-ride")}
        style={{
          width: "250px",
          padding: "12px",
          marginBottom: "15px",
        }}
      >
        🚖 Request Ride
      </button>

      <br />

      <button
        onClick={() => navigate("/my-rides")}
        style={{
          width: "250px",
          padding: "12px",
          marginBottom: "15px",
        }}
      >
        📋 My Rides
      </button>

      <br />

      <button
        onClick={() => navigate("/ride-history")}
        style={{
          width: "250px",
          padding: "12px",
          marginBottom: "15px",
        }}
      >
        📜 Ride History
      </button>

      <br />

      <button
        onClick={() => navigate("/ride-details")}
        style={{
          width: "250px",
          padding: "12px",
          marginBottom: "15px",
        }}
      >
        🚖 Ride Details
      </button>

      <br />

      <button
        onClick={() => navigate("/profile")}
        style={{
          width: "250px",
          padding: "12px",
          marginBottom: "15px",
        }}
      >
        👤 Profile
      </button>

      <br />

      <button
        onClick={logout}
        style={{
          width: "250px",
          padding: "12px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}

export default PassengerDashboard;
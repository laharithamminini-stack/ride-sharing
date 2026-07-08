
import { useNavigate } from "react-router-dom";

function DriverDashboard() {
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
      <h1>🚖 Driver Dashboard</h1>

      <hr />

      <button
        onClick={() => navigate("/available-rides")}
        style={{
          width: "250px",
          padding: "12px",
          marginBottom: "15px",
        }}
      >
        📋 Available Rides
      </button>

      <br />

      <button
        onClick={() => navigate("/driver-history")}
        style={{
          width: "250px",
          padding: "12px",
          marginBottom: "15px",
        }}
      >
        📜 Driver Ride History
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
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default DriverDashboard;
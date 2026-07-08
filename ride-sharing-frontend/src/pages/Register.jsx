import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PASSENGER");

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registration Successful!");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "50px auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <h2>Ride Sharing Registration</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
        }}
      />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
        }}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
        }}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        <option value="PASSENGER">PASSENGER</option>
        <option value="DRIVER">DRIVER</option>
      </select>

      <button
        onClick={handleRegister}
        style={{
          width: "100%",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        Register
      </button>
    </div>
  );
}

export default Register;
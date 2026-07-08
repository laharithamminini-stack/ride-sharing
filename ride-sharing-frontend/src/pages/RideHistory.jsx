
import { useEffect, useState } from "react";
import api from "../services/api";

function RideHistory() {
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRideHistory();
    }, []);

    const fetchRideHistory = async () => {
        try {
            const token = localStorage.getItem("token");

            console.log("Token:", token);

            const response = await api.get("/ride/history", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("API Response:", response.data);

            setRides(response.data.rides || []);
        } catch (error) {
            console.log("========== ERROR ==========");
            console.log(error);

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Data:", error.response.data);

                alert(
                    error.response.data.message ||
                    "Failed to load ride history"
                );
            } else {
                alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div
                style={{
                    textAlign: "center",
                    marginTop: "50px",
                }}
            >
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <div
            style={{
                width: "1000px",
                margin: "40px auto",
                textAlign: "center",
            }}
        >
            <h1>📜 Ride History</h1>

            {rides.length === 0 ? (
                <h3>No completed rides found</h3>
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
                            <th>Ride ID</th>
                            <th>Passenger ID</th>
                            <th>Driver ID</th>
                            <th>Status</th>
                            <th>Pickup</th>
                            <th>Destination</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rides.map((ride) => (
                            <tr key={ride.id}>
                                <td>{ride.id}</td>
                                <td>{ride.passengerId}</td>
                                <td>{ride.driverId ?? "Not Assigned"}</td>
                                <td>{ride.status}</td>
                                <td>
                                    {ride.pickupLat}, {ride.pickupLng}
                                </td>
                                <td>
                                    {ride.destinationLat}, {ride.destinationLng}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default RideHistory;
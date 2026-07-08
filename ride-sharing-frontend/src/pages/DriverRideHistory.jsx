import { useEffect, useState } from "react";
import api from "../services/api";

function DriverRideHistory() {
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDriverHistory();
    }, []);

    const fetchDriverHistory = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/ride/driver-history", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data);

            setRides(response.data.rides);
        } catch (error) {
            console.log(error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Failed to load driver ride history");
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
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
            <h1>🚖 Driver Ride History</h1>

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

export default DriverRideHistory;
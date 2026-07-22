
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function RideDetails() {
    const [ride, setRide] = useState(null);
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState("");

    const { id } = useParams();

    useEffect(() => {
        fetchRide();
    }, []);

    const fetchRide = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/ride/my-rides", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const selectedRide = response.data.rides.find(
                (r) => r.id === Number(id)
            );

            setRide(selectedRide);
        } catch (error) {
            console.log(error);
            alert("Failed to load ride details");
        }
    };

    const payNow = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.put(
                `/payment/${ride.id}/pay`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(response.data.message);
            fetchRide();
        } catch (error) {
            console.log("Payment Error:", error.response?.data);
            alert(error.response?.data?.message || "Payment Failed");
        }
    };

    const submitReview = async () => {
        try {
            const token = localStorage.getItem("token");

            console.log({
                rideId: ride.id,
                driverId: ride.driverId,
                rating,
                review,
            });

            const response = await api.post(
                "/review",
                {
                    rideId: ride.id,
                    driverId: ride.driverId,
                    rating,
                    review,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(response.data.message);

            setReview("");
            setRating(5);
        } catch (error) {
            console.log("Review Error:", error.response?.data);
            console.log("Full Error:", error);

            alert(error.response?.data?.message || "Failed to submit review");
        }
    }; if (!ride) {
        return (
            <div
                style={{
                    textAlign: "center",
                    marginTop: "80px",
                }}
            >
                <h2>No Ride Found</h2>
            </div>
        );
    }

    return (
        <div
            style={{
                width: "650px",
                margin: "40px auto",
                padding: "30px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                background: "#f8f8f8",
            }}
        >
            <h1 style={{ textAlign: "center" }}>
                🚖 Ride Details
            </h1>

            <hr />

            <p><strong>🆔 Ride ID:</strong> {ride.id}</p>
            <p><strong>🚗 Status:</strong> {ride.status}</p>

            <p><strong>📍 Pickup Latitude:</strong> {ride.pickupLat}</p>
            <p><strong>📍 Pickup Longitude:</strong> {ride.pickupLng}</p>

            <p><strong>🏁 Destination Latitude:</strong> {ride.destinationLat}</p>
            <p><strong>🏁 Destination Longitude:</strong> {ride.destinationLng}</p>

            <hr />

            <p>
                <strong>📏 Distance:</strong>{" "}
                {ride.distance ? `${ride.distance} km` : "-"}
            </p>

            <p>
                <strong>⏱ Duration:</strong>{" "}
                {ride.duration ? `${ride.duration} min` : "-"}
            </p>

            <p>
                <strong>💰 Fare:</strong>{" "}
                {ride.fare ? `₹${ride.fare}` : "-"}
            </p>

            <hr />

            <p>
                <strong>👤 Driver:</strong>{" "}
                {ride.driver?.user?.name || "Not Assigned"}
            </p>

            <p>
                <strong>🚙 Vehicle:</strong>{" "}
                {ride.driver?.vehicleNo || "-"}
            </p>

            <hr />

            <p>
                <strong>💳 Payment Status:</strong>{" "}
                {ride.paymentStatus}
            </p>

            {ride.status === "COMPLETED" &&
                ride.paymentStatus !== "PAID" && (
                    <button
                        onClick={payNow}
                        style={{
                            width: "200px",
                            padding: "12px",
                            backgroundColor: "green",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        💳 Pay Now
                    </button>
                )}

            {ride.paymentStatus === "PAID" && (
                <>
                    <h3 style={{ color: "green" }}>
                        ✅ Payment Successful
                    </h3>

                    <hr />

                    <h2>⭐ Rate Your Driver</h2>

                    <label>Rating</label>
                    <br />

                    <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    >
                        <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                        <option value={4}>⭐⭐⭐⭐ (4)</option>
                        <option value={3}>⭐⭐⭐ (3)</option>
                        <option value={2}>⭐⭐ (2)</option>
                        <option value={1}>⭐ (1)</option>
                    </select>

                    <br />
                    <br />

                    <textarea
                        rows="5"
                        cols="50"
                        placeholder="Write your review..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />

                    <br />
                    <br />

                    <button
                        onClick={submitReview}
                        style={{
                            width: "220px",
                            padding: "12px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        ⭐ Submit Review
                    </button>
                </>
            )}
        </div>
    );
}

export default RideDetails;
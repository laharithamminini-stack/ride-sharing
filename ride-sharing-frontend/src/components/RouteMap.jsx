
import { useEffect, useState } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import socket from "../services/socket";

function RouteMap({
    pickupPosition,
    destinationPosition,
    setDistance,
    setDuration,
}) {
    const map = useMap();

    const [driverLocation, setDriverLocation] = useState(null);

    // Listen for live driver location
    useEffect(() => {
        socket.on("updateDriverLocation", (data) => {
            console.log("📍 Driver Location:", data);

            setDriverLocation([data.latitude, data.longitude]);
        });

        return () => {
            socket.off("updateDriverLocation");
        };
    }, []);

    // Draw route and calculate distance/time
    useEffect(() => {
        if (!pickupPosition || !destinationPosition) return;

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(pickupPosition[0], pickupPosition[1]),
                L.latLng(destinationPosition[0], destinationPosition[1]),
            ],
            routeWhileDragging: false,
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            show: false,
        }).addTo(map);

        routingControl.on("routesfound", (e) => {
            const route = e.routes[0];

            const distanceKm = (
                route.summary.totalDistance / 1000
            ).toFixed(2);

            const durationMin = Math.ceil(
                route.summary.totalTime / 60
            );

            setDistance(distanceKm);
            setDuration(durationMin);
        });

        return () => {
            map.removeControl(routingControl);
        };
    }, [
        pickupPosition,
        destinationPosition,
        map,
        setDistance,
        setDuration,
    ]);

    return (
        <>
            {driverLocation && (
                <Marker position={driverLocation}>
                    <Popup>🚗 Driver Live Location</Popup>
                </Marker>
            )}
        </>
    );
}

export default RouteMap;
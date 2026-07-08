
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

function RouteMap({
    pickupPosition,
    destinationPosition,
    setDistance,
    setDuration,
}) {
    const map = useMap();

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

        routingControl.on("routesfound", function (e) {
            const route = e.routes[0];

            // Distance in km
            const distanceKm = (route.summary.totalDistance / 1000).toFixed(2);

            // Time in minutes
            const durationMin = Math.ceil(route.summary.totalTime / 60);

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

    return null;
}

export default RouteMap;
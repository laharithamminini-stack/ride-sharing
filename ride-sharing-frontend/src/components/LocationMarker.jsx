import { Marker, Popup, useMapEvents } from "react-leaflet";

function LocationMarker({
    pickupPosition,
    setPickupPosition,
    destinationPosition,
    setDestinationPosition,
}) {
    useMapEvents({
        click(e) {
            if (!pickupPosition) {
                setPickupPosition([e.latlng.lat, e.latlng.lng]);
            } else if (!destinationPosition) {
                setDestinationPosition([e.latlng.lat, e.latlng.lng]);
            }
        },
    });

    return (
        <>
            {pickupPosition && (
                <Marker position={pickupPosition}>
                    <Popup>📍 Pickup Location</Popup>
                </Marker>
            )}

            {destinationPosition && (
                <Marker position={destinationPosition}>
                    <Popup>🏁 Destination</Popup>
                </Marker>
            )}
        </>
    );
}

export default LocationMarker;
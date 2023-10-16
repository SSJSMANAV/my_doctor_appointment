import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const LocationDetails = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(15);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        setUserLocation({ lat: userLat, lng: userLng });
      });
    }
  }, []);

  // Define a default center (e.g., a location in the city center)
  const defaultCenter = {
    lat: 40.7128, // Default latitude (New York, for example)
    lng: -74.0060, // Default longitude
  };

  const handleMarkerClick = () => {
    setZoomLevel(17); // Adjust the desired zoom level
  };

  // Calculate the marker position relative to the map
  const markerPosition = {
    lat: userLocation ? userLocation.lat : defaultCenter.lat,
    lng: userLocation ? userLocation.lng : defaultCenter.lng,
  };

  return (
    <div style={{ height: "70vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBuM5vSQxrCsjTNcX1CTInG3CU0feIL9L0" }}
        defaultCenter={userLocation ? userLocation : defaultCenter}
        defaultZoom={zoomLevel}
      >
        <MarkerComponent
          lat={markerPosition.lat}
          lng={markerPosition.lng}
          onClick={handleMarkerClick}
        />
      </GoogleMapReact>
    </div>
  );
};

const MarkerComponent = ({ onClick }) => (
  <div
    style={{
      color: "red",
      fontWeight: "bold",
      fontSize: "16px",
      // background: "white",
      padding: "8px",
      borderRadius: "4px",
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faLocationDot} className="text-3xl"></FontAwesomeIcon>
  </div>
);

export default LocationDetails;




import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GoogleMap, Marker } from "@react-google-maps/api";
const containerStyle = {
  width: "100%",
  height: "100vh",
};

const LocationDetails = () => {
  // const location = useLocation();
  // const locationData = location.state;
  const [currentLocation, setCurrentLocation] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lng: longitude });
        setCurrentLocation({ lat: latitude, lng: longitude });
        setMapLoaded(true);
        console.log(currentLocation === null);
      });
    }
  }, [currentLocation]);

  return (
    <div style={{ height: "70vh", width: "100%" }}>
      {mapLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {currentLocation !== null && <Marker position={currentLocation} />}
          {<Marker position={center}/>}
        </GoogleMap>
      )}
    </div>
  );
};

export default LocationDetails;

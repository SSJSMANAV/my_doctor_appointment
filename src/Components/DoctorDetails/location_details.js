import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GoogleMap, Marker } from "@react-google-maps/api";
const containerStyle = {
  width: "100%",
  height: "100vh",
};

const LocationDetails = ({location}) => {
  console.log('location');
  console.log(location);
  console.log('here');
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
  }, []);

  return (
    <div className="sm:w-full sm:h-full sm:mb-12">
      {mapLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {currentLocation !== null && <Marker position={currentLocation} />}
          {<Marker position={center} />}
        </GoogleMap>
      )}
    </div>
  );
};

export default LocationDetails;

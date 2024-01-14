import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";

import { GoogleMap, Marker } from "@react-google-maps/api";
const containerStyle = {
  width: "100%",
  height: "100vh",
};

const LocationDetails = ({ location }) => {
  // console.log("location");
  // console.log(location);
  // console.log("here");
  // const location = useLocation();
  // const locationData = location.state;
  // const [currentLocation, setCurrentLocation] = useState(null);
  // const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [mapLoaded, setMapLoaded] = useState(false);
  const [doctorData] = useOutletContext();
  const currentLocation = {
    lat: doctorData.location.latitude,
    lng: doctorData.location.longitude,
  };
  const center = {
    lat: doctorData.location.latitude,
    lng: doctorData.location.longitude,
  };

  useEffect(() => {
    
    
    setMapLoaded(true);
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAQJQLycBvTM9-X1QGIzhKJxZ5eIuHtqN0">
    <div className="sm:w-full sm:h-full sm:mb-12">
      {mapLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {currentLocation !== null && <Marker position={currentLocation} />}
          {<Marker position={center} />}
        </GoogleMap>
      )}
    </div>
    </LoadScript>

  );
};

export default LocationDetails;

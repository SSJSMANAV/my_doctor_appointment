// import React, { useEffect, useState } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// const containerStyle = {
//   width: "100%",
//   height: "100vh",
// };

// const LocationDetails = () => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [mapLoaded, setMapLoaded] = useState(false);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         setCenter({ lat: latitude, lng: longitude });
//         setCurrentLocation({ lat: latitude, lng: longitude });
//         setMapLoaded(true);
//         console.log(currentLocation === null);
//       });
//     }
//   }, []);

//   const [center, setCenter] = useState({ lat: 0, lng: 0 });

//   return (
//     <div style={{ height: "70vh", width: "100%" }}>
//       {mapLoaded && (
//         <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
//           {currentLocation !== null && <Marker position={currentLocation} />}
//           {/* {<Marker position={center}/>} */}
//         </GoogleMap>
//       )}
//     </div>
//   );
// };

// export default LocationDetails;

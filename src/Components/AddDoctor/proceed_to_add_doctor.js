import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

// const center = {
//   lat: 0, // Replace with the default latitude
//   lng: 0, // Replace with the default longitude
// };

const ProceedToAddDoctor = () => {
  const [selectedDayFrom, setSelectedDayFrom] = React.useState("Monday");
  const [selectedDayTo, setSelectedDayTo] = React.useState("Saturday");
  const [mapLoaded, setMapLoaded] = useState(false);

  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const handleDayChange = (e) => {
    setSelectedDayFrom(e.target.value);
  };

  const handleDayChange1 = (e) => {
    setSelectedDayTo(e.target.value);
  };

  const handleMapClick = (event) => {
    console.log("Clicked location:", event.latLng);
  };

  useEffect(() => {
    // Get the user's current location and update the map's center
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lng: longitude });
      });
      setMapLoaded(true);
    }
  }, []);

  return (
    <div className="flex flex-row justify-center">
      <div className="flex mt-24 w-2/3 ">
        <div className="w-1/2 p-4 flex flex-col">   
          <div className="text-gray-500 font-semibold text-sm">
            Pin point doctor's location ( * Hospital)
          </div>
          {mapLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10} 
              onClick={handleMapClick}
            >
              {/* <Marker position={center} /> */}
            </GoogleMap>
          )}
        </div>
        <div className="w-1/2 p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Working Days ( * From )
            </label>
            <select
              value={selectedDayFrom}
              onChange={handleDayChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Working Days ( * To )
            </label>
            <select
              value={selectedDayTo}
              onChange={handleDayChange1}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
          </div>

          <button
            type="submit"
            onClick={() => {}}
            className="mt-4 bg-white text-blue-600 hover:bg-blue-600 border border-solid border-blue-600 hover:text-white rounded px-4 py-2"
          >
            Add Doctor
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProceedToAddDoctor;

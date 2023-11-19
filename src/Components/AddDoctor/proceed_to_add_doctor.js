import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useLocation } from "react-router-dom";
import { registerDoctorRequest } from "../../action-creators/auth_action";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

// const center = {
//   lat: 0, // Replace with the default latitude
//   lng: 0, // Replace with the default longitude
// };

const ProceedToAddDoctor = () => {
  const authState = useSelector((state) => {
    return state.auth;
  });

  const token = authState.token;
  const location = useLocation();
  const doctorData = location.state;
  console.log(doctorData);

  const [mapLoaded, setMapLoaded] = useState(false);

  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  const handleMapClick = (event) => {
    setCenter({ lat: event.latLng.lat(), lng: event.latLng.lng() });
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

  const handleSubmit = async () => {
    const doctorData = location.state;

    doctorData.location = { latitude: center.lat, longitude: center.lng };
    await registerDoctorRequest(doctorData, token)
      .then((data) => {
        toast.success(data);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className=" sm:flex lg:flex-row sm:w-full sm:justify-center  ">
      <div className="flex lg:flex-row sm:flex-col mt-12 lg:w-2/3 sm:w-11/12  ">
        <div className="lg:w-1/2 sm:w-full lg:p-4 flex flex-col">
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
              {center !== null && <Marker position={center} />}
              <Marker position={center} />
            </GoogleMap>
          )}
        </div>
        <div className="lg:w-1/2 p-4">
          <p> * Apply for Doctor</p>

          <button
            type="submit"
            onClick={handleSubmit}
            className="mt-4 bg-white text-blue-600 hover:bg-blue-600 border border-solid border-blue-600 hover:text-white rounded px-4 py-2"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProceedToAddDoctor;

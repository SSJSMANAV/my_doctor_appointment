import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
// import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-calendar/dist/Calendar.css";
import GoogleMapReact from "google-map-react";
import Header from "../Header/header";
import "./calendar.css";
import {
  faHeart,
  faShareNodes,
  faCircleExclamation,
  faCalendarDays,
  faUserDoctor,
  faLocationDot,
  faStar,
  faHospital,
} from "@fortawesome/free-solid-svg-icons";

const AnyReactComponent = ({ text }) => (
  <div style={{ color: "red", fontWeight: "bold" }}>{text}</div>
);

function DoctorDetailsPage() {
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);

  const [value, setValue] = React.useState(4);

  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleClick = (icon) => {
    setSelectedIcon(icon);
  };

  const items = [
    { icon: faCalendarDays, text: "Availability" },
    { icon: faLocationDot, text: "Location" },
    { icon: faStar, text: "Rating & Reviews" },
  ];

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        setUserLocation({ lat: userLat, lng: userLng });
      });
    }
  }, []);

  const defaultProps = {
    center: userLocation || {
      lat: 27.757947, // Default latitude
      lng: 85.321122, // Default longitude
    },
    zoom: 11,
  };

  return (
    <main>
      <Header />
      <div className="w-4/6 flex my-0 mx-auto mt-24 ">
        <div className=" lft_con w-2/5 ">
          <div className=" w-10/12 shadow-lg shadow-slate-300">
            <div className="bg-slate-100">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/img/doctor-1.png"}
                  style={{ width: "30%", height: "20%", borderRadius: "100%" }}
                  className="ml-28 py-6 rounded-full"
                />
              </div>
              <div>
                <p className="text-center text-xl">Dr. Sagar Prajapati</p>
                <div className="flex justify-center mt-2 text-sm">
                  <p className="bg-blue-300 text-blue-500 px-2 rounded-lg align-center mr-4">
                    Intermist
                  </p>
                  <p className=" text-gray-400">4 years Experience</p>
                </div>
                <div className="flex content-center place-content-center mt-2 ">
                  <Box
                    sx={{
                      "& > legend": { mt: 2 },
                    }}
                  >
                    <Rating name="simple-controlled" value={value} />
                  </Box>
                  <p className="pl-2  text-gray-300 ">4</p>
                </div>
                <div className="flex justify-around border border-t-slate-200 pb-4 pt-4 mt-2">
                  <div className="flex ">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="pr-2 mt-1.5 text-2xl border border-slate-200 py-2 px-2 rounded-full mr-8 cursor-pointer shadow-sm shadow-slate-200"
                    />
                    <FontAwesomeIcon
                      icon={faShareNodes}
                      className="pr-2 mt-1.5 text-2xl border border-slate-200 py-2 px-2 rounded-full cursor-pointer shadow-sm shadow-slate-200"
                    />
                  </div>
                  <div className="mt-2">
                    <button className="bg-yellow-400 px-2 py-2 text-sm font-semibold">
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex  mt-10  px-4 py-4  w-10/12 bg-slate-100 justify-between items-center shadow-lg shadow-slate-400">
            <div className="pr-4 ">
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className=" text-yellow-400  text-lg "
              ></FontAwesomeIcon>
            </div>
            <p className="px-4 w-2/3 text-sm">
              Help Lorem to have a better service by reporting an issue on this
              medical facilities.
            </p>
            <button className="border border-gray-400 px-2  text-sm text-red-400 font-semibold">
              Report
            </button>
          </div>
        </div>

        {/* Right Container */}

        <div className="rgt_cont w-3/5 cursor-pointer">
          <div className="flex justify-around mt-1 bg-slate-200 py-2 ">
            {items.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center ${
                  selectedIcon === item.icon
                    ? "text-blue-400"
                    : "hover:text-blue-400"
                }`}
                onClick={() => handleClick(item.icon)}
              >
                <div>
                  <FontAwesomeIcon icon={item.icon} className="text-lg" />
                </div>
                <button className="text-sm">{item.text}</button>
              </div>
            ))}
          </div>

          {/* <div className="flex w-1/2 justify-around py-4 mt-4 bg-slate-200 shadow-lg shadow-slate-400">
            <div className="pl-4">
              <FontAwesomeIcon
                icon={faHospital}
                className="text-xl"
              ></FontAwesomeIcon>
            </div>
            <div className="">
              <select className="pr-16 bg-transparent font-semibold text-md">
                <option>All Hospitals</option>
                <option>Tokha Hospitals</option>
                <option>Belbari Hospitals</option>
                <option>Biratnagar Hospitals</option>
              </select>
            </div>
          </div> */}
          <div>
            {selectedIcon && (
              <div>
                {selectedIcon === faCalendarDays && (
                  <div className="calendar mt-12">
                    <div className="calendar-container flex flex-col items-center w-full">
                      <Calendar onChange={setDate} value={date} />
                    </div>
                  </div>
                )}
                {selectedIcon === faLocationDot && (
                  <div
                    className="mt-10"
                    style={{ height: "70vh", width: "100%" }}
                  >
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: "YOUR_API_KEY" }}
                      defaultCenter={defaultProps.center}
                      defaultZoom={defaultProps.zoom}
                    >
                      {userLocation && (
                        <AnyReactComponent
                          lat={userLocation.lat}
                          lng={userLocation.lng}
                          text="Your Location"
                        />
                      )}
                    </GoogleMapReact>
                  </div>
                )}
                {selectedIcon === faStar && (
                  <div>
                    {/* Content for "Rating and Reviews" */}
                    {/* Display your rating and reviews-related content here */}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default DoctorDetailsPage;
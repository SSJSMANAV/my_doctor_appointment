import React, { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import { Outlet, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  faHeart,
  faShareNodes,
  faCircleExclamation,
  faCalendarDays,
  faLocationDot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { isValidDateValue } from "@testing-library/user-event/dist/utils";

const DoctorDetailsPage = () => {
  const { doctorId } = useParams();

  const [value, setValue] = React.useState(4);

  const items = [
    { icon: faCalendarDays, text: "Availability" },
    { icon: faLocationDot, text: "Location" },
    { icon: faStar, text: "Rating & Reviews" },
  ];

  const [isFavourited, setIsFavourited] = useState(false);

  return (
    <main>
      <div className="w-4/6 flex my-0 mx-auto mt-24 sm:flex-col lg:flex-row ">
        <div className=" lft_con lg:w-2/5 sm:w-full ">
          <div className="lg:w-10/12 shadow-sm shadow-slate-300 sm:w-full sm:mt-12">
            <div className="bg-slate-100">
              <div>
                <img
                  alt="doctor_image"
                  src={process.env.PUBLIC_URL + "/img/doctor-1.png"}
                  style={{ width: "30%", height: "20%", borderRadius: "100%" }}
                  className=" mx-auto lg:justify-center py-6 rounded-full sm:justify-center  "
                />
              </div>
              <div>
                <p className="text-center lg:text-xl sm:text-md">
                  Dr. Sagar Prajapati
                </p>
                <div className="flex justify-center mt-2 text-sm">
                  <p className="bg-blue-300 text-blue-500 px-2 rounded-lg align-center mr-4">
                    {doctorId}
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
                  <div className="flex">
                    <FontAwesomeIcon
                      icon={faHeart}
                      color={isFavourited ? "orange" : "white"}
                      onClick={() => {
                        setIsFavourited(!isFavourited);
                      }}
                      className="pr-2 bg-slate-300 mt-1.5 lg:text-2xl sm:text-lg sm:ml-2 border border-slate-200 py-2 px-2 rounded-full lg:mr-8 sm:mr-4 cursor-pointer shadow-sm shadow-slate-200"
                    />
                    <FontAwesomeIcon
                      icon={faShareNodes}
                      color="white"
                      className="pr-2 mt-1.5 bg-gray-300 lg:text-2xl sm:text-lg  border border-slate-200 py-2 px-2 rounded-full cursor-pointer shadow-sm shadow-slate-200"
                    />
                  </div>
                  <div className="mt-2">
                    <button className=" bg-yellow-400 lg:px-2 sm:px-1 lg:py-2 sm:py-1 text-sm font-semibold border border-black border-solid">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex  mt-10  px-4 py-4  lg:w-10/12 sm:w-full sm:mb-4 bg-slate-100 justify-between items-center shadow-sm shadow-slate-400">
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
            <button className="border border-gray-400 px-2 text-sm text-red-400 font-semibold">
              Report
            </button>
          </div>
        </div>
        <div className="flex flex-col lg:w-3/5 sm:w-full">
          <div className="flex flex-row gap-x-0 w-full ">
            <NavLink
              to={`/doctor-details/${doctorId}/appointmentdates`}
              className={(navData) =>
                navData.isActive
                  ? "w-1/3  text-center inline-block px-12 py-5 border-b-4 border-blue-700 text-gray-500 transition-all duration-300  ease-in-out hover:bg-blue-100 hover:text-black bg-blue-200 "
                  : "w-1/3 text-center inline-block px-12 py-5 border-b-0 border-blue-700 text-gray-500 transition-all duration-300  ease-in-out hover:bg-blue-100 hover:text-black bg-blue-50"
              }
            >
              <FontAwesomeIcon icon={items[0].icon} className="text-lg" />
            </NavLink>
            <NavLink
              to={`/doctor-details/${doctorId}/locationdetails`}
              className={(navData) =>
                navData.isActive
                  ? "w-1/3 text-center inline-block px-12 py-5 border-b-4 border-blue-700 text-gray-500 transition-all duration-300  ease-in-out hover:bg-blue-100 hover:text-black bg-blue-200"
                  : "w-1/3 text-center inline-block px-12 py-5 border-b-0 border-blue-700 text-gray-500 transition-all duration-300  ease-in-out hover:bg-blue-100 hover:text-black bg-blue-50"
              }
            >
              <FontAwesomeIcon icon={items[1].icon} className="text-lg" />
            </NavLink>
            <NavLink
              to={`/doctor-details/${doctorId}/ratings&reviews`}
              className={(navData) =>
                navData.isActive
                  ? "w-1/3 text-center inline-block px-12 py-5 border-b-4 border-blue-700 text-gray-500 transition-all duration-300  ease-in-out hover:bg-blue-100 hover:text-black bg-blue-200"
                  : "w-1/3 text-center inline-block px-12 py-5 border-b-0 border-blue-700 text-gray-500 transition-all duration-300  ease-in-out hover:bg-blue-100 hover:text-black bg-blue-50"
              }
            >
              <FontAwesomeIcon icon={items[2].icon} className="text-lg" />
            </NavLink>
          </div>
          <Outlet></Outlet>
        </div>
      </div>
    </main>
  );
};

export default DoctorDetailsPage;

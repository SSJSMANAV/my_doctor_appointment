import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  faCircleExclamation,
  faCalendarDays,
  faLocationDot,
  faStar,
  faMessage,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { fetchDoctorById } from "../../action-creators/doctors_list_action";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import RatingPopup from "./rating_pop_up";
import { useSelector } from "react-redux";
import {
  bookmarkTheDoctor,
  unBookmarkTheDoctor,
} from "../../action-creators/chat_action";
import { db } from "../../firebase";

const DoctorDetailsPage = () => {
  const { doctorId } = useParams();

  const scrollRef = useRef(0);

  const authState = useSelector((state) => {
    return state.auth;
  });

  const user = authState.user;

  const role = authState.user.role;

  const userId = authState.user._id;

  const [value, setValue] = React.useState(4);

  const items = [
    { icon: faCalendarDays, text: "Availability" },
    { icon: faLocationDot, text: "Location" },
    { icon: faStar, text: "Rating & Reviews" },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctorData, setDoctorData] = useState(null);
  const fetchDoctorDetails = async () => {
    setIsLoading(true);
    await fetchDoctorById(doctorId)
      .then((data) => {
        console.log(data.result);
        console.log("the doctor");
        setDoctorData(data.result);

        setIsLoading(false);
        setError(null);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.message);
        toast.error(e.message);
        console.log(e.message);
      });
  };

  const [isPopupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate();

  const navigateToChatsPage = () => {
    if (role !== "patient") {
      return;
    }
    navigate(`/chat-messages/${doctorId}/${userId}`);
  };

  useEffect(() => {
    fetchDoctorDetails();
    window.scrollTo(0, scrollRef.current);
  }, []);

  return (
    <main>
      {isPopupVisible && (
        <div
          onClick={() => {
            setPopupVisible(false);
          }}
          className="fixed inset-0 bg-black opacity-50"
        ></div>
      )}

      {isPopupVisible && (
        <RatingPopup
          doctorId={doctorId}
          isPopupVisible={isPopupVisible}
          onClose={() => setPopupVisible(false)}
        />
      )}
      {isLoading && (
        <div className="h-28 w-full text-center mt-20">
          <ClipLoader></ClipLoader>
        </div>
      )}
      {!isLoading && doctorData !== null && (
        <div className="sm:w-5/6 lg:w-4/6 flex my-0 mx-auto mt-24 sm:flex-col lg:flex-row  ">
          <div className=" lft_con lg:w-2/5 sm:w-11/12 mx-auto">
            <div className="lg:w-10/12 shadow-sm shadow-slate-300 sm:w-full sm:mt-12">
              <div className="bg-slate-100">
                <div className=" py-6">
                  <img
                    alt={doctorData.image}
                    src={`http://localhost:3009/assets/${doctorData.image}`}
                    // style={{
                    //   width: "30%",
                    //   height: "20%",
                    //   borderRadius: "100%",
                    // }}
                    className=" mx-auto lg:justify-center sm:justify-center object-cover h-24 w-24 rounded-full"
                  />
                </div>
                <div>
                  <p className="text-center lg:text-xl sm:text-md">
                    Dr. {doctorData.username}
                  </p>
                  <div className="flex lg:flex-row  justify-center mt-2 text-sm">
                    <p className="bg-blue-300 text-white lg:px-2 sm:px-1 rounded-md align-center mr-4 w-fit">
                      {doctorData.specialization}
                    </p>
                    <p className=" text-gray-400">
                      {doctorData.experience} years Experience
                    </p>
                  </div>
                  <div className="flex content-center place-content-center mt-2 ">
                    <Box
                      sx={{
                        "& > legend": { mt: 2 },
                      }}
                    >
                      <Rating
                        name="simple-controlled"
                        value={doctorData.rating}
                      />
                    </Box>
                    {/* <p className="pl-2  text-gray-300 ">{doctorData.rating}</p> */}
                  </div>
                  <div className="flex justify-around px-4 items-center border border-t-slate-200 pb-4 pt-4 mt-2 gap-x-4">
                    <div
                      onClick={() => {
                        if (role !== "patient") {
                          toast.error("Access denied.");
                        } else {
                          setPopupVisible(true);
                        }
                      }}
                      className="flex flex-row cursor-pointer justify-center sm:w-full text-sm font-bold gap-x-2 items-center bg-orange-400 px-3 py-2 border border-gray-300"
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        color="white"
                        className=" text-white lg:text-lg sm:text-lg cursor-pointer"
                      />
                      Rate Us
                    </div>
                    <div
                      onClick={navigateToChatsPage}
                      className={` ${
                        role === "patient"
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      } flex flex-row items-center justify-center sm:w-full gap-x-2 bg-blue-400 px-3 py-2 text-sm font-semibold border border-gray-300 border-solid`}
                    >
                      <FontAwesomeIcon
                        icon={faMessage}
                        className="text-white text-lg"
                      ></FontAwesomeIcon>
                      <p> Message </p>
                    </div>
                    {role === "patient" && (
                      <Bookmark
                        role={role}
                        doctorId={doctorId}
                        doctorData={doctorData}
                        user={user}
                      ></Bookmark>
                    )}
                  </div>      
                </div>
              </div>
            </div>
            <div className="flex flex-row sm:hidden lg:flex lg:flex-row mt-10  px-4 py-4  lg:w-10/12 sm:w-full sm:mb-4 bg-slate-100 justify-between items-center shadow-sm shadow-slate-400">
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className=" text-yellow-400  text-lg "
              ></FontAwesomeIcon>
              <p className="px-4 w-2/3 text-sm text-start">
                Bookmark the doctor to get personalized chat with him / her.
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:w-3/5 sm:w-full">
            <div className="flex flex-row mt-5 gap-x-0 w-full ">
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
            <Outlet context={[doctorData]}></Outlet>
          </div>
          <div className="flex sm:flex lg:hidden lg:mt-10  px-4 py-4  lg:w-10/12 sm:w-full sm:mb-4 bg-slate-100 justify-between items-center shadow-sm shadow-slate-400">
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
      )}
    </main>
  );
};

export default DoctorDetailsPage;

const Bookmark = ({ role, doctorId, doctorData, user }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const bookmarkDoctor = async () => {
    if (!isBookmarked) {
      await bookmarkTheDoctor(doctorId, doctorData, user)
        .then(() => {
          toast.success(`Dr. ${doctorData.username} has been bookmarked.`);
          setIsBookmarked(true);
        })
        .catch((e) => {
          toast.error(e.message);
        });
    } else {
      await unBookmarkTheDoctor(doctorId, doctorData, user)
        .then(() => {
          toast.success(
            `Dr. ${doctorData.username} has been removed from your bookmarks.`
          );
          setIsBookmarked(false);
        })
        .catch((e) => {
          toast.error(e.message);
        });
    }
  };

  useEffect(() => {
    const getBookmarked = async () => {
      let users = [];

      const collectionRef = await db
        .collection(`patients/${user._id}/followings`)
        .where("doctorId", "==", doctorId);
      const snapshot = await collectionRef.get();

      users = snapshot.docs.map((doc) => doc.data());
      if (users.length === 0) {
        setIsBookmarked(false);
      } else {
        setIsBookmarked(true);
      }
    };

    getBookmarked();
  }, [doctorId, user._id]);

  return (
    <div>
      <FontAwesomeIcon
        onClick={bookmarkDoctor}
        className={`${
          isBookmarked ? "text-orange-400" : "text-gray-500"
        } text-2xl cursor-pointer`}
        icon={faBookmark}
      ></FontAwesomeIcon>
    </div>
  );
};

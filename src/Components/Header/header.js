import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBars,
  faUser,
  faRightToBracket,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../../src/App.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getLoggedInState } from "../../action-creators/auth_action";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu); // Corrected the toggle logic
  };
  const authState = useSelector((state) => {
    return state.auth;
  });

  const isLoggedIn = authState.loggedIn;
  const user = authState.user;
  console.log(authState.token);

  return (
    <header
      className="my-0 mr-auto ml-auto fixed inset-x-0 top-0 py-2 pb-4 lin-grad bg-gray-100"
      style={{ zIndex: 1 }}
    >
      <nav className="w-10/12 flex justify-around my-0 mx-auto items-center">
        {windowWidth < 800 && (
          <div className=" mt-1.5 pr-4">
            <FontAwesomeIcon
              icon={faBars}
              className="text-2xl cursor-pointer transition-transform duration-500 ease-in-out"
              style={{
                transform: showMenu ? "rotate(90deg) " : "rotate(0deg)",
              }}
              onClick={toggleMenu}
            />
          </div>
        )}
        <div
          onClick={() => {
            navigate("/home");
          }}
          className="flex-grow text-center sm:flex lg:justify-start justify-center cursor-pointer"
        >
          <div className="flex items-center justify-center cursor-pointer">
            <FontAwesomeIcon
              icon={faPlus}
              className="lg:text-2xl  sm:text-xl sm:font-semibold"
            />
          </div>
          <p className="lg:text-2xl inline-block mx-2 sm:text-xl sm:font-semibold">
            MEDICAL
          </p>
        </div>
        {windowWidth >= 800 && (
          <div className="mt-1.5 font-semibold">
            <Link
              to="/"
              className="mr-7 hover:text-orange-400 transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/find-doctors"
              className="mr-7 hover:text-orange-400 transition-all duration-300"
            >
              Find Doctors
            </Link>
            {user !== null && authState.role !== "admin" && (
              <Link
                to="/my_appointments"
                className="mr-7 hover:text-orange-400 transition-all duration-300"
              >
                My Appointments
              </Link>
            )}
            {/* {user !== null && authState.role !== "admin" && (
              <Link
                to="/medical_history_list"
                className="mr-7 hover:text-orange-400 transition-all duration-300"
              >
                Medical History
              </Link>
            )} */}
            {user !== null && authState.role === "admin" && (
              <Link
                to="/doctor-applications"
                className="mr-7 hover:text-orange-400 transition-all duration-300"
              >
                Doctor-Applications
              </Link>
            )}
            {user !== null && authState.role === "admin" && (
              <Link
                to="/doctors"
                className="hover:text-orange-400 transition-all duration-300 py-1 px-2"
              >
                Doctors
              </Link>
            )}
          </div>
        )}
        {user === null && !isLoggedIn && (
          <div className="flex flex-row sm:gap-x-1 md:gap-x-5">
            <div
              onClick={() => {
                navigate("/login");
              }}
              className="flex flex-row cursor-pointer items-center border border-solid border-black rounded-sm hover:bg-black bg-transparent text-black-400 py-1.5 px-4   hover:text-white transition-all duration-300  ease-in-out"
            >
              <FontAwesomeIcon className="pr-3" icon={faUser}></FontAwesomeIcon>
              <p className="text-sm">Login</p>
            </div>

            <div
              onClick={() => {
                navigate("/signup");
              }}
              className="flex flex-row cursor-pointer items-center border border-solid border-red-500 rounded-sm hover:bg-red-500 bg-transparent text-red-500 py-1.5 px-4   hover:text-white transition-all duration-300  ease-in-out"
            >
              <FontAwesomeIcon
                className="pr-3"
                icon={faRightToBracket}
              ></FontAwesomeIcon>
              <p className="text-sm">Sign Up</p>
            </div>
          </div>
        )}

        {user !== null && isLoggedIn && (
          <div className="relative flex lg:w-52 justify-center">
            <img
              src={`http://localhost:3009/assets/${user.image}`}
              alt={user.name}
              className="flex z-20 h-10 w-10 rounded-full object-cover border border-gray-400 cursor-pointer justify-end"
              onClick={toggleOptions}
            />
            {showOptions && (
              <div
                className={`absolute lg:w-28 transition-all md:w-28 sm:w-24 sm:mt-10  lg:mt-10 lg:right-24 md:mt-10 md:right-6 bg-white border rounded-md border-gray-400 shadow-lg text-left  ${
                  showOptions ? "max-h-screen" : "max-h-0"
                } ${showOptions ? "opacity-100" : "opacity-10"}`}
              >
                {/* <ul className="p-0 m-0 sm:text-sm "> */}
                {/* <li
                    onClick={() => {
                      toggleOptions();
                    }}
                    className="p-2 hover:bg-orange-200 rounded-t-lg"
                  >
                    Profile
                  </li>
                  <li
                    onClick={() => {
                      toggleOptions();
                    }}
                    className="p-2 hover:bg-orange-200 z-20"
                  >
                    Account Info
                  </li> */}
                <div className="flex flex-row  justify-center items-center hover:bg-orange-200 cursor-pointer">
                  <div
                    onClick={() => {
                      toggleOptions();
                      localStorage.clear();
                      dispatch(getLoggedInState());
                      navigate("/login");
                    }}
                    className="p-2  rounded-b-lg  z-20 text-sm"
                  >
                    Sign Out
                  </div>
                  <FontAwesomeIcon
                    className="text-gray-600 text-sm "
                    icon={faSignOut}
                  ></FontAwesomeIcon>
                </div>

                {/* </ul> */}
              </div>
            )}
            {showOptions && (
              <div
                onClick={toggleOptions}
                className="bg-black bg-opacity-10 fixed h-full w-full top-0 left-0 -z-10"
              ></div>
            )}
          </div>
        )}
      </nav>
      {showMenu && (
        <div
          onClick={toggleMenu}
          className="fixed h-full w-full bg-black opacity-30 top-0 left-0"
        ></div>
      )}
      {windowWidth < 800 && (
        <div
          style={{
            transition: "all 0.6s ease",
            height: !showMenu ? "0px" : user !== null ? "160px" : "100px",
            // opacity: showMenu ? "100%" : "0%",
          }}
          className={`flex flex-col w-fit  text-white overflow-hidden items-center justify-around absolute top-12 left-10 shadow-sm bg-zinc-700 px-2  rounded-md transition-all duration-200 ease-in-out`}
        >
          <Link
            onClick={() => {
              toggleMenu();
            }}
            to="/"
            className="hover:text-orange-400 transition-all duration-300 pb-1.5 pt-1.5 px-2"
          >
            Home
          </Link>
          <Link
            onClick={() => {
              toggleMenu();
            }}
            to="/find-doctors"
            className="hover:text-orange-400 transition-all duration-300 py-1.5 px-2"
          >
            Find Doctors
          </Link>
          {user !== null && authState.role !== "admin" && (
            <Link
              onClick={() => {
                toggleMenu();
              }}
              to="/my_appointments"
              className="hover:text-orange-400 transition-all duration-300 py-1.5 px-2"
            >
              My Appointments
            </Link>
          )}
          {/* {user !== null && authState.role !== "admin" && (
              <Link
                to="/medical_history_list"
                className="hover:text-orange-400 transition-all duration-300 py-1.5 pb-3 px-2"
              >
                Medical History
              </Link>
            )} */}
          {user !== null && authState.role === "admin" && (
            <Link
              onClick={() => {
                toggleMenu();
              }}
              to="/doctor-applications"
              className="hover:text-orange-400 transition-all duration-300 py-1 px-2"
            >
              Doctor-Applications
            </Link>
          )}
          {user !== null && authState.role === "admin" && (
            <Link
              onClick={() => {
                toggleMenu();
              }}
              to="/doctors"
              className="hover:text-orange-400 transition-all duration-300 py-1 px-2"
            >
              Doctors
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;

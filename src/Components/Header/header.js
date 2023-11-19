import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBars,
  faSignIn,
  faPerson,
  faUser,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../../src/App.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom/dist";
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
    setShowMenu((prev) => !prev); // Corrected the toggle logic
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
      <nav className="w-4/6 flex justify-around my-0 mx-auto items-center">
        {windowWidth < 800 && (
          <div className=" mt-1.5 pr-4">
            <FontAwesomeIcon
              icon={faBars}
              className="text-2xl cursor-pointer transition-transform duration-500 ease-in-out"
              style={{
                transform: showMenu ? "rotate(90deg)" : "rotate(0deg)",
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
            {user !== null && authState.role !== "admin" && (
              <Link
                to="/medical_history_list"
                className="mr-7 hover:text-orange-400 transition-all duration-300"
              >
                Medical History
              </Link>
            )}
            {user !== null && authState.role === "admin" && (
              <Link
                to="/doctor-applications"
                className="mr-7 hover:text-orange-400 transition-all duration-300"
              >
                Doctor-Applications
              </Link>
            )}
          </div>
        )}
        {user === null && !isLoggedIn && (
          <div className="flex flex-row gap-x-5">
            <div className="flex flex-row items-center border border-solid border-black rounded-sm hover:bg-black bg-transparent text-black-400 py-1.5 px-4   hover:text-white transition-all duration-300  ease-in-out">
              <FontAwesomeIcon className="pr-3" icon={faUser}></FontAwesomeIcon>
              <Link to="/login" className="">
                Login
              </Link>
            </div>

            <div className="flex flex-row items-center border border-solid border-red-500 rounded-sm hover:bg-red-500 bg-transparent text-red-500 py-1.5 px-4   hover:text-white transition-all duration-300  ease-in-out">
              <FontAwesomeIcon className="pr-3" icon={faRightToBracket}></FontAwesomeIcon>
              <Link to="/signup" className="">
                Sign Up
              </Link>
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
                <ul className="p-0 m-0 sm:text-sm ">
                  <li
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
                  </li>
                  <li
                    onClick={() => {
                      toggleOptions();
                      localStorage.clear();
                      dispatch(getLoggedInState());
                      navigate("/login");
                    }}
                    className="p-2 hover:bg-orange-200 rounded-b-lg cursor-pointer z-20"
                  >
                    Sign Out
                  </li>
                </ul>
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
      {windowWidth < 800 && (
        <div
          className={`bg-white w-4/6 mx-auto rounded shadow text-center lin-grad text-slate-200 transition-all   duration-500 ease-in-out ${
            showMenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div
            className={`transition-all duration-500 ease-in-out  ${
              showMenu ? "flex flex-col " : "hidden"
            }`}
          >
            <Link
              to="/"
              className=" pt-0.5 hover:text-orange-400 transition-all duration-300 text-slate-400"
            >
              Home
            </Link>
            <Link
              to="/find-doctors"
              className=" py-0.5 text-center hover:text-orange-400 transition-all duration-300 text-slate-400"
            >
              Find Doctors
            </Link>
            {user !== null && authState.role !== "admin" && (
              <Link
                to="/my_appointments"
                className=" py-0.5 hover:text-orange-400 transition-all duration-300 text-slate-400"
              >
                My Appointments
              </Link>
            )}
            {user !== null && authState.role !== "admin" && (
              <Link
                to="/medical_history_list"
                className=" py-0.5 hover:text-orange-400 transition-all duration-300 text-slate-400"
              >
                Medical History
              </Link>
            )}
            {user !== null && authState.role === "admin" && (
              <Link
                to="/doctor-applications"
                className="mr-7 py-1 hover:text-orange-400 transition-all duration-300"
              >
                Doctor-Applications
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;

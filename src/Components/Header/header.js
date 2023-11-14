import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../../src/App.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom/dist";
import { useDispatch } from "react-redux";
import { getLoggedInState } from "../../action-creators/auth_action";

function Header() {
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

  return (
    <header
      className="my-0 mr-auto ml-auto fixed inset-x-0 top-0 py-2 pb-4 lin-grad bg-gray-100"
      style={{ zIndex: 1 }}
    >
      <nav className="w-4/6 mx-auto flex justify-around my-0 mx-auto items-center">
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
        <div className="flex-grow text-center sm:flex lg:justify-start justify-center">
          <div className="flex items-center justify-center">
            <FontAwesomeIcon icon={faPlus} className="lg:text-2xl sm:text-md" />
          </div>
          <p className="lg:text-2xl inline-block mx-2 sm:sm">MEDICAL</p>
        </div>
        {windowWidth >= 800 && (
          <div className="mt-1.5 font-semibold">

            <Link
              to="/"
              className="mr-7 hover:text-orange-400 transition-all duration-300"
            >
              Home
            </Link>
              to="/find-doctors"
              className="mr-7 hover:text-orange-400 transition-all duration-300"
            >
              Find Doctors
            </Link>
            {user.role !== "admin" && (
              <Link
                to="/my_appointments"
                className="mr-7 hover:text-orange-400 transition-all duration-300"
              >
                My Appointments
              </Link>
            )}
            {user !== null && user.role === "admin" && (
              <Link
                to="/doctor-applications"
                className="mr-7 hover:text-orange-400 transition-all duration-300"
              >
                Doctor-Applications
              </Link>
            )}
          </div>
        )}

        {user !== null && !isLoggedIn && (

          <Link
            to="/login"
            className="bg-transparent text-orange-400 py-1.5 px-4 border border-solid border-orange-400 rounded-sm hover:bg-orange-400 hover:text-white transition-all duration-300  ease-in-out"
          >
            Login
          </Link>
        )}
        {user !== null && isLoggedIn && (
          <div className="relative flex lg:w-52 justify-center">
            <img
              src={`http://localhost:3009/assets/${user.image}`}
              alt={user.name}
              className="flex  h-10 w-10 rounded-full  border border-gray-400 cursor-pointer justify-end"
              onClick={toggleOptions}
            />
            {showOptions && (
              <div
                className={`absolute mt-2 right-12 bg-white border rounded-lg border-gray-400 shadow-lg text-left transition transition-max-h duration-500 ${
                  showOptions ? "max-h-screen" : "max-h-0"
                }`}
              >
                <ul className="p-0 m-0">
                  <li className="p-2 hover:bg-orange-200 rounded-t-lg ">
                    Profile
                  </li>
                  <li className="p-2 hover:bg-orange-200">Account Info</li>
                  <li onClick={() => {
                     localStorage.clear();
                     dispatch(getLoggedInState());
                     navigate('/login');
                  }} className="p-2 hover:bg-orange-200 rounded-b-lg cursor-pointer">
                    Sign Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </nav>
      {windowWidth < 800 && (
        <div
          className={`bg-white w-4/6 mx-auto rounded shadow text-center lin-grad text-slate-200 transition-all duration-500 ease-in-out ${
            showMenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className={`${showMenu ? "block" : "hidden"}`}>
            <Link
              to="/"
              className="block mb-2 hover:text-orange-400 text-gray-700 transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/find-doctors"
              className="block mb-2 hover:text-orange-400  text-gray-700 transition-all duration-300"
            >
              Find Doctors
            </Link>
            {user.role !== "admin" && (
              <Link
                to="/my_appointments"
                className="block mb-2 hover:text-orange-400  text-gray-700 transition-all duration-300"
              >
                My Appointments
              </Link>
            )}
            {user !== null && user.role === "admin" && (
              <Link
                to="/doctor-applications"
                className="block mb-2 hover:text-orange-400 transition-all duration-300"
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

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../../src/App.css";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Header() {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
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
        <div className="flex justify-end">
          <FontAwesomeIcon icon={faPlus} className="pr-2 mt-1.5 text-2xl" />
          <p className="text-2xl">MEDICAL</p>
        </div>
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
        {user === null && !isLoggedIn && (
          <Link
            to="/login"
            className="bg-transparent text-orange-400 py-1.5 px-4 border border-solid border-orange-400 rounded-sm hover:bg-orange-400 hover:text-white transition-all duration-300  ease-in-out"
          >
            Login
          </Link>
        )}
        {user !== null && isLoggedIn && (
          <div className="relative w-52 pl-8">
            <img
              src={`http://localhost:3009/assets/${user.image}`}
              alt={user.name}
              className="flex h-10 w-10 rounded-full  border border-gray-400 cursor-pointer justify-end"
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
                  <li className="p-2 hover:bg-orange-200 rounded-b-lg">
                    Sign Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;

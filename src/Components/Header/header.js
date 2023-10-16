import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../../src/App.css";

function Header() {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

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
          <Link to='/'
          
            className="mr-7 hover:text-orange-400 transition-all duration-300"
          >
            Home
          </Link>
          <Link
            className="mr-7 hover:text-orange-400 transition-all duration-300"
          >
            Services
          </Link>
          <Link
          to='/my_appointments'
            className="mr-7 hover:text-orange-400 transition-all duration-300"
          >
            My Appointments
          </Link>
          <Link
          to='medical_history_list'
            className="mr-7 hover:text-orange-400 transition-all duration-300"
          >
            Medical History
          </Link>
        </div>  
        <div className="relative w-52 pl-8">
          <div className="flex  ">
            <img
              src={process.env.PUBLIC_URL + "/img/doctor-1.png"}
              style={{ height: "20%", width: "20%" }}
              className="flex rounded-3xl  border border-gray-400 cursor-pointer justify-end"
              onClick={toggleOptions}
            />
          </div>
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
      </nav>
    </header>
  );
}

export default Header;

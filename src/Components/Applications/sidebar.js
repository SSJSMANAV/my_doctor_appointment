import React from "react";
import { faBook, faTimes, faUniversity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = ({ isOpen, toggleSidebar, doctorData }) => {
  return (
    <div
      className={`fixed  h-full w-96 bg-gray-700 top-0 left-0 transition-transform transform z-10 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {doctorData !== null && 
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center pt-10 px-5 text-white text-lg">
          <div>Details</div>
          <FontAwesomeIcon
            onClick={toggleSidebar}
            icon={faTimes}
            className="cursor-pointer text-lg"
          ></FontAwesomeIcon>
        </div>
        <ul className="pt-12">
          <div className="flex justify-between items-center">
            <li className="px-4 py-2 text-white">Name:</li>
            <li className="px-4 py-2 text-white  font-bold">{doctorData.name}</li>
          </div>
          <div className="flex justify-between items-center">
            <li className="px-4 py-2 text-white">Email:</li>
            <li className="px-4 py-2 text-white font-bold">{doctorData.email}</li>
          </div>
          <div className="flex justify-between items-center">
            <li className="px-4 py-2 text-white">Ratings:</li>
            <li className="px-4 py-2 text-white  font-bold">
              {doctorData.rating}
            </li>
          </div>
          <div className="flex justify-between items-center">
            <li className="px-4 py-2 text-white">Hospital:</li>
            <li className="px-4 py-2 text-white   font-bold">
              {doctorData.hospital}
            </li>
          </div>

          <li className="px-4 py-2 text-white">
            Education:  
            <ul className="mt-2">
              {doctorData.education.map((edu, index) => (
                <li key={index}>
                  <div className="flex flex-col border border-solid border-gray- rounded-xl px-5 py-3 mb-2">
                    <div className="flex justify-between">
                      <FontAwesomeIcon icon={faUniversity}></FontAwesomeIcon>
                      <p> {edu.instituteName}</p>
                    </div>
                    <div className="flex justify-between">
                      <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>
                      <p> {edu.grade} GPA</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </li>
          <li className="px-4 py-2 text-white">
            Document Images:
            <ul className="ml-4">
              {doctorData.document.map((image, index) => (
                <li key={index}>
                  <img src={`http://localhost:3009/assets/${image}`}></img>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>}
    </div>
  );
};

export default Sidebar;

import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import DoctorRequestItem from "../Applications/doctor_request_item";
import Sidebar from "../Applications/sidebar";
import DoctorRequestItem1 from "../Applications/doctor_request_item1";

const Doctors = () => {
  const authState = useSelector((state) => {
    return state.auth;
  });

  const token = authState.token;
  const [doctors, setDoctors] = useState([]);

  const setNewDoctors = (id) => {
    const newDoctors = doctors.filter((doctor) => doctor._id !== id);

    setDoctors(newDoctors);
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const fetchAllDoctors = async () => {
    try {
      const url = `http://localhost:3009/admin/getAllDoctor`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.status);
      const jsonData = await response.json();
      if (response.status === 200) {
        console.log(jsonData.result);
        setDoctors(jsonData.result);
      } else {
        throw Error(jsonData.message);
      }
    } catch (e) {
      console.log(e.message);
      setDoctors([]);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const setDoctorData = (data) => {
    setData(data);
  };

  

  const toggleSidebar = () => {
    console.log("clicke");
    setIsOpen(!isOpen);
  };

  const scrollRef = useRef(0);

  useEffect(() => {
    fetchAllDoctors();
    window.scrollTo(0, scrollRef.current);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <div className="w-full flex my-0 pt-20 mb-5 flex-col sm:px-3 md:px-24 lg:px-52">
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="h-full w-full bg-slate-500 fixed top-0 left-0 opacity-25"
        ></div>
      )}
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        doctorData={data}
      />
      {doctors.length === 0 && <div className="text-center"> No Doctors Available</div>}
      {doctors.length !== 0 && (
        <div className="bg-cyan-600 mt-5 px-4 py-4 rounded-md w-full">
          <h1 className="text-black font-bold ">Doctor-Applications</h1>

          <div className="flex w-full justify-between mb-5">
            {windowWidth >= 800 && (
              <div className="text-gray-200 font-normal w-1/4 flex flex-row justify-start">
                Email. #
              </div>
            )}
            <div className="text-gray-200 font-normal w-1/4 flex flex-row justify-center">
              Doctor
            </div>
            <div className="text-gray-200 font-normal w-1/4 flex flex-row justify-center">
              Specialization
            </div>
            {windowWidth >= 800 && (
              <div className="text-gray-200 font-normal w-1/4 flex flex-row justify-center">
                Rating
              </div>
            )}
            <div className="text-gray-200 font-normal w-1/4 flex flex-row justify-center">
              Action
            </div>
          </div>
          {doctors.map((application) => (
            <DoctorRequestItem1
              key={application.doctorId}
              data={application}
              toggleSidebar={toggleSidebar}
              setDoctorData={setDoctorData}
              setNewDoctors={setNewDoctors}
            ></DoctorRequestItem1>
          ))}
        </div>
      )}
    </div>
  );
};

export default Doctors;

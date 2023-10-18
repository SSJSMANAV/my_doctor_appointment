import React, { useState } from "react";
import ProfileCard from "./profile_card";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const doctor1 = {
  id: 1,
  name: "Sagar1",
  speciality: "Eye Surgeon",
  image: "/img/doctor-1.png",
};

const doctor2 = {
  id: 2,
  name: "Sagar2",
  speciality: "Ear Surgeon",
  image: "/img/doctor-1.png",
};
const doctor3 = {
  id: 3,
  name: "Sagar3",
  speciality: "Ear Surgeon",
  image: "/img/doctor-1.png",
};

const doctor4 = {
  id: 4,
  name: "Sagar4",
  speciality: "Eye Surgeon",
  image: "/img/doctor-1.png",
};

const doctor5 = {
  id: 5,
  name: "Sagar5",
  speciality: "Ear Surgeon",
  image: "/img/doctor-1.png",
};
const doctor6 = {
  id: 6,
  name: "Sagar6",
  speciality: "Ear Surgeon",
  image: "/img/doctor-1.png",
};

const DoctorsList1 = [doctor1, doctor2, doctor3, doctor4, doctor5, doctor6];

const FindDoctors = () => {
  const [selectedDoctor, setSelectedDoctor] = useState("All"); // Initialize with "Eye Surgeon"

  // Function to handle the doctor selection

  const [filteredList, setFilteredList] = useState(DoctorsList1);

  const handleDoctorSelection = (doctorSpeciality) => {
    setSelectedDoctor(doctorSpeciality);
    if (doctorSpeciality === "All") {
      setFilteredList(DoctorsList1);
      return;
    }
    setFilteredList(
      DoctorsList1.filter((doctor) => doctor.speciality === doctorSpeciality)
    );
  };

  return (
    <main>
      <div className="lin-grad">
        <div className="flex flex-col justify-start w-4/6 my-0 mx-auto py-28">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <p className="pr-4 text-lg font-semibold">
                {" "}
                Sort By Speciality :
              </p>
              <select
                value={selectedDoctor}
                onChange={(e) => handleDoctorSelection(e.target.value)}
                className="py-2 px-4 border border-solid border-gray-300 flex"
              >
                <option value="All" className="px-2 py-2">
                  {" "}
                  Surgeon
                </option>
                <option value="Eye Surgeon" className="px-2 py-2">
                  <p>Eye Surgeon</p>
                </option>
                <option value="Ear Surgeon">Ear Surgeon</option>
                <option value="Heart Surgeon">Heart Surgeon</option>
              </select>
            </div>
            <div className="flex flex-row">
              <input
                type="text"
                placeholder="Search Doctors"
                className="w-full p-2 border rounded-l-sm"
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-orange-500 text-white p-2 rounded-r-md hover:bg-orange-700">
                <FontAwesomeIcon icon={faSearch} className="text-white px-2" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 w-full mt-5 justify-between gap-x-10 gap-y-5 ">
            {filteredList.map((doctorData) => (
              <ProfileCard doctor={doctorData}></ProfileCard>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FindDoctors;

// space between dropdown and the items

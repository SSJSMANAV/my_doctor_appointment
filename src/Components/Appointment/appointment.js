import React, { useState } from "react";
import Header from "../Header/header";
import DoctorDataItem from "./doctor_data_item";
import ProfileCard from "./profile_card";

const doctor1 = {
  name: "Sagar1",
  speciality: "Eye Surgeon",
  image: "/img/doctor-1.png",
};

const doctor2 = {
  name: "Sagar2",
  speciality: "Ear Surgeon",
  image: "/img/doctor-1.png",
};
const doctor3 = {
  name: "Sagar3",
  speciality: "Ear Surgeon",
  image: "/img/doctor-1.png",
};

const DoctorsList1 = [doctor1, doctor2, doctor3];

function Appointment() {
  const [selectedDoctor, setSelectedDoctor] = useState("Surgeon"); // Initialize with "Eye Surgeon"

  // Function to handle the doctor selection

  const [filteredList, setFilteredList] = useState(DoctorsList1);

  const handleDoctorSelection = (doctorSpeciality) => {
    setSelectedDoctor(doctorSpeciality);
    if (doctorSpeciality === "Surgeon") {
      setFilteredList(DoctorsList1);
      return;
    }
    setFilteredList(
      DoctorsList1.filter((doctor) => doctor.speciality === doctorSpeciality)
    );
  };

  return (
    <main>
      <Header />
      <div className="flex w-4/6 my-0 mx-auto py-28 justify-between ">
        <div className="">
          <select
            value={selectedDoctor}
            onChange={(e) => handleDoctorSelection(e.target.value)}
            className="px-2 py-2 "
          >
            <option value="Surgeon" className="px-2 py-2">
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
      </div>

      <div className="grid grid-cols-5">
        {filteredList.map((doctorData) => (
          <ProfileCard doctor={doctorData}></ProfileCard>
        ))}
      </div>
    </main>
  );
}

export default Appointment;


// space between dropdown and the items
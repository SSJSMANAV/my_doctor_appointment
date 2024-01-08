import React, { useEffect } from "react";
import ProfileCard from "./profile_card";

const DoctorsList = ({ doctors }) => {
  const observer = new IntersectionObserver(
    (entries) => {
      console.log(entries);
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("card-enter-active");
        } else {
          entry.target.classList.remove("card-enter-active");
        }
      });
    },
    { threshold: 0.8, root: null }
  );

  useEffect(() => {
    const hiddenElements = document.querySelectorAll(".profile-card");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      console.log("observer cleanup");
      // observer.disconnect();
    };
  });
  return (
    <div className="grid lg:grid-cols-3 sm:justify-center md:grid-cols-2 w-full mt-5 justify-between gap-x-10 gap-y-5 ">
      {doctors.map((doctorData) => (
        <ProfileCard
          key={doctorData.email}
          doctor={doctorData}
          className="profile-card"
        ></ProfileCard>
      ))}
    </div>
  );
};

export default DoctorsList;

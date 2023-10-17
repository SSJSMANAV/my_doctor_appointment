import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileCard = (props) => {
  const navigate = useNavigate();

  const navigateToDetailsPage = () => {
    navigate(`/doctor-details/${props.doctor.id}/appointmentdates`);
  };
  return (
    <div className="text-center bg-white-100 rounded-md shadow-md p-4 my-0 pt-12">
      <div className="rounded-full overflow-hidden mx-auto w-24 h-24 border border-solid  border-black ">
        <img
          src={process.env.PUBLIC_URL + props.doctor.image}
          alt={props.doctor.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-bold text-gray-700">{props.doctor.name}</h2>
        <div className="flex flex-row justify-center">
          <p className="text-gray-400 pr-2 font-semibold"> Specialty: </p>
          <p className="text-black font-semibold">{props.doctor.speciality}</p>
        </div>
      </div>
      <div
        className="mt-4 flex flex-row justify-center gap-x-3 "
        onClick={navigateToDetailsPage}
      >
        <button className="bg-transparent text-orange-400 py-2 px-4 border border-solid border-orange-400 rounded-sm hover:bg-orange-400 hover:text-white transition-all duration-300  ease-in-out">
          View Profile
        </button>
        <button className="bg-transparent text-green-400 border border-solid border-green-400 transition-all duration-300 rounded-sm ease-in-out  py-2 px-4 hover:text-white hover:bg-green-400">
          Book
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
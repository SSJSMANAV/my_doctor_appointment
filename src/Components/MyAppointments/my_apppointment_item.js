import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const MyAppointmentItem = () => {
  return (
    <div className="flex flex-row justify-between items-center bg-white px-2 py-3 mb-2 rounded-md">
      <div className="w-1/4 flex flex-row justify-start"> lk32432kjl32j4k2</div>
      <div className="flex flex-row items-center justify-center w-1/4">
        <div className="rounded-full overflow-hidden mx-auto w-10 h-10 mr-2">
          <img
            src={process.env.PUBLIC_URL + "/img/doctor-1.png"}
            alt={"alt"}
            className="object-cover w-full h-full"
          />
        </div>
        <div> Manav Koirala</div>
      </div>
      <div className="w-1/4 flex flex-row justify-center"> Male</div>
      <div className="w-1/4 flex flex-row justify-center"> Pending</div>
      <div className="w-1/4 flex flex-row justify-center items-center">
        <div className=" bg-teal-300 border border-solid border-black flex flex-row gap-x-3 items-center py-1 px-2 hover:bg-teal-600">
          <p className="text-sm"> Email</p>

          <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
        </div>
      </div>
    </div>
  );
};

export default MyAppointmentItem;

import React from "react";

const DoctorDataItem = (props) => {
  return (
    <div>
      {/* Display the selected doctor's image and information */}
      <div className="w-4/6 my-0 mx-auto pt-12">
        <div className="flex pb-10 w-2/3 bg-gray-500 rounded-lg ">
          <img
            className="pt-4 pl-4 rounded-md"
            src={process.env.PUBLIC_URL + props.doctor.image}
            alt="alt"
            style={{ width: "40%", height: "40%" }}
          />
          <div className="pl-12">
            <p className="pt-4 pb-4"> Name: {props.doctor.name}</p>
            <p className="pb-4">Speciality: {props.doctor.speciality}</p>

            <button className="px-2 py-2  bg-blue-300 rounded-sm">
              Book an appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDataItem;

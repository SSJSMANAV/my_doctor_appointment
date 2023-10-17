import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const BookingDateItem = () => {
  const navigate = useNavigate();
  const { doctorId } = useParams();

  return (
    <div className="flex flex-col mt-3 ">
      <div className="flex flex-row justify-between items-center px-6">
        <div className="flex flex-col mb-3">
          <p className="text-sm font-semibold"> 09:00 - 09:30</p>
          <p className="text-sm text-gray-400 font-bold">
            {" "}
            ABC Hospital, Kathmandu
          </p>
        </div>
        <div
          onClick={() => {
            navigate(`/doctor-details/${doctorId}/checkout-form`);
            console.log("tada");
          }}
          className="px-3 py-0.5 rounded-sm hover:text-white hover:bg-yellow-500 bg-yellow-400 cursor-pointer text-sm font-semibold"
        >
          Book
        </div>
      </div>

      <div className="bg-gray-400 w-full h-0.5"></div>
    </div>
  );
};

export default BookingDateItem;

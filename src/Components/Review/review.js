import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Review = (props) => {
  return (
    <div className="bg-blue-200 p-6 rounded-2xl shadow-lg shadow-slate-400">
      <div className="flex">
        <img
          src={process.env.PUBLIC_URL + "/img/doctor-1.png"}
          style={{ width: "15%", height: "auto", borderRadius: "5px" }}
        />
        <div>
          <p className="ml-4 text-sm">Sagar Prajapati</p>
          <div className="text-yellow-400">
            <FontAwesomeIcon icon={faStar} style={{ fontSize: "0.7rem" }} />
            <FontAwesomeIcon icon={faStar} style={{ fontSize: "0.7rem" }} />
            <FontAwesomeIcon icon={faStar} style={{ fontSize: "0.7rem" }} />
            <FontAwesomeIcon icon={faStar} style={{ fontSize: "0.7rem" }} />
            <FontAwesomeIcon icon={faStar} style={{ fontSize: "0.7rem" }} />
          </div>
        </div>
      </div>
      <div className="mt-2 text-sm text-left font-light">
        <p>
          World class for everyone. Our health System offers unmatched, expert
          healthcare
        </p>
      </div>
    </div>
  );
};

export default Review;

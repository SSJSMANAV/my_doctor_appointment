import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import {
  faCheck,
  faMailBulk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { changeApplicantVerifiedState } from "../../action-creators/doctor-applications_action";
import toast from "react-hot-toast";
import { doctorapplicationsactions } from "../../slices/doctor_application_slice";

const DoctorRequestItem = (props) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => {
    return state.auth;
  });
  const token = authState.token;

  const handleApplicantsVerifiedState = async (state) => {
    await changeApplicantVerifiedState(props.data.doctorId, token, state)
      .then((data) => {
        dispatch(
          doctorapplicationsactions.removeFromPending({
            id: props.data.doctorId,
          })
        );
        toast.success(data.message);
      })
      .catch((e) => {
        dispatch(
          doctorapplicationsactions.removeFromPending({
            id: props.data.doctorId,
          })
        );
        toast.error(e.message);
      });
  };

  const handleSetDoctorData = () => {
    props.toggleSidebar();
    props.setDoctorData(props.data);
  };

  const handleEmailClick = (e) => {
    e.stopPropagation();
    // Replace with the recipient email address and other details as needed
    const emailAddress = props.data.email;
    // const subject = 'Hello';
    // const body = 'I want to send you an email';

    // Generate the mailto link
    const mailtoLink = `mailto:${emailAddress}`;
    // const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    // Open the default email client
    window.location.href = mailtoLink;
  };

  return (
    <div>
      <div
        onClick={handleSetDoctorData}
        className="flex flex-row justify-between items-center bg-gray-100 cursor-pointer hover:bg-gray-200 shadow-sm px-2 py-3 mb-2 rounded-md"
      >
        <div className="w-1/4 flex flex-row justify-start">
          {" "}
          {props.data.email}
        </div>
        <div className="flex flex-row items-center font-bold w-1/4 px-2 justify-center">
          {props.data.name}
        </div>
        <div className="w-1/4 flex flex-row justify-center">
          {" "}
          {props.data.specialization}
        </div>
        <div className="w-1/4 flex flex-row justify-center">
          {" "}
          {props.data.rating}
        </div>
        {props.data.verified === "pending" && (
          <div className="w-1/4 flex flex-row justify-between gap-x-2 items-center">
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleApplicantsVerifiedState("approved");
              }}
              className=" border border-solid border-orange-400 transition-all cursor-pointer duration-200  ease-in-out border-spacing-2 flex flex-row gap-x-3 text-orange-400 items-center py-1 rounded-sm px-2 hover:bg-orange-400 hover:text-white"
            >
              <p className="text-sm">Verify</p>

              <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleApplicantsVerifiedState("rejected");
              }}
              className=" border border-solid border-red-400 transition-all cursor-pointer duration-200  ease-in-out border-spacing-2 flex flex-row gap-x-3 text-red-400 items-center py-1 rounded-sm px-2 hover:bg-red-400 hover:text-white"
            >
              <p className="text-sm">Reject</p>

              <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
            </div>
          </div>
        )}
        {props.data.verified !== "pending" && (
          <div className="w-1/4 flex justify-center">
            <div
              onClick={handleEmailClick}
              className=" justify-center w-28 border border-solid border-red-400 transition-all cursor-pointer duration-200  ease-in-out border-spacing-2 flex flex-row gap-x-3 text-red-400 items-center py-1 rounded-sm px-2 hover:bg-red-400 hover:text-white"
            >
              <p className="text-sm">Email</p>

              <FontAwesomeIcon icon={faMailBulk}></FontAwesomeIcon>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorRequestItem;

import React, { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNotesMedical, faPenNib } from "@fortawesome/free-solid-svg-icons";
import "../../css/my_appointments.css";
import { useNavigate } from "react-router-dom";
import MedicalReport from "./medical_report";
import { fetchMedicalReportById } from "../../action-creators/medical_report_action";
import toast from "react-hot-toast";

const MyAppointmentItem = ({ appointment, className }) => {
  const authState = useSelector((state) => {
    return state.auth;
  });

  const token = authState.token;

  const navigate = useNavigate();
  const appointmentId = appointment._id;

  const navigateToFillInReportPage = () => {
    navigate(`/my_appointments/${appointment._id}/post_checkup_form`, {
      state: {
        patientId: appointment.patientId,
      },
    });
  };

  const viewReport = async () => {
    await fetchMedicalReportById(token, appointmentId).then((data) => {
      setReport(data.result);
      setIsReportOpen(true);
    }).catch((e) => {
      toast.error(e.message);
    })
  };

  const toggleIsOpen = () => {
    setIsReportOpen(!isReportOpen);
  }

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [report, setReport] = useState(null);

  return (
    <div>
      {isReportOpen && (
        <div
          onClick={toggleIsOpen}
          className="h-full w-full bg-slate-500 absolute top-0 left-0 opacity-25 z-30"
        ></div>
      )}
      <MedicalReport
        onClick={viewReport}
        isOpen={isReportOpen}
        report={report}
        toggleIsOpen={toggleIsOpen}
      ></MedicalReport>
      <div
        className={` ${className} flex flex-row justify-between items-center bg-gray-100 cursor-pointer hover:bg-gray-200 shadow-sm px-2 py-3 mb-2 rounded-md`}
      >
        <div className="w-1/4 flex flex-row justify-start">
          {appointment.doctorName}{" "}
        </div>
        <div className="flex flex-row items-center font-bold w-1/4 px-2 justify-center">
          {appointment.patientName}
        </div>
        <div className="w-1/4 flex flex-row justify-center">
          {appointment.startTime}
        </div>
        <div className="w-1/4 flex flex-row justify-center">
          {appointment.status}
        </div>

        {authState.role === "doctor" && appointment.status === "Pending" && (
          <div
            onClick={navigateToFillInReportPage}
            className="w-1/4 flex justify-center"
          >
            <div className=" justify-center w-28 border border-solid border-red-400 transition-all cursor-pointer duration-200  ease-in-out border-spacing-2 flex flex-row gap-x-3 text-red-400 items-center py-1 rounded-sm px-2 hover:bg-red-400 hover:text-white">
              <p className="text-sm">Fill Report</p>

              <FontAwesomeIcon icon={faPenNib}></FontAwesomeIcon>
            </div>
          </div>
        )}
        {appointment.status !== "Pending" && (
          <div onClick={viewReport} className="w-1/4 flex justify-center">
            <div className=" justify-center w-28 border border-solid border-red-400 transition-all cursor-pointer duration-200  ease-in-out border-spacing-2 flex flex-row gap-x-3 text-red-400 items-center py-1 rounded-sm px-2 hover:bg-red-400 hover:text-white">
              <p className="text-sm">View Report</p>

              <FontAwesomeIcon icon={faNotesMedical}></FontAwesomeIcon>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointmentItem;

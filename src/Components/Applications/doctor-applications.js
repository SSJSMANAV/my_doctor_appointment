import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { fetchDoctorApplications } from "../../action-creators/doctor-applications_action";
import DoctorRequestItem from "../Applications/doctor_request_item";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { doctorapplicationsactions } from "../../slices/doctor_application_slice";
import { ClipLoader } from "react-spinners";
import Sidebar from "./sidebar";

const DoctorApplications = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(0);

  const authState = useSelector((state) => {
    return state.auth;
  });
  const token = authState.token;

  const doctorApplicationsState = useSelector((state) => {
    return state.doctorapplications;
  });
  const applications = doctorApplicationsState.requests;

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState("Pending"); // Initialize with "Eye Surgeon"

  // Function to handle the doctor selection

  const handleDoctorSelection = async (status) => {
    setSelectedStatus(status);
    await fetchDoctorApplications(token, status)
      .then((data) => {
        console.log(JSON.parse(data.result));
        if (data.result === null) {
          dispatch(
            doctorapplicationsactions.replaceDoctorApplications({
              requests: [],
            })
          );
        } else {
          dispatch(
            doctorapplicationsactions.replaceDoctorApplications({
              requests: data.result,
            })
          );
        }
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const getDoctorApplications = async () => {
      setIsLoading(true);
      await fetchDoctorApplications(token, selectedStatus)
        .then((data) => {
          if (data.result === null) {
            dispatch(
              doctorapplicationsactions.replaceDoctorApplications({
                requests: [],
              })
            );
          } else {
            dispatch(
              doctorapplicationsactions.replaceDoctorApplications({
                requests: data.result,
              })
            );
          }
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
        });
    };
    getDoctorApplications();
    window.scrollTo(0, scrollRef.current);
  }, [dispatch, selectedStatus, token]);

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const setDoctorData = (data) => {
    setData(data);
  };

  const toggleSidebar = () => {
    console.log("clicke");
    setIsOpen(!isOpen);
  };

  return (
    <div >
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="h-full w-full bg-slate-500 absolute top-0 left-0 opacity-25"
        ></div>
      )}
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        doctorData={data}
      />

      <div className="pb-24 flex pt-24 overflow-y-auto">
        <div className="w-4/6 flex my-0 mx-auto pt-4 flex-col">
          <div className="flex flex-row justify-between items-center w-full"> 
            <div className=" border border-solid border-black flex">
              <select
                value={selectedStatus}
                onChange={(e) => handleDoctorSelection(e.target.value)}
                className="px-2 py-2 "
              >
                <option value="Pending" className="px-2 py-2">
                  Pending
                </option>

                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
          {isLoading && (
            <div className="h-32 flex justify-center items-center">
              <ClipLoader></ClipLoader>
            </div>
          )}
          {!isLoading && !hasError && applications.length === 0 && (
            <div className="text-center"> No applicants Available.</div>
          )}

          {!isLoading && !hasError && applications.length !== 0 && (
            <div className="bg-cyan-600 mt-5 px-4 py-4 rounded-md w-full">
              <h1 className="text-black font-bold ">Doctor-Applications</h1>

              <div className="flex w-full justify-between mb-5">
                <div className="text-gray-200 font-normal w-1/4 flex flex-row justify-start">
                  Email. #
                </div>
                <div className="text-gray-200 font-normal w-1/4 flex flex-row justify-center">
                  Doctor
                </div>
                <div className="text-gray-200 font-normal w-1/4 flex flex-row justify-center">
                  Specialization
                </div>
                <div className="text-gray-200 font-normal w-1/4 flex flex-row justify-center">
                  Rating
                </div>
                <div className="text-gray-200 font-normal w-1/4 flex flex-row justify-center">
                  Action
                </div>
              </div>
              {applications.map((application) => (
                <DoctorRequestItem
                  key={application.doctorId}
                  data={application}
                  toggleSidebar={toggleSidebar}
                  setDoctorData={setDoctorData}
                ></DoctorRequestItem>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorApplications;

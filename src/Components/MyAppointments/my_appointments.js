import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddAppointmentButton from "./add_appointment_button";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMyAppointments } from "../../action-creators/my_appointments_action";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { myAppointmentsSliceActions } from "../../slices/my_appointments_slice";
import MyAppointmentItem from "./my_appointment_item";
import "../../css/my_appointments.css";

const MyAppointments = () => {
  const authState = useSelector((state) => {
    return state.auth;
  });
  const token = authState.token;

  const myApppointmentsState = useSelector((state) => {
    return state.myappointments;
  });

  const appointmentsList = myApppointmentsState.myappointments;

  const dispatch = useDispatch();

  const role = authState.user.role;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const [selectedAppointmentStatus, setAppointmentStatus] = useState("Surgeon"); // Initialize with "Eye Surgeon"

  // Function to handle the doctor selection

  const handleDoctorSelection = (status) => {
    setAppointmentStatus(status);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, sethasError] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("item-enter-active");
          } else {
            entry.target.classList.remove("item-enter-active");
          }
        });
      },
      { threshold: 0.5, root: null }
    );

    const fetchAppointments = async () => {
      setIsLoading(true);
      await fetchMyAppointments(token)
        .then((data) => {
          console.log(data.result);
          dispatch(
            myAppointmentsSliceActions.replaceMyAppointments({
              appointments: data.result,
            })
          );
          const hiddenElements = document.querySelectorAll(
            ".my-appointment-item"
          );
          hiddenElements.forEach((el) => observer.observe(el));
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
        });
    };
    fetchAppointments();
  }, []);
  return (
    <div className="pb-24 flex pt-24">
      <div className="lg:w-4/6 flex my-0 mx-auto pt-4 flex-col">
        <div className="flex sm:flex-col lg:flex-row justify-between items-center w-full">
          <div className="w-full">
            <div className="lg:w-fit sm:w-min">
              <div className="sm:w-fit border border-solid border-black sm:py-2 flex flex-row">
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Start Date"
                  className="text-center text-md bg-transparent"
                />
                <h1> - </h1>
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="End Date"
                  className="text-center text-md bg-transparent"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div className="sm:mt-5 lg:mt-0 sm:w-full lg:w-fit">
              <div className=" border border-solid border-black flex justify-start sm:w-max  ">
                <select
                  value={selectedAppointmentStatus}
                  onChange={(e) => handleDoctorSelection(e.target.value)}
                  className="px-2 py-2 "
                >
                  <option value="Surgeon" className="px-1 py-2">
                    Booked
                  </option>
                  <option value="Eye Surgeon" className="px-1 py-2">
                    <p>Pending</p>
                  </option>
                  <option value="Ear Surgeon">Cancelled</option>
                  <option value="Heart Surgeon">Completed</option>
                </select>
              </div>
            </div>
            <div className="sm:w-full lg:w-fit sm:mt-5 lg:mt-0 sm:text-sm lg:text-md flex sm:justify-end">
              {role === "doctor" && (
                <AddAppointmentButton></AddAppointmentButton>
              )}
            </div>
          </div>
        </div>
        <div className="bg-blue-200 mt-5 px-4 py-4 rounded-md w-full">
          <h1 className="text-black font-bold ">Appointments</h1>

          <div className="flex w-full justify-between mb-5">
            <div className="text-gray-600 font-normal w-1/4 flex flex-row justify-start">
              Doctor
            </div>
            <div className="text-gray-600 font-normal w-1/4 flex flex-row justify-center">
              Patient
            </div>
            <div className="text-gray-600 font-normal w-1/4 flex flex-row justify-center">
              Start Time
            </div>
            <div className="text-gray-600 font-normal w-1/4 flex flex-row justify-center">
              Status
            </div>
            <div className="text-gray-600 font-normal w-1/4 flex flex-row justify-center">
              Action
            </div>
          </div>
          {isLoading && (
            <div className="text-center">
              {" "}
              <ClipLoader></ClipLoader>
            </div>
          )}
          {!isLoading &&
            appointmentsList.length > 0 &&
            appointmentsList.map((appointment) => (
              <MyAppointmentItem
                className="my-appointment-item"
                appointment={appointment}
              ></MyAppointmentItem>
            ))}
          {!isLoading && appointmentsList.length <= 0 && (
            <div className="text-center"> No appointments till date !</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;

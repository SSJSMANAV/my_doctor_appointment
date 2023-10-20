import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddAppointmentButton from "./add_appointment_button";
import MyAppointmentItem from "./my_apppointment_item";

const MyAppointments = () => {
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
  return (
    <div className="pb-24 flex  pt-24">
      <div className="w-4/6 flex my-0 mx-auto pt-4 flex-col">
        <div className="flex flex-row justify-between items-center w-full">
          <div>
            <div className="border border-solid border-black p-2 flex flex-row">
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
                className="text-center bg-transparent"
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
                className="text-center bg-transparent"
              />
            </div>
          </div>
          <div className=" border border-solid border-black flex">
            <select
              value={selectedAppointmentStatus}
              onChange={(e) => handleDoctorSelection(e.target.value)}
              className="px-2 py-2 "
            >
              <option value="Surgeon" className="px-2 py-2">
                Booked
              </option>
              <option value="Eye Surgeon" className="px-2 py-2">
                <p>Pending</p>
              </option>
              <option value="Ear Surgeon">Cancelled</option>
              <option value="Heart Surgeon">Completed</option>
            </select>
          </div>
          <AddAppointmentButton></AddAppointmentButton>
        </div>
        <div className="bg-blue-200 mt-5 px-4 py-4 rounded-md w-full">
          <h1 className="text-black font-bold ">Appointments</h1>

          <div className="flex w-full justify-between mb-5">
            <div className="text-gray-600 font-normal w-1/4 flex flex-row justify-start">Booking Id. #</div>
            <div className="text-gray-600 font-normal w-1/4 flex flex-row justify-center">Doctor</div>
            <div className="text-gray-600 font-normal w-1/4 flex flex-row justify-center">Gender</div>
            <div className="text-gray-600 font-normal w-1/4 flex flex-row justify-center">Status</div>
            <div className="text-gray-600 font-normal w-1/4 flex flex-row justify-center">Action</div>
          </div>
          <MyAppointmentItem></MyAppointmentItem>
          <MyAppointmentItem></MyAppointmentItem>
          <MyAppointmentItem></MyAppointmentItem>
          <MyAppointmentItem></MyAppointmentItem>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;

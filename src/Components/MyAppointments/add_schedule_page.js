// AddAppointmentPage.js

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AddSchedule = () => {
  const authState = useSelector((state) => {
    return state.auth;
  });
  const token = authState.token;
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [appointments, setAppointments] = useState([]);

  const handleAddAppointment = () => {
    if (startDate && startTime && endTime) {
      const newAppointment = {
        startTime,
        endTime,
      };

      setAppointments([...appointments, newAppointment]);
      setStartTime("");
      setEndTime("");
    } else {
      toast.error("Please fill in the fields.");
    }
  };

  const handleAddSchedule = async () => {
    try {
      const url = "http://localhost:3009/schedule/create-schedule";
      console.log("here");
      console.log(startDate);
      console.log("here");
      console.log(appointments);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: startDate.toISOString().split("T")[0],
          timeslot: appointments,
        }),
      });
      console.log(response.status);
      const jsonData = await response.json();
      if (response.status === 200) {
        toast.success(jsonData.message);
      } else {
        toast.error(jsonData.message);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="container mx-auto mt-8 w-1/4">
      <h2 className="text-2xl font-bold mb-4">Add Appointment</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Date
        </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setAppointments([]);
          }}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Start Time
        </label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          End Time
        </label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <button
        onClick={handleAddAppointment}
        className="bg-transparent text-green-400 border border-solid border-green-400 transition-all duration-300 rounded-sm ease-in-out  py-1 px-4 hover:text-white hover:bg-green-400"
      >
        Add Timestamp
      </button>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Appointments</h2>
        {appointments.length === 0 && (
          <p> You haven't added any time stamps to your schedule.</p>
        )}
        <ul className="grid grid-cols-2 ">
          {appointments.length !== 0 &&
            appointments.map((appointment, index) => (
              <li
                key={index}
                className="border border-solid border-orange-600 text-center mr-2 rounded-sm py-1 px-2 mb-2"
              >
                {appointment.startTime} {" - "}
                {appointment.endTime}
              </li>
            ))}
        </ul>
      </div>
      {appointments.length !== 0 && (
        <div className="flex flex-row justify-end ">
          <button
            onClick={handleAddSchedule}
            className="bg-transparent mb-5 text-orange-400 border border-solid border-orange-400 transition-all duration-300 rounded-sm ease-in-out  py-2 px-4 hover:text-white hover:bg-orange-400"
          >
            Add Schedule
          </button>
        </div>
      )}
    </div>
  );
};

export default AddSchedule;

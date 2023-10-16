import ReactDatePicker from "react-datepicker";
import BookingDateItem from "./booking_date_item";

import React, { useState } from "react";
import { addDays, subDays } from "date-fns";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleNextDay = () => {
    setSelectedDate(addDays(selectedDate, 1));
  };

  const handlePreviousDay = () => {
    setSelectedDate(subDays(selectedDate, 1));
  };

  return (
    <div className="text-center">
      <div className="my-4">
        <button
          onClick={handlePreviousDay}
          className="bg-gray-300  hover:bg-gray-400 text-gray-600 py-2 px-3 rounded-l-md"
        >
          &#8249;
        </button>
        <ReactDatePicker
          className="text-center text-orange-500 font-semibold text-sm border-none focus:outline-none hover:outline-none"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MMMM d, yyyy"
          showYearDropdown
          scrollableYearDropdown
          todayButton="Today"
          placeholderText="Select a date"
        ></ReactDatePicker>
        <button
          onClick={handleNextDay}
          className="bg-gray-300 hover:bg-gray-400 text-gray-600 py-2 px-3 rounded-r-md"
        >
          &#8250;
        </button>
      </div>
      {/* Here, you can display the selected date or use it in your application as needed. */}
    </div>
  );
};

const AppointmentDates = () => {
  return (
    <div className="flex flex-col w-full items-start">
      <DatePicker></DatePicker>
      <div className="shadow-md w-full">
        <BookingDateItem></BookingDateItem>
        <BookingDateItem></BookingDateItem>
        <BookingDateItem></BookingDateItem>
        <BookingDateItem></BookingDateItem>
        <BookingDateItem></BookingDateItem>
        <BookingDateItem></BookingDateItem>
      </div>
    </div>
  );
};

export default AppointmentDates;

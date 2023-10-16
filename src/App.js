import "./App.css";
import Home from "../src/Components/Home/home";
import { Routes, Navigate, Route } from "react-router-dom";
import Appointment from "./Components/Appointment/appointment";
import Header from "./Components/Header/header";
import DoctorDetailsPage from "./Components/DoctorDetails/doctor_Details_page";
import MyAppointments from "./Components/MyAppointments/my_appointments";
import DoctorForm from "./Components/MedicalHistory/post_checkup_form";
import AppointmentDates from "./Components/DoctorDetails/appointment_dates";
import RatingsAndReviews from "./Components/DoctorDetails/ratings_reviews";
import LocationDetails from "./Components/DoctorDetails/location_details";
import MedicalHistoryList from "./Components/MedicalHistory/medical_history_list";

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<Navigate replace to="/home" />}></Route>
        <Route exact path="/appointment" element={<Appointment />}></Route>
        <Route
          exact
          path="/doctorDetailsPage/:doctorId"
          element={<DoctorDetailsPage />}
        >
          <Route
            path="/doctorDetailsPage/:doctorId/appointmentdates"
            element={<AppointmentDates />}
          ></Route>
          <Route
            path="/doctorDetailsPage/:doctorId/locationdetails"
            element={<LocationDetails />}
          ></Route>
          <Route
            path="/doctorDetailsPage/:doctorId/ratings&reviews"
            element={<RatingsAndReviews />}
          ></Route>
        </Route>
        <Route
          exact
          path="/my_appointments"
          element={<MyAppointments />}
        ></Route>
        <Route
          exact
          path="/medical_history_list"
          element={<MedicalHistoryList />}
        ></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/post_checkup_form" element={<DoctorForm />}></Route>
      </Routes>
    </div>
  );
}

export default App;

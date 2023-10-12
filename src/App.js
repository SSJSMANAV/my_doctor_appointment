import "./App.css";
import Home from "../src/Components/Home/home";
import { Routes, Navigate, Route } from "react-router-dom";
import Appointment from "./Components/Appointment/appointment";
import Header from "./Components/Header/header";
import DoctorDetailsPage from "./Components/DoctorDetails/doctor_Details_page";
import MyAppointments from "./Components/MyAppointments/my_appointments";

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<Navigate replace to="/home" />}></Route>
        <Route exact path="/appointment" element={<Appointment />}></Route>
        <Route
          exact
          path="/doctorDetailsPage"
          element={<DoctorDetailsPage />}
        ></Route>
        <Route
          exact
          path="/my_appointments"
          element={<MyAppointments />}
        ></Route>
        <Route exact path="/home" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;

import "./App.css";
import Home from "../src/Components/Home/home";
import { Routes, Navigate, Route } from "react-router-dom";
import FindDoctors from "./Components/FindDoctors/find_doctors";
import Header from "./Components/Header/header";
import DoctorDetailsPage from "./Components/DoctorDetails/doctor_Details_page";
import MyAppointments from "./Components/MyAppointments/my_appointments";
import DoctorForm from "./Components/MedicalHistory/post_checkup_form";
import AppointmentDates from "./Components/DoctorDetails/appointment_dates";
import RatingsAndReviews from "./Components/DoctorDetails/ratings_reviews";
import LocationDetails from "./Components/DoctorDetails/location_details";
import MedicalHistoryList from "./Components/MedicalHistory/medical_history_list";
import Login from "./Components/Auth/Login/login";
import SignUp from "./Components/Auth/SignUp/sign_up";
import CheckoutForm from "./Components/CheckOut/checkout_form";
import AddDoctorForm from "./Components/AddDoctor/add_doctor";
import ProceedToAddDoctor from "./Components/AddDoctor/proceed_to_add_doctor";
import { LoadScript } from "@react-google-maps/api";

function App() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyBuM5vSQxrCsjTNcX1CTInG3CU0feIL9L0">
    <div>
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<Navigate replace to="/home" />}></Route>
        <Route exact path="/signup" element={<SignUp />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/find-doctors" element={<FindDoctors />}></Route>

        <Route path="/doctor-details/:doctorId" element={<DoctorDetailsPage />}>
          <Route
            path="/doctor-details/:doctorId/appointmentdates"
            element={<AppointmentDates />}
          ></Route>
          <Route
            path="/doctor-details/:doctorId/locationdetails"
            element={<LocationDetails />}
          ></Route>
          <Route
            path="/doctor-details/:doctorId/ratings&reviews"
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
        <Route
          path="/doctor-details/:doctorId/checkout-form"
          element={<CheckoutForm></CheckoutForm>}
        ></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route
          path="/add-doctor"
          element={<AddDoctorForm></AddDoctorForm>}
        ></Route>
        <Route
          path="/proceed-to-add-doctor"
          element={<ProceedToAddDoctor></ProceedToAddDoctor>}
        >
        </Route>
      </Routes>
      {/* <Footer></Footer> */}
    </div>
    </LoadScript>
  );
}

export default App;

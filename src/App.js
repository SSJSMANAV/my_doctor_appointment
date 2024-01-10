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
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLoggedInState } from "./action-creators/auth_action";
import Footer from "./Components/Footer/footer";
import DoctorApplications from "./Components/Applications/doctor-applications";
import AddSchedule from "./Components/MyAppointments/add_schedule_page";
import ChatPage from "./Components/Chat/chat";
import ChatScreen from "./Components/Chat/chat_screen";
import BottomChatIcon from "./Components/Chat/bottom_chat_icon";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedInState());
  }, [dispatch]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAQJQLycBvTM9-X1QGIzhKJxZ5eIuHtqN0">
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },

          error: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <div>
        <BottomChatIcon></BottomChatIcon>
        <Header></Header>
        <Routes>
          <Route
            exact
            path="/"
            element={<Navigate replace to="/home" />}
          ></Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/find-doctors" element={<FindDoctors />}></Route>

          <Route
            path="/doctor-details/:doctorId"
            element={<DoctorDetailsPage />}
          >
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
          <Route
            exact
            path="/doctor-applications"
            element={<DoctorApplications />}
          ></Route>
          <Route exact path="/home" element={<Home />}></Route>
          <Route
            exact
            path="/my_appointments/:appointmentId/post_checkup_form"
            element={<DoctorForm />}
          ></Route>
          <Route
            path="/checkout-form"
            element={<CheckoutForm></CheckoutForm>}
          ></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route
            path="/doctor-signup-request"
            element={<AddDoctorForm></AddDoctorForm>}
          ></Route>
          <Route
            path="/proceed-doctor-fillup-form"
            element={<ProceedToAddDoctor></ProceedToAddDoctor>}
          ></Route>
          <Route
            path="/add-schedule"
            element={<AddSchedule></AddSchedule>}
          ></Route>
          <Route
            path="/chat-messages/:doctorId/:patientId"
            element={<ChatPage></ChatPage>}
          ></Route>
          <Route
            path="/chats/:userId"
            element={<ChatScreen></ChatScreen>}
          ></Route>
        </Routes>

        <Footer></Footer>
      </div>
    </LoadScript>
  );
}

export default App;

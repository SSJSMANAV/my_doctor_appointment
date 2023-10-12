import logo from "./logo.svg";
import "./App.css";
import Home from "../src/Components/Home/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Appointment from "./Components/Appointment/appointment";
import Header from "./Components/Header/header";
import DoctorDetailsPage from "./Components/DoctorDetails/doctor_Details_page";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/appointment", element: <Appointment /> },
  { path: "/header", element: <Header /> },
  { path: "/doctorDetailsPage", element: <DoctorDetailsPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

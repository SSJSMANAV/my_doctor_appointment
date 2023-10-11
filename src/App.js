import logo from "./logo.svg";
import "./App.css";
import Home from "../src/Components/Home/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Appointment from "./Components/Appointment/appointment";
import Header from "./Components/Header/header";
import Booking from "./Components/Booking/booking";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/appointment", element: <Appointment /> },
  { path: "/header", element: <Header /> },
  { path: "/booking", element: <Booking /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

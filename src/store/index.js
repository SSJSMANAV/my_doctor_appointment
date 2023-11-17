import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/auth_slice";
import doctorapplicationsslice from "../slices/doctor_application_slice";
import doctorsListSlice from "../slices/doctors_slice";
import myAppointmentsSlice from "../slices/my_appointments_slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    doctorapplications: doctorapplicationsslice.reducer,
    doctorslist: doctorsListSlice.reducer,
    myappointments: myAppointmentsSlice.reducer,
  },
});

export default store;

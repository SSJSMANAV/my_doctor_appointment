import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/auth_slice";
import doctorapplicationsslice from "../slices/doctor_application_slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    doctorapplications: doctorapplicationsslice.reducer,
  },
});

export default store;

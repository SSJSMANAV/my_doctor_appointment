import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { loggedIn: false, role: null, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    replaceLoggedInState(state, action) {},
  },
});

export default authSlice;

export const authSliceActions = authSlice.actions;

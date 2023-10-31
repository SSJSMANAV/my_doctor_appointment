import { authSliceActions } from "../slices/auth_slice";
import axios from "axios";

export const registerPatient = (patient) => {
  return async (dispatch) => {
    const url = "http://localhost:3009/user/signup";
    const formData = new FormData();

    formData.append("name", patient.name);
    formData.append("email", patient.email);
    formData.append("address", patient.address);
    formData.append("dob", patient.dob);
    formData.append("password", patient.password);
    formData.append("image", patient.file);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (e) {}
  };
};

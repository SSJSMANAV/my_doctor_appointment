import { authSliceActions } from "../slices/auth_slice";

export const registerPatient = async (patient) => {
  console.log("register patient");
  const url = "http://localhost:3009/user/signup";

  const imageFile = new File([patient.image], patient.image.name);
  const formData = new FormData();

  formData.append("name", patient.username);
  formData.append("email", patient.email);
  formData.append("address", patient.address);
  formData.append("dob", patient.dob);
  formData.append("password", patient.password);
  formData.append("image", imageFile);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {},
    });
    console.log(response.status);
    const jsonData = await response.json();

    if (response.status === 200) {
      localStorage.setItem("token", jsonData.token);
      localStorage.setItem("role", jsonData.result.role);
      localStorage.setItem("user", JSON.stringify(jsonData.result));
      return jsonData;
    } else {
      console.log(jsonData);
      throw Error(jsonData.message);
    }
  } catch (e) {
    throw Error(e.message);
  }
};

export const loginPatient = async (email, password) => {
  const url = "http://localhost:3009/user/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.status);
    const jsonData = await response.json();
    console.log(jsonData);
    if (response.status === 200) {
      localStorage.setItem("token", jsonData.token);
      localStorage.setItem("role", jsonData.user.role);
      localStorage.setItem("user", JSON.stringify(jsonData.user));
      console.log("tada");
      return jsonData;
    } else {
      throw Error(jsonData.message);
    }
  } catch (e) {
    throw Error(e.message);
  }
};

export const getLoggedInState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);

    if (!token) {
      dispatch(
        authSliceActions.replaceLoggedInState({
          loggedIn: false,
          role: null,
          user: null,
          token: null,
        })
      );
    } else {
      dispatch(
        authSliceActions.replaceLoggedInState({
          loggedIn: true,
          role: role,
          user: user,
          token: token,
        })
      );
    }
  };
};

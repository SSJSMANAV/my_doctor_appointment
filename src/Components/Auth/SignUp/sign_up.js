import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faHouse,
  faCalendar,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerPatient } from "../../../action-creators/auth_action";
import toast from "react-hot-toast";
import { authSliceActions } from "../../../slices/auth_slice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState("");

  const [showPassword, setshowPassword] = useState(false);

  const scrollRef = useRef(0);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("* Username is required."),
    email: Yup.string()
      .email("* Invalid email format.")
      .required("* Email is required."),
    address: Yup.string().required("* Address is required."),
    dob: Yup.string().required("* Date of Birth is required."),
    password: Yup.string().required("* Password is required."),
  });

  useEffect(() => {
    window.scrollTo(0, scrollRef.current);
  }, []);

  return (
    <main className=" flex lin-grad w-full">
      <div className="flex lg:flex-row sm:flex-col lg:w-4/5 mx-auto my-16 border rounded-2xl mt-16 lg:items-start  sm:items-center">
        <div className="lg:w-2/5 h-auto sm:w-4/5 lg:h-full bg-cyan-700  sm:rounded-t-2xl lg:rounded-t-none lg:rounded-tl-2xl lg:rounded-bl-2xl  flex  ">
          <div className="lg:h-1/2  sm:h-full sm:py-32">
            <div className="flex justify-around">
              <h1 className="text-slate-300 font-bold text-3xl">
                Welcome Back!
              </h1>
            </div>
            <div className="w-2/3 my-0 mx-auto flex justify-center mt-4">
              <p className="text-center">
                To keep connected with us, please login with your personal info
              </p>
            </div>

            <div className="flex justify-center mt-8  ">
              <Link
                to="/login"
                className="px-12 py-3 text-white font-semibold bg-cyan-700 rounded-3xl border border-white  hover:border-cyan-200 hover:shadow hover:shadow-cyan-200"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
        <div className="w-4/5 bg-slate-300  lg:rounded-none lg:rounded-tr-2xl lg:rounded-br-2xl sm:rounded-b-2xl">
          <div className="mt-8">
            <div className="flex justify-around">
              <h1 className="text-cyan-700 font-bold text-3xl">
                Sign Up to myDoctor
              </h1>
            </div>

            <Formik
              initialValues={{
                username: "",
                email: "",
                address: "",
                dob: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                if (!imageFile) {
                  return;
                }
                console.log("tada");
                await registerPatient({
                  username: values.username,
                  email: values.email,
                  address: values.address,
                  dob: values.dob,
                  password: values.password,
                  image: imageFile,
                })
                  .then((data) => {
                    toast.success("Signed in successfully.");

                    dispatch(
                      authSliceActions.replaceLoggedInState({
                        loggedIn: true,
                        role: data.result.role,
                        user: data.result,
                        token: data.token,
                      })
                    );
                    navigate("/home");
                  })
                  .catch((e) => {
                    toast.error(e.message);
                  });
              }}
            >
              {() => (
                <Form>
                  <div className="relative mt-4 flex justify-center">
                    <div className="relative w-8/12">
                      <div className="flex items-center">
                        <Field
                          type="text"
                          name="username"
                          className="w-full border border-gray-300 rounded pl-10 py-2 pr-3 focus:outline-none focus:ring focus:border-blue-300"
                          placeholder="Username"
                        />
                        <div className="absolute pl-3 flex items-center">
                          <FontAwesomeIcon
                            icon={faUser}
                            className="text-gray-500"
                          />
                        </div>
                      </div>
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-red-500 pt-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="relative mt-4 flex justify-center">
                    <div className="relative w-8/12">
                      <div className="flex items-center">
                        <Field
                          type="text"
                          name="email"
                          className="w-full border border-gray-300 rounded pl-10 py-2 pr-3 focus:outline-none focus:ring focus:border-blue-300"
                          placeholder="Email"
                        />
                        <div className="absolute pl-3 flex items-center">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="text-gray-500"
                          />
                        </div>
                      </div>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 pt-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="relative mt-4 flex justify-center">
                    <div className="relative w-8/12">
                      <div className="flex items-center">
                        <Field
                          type="text"
                          name="address"
                          className="w-full border border-gray-300 rounded pl-10 py-2 pr-3 focus:outline-none focus:ring focus:border-blue-300"
                          placeholder="Address"
                        />
                        <div className="absolute pl-3 flex items-center">
                          <FontAwesomeIcon
                            icon={faHouse}
                            className="text-gray-500"
                          />
                        </div>
                      </div>
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-red-500 pt-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="relative mt-4 flex justify-center">
                    <div className="relative w-8/12">
                      <div className="flex items-center">
                        <Field
                          type="date"
                          name="dob"
                          className="w-full border font-light text-gray-400 border-gray-300 rounded pl-10 py-2 pr-3 focus:outline-none focus:ring focus:border-blue-300"
                          placeholder="Date of Birth"
                        />
                        <div className="absolute pl-3 flex items-center">
                          <FontAwesomeIcon
                            icon={faCalendar}
                            className="text-gray-500"
                          />
                        </div>
                      </div>
                      <ErrorMessage
                        name="dob"
                        component="div"
                        className="text-red-500 pt-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="relative mt-4 flex justify-center">
                    <div className="relative w-8/12">
                      <div className="flex items-center">
                        <Field
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className="w-full border border-gray-300 rounded pl-10 py-2 pr-8 focus:outline-none focus:ring focus:border-blue-300"
                          placeholder="Password"
                        />
                        <div className="absolute pl-3 flex items-center">
                          <FontAwesomeIcon
                            icon={faLock}
                            className="text-gray-500"
                          />
                        </div>
                        <div className="absolute right-2 flex items-center">
                          <FontAwesomeIcon
                            onClick={() => {
                              setshowPassword(!showPassword);
                            }}
                            icon={showPassword ? faEyeSlash : faEye}
                            className="text-gray-500"
                          />
                        </div>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 pt-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="relative mt-4 flex justify-center">
                    <div className="relative w-8/12">
                      <div className="flex items-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) => {
                            console.log("changed");
                            const file = event.target.files[0];
                            setImageFile(file);
                          }}
                        />
                      </div>
                      {!imageFile && (
                        <div className="text-red-500 pt-2 text-sm">
                          File is Required
                        </div>
                      )}
                      {/* <ErrorMessage
                        name="image"
                        component="div"
                        className="text-red-500"
                      /> */}
                    </div>
                  </div>

                  <div className="flex justify-center mt-4  mb-8 ">
                    <button
                      className="px-12 py-3 text-white font-semibold bg-cyan-700 rounded-3xl"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;

import React, { useEffect, useRef, useState } from "react";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginPatient } from "../../../action-creators/auth_action";
import { authSliceActions } from "../../../slices/auth_slice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const scrollRef = useRef(0);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("* Invalid email address.")
      .required("* Email is required."),
    password: Yup.string().required("* Password is required."),
  });

  const [showPassword, setshowPassword] = useState(false);

  useEffect(() => {
    window.scrollTo(0, scrollRef.current);
  }, []);

  return (
    <main className="lg:main-container lg:justify-center lg:items-center flex lg:flex-row bg-white lin-grad sm:flex-col  ">
      <div className="flex lg:flex-row mt-20 sm:flex-col lg:items-start lg:h-full sm:items-center sm:flex-col-reverse">
        <div className="lg:w-3/5 bg-slate-300 lg:h-96 lg:pb-20 lg:mt-0 sm:w-4/5 sm:pb-12 lg:pb-0 sm:mb-20">
          <div className="mt-10">
            <div className="flex justify-around">
              <div className="flex lg:flex-row sm:flex-col">
                <h1 className="text-cyan-700 font-bold text-3xl pr-3">
                  Sign in to
                </h1>
                <h1 className="text-orange-400 font-bold text-3xl">
                  {" "}
                  myDoctor
                </h1>
              </div>
            </div>

            <div className="flex justify-center mt-1">
              <p>Use your email account</p>
            </div>
            <div className="relative mt-4 flex justify-center">
              {/* <div className="relative w-8/12"> */}
              <div className="flex items-center">
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    await loginPatient(values.email, values.password)
                      .then((data) => {
                        toast.success("Signed in successfully");
                        dispatch(
                          authSliceActions.replaceLoggedInState({
                            loggedIn: true,
                            role: data.user.role,
                            user: data.user,
                            token: data.token,
                          })
                        );
                        navigate("/home");
                        setSubmitting(false);
                      })
                      .catch((e) => {
                        toast.error(e.message);
                        setSubmitting(false);
                      });
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="relative flex-col justify-center items-center">
                        <div className="flex items-center">
                          <Field
                            type="text"
                            name="email"
                            className="w-full border border-gray-300 rounded pl-10 py-2 pr-3 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Email"
                          />
                          <div className="absolute pl-2 flex items-center">
                            <FontAwesomeIcon
                              icon={faEnvelope}
                              className="text-gray-500"
                            />
                          </div>
                        </div>
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm pt-2"
                        />
                      </div>
                      <div className="relative mt-4 flex flex-col justify-center">
                        <div className="flex items-center">
                          <Field    
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            className="w-full border border-gray-300 rounded pl-10 py-2 pr-8 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Password"
                          />
                          <div className="absolute pl-2 flex items-center">
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
                          className="text-red-500 text-sm pt-2"
                        />
                      </div>

                      <div className="flex justify-center mt-8">
                        <button
                          type="submit"
                          className="h-12 w-32  text-white font-semibold bg-cyan-700 rounded-3xl"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <ClipLoader size={25} color="white"></ClipLoader>
                          ) : (
                            "Sign In"
                          )}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
        <div className="lg:h-96 bg-cyan-700  sm:w-4/5 lg:pb-1.5 ">
          <div className="flex flex-col lg:my-28 sm:my-24 lg:h-60  ">
            <div className="text-3xl flex justify-center mb-8 text-gray-200 font-semibold">
              <h1>Hello, Friend!</h1>
            </div>
            <div className="lg:w-2/4 sm:w-full lg:ml-24 text-center flex sm:justify-center sm:items-center text-gray-100 sm">
              <p className="sm:w-3/4 ">
                Enter your personal details and start the journey with us.
              </p>
            </div>
            <div className="flex justify-center mt-10">
              <Link
                to={"/signup"}
                className="px-10 py-2 bg-transparent rounded-3xl font-semibold text-gray-200 border-gray-200 border-2"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default LogIn;

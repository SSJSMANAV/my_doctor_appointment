import React from "react";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginPatient } from "../../../action-creators/auth_action";
import { authSliceActions } from "../../../slices/auth_slice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <main className="main-container flex bg-white lin-grad">
      
      <div className="w-3/5 bg-slate-300 mt-12">
        <div className="mt-16">
          <div className="flex justify-around">
            <div className="flex flex-row">
              <h1 className="text-cyan-700 font-bold text-3xl pr-3">
                Sign in to
              </h1>
              <h1 className="text-orange-400 font-bold text-3xl"> myDoctor</h1>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <p>Use your email account</p>
          </div>
          <div className="relative mt-4 flex justify-center">
            <div className="relative w-8/12">
              <div className="flex items-center">
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (values) => {
                    await loginPatient(values.email, values.password)
                      .then((data) => {
                        toast.success('Signed in successfully');
                        dispatch(
                          authSliceActions.replaceLoggedInState({
                            loggedIn: true,
                            role: data.user.role,
                            user: data.user,
                            token: data.token,
                          })
                        );
                        navigate('/home');
                      })
                      .catch((e) => {
                        toast.error(e.message);
                      });
                  }}
                >
                  <Form>
                    <div>
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
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div className="relative mt-4 flex justify-center">
                      <div className="relative w-8/12">
                        <div className="flex items-center">
                          <Field
                            type="password"
                            name="password"
                            className="w-full border border-gray-300 rounded pl-10 py-2 pr-3 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Password"
                          />
                          <div className="absolute pl-2 flex items-center">
                            <FontAwesomeIcon
                              icon={faLock}
                              className="text-gray-500"
                            />
                          </div>
                        </div>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div className="flex justify-center">
                      <div className="mt-6 border border-gray-200 px-2 py-1 cursor-pointer hover:shadow-cyan-300 hover:text-gray-600">
                        <div>Forgot your Password ?</div>
                      </div>
                    </div>
                    <div className="flex justify-center mt-8">
                      <button
                        type="submit"
                        className="px-12 py-3 text-white font-semibold bg-cyan-700 rounded-3xl"
                      >
                        Sign In
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="2/5 bg-cyan-700 mt-12">
        <div className="flex flex-col my-40 h-1/2">
          <div className="text-3xl flex justify-center mb-8 text-gray-200 font-semibold">
            <h1>Hello, Friend!</h1>
          </div>
          <div className="w-2/4 ml-24 text-center flex justify-center text-gray-100">
            <p>Enter your personal details and start the journey with us.</p>
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
    </main>
  );
};

export default LogIn;

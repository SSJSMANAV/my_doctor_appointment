import React from "react";
import "./signup.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faGooglePlusG } from "@fortawesome/free-brands-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faReddit,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const SignUp = () => {
  const SignUp = () => {
    toast("Sign Up Successfull");
  };

  return (
    <main class="container flex bg-blue-500">
      <div className="flex w-4/5 mx-auto my-16  border rounded-2xl mt-32">
        <div className="w-2/5 h-auto bg-cyan-700 pb-28 rounded-s-2xl">
          <div className="mt-44">
            <div className="flex justify-around">
              <h1 className="text-slate-300 font-bold text-3xl">
                Welcome Back!
              </h1>
            </div>

            <div className="w-2/3 my-0 mx-auto flex justify-center mt-4">
              <p className="text-center">
                To keep connected with us please login with your personal info
              </p>
            </div>

            <div className="flex justify-center mt-8 mb-20 ">
              <Link
                to="/login"
                className="px-12 py-3 text-white font-semibold bg-cyan-700 rounded-3xl border border-white  hover:border-cyan-200 hover:shadow hover:shadow-cyan-200 "
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Right Container */}
        <ToastContainer
          position="top-left"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="w-4/5 bg-slate-300 rounded-e-2xl">
          <div className="mt-8">
            <div className="flex justify-around">
              <h1 className="text-cyan-700 font-bold text-3xl">
                Sign in to Diprella
              </h1>
            </div>
            <div className="flex justify-center mt-4 ">
              <FontAwesomeIcon
                icon={faFacebookF}
                className="px-4 py-3 mr-5 mt-1.5 text-lg border border-2 border-gray-200 bor-rad cursor-pointer hover:border-cyan-200 hover:shadow hover:shadow-cyan-200"
              />
              <FontAwesomeIcon
                icon={faGooglePlusG}
                className="px-3 py-3 mr-5 mt-1.5 text-lg border border-2 border-gray-200 bor-rad cursor-pointer hover:border-cyan-200 hover:shadow hover:shadow-cyan-200"
              />
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="px-3.5 py-3 mr-5 mt-1.5 text-lg border border-2 border-gray-200 bor-rad cursor-pointer hover:border-cyan-200 hover:shadow hover:shadow-cyan-200"
              />
            </div>
            <div className="flex justify-center mt-4">
              <p>or use your email for registration</p>
            </div>
            <div className="relative mt-4 flex justify-center">
              <div className="relative w-8/12">
                <div className="flex items-center">
                  <input
                    type="text"
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
              </div>
            </div>

            <div className="relative mt-4 flex justify-center">
              <div className="relative w-8/12">
                <div className="flex items-center">
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded pl-10 py-2 pr-3 focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Email"
                  />
                  <div className="absolute pl-2 flex items-center">
                    <FontAwesomeIcon
                      icon={faGooglePlusG}
                      className="text-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="relative mt-4 flex justify-center">
              <div className="relative w-8/12">
                <div className="flex items-center">
                  <input
                    type="password"
                    className="w-full border border-gray-300 rounded pl-10 py-2 pr-3 focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Password"
                  />
                  <div className="absolute pl-2 flex items-center">
                    <FontAwesomeIcon
                      icon={faGooglePlusG}
                      className="text-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="relative mt-4 flex justify-center">
              <div className="relative w-8/12">
                <div className="flex items-center">
                  <input
                    type="date"
                    className="w-full border font-light text-gray-400 border-gray-300 rounded pl-10 py-2 pr-3 focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Password"
                  />
                  <div className="absolute pl-2 flex items-center">
                    <FontAwesomeIcon
                      icon={faGooglePlusG}
                      className="text-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center ">
              <div className="mt-6  flex justify-center border border-gray-200 w-1/3 cursor-pointer shadow shadow-white  hover:shadow-cyan-300 hover:text-gray-600 ">
                <a href="#">Forgot your Password</a>
              </div>
            </div>
            <div className="flex justify-center mt-8 mb-20 ">
              <button
                onClick={SignUp}
                className="px-12 py-3 text-white font-semibold bg-cyan-700 rounded-3xl"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;

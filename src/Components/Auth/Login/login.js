import React from "react";
import "./login.css";
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

const LogIn = () => {
  const SignIn = () => {
    toast("Sign In Successfull");
  };
  return (
    <main class="main-container flex bg-black ">
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
      <div className="w-3/5 bg-slate-300 mt-12 ">
        <div className="mt-16 ">
          <div className="flex justify-around ">
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
            <p>or use your email account</p>
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
          <div className="flex justify-center mt-8  ">
            <button
              onClick={SignIn}
              className="px-12 py-3 text-white font-semibold bg-cyan-700 rounded-3xl"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
      <div className="2/5 bg-cyan-700 mt-12">
        <div className="flex flex-col my-40 h-1/2">
          <div className="text-3xl flex justify-center mb-8 text-gray-200 font-semibold">
            <h1>Hello, Friend!</h1>
          </div>
          <div className="w-2/4 ml-24 text-center flex justify-center text-gray-100">
            <p>Enter your personal details and start journey with us.</p>
          </div>
          <div className="flex justify-center mt-10">
            <Link
              to={"/signup"}
              className="px-10 py-2 bg-transparent rounded-3xl font-semibold text-gray-200 border border-gray-200 border-2"
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

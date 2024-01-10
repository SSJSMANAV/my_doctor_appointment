import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faReddit,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-200 shawdow sm:w-full">
      <div className="lg:w-4/6 lg:flex lg:flex-row sm:flex-col lg:my-0 lg:mx-auto py-12 ">
        <div className="lg:w-2/5 sm:w-full sm:px-12">
          <div className="text-left">
            <h2>myDoctor</h2>
            <p className=" text-xs  text-gray-700">
              Copyright @2023 developed by Barsha Ramtel. All rights reserved.
            </p>
            <div className="mt-4 cursor-pointer">
              <FontAwesomeIcon
                icon={faFacebookF}
                className="border-2 border-black px-3.5 py-2 rounded-sm hover:text-blue-500 hover:border-blue-500"
                style={{}}
              />
              <FontAwesomeIcon
                icon={faInstagram}
                className="border-2 border-black ml-2 px-3 py-2 rounded-sm hover:text-red-600 hover:border-red-600"
                style={{}}
              />
              <FontAwesomeIcon
                icon={faLinkedin}
                className="border-2 border-black ml-2 px-3 py-2 rounded-sm  hover:border-blue-500 hover:text-blue-500"
                style={{}}
              />
              <FontAwesomeIcon
                icon={faReddit}
                className="border-2 border-black ml-2 px-3 py-2 rounded-sm  hover:text-orange-500 hover:border-orange-500"
                style={{}}
              />
            </div>
          </div>
        </div>
        <div className="lg:w-3/5 sm:w-full sm:pl-10">
          <div className="grid lg:grid-cols-3 lg:pl-8 ">
            {/* 1 */}
            <div className="flex flex-col lg:pt-1  items-start lg:text-left sm:justify-center sm:pt-10">
              <h1 className="font-semibold text-lg pb-4">Quick Links</h1>
              <div className="flex flex-col sm:h-fit md:h-40 justify-start gap-y-5 mt-3 text-gray-700">
                <p
                  onClick={() => {
                    navigate("/home");
                  }}
                  className=" hover:text-slate-950 cursor-pointer"
                >
                  Home
                </p>
                <p
                  onClick={() => {
                    navigate("/find-doctors");
                  }}
                  className=" hover:text-slate-950 cursor-pointer"
                >
                  Services
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className="flex flex-col lg:pt-1  items-start lg:text-left sm:justify-center sm:pt-10">
              <h1 className="font-semibold text-lg pb-4">I want to: </h1>
              <div className="flex flex-col sm:h-fit md:h-40 justify-start mt-3 gap-y-5 text-gray-700">
                <p
                  onClick={() => {
                    navigate("/find-doctors");
                  }}
                  className=" hover:text-slate-950 cursor-pointer"
                >
                  Find a Doctor
                </p>
                <p
                  onClick={() => {
                    navigate("/doctor-signup-request");
                  }}
                  className=" hover:text-slate-950 cursor-pointer"
                >
                  Become a Doctor
                </p>
                <p
                  onClick={() => {
                    navigate("/find-doctors");
                  }}
                  className=" hover:text-slate-950 cursor-pointer"
                >
                  Find a Location
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className="flex flex-col lg:pt-1  items-start lg:text-left sm:justify-center sm:pt-10">
              <h1 className="font-semibold text-lg pb-4">Support</h1>
              <div className="flex flex-col sm:h-fit md:h-40 justify-start gap-y-5 mt-3 text-gray-700">
                <p
                  onClick={() => {
                    navigate("/checkout-form");
                  }}
                  className=" hover:text-slate-950 cursor-pointer"
                >
                  Donate
                </p>
                <p
                  onClick={() => {
                    navigate("/home");
                  }}
                  className=" hover:text-slate-950 cursor-pointer"
                >
                  About Us
                </p>
                <p
                  onClick={() => {
                    navigate("/login");
                  }}
                  className=" hover:text-slate-950 cursor-pointer"
                >
                  {" "}
                  Login
                </p>
                <p></p>
                <p></p>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

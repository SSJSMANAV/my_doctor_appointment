import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faReddit,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-500 sm:w-full">
      <div className="lg:w-4/6 lg:flex lg:flex-row sm:flex-col lg:my-0 lg:mx-auto py-12 ">
        <div className="lg:w-2/5 sm:w-full sm:px-12">
          <div className="text-left">
            <h2>myDoctor</h2>
            <p className=" text-xs  text-gray-700">
              Copyright @2023 developed by Everest Hostelers All rights reserved
            </p>
            <div className="mt-4 cursor-pointer">
              <FontAwesomeIcon
                icon={faFacebookF}
                className="border border-black px-3.5 py-2 rounded-sm "
                style={{}}
              />
              <FontAwesomeIcon
                icon={faInstagram}
                className="border border-black ml-2 px-3 py-2 rounded-sm  "
                style={{}}
              />
              <FontAwesomeIcon
                icon={faLinkedin}
                className="border border-black ml-2 px-3 py-2 rounded-sm  "
                style={{}}
              />
              <FontAwesomeIcon
                icon={faReddit}
                className="border border-black ml-2 px-3 py-2 rounded-sm  "
                style={{}}
              />
            </div>
          </div>
        </div>
        <div className="lg:w-3/5 sm:w-full">
          <div className="grid lg:grid-cols-3 lg:pl-8 ">
            <div className="flex flex-col lg:pt-1  items-center lg:text-left sm:justify-center sm:pt-10">
              <h1 className="font-semibold text-lg pb-4">Quick Links</h1>
              <div className="flex flex-col h-40 justify-between mt-3 text-gray-700">
                <p className=" hover:text-gray-200 cursor-pointer">Home</p>
                <p className=" hover:text-gray-200 cursor-pointer">About Us</p>
                <p className=" hover:text-gray-200 cursor-pointer">Services</p>
                <p className=" hover:text-gray-200 cursor-pointer">Blog</p>
              </div>
            </div>
            {/* <div className="flex flex-col items-center justify-center lg:text-left sm:justify-center">
              <h1 className="font-semibold text-lg pb-4">Quick Links</h1>
              <div className="flex flex-col h-40 justify-between mt-3 text-gray-700">
                <p className="hover:text-gray-200 cursor-pointer">Home</p>
                <p className="hover:text-gray-200 cursor-pointer">About Us</p>
                <p className="hover:text-gray-200 cursor-pointer">Services</p>
                <p className="hover:text-gray-200 cursor-pointer">Blog</p>
              </div>
            </div> */}

            <div className="flex flex-col lg:pt-1  items-center lg:text-left sm:justify-center sm:pt-10">
              <h1 className="font-semibold text-lg pb-4">I want to: </h1>
              <div className="flex flex-col h-40 justify-between mt-3 text-gray-700">
                <p className=" hover:text-gray-200 cursor-pointer">
                  Find a Doctor
                </p>
                <p className=" hover:text-gray-200 cursor-pointer">
                  Request an Appointment
                </p>
                <p className=" hover:text-gray-200 cursor-pointer">
                  Find a Location
                </p>
                <p className=" hover:text-gray-200 cursor-pointer">
                  Get a Opinion
                </p>
              </div>
            </div>
            <div className="flex flex-col lg:pt-1  items-center lg:text-left sm:justify-center sm:pt-10">
              <h1 className="font-semibold text-lg pb-4">Support</h1>
              <div className="flex flex-col h-40 justify-between mt-3 text-gray-700">
                <p className=" hover:text-gray-200 cursor-pointer">Donate</p>
                <p className=" hover:text-gray-200 cursor-pointer">About Us</p>
                <p></p>
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
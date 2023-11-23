import React, { useState, useEffect } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ServiceCard = ({ title, description, index, color }) => (
  <div className={`bg-slate-300 p-4 rounded-2xl`}>
    <h1 className="text-xl text-left font-medium">{title}</h1>
    <p className="text-left mt-2 text-sm font-normal w-4/5">{description}</p>
    <div className="flex justify-between mt-5 mb-5">
      <button
        className={`bg-blue-600 text-white rounded-full px-5 py-1 mt-4 hover:transform transition-all hover:translate-x-2 duration-300 ease-in-out`}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
      <div className="mt-4">
        <p
          className={`bg-${color}-200 px-3 py-1`}
          style={{ borderRadius: "8px" }}
        >
          {index}
        </p>
      </div>
    </div>
  </div>
);

const MedicalServices = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const medicalServicesData = [
    {
      title: "Cancer Care",
      description:
        "World-class for everyone. Our health System offers unmatched expert health care. From the lab to the clinic",
      number: 1,
    },
    {
      title: "Labor & Delivery",
      description:
        "World-class for everyone. Our health System offers unmatched expert health care. From the lab to the clinic",
      number: 2,
    },
    {
      title: "Heart & Vascular",
      description:
        "World-class for everyone. Our health System offers unmatched expert health care. From the lab to the clinic",
      number: 3,
    },
    {
      title: "Mental Health",
      description:
        "World-class for everyone. Our health System offers unmatched expert health care. From the lab to the clinic",
      number: 4,
    },
    {
      title: "Neurology",
      description:
        "World-class for everyone. Our health System offers unmatched expert health care. From the lab to the clinic",
      number: 5,
    },
    {
      title: "Burn Treatment",
      description:
        "World-class for everyone. Our health System offers unmatched expert health care. From the lab to the clinic",
      number: 6,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 800);
    };

    // Initial check on mount
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % medicalServicesData.length
    );
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + medicalServicesData.length) %
        medicalServicesData.length
    );
  };

  return (
    <div className="relative lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-10 lg:mt-20 sm:mt-10 ">
      {medicalServicesData.map((data, index) => (
        <div
          key={index}
          className={`w-full ${
            !isSmallScreen || index === currentIndex ? "block" : "hidden"
          }`}
        >
          <ServiceCard
            title={data.title}
            description={data.description}
            index={index + 1}
            color={index % 2 === 0 ? "blue" : "purple"}
          />
        </div>
      ))}

      {/* Buttons outside the map function */}

      {isSmallScreen && (
        <>
          <button
            className="absolute -left-10 top-1/2 transform -translate-y-1/2 text-slate-500  px-2 py-1 rounded-xl text-3xl  btn-left"
            onClick={handlePrev}
          >
            {"<"}
          </button>
          <button
            className="absolute -right-10 top-1/2 transform -translate-y-1/2 text-slate-500  px-2 py-1 rounded-xl text-3xl  btn-right"
            onClick={handleNext}
          >
            {">"}
          </button>
        </>
      )}
    </div>
  );
};

export default MedicalServices;

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ReviewBox = ({ author, rating, content, image }) => (
  <div className="flex mx-2 mb-4  ">
    <div className="bg-blue-200 w-full p-6 flex justify-between rounded-2xl shadow-lg shadow-slate-400">
      <div className="flex flex-col ">
        <div className="flex">
          <img
            src={image}
            style={{ width: "15%", height: "auto", borderRadius: "5px" }}
            alt="Doctor"
            className="object-cover"
          />
          <div>
            <p className="text-sm ml-3 ">{author}</p>
            <div className="text-yellow-400 sm:ml-3 sm:text-left">
              {[...Array(rating)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  style={{ fontSize: "0.7rem" }}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-4"></div>
        </div>
        <div className="mt-4 text-sm text-left font-light">
          <p>{content}</p>
        </div>
      </div>
    </div>
  </div>
);

const Review = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const reviewData = [
    {
      author: "Sagar Prajapati",
      rating: 5,
      content:
        "World class for everyone. Our health System offers unmatched, expert healthcare",
      image: process.env.PUBLIC_URL + "/img/doctor-1.png",
    },
    {
      author: "Sagar Sunar",
      rating: 5,
      content:
        "World class for everyone. Our health System offers unmatched, expert healthcare",
      image: process.env.PUBLIC_URL + "/img/doctor-1.png",
    },
    {
      author: "Prabin Danuwar",
      rating: 5,
      content:
        "World class for everyone. Our health System offers unmatched, expert healthcare",
      image: process.env.PUBLIC_URL + "/img/doctor-1.png",
    },
    // Add more reviews as needed
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
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviewData.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviewData.length) % reviewData.length
    );
  };

  return (
    <div
      className={`relative lg:flex lg:flex-row lg:justify-center lg:mt-20 sm:mt-10`}
    >
      {reviewData.map((data, index) => (
        <div
          key={index}
          className={`w-full ${
            !isSmallScreen || index === currentIndex ? "block" : "hidden"
          }`}
        >
          <ReviewBox
            author={data.author}
            rating={data.rating}
            content={data.content}
            image={data.image}
          />
        </div>
      ))}
      {/* Navigation buttons */}
      {isSmallScreen && (
        <>
          <button
            className="absolute -left-10 top-1/2 transform -translate-y-1/2 text-slate-500  px-2 py-1 rounded-xl text-3xl  btn-left"
            onClick={handlePrev}
          >
            {"<"}
          </button>
          <button
            className="absolute -right-10 top-1/2 transform -translate-y-1/2 text-slate-500  px-2 py-1 rounded-xl text-3xl   btn-right"
            onClick={handleNext}
          >
            {">"}
          </button>
        </>
      )}
    </div>
  );
};

export default Review;

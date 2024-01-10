import React, { useEffect } from "react";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/dist";
import toast from "react-hot-toast";

const reviews = [
  {
    user: {
      name: "John Doe",
      profileImage: "user1.jpg", // Replace with the path to the user's profile image
    },
    rating: 4,
    description: "Great experience! I highly recommend this service.",
  },
  {
    user: {
      name: "Alice Smith",
      profileImage: "user2.jpg", // Replace with the path to the user's profile image
    },
    rating: 5,
    description: "The best service I've ever used. 5 stars!",
  },
  {
    user: {
      name: "Alice Smith",
      profileImage: "user2.jpg", // Replace with the path to the user's profile image
    },
    rating: 5,
    description: "The best service I've ever used. 5 stars!",
  },
  {
    user: {
      name: "Alice Smith",
      profileImage: "user2.jpg", // Replace with the path to the user's profile image
    },
    rating: 5,
    description: "The best service I've ever used. 5 stars!",
  },
  // Add more review objects as needed
];

const RatingsAndReviews = () => {
  const [reviews, setReviews] = useState([]);

  const { doctorId } = useParams();

  const authState = useSelector((state) => {
    return state.auth;
  });

  const token = authState.token;

  const fetchReviews = async () => {
    try {
      const url = `http://localhost:3009/feedback/${doctorId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.status);
      const jsonData = await response.json();
      if (response.status === 200) {
        console.log(jsonData);
        setReviews(jsonData.result);
      } else {
        toast.error(jsonData.message);
        setReviews([]);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="h-96 w-full bg-white overflow-y-auto pt-5 mt-10">
      {reviews.length === 0 && (
        <p className="text-center pt-10 text-black text-sm font-bold">
          {" "}
          No reviews found!!!
        </p>
      )}
      {reviews.length > 0 && (
        <div>
          {reviews.map((review, index) => (
            <ReviewItem key={index} review={review} />
          ))}
        </div>
      )}
    </div>
  );
};

const ReviewItem = ({ review }) => (
  <div className="border p-4 mb-4">
    <div className="flex items-center">
      {/* <img
        src={process.env.PUBLIC_URL + "/img/doctor-1.png"}
        alt={review.user.name}
        className="w-12 h-12 rounded-full mr-4 object-cover"
      /> */}
      <div>
        <h3 className="font-semibold text-lg">{review.username}</h3>
        <Rating name="simple-controlled" value={review.rating} onChange={() => {}} />
      </div>
    </div>
    <p className="mt-3">{review.comment}</p>
  </div>
);

export default RatingsAndReviews;

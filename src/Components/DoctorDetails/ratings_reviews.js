import React from "react";
import Rating from "@mui/material/Rating";

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
  // Add more review objects as needed
];  

const RatingsAndReviews = () => {
  return (
    <div className="flex flex-col mt-5">
      {reviews.map((review, index) => (
        <ReviewItem key={index} review={review} />
      ))}
    </div>
  );
};

const ReviewItem = ({ review }) => (
  <div className="border p-4 mb-4">
    <div className="flex items-center">
      <img
        src={process.env.PUBLIC_URL + "/img/doctor-1.png"}
        alt={review.user.name}
        className="w-12 h-12 rounded-full mr-4 bg-cover"
      />
      <div>
        <h3 className="font-semibold text-lg">{review.user.name}</h3>
          <Rating name="simple-controlled" value={4} onChange={() => {}} />
      </div>
    </div>
    <p className="mt-3">{review.description}</p>
  </div>
);

export default RatingsAndReviews;

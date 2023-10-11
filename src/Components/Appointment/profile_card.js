import React from 'react';

const ProfileCard = (props) => {
  return (
    <div className="w-64 text-center m-4 bg-white rounded-lg shadow-md p-4 my-0 mx-auto pt-12">
      <div className="rounded-full overflow-hidden mx-auto w-24 h-24 ">
        <img
          src={process.env.PUBLIC_URL + props.doctor.image}
          alt={'alt'}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-bold text-gray-50000">{props.doctor.name}</h2>
        <p className="text-gray-400">Speciality: {props.doctor.speciality}</p>
      </div>
      <div className="mt-4 flex justify-around">
        <button className="bg-blue-500 text-white rounded-sm py-2 px-4 hover:bg-blue-700">
          View Profile
        </button>
        <button className="bg-green-500 text-white rounded-sm py-2 px-4 hover:bg-green-700">
          Book 
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;

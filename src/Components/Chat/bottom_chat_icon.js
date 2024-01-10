import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BottomChatIcon = () => {
  const navigate = useNavigate();

  const authState = useSelector((state) => {
    return state.auth;
  });
  const isLoggedIn = authState.loggedIn;
  const role = authState.role;

  const navigateToChatsPage = () => {
    navigate(`chats/${authState.user._id}`);
  };
  return (
    <div>
      {isLoggedIn && role !== "admin" && (
        <div
          onClick={navigateToChatsPage}
          className="z- fixed bottom-6 left-6 bg-blue-500 rounded-full h-16 w-16 flex flex-col justify-center items-center transition-all cursor-pointer hover:scale-110 ease-in-out"
        >
          <FontAwesomeIcon
            className="text-white text-3xl "
            icon={faMessage}
          ></FontAwesomeIcon>
        </div>
      )}
    </div>
  );
};

export default BottomChatIcon;

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ChatUsers from "./chat-users";
import ChatMessages from "./chat_message";

const ChatScreen = () => {

  const scrollRef = useRef(0);

  const [selectedChat, setSelectedChat] = useState(null);
  const [doctorId, setdoctorId] = useState("");
  const [patientId, setpatientId] = useState("");
  const [userImage, setUserImage] = useState("");

  const authState = useSelector((state) => {
    return state.auth;
  });

  const role = authState.user.role;
  const userId = authState.user._id;

  const selectChat = (id, image) => {
    console.log("sent by user");
    console.log(id);
    console.log(image);
    
    if (role === "patient") {
      setdoctorId(id);
      setpatientId(userId);
      setUserImage(image);
    } else {
      setpatientId(id);
      setdoctorId(userId);
      setUserImage(image);
    }

    console.log("chat selection");
    setSelectedChat(id);
  };

  useEffect(() => {
    window.scrollTo(0, scrollRef.current);
  }, []);

  return (
    <div className="h-screen  w-full flex flex-row">
      <div className="w-1/4 pt-20 bg-sky-100 overflow-y-auto overflow-hidden">
        <ChatUsers selectChat={selectChat}></ChatUsers>
      </div>
      <div className="h-full w-0.5 bg-gray-400"></div>
      <div className="w-3/4 pt-20 bg-sky-100">
        {selectedChat === null && (
          <p className="text-center text-lg font-bold"> No chat selected.</p>
        )}
        {selectedChat !== null && (
          <ChatMessages
            image={userImage}
            userId={userId}
            doctorId={doctorId}
            patientId={patientId}
          ></ChatMessages>
        )}
      </div>
    </div>
  );
};

export default ChatScreen;

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  fetchLastChatMessage,
  fetchTheChatUsers,
} from "../../action-creators/chat_action";

const ChatUsers = ({ selectChat }) => {
  const [chatUsers, setChatUsers] = useState([]);
  const [selectedChat, setSelectedChat] = useState("");

  const authState = useSelector((state) => {
    return state.auth;
  });

  const role = authState.role;
  const userId = authState.user._id;

  useEffect(() => {
    const fetchChatUsers = async () => {
      await fetchTheChatUsers(role, userId)
        .then((data) => {
          if (data.length === 0) {
            setChatUsers([]);
          }
          setChatUsers(data);
        })
        .catch((e) => {
          setChatUsers([]);
          toast.error(e.message);
        });
    };

    fetchChatUsers();
  }, [role, userId]);

  return (
    <div>
      {chatUsers.length === 0 && (
        <div className=" pl-3 text-black text-sm">
          {" "}
          You have no available chats.
        </div>
      )}
      {chatUsers.length > 0 && role === "patient" && (
        <div className="flex flex-col gap">
          {chatUsers.map((user) => (
            <div
              onClick={() => {
                console.log("click garepachi user");
                console.log(user.image);
                selectChat(user.doctorId, user.image);
                setSelectedChat(user.doctorId);
              }}
              className={`transition-all ease-in-out ${
                selectedChat === user.doctorId ? "bg-sky-300" : "bg-sky-100"
              } text-white flex flex-row justify-start items-center px-3 py-3 gap-x-2 bg-sky-100 hover:bg-sky-200 cursor-pointer `}
            >
              <ChatUserHead
                doctorId={user.doctorId}
                patientId={userId}
                user={user}
              ></ChatUserHead>
            </div>
          ))}
        </div>
      )}
      {chatUsers.length > 0 && role === "doctor" && (
        <div className="flex flex-col gap">
          {chatUsers.map((user) => (
            <div
              onClick={() => {
                console.log("selection ma");
                console.log(user.image);
                console.log("selection ma");
                selectChat(user._id, user.image);
                setSelectedChat(user._id);
              }}
              className={`transition-all ease-in-out ${
                selectedChat === user._id ? "bg-sky-300" : "bg-sky-100"
              } text-white flex flex-row justify-start items-center px-3 py-3 gap-x-2 bg-sky-100 hover:bg-sky-200 cursor-pointer `}
            >
              <ChatUserHead
                role={role}
                doctorId={userId}
                patientId={user._id}
                user={user}
              ></ChatUserHead>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatUsers;

const ChatUserHead = ({ role, doctorId, patientId, user }) => {
  const authState = useSelector((state) => {
    return state.auth;
  });

  const userId = authState.user._id;

  const [lastMessage, setlastMessage] = useState("");

  useEffect(() => {
    const unsubscribe = fetchLastChatMessage(
      doctorId,
      patientId,
      (messages) => {
        if (messages.length === 0) {
          setlastMessage([]);
        } else {
          setlastMessage(messages);
        }
      }
    );

    return () => {
      // Cleanup the listener when the component unmounts
      unsubscribe();
    };
  }, [doctorId, patientId]);

  return (
    <div className="flex flex-row gap-x-2 items-center">
      <img
        alt={user.image}
        src={`http://localhost:3009/assets/${user.image}`}
        className="h-11 w-11 rounded-full object-cover"
      ></img>
      <div className="flex flex-col">
        <p className="text-sm font-bold text-black">
          {" "}
          {role === "doctor" ? user.name : user.username}{" "}
        </p>
        {lastMessage.length !== 0 && (
          <p
            className={`${
              lastMessage[0].read.length === 0
                ? "text-gray-700 font-bold"
                : "text-gray-500 font-normal"
            } text-sm`}
          >
            {lastMessage[0].sentBy === userId ? "Me: " : ""}
            {lastMessage[0].message}
          </p>
        )}
      </div>
    </div>
  );
};

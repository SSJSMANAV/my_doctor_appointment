import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  subscribeToChat,
  sendTextMessage,
} from "../../action-creators/chat_action.js";
import toast from "react-hot-toast";

const ChatPage = () => {
  const { doctorId, patientId } = useParams();

  const scrollRef = useRef(0);

  const authState = useSelector((state) => {
    return state.auth;
  });

  const userId = authState.user._id;

  const [limit, setLimit] = useState(15);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = async (newLimit) => {
    await subscribeToChat(doctorId, patientId, newLimit, (messages) => {
      if (messages.length === 0) {
        setMessages([]);
      } else {
        setMessages(messages);
      }
    });
  };

  const sendMessage = async () => {
    if (newMessage.length === 0) {
      return;
    }
    await sendTextMessage(userId, doctorId, patientId, newMessage)
      .then(() => {
        setNewMessage("");
        fetchMessages(limit);
      })
      .catch((e) => {
        toast.error("Message wasn't sent.");
      });
  };

  useEffect(() => {
    const unsubscribe = subscribeToChat(
      doctorId,
      patientId,
      limit,
      (messages) => {
        if (messages.length === 0) {
          setMessages([]);
        } else {
          setMessages(messages);
        }
      }
    );

    window.scrollTo(0, scrollRef.current);

    return () => {
      // Cleanup the listener when the component unmounts
      unsubscribe();
    };
  }, [doctorId, patientId, limit]);

  return (
    <div className="flex flex-col h-screen pt-20 justify-end bg-sky-100">
      {messages.length > 14 && (
        <button
          className="text-sm font-semibold"
          onClick={() => {
            const newLimit = limit + 2;
            setLimit(newLimit);
            fetchMessages(newLimit);
          }}
        >
          {" "}
          See Older Messages
        </button>
      )}
      <div className="flex flex-col-reverse overflow-y-auto overflow-hidden p-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-1/2 w-full">
            {" "}
            Say Hello !!! 👋{" "}
          </div>
        )}
        {messages.map((message) => (
          <div key={message.id}>
            {userId === message.sentBy && (
              <div className="flex flex-row justify-end">
                <div className="bg-blue-400 rounded-2xl px-3 py-2 mb-2 w-fit">
                  {message.message}
                </div>
              </div>
            )}
            {userId !== message.sentBy && (
              <div className="flex flex-row justify-start">
                <div className="bg-gray-400 rounded-2xl px-3 py-2 mb-2 w-fit">
                  {message.message}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center p-4 pl-32">
        <input
          type="text"
          className="flex-grow border rounded-l py-2 px-4"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-r"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;

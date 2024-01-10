import React, { useEffect, useState } from "react";
import {
  sendTextMessage,
  subscribeToChat,
  updateSeenStatus,
} from "../../action-creators/chat_action.js";
import toast from "react-hot-toast";

const ChatMessages = ({ image, userId, doctorId, patientId }) => {
  console.log("here is the image name");
  console.log(image);
  console.log("here is the image name");
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

    return () => {
      // Cleanup the listener when the component unmounts
      unsubscribe();
    };
  }, [doctorId, patientId, limit]);

  return (
    <div className="flex flex-col justify-end h-full bg-sky-100">
      {messages.length > 14 && (
        <button
          className="text-sm font-semibold"
          onClick={() => {
            const newLimit = limit + 5;
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
          <ChatMessageCard
            image={image}
            message={message}
            doctorId={doctorId}
            patientId={patientId}
            userId={userId}
          ></ChatMessageCard>
        ))}
      </div>
      <div className="flex items-center p-4">
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

export default ChatMessages;

const ChatMessageCard = ({ image, message, doctorId, patientId, userId }) => {
  return (
    <div key={message.id}>
      {userId === message.sentBy && (
        <div className="flex flex-row justify-between items-center gap-x-10">
          <p className="text-sm font-semibold">
            {" "}
            {message.read.length === 0 ? "Unseen" : "Seen"}
          </p>
          <div className="bg-blue-400 rounded-2xl px-3 py-2 mb-2 w-fit">
            {message.message}
          </div>
        </div>
      )}
      {userId !== message.sentBy && (
        <GreyMessageCard
          image={image}
          message={message}
          doctorId={doctorId}
          patientId={patientId}
          userId={userId}
        ></GreyMessageCard>
      )}
    </div>
  );
};

const GreyMessageCard = ({ image, message, doctorId, patientId, userId }) => {
  useEffect(() => {
    const changeMessageSeenStatus = async () => {
      await updateSeenStatus(doctorId, patientId, message)
        .then(() => {
          return;
        })
        .catch((e) => {
          return;
        });
    };

    changeMessageSeenStatus();
  }, [doctorId, message, patientId]);
  return (
    <div className="flex flex-row items-center gap-x-3">
      <img
        alt={image}
        src={`http://localhost:3009/assets/${image}`}
        className="h-8 w-8 rounded-full object-cover"
      ></img>
      {userId !== message.sentBy && (
        <div className="flex flex-row justify-start items-center gap-x-10">
          <div className="bg-gray-400 rounded-2xl px-3 py-2 mb-2 w-fit">
            {message.message}
          </div>
        </div>
      )}
    </div>
  );
};

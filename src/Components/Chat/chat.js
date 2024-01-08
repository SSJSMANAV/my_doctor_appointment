// src/ChatPage.js
import React, { useState,} from 'react';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  



  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className="bg-gray-200 p-2 rounded mb-2">
            <span className="font-semibold">{message.sender}:</span> {message.text}
          </div>
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
        //   onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;

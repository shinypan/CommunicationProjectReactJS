import React, { useState } from "react";
import ChatData from "../data/ChatData";
import UserData from "../data/UserData";
import { useNavigate } from "react-router-dom";

/**
 * Group Chat component.
 * Used to display user chats
 * @type {React.FC}
 * @returns {React.ReactElement}
 */

const GroupChat = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const isAuthenticated = UserData.isUserLoggedIn();
  // If the user is not authenticated, redirect them to the login page.
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const user = UserData.getUserFromSession();
  const getMessages = () => {
    setMessages(ChatData.retrieveChats());
  };

  //To save chats in local storage
  const sendChat = (event) => {
    event.preventDefault();
    const message = event.target.elements.newMessage.value;
    if (message) {
      ChatData.saveMessage({
        timestamp: new Date().toISOString(),
        username: user.fullname,
        text: message,
      });
      getMessages();
      event.target.reset();
    }
  };

  return (
    <div class="mt-5 col-md-6 col-xxl-11 ">
      <h1 className="text-center">Group Chat</h1>
      <div className="card">
        <div className="card-body">
          <div className="messages">
            {messages.map((message, index) => (
              <div key={index} className="alert alert-primary" role="alert">
                <strong>
                  [{new Date(message.timestamp).toLocaleString()}]{" "}
                  {message.username}:
                </strong>{" "}
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={sendChat}>
            <div className="form-group row align-items-center">
              <label
                htmlFor="newMessage"
                className="col-sm-2 col-form-label text-capitalize"
              >
                <strong>{user.fullname}:</strong>
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter message"
                  name="newMessage"
                  id="newMessage"
                />
              </div>
              <div className="col-sm-1">
                <button className="btn btn-primary" type="submit">
                  Send
                </button>
              </div>
              <div className="col-sm-1">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={getMessages}
                >
                  Refresh
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default GroupChat;

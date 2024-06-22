/**
 * Chat data component.
 * Used to contain Chat related operations
 * @type {React.FC}
 */

const ChatData = (() => {
  const getMessages = () => {
    const messages = localStorage.getItem("chats");
    return messages ? JSON.parse(messages) : [];
  };

  return {
    //To retrieve all user chats
    retrieveChats: () => {
      return getMessages();
    },

    //To save chat to local storage
    saveMessage: (message) => {
      const messages = getMessages();
      messages.push(message);
      localStorage.setItem("chats", JSON.stringify(messages));
    },
  };
})();

export default ChatData;

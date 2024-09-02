import axios from "axios";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:8080/api/chats");
    setMessages(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {messages?.map((item) => (
        <div key={item._id}>{item.chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;

import Header from "./Header";
import Message from "./Message";

const ChatApp = () => (
  <div className="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">
    <Header />
    <div className="flex-1 overflow-y-auto p-4">
      <div className="flex flex-col space-y-2">
        <Message text="Hey, how's your day going?" isSent />
        <Message text="Not too bad, just a bit busy. How about you?" />
        {/* Add more Message components as needed */}
      </div>
    </div>
  </div>
);

export default ChatApp;

/* eslint-disable react/prop-types */

const Message = ({ text, isSent }) => (
  <div className={`flex ${isSent ? "justify-end" : ""}`}>
    <div
      className={`p-2 rounded-lg max-w-xs ${
        isSent ? "bg-blue-200" : "bg-gray-300"
      } text-black`}
    >
      {text}
    </div>
  </div>
);

export default Message;

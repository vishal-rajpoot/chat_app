import { chats } from "../../../data/data.js";

const getChats = async (req, res) => {
  res.send(chats);
};

const getChatById = async (req, res) => {
  const chatId = req.params.id;
  const singleChat = chats.find((chat) => chat._id === chatId);
  res.send(singleChat);
};

export { getChats, getChatById };

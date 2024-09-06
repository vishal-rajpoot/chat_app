import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import { generateToken } from "../../config/generateToken.js";
import { sendSuccess } from "../../utils/responseHandler.js";
import { AuthenticationError } from "../../utils/appErrors.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create a user");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const data = {
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    };
    return sendSuccess(res, data, "Login successfully");
  } else {
    throw new AuthenticationError("Invalid email or password");
  }
});

export { registerUser, loginUser };

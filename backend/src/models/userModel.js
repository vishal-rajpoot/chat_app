import mongoose from "mongoose";
import bcrypt from "bcrypt";
import appConfig from "../config/appConfig.js";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSaltSync(appConfig.auth.saltRounds);
  this.password = bcrypt.hashSync(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;

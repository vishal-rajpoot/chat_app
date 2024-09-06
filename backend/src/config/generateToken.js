import jwt from "jsonwebtoken";
import appConfig from "./appConfig.js";

const generateToken = (id) => {
  return jwt.sign({ id }, appConfig.auth.jwt_secret, {
    expiresIn: appConfig.auth.jwt_expiresin,
  });
};

export { generateToken };

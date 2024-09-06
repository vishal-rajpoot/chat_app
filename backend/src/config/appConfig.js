import dotenv from "dotenv";

dotenv.config();

export default {
  app: {
    port: process.env.PORT || 8088,
    env: process.env.NODE_ENV || "dev",
    mongo_url: process.env.MONGO_URI,
  },
  winiston: {
    logpath: "./logs/",
  },
  auth: {
    jwt_secret: process.env.JWT_SECRET || "loiuytrewq",
    jwt_expiresin: process.env.JWT_EXPIRES_IN || "1h",
    saltRounds: Number(process.env.SALT_ROUND) || 10,
    refresh_token_secret:
      process.env.REFRESH_TOKEN_SECRET ,
    refresh_token_expiresin: process.env.REFRESH_TOKEN_EXPIRES_IN || "2h",
    temp_token: process.env.TEMP_TOKEN,
    temp_token_expires: process.env.TEMP_TOKEN_EXPIRES_IN || "5m",
  },
};

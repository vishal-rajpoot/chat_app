import dotenv from "dotenv";

dotenv.config();
export default {
  app: {
    port: process.env.PORT || 8088,
    appName: process.env.APP_NAME || "psm-api",
    env: process.env.NODE_ENV || "dev",
    mongo_url: process.env.MONGO_URI ,
  },
  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || "psm",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "12345",
    logging: process.env.DB_LOGGING || false,
    connPoolLimit: process.env.DB_CONN_POOL_LIMIT || 5,
    connectTimeout: process.env.DB_CONN_TIME_OUT || 60000,
  },
  winiston: {
    logpath: "./logs/",
  },
  auth: {
    jwt_secret: process.env.JWT_SECRET || "loiuytrewq",
    jwt_expiresin: process.env.JWT_EXPIRES_IN || "1h",
    saltRounds: process.env.SALT_ROUND || 10,
    refresh_token_secret:
      process.env.REFRESH_TOKEN_SECRET || "cG9pdXl0cmV3cQ==",
    refresh_token_expiresin: process.env.REFRESH_TOKEN_EXPIRES_IN || "2h",
    temp_token: process.env.TEMP_TOKEN || "loiuytrqui",
    temp_token_expires: process.env.TEMP_TOKEN_EXPIRES_IN || "5m",
  },
};
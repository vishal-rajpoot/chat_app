import mongoose from "mongoose";
import logger from "../utils/logger.js";
import colors from "colors";
import appConfig from "./appConfig.js";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(appConfig.app.mongo_url);
    logger.info(
      `Mongo db connected: ${conn.connection.host}`.blue.bold.underline
    );
  } catch (error) {
    logger.error(`Error: ${error}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;

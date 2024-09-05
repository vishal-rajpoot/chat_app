import mongoose from "mongoose";
import logger from "../src/utils/logger.js";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    logger.info(`Mongo db connected: ${conn.connection.host}`.blue.bold.underline);
  } catch (error) {
    logger.error(`Error: ${error}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;

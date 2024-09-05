#!/usr/bin/env node

import http from "http";
import app from "./src/app.js";
import logger from "./src/utils/logger.js";
import connectDB from "./config/db.js";
import appConfig from "./config/appConfig.js";
const server = http.createServer(app);

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};

const port = normalizePort(appConfig.app.port);

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  switch (error.code) {
    case "EACCES":
      logger.error(`${port} requires elevated privileges`.red.bold);
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error(`${port} is already in use`.red.bold);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port: ${addr.port}`;

  logger.info(`Server started listening on ${bind}`.yellow.bold);
};

process.on("SIGINT", () => {
  logger.error("stopping the server".red.bold);
  process.exit();
});

connectDB();

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

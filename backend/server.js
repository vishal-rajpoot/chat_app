#!/usr/bin/env node

import http from "http";
import app from "./src/app.js";
import logger from "./src/utils/logger.js";

const server = http.createServer(app);


const port = 8080;
// normalizePort(appConfig.app.port);
const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  switch (error.code) {
    case "EACCES":
        logger.error(`${port} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
        logger.error(`${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port: ${addr.port}`;

  logger.info(`Server started listening on ${bind}`);
};

process.on("SIGINT", () => {
  logger.error("stopping the server", "info");
  process.exit();
});

// initializeDbConnection();

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

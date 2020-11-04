import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import RedisCacheManager from "./lib/cache";
import { IN_DEVELOPMENT, IN_TEST } from "./config/vars";

const { NODE_ENV, PORT } = process.env;

const server = express();

//Make sure nginx is forwarding correct ip
//nginx -> proxy_set_header X-Forwarded-For $remote_addr;
//express -> app.set('trust proxy', true);
const corsPolicyMiddleware = cors();
server.use(corsPolicyMiddleware);

const requestLogFormat = IN_DEVELOPMENT ? "dev" : "combined";
const loggingMiddleware = morgan(requestLogFormat);
server.use(loggingMiddleware);

server.use(routes);

RedisCacheManager.initializeConnection().then(() => {
  if (!IN_TEST) console.log("Redis connection initialized");
  server.listen(PORT, () => {
    if (!IN_TEST) {
      console.log(`HTTP Server running on port ${PORT}`);
      console.log(`Environment: ${NODE_ENV}`);
    }
  });
});

// Export it so we can use it in testing.
export default server;

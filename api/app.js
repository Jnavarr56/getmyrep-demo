import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import RedisCacheManager from "./lib/cache";

const { NODE_ENV, PORT } = process.env;

const IN_DEVELOPMENT = NODE_ENV === "development";

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
  server.listen(PORT, () => {
    if (NODE_ENV !== "test") {
      console.log(`Running on port ${PORT}\nEnvironment: ${NODE_ENV}`);
    }
  });
});

// Export it so we can use it in testing.
export default server;

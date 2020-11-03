import express from "express";
import morgan from "morgan";
import routes from "./routes";

const { NODE_ENV } = process.env;
const PORT = 3000;

const server = express();

const requestLogFormat = NODE_ENV === "development" ? "dev" : "tiny";
const loggingMiddleware = morgan(requestLogFormat);
server.use(loggingMiddleware);

server.use(routes);

// Export it so we can use it in testing.
export default server.listen(PORT, () => {
  if (NODE_ENV !== "test") {
    console.log(`Running on port ${PORT}\nEnvironment: ${NODE_ENV}`);
  }
});

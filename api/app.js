import express from "express";
import morgan from "morgan";
import requestIp from "request-ip";
import routes from "./routes";

import fetchReverseGeocode from "./utils/fetchReverseGeocode";

const { PORT = 3000, NODE_ENV } = process.env;
const LOG_NON_TEST_OUTPUT = NODE_ENV !== "test";
const LOG_DEV_OUTPUT = NODE_ENV === "development";

const server = express();
server.use(morgan(LOG_DEV_OUTPUT ? "dev" : "tiny"));
server.use(requestIp.mw());

server.use(routes);

const testableInstance = server.listen(PORT, () => {
  if (LOG_NON_TEST_OUTPUT) {
    console.log(`Running on port ${PORT}!`);
    console.log(`Environment: ${NODE_ENV}`);
  }
});

// Export it so we can use it in testing.
export default testableInstance;

// /*
//   Supply a lat/lng as a query param and return
//   the geocode data as stringfied JSON.
// */
// app.get("/geocode", async (req, res) => {
//   const { lat, lng } = req.query;

//   if (!lat || !lng) {
//     return res.sendStatus(400);
//   }

//   try {
//     const result = await fetchReverseGeocode(lat, lng);
//     const resultStr = JSON.stringify(result, null, 3);

//     res.send(resultStr);
//   } catch (error) {
//     const {
//       response: { status, data },
//     } = error;
//     res.status(status).send(data);
//   }
// });

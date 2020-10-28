import express from "express";
import * as dotenv from "dotenv";
import requestIp from "request-ip";

import axios from "axios";

import fetchReverseGeocode from "./utils/fetchReverseGeocode";
import Axios from "axios";

const PORT = process.env.PORT || 3000;

dotenv.config();

const app = express();
app.use(requestIp.mw());

/*
  Supply a lat/lng as a query param and return
  the geocode data as stringfied JSON.
*/
app.get("/geocode", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.sendStatus(400);
  }

  try {
    const result = await fetchReverseGeocode(lat, lng);
    const resultStr = JSON.stringify(result, null, 3);

    res.send(resultStr);
  } catch (error) {
    const {
      response: { status, data },
    } = error;
    res.status(status).send(data);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

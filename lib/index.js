import express from "express";
import requestIp from "request-ip";
import axios from "axios";

const app = express();
app.use(requestIp.mw());

app.get("/geoip/:ipAddress", async (req, res) => {
  try {
    const { ipAddress } = req.params;
    if (!ipAddress) {
      throw new Error("Invalid IP Address");
    }

    const geoIpURL = `http://tools.keycdn.com/geo.json?host=${ipAddress}`;
    const result = await axios.get(geoIpURL);
    const { data: requestGeoData } = result;

    const requestGeoDataStr = JSON.stringify(requestGeoData, null, 3);
    res.send(requestGeoDataStr);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log("listening on port 3000!");
});

import * as dotenv from "dotenv";
import request from "../utils/generate-get-request";
import { GOOGLE_GEOCODE_API_URL } from "../config/vars";

dotenv.config();

const { GOOGLE_API_KEY: key } = process.env;

export default async (lat, lng) => {
  const params = { latlng: `${lat},${lng}`, key };
  const pendingRequest = request(GOOGLE_GEOCODE_API_URL, params).then(
    ({ results: addresses }) => addresses
  );
  const pendingAddresses = pendingRequest.then((addresses) => {
    const validAddresses = addresses.reduce(
      (filtered, { types, formatted_address }) => {
        const isValid =
          types.includes("street_address") || types.includes("premise");
        if (isValid) filtered.push(formatted_address);
        return filtered;
      },
      []
    );
    return validAddresses;
  });

  return pendingAddresses;
};

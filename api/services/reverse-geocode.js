import axios from "axios";
import * as dotenv from "dotenv";
import queryString from "query-string";
import { GOOGLE_GEOCODE_API_URL } from "../config/vars";

dotenv.config();

const { GOOGLE_API_KEY } = process.env;

const isValidAddress = ({ types }) =>
  types.includes("street_address") || types.includes("premise");

export default async (lat, lng) => {
  const requestUrl = queryString.stringifyUrl({
    url: GOOGLE_GEOCODE_API_URL,
    query: {
      latlng: `${lat},${lng}`,
      key: GOOGLE_API_KEY,
    },
  });

  const pendingRequest = axios.get(requestUrl).then(({ data }) => {
    const { results: addresses } = data;
    const validAddresses = addresses.reduce((filtered, address) => {
      if (isValidAddress(address)) filtered.push(address.formatted_address);
      return filtered;
    }, []);

    return validAddresses;
  });

  return pendingRequest;
};

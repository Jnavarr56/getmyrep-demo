import axios from "axios";
import * as dotenv from "dotenv";
import queryString from "query-string";
import { GOOGLE_REPS_API_URL } from "../config/vars";

dotenv.config();

const { GOOGLE_API_KEY } = process.env;

export default (address) => {
  const requestUrl = queryString.stringifyUrl({
    url: GOOGLE_REPS_API_URL,
    query: {
      address,
      key: GOOGLE_API_KEY,
    },
  });

  const pendingRequest = axios.get(requestUrl).then(({ data }) => data);
  return pendingRequest;
};

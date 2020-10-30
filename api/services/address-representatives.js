import * as dotenv from "dotenv";
import request from "../utils/generate-get-request";
import { GOOGLE_REPS_API_URL } from "../config/vars";

dotenv.config();

const { GOOGLE_API_KEY: key } = process.env;

export default async (address) => {
  const params = { address, key };
  const pendingRequest = request(GOOGLE_REPS_API_URL, params);
  return pendingRequest;
};

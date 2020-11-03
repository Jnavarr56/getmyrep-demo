import request from "../utils/generate-get-request";
import { GOOGLE_REPS_API_URL, GOOGLE_API_KEY } from "../config/vars";

export default async (address) => {
  const params = { address, key: GOOGLE_API_KEY };
  const pendingRequest = request(GOOGLE_REPS_API_URL, params);
  return pendingRequest;
};

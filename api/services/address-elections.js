import request from "../utils/generate-get-request";
import RedisCacheManager from "../lib/cache";
import {
  GOOGLE_ELECTIONS_API_URL,
  GOOGLE_API_KEY,
  IN_DEVELOPMENT,
} from "../config/vars";

export default async (address) => {
  const cacheKey = `elections:${address}`;
  const cachedResult = await RedisCacheManager.get(cacheKey);
  if (cachedResult) return cachedResult;

  if (IN_DEVELOPMENT) console.log("fetching from API");
  const googleRequestParams = { address, key: GOOGLE_API_KEY };
  const googleRequestResponse = await request(
    GOOGLE_ELECTIONS_API_URL,
    googleRequestParams
  );

  await RedisCacheManager.set(cacheKey, googleRequestResponse);

  return googleRequestResponse;
};

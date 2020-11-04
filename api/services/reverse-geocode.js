import request from "../utils/generate-get-request";
import filterValidAddresses from "../lib/helpers/filter-valid-addresses";
import RedisCacheManager from "../lib/cache";
import {
  GOOGLE_GEOCODE_API_URL,
  GOOGLE_API_KEY,
  IN_DEVELOPMENT,
} from "../config/vars";

export default async (lat, lng) => {
  const coordsAsStr = `${lat},${lng}`;

  const cacheKey = `geocode:${coordsAsStr}`;
  const cachedResult = await RedisCacheManager.get(cacheKey);
  if (cachedResult) return cachedResult;

  if (IN_DEVELOPMENT) console.log("fetching from API");
  const googleRequestParams = { latlng: coordsAsStr, key: GOOGLE_API_KEY };
  const googleRequestResponse = await request(
    GOOGLE_GEOCODE_API_URL,
    googleRequestParams
  );
  const addressMatches = googleRequestResponse.results;
  const validAddresses = filterValidAddresses(addressMatches);

  await RedisCacheManager.set(cacheKey, validAddresses);

  return validAddresses;
};

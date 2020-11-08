import request from "../utils/generate-get-request";
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
  const googleRequestParams = {
    latlng: coordsAsStr,
    result_type: "street_address|premise",
    key: GOOGLE_API_KEY,
  };
  const googleRequestResponse = await request(
    GOOGLE_GEOCODE_API_URL,
    googleRequestParams
  );

  const addressMatches = googleRequestResponse.results;
  const formattedAddressMatches = addressMatches.map(
    ({ formatted_address, geometry }) => {
      return { address: formatted_address, coords: geometry.location };
    }
  );

  await RedisCacheManager.set(cacheKey, formattedAddressMatches);

  return formattedAddressMatches;
};

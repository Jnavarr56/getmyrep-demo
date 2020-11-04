const { NODE_ENV } = process.env;

export const IN_DEVELOPMENT = NODE_ENV === "development";
export const IN_PRODUCTION = NODE_ENV === "production";
export const IN_TEST = NODE_ENV === "TEST";

export const ROUTE_PREFIX = "/api";
export const GEOCODE_ROUTE = "/geocode";
export const ELECTIONS_ROUTE = "/elections";
export const REPRESENTATIVES_ROUTE = "/representatives";

export const GOOGLE_GEOCODE_API_URL =
  "https://maps.googleapis.com/maps/api/geocode/json";
export const GOOGLE_REPS_API_URL =
  "https://www.googleapis.com/civicinfo/v2/representatives";
export const GOOGLE_ELECTIONS_API_URL =
  "https://www.googleapis.com/civicinfo/v2/voterinfo";
export const { GOOGLE_API_KEY } = process.env;

export const CACHE_DURATION_SECS = 60 * 5;

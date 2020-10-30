// import axios from "axios";
// import queryString from "query-string";
// import * as dotenv from "dotenv";

// dotenv.config();

// const API_KEY = process.env.GOOGLE_API_KEY;
// const API_URL = `https://maps.googleapis.com/maps/api/geocode/json?`;

// /*
//     Just return reverse geocode data after providing latitude and longitude.
// */
// export default async (lat, lng) => {
//   const requestURL = queryString.stringifyUrl({
//     url: API_URL,
//     query: {
//       latlng: `${lat},${lng}`,
//       key: API_KEY,
//     },
//   });

//   return axios.get(requestURL).then(({ data }) => data);
// };
